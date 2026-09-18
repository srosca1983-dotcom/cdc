import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { hatchSlots, slotsAtBay } from "./overlay.ts";
import { hatchBuckets } from "../ship/layout.ts";
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
    assert.equal(slotsAtBay(slots, 17, 2, 84).length, 1);
    assert.equal(slotsAtBay(slots, 18, 2, 84).length, 1);
    assert.equal(slotsAtBay(slots, 19, 2, 84).length, 1);
  });

  it("places a 40' ISO 45G1 at 0180284 in the middle column only", () => {
    const plan = planOf(box("FORTY0000001", "0180284", "45G1"));
    const h5 = hatchBuckets([]).find((b) => b.spec.id === 5)!;
    const slots = hatchSlots(h5, plan);
    const s = slots.find((x) => x.container === "FORTY0000001");
    assert.ok(s?.stow);
    assert.equal(s!.stow!.fortyFoot, true);
    assert.equal(s!.stow!.bay, 18);
    assert.equal(h5.spec.bay40, 18);
    assert.equal(h5.spec.bays[1], 18);
    assert.equal(slotsAtBay(slots, 17, 2, 84).length, 0);
    assert.equal(slotsAtBay(slots, 19, 2, 84).length, 0);
    assert.equal(slotsAtBay(slots, 18, 2, 84).length, 1);
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
});
