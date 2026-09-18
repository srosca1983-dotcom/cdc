import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { evaluateManifest } from "../cdc/evaluate.ts";
import { CONTAINER_OPTIONS, type LineInput } from "../cdc/types.ts";
import { screenVoyage, segregationCode } from "./segregation.ts";
import { athwartGap, isCasingCell } from "./george-ii.ts";

function line(partial: Partial<LineInput> & Pick<LineInput, "un" | "hazClass">): LineInput {
  return {
    rowIndex: partial.rowIndex ?? 1,
    name: partial.name ?? "TEST",
    subsidiary: partial.subsidiary ?? "",
    packaging: partial.packaging ?? "CN",
    packingGroup: partial.packingGroup ?? "II",
    quantityKg: partial.quantityKg ?? 100,
    quantityRaw: partial.quantityRaw ?? "100 kg",
    raw: [],
    ...partial,
  };
}

function screen(lines: LineInput[]) {
  return screenVoyage(evaluateManifest(lines, CONTAINER_OPTIONS).lines);
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
      line({ un: "2794", hazClass: "8", container: "ABCD1234567", stowLoc: "0020104" }),
    ]);
    assert.ok(r.issues.some((i) => /below deck on Hatch 1/i.test(i.title)));
  });

  it("allows class 8 in Hold 2", () => {
    const r = screen([
      line({ un: "2794", hazClass: "8", container: "ABCD1234567", stowLoc: "0100104" }),
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
      line({ un: "2794", hazClass: "8", container: "BBBB2222222", stowLoc: "0180284" }),
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
      line({ un: "2794", hazClass: "8", container: "AWAY0000001", stowLoc: "0180184" }),
    ]);
    assert.equal(r.segs, 0, JSON.stringify(r.issues));
  });
});

describe("athwartships and Hatch 10 casing", () => {
  it("counts cells on the hatch line, so hold row 02 and 00 are neighbors", () => {
    assert.equal(athwartGap(4, false, 2, 0), 1);
    assert.equal(athwartGap(5, true, 1, 2), 1);
  });

  it("watches Hatch 10 inboard casing cells only", () => {
    assert.equal(isCasingCell(10, 2), true);
    assert.equal(isCasingCell(10, 12), false);
    const watch = screen([
      line({ un: "3480", hazClass: "9", container: "CASE0000001", stowLoc: "0380284", packaging: "8 BX", quantityKg: 400 }),
    ]);
    assert.ok(watch.watches >= 1, JSON.stringify(watch.issues));
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
