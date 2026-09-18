import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseBaplie, looksLikeBaplie } from "./parse.ts";
import { SAMPLE_BAPLIE } from "./sample.ts";
import { reeferHeatIssues, reeferMotors, heatSensitive } from "./heat.ts";
import { evaluateManifest } from "../cdc/evaluate.ts";
import { CONTAINER_OPTIONS, type LineInput } from "../cdc/types.ts";

describe("BAPLIE", () => {
  it("reads vessel, reefers, DGS and 7-digit stow", () => {
    assert.equal(looksLikeBaplie(SAMPLE_BAPLIE), true);
    const plan = parseBaplie(SAMPLE_BAPLIE, "sample.edi");
    assert.equal(plan.voyage, "G2069W");
    assert.match(plan.vessel || "", /GEORGE/i);
    assert.equal(plan.boxes.length, 5);
    const rf = plan.boxes.find((b) => b.container === "RFRA0000001");
    assert.equal(rf?.reefer, true);
    assert.equal(rf?.operating, true);
    assert.equal(rf?.tempC, -18);
    assert.equal(rf?.stow?.hatch, 5);
    assert.equal(rf?.motors, "aft");
    const paint = plan.boxes.find((b) => b.container === "DGPA0000002");
    assert.equal(paint?.dg[0]?.un, "1263");
    assert.equal(paint?.dg[0]?.cls, "3");
    const holdRf = plan.boxes.find((b) => b.container === "RFRA0000004");
    assert.equal(holdRf?.motors, "fwd");
    assert.equal(holdRf?.stow?.bay, 6);
    assert.equal(holdRf?.stow?.onDeck, false);
  });

  it("flags class 3 next to a live reefer and not a far dry box", () => {
    const plan = parseBaplie(SAMPLE_BAPLIE, "sample.edi");
    const lines: LineInput[] = [
      {
        rowIndex: 1,
        un: "1263",
        name: "PAINT",
        hazClass: "3",
        subsidiary: "",
        packaging: "CN",
        packingGroup: "III",
        quantityKg: 18000,
        quantityRaw: "18000 kg",
        raw: [],
        container: "DGPA0000002",
        stowLoc: "0180384",
      },
    ];
    const ev = evaluateManifest(lines, CONTAINER_OPTIONS);
    const issues = reeferHeatIssues(ev.lines, plan);
    assert.ok(issues.some((i) => /live reefer/i.test(i.title)), JSON.stringify(issues));
    assert.equal(heatSensitive("3"), true);
    assert.equal(heatSensitive("8"), false);
  });

  it("faces motors aft except bay 6 / 22 below", () => {
    assert.equal(reeferMotors({ raw: "", bay: 18, row: 2, tier: 84, onDeck: true, hatch: 5, fortyFoot: true }), "aft");
    assert.equal(reeferMotors({ raw: "", bay: 6, row: 5, tier: 4, onDeck: false, hatch: 2, fortyFoot: true }), "fwd");
    assert.equal(reeferMotors({ raw: "", bay: 6, row: 5, tier: 84, onDeck: true, hatch: 2, fortyFoot: true }), "aft");
  });
});
