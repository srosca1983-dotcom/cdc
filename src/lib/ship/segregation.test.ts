import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { evaluateManifest } from "../cdc/evaluate.ts";
import { CONTAINER_OPTIONS, type LineInput } from "../cdc/types.ts";
import { screenVoyage, segregationCode } from "./segregation.ts";

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
      line({ un: "1263", hazClass: "3", container: "ABCD1234567", stowLoc: "0300184" }),
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
      line({ un: "2810", hazClass: "6.1", container: "ABCD1234567", stowLoc: "0100106" }),
    ]);
    assert.ok(r.issues.some((i) => /Hold 2/i.test(i.title) || /Hold 2/i.test(i.detail)));
  });
});

describe("segregation distances", () => {
  it("flags 2.1 next to 5.1 on the same hatch cover", () => {
    const r = screen([
      line({ un: "1075", hazClass: "2.1", container: "AAAA1111111", stowLoc: "0180184" }),
      line({ un: "1477", hazClass: "5.1", container: "BBBB2222222", stowLoc: "0180284" }),
    ]);
    assert.ok(r.segs >= 1, JSON.stringify(r.issues));
    assert.match(r.issues.find((i) => i.severity === "seg")?.detail ?? "", /2\.1 vs class 5\.1|5\.1 vs class 2\.1/);
  });

  it("does not flag paint next to class 8 on the same hatch", () => {
    const r = screen([
      line({ un: "1263", hazClass: "3", container: "AAAA1111111", stowLoc: "0180184" }),
      line({ un: "2794", hazClass: "8", container: "BBBB2222222", stowLoc: "0180284" }),
    ]);
    assert.equal(r.segs, 0);
  });

  it("flags 2.1 and 3 packed in the same container", () => {
    const r = screen([
      line({ un: "1075", hazClass: "2.1", container: "MIXD0000001", stowLoc: "0180184" }),
      line({ un: "1263", hazClass: "3", container: "MIXD0000001", stowLoc: "0180184" }),
    ]);
    assert.ok(r.segs >= 1);
    assert.match(r.issues.find((i) => i.severity === "seg")?.title ?? "", /same box/i);
  });
});
