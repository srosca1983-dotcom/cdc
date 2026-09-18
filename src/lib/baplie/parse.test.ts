import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseBaplie, looksLikeBaplie } from "./parse.ts";
import { SAMPLE_BAPLIE } from "./sample.ts";
import { reeferHeatIssues, reeferMotors, heatSensitive } from "./heat.ts";
import { evaluateManifest } from "../cdc/evaluate.ts";
import { CONTAINER_OPTIONS, type LineInput } from "../cdc/types.ts";
import { screenVoyage } from "../ship/segregation.ts";

/** SMDG 2.2 order: LOC+147 then EQD. Split equipment id. Flashpoint before PG. */
const SMDG22 = `UNA:+.? '
UNB+UNOA:2+SENDER+RECEIVER+260917:1200+1'
UNH+1+BAPLIE:D:95B:UN:SMDG22'
BGM+34+TEST+9'
TDT+20+123W45+++HLC:LINES:306++9354351::11:ANINA'
LOC+5+USLGB:139:6'
LOC+61+USHNL:139:6'
LOC+147+0180284:139:5'
EQD+CN+HLXU4691920:6346:5+45G1:6346:5+++5'
MEA+WT++KGM:30480'
LOC+9+USLGB:139:6'
LOC+11+USHNL:139:6'
DGS+IMD+3+1263+23:CEL+III'
FTX+AAD+++PAINT'
EQD+CN+FLAT0000001:6346:5+22G1:6346:5+++5'
LOC+147+0180384:139:5'
EQD+CN+XXXX1234560:6346:5+22R1:6346:5+++4'
TMP+2+-18:CEL'
HAN+RFF'
DGS+IMD+2.2:35-10+3164'
LOC+147+0301284:139:5'
EQD+CN+HATCH8000001:6346:5+45G1:6346:5+++5'
DGS+IMD+3:6.1+1992++II'
UNT+40+1'
UNZ+1+1'
`;

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

  it("applies pending LOC+147 to following EQDs and splits the equipment id", () => {
    const plan = parseBaplie(SMDG22, "smdg22.edi");
    assert.equal(plan.vessel, "ANINA");
    const paint = plan.boxes.find((b) => b.container === "HLXU4691920");
    assert.ok(paint, `keys ${plan.boxes.map((b) => b.container).join(",")}`);
    assert.equal(paint?.iso, "45G1");
    assert.equal(paint?.stow?.bay, 18);
    assert.equal(paint?.stow?.row, 2);
    assert.equal(paint?.pol, "USLGB");
    assert.equal(paint?.pod, "USHNL");
    assert.equal(paint?.dg[0]?.cls, "3");
    assert.equal(paint?.dg[0]?.packingGroup, "III");
    assert.equal(paint?.dg[0]?.flashpoint, "23:CEL");
    const flat = plan.boxes.find((b) => b.container === "FLAT0000001");
    assert.equal(flat?.stow?.bay, 18);
    assert.equal(flat?.stow?.row, 2);
    const emptyRf = plan.boxes.find((b) => b.container === "XXXX1234560");
    assert.equal(emptyRf?.iso, "22R1");
    assert.equal(emptyRf?.full, false);
    assert.equal(emptyRf?.reefer, true);
    assert.equal(emptyRf?.operating, false);
    assert.equal(emptyRf?.stow?.fortyFoot, false);
    assert.equal(emptyRf?.motors, "fwd");
    const sub = plan.boxes.find((b) => b.container === "HATCH8000001");
    assert.equal(sub?.dg[0]?.cls, "3");
    assert.equal(sub?.dg[0]?.subsidiary, "6.1");
    assert.equal(sub?.dg[0]?.packingGroup, "II");
    assert.equal(sub?.stow?.hatch, 8);
  });

  it("screens BAPLIE-only DG on Hatch 8", () => {
    const plan = parseBaplie(SMDG22, "smdg22.edi");
    const r = screenVoyage([], plan);
    assert.ok(r.issues.some((i) => /HATCH8000001/i.test(i.title) && /Hatch 8/i.test(i.title)));
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
        stowLoc: "0180184",
      },
    ];
    const ev = evaluateManifest(lines, CONTAINER_OPTIONS);
    const issues = reeferHeatIssues(ev.lines, plan);
    assert.ok(issues.some((i) => /live reefer/i.test(i.title)), JSON.stringify(issues));
    assert.equal(heatSensitive("3"), true);
    assert.equal(heatSensitive("8"), false);
  });

  it("does not flag paint next to an empty NOR reefer", () => {
    const plan = parseBaplie(SAMPLE_BAPLIE, "sample.edi");
    const lines: LineInput[] = [
      {
        rowIndex: 1,
        un: "1263",
        name: "PAINT",
        hazClass: "3",
        subsidiary: "",
        packaging: "6 PA",
        packingGroup: "III",
        quantityKg: 18000,
        quantityRaw: "18000 kg",
        raw: [],
        container: "DGPA0000002",
        stowLoc: "0180184",
      },
    ];
    const ev = evaluateManifest(lines, CONTAINER_OPTIONS);
    const issues = reeferHeatIssues(ev.lines, plan);
    assert.equal(
      issues.filter((i) => /NORA0000005/.test(i.title) || i.containers.includes("NORA0000005")).length,
      0,
      JSON.stringify(issues),
    );
    assert.ok(issues.some((i) => /RFRA0000001/.test(i.title) || i.containers.includes("RFRA0000001")));
  });

  it("faces motors aft except bay 6 / 22 below", () => {
    assert.equal(reeferMotors({ raw: "", bay: 18, row: 2, tier: 84, onDeck: true, hatch: 5, fortyFoot: true }), "aft");
    assert.equal(reeferMotors({ raw: "", bay: 6, row: 5, tier: 4, onDeck: false, hatch: 2, fortyFoot: true }), "fwd");
    assert.equal(reeferMotors({ raw: "", bay: 6, row: 5, tier: 84, onDeck: true, hatch: 2, fortyFoot: true }), "aft");
  });

  it("does not treat the opposite 20' or the next hatch as the reefer motor end", () => {
    function heat(edi: string, container: string, stowLoc: string) {
      const plan = parseBaplie(edi, "motor.edi");
      const cargo: LineInput = {
        rowIndex: 1,
        un: "1263",
        name: "PAINT",
        hazClass: "3",
        subsidiary: "",
        packaging: "6 PA",
        packingGroup: "III",
        quantityKg: 200,
        quantityRaw: "200 kg",
        raw: [],
        container,
        stowLoc,
      };
      return reeferHeatIssues(evaluateManifest([cargo], CONTAINER_OPTIONS).lines, plan);
    }
    const opposite = heat(
      `UNA:+.? '
UNB+UNOA:2+PASHA+GEORGEII+260918:1200+1'
UNH+1+BAPLIE:D:95B:UN:SMDG22'
BGM+34+T+9'
EQD+CN+RF17A0000001+22R1:102:5++2+5'
LOC+147+0170184:139:5'
TMP+2+-18:CEL'
UNT+12+1'
UNZ+1+1'
`,
      "PAINT1900001",
      "0190184",
    );
    assert.equal(opposite.length, 0, JSON.stringify(opposite));
    const nextHatch = heat(
      `UNA:+.? '
UNB+UNOA:2+PASHA+GEORGEII+260918:1200+1'
UNH+1+BAPLIE:D:95B:UN:SMDG22'
BGM+34+T+9'
EQD+CN+RF19A0000002+22R1:102:5++2+5'
LOC+147+0190184:139:5'
TMP+2+-18:CEL'
UNT+12+1'
UNZ+1+1'
`,
      "PAINT2100001",
      "0210184",
    );
    assert.equal(nextHatch.length, 0, JSON.stringify(nextHatch));
  });
});
