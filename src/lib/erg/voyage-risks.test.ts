import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { evaluateManifest } from "../cdc/evaluate.ts";
import { CONTAINER_OPTIONS, type LineInput } from "../cdc/types.ts";
import { parseManifest } from "../cdc/parse.ts";
import { WORKED_SAMPLE } from "../cdc/sample.ts";
import { parseBaplie } from "../baplie/parse.ts";
import { FIXTURE_BAPLIE } from "../baplie/sample.ts";
import { sheetFor, sheetSections } from "./guides.ts";
import { voyageRisks } from "./voyage-risks.ts";

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

function risks(lines: LineInput[], plan = parseBaplie(FIXTURE_BAPLIE, "fixture.edi")) {
  return voyageRisks(evaluateManifest(lines, CONTAINER_OPTIONS).lines, plan);
}

describe("sheet extras", () => {
  it("keeps fire/spill and adds explosion / hold / pollution on common UNs", () => {
    assert.equal(sheetFor("1075", "2.1").guide, "ERG 115");
    assert.match(sheetFor("3480", "9").fire[0], /water/i);
    assert.ok((sheetFor("3480", "9").hold ?? []).some((t) => /hold/i.test(t)));
    assert.ok((sheetFor("1942", "5.1").explosion ?? []).some((t) => /detonate/i.test(t)));
    assert.match(sheetFor("1942", "5.1").fire.join(" "), /Texas City/i);
    assert.equal(sheetFor("4.3-demo", "4.3").cls, "4.3");
    assert.match(sheetFor("1402", "4.3").wetting?.[0] ?? "", /casualty/i);
    const titles = sheetSections(sheetFor("1263", "3")).map((s) => s.title);
    assert.ok(titles.includes("Fire"));
    assert.ok(titles.includes("Explosion"));
    assert.ok(titles.includes("Pollution"));
  });

  it("does not mash class 4.3 into the 4.1 sheet", () => {
    assert.equal(sheetFor("1402", "4.3").guide, "ERG 138");
    assert.equal(sheetFor("3101", "5.2").guide, "ERG 145");
    assert.equal(sheetFor("2814", "6.2").guide, "ERG 158");
    assert.equal(sheetFor("2915", "7").guide, "ERG 163");
  });
});

describe("voyage risks", () => {
  it("reads lithium, PIH gas, explosives, and AN off the worked sample", () => {
    const parsed = parseManifest(WORKED_SAMPLE, "kg");
    const result = evaluateManifest(parsed.lines, CONTAINER_OPTIONS);
    const list = voyageRisks(result.lines, null);
    const ids = list.map((r) => r.id);
    assert.ok(ids.includes("lithium-runaway"));
    assert.ok(ids.includes("pih-gas"));
    assert.ok(ids.includes("explosives"));
    assert.ok(ids.includes("an-decompose"));
    assert.ok(ids.includes("cdc-report"));
    assert.ok(ids.includes("misdeclared"));
    assert.ok(ids.includes("hot-work"));
    assert.ok(ids.includes("after-smoke"));
    const cdc = list.find((r) => r.id === "cdc-report");
    assert.equal(cdc?.severity, "now");
    assert.ok(cdc?.uns.includes("1005"));
  });

  it("raises fixture-plan casualties without a DCM (BAPLIE DGS only)", () => {
    const list = voyageRisks([], parseBaplie(FIXTURE_BAPLIE, "fixture.edi"));
    const ids = list.map((r) => r.id);
    assert.ok(ids.includes("class3-fire"));
    assert.ok(ids.includes("reefer-fire"));
    assert.ok(ids.includes("lost-overboard"));
    assert.ok(ids.includes("wet-batteries"));
    assert.ok(list.some((r) => /Hatch 8/i.test(r.title) || /should not be on Hatch 8/i.test(r.title)));
    assert.ok(list.some((r) => /6th-tier/i.test(r.title) || /tier 92/i.test(r.title) || /Bay 18/i.test(r.title)));
  });

  it("flags water-reactive wetting and hold entry for under-deck 4.3", () => {
    const list = risks([
      line({
        un: "1402",
        hazClass: "4.3",
        name: "CALCIUM CARBIDE",
        container: "HOLD2000001",
        stowLoc: "0100604",
        packaging: "10 DR",
      }),
    ]);
    assert.ok(list.some((r) => r.id === "water-reactive"));
    assert.ok(list.some((r) => r.id === "hold-entry"));
    assert.ok(list.some((r) => r.family === "wetting"));
  });

  it("does not invent DG casualties on an empty voyage", () => {
    assert.equal(voyageRisks([], null).length, 0);
  });
});
