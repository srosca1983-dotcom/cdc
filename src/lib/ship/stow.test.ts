import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { hatchFromBay, parseStow, formatStow, stowFromRowText } from "./stow.ts";
import { HATCHES, imdgAllowed, VESSEL, DECK_ROWS_H1, HOLD_ROWS_7, rowsPortToStbd } from "./george-ii.ts";
import { sheetFor } from "../erg/guides.ts";

describe("GEORGE II stowage", () => {
  it("maps the conversion triples: 1-2-3 Hatch 1 through 45-46-47 Hatch 12", () => {
    assert.equal(hatchFromBay(1), 1);
    assert.equal(hatchFromBay(2), 1);
    assert.equal(hatchFromBay(3), 1);
    assert.equal(hatchFromBay(5), 2);
    assert.equal(hatchFromBay(6), 2);
    assert.equal(hatchFromBay(14), 4);
    assert.equal(hatchFromBay(18), 5);
    assert.equal(hatchFromBay(38), 10);
    assert.equal(hatchFromBay(46), 12);
  });

  it("reads 14-08-84 and 14-00-06 the way the conversion sheet writes them", () => {
    const deck = parseStow("14-08-84");
    assert.ok(deck);
    assert.equal(deck?.bay, 14);
    assert.equal(deck?.row, 8);
    assert.equal(deck?.tier, 84);
    assert.equal(deck?.hatch, 4);
    assert.equal(deck?.onDeck, true);
    assert.equal(deck?.fortyFoot, true);
    assert.match(formatStow(deck!), /2nd tier on deck/);
    const hold = parseStow("14-00-06");
    assert.equal(hold?.row, 0);
    assert.equal(hold?.tier, 6);
    assert.equal(hold?.onDeck, false);
    assert.match(formatStow(hold!), /3rd tier below/);
  });

  it("reads 7-digit Pasha stow and 6-digit printed DCM stow", () => {
    const a = parseStow("0180284");
    assert.ok(a);
    assert.equal(a?.bay, 18);
    assert.equal(a?.row, 2);
    assert.equal(a?.tier, 84);
    assert.equal(a?.hatch, 5);
    assert.equal(a?.onDeck, true);
    const b = parseStow("0060504");
    assert.equal(b?.hatch, 2);
    assert.equal(b?.onDeck, false);
    const c = parseStow("220686");
    assert.equal(c?.bay, 22);
    assert.equal(c?.hatch, 6);
    assert.equal(c?.onDeck, true);
    assert.equal(stowFromRowText("UN 1263 14-08-84 CN"), "14-08-84");
  });

  it("takes 20'/40' from the ISO size type, not even/odd bay", () => {
    const twenty = parseStow("0180284", "22R1");
    assert.equal(twenty?.fortyFoot, false);
    const forty = parseStow("0170184", "45G1");
    assert.equal(forty?.fortyFoot, true);
  });

  it("keeps port-even, 00 centerline, starboard-odd looking forward", () => {
    assert.deepEqual(rowsPortToStbd([1, 2, 0, 12, 11]), [12, 2, 0, 1, 11]);
    assert.deepEqual(DECK_ROWS_H1, [10, 8, 6, 4, 2, 0, 1, 3, 5, 7, 9]);
    assert.deepEqual(HOLD_ROWS_7, [6, 4, 2, 0, 1, 3, 5]);
    assert.equal(HATCHES[0].holdRowIds.includes(0), true);
    assert.equal(HATCHES[8].hold, "Hold 5 (engine)");
    assert.equal(HATCHES[8].holdRows, 0);
    assert.equal(HATCHES[9].hold, "Hold 6");
    assert.ok((HATCHES[9].holdRows ?? 0) > 0);
  });

  it("keeps the house forward and Hold 2 as the only under-deck IMDG space", () => {
    assert.equal(VESSEL.house, "forward");
    const hold2 = HATCHES.filter((h) => h.imdgHold).map((h) => h.id);
    assert.deepEqual(hold2, [3, 4]);
    assert.equal(HATCHES.find((h) => h.id === 11)?.imdgOnDeck, true);
    assert.equal(HATCHES.find((h) => h.id === 10)?.imdgOnDeck, false);
    assert.equal(HATCHES.find((h) => h.id === 8)?.imdgOnDeck, false);
    assert.equal(imdgAllowed(HATCHES[2], "8", false), true);
    assert.equal(imdgAllowed(HATCHES[2], "6.1", false), false);
    assert.equal(imdgAllowed(HATCHES[9], "3", true), false);
  });

  it("opens an ERG sheet for LPG, lithium, and wet batteries", () => {
    assert.equal(sheetFor("1075", "2.1").guide, "ERG 115");
    assert.match(sheetFor("3480", "9").fire[0], /water/i);
    assert.equal(sheetFor("2794", "8").guide, "ERG 154");
    assert.match(sheetFor("1999", "3").guide, /128/);
  });
});
