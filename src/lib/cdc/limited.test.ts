import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { hasExplicitLqMarks, isLimitedQty } from "./limited.ts";
import { parseXlsxArrayBuffer } from "./xlsx.ts";
import { evaluateManifest } from "./evaluate.ts";
import { CONTAINER_OPTIONS, type LineInput } from "./types.ts";
import { ingestBuffer } from "./ingest.ts";
import { screenVoyage } from "../ship/segregation.ts";

function line(partial: Partial<LineInput> & Pick<LineInput, "un" | "hazClass">): LineInput {
  return {
    rowIndex: 1,
    name: partial.name ?? "TEST",
    subsidiary: "",
    packaging: "1 CN",
    packingGroup: "II",
    quantityKg: 5,
    quantityRaw: "11 lb",
    raw: [],
    ...partial,
  };
}

describe("limited quantity", () => {
  it("honors the Limited QTY column and LTD QTY text", () => {
    assert.equal(isLimitedQty(line({ un: "1263", hazClass: "3", limitedQty: true })), true);
    assert.equal(isLimitedQty(line({ un: "1263", hazClass: "3", raw: ["LTD QTY"] })), true);
    assert.equal(isLimitedQty(line({ un: "1263", hazClass: "3", packaging: "1 TOTE", quantityKg: 400 })), false);
  });

  it("does not treat the letters eq inside other words as excepted quantity", () => {
    assert.equal(
      isLimitedQty(line({ un: "3082", hazClass: "9", name: "ENVIRONMENTALLY HAZARDOUS SUBSTANCE", packaging: "10 CN" })),
      false,
    );
  });

  it("treats unmarked UN 1950 aerosols in cartons as LQ (CargoMax)", () => {
    assert.equal(
      isLimitedQty(line({ un: "1950", hazClass: "2.1", packaging: "42 CN", quantityKg: 81, quantityRaw: "180.1" })),
      true,
    );
    assert.equal(
      isLimitedQty(line({ un: "1950", hazClass: "2.1", packaging: "2 CS", quantityKg: 14, quantityRaw: "31" })),
      true,
    );
  });

  it("does not treat unmarked class 2 cartons as LQ unless they are UN 1950", () => {
    assert.equal(
      isLimitedQty(line({ un: "3161", hazClass: "2.1", packaging: "12 CN", quantityKg: 5, quantityRaw: "11" })),
      false,
    );
    assert.equal(
      isLimitedQty(line({ un: "3164", hazClass: "2.2", packaging: "2 BX", quantityKg: 4.5, quantityRaw: "10" })),
      false,
    );
  });

  it("does not infer LQ for lithium, wet batteries, cylinders or pails", () => {
    assert.equal(isLimitedQty(line({ un: "3480", hazClass: "9", packaging: "8 BX", quantityKg: 500 })), false);
    assert.equal(isLimitedQty(line({ un: "2794", hazClass: "8", packaging: "1 CN", quantityKg: 45 })), false);
    assert.equal(isLimitedQty(line({ un: "1954", hazClass: "2.1", packaging: "7 CY", quantityKg: 220 })), false);
    assert.equal(isLimitedQty(line({ un: "1263", hazClass: "3", packaging: "6 PA", quantityKg: 109 })), false);
  });

  it("only infers ordinary CN lots as LQ when cartonFallback is opted in", () => {
    const paint = line({ un: "1263", hazClass: "3", packaging: "1 CARTON", quantityKg: 5 });
    assert.equal(isLimitedQty(paint, false), false);
    assert.equal(isLimitedQty(paint, true), true);
    const heavy = line({ un: "1263", hazClass: "3", packaging: "1 CN", quantityKg: 18000 });
    assert.equal(isLimitedQty(heavy, true), false);
  });
});

describe("G2069W / G2068W vs CargoMax", () => {
  it("does not raise CSM location blocks on 069W Excel after LQ", () => {
    const parsed = parseXlsxArrayBuffer(readFileSync("/workspace/attachments/DCM G2069W.xlsx"), "DCM G2069W.xlsx");
    assert.equal(hasExplicitLqMarks(parsed.lines), true);
    const result = evaluateManifest(parsed.lines, CONTAINER_OPTIONS);
    const lq = result.lines.filter((l) => isLimitedQty(l)).length;
    assert.ok(lq > 700, `expected most lines Ltd Qty, got ${lq} of ${result.lines.length}`);
    const screen = screenVoyage(result.lines);
    assert.equal(screen.blocks, 0, JSON.stringify(screen.issues.filter((i) => i.severity === "block")));
    // Unmarked class 2.1 (not UN 1950) vs class 3 on adjacent covers is real 176.83.
    // Do not mark those lines Ltd Qty just to silence them.
    assert.ok(
      screen.issues.every((i) => i.severity !== "block"),
      JSON.stringify(screen.issues.filter((i) => i.severity === "block")),
    );
  });

  it("blocks unmarked class 2 on Hatch 8 on 068W Excel (not auto-LQ)", () => {
    const parsed = parseXlsxArrayBuffer(
      readFileSync("/workspace/attachments/Copy of G2068W LGB DCM - Audited.xlsx"),
      "068W.xlsx",
    );
    const result = evaluateManifest(parsed.lines, CONTAINER_OPTIONS);
    const screen = screenVoyage(result.lines);
    const hatch8 = screen.issues.filter((i) => i.severity === "block" && /Hatch 8/i.test(i.title));
    assert.ok(hatch8.length >= 1, JSON.stringify(screen.issues.slice(0, 12)));
    assert.ok(
      hatch8.some((i) => /3164/.test(i.uns.join(" ")) || /3164/.test(i.title) || /2\.2/.test(i.detail)),
      JSON.stringify(hatch8),
    );
  });
});

describe("printed HAZ PDF", () => {
  it("reads stow and does not treat a whole PDF without Ltd Qty as LQ", async () => {
    const parsed = await ingestBuffer(
      readFileSync("/workspace/attachments/GEORGE II 069W HAZ MANIFEST.pdf"),
      "GEORGE II 069W HAZ MANIFEST.pdf",
    );
    assert.equal(hasExplicitLqMarks(parsed.lines), false);
    assert.ok(parsed.lines.filter((l) => l.stowLoc).length > 800);
    const result = evaluateManifest(parsed.lines, CONTAINER_OPTIONS);
    const lq = result.lines.filter((l) => isLimitedQty(l)).length;
    const aerosols = result.lines.filter((l) => l.un === "1950").length;
    assert.ok(lq <= aerosols + 20, `PDF must not auto-LQ cartons; LQ=${lq} aerosols=${aerosols}`);
    const screen = screenVoyage(result.lines);
    assert.ok(
      screen.blocks + screen.segs > 0,
      "printed PDF without a Limited QTY column must still screen full DG",
    );
  });
});
