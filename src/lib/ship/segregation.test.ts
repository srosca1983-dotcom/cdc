import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { evaluateManifest } from "../cdc/evaluate.ts";
import { CONTAINER_OPTIONS, type LineInput } from "../cdc/types.ts";
import { screenVoyage, segregationCode, resolvedStow } from "./segregation.ts";
import { athwartGap, isCasingCell } from "./george-ii.ts";
import { hatchBuckets } from "./layout.ts";
import { parseBaplie } from "../baplie/parse.ts";
import { FIXTURE_BAPLIE } from "../baplie/sample.ts";

function line(partial: Partial<LineInput> & Pick<LineInput, "un" | "hazClass">): LineInput {
  return {
    rowIndex: partial.rowIndex ?? 1,
    name: partial.name ?? "TEST",
    subsidiary: partial.subsidiary ?? "",
    packaging: partial.packaging ?? "6 PA",
    packingGroup: partial.packingGroup ?? "II",
    quantityKg: partial.quantityKg ?? 200,
    quantityRaw: partial.quantityRaw ?? "200 kg",
    raw: [],
    ...partial,
  };
}

function screen(lines: LineInput[], plan?: ReturnType<typeof parseBaplie>) {
  return screenVoyage(evaluateManifest(lines, CONTAINER_OPTIONS).lines, plan ?? null);
}

describe("176.83 table", () => {
  it("reads class 3 vs 8 as X and 2.1 vs 5.1 as 2", () => {
    assert.equal(segregationCode("3", "8"), "X");
    assert.equal(segregationCode("2.1", "5.1"), "2");
    assert.equal(segregationCode("1.1", "3"), "4");
    assert.equal(segregationCode("9", "3"), "X");
  });
});

describe("GEORGE II location", () => {
  it("blocks class 3 on Hatch 8 on deck", () => {
    const r = screen([
      line({ un: "1263", hazClass: "3", container: "ABCD1234567", stowLoc: "0300184", packaging: "6 PA", quantityKg: 200 }),
    ]);
    assert.ok(r.blocks >= 1);
    assert.match(r.issues[0].title, /should not be on Hatch 8/i);
  });

  it("blocks class 8 below deck on Hatch 1 (not Hold 2)", () => {
    const r = screen([
      line({ un: "2794", hazClass: "8", container: "ABCD1234567", stowLoc: "0020104", packaging: "10 DR", quantityKg: 200 }),
    ]);
    assert.ok(r.issues.some((i) => /below deck on Hatch 1/i.test(i.title)));
  });

  it("allows class 8 in Hold 2", () => {
    const r = screen([
      line({ un: "2794", hazClass: "8", container: "ABCD1234567", stowLoc: "0100104", packaging: "10 DR", quantityKg: 200 }),
    ]);
    assert.equal(r.blocks, 0);
  });

  it("blocks class 6.1 in Hold 2", () => {
    const r = screen([
      line({ un: "2810", hazClass: "6.1", container: "ABCD1234567", stowLoc: "0100106", packaging: "1 TK", quantityKg: 5000 }),
    ]);
    assert.ok(r.issues.some((i) => /Hold 2/i.test(i.title) || /Hold 2/i.test(i.detail)));
  });
});

describe("segregation distances", () => {
  it("flags 2.1 next to 5.1 on the same hatch cover", () => {
    const r = screen([
      line({ un: "1075", hazClass: "2.1", container: "AAAA1111111", stowLoc: "0180184", packaging: "40 CS", quantityKg: 400 }),
      line({ un: "1477", hazClass: "5.1", container: "BBBB2222222", stowLoc: "0180284", packaging: "10 DR", quantityKg: 400 }),
    ]);
    assert.ok(r.segs >= 1, JSON.stringify(r.issues));
    assert.match(r.issues.find((i) => i.severity === "seg")?.detail ?? "", /2\.1 vs class 5\.1|5\.1 vs class 2\.1/);
  });

  it("does not flag paint next to class 8 on the same hatch", () => {
    const r = screen([
      line({ un: "1263", hazClass: "3", container: "AAAA1111111", stowLoc: "0180184", packaging: "6 PA", quantityKg: 200 }),
      line({ un: "2794", hazClass: "8", container: "BBBB2222222", stowLoc: "0180284", packaging: "10 DR", quantityKg: 200 }),
    ]);
    assert.equal(r.segs, 0);
  });

  it("flags 2.1 and 3 packed in the same container", () => {
    const r = screen([
      line({ un: "1075", hazClass: "2.1", container: "MIXD0000001", stowLoc: "0180184", packaging: "40 CS", quantityKg: 400 }),
      line({ un: "1263", hazClass: "3", container: "MIXD0000001", stowLoc: "0180184", packaging: "6 PA", quantityKg: 200 }),
    ]);
    assert.ok(r.segs >= 1);
    assert.match(r.issues.find((i) => i.severity === "seg")?.title ?? "", /same box/i);
  });

  it("does not segregate a substance from its own subsidiary in the same box", () => {
    const r = screen([
      line({
        un: "3149",
        hazClass: "5.1",
        subsidiary: "8",
        container: "SUBS0000001",
        stowLoc: "0180184",
        packaging: "2 DR",
        quantityKg: 80,
      }),
    ]);
    assert.equal(r.segs, 0, JSON.stringify(r.issues));
  });

  it("does not flag Away-from (1) classes sharing a closed container", () => {
    const r = screen([
      line({ un: "1075", hazClass: "2.1", container: "AWAY0000001", stowLoc: "0180184", packaging: "40 CS", quantityKg: 400 }),
      line({ un: "2794", hazClass: "8", container: "AWAY0000001", stowLoc: "0180184", packaging: "10 DR", quantityKg: 200 }),
    ]);
    assert.equal(r.segs, 0, JSON.stringify(r.issues));
  });
});

describe("separated from (2) geometry", () => {
  it("does not flag 20' fwd vs 20' aft on the same hatch (017 vs 019)", () => {
    const r = screen([
      line({ un: "1075", hazClass: "2.1", container: "FWD200000001", stowLoc: "0170184", packaging: "40 CS", quantityKg: 400 }),
      line({ un: "1477", hazClass: "5.1", container: "AFT200000002", stowLoc: "0190184", packaging: "10 DR", quantityKg: 400 }),
    ]);
    assert.equal(r.segs, 0, JSON.stringify(r.issues));
  });

  it("flags neighbors athwart in the same 40' bay", () => {
    const r = screen([
      line({ un: "1075", hazClass: "2.1", container: "ROW100000001", stowLoc: "0180184", packaging: "40 CS", quantityKg: 400 }),
      line({ un: "1477", hazClass: "5.1", container: "ROW200000002", stowLoc: "0180284", packaging: "10 DR", quantityKg: 400 }),
    ]);
    assert.ok(r.segs >= 1, JSON.stringify(r.issues));
  });

  it("flags adjacent hatch covers on deck (Hatch 4 vs Hatch 5)", () => {
    const r = screen([
      line({ un: "1075", hazClass: "2.1", container: "H4CK0000001", stowLoc: "0140184", packaging: "40 CS", quantityKg: 400 }),
      line({ un: "1477", hazClass: "5.1", container: "H5CK0000001", stowLoc: "0180184", packaging: "10 DR", quantityKg: 400 }),
    ]);
    assert.ok(r.segs >= 1, JSON.stringify(r.issues));
  });

  it("does not flag a vertical gap of two tier steps (82 vs 88)", () => {
    const r = screen([
      line({ un: "1075", hazClass: "2.1", container: "LOW00000001", stowLoc: "0180182", packaging: "40 CS", quantityKg: 400 }),
      line({ un: "1477", hazClass: "5.1", container: "HIGH0000001", stowLoc: "0180188", packaging: "10 DR", quantityKg: 400 }),
    ]);
    assert.equal(r.segs, 0, JSON.stringify(r.issues));
  });
});

describe("athwartships and Hatch 10 casing", () => {
  it("counts cells on the hatch line, so hold row 02 and 00 are neighbors", () => {
    assert.equal(athwartGap(4, false, 2, 0), 1);
    assert.equal(athwartGap(5, true, 1, 2), 1);
  });

  it("watches Hatch 10 inboard casing cells 04 and 03 only", () => {
    assert.equal(isCasingCell(10, 2), false);
    assert.equal(isCasingCell(10, 4), true);
    assert.equal(isCasingCell(10, 3), true);
    assert.equal(isCasingCell(10, 12), false);
    const watch = screen([
      line({ un: "3480", hazClass: "9", container: "CASE0000001", stowLoc: "0380484", packaging: "8 BX", quantityKg: 400 }),
    ]);
    assert.ok(watch.watches >= 1, JSON.stringify(watch.issues));
    const starboard = screen([
      line({ un: "3480", hazClass: "9", container: "CASE0000002", stowLoc: "0380384", packaging: "8 BX", quantityKg: 400 }),
    ]);
    assert.ok(starboard.watches >= 1, JSON.stringify(starboard.issues));
    const outboard = screen([
      line({ un: "3480", hazClass: "9", container: "OUTB0000001", stowLoc: "0381284", packaging: "8 BX", quantityKg: 400 }),
    ]);
    assert.equal(outboard.watches, 0, JSON.stringify(outboard.issues));
  });
});

describe("limited quantity", () => {
  it("does not apply the Hold 2 DoC to Ltd Qty under deck on Hatch 2", () => {
    const r = screen([
      line({ un: "1133", hazClass: "3", container: "LQCN0000001", stowLoc: "0060504", limitedQty: true }),
    ]);
    assert.equal(r.blocks, 0, JSON.stringify(r.issues));
  });

  it("still blocks full class 3 under deck on Hatch 2", () => {
    const r = screen([
      line({ un: "1263", hazClass: "3", container: "FULL0000001", stowLoc: "0060504", packaging: "6 PA", quantityKg: 200 }),
    ]);
    assert.ok(r.issues.some((i) => /below deck on Hatch 2/i.test(i.title)));
  });

  it("does not segregate mixed Ltd Qty classes in one container", () => {
    const r = screen([
      line({ un: "1263", hazClass: "3", container: "LCL00000001", stowLoc: "0180184", limitedQty: true }),
      line({ un: "2794", hazClass: "8", container: "LCL00000001", stowLoc: "0180184", limitedQty: true }),
      line({ un: "1075", hazClass: "2.1", container: "LCL00000001", stowLoc: "0180184", limitedQty: true }),
    ]);
    assert.equal(r.segs, 0, JSON.stringify(r.issues));
  });

  it("still segregates full 2.1 and full 3 in the same container", () => {
    const r = screen([
      line({ un: "1075", hazClass: "2.1", container: "MIXD0000001", stowLoc: "0180184", packaging: "40 CS", quantityKg: 400 }),
      line({ un: "1263", hazClass: "3", container: "MIXD0000001", stowLoc: "0180184", packaging: "6 PA", quantityKg: 200 }),
    ]);
    assert.ok(r.segs >= 1);
  });

  it("does not block unmarked UN 1950 aerosols under deck outside Hold 2", () => {
    const r = screen([
      line({
        un: "1950",
        hazClass: "2.1",
        container: "CAIU5872630",
        stowLoc: "0220504",
        packaging: "42 CN",
        quantityKg: 81,
        quantityRaw: "180.1",
      }),
    ]);
    assert.equal(r.blocks, 0, JSON.stringify(r.issues));
  });
});

describe("BAPLIE stow copy and slot overlap", () => {
  it("does not write BAPLIE stow onto line.input; resolvedStow is the view-model", () => {
    const edi = `UNA:+.? '
UNB+UNOA:2+PASHA+GEORGEII+260918:1200+1'
UNH+1+BAPLIE:D:95B:UN:SMDG22'
BGM+34+T+9'
TDT+20+T+1++PHK:172:20+++8012487:103:GEORGE II'
LOC+147+0180284:139:5'
EQD+CN+ABCD1234567+45G1:102:5++2+5'
UNT+10+1'
UNZ+1+1'
`;
    const plan = parseBaplie(edi, "copy.edi");
    const evaluated = evaluateManifest(
      [line({ un: "1263", hazClass: "3", container: "ABCD1234567", packaging: "6 PA", quantityKg: 200 })],
      CONTAINER_OPTIONS,
    );
    const before = evaluated.lines[0].input.stowLoc;
    const r = screenVoyage(evaluated.lines, plan);
    assert.equal(evaluated.lines[0].input.stowLoc, before);
    assert.equal(evaluated.lines[0].input.stowLoc, undefined);
    const pos = resolvedStow(evaluated.lines[0], plan);
    assert.equal(pos?.hatch, 5, JSON.stringify(pos));
    assert.equal(pos?.row, 2);
    assert.equal(pos?.tier, 84);
    const h5 = hatchBuckets(evaluated.lines, plan).find((b) => b.spec.id === 5);
    assert.equal(h5?.lines.length, 1);
    assert.equal(r.issues.filter((i) => /pick one/i.test(i.title)).length, 0);
  });

  it("watches when DCM and BAPLIE stow disagree and does not self-segregate", () => {
    const edi = `UNA:+.? '
UNB+UNOA:2+PASHA+GEORGEII+260918:1200+1'
UNH+1+BAPLIE:D:95B:UN:SMDG22'
BGM+34+T+9'
LOC+147+0300184:139:5'
EQD+CN+ABCD1234567+45G1:102:5++2+5'
DGS+IMD+3+1263+III'
UNT+10+1'
UNZ+1+1'
`;
    const plan = parseBaplie(edi, "mismatch.edi");
    const r = screen([
      line({ un: "1263", hazClass: "3", container: "ABCD1234567", stowLoc: "14-08-84", packaging: "6 PA", quantityKg: 200 }),
    ], plan);
    assert.ok(r.issues.some((i) => /DCM stow 14-08-84 vs BAPLIE 0300184/i.test(i.title)), JSON.stringify(r.issues));
    assert.equal(r.segs, 0, JSON.stringify(r.issues));
  });

  it("blocks a 40' and a 20' that share the same footprint", () => {
    const r = screen([
      line({ un: "1263", hazClass: "3", container: "FORTY000001", stowLoc: "0180284", packaging: "6 PA", quantityKg: 200 }),
      line({ un: "2794", hazClass: "8", container: "TWENT000001", stowLoc: "0170284", packaging: "10 DR", quantityKg: 200 }),
    ]);
    assert.ok(r.issues.some((i) => /two boxes in one slot/i.test(i.title)), JSON.stringify(r.issues));
  });

  it("does not treat opposite 20' ends of a hatch as the same slot", () => {
    const r = screen([
      line({ un: "1263", hazClass: "3", container: "FWD200000001", stowLoc: "0170284", packaging: "6 PA", quantityKg: 200 }),
      line({ un: "2794", hazClass: "8", container: "AFT200000002", stowLoc: "0190284", packaging: "10 DR", quantityKg: 200 }),
    ]);
    assert.equal(r.issues.filter((i) => /two boxes in one slot/i.test(i.title)).length, 0, JSON.stringify(r.issues));
  });

  it("blocks a dry BAPLIE 40' on top of a DCM 20'", () => {
    const edi = `UNA:+.? '
UNB+UNOA:2+PASHA+GEORGEII+260918:1200+1'
UNH+1+BAPLIE:D:95B:UN:SMDG22'
BGM+34+T+9'
LOC+147+0180284:139:5'
EQD+CN+DRY400000001+45G1:102:5++2+5'
UNT+10+1'
UNZ+1+1'
`;
    const plan = parseBaplie(edi, "dry40.edi");
    const r = screen(
      [line({ un: "1263", hazClass: "3", container: "TWENT000001", stowLoc: "0170284", packaging: "6 PA", quantityKg: 200 })],
      plan,
    );
    assert.ok(r.issues.some((i) => /two boxes in one slot/i.test(i.title)), JSON.stringify(r.issues));
  });
});

describe("DCM vs BAPLIE cargo", () => {
  it("watches when the same container has a different UN on the BAPLIE DGS", () => {
    const edi = `UNA:+.? '
UNB+UNOA:2+PASHA+GEORGEII+260918:1200+1'
UNH+1+BAPLIE:D:95B:UN:SMDG22'
BGM+34+T+9'
LOC+147+0180184:139:5'
EQD+CN+ABCD1234567+45G1:102:5++2+5'
DGS+IMD+3+1992+II'
UNT+10+1'
UNZ+1+1'
`;
    const r = screen(
      [line({ un: "1263", hazClass: "3", container: "ABCD1234567", stowLoc: "0180184", packaging: "6 PA", quantityKg: 200 })],
      parseBaplie(edi, "un.edi"),
    );
    assert.ok(r.issues.some((i) => /DCM UN 1263 vs BAPLIE UN 1992/i.test(i.title)), JSON.stringify(r.issues));
  });

  it("watches when the same container has a different class / subsidiary on the BAPLIE DGS", () => {
    const edi = `UNA:+.? '
UNB+UNOA:2+PASHA+GEORGEII+260918:1200+1'
UNH+1+BAPLIE:D:95B:UN:SMDG22'
BGM+34+T+9'
LOC+147+0180184:139:5'
EQD+CN+ABCD1234567+45G1:102:5++2+5'
DGS+IMD+3:6.1+1263+II'
UNT+10+1'
UNZ+1+1'
`;
    const r = screen(
      [line({ un: "1263", hazClass: "3", container: "ABCD1234567", stowLoc: "0180184", packaging: "6 PA", quantityKg: 200 })],
      parseBaplie(edi, "class.edi"),
    );
    assert.ok(r.issues.some((i) => /DCM class 3 vs BAPLIE 3 \(6\.1\)/i.test(i.title)), JSON.stringify(r.issues));
    assert.equal(r.issues.filter((i) => /DCM UN /i.test(i.title)).length, 0);
  });
});

describe("GEORGE II conversion-sheet watches", () => {
  it("watches a live reefer on Bay 18, 6th tier", () => {
    const edi = `UNA:+.? '
UNB+UNOA:2+PASHA+GEORGEII+260918:1200+1'
UNH+1+BAPLIE:D:95B:UN:SMDG22'
BGM+34+T+9'
EQD+CN+RF18T920001+45R1:102:5++2+5'
LOC+147+0180292:139:5'
TMP+2+-18:CEL'
UNT+12+1'
UNZ+1+1'
`;
    const r = screen([], parseBaplie(edi, "t92.edi"));
    assert.ok(r.issues.some((i) => /Bay 18 6th-tier live reefer/i.test(i.title)), JSON.stringify(r.issues));
  });

  it("watches Hold 2 outboard 05/06 as within 3 m of machinery-space", () => {
    const r = screen([
      line({ un: "1263", hazClass: "3", container: "HOLD2000001", stowLoc: "0100604", packaging: "6 PA", quantityKg: 200 }),
    ]);
    assert.ok(r.issues.some((i) => /3 m of a Hold 2 machinery-space/i.test(i.title)), JSON.stringify(r.issues));
    assert.equal(r.blocks, 0, JSON.stringify(r.issues));
  });

  it("watches Hatch 5 outboard 05/06 on the 5th tier for cargo-fan access", () => {
    const edi = `UNA:+.? '
UNB+UNOA:2+PASHA+GEORGEII+260918:1200+1'
UNH+1+BAPLIE:D:95B:UN:SMDG22'
BGM+34+T+9'
EQD+CN+FAN05000001+45G1:102:5++2+5'
LOC+147+0180590:139:5'
UNT+10+1'
UNZ+1+1'
`;
    const r = screen([], parseBaplie(edi, "fan.edi"));
    assert.ok(r.issues.some((i) => /Hatch 5 outboard 05, 5th tier — cargo-fan access/i.test(i.title)), JSON.stringify(r.issues));
  });
});

describe("20-box GEORGE II fixture", () => {
  it("screens live RF, NOR, paint H5/H8, overlap, and the conversion watches without attachments", () => {
    const plan = parseBaplie(FIXTURE_BAPLIE, "george-ii-20.edi");
    assert.equal(plan.boxes.length, 20);
    const r = screenVoyage([], plan);
    assert.ok(r.issues.some((i) => /two boxes in one slot/i.test(i.title)), JSON.stringify(r.issues));
    assert.ok(
      r.issues.some((i) => i.severity === "block" && /Hatch 8/i.test(i.title) && /1263/.test(i.uns.join(" ") + i.title)),
      JSON.stringify(r.issues.filter((i) => i.severity === "block")),
    );
    assert.ok(r.issues.some((i) => /Bay 18 6th-tier live reefer/i.test(i.title)), JSON.stringify(r.issues));
    assert.ok(r.issues.some((i) => /cargo-fan access/i.test(i.title)), JSON.stringify(r.issues));
    assert.ok(r.issues.some((i) => /3 m of a Hold 2 machinery-space/i.test(i.title)), JSON.stringify(r.issues));
  });
});
