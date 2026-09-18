import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { evaluateManifest, evaluateSingle } from "./evaluate.ts";
import { parseManifest } from "./parse.ts";
import { LEGACY_SAMPLE, WORKED_SAMPLE } from "./sample.ts";
import { DEFAULT_OPTIONS } from "./types.ts";

describe("normalize + parse", () => {
  it("reads the v1.0 tab sample including UN and class columns", () => {
    const parsed = parseManifest(LEGACY_SAMPLE);
    assert.equal(parsed.lines.length, 7);
    assert.deepEqual(
      parsed.lines.map((l) => l.un),
      ["3480", "1049", "3265", "1005", "2910", "1992", "1942"],
    );
  });

  it("strips a UN prefix and pads short numbers", () => {
    const parsed = parseManifest("UN No,Class\nUN1005,2.3\nNA 1942,5.1");
    assert.equal(parsed.lines[0].un, "1005");
    assert.equal(parsed.lines[1].un, "1942");
  });

  it("parses mixed unit quantities", () => {
    const parsed = parseManifest(
      "UN,Class,Qty\n1005,2.3,18 MT\n1017,2.3,2000 lbs",
    );
    assert.equal(parsed.lines[0].quantityKg, 18000);
    assert.ok(parsed.lines[1].quantityKg && parsed.lines[1].quantityKg > 900);
  });
});

describe("33 CFR 160.202 engine vs v1.0 HTML rules", () => {
  it("disagrees with v1.0 on the original sample in the expected places", () => {
    const parsed = parseManifest(LEGACY_SAMPLE);
    const result = evaluateManifest(parsed.lines, DEFAULT_OPTIONS);
    const byUn = Object.fromEntries(result.lines.map((l) => [l.un, l]));

    assert.equal(byUn["3480"].verdict, "NOT_CDC");
    assert.equal(byUn["3480"].legacy, "CLEAR");

    assert.equal(byUn["1049"].verdict, "NOT_CDC");
    assert.equal(byUn["3265"].verdict, "NOT_CDC");

    // Portable tank of 2.3 with no quantity — not automatic CDC
    assert.equal(byUn["1005"].verdict, "REVIEW");
    assert.equal(byUn["1005"].legacy, "CDC");
    assert.equal(byUn["1005"].disagrees, true);

    // Excepted package Class 7 is not HRCQ
    assert.equal(byUn["2910"].verdict, "NOT_CDC");
    assert.equal(byUn["2910"].legacy, "REVIEW");
    assert.equal(byUn["2910"].disagrees, true);

    // Class 3 tank is not CDC just because it says TANK
    assert.equal(byUn["1992"].verdict, "NOT_CDC");
    assert.equal(byUn["1992"].legacy, "REVIEW");
    assert.equal(byUn["1992"].disagrees, true);

    // AN in a bag needs a 176.415 permit → CDC
    assert.equal(byUn["1942"].verdict, "CDC");
    assert.equal(byUn["1942"].legacy, "CDC");
    assert.equal(byUn["1942"].disagrees, false);
    assert.ok(byUn["1942"].paragraphs.includes("160.202(4)"));
  });

  it("confirms CDC once a 2.3 portable tank is over 1 MT", () => {
    const line = evaluateSingle({
      un: "1005",
      hazClass: "2.3",
      packaging: "PORTABLE TANK",
      quantityKg: 18000,
    });
    assert.equal(line.verdict, "CDC");
    assert.ok(line.paragraphs.includes("160.202(3)"));
  });

  it("does not treat a 50 kg chlorine cylinder as CDC", () => {
    const line = evaluateSingle({
      un: "1017",
      hazClass: "2.3",
      packaging: "CYL",
      quantityKg: 50,
    });
    assert.equal(line.verdict, "NOT_CDC");
    assert.equal(line.legacy, "CDC");
    assert.equal(line.disagrees, true);
  });

  it("aggregates two 2.3 lines of the same UN across the 1 MT threshold", () => {
    const parsed = parseManifest(
      "UN,Class,Pkg,Qty\n1005,2.3,CYL,600 kg\n1005,2.3,CYL,500 kg",
    );
    const result = evaluateManifest(parsed.lines, DEFAULT_OPTIONS);
    assert.equal(result.lines[0].verdict, "CDC");
    assert.equal(result.lines[1].verdict, "CDC");
  });

  it("treats PIH liquid in a portable tank as CDC under (5)", () => {
    const line = evaluateSingle({
      un: "1098",
      hazClass: "6.1",
      packaging: "PORTABLE TANK",
      quantityKg: 5000,
    });
    assert.equal(line.verdict, "CDC");
    assert.ok(line.paragraphs.includes("160.202(5)"));
  });

  it("does not treat packaged propylene oxide as the named bulk liquid", () => {
    const line = evaluateSingle({
      un: "1280",
      hazClass: "3",
      packaging: "TANK",
      quantityKg: 12000,
      carriageMode: "containerized",
    });
    assert.equal(line.verdict, "NOT_CDC");
    assert.equal(line.legacy, "REVIEW");
  });

  it("treats propylene oxide in ship's tanks as CDC under (8)", () => {
    const line = evaluateSingle({
      un: "1280",
      hazClass: "3",
      packaging: "CARGO TANK",
      quantityKg: 1_200_000,
      carriageMode: "bulk_tanker",
    });
    assert.equal(line.verdict, "CDC");
    assert.ok(line.paragraphs.includes("160.202(8)"));
  });

  it("flags 1.1 explosives at any quantity", () => {
    const line = evaluateSingle({
      un: "0081",
      hazClass: "1.1D",
      packaging: "BOX",
      quantityKg: 40,
    });
    assert.equal(line.verdict, "CDC");
    assert.ok(line.paragraphs.includes("160.202(1)"));
  });

  it("flags 1.5D in bags as CDC and rigid 1.5 as review", () => {
    const bag = evaluateSingle({
      un: "0332",
      hazClass: "1.5D",
      packaging: "BAG",
      quantityKg: 800,
    });
    const box = evaluateSingle({
      un: "0332",
      hazClass: "1.5D",
      packaging: "BOX",
      quantityKg: 800,
    });
    assert.equal(bag.verdict, "CDC");
    assert.ok(bag.paragraphs.includes("160.202(2)"));
    assert.equal(box.verdict, "REVIEW");
  });

  it("treats bulk LNG as CDC under (7)", () => {
    const line = evaluateSingle({
      un: "1972",
      hazClass: "2.1",
      packaging: "BULK",
      quantityKg: 5_000_000,
      carriageMode: "bulk_tanker",
    });
    assert.equal(line.verdict, "CDC");
    assert.ok(line.paragraphs.includes("160.202(7)"));
  });

  it("does not treat oleum drums as the named bulk liquid", () => {
    const line = evaluateSingle({
      un: "1831",
      hazClass: "8",
      packaging: "DRUM",
      quantityKg: 200,
    });
    assert.equal(line.verdict, "NOT_CDC");
  });

  it("keeps Type B Class 7 as review, not automatic CDC", () => {
    const line = evaluateSingle({
      un: "2916",
      hazClass: "7",
      packaging: "BOX",
      quantityKg: 1,
    });
    assert.equal(line.verdict, "REVIEW");
    assert.ok(line.paragraphs.includes("160.202(6)"));
  });

  it("does not treat a small packaged 6.1 carton as CDC when PIH is unknown", () => {
    const line = evaluateSingle({
      un: "2810",
      hazClass: "6.1",
      packaging: "1 CN",
      quantityKg: 2.5,
    });
    assert.equal(line.verdict, "NOT_CDC");
    assert.ok(line.paragraphs.includes("160.202(5)"));
  });

  it("holds unknown-PIH 6.1 in a portable tank for review", () => {
    const line = evaluateSingle({
      un: "2810",
      hazClass: "6.1",
      packaging: "PORTABLE TANK",
      quantityKg: 5000,
    });
    assert.equal(line.verdict, "REVIEW");
  });

  it("holds unknown-PIH 6.1 over 20 MT packaged for PIH confirmation", () => {
    const parsed = parseManifest(
      "UN,Class,Pkg,Qty\n2810,6.1,BOX,12000 kg\n2810,6.1,BOX,9000 kg",
    );
    const result = evaluateManifest(parsed.lines, DEFAULT_OPTIONS);
    assert.equal(result.lines[0].verdict, "REVIEW");
    assert.equal(result.lines[1].verdict, "REVIEW");
  });

  it("builds an eNOAD list only from CDC / residue rows", () => {
    const parsed = parseManifest(WORKED_SAMPLE);
    const result = evaluateManifest(parsed.lines, DEFAULT_OPTIONS);
    assert.ok(result.cdc >= 4);
    assert.ok(result.enoad.every((e) => e.un && e.name));
    assert.ok(result.disagreements > 0);
  });
});
