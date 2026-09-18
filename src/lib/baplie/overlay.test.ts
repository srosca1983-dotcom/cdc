import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { hatchSlots, slotsAtBay } from "./overlay.ts";
import { hatchBuckets } from "../ship/layout.ts";
import { deckTiersFor, hatchSpec } from "../ship/george-ii.ts";
import { parseStow } from "../ship/stow.ts";
import type { BaplieBox, BapliePlan } from "./types.ts";

function box(container: string, stowRaw: string, iso: string): BaplieBox {
  const stow = parseStow(stowRaw, iso);
  assert.ok(stow, `stow ${stowRaw}`);
  return {
    container,
    iso,
    stowRaw,
    stow,
    reefer: false,
    operating: false,
    motors: "aft",
    dg: [],
  };
}

function planOf(...boxes: BaplieBox[]): BapliePlan {
  return { sourceName: "overlay.test", boxes, warnings: [] };
}

describe("hatch overlay — three bays", () => {
  it("keeps 20' fwd, 40', and 20' aft on Hatch 5 as three slots", () => {
    const plan = planOf(
      box("FWD200000001", "0170284", "22G1"),
      box("MID400000002", "0180284", "45G1"),
      box("AFT200000003", "0190284", "22G1"),
    );
    const h5 = hatchBuckets([]).find((b) => b.spec.id === 5)!;
    const slots = hatchSlots(h5, plan);
    const row = slots.filter((s) => s.stow?.row === 2 && s.stow?.tier === 84);
    assert.equal(row.length, 3, JSON.stringify(row.map((s) => s.stow)));
    assert.equal(slots.filter((s) => s.stow?.bay === 17).length, 1);
    assert.equal(slots.filter((s) => s.stow?.bay === 18).length, 1);
    assert.equal(slots.filter((s) => s.stow?.bay === 19).length, 1);
  });

  it("hatches a 40' ISO 45G1 at 0180284 across the odd columns", () => {
    const plan = planOf(box("FORTY0000001", "0180284", "45G1"));
    const h5 = hatchBuckets([]).find((b) => b.spec.id === 5)!;
    const slots = hatchSlots(h5, plan);
    const s = slots.find((x) => x.container === "FORTY0000001");
    assert.ok(s?.stow);
    assert.equal(s!.stow!.fortyFoot, true);
    assert.equal(s!.stow!.bay, 18);
    assert.equal(slots.filter((x) => x.container === "FORTY0000001").length, 1);
    assert.equal(slotsAtBay(slots, 17, 2, 84).length, 1);
    assert.equal(slotsAtBay(slots, 19, 2, 84).length, 1);
    assert.equal(slotsAtBay(slots, 18, 2, 84).length, 1);
    assert.equal(slotsAtBay(slots, 17, 2, 84)[0].container, "FORTY0000001");
  });

  it("places a 20' ISO 22G1 at 0170284 in the fwd column only", () => {
    const plan = planOf(box("TWENT0000001", "0170284", "22G1"));
    const h5 = hatchBuckets([]).find((b) => b.spec.id === 5)!;
    const slots = hatchSlots(h5, plan);
    const s = slots.find((x) => x.container === "TWENT0000001");
    assert.ok(s?.stow);
    assert.equal(s!.stow!.fortyFoot, false);
    assert.equal(s!.stow!.bay, 17);
    assert.equal(h5.spec.bays[0], 17);
    assert.equal(slotsAtBay(slots, 17, 2, 84).length, 1);
    assert.equal(slotsAtBay(slots, 18, 2, 84).length, 0);
    assert.equal(slotsAtBay(slots, 19, 2, 84).length, 0);
  });

  it("marks a 40' and a 20' on the same row/tier as a slot conflict", () => {
    const plan = planOf(box("FORTY0000001", "0180284", "45G1"), box("TWENT0000001", "0170284", "22G1"));
    const h5 = hatchBuckets([]).find((b) => b.spec.id === 5)!;
    const slots = hatchSlots(h5, plan);
    assert.equal(slots.filter((s) => s.conflict).length, 2);
  });
});

describe("deck tiers", () => {
  it("starts on-deck at 82 and draws Hatch 10 as 82/84/86", () => {
    const h5 = hatchSpec(5)!;
    const h10 = hatchSpec(10)!;
    assert.deepEqual(deckTiersFor(h5), [82, 84, 86, 88]);
    assert.deepEqual(deckTiersFor(h10), [82, 84, 86]);
    assert.ok(!deckTiersFor(h5).includes(80));
    assert.ok(!deckTiersFor(h10).includes(80));
    assert.deepEqual(deckTiersFor(h5, [90, 92]), [82, 84, 86, 88, 90, 92]);
  });
});
