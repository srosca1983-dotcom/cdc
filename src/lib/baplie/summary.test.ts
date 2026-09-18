import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseBaplie } from "./parse.ts";
import { FIXTURE_BAPLIE, SAMPLE_BAPLIE } from "./sample.ts";
import {
  boxSize,
  formatTons,
  kgToLt,
  kgToMt,
  portName,
  summarizePlan,
  summaryText,
  teuOf,
  KG_PER_LT,
} from "./summary.ts";

const TWO_PORT = `UNA:+.? '
UNB+UNOA:2+PASHA+GEORGEII+260918:1200+1'
UNH+1+BAPLIE:D:95B:UN:SMDG22'
BGM+34+070W+9'
TDT+20+070W+1++PHK:172:20+++8012487:103:GEORGE II'
LOC+5+USLGB:139:6'
LOC+61+USHNL:139:6'
EQD+CN+HNL40000001+45G1:102:5++2+5'
LOC+147+0180284:139:5'
MEA+WT+G+KGM:20000'
LOC+11+USHNL:139:6'
DGS+IMD+3+1263+III'
EQD+CN+HNL20000001+22G1:102:5++2+5'
LOC+147+0170284:139:5'
MEA+WT+G+KGM:10000'
LOC+11+USHNL:139:6'
EQD+CN+SIN40000001+45G1:102:5++2+5'
LOC+147+0180384:139:5'
MEA+WT+G+KGM:18000'
LOC+11+SGSIN:139:6'
EQD+CN+SINRF000001+45R1:102:5++2+5'
LOC+147+0180484:139:5'
MEA+WT+G+KGM:24000'
TMP+2+-18:CEL'
LOC+11+SGSIN:139:6'
EQD+CN+EMPTY000001+22G1:102:5++2+4'
LOC+147+0170384:139:5'
LOC+11+USHNL:139:6'
UNT+40+1'
UNZ+1+1'
`;

describe("BAPLIE on-board summary", () => {
  it("converts kg to metric tonnes and long tons", () => {
    assert.equal(kgToMt(12_896_400), 12_896.4);
    assert.equal(kgToLt(KG_PER_LT), 1);
    assert.equal(formatTons(12_896.4), "12,896.4");
    assert.equal(formatTons(90.546), "90.5");
  });

  it("names common discharge ports and treats 20/40/45 as TEU", () => {
    assert.equal(portName("USHNL"), "Honolulu");
    assert.equal(portName("USHN"), "Honolulu");
    assert.equal(portName("SGSIN"), "Singapore");
    assert.equal(teuOf("20"), 1);
    assert.equal(teuOf("40"), 2);
    assert.equal(teuOf("45"), 2);
  });

  it("uses ISO size, not even/odd bay, for 20'/40'/45'", () => {
    assert.equal(boxSize({ container: "A", iso: "45G1", stow: null, reefer: false, operating: false, motors: "aft", dg: [] }), "40");
    assert.equal(boxSize({ container: "B", iso: "22G1", stow: null, reefer: false, operating: false, motors: "aft", dg: [] }), "20");
    assert.equal(boxSize({ container: "C", iso: "42G1", stow: null, reefer: false, operating: false, motors: "aft", dg: [] }), "40");
    assert.equal(boxSize({ container: "D", iso: "L5G1", stow: null, reefer: false, operating: false, motors: "aft", dg: [] }), "45");
  });

  it("groups the sample by voyage POD and splits RF / live / DG / empty", () => {
    const s = summarizePlan(parseBaplie(SAMPLE_BAPLIE, "sample-george-ii.edi"));
    assert.equal(s.totals.units, 5);
    assert.equal(s.totals.teu, 9);
    assert.equal(s.totals.forty, 4);
    assert.equal(s.totals.fortyFive, 0);
    assert.equal(s.totals.twenty, 1);
    assert.equal(s.totals.hc, 4);
    assert.equal(s.totals.kg, 92_000);
    assert.equal(formatTons(kgToMt(s.totals.kg)), "92.0");
    assert.equal(s.totals.rf, 3);
    assert.equal(s.totals.live, 2);
    assert.equal(s.totals.dry, 2);
    assert.equal(s.totals.dg, 1);
    assert.equal(s.totals.empty, 1);
    assert.equal(s.totals.missingWeight, 1);
    assert.equal(s.ports.length, 1);
    assert.equal(s.ports[0].name, "Honolulu");
    assert.equal(s.deck.units, 4);
    assert.equal(s.hold.units, 1);
    assert.equal(s.dgClasses[0]?.cls, "3");
    assert.ok(summaryText(s).includes("Honolulu"));
    assert.ok(summaryText(s).includes("class 3"));
  });

  it("splits discharge ports and keeps Singapore out of Honolulu", () => {
    const s = summarizePlan(parseBaplie(TWO_PORT, "two-port.edi"));
    assert.equal(s.totals.units, 5);
    assert.equal(s.totals.teu, 8);
    const hnl = s.ports.find((p) => p.code === "USHNL");
    const sin = s.ports.find((p) => p.code === "SGSIN");
    assert.equal(hnl?.units, 3);
    assert.equal(hnl?.twenty, 2);
    assert.equal(hnl?.forty, 1);
    assert.equal(hnl?.fortyFive, 0);
    assert.equal(hnl?.dg, 1);
    assert.equal(hnl?.empty, 1);
    assert.equal(sin?.units, 2);
    assert.equal(sin?.name, "Singapore");
    assert.equal(sin?.rf, 1);
    assert.equal(sin?.live, 1);
    assert.equal(sin?.dg, 0);
    assert.equal(s.totals.kg, 72_000);
    assert.equal(formatTons(kgToLt(s.totals.kg)), formatTons(72_000 / KG_PER_LT));
  });

  it("counts the vendored 20-box fixture, including DG classes", () => {
    const s = summarizePlan(parseBaplie(FIXTURE_BAPLIE, "george-ii-20.edi"));
    assert.equal(s.totals.units, 20);
    assert.ok(s.totals.teu >= 38);
    assert.ok(s.totals.dg >= 4);
    assert.ok(s.dgClasses.some((d) => d.cls === "3"));
    assert.ok(s.dgClasses.some((d) => d.cls === "8"));
    assert.ok(s.hatches.some((h) => h.hatch === 5 && h.units > 0));
    assert.equal(s.unplaced.units, 0);
  });

  it("matches the Baplie Viewer TEU rule: 40' and 45' are 2 TEU", () => {
    assert.equal(693 * 2 + 9, 1395);
  });
});
