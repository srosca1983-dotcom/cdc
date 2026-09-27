import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { I as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Check, S as ClipboardCopy, T as Anchor, _ as FileWarning, a as Upload, b as Download, c as Shield, d as Radio, f as MapPin, g as Flame, h as GitCompare, i as Waves, l as Ship, m as History, n as X, o as TriangleAlert, p as Mail, r as Wind, s as ThermometerSun, t as Zap, u as Search, v as Eraser, w as ArrowLeft, x as DoorOpen, y as Droplets } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-6DrTvN-p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
/** 12 across on deck. */
var DECK_ROWS_12 = [
	12,
	10,
	8,
	6,
	4,
	2,
	1,
	3,
	5,
	7,
	9,
	11
];
/** Hatch 1 (bays 1-2-3): 11 across with a CL 0 cell. */
var DECK_ROWS_H1 = [
	10,
	8,
	6,
	4,
	2,
	0,
	1,
	3,
	5,
	7,
	9
];
/** Bay 38 missing the middle section. */
var DECK_ROWS_H10 = [
	12,
	10,
	8,
	6,
	4,
	3,
	5,
	7,
	9,
	11
];
/** Inboard cells next to the Hatch 10 engine casing (not the whole cover). */
var CASING_ROWS_H10 = [4, 3];
/** Every hold: 7 across with CL 0. */
var HOLD_ROWS_7 = [
	6,
	4,
	2,
	0,
	1,
	3,
	5
];
/** Hatch n → 20'/40'/20' bays. */
var BAYS_BY_HATCH = [
	[
		1,
		2,
		3
	],
	[
		5,
		6,
		7
	],
	[
		9,
		10,
		11
	],
	[
		13,
		14,
		15
	],
	[
		17,
		18,
		19
	],
	[
		21,
		22,
		23
	],
	[
		25,
		26,
		27
	],
	[
		29,
		30,
		31
	],
	[
		33,
		34,
		35
	],
	[
		37,
		38,
		39
	],
	[
		41,
		42,
		43
	],
	[
		45,
		46,
		47
	]
];
var VESSEL = {
	name: "GEORGE II",
	clazz: "C9 class",
	abs: "8012487",
	officialNumber: "625873",
	company: "Pasha Hawaii",
	csm: "Cargo Securing Manual Rev. 15, December 2023",
	absLetter: "T2496467, 02-JAN-2024",
	house: "forward",
	sectionView: "aft-looking-forward",
	conversion: "Bay - Hatch / Conversion (Antiquity / Standard)"
};
function hatch(id, hold, holdAccess, extra) {
	const bays = BAYS_BY_HATCH[id - 1];
	return {
		id,
		label: `Hatch ${id}`,
		hold,
		holdAccess,
		bays,
		bay40: bays[1],
		onDeckRows: extra.deckRowIds.length,
		onDeckTiers: extra.onDeckTiers ?? 5,
		holdRows: extra.holdRowIds.length,
		holdTiers: extra.holdTiers ?? (extra.holdRowIds.length ? 6 : 0),
		...extra
	};
}
var HATCHES = [
	hatch(1, "Hold 1", "tunnel", {
		deckRowIds: DECK_ROWS_H1,
		holdRowIds: HOLD_ROWS_7,
		onDeckTiers: 5,
		imdgOnDeck: true,
		imdgHold: false,
		notes: [
			"Bays 1-2-3. On deck is 11 across with a centerline 0 cell — the only deck bay that has 00.",
			"Hold 1 is tunnel access only. No haz below deck (not Hold 2).",
			"Immediately aft of the house. Reefers face aft; motors aft except as noted."
		]
	}),
	hatch(2, "Hold 1", "tunnel", {
		deckRowIds: DECK_ROWS_12,
		holdRowIds: HOLD_ROWS_7,
		imdgOnDeck: true,
		imdgHold: false,
		notes: ["Bays 5-6-7. On deck 12 across (no 00). Hold 1 with Hatch 1, tunnel access.", "If reefers go in bay 6 below (uncommon), motors must face forward."]
	}),
	hatch(3, "Hold 2 (IMDG)", "deck", {
		deckRowIds: DECK_ROWS_12,
		holdRowIds: HOLD_ROWS_7,
		imdgOnDeck: true,
		imdgHold: true,
		notes: ["Bays 9-10-11. Cargo Hold No. 2 — the only below-deck space approved for IMDG.", "Hold 2 is deck access only. Mechanically ventilated. Stow 3 m from machinery-space boundaries."]
	}),
	hatch(4, "Hold 2 (IMDG)", "deck", {
		deckRowIds: DECK_ROWS_12,
		holdRowIds: HOLD_ROWS_7,
		imdgOnDeck: true,
		imdgHold: true,
		notes: ["Bays 13-14-15. Hold 2 with Hatch 3. Example: 14-08-84 = Hatch 4, cell 8, 2nd tier on deck; 14-00-06 = cell 0, 3rd tier below."]
	}),
	hatch(5, "Hold 3", "tunnel", {
		deckRowIds: DECK_ROWS_12,
		holdRowIds: HOLD_ROWS_7,
		imdgOnDeck: true,
		imdgHold: false,
		notes: ["Bays 17-18-19. Hold 3 tunnel access only. No haz below deck.", "Bay 18 reefers: no 6th-tier reefers. Prefer not to use outboard cells 05 & 06 on the 5th tier (cargo-fan access)."]
	}),
	hatch(6, "Hold 3", "tunnel", {
		deckRowIds: DECK_ROWS_12,
		holdRowIds: HOLD_ROWS_7,
		imdgOnDeck: true,
		imdgHold: false,
		notes: ["Bays 21-22-23. Hold 3 with Hatch 5. If reefers go in bay 22 below (uncommon), motors must face forward."]
	}),
	hatch(7, "Hold 4", "deck", {
		deckRowIds: DECK_ROWS_12,
		holdRowIds: HOLD_ROWS_7,
		imdgOnDeck: true,
		imdgHold: false,
		notes: ["Bays 25-26-27. Hold 4 deck access only. On-deck IMDG OK. No haz below deck."]
	}),
	hatch(8, "Hold 4", "deck", {
		deckRowIds: DECK_ROWS_12,
		holdRowIds: HOLD_ROWS_7,
		imdgOnDeck: false,
		imdgHold: false,
		notes: ["Bays 29-30-31. Hold 4 with Hatch 7.", "No IMDG on this hatch cover (CSM 1.6 — omitted after the conversion)."]
	}),
	hatch(9, "Hold 5 (engine)", "none", {
		deckRowIds: DECK_ROWS_12,
		holdRowIds: [],
		holdTiers: 0,
		imdgOnDeck: false,
		imdgHold: false,
		notes: ["Bays 33-34-35. Hold 5 was consumed by the new engine room — no below-deck cargo.", "No IMDG on this hatch cover. Long lashing rods at the forward end."]
	}),
	hatch(10, "Hold 6", "deck", {
		deckRowIds: DECK_ROWS_H10,
		holdRowIds: HOLD_ROWS_7,
		onDeckTiers: 3,
		imdgOnDeck: false,
		imdgHold: false,
		casingRows: CASING_ROWS_H10,
		notes: [
			"Bays 37-38-39. Hold 6 deck access only. Bay 38 is missing the middle section.",
			"Cells next to the new engine casing — void unless cargo must go here.",
			"No IMDG on this hatch cover. Aft mast / LNG vent mast — crane booms stay clear."
		]
	}),
	hatch(11, "Hold 6", "deck", {
		deckRowIds: DECK_ROWS_12,
		holdRowIds: HOLD_ROWS_7,
		imdgOnDeck: true,
		imdgHold: false,
		notes: ["Bays 41-42-43. Hold 6 with Hatch 10. On-deck IMDG is allowed here (the aft exception).", "No haz below deck. Lashing is tight; 45' will fit, 40' preferred."]
	}),
	hatch(12, "Hold 7", "deck", {
		deckRowIds: DECK_ROWS_12,
		holdRowIds: HOLD_ROWS_7,
		holdTiers: 4,
		imdgOnDeck: false,
		imdgHold: false,
		notes: [
			"Bays 45-46-47. Hold 7 deck access only. Aft part of the hold is now the FPR.",
			"No IMDG on this hatch cover. Stern, next to the stack — not the house.",
			"LNG fuel tanks took former cargo space here and in Hold 5 — they are not deck cargo tanks."
		]
	})
];
function hatchSpec(id) {
	return HATCHES.find((h) => h.id === id);
}
/** Port (even, high) → centerline 00 → starboard (odd). */
function rowsPortToStbd(rows) {
	const uniq = [...new Set(rows)];
	const even = uniq.filter((r) => r !== 0 && r % 2 === 0).sort((a, b) => b - a);
	const cl = uniq.includes(0) ? [0] : [];
	const odd = uniq.filter((r) => r % 2 === 1).sort((a, b) => a - b);
	return [
		...even,
		...cl,
		...odd
	];
}
/** Real cover cells only — never invent Hatch 10 rows 0/1/2 or Hatch 9 hold. */
function deckRowsFor(spec, _occupied = []) {
	return rowsPortToStbd([...spec.deckRowIds]);
}
function holdRowsFor(spec, _occupied = []) {
	if (!spec.holdRowIds.length) return [];
	return rowsPortToStbd([...spec.holdRowIds]);
}
function isRealRow(spec, onDeck, row) {
	return (onDeck ? spec.deckRowIds : spec.holdRowIds).includes(row);
}
/** Deck tiers start at 82 (1st on deck). 90/92 only when a box is actually there. */
function deckTiersFor(spec, occupied = []) {
	const tiers = [];
	for (let i = 0; i < spec.onDeckTiers; i++) {
		const t = 82 + 2 * i;
		if (t >= 90) continue;
		tiers.push(t);
	}
	for (const t of occupied) if ((t === 90 || t === 92) && !tiers.includes(t)) tiers.push(t);
	return tiers.sort((a, b) => a - b);
}
/** Hold tiers start at 02. Hatch 9 is empty; Hatch 12 is four (02/04/06/08). */
function holdTiersFor(spec) {
	if (!spec.holdTiers) return [];
	const tiers = [];
	for (let i = 0; i < spec.holdTiers; i++) tiers.push(2 + 2 * i);
	return tiers;
}
/** Bays a box actually occupies. A 40' takes the whole 20'/40'/20' triple. */
function occupiedBays(stow, spec) {
	const h = spec ?? hatchSpec(stow.hatch);
	if (!h) return [stow.bay];
	if (stow.fortyFoot) return [...h.bays];
	return [stow.bay];
}
/** True when the 20'/40' footprints share a bay on the same hatch. */
function sameBayColumn(a, b) {
	if (a.hatch !== b.hatch) return false;
	const spec = hatchSpec(a.hatch);
	const oa = occupiedBays(a, spec);
	const ob = occupiedBays(b, spec);
	return oa.some((bay) => ob.includes(bay));
}
/** How many cells apart on the hatch line (port→stbd). 0 = same cell, 1 = neighbors. */
function athwartGap(hatchId, onDeck, rowA, rowB) {
	if (rowA === rowB) return 0;
	const spec = hatchSpec(hatchId);
	const line = rowsPortToStbd([
		...spec ? onDeck ? spec.deckRowIds : spec.holdRowIds : [],
		rowA,
		rowB
	]);
	const ia = line.indexOf(rowA);
	const ib = line.indexOf(rowB);
	if (ia < 0 || ib < 0) return Math.abs(rowA - rowB);
	return Math.abs(ia - ib);
}
function isCasingCell(hatchId, row) {
	const spec = hatchSpec(hatchId);
	if (!spec?.casingRows?.length) return false;
	return spec.casingRows.includes(row);
}
var SHIP_NOTES = [
	"House and conning are forward. Cargo is all aft of the bridge (CSM 1.5 — no visibility restriction).",
	"Bays: each hatch is three numbers (20'/40'/20'). Odd = 20' fwd or aft in the cell; even = 40'.",
	"Cells: looking forward, port is even (12…2), centerline is 00, starboard is odd (1…11).",
	"Hatch 1 on deck is 11 across with a 00 cell. Other decks are 12 across. Holds are 7 across with 00.",
	"Below-deck IMDG: Cargo Hold No. 2 only (Hatches 3 & 4). Hold 5 is the new engine room.",
	"On-deck IMDG: every hatch cover except 8, 9, 10 and 12. Hatch 11 is allowed.",
	"Hold 7 aft is now the FPR. LNG fuel tanks replaced former cargo space — they are not deck tanks."
];
/** GEORGE II stowage from the Bay-Hatch conversion sheet and Pasha DCM. */
function hatchFromBay(bay) {
	for (let i = 0; i < BAYS_BY_HATCH.length; i++) if (BAYS_BY_HATCH[i].includes(bay)) return i + 1;
	return 0;
}
function partsFrom(raw) {
	const t = String(raw).trim();
	const split = t.split(/[\s\-\/.]+/).filter((p) => /^\d+$/.test(p));
	if (split.length === 3) return {
		bay: Number(split[0]),
		row: Number(split[1]),
		tier: Number(split[2])
	};
	const digits = t.replace(/\D/g, "");
	if (digits.length === 7) return {
		bay: Number(digits.slice(0, 3)),
		row: Number(digits.slice(3, 5)),
		tier: Number(digits.slice(5, 7))
	};
	if (digits.length === 6) return {
		bay: Number(digits.slice(0, 2)),
		row: Number(digits.slice(2, 4)),
		tier: Number(digits.slice(4, 6))
	};
	return null;
}
function isoFortyFoot(iso) {
	if (!iso) return void 0;
	const c = iso.trim().toUpperCase()[0];
	if (c === "2") return false;
	if (c === "4" || c === "L" || c === "M" || c === "A") return true;
}
function parseStow(raw, iso) {
	if (!raw) return null;
	const p = partsFrom(raw);
	if (!p) return null;
	const { bay, row, tier } = p;
	if (!bay || bay > 47 || row > 22 || row < 0) return null;
	if (tier > 16 && tier < 80 || tier > 96 || tier < 0) return null;
	if (tier === 0) return null;
	const hatch = hatchFromBay(bay);
	if (!hatch) return null;
	const fromIso = isoFortyFoot(iso);
	return {
		raw: String(raw).trim(),
		bay,
		row,
		tier,
		onDeck: tier >= 80,
		hatch,
		fortyFoot: fromIso ?? bay % 2 === 0
	};
}
/** Container number for maps: A-Z0-9 only, upper case. */
function containerKey(id) {
	return (id || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}
function stowEqual(a, b) {
	if (!a || !b) return false;
	return a.bay === b.bay && a.row === b.row && a.tier === b.tier;
}
function formatStowRaw(pos) {
	return `${String(pos.bay).padStart(3, "0")}${String(pos.row).padStart(2, "0")}${String(pos.tier).padStart(2, "0")}`;
}
/** Prefer a 6–7 digit stow token, or bay-row-tier like 14-08-84. */
function stowFromRowText(text) {
	const hyphen = [...text.matchAll(/\b(\d{1,3})[-/](\d{1,2})[-/](\d{2})\b/g)];
	for (let i = hyphen.length - 1; i >= 0; i--) {
		const token = hyphen[i][0];
		const pos = parseStow(token);
		if (pos && pos.row <= 16 && (pos.onDeck || pos.tier >= 2 && pos.tier <= 16)) return token;
	}
	const matches = [...text.matchAll(/\b(\d{6,7})\b/g)].map((m) => m[1]);
	for (let i = matches.length - 1; i >= 0; i--) {
		const pos = parseStow(matches[i]);
		if (!pos) continue;
		if (pos.row <= 16 && (pos.onDeck || pos.tier >= 2 && pos.tier <= 16)) return matches[i];
	}
}
function tierLabel(pos) {
	if (pos.onDeck) {
		const n = (pos.tier - 80) / 2;
		if (n >= 1 && n <= 6 && Number.isInteger(n)) return `${[
			"1st",
			"2nd",
			"3rd",
			"4th",
			"5th",
			"6th"
		][n - 1]} tier on deck`;
		return "on deck";
	}
	const n = pos.tier / 2;
	if (n >= 1 && n <= 8 && Number.isInteger(n)) return `${[
		"1st",
		"2nd",
		"3rd",
		"4th",
		"5th",
		"6th",
		"7th",
		"8th"
	][n - 1]} tier below deck`;
	return "in hold";
}
function formatStow(pos) {
	const bay = String(pos.bay).padStart(2, "0");
	const row = String(pos.row).padStart(2, "0");
	const tier = String(pos.tier).padStart(2, "0");
	const ft = pos.fortyFoot ? "40'" : "20'";
	return `${bay}-${row}-${tier} · Hatch ${pos.hatch} · cell ${row} · ${ft} · ${tierLabel(pos)}`;
}
function normalizeUn(raw) {
	if (!raw) return "";
	const t = raw.toUpperCase().replace(/["']/g, "").trim();
	if (!t || t === "NAN" || t === "N/A" || t === "-" || t === "NONE") return "";
	const m = t.match(/\b(?:UN|NA)?\s*(\d{3,5})\b/);
	if (!m) return "";
	return m[1].padStart(4, "0");
}
function parseHazardClass(raw) {
	if (!raw) return {
		primary: "",
		subsidiary: ""
	};
	const t = raw.trim();
	const subMatch = t.match(/\(([^)]+)\)/);
	const subsidiary = subMatch ? subMatch[1].trim() : "";
	const compact = t.replace(/class(ification)?/gi, "").replace(/\([^)]*\)/g, "").replace(/div(ision)?/gi, "").trim().replace(/\s+/g, "");
	const m = compact.match(/(\d(?:\.\d)?[A-Z]?)/i);
	return {
		primary: m ? m[1].toUpperCase().replace(/(\d)([A-Z])/, "$1$2") : compact,
		subsidiary
	};
}
/**
* Pasha / IMDG one-cell description:
* UN3082,ENVIRONMENTALLY HAZARDOUS SUBSTANCE, LIQUID, N.O.S., 9,III
* UN3480,LITHIUM ION BATTERIES, 9,
* UN1992,FLAMMABLE LIQUID, TOXIC, N.O.S., 3(6.1), II
*/
function parseCombinedHazmat(raw) {
	if (!raw) return null;
	const t = raw.replace(/\s+/g, " ").trim();
	const head = t.match(/^(UN|NA)\s*(\d{3,5})\s*,\s*(.+)$/i);
	if (!head) return null;
	const rest = head[3].trim();
	const tail = rest.match(/^(.*),\s*(\d(?:\.\d)?)\s*(?:\(\s*(\d(?:\.\d)?)\s*\))?\s*,?\s*(I{1,3}|[123])?\s*$/i);
	if (!tail) {
		const un = normalizeUn(t);
		return un ? {
			un,
			name: rest.replace(/,$/, "").trim(),
			hazClass: "",
			subsidiary: "",
			packingGroup: ""
		} : null;
	}
	const pgRaw = (tail[4] || "").toUpperCase();
	const packingGroup = pgRaw === "1" ? "I" : pgRaw === "2" ? "II" : pgRaw === "3" ? "III" : pgRaw;
	return {
		un: head[2].padStart(4, "0"),
		name: tail[1].replace(/,\s*$/, "").trim(),
		hazClass: tail[2],
		subsidiary: tail[3] || "",
		packingGroup
	};
}
function looksLikeCombinedHazmat(raw) {
	return /^(UN|NA)\s*\d{3,5}\s*,/i.test(raw.trim()) && /,\s*\d(?:\.\d)?/.test(raw);
}
function classFromToken(raw) {
	const m = (raw || "").replace(/\s+/g, " ").trim().match(/^(\d(?:\.\d)?)\s*(?:\(\s*(\d(?:\.\d)?)\s*\))?$/);
	if (m) return {
		primary: m[1],
		subsidiary: m[2] || ""
	};
	return parseHazardClass(raw);
}
var DEFAULT_OPTIONS = {
	carriageMode: "containerized",
	defaultQtyUnit: "lb",
	residueMode: false
};
var CONTAINER_OPTIONS = DEFAULT_OPTIONS;
var LB_TO_KG = .45359237;
var MT_TO_KG = 1e3;
var LONG_TON_TO_KG = 1016.0469088;
var SHORT_TON_TO_KG = 907.18474;
function parseNumber(raw) {
	if (!raw) return null;
	const m = raw.replace(/,/g, "").replace(/\s+/g, " ").trim().match(/-?\d+(?:\.\d+)?/);
	if (!m) return null;
	const n = Number(m[0]);
	return Number.isFinite(n) ? n : null;
}
function toKg(value, unit) {
	if (unit === "lb") return value * LB_TO_KG;
	if (unit === "mt") return value * MT_TO_KG;
	return value;
}
function parseQuantityToKg(raw, defaultUnit) {
	if (!raw) return null;
	const text = raw.replace(/,/g, "").trim().toLowerCase();
	if (!text || text === "-" || text === "n/a" || text === "na") return null;
	const n = parseNumber(text);
	if (n === null) return null;
	if (/\b(metric\s*tons?|m\/t|mt|tonnes?)\b/.test(text)) return n * MT_TO_KG;
	if (/\b(long\s*tons?|l\/t|lt)\b/.test(text)) return n * LONG_TON_TO_KG;
	if (/\b(short\s*tons?|s\/t|st|net\s*tons?)\b/.test(text)) return n * SHORT_TON_TO_KG;
	if (/\b(lbs?|pounds?)\b/.test(text)) return n * LB_TO_KG;
	if (/\b(kgs?|kilograms?)\b/.test(text)) return n;
	if (/\bgrams?\b/.test(text) || /\bg\b/.test(text)) return n / 1e3;
	if (/\btons?\b/.test(text) || /(^|\s)t(\s|$)/.test(text)) return n * MT_TO_KG;
	return toKg(n, defaultUnit);
}
function formatKg(kg) {
	if (kg === null || !Number.isFinite(kg)) return "—";
	if (kg >= 1e3) return `${trimNum(kg / 1e3)} MT`;
	if (kg >= 1) return `${trimNum(kg)} kg`;
	return `${trimNum(kg * 1e3)} g`;
}
function trimNum(n) {
	if (Number.isInteger(n)) return n.toLocaleString("en-US");
	return n.toLocaleString("en-US", { maximumFractionDigits: 3 });
}
1e3 * LB_TO_KG;
var UN_IN_LINE = /\bUN\s+(\d{3,5})\b/i;
var CONTAINER_RE = /\b([A-Z]{4}\d{7})\b/;
var PKG_RE = /^(\d+(?:,\d{3})*(?:\.\d+)?)\s+(CARTONS?|BOXES|BOX|DRUMS?|CYLINDERS?|CYL|PALLETS?|CASES?|TOTES?|BAGS?|CANS?|PAILS?|CRATES?|PACKAGES?|TUBES?|JERRICANS?|TANKS?|IBCS?)\b/i;
var WEIGHT_RE = /(\d+(?:,\d{3})*(?:\.\d+)?)\s+(LBS?|KGS?|POUNDS?|KILOGRAMS?|MT)\b/i;
var SKIP_NEAR = /^(ACCURATE AND COMPLETE|PREPARER:|MASTER:|EXP023AR|PAGE\s+\d|VESSEL:|VOYAGE:|COUNTRY OF|RADIO CALL|PORT OF LOADING|DISCHARGE PORT|DESTINATION:|<<<|GRAND TOTAL|END\s+OF\s+REPORT|CONTAINER\s+NET WEIGH|BOOKING\s+GROSS|SAID TO CONTAIN|STOWAGE|REMARKS|CAT A$)/i;
var LABEL_NAME = /^(FLAMMABLE|CORROSIVE|TOXIC|OXIDIZING|MISC|LIMITED|NON-FLAMMABLE|GROUP|SUBSTANCES|DANGEROUS WHEN WET|MARINE POLLUTANT)/i;
function looksLikeExp023(text) {
	const t = text.slice(0, 8e3);
	return /EXP023AR|HAZARDOUS CARGO MANIFEST BY POD/i.test(t) && UN_IN_LINE.test(text);
}
function nearby(lines, i, dir, max = 8) {
	const out = [];
	for (let j = i + dir; j >= 0 && j < lines.length && out.length < max; j += dir) {
		const t = lines[j].trim();
		if (!t) continue;
		if (/^-{8,}$/.test(t)) break;
		if (SKIP_NEAR.test(t)) continue;
		out.push(t);
	}
	return out;
}
function parseContainerLine(s) {
	const cm = s.match(/^([A-Z]{4}\d{7})\s+(\d(?:\.\d)?(?:\s*\(\s*\d(?:\.\d)?\s*\))?)\s+(.*)$/);
	if (!cm) return null;
	const parsed = classFromToken(cm[2]);
	const rest = cm[3].trim();
	const restM = rest.match(/^(?:(\d{6,8})\s+)?(?:(I{1,3})\s+)?(.+)$/);
	const name = (restM?.[3] ?? rest).trim();
	if (LABEL_NAME.test(name)) return {
		container: cm[1],
		hazClass: parsed.primary,
		subsidiary: parsed.subsidiary,
		packingGroup: restM?.[2] ?? "",
		name: ""
	};
	return {
		container: cm[1],
		hazClass: parsed.primary,
		subsidiary: parsed.subsidiary,
		packingGroup: restM?.[2] ?? "",
		name
	};
}
function linesFromExp023Text(text) {
	const rows = text.split(/\r?\n/);
	const lines = [];
	for (let i = 0; i < rows.length; i++) {
		const unm = rows[i].match(UN_IN_LINE);
		if (!unm) continue;
		const un = normalizeUn(unm[1]) || unm[1].padStart(4, "0");
		const cur = rows[i];
		const above = nearby(rows, i, -1);
		const below = nearby(rows, i, 1);
		let meta = null;
		for (const a of above) {
			meta = parseContainerLine(a);
			if (meta) break;
			const cOnly = a.match(CONTAINER_RE);
			if (cOnly && !meta) meta = {
				container: cOnly[1],
				hazClass: "",
				subsidiary: "",
				packingGroup: "",
				name: ""
			};
		}
		const wm = cur.match(WEIGHT_RE);
		const quantityRaw = wm ? `${wm[1]} ${wm[2]}` : "";
		const booking = cur.match(/^\s*(\d{7,12})\b/)?.[1];
		const tech = cur.match(/\(([^)]+)\)/)?.[0];
		let packaging = "";
		for (const b of below) if (PKG_RE.test(b.trim())) {
			packaging = b.trim().match(PKG_RE)?.[0] ?? b.trim();
			break;
		}
		const windowText = [
			cur,
			...above,
			...below
		].join("\n");
		const limitedQty = /LTD\s*QTY|LIMITED QUANTIT/i.test(windowText);
		let name = meta?.name ?? "";
		if (name && /N\.O\.S\.?\s*$/i.test(name)) {
			if (cur.match(/\bN\.O\.S\.?\b/i) && !/N\.O\.S/i.test(name)) name = `${name} N.O.S.`;
		}
		lines.push({
			rowIndex: lines.length + 1,
			un,
			name,
			hazClass: meta?.hazClass ?? "",
			subsidiary: meta?.subsidiary ?? "",
			packaging,
			packingGroup: meta?.packingGroup ?? "",
			quantityKg: parseQuantityToKg(quantityRaw, "lb"),
			quantityRaw,
			raw: [
				above[0] ?? "",
				cur.trim(),
				below[0] ?? ""
			].filter(Boolean),
			container: meta?.container,
			booking,
			technicalName: tech,
			limitedQty: limitedQty || void 0
		});
	}
	return lines;
}
function voyageFromExp023(text) {
	const info = {};
	const grab = (label) => {
		return text.match(new RegExp(`^\\s*${label}\\s*:\\s*(.+)$`, "im"))?.[1]?.trim();
	};
	const vessel = grab("VESSEL");
	const voyage = grab("VOYAGE");
	const pol = grab("PORT OF LOADING");
	const pod = grab("DISCHARGE PORT");
	const dest = grab("DESTINATION");
	if (vessel) info.vessel = vessel;
	if (voyage) info.voyage = voyage;
	if (pol) info.pol = pol;
	if (pod) info.pod = pod;
	else if (dest) info.pod = dest;
	return info;
}
function parseExp023Text(text, sourceName = "manifest.doc") {
	const lines = linesFromExp023Text(text);
	const warnings = [];
	if (lines.length === 0) warnings.push("No UN numbers were found in the hazardous cargo manifest.");
	return {
		header: [
			"UN",
			"Proper Shipping Name",
			"Class",
			"Packaging",
			"Weight"
		],
		lines,
		warnings,
		delimiter: "pdf",
		voyage: voyageFromExp023(text),
		unitGuess: "lb",
		sourceName
	};
}
/**
* Compact UN catalog for 33 CFR 160.202 screening.
* Flags encode the regulatory hooks; this is not a copy of 49 CFR 172.101.
* Unknown UNs still evaluate via class rules. Missing PIH zone data produces
* REVIEW, not a silent NOT_CDC.
*
* Format: UN|Proper shipping name|class|flag,flag|zone
*/
var RAW = `
1005|Ammonia, anhydrous|2.3|pih_gas,bulk_lpgas,residue_always|D
1008|Boron trifluoride|2.3|pih_gas|B
1010|Butadienes, stabilized|2.1|bulk_lpgas|
1011|Butane|2.1|bulk_lpgas|
1012|Butylene|2.1|bulk_lpgas|
1016|Carbon monoxide, compressed|2.3|pih_gas|D
1017|Chlorine|2.3|pih_gas,bulk_lpgas,residue_always|B
1023|Coal gas, compressed|2.3|pih_gas|
1026|Cyanogen|2.3|pih_gas|A
1032|Dimethylamine, anhydrous|2.1|bulk_lpgas|
1035|Ethane|2.1|bulk_lpgas,residue_always|
1036|Ethylamine|2.1|bulk_lpgas|
1037|Ethyl chloride|2.1|bulk_lpgas|
1038|Ethylene, refrigerated liquid|2.1|bulk_lpgas|
1040|Ethylene oxide|2.3|pih_gas,bulk_lpgas,residue_always|D
1045|Fluorine, compressed|2.3|pih_gas|A
1048|Hydrogen bromide, anhydrous|2.3|pih_gas|C
1050|Hydrogen chloride, anhydrous|2.3|pih_gas|C
1051|Hydrogen cyanide, stabilized|6.1|pih_liquid|A
1053|Hydrogen sulfide|2.3|pih_gas|B
1060|Methyl acetylene and propadiene mixture|2.1|bulk_lpgas|
1062|Methyl bromide|2.3|pih_gas,bulk_lpgas,residue_always|C
1063|Methyl chloride|2.1|bulk_lpgas|
1064|Methyl mercaptan|2.3|pih_gas|C
1067|Dinitrogen tetroxide|2.3|pih_gas|A
1069|Nitrosyl chloride|2.3|pih_gas|A
1071|Oil gas, compressed|2.3|pih_gas|
1075|Petroleum gases, liquefied|2.1|bulk_lpgas|
1076|Phosgene|2.3|pih_gas|A
1077|Propylene|2.1|bulk_lpgas|
1079|Sulfur dioxide|2.3|pih_gas,bulk_lpgas,residue_always|C
1082|Trifluorochloroethylene, stabilized|2.3|pih_gas|C
1086|Vinyl chloride, stabilized|2.1|bulk_lpgas,residue_always|
1089|Acetaldehyde|3|bulk_lpgas|
1092|Acrolein, stabilized|6.1|pih_liquid|A
1098|Allyl alcohol|6.1|pih_liquid,named_bulk_liquid|B
1135|Ethylene chlorohydrin|6.1|pih_liquid,named_bulk_liquid|B
1143|Crotonaldehyde or crotonaldehyde, stabilized|6.1|pih_liquid,named_bulk_liquid|B
1163|Dimethylhydrazine, unsymmetrical|6.1|pih_liquid|B
1182|Ethyl chloroformate|6.1|pih_liquid|A
1185|Ethyleneimine, stabilized|6.1|pih_liquid|A
1238|Methyl chloroformate|6.1|pih_liquid|A
1239|Methyl chloromethyl ether|6.1|pih_liquid|A
1244|Methylhydrazine|6.1|pih_liquid|A
1251|Methyl vinyl ketone, stabilized|6.1|pih_liquid|A
1259|Nickel carbonyl|6.1|pih_liquid|A
1280|Propylene oxide|3|named_bulk_liquid|
1380|Pentaborane|4.2|pih_liquid|A
1510|Tetranitromethane|5.1|pih_liquid|B
1541|Acetone cyanohydrin, stabilized|6.1|pih_liquid,named_bulk_liquid|B
1556|Arsenic compound, liquid, n.o.s.|6.1|pih_liquid|
1560|Arsenic trichloride|6.1|pih_liquid|A
1569|Bromoacetone|6.1|pih_liquid|B
1580|Chloropicrin|6.1|pih_liquid|A
1589|Cyanogen chloride, stabilized|2.3|pih_gas|A
1595|Dimethyl sulfate|6.1|pih_liquid|B
1605|Ethylene dibromide|6.1|pih_liquid,named_bulk_liquid|B
1614|Hydrogen cyanide, stabilized (absorbed)|6.1|pih_liquid|A
1647|Methyl bromide and ethylene dibromide mixture|6.1|pih_liquid|B
1649|Motor fuel anti-knock mixture|6.1|pih_liquid|B
1660|Nitric oxide, compressed|2.3|pih_gas|A
1670|Perchloromethyl mercaptan|6.1|pih_liquid|B
1695|Chloroacetone, stabilized|6.1|pih_liquid|A
1722|Allyl chloroformate|6.1|pih_liquid|A
1741|Boron trichloride|2.3|pih_gas|C
1744|Bromine|8|pih_liquid|A
1745|Bromine pentafluoride|5.1|pih_liquid|A
1746|Bromine trifluoride|5.1|pih_liquid|A
1749|Chlorine trifluoride|2.3|pih_gas|B
1754|Chlorosulfonic acid|8|named_bulk_liquid,pih_liquid|B
1809|Phosphorus trichloride|6.1|pih_liquid|B
1810|Phosphorus oxychloride|6.1|pih_liquid|B
1829|Sulfur trioxide, stabilized|8|pih_liquid|A
1831|Sulfuric acid, fuming (oleum)|8|named_bulk_liquid|
1834|Sulfuryl chloride|8|pih_liquid|B
1838|Titanium tetrachloride|8|pih_liquid|B
1859|Silicon tetrafluoride|2.3|pih_gas|B
1892|Ethyldichloroarsine|6.1|pih_liquid|A
1911|Diborane|2.3|pih_gas|A
1942|Ammonium nitrate|5.1|an_51|
1961|Ethane, refrigerated liquid|2.1|bulk_lpgas,residue_always|
1962|Ethylene, refrigerated liquid|2.1|bulk_lpgas|
1965|Hydrocarbon gas mixture, liquefied, n.o.s.|2.1|bulk_lpgas|
1966|Hydrogen, refrigerated liquid|2.1|bulk_lpgas|
1967|Insecticide gas, toxic, n.o.s.|2.3|pih_gas|
1969|Isobutane|2.1|bulk_lpgas|
1972|Methane, refrigerated liquid (LNG)|2.1|bulk_lpgas,residue_always|
1975|Nitric oxide and dinitrogen tetroxide mixture|2.3|pih_gas|A
1978|Propane|2.1|bulk_lpgas|
1994|Iron pentacarbonyl|6.1|pih_liquid|A
2032|Nitric acid, red fuming|8|pih_liquid|B
2067|Ammonium nitrate based fertilizer|5.1|an_fertilizer|
2071|Ammonium nitrate based fertilizer|9||
2188|Arsine|2.3|pih_gas|A
2189|Dichlorosilane|2.3|pih_gas|B
2190|Oxygen difluoride, compressed|2.3|pih_gas|A
2191|Sulfuryl fluoride|2.3|pih_gas|D
2192|Germane|2.3|pih_gas|B
2194|Selenium hexafluoride|2.3|pih_gas|A
2195|Tellurium hexafluoride|2.3|pih_gas|A
2196|Tungsten hexafluoride|2.3|pih_gas|B
2197|Hydrogen iodide, anhydrous|2.3|pih_gas|C
2198|Phosphorus pentafluoride|2.3|pih_gas|B
2199|Phosphine|2.3|pih_gas|A
2202|Hydrogen selenide, anhydrous|2.3|pih_gas|A
2204|Carbonyl sulfide|2.3|pih_gas|C
2232|2-Chloroethanal|6.1|pih_liquid|A
2334|Allylamine|6.1|pih_liquid|B
2337|Phenyl mercaptan|6.1|pih_liquid|B
2382|Dimethylhydrazine, symmetrical|6.1|pih_liquid|B
2407|Isopropyl chloroformate|6.1|pih_liquid|A
2417|Carbonyl fluoride|2.3|pih_gas|B
2418|Sulfur tetrafluoride|2.3|pih_gas|A
2420|Hexafluoroacetone|2.3|pih_gas|B
2421|Nitrogen trioxide|2.3|pih_gas|A
2426|Ammonium nitrate, liquid|5.1|an_other|
2438|Trimethylacetyl chloride|6.1|pih_liquid|B
2442|Trichloroacetyl chloride|8|pih_liquid|B
2474|Thiophosgene|6.1|pih_liquid|B
2477|Methyl isothiocyanate|6.1|pih_liquid|B
2480|Methyl isocyanate|6.1|pih_liquid|A
2481|Ethyl isocyanate|6.1|pih_liquid|A
2482|n-Propyl isocyanate|6.1|pih_liquid|A
2483|Isopropyl isocyanate|6.1|pih_liquid|A
2484|tert-Butyl isocyanate|6.1|pih_liquid|A
2485|n-Butyl isocyanate|6.1|pih_liquid|A
2486|Isobutyl isocyanate|6.1|pih_liquid|A
2487|Phenyl isocyanate|6.1|pih_liquid|B
2488|Cyclohexyl isocyanate|6.1|pih_liquid|B
2521|Diketene, stabilized|6.1|pih_liquid|B
2534|Methylchlorosilane|2.3|pih_gas|B
2548|Chlorine pentafluoride|2.3|pih_gas|B
2605|Methoxymethyl isocyanate|6.1|pih_liquid|A
2606|Methyl orthosilicate|6.1|pih_liquid|B
2644|Methyl iodide|6.1|pih_liquid|B
2646|Hexachlorocyclopentadiene|6.1|pih_liquid|B
2668|Chloroacetonitrile|6.1|pih_liquid|B
2676|Stibine|2.3|pih_gas|A
2692|Boron tribromide|8|pih_liquid|B
2740|n-Propyl chloroformate|6.1|pih_liquid|B
2742|Chloroformates, toxic, corrosive, flammable, n.o.s.|6.1|pih_liquid|
2743|n-Butyl chloroformate|6.1|pih_liquid|B
2810|Toxic liquid, organic, n.o.s.|6.1||
2826|Ethyl chlorothioformate|8|pih_liquid|B
2901|Bromine chloride|2.3|pih_gas|B
2908|Radioactive material, excepted package, empty packaging|7|rad_excepted|
2909|Radioactive material, excepted package, articles|7|rad_excepted|
2910|Radioactive material, excepted package, limited quantity|7|rad_excepted|
2911|Radioactive material, excepted package, instruments or articles|7|rad_excepted|
2912|Radioactive material, low specific activity (LSA-I)|7|rad_other|
2913|Radioactive material, surface contaminated objects (SCO-I or SCO-II)|7|rad_other|
2915|Radioactive material, Type A package|7|rad_other|
2916|Radioactive material, Type B(U) package|7|rad_type_b|
2917|Radioactive material, Type B(M) package|7|rad_type_b|
2918|Radioactive material, Type A package, fissile|7|rad_fissile|
2977|Radioactive material, uranium hexafluoride, fissile|7|rad_fissile|
2978|Radioactive material, uranium hexafluoride|7|rad_other|
2983|Ethylene oxide and propylene oxide mixture|3|named_bulk_liquid,bulk_lpgas|
3023|2-Methyl-2-heptanethiol|6.1|pih_liquid|B
3057|Trifluoroacetyl chloride|2.3|pih_gas|B
3079|Methacrylonitrile, stabilized|3|pih_liquid,named_bulk_liquid|B
3083|Perchloryl fluoride|2.3|pih_gas|B
3160|Liquefied gas, toxic, flammable, n.o.s.|2.3|pih_gas|
3162|Liquefied gas, toxic, n.o.s.|2.3|pih_gas|
3246|Methanesulfonyl chloride|6.1|pih_liquid|B
3278|Organophosphorus compound, liquid, toxic, n.o.s.|6.1||
3286|Flammable liquid, toxic, corrosive, n.o.s.|3||
3300|Carbon dioxide and ethylene oxide mixture|2.3|pih_gas|
3303|Compressed gas, toxic, oxidizing, n.o.s.|2.3|pih_gas|
3304|Compressed gas, toxic, corrosive, n.o.s.|2.3|pih_gas|
3305|Compressed gas, toxic, flammable, corrosive, n.o.s.|2.3|pih_gas|
3306|Compressed gas, toxic, oxidizing, corrosive, n.o.s.|2.3|pih_gas|
3307|Liquefied gas, toxic, oxidizing, n.o.s.|2.3|pih_gas|
3308|Liquefied gas, toxic, corrosive, n.o.s.|2.3|pih_gas|
3309|Liquefied gas, toxic, flammable, corrosive, n.o.s.|2.3|pih_gas|
3310|Liquefied gas, toxic, oxidizing, corrosive, n.o.s.|2.3|pih_gas|
3318|Ammonia solution (>50% ammonia)|2.3|pih_gas|D
3321|Radioactive material, low specific activity (LSA-II)|7|rad_other|
3322|Radioactive material, low specific activity (LSA-III)|7|rad_other|
3323|Radioactive material, Type C package|7|rad_type_b|
3324|Radioactive material, low specific activity (LSA-II), fissile|7|rad_fissile|
3325|Radioactive material, low specific activity (LSA-III), fissile|7|rad_fissile|
3326|Radioactive material, surface contaminated objects, fissile|7|rad_fissile|
3327|Radioactive material, Type A package, fissile|7|rad_fissile|
3328|Radioactive material, Type B(U) package, fissile|7|rad_fissile|
3329|Radioactive material, Type B(M) package, fissile|7|rad_fissile|
3330|Radioactive material, Type C package, fissile|7|rad_fissile|
3331|Radioactive material, transported under special arrangement, fissile|7|rad_fissile|
3332|Radioactive material, Type A package, special form|7|rad_other|
3333|Radioactive material, Type A package, special form, fissile|7|rad_fissile|
3355|Insecticide gas, toxic, flammable, n.o.s.|2.3|pih_gas|
3375|Ammonium nitrate emulsion or suspension or gel|5.1|an_other|
3381|Toxic by inhalation liquid, n.o.s. (Hazard Zone A)|6.1|pih_liquid|A
3382|Toxic by inhalation liquid, n.o.s. (Hazard Zone B)|6.1|pih_liquid|B
3383|Toxic by inhalation liquid, flammable, n.o.s. (Zone A)|6.1|pih_liquid|A
3384|Toxic by inhalation liquid, flammable, n.o.s. (Zone B)|6.1|pih_liquid|B
3385|Toxic by inhalation liquid, water-reactive, n.o.s. (Zone A)|6.1|pih_liquid|A
3386|Toxic by inhalation liquid, water-reactive, n.o.s. (Zone B)|6.1|pih_liquid|B
3387|Toxic by inhalation liquid, oxidizing, n.o.s. (Zone A)|6.1|pih_liquid|A
3388|Toxic by inhalation liquid, oxidizing, n.o.s. (Zone B)|6.1|pih_liquid|B
3389|Toxic by inhalation liquid, corrosive, n.o.s. (Zone A)|6.1|pih_liquid|A
3390|Toxic by inhalation liquid, corrosive, n.o.s. (Zone B)|6.1|pih_liquid|B
3483|Motor fuel anti-knock mixture, flammable|6.1|pih_liquid|
3488|Toxic by inhalation liquid, flammable, corrosive, n.o.s. (Zone A)|6.1|pih_liquid|A
3489|Toxic by inhalation liquid, flammable, corrosive, n.o.s. (Zone B)|6.1|pih_liquid|B
3490|Toxic by inhalation liquid, water-reactive, flammable, n.o.s. (Zone A)|6.1|pih_liquid|A
3491|Toxic by inhalation liquid, water-reactive, flammable, n.o.s. (Zone B)|6.1|pih_liquid|B
3507|Uranium hexafluoride, radioactive material, excepted package|7|rad_excepted|
0331|Explosive, blasting, Type B|1.5D|expl_15d|
0332|Explosive, blasting, Type E|1.5D|expl_15d|
0081|Explosive, blasting, Type A|1.1D||
0082|Explosive, blasting, Type B|1.1D||
0241|Explosive, blasting, Type E|1.1D||
`.trim();
var FLAG_SET = /* @__PURE__ */ new Set([
	"pih_gas",
	"pih_liquid",
	"bulk_lpgas",
	"residue_always",
	"named_bulk_liquid",
	"an_51",
	"an_fertilizer",
	"an_other",
	"expl_15d",
	"rad_excepted",
	"rad_type_b",
	"rad_fissile",
	"rad_other"
]);
function parseFlags(raw) {
	if (!raw) return [];
	return raw.split(",").map((s) => s.trim()).filter((s) => FLAG_SET.has(s));
}
var CATALOG = {};
for (const line of RAW.split("\n")) {
	const [un, name, cls, flags, zone] = line.split("|");
	CATALOG[un] = {
		un,
		name,
		cls,
		flags: parseFlags(flags ?? ""),
		zone: zone || void 0
	};
}
function lookupUn(un) {
	return CATALOG[un];
}
function tokens(s) {
	return s.toUpperCase().replace(/[^A-Z0-9]+/g, " ").split(" ").filter((t) => t.length >= 4);
}
function nameScore(catalogName, ocrName) {
	const hay = ocrName.toUpperCase();
	return tokens(catalogName).reduce((n, t) => n + (hay.includes(t) ? 1 : 0), 0);
}
/**
* OCR on a scanned DCM sometimes flips a digit (1075 LPG → 1076 phosgene).
* Only move the UN when this UN is in the catalog and the printed name
* does not match it.
*/
function resolveOcrUn(un, name) {
	if (!un || !name) return un;
	const current = lookupUn(un);
	if (!current) return un;
	if (nameScore(current.name, name) >= 1) return un;
	let bestUn = un;
	let best = 0;
	for (const e of Object.values(CATALOG)) {
		const s = nameScore(e.name, name);
		if (s > best) {
			best = s;
			bestUn = e.un;
		}
	}
	if (best >= 2) return bestUn;
	return un;
}
function hasFlag(entry, flag) {
	return Boolean(entry?.flags.includes(flag));
}
var PIH_PAPERS = /\b(PIH|TIH|poison(?:ous)?\s+by\s+inhalation|toxic\s+by\s+inhalation|inhalation\s+hazard)\b/i;
var ZONE_PAPERS = /(?:hazard\s*)?zone\s*([A-D])\b/i;
/** PIH / Hazard Zone taken from the shipping paper when the UN is not in the hook list. */
function detectPihFromPapers(line) {
	const zoneCol = (line.hazardZone ?? "").trim().toUpperCase();
	if (/^[A-D]$/.test(zoneCol)) return {
		pih: true,
		zone: zoneCol
	};
	const blob = [
		line.name,
		line.technicalName,
		...line.raw ?? []
	].filter(Boolean).join("\n");
	const zm = blob.match(ZONE_PAPERS);
	if (zm) return {
		pih: true,
		zone: zm[1].toUpperCase()
	};
	if (PIH_PAPERS.test(blob)) return { pih: true };
	return { pih: false };
}
var HEADERISH = /UN\/?NA|PROPER\s*SHIPPING|HAZ\s*CLASS|WEIGHT\s*\(POUNDS\)/i;
var PKG_WORD = /\b(TANK|PALLET|PALLETS|BOX|BOXES|80X|8OX|B0X|CYL|CYLINDER|CYLINDERS|CARTON|CARTONS|DRUM|DRUMS|BAG|BAGS|TOTE|IBC|PACKAGE|PACKAGES)\b/i;
function looksLikeTableDcm(text) {
	if ((text.match(/\t/g) ?? []).length >= 2) return false;
	const head = text.slice(0, 3e3);
	if (!(/UN\/?NA/i.test(head) || /Weight\s*\(\s*Pounds\s*\)/i.test(head) || /Packg\s*Group/i.test(head) || /STOW\s*Loc/i.test(head) || /DCM\s+G2\d{3}[A-Z]/i.test(head))) return false;
	return (text.match(/^\s*\d{3,5}\s+[A-Z]/gm) ?? []).length >= 3;
}
function voyageFromTableDcm(text) {
	const info = {};
	const grab = (label) => {
		return text.match(new RegExp(`${label}\\s*:\\s*([^\\n]+)`, "i"))?.[1]?.trim().split(/\s{2,}/)[0]?.trim();
	};
	const vessel = grab("Vessel") ?? grab("VESSEL");
	const voyage = grab("Voyage") ?? grab("VOYAGE");
	const pol = grab("POL") ?? grab("Port of Loading");
	const pod = grab("POD") ?? grab("Port of Discharge") ?? grab("POP") ?? grab("pop");
	if (vessel) info.vessel = vessel.replace(/\s+/g, " ").replace(/\bI[Il]\b/, "II");
	if (voyage) info.voyage = voyage.split(/\s+/)[0];
	if (pol) info.pol = pol.split(/\s+/)[0];
	if (pod) info.pod = pod.split(/\s+/)[0];
	const g2 = text.match(/\bDCM\s+G2(\d{3}[A-Z])\b/i);
	if (g2 && !info.voyage) info.voyage = g2[1].toUpperCase();
	return info;
}
function normalizeOcrClass(raw) {
	const t = raw.replace(",", ".").trim();
	if (/^2[123]$/.test(t)) return `2.${t[1]}`;
	if (/^4[123]$/.test(t)) return `4.${t[1]}`;
	if (/^5[1]$/.test(t)) return "5.1";
	if (/^6[1]$/.test(t)) return "6.1";
	if (/^1\.[125]$/.test(t)) return t;
	return classFromToken(t).primary || t;
}
function normalizeOcrPkg(raw) {
	const t = raw.toUpperCase();
	if (/80X|8OX|B0X/.test(t)) return "BOX";
	return t;
}
function looksLikeCargoRow(t) {
	if (!/^\d{3,5}\s+[A-Z]/.test(t)) return false;
	if (PKG_WORD.test(t)) return true;
	if (/\b(AMMONIA|BATTER|LITHIUM|PETROLEUM|FLAMMABLE|CORROSIVE|TOXIC|AEROSOL|PAINT|ACID|GAS|SOLUTION|OXIDE|NITRATE)\b/i.test(t)) return true;
	const un = t.match(/^(\d{3,5})/)?.[1]?.padStart(4, "0");
	return Boolean(un && lookupUn(un));
}
function parseTableLine(raw, rowIndex) {
	const m = raw.replace(/\s+/g, " ").trim().match(/^(\d{3,5})\s+(.+)$/);
	if (!m) return null;
	let un = normalizeUn(m[1]) || m[1].padStart(4, "0");
	const rest = m[2];
	const pkgM = rest.match(PKG_WORD);
	const packaging = pkgM ? normalizeOcrPkg(pkgM[0]) : "";
	const beforePkg = pkgM && pkgM.index !== void 0 ? rest.slice(0, pkgM.index).trim() : rest;
	const classM = beforePkg.match(/\s(\d(?:[.,]\d)?|\d{2})(?:\s+(I{1,3}|[123](?!\d)))?(?:\s|$)/);
	let hazClass = "";
	let packingGroup = "";
	let name = beforePkg;
	let afterClass = beforePkg;
	if (classM && classM.index !== void 0) {
		hazClass = normalizeOcrClass(classM[1]);
		const pgRaw = (classM[2] ?? "").toUpperCase();
		packingGroup = pgRaw === "1" ? "I" : pgRaw === "2" ? "II" : pgRaw === "3" ? "III" : pgRaw;
		name = beforePkg.slice(0, classM.index).replace(/\/\s*$/, "").trim();
		afterClass = beforePkg.slice(classM.index + classM[0].length).trim();
	}
	un = resolveOcrUn(un, name);
	const cat = lookupUn(un);
	if (cat?.cls && hazClass !== cat.cls) {
		if (!(hazClass === cat.cls.replace(".", "") || cat.cls.startsWith(hazClass))) hazClass = cat.cls;
	}
	if (/LITHIUM/i.test(name) && !/^9/.test(hazClass)) hazClass = "9";
	const nums = [...afterClass.matchAll(/(\d{1,3}(?:,\d{3})+|\d{2,6})(?:\.\d+)?/g)].map((x) => Number(x[1].replace(/,/g, "")));
	const qty = nums.length ? Math.max(...nums) : null;
	const quantityRaw = qty !== null ? `${qty} lb` : "";
	const tech = name.match(/\(([^)]+)\)/)?.[0];
	const limitedQty = /ltd\s*qty|limited\s*q/i.test(raw);
	const container = raw.match(/\b([A-Z]{4}\d{7})\b/)?.[1];
	const stowLoc = stowFromRowText(raw);
	return {
		rowIndex,
		un,
		name: name.replace(/\s*\/\s*$/, "").trim(),
		hazClass,
		subsidiary: "",
		packaging,
		packingGroup,
		quantityKg: parseQuantityToKg(quantityRaw, "lb"),
		quantityRaw,
		raw: [raw],
		technicalName: tech,
		limitedQty: limitedQty || void 0,
		container,
		stowLoc
	};
}
function linesFromTableDcm(text) {
	const rows = text.split(/\r?\n/);
	const lines = [];
	let seenHeader = false;
	for (const row of rows) {
		const t = row.trim();
		if (!t) continue;
		if (HEADERISH.test(t) && !/^\d{3,5}\s/.test(t)) {
			seenHeader = true;
			continue;
		}
		if (!looksLikeCargoRow(t)) continue;
		if (!seenHeader && !/^\d{3,5}\s+[A-Z]/.test(t)) continue;
		const line = parseTableLine(t, lines.length + 1);
		if (line) lines.push(line);
	}
	return lines;
}
function parseTableDcmText(text, sourceName = "dcm.pdf") {
	const lines = linesFromTableDcm(text);
	return {
		header: [
			"UN",
			"Proper Shipping Name",
			"Class",
			"Packaging",
			"Weight"
		],
		lines,
		warnings: lines.length === 0 ? ["No cargo rows were found on this printed DCM."] : [],
		delimiter: "pdf",
		voyage: voyageFromTableDcm(text),
		unitGuess: "lb",
		sourceName
	};
}
var UN_ALIASES = [
	/^un\/?na$/,
	/^un\s*(no|num|number|#)?$/,
	/^undg$/,
	/^un\s*code$/,
	/^na\s*(no|num|number)?$/,
	/^imo\s*un$/,
	/un\/?na\s*no.*ship/
];
var NAME_ALIASES = [
	/proper\s*ship/,
	/\bpsn\b/,
	/shipping\s*name/,
	/^description$/,
	/commodity/,
	/cargo\s*name/,
	/goods\s*name/
];
var CLASS_ALIASES = [
	/haz(ard)?\s*class/,
	/imo\s*class/,
	/imd?g\s*class/,
	/class\s*(no|num|#)?$/,
	/^class$/,
	/^div(ision)?$/,
	/primary\s*class/
];
var PKG_ALIASES = [
	/packag(e|ing)?\s*(type|desc)?/,
	/^pkg$/,
	/pack\s*type/,
	/type\s*of\s*pack/,
	/^package$/
];
var QTY_ALIASES = [
	/net\s*(wt|weight|qty|mass|kgs?)?/,
	/weight\s*lbs?/,
	/quantity/,
	/^kgs?$/,
	/^lbs?$/,
	/weight\s*(kg|kgs|net)/,
	/qty\s*(kg|kgs|mt)?/,
	/^mass$/
];
var PG_ALIASES = [/pack(ing)?\s*group/, /^pg$/];
var SUB_ALIASES = [
	/subsid/,
	/sub\s*risk/,
	/secondary\s*(class|risk)/,
	/sub\s*haz/
];
var CONTAINER_ALIASES = [
	/^container$/,
	/^cntr$/,
	/^unit\s*no/
];
var BOOKING_ALIASES = [/^booking$/, /^bkg$/];
var TECH_ALIASES = [/technical\s*name/, /tech\s*name/];
var LTD_ALIASES = [
	/limited\s*q/,
	/ltd\s*qty/,
	/^lq$/,
	/limit(ed)?\s*quant/
];
var ZONE_ALIASES = [
	/hazard\s*zone/,
	/^zone$/,
	/pih\s*zone/,
	/inhalation\s*zone/
];
var STOW_ALIASES = [
	/^stow/,
	/stow(age)?\s*loc/,
	/stow\s*pos/,
	/^bay$/,
	/cell\s*pos/
];
function scoreAliases(cell, aliases) {
	const c = cell.toLowerCase().replace(/[_./]+/g, " ").trim();
	for (let i = 0; i < aliases.length; i++) if (aliases[i].test(c)) return 100 - i;
	return 0;
}
function bestCol(header, aliases) {
	let best = -1;
	let bestScore = 0;
	header.forEach((h, i) => {
		const s = scoreAliases(h, aliases);
		if (s > bestScore) {
			bestScore = s;
			best = i;
		}
	});
	return best;
}
/** CDC quantity is net. Never take a Gross Weight column. */
function bestQtyCol(header) {
	let best = -1;
	let bestScore = 0;
	header.forEach((h, i) => {
		const c = h.toLowerCase().replace(/[_./]+/g, " ").trim();
		if (/\bgross\b/.test(c)) return;
		const s = scoreAliases(h, QTY_ALIASES);
		if (s > bestScore) {
			bestScore = s;
			best = i;
		}
	});
	return best;
}
function detectDelimiter(text) {
	const first = text.split(/\r?\n/).find((l) => l.trim()) ?? "";
	const tabs = (first.match(/\t/g) ?? []).length;
	const semis = (first.match(/;/g) ?? []).length;
	const commas = (first.match(/,/g) ?? []).length;
	if (tabs >= 2 || tabs > 0 && tabs >= commas) return "tab";
	if (semis > commas && semis >= 2) return "semicolon";
	return "comma";
}
function splitCsvLine(line, delimiter) {
	if (delimiter === "tab") return line.split("	").map((c) => c.trim());
	const out = [];
	let cur = "";
	let inQuotes = false;
	for (let i = 0; i < line.length; i++) {
		const ch = line[i];
		if (ch === "\"") {
			if (inQuotes && line[i + 1] === "\"") {
				cur += "\"";
				i++;
			} else inQuotes = !inQuotes;
		} else if (ch === delimiter && !inQuotes) {
			out.push(cur.trim());
			cur = "";
		} else cur += ch;
	}
	out.push(cur.trim());
	return out;
}
function looksLikeHeader(cells) {
	const joined = cells.join(" ").toUpperCase();
	return /UN\/?NA/.test(joined) || /PROPER\s*SHIP/.test(joined) || /HAZ(ARD)?\s*CLASS/.test(joined) || /SHIPPING\s*NAME/.test(joined) || /UNDG/.test(joined) || cells.some((c) => scoreAliases(c, UN_ALIASES) > 0);
}
function at(row, i) {
	return i >= 0 && i < row.length ? (row[i] ?? "").trim() : "";
}
function extractHazardZone(...texts) {
	for (const t of texts) {
		if (!t) continue;
		const col = t.trim().toUpperCase();
		if (/^[A-D]$/.test(col)) return col;
		const m = t.match(/(?:hazard\s*)?zone\s*([A-D])\b/i);
		if (m) return m[1].toUpperCase();
	}
	return "";
}
function buildLine(row, rowIndex, cols, unitGuess) {
	const rawUnCell = at(row, cols.unCol);
	let combined = looksLikeCombinedHazmat(rawUnCell) ? parseCombinedHazmat(rawUnCell) : null;
	if (!combined) {
		for (const c of row) if (looksLikeCombinedHazmat(c)) {
			combined = parseCombinedHazmat(c);
			if (combined?.un) break;
		}
	}
	const un = combined?.un || normalizeUn(rawUnCell);
	if (!un) return null;
	const nameFromCol = cols.nameCol !== cols.unCol ? at(row, cols.nameCol) : "";
	const parsedClass = parseHazardClass(cols.hazCol !== cols.unCol ? at(row, cols.hazCol) : "");
	const subFromCol = at(row, cols.subCol);
	const ltdRaw = at(row, cols.ltdCol);
	const limitedQty = /^(y|yes|ltd|lq|true|x|1)$/i.test(ltdRaw) || /ltd/i.test(ltdRaw) || void 0;
	return {
		rowIndex,
		un,
		name: combined?.name || nameFromCol,
		hazClass: combined?.hazClass || parsedClass.primary,
		subsidiary: combined?.subsidiary || subFromCol || parsedClass.subsidiary,
		packaging: at(row, cols.pkgCol),
		packingGroup: combined?.packingGroup || at(row, cols.pgCol),
		quantityKg: parseQuantityToKg(at(row, cols.qtyCol), unitGuess),
		quantityRaw: at(row, cols.qtyCol),
		raw: row,
		container: at(row, cols.containerCol) || void 0,
		booking: at(row, cols.bookingCol) || void 0,
		technicalName: at(row, cols.techCol) || void 0,
		limitedQty: limitedQty || void 0,
		hazardZone: extractHazardZone(at(row, cols.zoneCol), combined?.name || nameFromCol, at(row, cols.techCol)) || void 0,
		stowLoc: at(row, cols.stowCol) || void 0
	};
}
function parseRowMatrix(rawRows, defaultQtyUnit = DEFAULT_OPTIONS.defaultQtyUnit) {
	const warnings = [];
	const voyage = extractVoyage(rawRows);
	if (rawRows.length === 0) return {
		header: [],
		lines: [],
		warnings: ["No rows found."],
		delimiter: "tab",
		voyage,
		unitGuess: defaultQtyUnit
	};
	let headerIdx = -1;
	for (let i = 0; i < Math.min(rawRows.length, 16); i++) if (looksLikeHeader(rawRows[i])) {
		headerIdx = i;
		break;
	}
	const header = headerIdx >= 0 ? rawRows[headerIdx] : [];
	const unCol = headerIdx >= 0 ? Math.max(0, bestCol(header, UN_ALIASES)) : 0;
	let nameCol = headerIdx >= 0 ? bestCol(header, NAME_ALIASES) : 1;
	let hazCol = headerIdx >= 0 ? bestCol(header, CLASS_ALIASES) : 2;
	let pkgCol = headerIdx >= 0 ? bestCol(header, PKG_ALIASES) : 3;
	const qtyCol = headerIdx >= 0 ? bestQtyCol(header) : -1;
	const pgCol = headerIdx >= 0 ? bestCol(header, PG_ALIASES) : -1;
	const subCol = headerIdx >= 0 ? bestCol(header, SUB_ALIASES) : -1;
	const containerCol = headerIdx >= 0 ? bestCol(header, CONTAINER_ALIASES) : -1;
	const bookingCol = headerIdx >= 0 ? bestCol(header, BOOKING_ALIASES) : -1;
	const techCol = headerIdx >= 0 ? bestCol(header, TECH_ALIASES) : -1;
	const ltdCol = headerIdx >= 0 ? bestCol(header, LTD_ALIASES) : -1;
	const zoneCol = headerIdx >= 0 ? bestCol(header, ZONE_ALIASES) : -1;
	const stowCol = headerIdx >= 0 ? bestCol(header, STOW_ALIASES) : -1;
	let unitGuess = defaultQtyUnit;
	const qtyHeader = (header[qtyCol] || "").toLowerCase();
	if (/lbs?|pounds?/.test(qtyHeader)) unitGuess = "lb";
	else if (/mt|metric/.test(qtyHeader)) unitGuess = "mt";
	else if (/kgs?|kilogram/.test(qtyHeader)) unitGuess = "kg";
	const combinedHeader = (header[unCol] || "").toLowerCase();
	const isCombined = /shipping name/.test(combinedHeader) && /class/.test(combinedHeader);
	if (isCombined) {
		nameCol = techCol >= 0 ? techCol : -1;
		hazCol = unCol;
	}
	if (pkgCol === hazCol && !isCombined) pkgCol = -1;
	if (nameCol === unCol || nameCol === hazCol) nameCol = isCombined ? techCol : nameCol === 1 ? 1 : -1;
	const cols = {
		unCol,
		nameCol,
		hazCol,
		pkgCol,
		qtyCol,
		pgCol,
		subCol,
		containerCol,
		bookingCol,
		techCol,
		ltdCol,
		zoneCol,
		stowCol
	};
	const start = headerIdx >= 0 ? headerIdx + 1 : 0;
	const lines = [];
	for (let i = start; i < rawRows.length; i++) {
		const row = rawRows[i].map((c) => String(c ?? "").trim());
		if (!row.some((c) => c.length > 0)) continue;
		const joined = row.join(" ");
		if (/^company name:/i.test(joined) || /^nationality:/i.test(joined)) continue;
		const line = buildLine(row, i, cols, unitGuess);
		if (line) lines.push(line);
	}
	if (lines.length === 0) warnings.push("No cargo rows with a UN/NA number were found.");
	return {
		header: header.length ? header : [
			"UN/NA",
			"Proper Shipping Name",
			"HAZ Class",
			"Packaging"
		],
		lines,
		warnings,
		delimiter: "tab",
		voyage,
		unitGuess
	};
}
var VOYAGE_LABELS = [
	[/^company\s*name:?$/i, "company"],
	[/^vessel:?$/i, "vessel"],
	[/^voyage:?$/i, "voyage"],
	[/^load\s*port:?$/i, "pol"],
	[/^pol:?$/i, "pol"],
	[/^port\s*of\s*loading:?$/i, "pol"],
	[/^final\s*disch(?:arge)?\s*port:?$/i, "pod"],
	[/^pod:?$/i, "pod"],
	[/^discharge\s*port:?$/i, "pod"],
	[/^offical\s*number:?$/i, "officialNumber"],
	[/^official\s*number:?$/i, "officialNumber"],
	[/^date\s*of\s*loading:?$/i, "date"]
];
function matchVoyageLabel(raw) {
	const t = raw.trim();
	if (!t) return null;
	for (const [re, key] of VOYAGE_LABELS) if (re.test(t) || re.test(`${t}:`)) return key;
	return null;
}
function cleanVoyageVal(v) {
	return v.replace(/\s+/g, " ").replace(/^NULL$/i, "").trim();
}
function extractVoyage(rows) {
	const info = {};
	const consider = rows.slice(0, 14);
	for (const row of consider) {
		const cells = row.map((c) => String(c ?? "").trim());
		for (let i = 0; i < cells.length; i++) {
			const raw = cells[i];
			if (!raw) continue;
			const inline = raw.match(/^(.{2,40}?):\s+(.+)$/);
			if (inline) {
				const key = matchVoyageLabel(inline[1]);
				const val = cleanVoyageVal(inline[2]);
				if (key && val && !info[key]) info[key] = val;
				continue;
			}
			const key = matchVoyageLabel(raw);
			if (!key) continue;
			const afterColon = raw.includes(":") ? cleanVoyageVal(raw.split(":").slice(1).join(":")) : "";
			if (afterColon) {
				if (!info[key]) info[key] = afterColon;
				continue;
			}
			const next = cells.slice(i + 1).find((c) => c.length > 0 && !matchVoyageLabel(c));
			if (next && !info[key]) info[key] = cleanVoyageVal(next);
		}
	}
	return repairVoyage(info);
}
function vesselQuality(v) {
	const s = (v ?? "").trim();
	if (!s) return 0;
	if (/george|mokihana|manukai|manulani|maunawili|lurline|matsonia|horizon|pfeiffer/i.test(s)) return 100;
	if (/\bII\b/.test(s) && s.length >= 6) return 90;
	if (/^g2\d{3}[a-z]$/i.test(s)) return 12;
	if (/^\d{2,3}[a-z]$/i.test(s)) return 10;
	if (/^g\d$/i.test(s)) return 25;
	if (/^[A-Za-z][A-Za-z0-9 .'-]{3,}$/.test(s)) return 70;
	return 40;
}
function voyageQuality(v) {
	const s = (v ?? "").trim();
	if (!s) return 0;
	if (/^\d{2,3}[A-Z]$/i.test(s)) return 100;
	if (/^g2\d{3}[A-Z]$/i.test(s)) return 80;
	if (/^g\d$/i.test(s)) return 20;
	if (/george|hawaii|horizon/i.test(s)) return 5;
	return 30;
}
/** G2068W / G2069W → 068W / 069W */
function normalizeVoyageCode(v) {
	const g = v.trim().match(/^G2(\d{3}[A-Z])$/i);
	if (g) return g[1].toUpperCase();
	return v.trim();
}
function voyageFromFilename(name) {
	const n = name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
	const info = {};
	if (/george\s*ii/i.test(n)) info.vessel = "GEORGE II";
	const g2 = n.match(/\bG2(\d{3}[A-Z])\b/i);
	if (g2) info.voyage = g2[1].toUpperCase();
	else {
		const v = n.match(/\b(\d{2,3}[A-Z])\b/i);
		if (v) info.voyage = v[1].toUpperCase();
	}
	return info;
}
function repairVoyage(info) {
	const out = { ...info };
	if (out.voyage) out.voyage = normalizeVoyageCode(out.voyage);
	if (out.vessel && /^G2\d{3}[A-Z]$/i.test(out.vessel)) {
		const asVoyage = normalizeVoyageCode(out.vessel);
		if (!out.voyage || voyageQuality(asVoyage) >= voyageQuality(out.voyage)) out.voyage = asVoyage;
		if (vesselQuality(out.vessel) < 50) delete out.vessel;
	}
	if (out.vessel && /^\d{2,3}[A-Z]$/i.test(out.vessel)) {
		const asVoyage = out.vessel.toUpperCase();
		if (!out.voyage || /^g\d$/i.test(out.voyage) || /george|hawaii|horizon|pasha/i.test(out.voyage)) {
			if (out.voyage && /[A-Za-z]{3,}/.test(out.voyage) && vesselQuality(out.voyage) >= 70) out.vessel = out.voyage;
			else delete out.vessel;
			out.voyage = asVoyage;
		}
	}
	if (out.voyage && /george|hawaii|horizon/i.test(out.voyage) && out.vessel && /^\d/i.test(out.vessel)) {
		const v = out.vessel;
		out.vessel = out.voyage;
		out.voyage = v;
	}
	return out;
}
function pickVoyage(...candidates) {
	const out = {};
	for (const key of [
		"vessel",
		"voyage",
		"pol",
		"pod",
		"date",
		"officialNumber",
		"company"
	]) {
		let best = "";
		let score = -1;
		for (const c of candidates) {
			const val = (c[key] ?? "").trim();
			if (!val) continue;
			const s = key === "vessel" ? vesselQuality(val) : key === "voyage" ? voyageQuality(val) : val.length;
			if (s > score) {
				score = s;
				best = val;
			}
		}
		if (best) out[key] = best;
	}
	return repairVoyage(out);
}
function coalesceVoyage(parts, filename) {
	const fromFile = filename ? voyageFromFilename(filename) : {};
	return pickVoyage(...parts, fromFile);
}
function parseManifest(text, defaultQtyUnit = DEFAULT_OPTIONS.defaultQtyUnit) {
	const trimmed = text.replace(/^\uFEFF/, "").trim();
	if (!trimmed) return {
		header: [],
		lines: [],
		warnings: ["No text to parse."],
		delimiter: "tab",
		voyage: {},
		unitGuess: defaultQtyUnit
	};
	if (looksLikeExp023(trimmed)) {
		const parsed = parseExp023Text(trimmed);
		parsed.voyage = coalesceVoyage([parsed.voyage]);
		return parsed;
	}
	if (looksLikeTableDcm(trimmed)) {
		const parsed = parseTableDcmText(trimmed);
		parsed.voyage = coalesceVoyage([parsed.voyage]);
		return parsed;
	}
	const delimiter = detectDelimiter(trimmed);
	const delimChar = delimiter === "tab" ? "	" : delimiter === "semicolon" ? ";" : ",";
	const parsed = parseRowMatrix(trimmed.split(/\r?\n/).map((l) => splitCsvLine(l, delimChar)).filter((r) => r.some((c) => c.length > 0)), defaultQtyUnit);
	parsed.delimiter = delimiter;
	return parsed;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium outline-none transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-navy-2",
			secondary: "bg-secondary text-secondary-foreground hover:bg-surface-2",
			outline: "border border-border bg-surface text-fg hover:bg-surface-2",
			ghost: "text-fg hover:bg-surface-2",
			navy: "bg-navy text-primary-foreground hover:bg-navy-2"
		},
		size: {
			default: "h-11 rounded-md px-4",
			sm: "h-9 rounded-sm px-3 text-xs",
			lg: "h-12 rounded-md px-5",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase", {
	variants: { variant: {
		cdc: "bg-cdc text-primary-foreground",
		review: "bg-review text-primary-foreground",
		ok: "bg-ok-soft text-ok",
		residue: "bg-residue text-primary-foreground",
		muted: "bg-surface-2 text-muted",
		navy: "bg-navy text-primary-foreground"
	} },
	defaultVariants: { variant: "muted" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	ref,
	className: cn("flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg shadow-[var(--shadow-border)] outline-none transition-[box-shadow,border-color] duration-150 placeholder:text-subtle focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50", className),
	...props
}));
Input.displayName = "Input";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	ref,
	className: cn("flex min-h-32 w-full rounded-md border border-border bg-surface px-3 py-2.5 font-mono text-xs text-fg shadow-[var(--shadow-border)] outline-none transition-[box-shadow,border-color] duration-150 placeholder:text-subtle focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50", className),
	...props
}));
Textarea.displayName = "Textarea";
function VerdictBadge({ verdict }) {
	switch (verdict) {
		case "CDC": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			variant: "cdc",
			children: "CDC — report"
		});
		case "CDC_RESIDUE": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			variant: "residue",
			children: "CDC residue"
		});
		case "REVIEW": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			variant: "review",
			children: "Needs review"
		});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			variant: "ok",
			children: "Not CDC"
		});
	}
}
function LegacyBadge({ verdict }) {
	switch (verdict) {
		case "CDC": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			variant: "cdc",
			children: "v1.0 CDC"
		});
		case "REVIEW": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			variant: "review",
			children: "v1.0 review"
		});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			variant: "muted",
			children: "v1.0 clear"
		});
	}
}
/**
* Exact rule set from the v1.0 local HTML auditor the user attached.
* Used only so results can be compared — not for eNOAD determinations.
*/
var LEGACY_CDC_CLASSES = [
	"1.1",
	"1.2",
	"1.5",
	"2.3"
];
var LEGACY_CDC_UNS = [
	"1005",
	"1017",
	"1079",
	"1942",
	"2067",
	"2426",
	"3375"
];
function evaluateLegacy(line) {
	const unNum = line.un.replace(/["'\s]/g, "");
	const hazClass = line.hazClass ?? "";
	const packaging = (line.packaging ?? "").toUpperCase();
	if (LEGACY_CDC_CLASSES.some((cls) => hazClass.startsWith(cls))) return {
		verdict: "CDC",
		reason: `v1.0 treated any ${hazClass} as automatic CDC (class list 1.1 / 1.2 / 1.5 / 2.3).`
	};
	if (LEGACY_CDC_UNS.includes(unNum)) return {
		verdict: "CDC",
		reason: `v1.0 treated UN ${unNum} as an automatic high-risk CDC regardless of quantity or packaging.`
	};
	if (hazClass.startsWith("7")) return {
		verdict: "REVIEW",
		reason: "v1.0 sent every Class 7 item to manual HRCQ review."
	};
	if (hazClass.startsWith("6.1") || packaging.includes("TANK")) return {
		verdict: "REVIEW",
		reason: packaging.includes("TANK") ? "v1.0 sent every TANK package to bulk-threshold review, including non-PIH cargo." : `v1.0 sent every Division 6.1 item to bulk-threshold review.`
	};
	return {
		verdict: "CLEAR",
		reason: "v1.0 did not flag this row."
	};
}
/** Trailing package-type codes used on Pasha / ocean DCMs (`10 CN`, `7 CY`). */
var CODE_FORM = {
	CN: "rigid",
	CTN: "rigid",
	CS: "rigid",
	BX: "rigid",
	BOX: "rigid",
	FB: "rigid",
	PL: "rigid",
	PLT: "rigid",
	PLTS: "rigid",
	DR: "rigid",
	DRM: "rigid",
	PA: "rigid",
	CR: "rigid",
	PK: "rigid",
	PKG: "rigid",
	TO: "bulk_packaging",
	TOTE: "bulk_packaging",
	CY: "cylinder",
	CYL: "cylinder",
	BG: "combustible_bag",
	BAG: "combustible_bag",
	SK: "combustible_bag",
	TK: "bulk_packaging",
	TNK: "bulk_packaging",
	IBC: "bulk_packaging",
	TOT: "bulk_packaging"
};
function packagingCode(raw) {
	const t = (raw ?? "").toUpperCase().trim();
	const m = t.match(/(?:^|\s)(\d+(?:\.\d+)?)?\s*([A-Z]{1,6})$/);
	if (m) return m[2];
	return t;
}
function classifyPackaging(raw, mode) {
	const t = (raw ?? "").toUpperCase();
	const code = packagingCode(t);
	if (CODE_FORM[code]) return CODE_FORM[code];
	if (mode === "bulk_tanker" && (!t || /^(N\/A|-|NA|NONE|LOOSE|BULK)$/.test(t))) return "ship_bulk";
	if (/\b(CARGO\s*TANK|SHIP'?S?\s*TANK|IN\s*BULK|UNPACKAGED|LOOSE\s*BULK)\b/.test(t) || /^BULK$/.test(t.trim())) return "ship_bulk";
	if (mode === "bulk_tanker" && /\b(TANK|TANKER)\b/.test(t) && !/\b(ISO|IMO|PORTABLE|CONTAINER|TANKTAINER)\b/.test(t)) return "ship_bulk";
	if (/\b(PORTABLE\s*TANK|IMO\s*TANK|ISO\s*TANK|TANKTAINER|TANK\s*CONTAINER|T\d{1,2}\b|IBC|TOTE|FLEXITANK)\b/.test(t) || /\bTANK\b/.test(t) && mode !== "bulk_tanker") return "bulk_packaging";
	if (/\b(CYL|CYLINDER|BOTTLE|FLASK|TUBE)\b/.test(t)) return "cylinder";
	if (/\b(BURLAP|PAPER\s*BAG|PP\s*BAG|WOVEN\s*BAG)\b/.test(t) || /\b(BAG|SACK)S?\b/.test(t)) return "combustible_bag";
	if (/\b(BOX|DRUM|FIBR[E]?|JERRICAN|CRATE|CARTON|PACKAGE|PKG|PAIL|CAN|CASE|PALLET)\b/.test(t)) return "rigid";
	if (mode === "bulk_tanker") return "ship_bulk";
	return "unknown";
}
function packFormLabel(form) {
	switch (form) {
		case "ship_bulk": return "Carried in bulk (vessel tanks)";
		case "bulk_packaging": return "Bulk packaging (portable tank / IBC)";
		case "combustible_bag": return "Combustible bag / sack";
		case "rigid": return "Rigid package";
		case "cylinder": return "Cylinder";
		default: return "Packaging not identified";
	}
}
var DIV_11_12 = /^(1\.1|1\.2)/;
var DIV_15 = /^1\.5/;
var DIV_15D = /^1\.5D/;
var DIV_23 = /^2\.3/;
var DIV_51 = /^5\.1/;
var DIV_61 = /^6\.1/;
var CLASS_7 = /^7/;
/** IBC / bulk-packaging liquids are typically ≥ 450 kg. Smaller unknown pkgs are treated as non-bulk. */
var SMALL_PACKAGE_KG = 450;
function classTokens(line, catalogClass) {
	return [
		line.hazClass,
		line.subsidiary,
		catalogClass ?? ""
	].filter(Boolean).map((s) => s.replace(/\s+/g, "").toUpperCase());
}
function matches(tokens, re) {
	return tokens.some((t) => re.test(t));
}
function upgrade(current, next) {
	const rank = {
		NOT_CDC: 0,
		REVIEW: 1,
		CDC_RESIDUE: 2,
		CDC: 3
	};
	return rank[next] > rank[current] ? next : current;
}
function addPara(paras, p) {
	if (!paras.includes(p)) paras.push(p);
}
function clearlyNonBulk(line, packForm, qty) {
	if (packForm === "bulk_packaging" || packForm === "ship_bulk") return false;
	if (packForm === "rigid" || packForm === "cylinder" || packForm === "combustible_bag") return true;
	if (line.limitedQty) return true;
	if (packForm === "unknown" && qty !== null && qty < SMALL_PACKAGE_KG) return true;
	return false;
}
function applyResidue(acc, options, residueAlways, bulkLiquidOrGas) {
	if (!options.residueMode) return;
	if (!bulkLiquidOrGas) return;
	if (residueAlways) {
		acc.reasons.push("Residue of this liquefied gas is still CDC — 33 CFR 160.202 CDC residue excepts ammonia, chlorine, ethane, ethylene oxide, LNG, methyl bromide, sulfur dioxide, and vinyl chloride.");
		return;
	}
	acc.verdict = "CDC_RESIDUE";
	acc.reasons.push("Treated as CDC residue remaining after discharge (not accessible through normal transfer). Report as CDC residue on the eNOAD cargo section.");
}
function evaluateLinePass1(line, options) {
	const entry = lookupUn(line.un);
	const catalogClass = entry?.cls;
	const tokens = classTokens(line, catalogClass);
	const packForm = classifyPackaging(line.packaging, options.carriageMode);
	const displayName = line.name || entry?.name || `UN ${line.un}`;
	const displayClass = line.hazClass || catalogClass || "";
	const qty = line.quantityKg;
	const papers = detectPihFromPapers(line);
	const acc = {
		verdict: "NOT_CDC",
		paras: [],
		reasons: [],
		needs: [],
		pih: hasFlag(entry, "pih_gas") || hasFlag(entry, "pih_liquid") || papers.pih
	};
	const is11or12 = matches(tokens, DIV_11_12);
	const is15d = matches(tokens, DIV_15D) || hasFlag(entry, "expl_15d");
	const is15other = matches(tokens, DIV_15) && !is15d;
	const is23 = matches(tokens, DIV_23) || hasFlag(entry, "pih_gas");
	const is51 = matches(tokens, DIV_51);
	const is61 = matches(tokens, DIV_61) || hasFlag(entry, "pih_liquid");
	const is7 = matches(tokens, CLASS_7) || Boolean(entry?.flags.some((f) => f.startsWith("rad_")));
	const shipBulk = packForm === "ship_bulk";
	const bulkPkg = packForm === "bulk_packaging" || shipBulk;
	const packaged = clearlyNonBulk(line, packForm, qty);
	if (is11or12) {
		acc.verdict = "CDC";
		addPara(acc.paras, "160.202(1)");
		acc.reasons.push(`Division ${displayClass || "1.1/1.2"} explosive is Certain Dangerous Cargo at any quantity (33 CFR 160.202(1); 49 CFR 173.50).`);
	}
	if (is15d && acc.verdict !== "CDC") {
		addPara(acc.paras, "160.202(2)");
		if (packForm === "combustible_bag") {
			acc.verdict = "CDC";
			acc.reasons.push("Division 1.5D blasting agent in a paper/burlap/nonrigid combustible package requires a COTP permit under 49 CFR 176.415 — that makes it CDC (33 CFR 160.202(2)).");
		} else if (packForm === "rigid") {
			acc.reasons.push("Division 1.5D in rigid packaging with non-combustible inner packaging is excepted from the 176.415 permit. Confirm inner packaging; if combustible inners are used it is CDC.");
			acc.verdict = "REVIEW";
			acc.needs.push("Confirm inner packaging is non-combustible (49 CFR 176.415(b)(3)).");
		} else {
			acc.verdict = "REVIEW";
			acc.reasons.push("Division 1.5D is CDC only when a 49 CFR 176.415 permit is required (typically combustible bags). Packaging is not clear enough to decide.");
			acc.needs.push("Packaging type (bag vs rigid) for 1.5D permit test.");
		}
	} else if (is15other && acc.verdict !== "CDC") {
		acc.verdict = "REVIEW";
		acc.reasons.push("Paragraph (2) is Division 1.5D blasting agents only, not every 1.5. Confirm the compatibility group on the shipping paper.");
		acc.needs.push("Confirm compatibility group D for 49 CFR 176.415 / 33 CFR 160.202(2).");
	}
	if (hasFlag(entry, "bulk_lpgas") && shipBulk) {
		acc.verdict = "CDC";
		addPara(acc.paras, "160.202(7)");
		acc.reasons.push(`${entry?.name ?? displayName} carried in bulk as a flammable and/or toxic liquefied gas is CDC (33 CFR 160.202(7); 46 CFR 154.7).`);
	} else if (hasFlag(entry, "bulk_lpgas") && options.carriageMode === "bulk_tanker") {
		acc.verdict = "CDC";
		addPara(acc.paras, "160.202(7)");
		acc.reasons.push("Bulk-tanker mode: this liquefied gas is treated as ship's-tank cargo and is CDC under 33 CFR 160.202(7).");
	}
	if (hasFlag(entry, "named_bulk_liquid") && shipBulk) {
		acc.verdict = "CDC";
		addPara(acc.paras, "160.202(8)");
		acc.reasons.push(`${entry?.name ?? displayName} is a named bulk liquid CDC when carried in bulk (33 CFR 160.202(8)).`);
	} else if (hasFlag(entry, "named_bulk_liquid") && options.carriageMode === "bulk_tanker") {
		acc.verdict = "CDC";
		addPara(acc.paras, "160.202(8)");
		acc.reasons.push("Bulk-tanker mode: named bulk liquid under 33 CFR 160.202(8) is CDC.");
	} else if (hasFlag(entry, "named_bulk_liquid") && !shipBulk) acc.reasons.push(`${entry?.name ?? displayName} is a named bulk-liquid CDC only when carried in the ship's tanks — packaged/containerized lots are not CDC under (8). Check Division 6.1 PIH rules separately if they apply.`);
	if ((hasFlag(entry, "an_51") || hasFlag(entry, "an_fertilizer")) && shipBulk) {
		acc.verdict = "CDC";
		addPara(acc.paras, "160.202(9)");
		acc.reasons.push("Ammonium nitrate / AN-based fertilizer listed as Division 5.1 and carried in bulk is CDC (33 CFR 160.202(9)).");
	} else if ((hasFlag(entry, "an_51") || hasFlag(entry, "an_fertilizer")) && options.carriageMode === "bulk_tanker") {
		acc.verdict = "CDC";
		addPara(acc.paras, "160.202(9)");
		acc.reasons.push("Bulk-tanker mode: Division 5.1 ammonium nitrate in bulk is CDC.");
	}
	if (hasFlag(entry, "an_51") || hasFlag(entry, "an_other") || hasFlag(entry, "an_fertilizer") && is51) {
		addPara(acc.paras, "160.202(4)");
		if (packForm === "combustible_bag") {
			acc.verdict = upgrade(acc.verdict, "CDC");
			acc.reasons.push("Ammonium nitrate in a paper/burlap/nonrigid combustible package requires a COTP permit (49 CFR 176.415(a)) and is therefore CDC (33 CFR 160.202(4)).");
		} else if (hasFlag(entry, "an_51") && packForm === "rigid") {
			acc.reasons.push("UN 1942 in a rigid packaging with non-combustible inner packaging does not need a 176.415 permit. Not CDC under (4) unless carried in bulk (see (9)).");
			if (acc.verdict === "NOT_CDC") {
				acc.verdict = "REVIEW";
				acc.needs.push("Confirm inner packaging is non-combustible.");
			}
		} else if (hasFlag(entry, "an_fertilizer") && packForm === "rigid") acc.reasons.push("UN 2067 in rigid packaging is excepted from the permit if the COTP is notified 24 hours before loading/unloading more than 454 kg (49 CFR 176.415(b)(2)). Not automatic CDC when packaged.");
		else if (hasFlag(entry, "an_other")) {
			acc.verdict = upgrade(acc.verdict, "REVIEW");
			acc.reasons.push("This ammonium nitrate variant (liquid or emulsion) may require a 176.415 permit as 'any other ammonium nitrate' not listed in 49 CFR 176.410. Confirm with the COTP / 176.415 before omitting it from the eNOAD.");
			acc.needs.push("Confirm whether 49 CFR 176.415 permit applies.");
		} else if (packForm === "unknown" && !shipBulk) {
			acc.verdict = upgrade(acc.verdict, "REVIEW");
			acc.reasons.push("Packaged ammonium nitrate is CDC only if a 176.415 permit is required. Packaging type is missing.");
			acc.needs.push("Packaging type for ammonium nitrate permit test.");
		}
	}
	if (is23) {
		acc.pih = true;
		addPara(acc.paras, "160.202(3)");
		if (qty !== null && qty > 1e3) {
			acc.verdict = upgrade(acc.verdict, "CDC");
			acc.reasons.push(`Division 2.3 PIH gas totaling ${formatKg(qty)} exceeds 1 metric ton — CDC (33 CFR 160.202(3)).`);
		} else if (qty !== null && qty <= 1e3 && acc.verdict !== "CDC") acc.reasons.push(`Division 2.3 quantity on this line is ${formatKg(qty)}, at or under the 1 metric ton per-vessel threshold. Not CDC under (3) unless other lines of the same UN push the total over 1 MT, or it is bulk liquefied gas under (7).`);
		else if (qty === null && acc.verdict !== "CDC") {
			acc.verdict = "REVIEW";
			if (bulkPkg) acc.reasons.push("Division 2.3 in a tank typically exceeds 1 metric ton. Confirm net quantity — if the vessel total for this UN is over 1 MT it is CDC (33 CFR 160.202(3)).");
			else acc.reasons.push("Division 2.3 is CDC only when the vessel total exceeds 1 metric ton. Quantity is missing.");
			acc.needs.push("Net quantity (kg or MT) for this UN — 1 MT threshold.");
		}
	}
	const pihLiquid = hasFlag(entry, "pih_liquid") || papers.pih && is61;
	if (is61 || pihLiquid) {
		addPara(acc.paras, "160.202(5)");
		const knownPih = pihLiquid || acc.pih;
		if (pihLiquid) acc.pih = true;
		if (knownPih && bulkPkg) {
			acc.verdict = upgrade(acc.verdict, "CDC");
			acc.reasons.push("Liquid PIH material (Division 6.1 primary or subsidiary) in bulk packaging is CDC at any quantity (33 CFR 160.202(5); 49 CFR 171.8 bulk packaging).");
		} else if (knownPih && qty !== null && qty > 2e4) {
			acc.verdict = upgrade(acc.verdict, "CDC");
			acc.reasons.push(`Liquid PIH totaling ${formatKg(qty)} exceeds 20 metric tons when not in bulk packaging — CDC (33 CFR 160.202(5)).`);
		} else if (knownPih && qty !== null && qty <= 2e4 && !bulkPkg) acc.reasons.push(`Known PIH liquid, packaged, ${formatKg(qty)} — under the 20 MT packaged threshold. Not CDC under (5) unless other lines of the same UN push the total over 20 MT.`);
		else if (knownPih && qty === null && !bulkPkg) {
			acc.verdict = upgrade(acc.verdict, "REVIEW");
			acc.reasons.push("Known PIH liquid in non-bulk packaging is CDC only above 20 metric tons per vessel. Quantity is missing.");
			acc.needs.push("Net quantity for 20 MT packaged-PIH test.");
		} else if (!knownPih) {
			if (bulkPkg) {
				acc.verdict = upgrade(acc.verdict, "REVIEW");
				acc.reasons.push("Division 6.1 in bulk packaging. If this material is PIH it is CDC at any quantity (33 CFR 160.202(5)). Confirm the Hazard Zone on the shipping paper.");
				acc.needs.push("Confirm whether this 6.1 liquid is PIH (Hazard Zone A–D).");
			} else if (packaged && qty !== null) acc.reasons.push(`Division 6.1 in non-bulk packaging at ${formatKg(qty)}. Paragraph (5) applies only if the material is PIH and the vessel total exceeds 20 MT. This line is under that threshold.`);
			else if (packaged && qty === null) {
				acc.verdict = upgrade(acc.verdict, "REVIEW");
				acc.reasons.push("Division 6.1 in non-bulk packaging. CDC only if PIH and the vessel total exceeds 20 MT. Quantity is missing.");
				acc.needs.push("Net quantity for 20 MT packaged-PIH test.");
			} else {
				acc.verdict = upgrade(acc.verdict, "REVIEW");
				acc.reasons.push("Division 6.1 applies, but this UN is not in the PIH catalog and packaging is not clear enough to apply the 20 MT packaged test. Confirm Hazard Zone and package type.");
				acc.needs.push("Confirm whether this 6.1 liquid is PIH (Hazard Zone A–D).");
			}
		}
	}
	if (is7) {
		addPara(acc.paras, "160.202(6)");
		if (hasFlag(entry, "rad_excepted")) acc.reasons.push("Excepted-package Class 7 (UN 2908–2911 / 3507) cannot be a highway route controlled quantity. Not CDC under 33 CFR 160.202(6).");
		else if (hasFlag(entry, "rad_fissile")) {
			acc.verdict = upgrade(acc.verdict, "REVIEW");
			acc.reasons.push("Fissile Class 7 — CDC if the shipment is a 'fissile material, controlled shipment' as defined in 49 CFR 173.403. Confirm operational controls / exclusive use.");
			acc.needs.push("Confirm fissile controlled-shipment status (49 CFR 173.403).");
		} else if (hasFlag(entry, "rad_type_b")) {
			acc.verdict = upgrade(acc.verdict, "REVIEW");
			acc.reasons.push("Type B / Type C package — CDC only if contents meet highway route controlled quantity (HRCQ) in 49 CFR 173.403. Check activity vs. 3,000 × A1/A2 or 1,000 TBq.");
			acc.needs.push("Activity / HRCQ determination from the radioactive consignment certificate.");
		} else {
			acc.verdict = upgrade(acc.verdict, "REVIEW");
			acc.reasons.push("Class 7 is CDC only as HRCQ or fissile controlled shipment — not every radioactive package. Confirm activity against 49 CFR 173.403.");
			acc.needs.push("HRCQ / fissile-controlled status.");
		}
	}
	const bulkLiquidOrGas = acc.paras.includes("160.202(7)") || acc.paras.includes("160.202(8)");
	applyResidue(acc, options, hasFlag(entry, "residue_always"), bulkLiquidOrGas);
	if (acc.verdict === "NOT_CDC" && acc.reasons.length === 0) acc.reasons.push("Does not meet any 33 CFR 160.202 Certain Dangerous Cargo category based on the class, UN, packaging, and quantity provided.");
	return {
		input: line,
		un: line.un,
		name: displayName,
		hazClass: displayClass,
		packaging: line.packaging,
		packForm,
		quantityKg: qty,
		verdict: acc.verdict,
		paragraphs: acc.paras,
		reasons: acc.reasons,
		needs: acc.needs,
		pih: acc.pih,
		catalogName: entry?.name ?? null
	};
}
function isPackaged61(l) {
	return l.paragraphs.includes("160.202(5)") && l.packForm !== "bulk_packaging" && l.packForm !== "ship_bulk";
}
function sumKnown(lines) {
	let known = 0;
	let missing = false;
	for (const l of lines) if (l.quantityKg === null) missing = true;
	else known += l.quantityKg;
	return {
		known,
		missing
	};
}
function groupByUn(lines, pred) {
	const map = /* @__PURE__ */ new Map();
	for (const l of lines) {
		if (!pred(l)) continue;
		const arr = map.get(l.un);
		if (arr) arr.push(l);
		else map.set(l.un, [l]);
	}
	return map;
}
function pass2Quantities(lines, options) {
	const notes = [];
	for (const [un, related] of groupByUn(lines, (l) => l.paragraphs.includes("160.202(3)"))) {
		const { known, missing } = sumKnown(related);
		if (known > 1e3) {
			for (const l of related) {
				if (l.verdict === "CDC" || l.verdict === "CDC_RESIDUE") continue;
				l.verdict = "CDC";
				l.reasons.push(`Vessel total for UN ${un} Division 2.3 is ${formatKg(known)}, which exceeds 1 metric ton — CDC (33 CFR 160.202(3)). Same UN only; other 2.3 gases are totaled separately.`);
				l.needs = l.needs.filter((n) => !n.includes("1 MT"));
			}
			notes.push(`UN ${un} Division 2.3 vessel total ${formatKg(known)} > 1 MT — CDC under (3).`);
		} else if (!missing) {
			for (const l of related) {
				if (l.verdict === "CDC" || l.verdict === "CDC_RESIDUE") continue;
				l.needs = l.needs.filter((n) => !n.includes("1 MT"));
				if (l.verdict === "REVIEW" && l.needs.length === 0 && !l.paragraphs.some((p) => p !== "160.202(3)")) l.verdict = "NOT_CDC";
			}
			notes.push(`UN ${un} Division 2.3 vessel total ${formatKg(known)} ≤ 1 MT — not CDC under (3).`);
		}
	}
	for (const [un, related] of groupByUn(lines, isPackaged61)) {
		const { known, missing } = sumKnown(related);
		const anyPih = related.some((l) => l.pih);
		if (known > 2e4) {
			for (const l of related) {
				if (l.verdict === "CDC" || l.verdict === "CDC_RESIDUE") continue;
				if (anyPih) {
					l.verdict = "CDC";
					l.reasons.push(`Vessel total for UN ${un} PIH liquid is ${formatKg(known)}, which exceeds 20 metric tons in non-bulk packaging — CDC (33 CFR 160.202(5)). Same UN only; other PIH liquids are totaled separately.`);
				} else {
					l.verdict = "REVIEW";
					l.reasons.push(`Vessel total for UN ${un} Division 6.1 is ${formatKg(known)}, over 20 MT packaged. If this material is PIH it is CDC (33 CFR 160.202(5)). Confirm Hazard Zone on the shipping paper.`);
					if (!l.needs.some((n) => n.includes("PIH"))) l.needs.push("Confirm whether this 6.1 liquid is PIH (Hazard Zone A–D).");
				}
				l.needs = l.needs.filter((n) => !n.includes("20 MT"));
			}
			if (anyPih) notes.push(`UN ${un} packaged PIH liquid vessel total ${formatKg(known)} > 20 MT — CDC under (5).`);
		} else if (!missing) {
			for (const l of related) {
				if (l.verdict === "CDC" || l.verdict === "CDC_RESIDUE") continue;
				l.needs = l.needs.filter((n) => !n.includes("20 MT"));
				if (l.verdict === "REVIEW" && l.needs.every((n) => n.includes("PIH") || n.includes("20 MT"))) {
					l.verdict = "NOT_CDC";
					l.needs = [];
					l.reasons.push(`Vessel total for UN ${un} ${formatKg(known)} ≤ 20 MT packaged — not CDC under (5) even if PIH.`);
				}
			}
			if (anyPih) notes.push(`UN ${un} packaged PIH liquid vessel total ${formatKg(known)} ≤ 20 MT — not CDC under (5) unless in bulk packaging.`);
		}
	}
	if (options.residueMode) {
		const bulkAn = lines.filter((l) => l.paragraphs.includes("160.202(9)"));
		if (bulkAn.length > 0) {
			const { known, missing } = sumKnown(bulkAn);
			if (!missing && known <= 453.59237) {
				for (const l of bulkAn) {
					l.verdict = "CDC_RESIDUE";
					l.reasons.push(`Bulk ammonium nitrate remaining after discharge is ${formatKg(known)} (≤ 1,000 lb). That meets the CDC residue quantity cap in 33 CFR 160.202. Confirm it is not piled in pockets over 2 cubic feet.`);
					if (!l.needs.some((n) => n.includes("2 cubic"))) l.needs.push("Confirm AN residue is not piled in pockets over 2 cubic feet — kilograms on the DCM cannot measure pile size.");
				}
				notes.push(`Bulk AN residue ${formatKg(known)} ≤ 1,000 lb — report as CDC residue if not piled over 2 cu ft.`);
			} else if (!missing && known > 453.59237) {
				for (const l of bulkAn) l.reasons.push(`Remaining bulk ammonium nitrate is ${formatKg(known)}, over the 1,000 lb CDC residue cap. Still CDC under 33 CFR 160.202(9), not CDC residue.`);
				notes.push(`Bulk AN remaining ${formatKg(known)} > 1,000 lb — still CDC, not residue.`);
			} else if (missing) for (const l of bulkAn) {
				if (l.verdict === "CDC") l.verdict = "REVIEW";
				l.reasons.push("Residue of bulk ammonium nitrate is CDC residue only at ≤ 1,000 lb total and not piled in pockets over 2 cubic feet. Quantity is missing.");
				if (!l.needs.some((n) => n.includes("1,000"))) l.needs.push("Net quantity of remaining bulk AN — 1,000 lb residue cap.");
			}
		}
	}
	return notes;
}
function toEnoad(lines) {
	const reportable = lines.filter((l) => l.verdict === "CDC" || l.verdict === "CDC_RESIDUE");
	const byKey = /* @__PURE__ */ new Map();
	for (const l of reportable) {
		const key = `${l.un}|${l.verdict}`;
		const existing = byKey.get(key);
		const basis = l.paragraphs.join(", ");
		if (!existing) byKey.set(key, {
			name: l.catalogName || l.name,
			un: l.un,
			kg: l.quantityKg,
			basis: new Set(basis ? [basis] : []),
			verdict: l.verdict
		});
		else {
			if (l.quantityKg === null || existing.kg === null) existing.kg = existing.kg === null ? l.quantityKg : null;
			else existing.kg += l.quantityKg;
			if (basis) existing.basis.add(basis);
		}
	}
	return [...byKey.values()].map((v) => ({
		name: v.name,
		un: v.un,
		amountKg: v.kg,
		amountLabel: formatKg(v.kg),
		basis: `${[...v.basis].join("; ")}${v.verdict === "CDC_RESIDUE" ? " (residue)" : ""}`,
		verdict: v.verdict
	}));
}
function evaluateManifest(lines, options = DEFAULT_OPTIONS) {
	const evaluated = lines.map((line) => {
		const pass1 = evaluateLinePass1(line, options);
		const legacy = evaluateLegacy(line);
		const mappedLegacy = legacy.verdict === "CLEAR" ? "NOT_CDC" : legacy.verdict === "CDC" ? "CDC" : "REVIEW";
		const disagrees = pass1.verdict !== mappedLegacy && !(pass1.verdict === "CDC_RESIDUE" && mappedLegacy === "CDC");
		return {
			...pass1,
			legacy: legacy.verdict,
			legacyReason: legacy.reason,
			disagrees
		};
	});
	const notes = pass2Quantities(evaluated, options);
	for (const l of evaluated) {
		const mappedLegacy = l.legacy === "CLEAR" ? "NOT_CDC" : l.legacy === "CDC" ? "CDC" : "REVIEW";
		l.disagrees = l.verdict !== mappedLegacy && !(l.verdict === "CDC_RESIDUE" && mappedLegacy === "CDC");
	}
	const cdc = evaluated.filter((l) => l.verdict === "CDC").length;
	const residue = evaluated.filter((l) => l.verdict === "CDC_RESIDUE").length;
	const review = evaluated.filter((l) => l.verdict === "REVIEW").length;
	const notCdc = evaluated.filter((l) => l.verdict === "NOT_CDC").length;
	return {
		lines: evaluated,
		total: evaluated.length,
		cdc,
		residue,
		review,
		notCdc,
		disagreements: evaluated.filter((l) => l.disagrees).length,
		enoad: toEnoad(evaluated),
		notes
	};
}
function evaluateSingle(partial) {
	return evaluateManifest([{
		rowIndex: 1,
		un: partial.un,
		name: partial.name ?? "",
		hazClass: partial.hazClass ?? "",
		subsidiary: "",
		packaging: partial.packaging ?? "",
		packingGroup: "",
		quantityKg: partial.quantityKg ?? null,
		quantityRaw: "",
		raw: [],
		limitedQty: partial.limitedQty
	}], {
		carriageMode: partial.carriageMode ?? "containerized",
		defaultQtyUnit: "lb",
		residueMode: partial.residueMode ?? false
	}).lines[0];
}
function starts$1(line, re) {
	return re.test((line.hazClass || "").replace(/\s+/g, "")) || re.test((line.input.subsidiary || "").replace(/\s+/g, ""));
}
/**
* Why CDC is YES or NO — the nine 160.202 families, in language a Master can scan.
* "watch" means the family was on the ship but did not meet a CDC threshold.
*/
function categoryScan(result) {
	const lines = result.lines;
	function item(id, label, pred, underThreshold) {
		const hits = lines.filter(pred);
		const cdcHits = hits.filter((l) => l.verdict === "CDC" || l.verdict === "CDC_RESIDUE");
		const reviewHits = hits.filter((l) => l.verdict === "REVIEW");
		if (cdcHits.length > 0) return {
			id,
			label,
			tone: "cdc",
			detail: `CDC — ${cdcHits.length} line(s)`
		};
		if (reviewHits.length > 0) return {
			id,
			label,
			tone: "watch",
			detail: `review — ${reviewHits.length} line(s)`
		};
		if (hits.length > 0) return {
			id,
			label,
			tone: "watch",
			detail: underThreshold.replace("{n}", String(hits.length))
		};
		return {
			id,
			label,
			tone: "clear",
			detail: "none"
		};
	}
	return [
		item("p1", "1.1 / 1.2 explosives", (l) => starts$1(l, /^1\.[12]/), "{n} on board — still CDC at any qty (check class)"),
		item("p2", "1.5D (176.415 permit)", (l) => starts$1(l, /^1\.5D/) || l.paragraphs.includes("160.202(2)"), "{n} on board, not in combustible bags"),
		item("p3", "2.3 PIH gas > 1 MT", (l) => starts$1(l, /^2\.3/) || l.paragraphs.includes("160.202(3)"), "{n} on board, vessel total ≤ 1 MT"),
		item("p4", "5.1 ammonium nitrate", (l) => l.paragraphs.includes("160.202(4)") || l.paragraphs.includes("160.202(9)") || [
			"1942",
			"2067",
			"2426",
			"3375"
		].includes(l.un), "{n} on board, no 176.415 permit case"),
		item("p5", "6.1 PIH tank or > 20 MT", (l) => starts$1(l, /^6\.1/) || l.paragraphs.includes("160.202(5)"), "{n} packaged line(s) under 20 MT — not CDC"),
		item("p6", "Class 7 HRCQ / fissile", (l) => starts$1(l, /^7/) || l.paragraphs.includes("160.202(6)"), "{n} on board, not HRCQ / excepted package"),
		item("p7", "Bulk liquefied gas", (l) => l.paragraphs.includes("160.202(7)"), "{n} — not ship's-tank cargo"),
		item("p8", "Named bulk liquids", (l) => l.paragraphs.includes("160.202(8)") || [
			"1098",
			"1280",
			"1831",
			"1541",
			"1135",
			"1143",
			"1605",
			"1754"
		].includes(l.un), "{n} packaged — (8) is ship's tanks only"),
		item("p9", "Bulk ammonium nitrate", (l) => l.paragraphs.includes("160.202(9)"), "{n} — not carried in bulk")
	];
}
function formatScanLines(items) {
	const width = Math.max(...items.map((i) => i.label.length));
	return items.map((i) => `  ${i.label.padEnd(width)}  ${i.detail}`).join("\n");
}
function clean(v) {
	return (v ?? "").replace(/\s+/g, " ").trim();
}
function voyageLine(voyage) {
	return [voyage.vessel ? `VESSEL: ${clean(voyage.vessel)}` : null, voyage.voyage ? `VOYAGE: ${clean(voyage.voyage)}` : null].filter(Boolean).join("    ");
}
function routeLine(voyage) {
	const pol = clean(voyage.pol);
	const pod = clean(voyage.pod);
	if (pol && pod) return `LOAD: ${pol}    DISCHARGE: ${pod}`;
	if (pol) return `LOAD: ${pol}`;
	if (pod) return `DISCHARGE: ${pod}`;
	return "";
}
var GENERAL_CARGO_LINE = "GENERAL CARGO (other than CDC): CONTAINERIZED";
var NO_CDC_PASTE = `${GENERAL_CARGO_LINE}\nCDC CARRIED: NO`;
function classOnLine(line) {
	const c = (line.hazClass || "").trim() || "—";
	const s = (line.input.subsidiary || "").trim();
	if (s && !c.includes("(")) return `${c} (${s})`;
	return c;
}
/** 33 CFR 160.206 (3) cargo fields for NVMC eNOAD, plus class / container / stow / residue. */
function enoadPasteBlock(result) {
	const rows = result.lines.filter((l) => l.verdict === "CDC" || l.verdict === "CDC_RESIDUE");
	if (rows.length === 0) return NO_CDC_PASTE;
	return [
		GENERAL_CARGO_LINE,
		"CDC CARRIED: YES",
		"",
		rows.map((l) => {
			const amount = l.quantityKg === null || !Number.isFinite(l.quantityKg) ? "AMOUNT NOT ON MANIFEST — CONFIRM" : formatKg(l.quantityKg);
			return [
				`NAME: ${(l.catalogName || l.name).toUpperCase()}`,
				`UN NUMBER: ${l.un}`,
				`CLASS: ${classOnLine(l)}`,
				`AMOUNT: ${amount}`,
				`CONTAINER: ${clean(l.input.container) || "NOT ON MANIFEST"}`,
				`STOW: ${clean(l.input.stowLoc) || "NOT ON MANIFEST"}`,
				`RESIDUE: ${l.verdict === "CDC_RESIDUE" ? "YES" : "NO"}`
			].join("\n");
		}).join("\n\n")
	].join("\n");
}
function reviewNotes(result) {
	const review = result.lines.filter((l) => l.verdict === "REVIEW");
	if (review.length === 0) return "";
	const byUn = /* @__PURE__ */ new Map();
	for (const l of review) {
		const list = byUn.get(l.un) ?? [];
		list.push(l);
		byUn.set(l.un, list);
	}
	const lines = ["REVIEW — do not paste these into eNOAD as CDC unless you confirm they meet 33 CFR 160.202:"];
	for (const [un, group] of byUn) {
		let kg = 0;
		for (const l of group) {
			if (l.quantityKg === null) {
				kg = kg === 0 ? null : kg;
				continue;
			}
			kg = (kg ?? 0) + l.quantityKg;
		}
		const sample = group[0];
		lines.push(`  UN ${un}  ${sample.name}  class ${sample.hazClass || "—"}  ${formatKg(kg)}  ${group.length} line(s)`);
		if (sample.needs[0]) lines.push(`    Need: ${sample.needs[0]}`);
		else if (sample.reasons[0]) lines.push(`    ${sample.reasons[0]}`);
	}
	return lines.join("\n");
}
function masterEmail(result, voyage, sourceName) {
	const paste = enoadPasteBlock(result);
	const vessel = clean(voyage.vessel) || "Vessel";
	const voy = clean(voyage.voyage);
	const flag = result.enoad.length === 0 ? "NO" : "YES";
	const subject = voy ? `${vessel} ${voy} — eNOAD CDC: ${flag}` : `${vessel} — eNOAD CDC: ${flag}`;
	const header = [
		voyageLine(voyage),
		routeLine(voyage),
		sourceName ? `SOURCE: ${sourceName}` : "",
		`SCREENED: ${result.total} containerized DG line(s) against 33 CFR 160.202`
	].filter(Boolean);
	const intro = result.enoad.length === 0 ? "No cargo on this manifest meets a Certain Dangerous Cargo category. Paste the boxed block into the eNOAD cargo section (33 CFR 160.206 Table (3))." : "The following cargo is Certain Dangerous Cargo and must be entered on the eNOAD. Paste the boxed block into the cargo section (33 CFR 160.206 Table (3)).";
	const review = reviewNotes(result);
	const checks = formatScanLines(categoryScan(result));
	const body = [
		"Master,",
		"",
		intro,
		"",
		"========== PASTE INTO eNOAD CARGO ==========",
		paste,
		"============================================",
		"",
		header.join("\n"),
		"",
		"CATEGORY CHECK (why this determination):",
		checks,
		"",
		review,
		review ? "" : null,
		"This is a screening aid based on 33 CFR 160.202. It is not a Coast Guard determination."
	].filter((l) => l !== null).join("\n").replace(/\n{3,}/g, "\n\n").trim();
	return {
		subject,
		body,
		paste,
		mailto: `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
	};
}
function emailFilename(voyage, flag) {
	return `${(clean(voyage.vessel) || "vessel").replace(/[^\w]+/g, "_")}_${(clean(voyage.voyage) || "voyage").replace(/[^\w]+/g, "_")}_eNOAD-CDC-${flag}.txt`;
}
function emailFileContents(subject, body) {
	return `Subject: ${subject}\n\n${body}\n`;
}
function resultsCsv(result) {
	const header = [
		"UN",
		"Name",
		"Class",
		"Packaging",
		"Quantity",
		"Verdict",
		"CFR paragraphs",
		"Reason",
		"Needs",
		"v1.0 verdict",
		"Disagrees with v1.0"
	];
	const rows = result.lines.map((l) => [
		l.un,
		csv(l.name),
		l.hazClass,
		csv(l.packaging),
		formatKg(l.quantityKg),
		l.verdict,
		l.paragraphs.join(" "),
		csv(l.reasons.join(" | ")),
		csv(l.needs.join(" | ")),
		l.legacy,
		l.disagrees ? "yes" : "no"
	].join(","));
	return [header.join(","), ...rows].join("\n");
}
function csv(value) {
	if (/[",\n]/.test(value)) return `"${value.replace(/"/g, "\"\"")}"`;
	return value;
}
function downloadText(filename, content, mime) {
	const blob = new Blob([content], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function decodeText(data) {
	const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
	if (bytes.length >= 2 && bytes[0] === 255 && bytes[1] === 254) return new TextDecoder("utf-16le").decode(bytes);
	return new TextDecoder("utf-8").decode(bytes);
}
async function ingestBuffer(data, filename, onProgress) {
	const name = (filename || "manifest").toLowerCase();
	if (name.endsWith(".pdf")) {
		const { parsePdfArrayBuffer } = await import("./pdf-394uYjpl.mjs");
		return parsePdfArrayBuffer(data, filename, onProgress);
	}
	if (name.endsWith(".xlsx") || name.endsWith(".xls") || name.endsWith(".xlsm")) {
		const { parseXlsxArrayBuffer } = await import("./xlsx-CQI5AGJi.mjs");
		return parseXlsxArrayBuffer(data, filename);
	}
	if (name.endsWith(".doc") || name.endsWith(".docx")) {
		const { extractDocText } = await import("./doc-C43ochio.mjs");
		const parsed = parseManifest(extractDocText(data), "lb");
		parsed.sourceName = filename;
		parsed.voyage = coalesceVoyage([parsed.voyage], filename);
		parsed.delimiter = name.endsWith(".docx") ? "docx" : "doc";
		if (parsed.lines.length === 0) parsed.warnings.push("This Word file had no UN numbers. Drop the Excel DCM or the EXP023AR hazardous cargo manifest.");
		return parsed;
	}
	const parsed = parseManifest(decodeText(data), "lb");
	parsed.sourceName = filename;
	parsed.voyage = coalesceVoyage([parsed.voyage], filename);
	return parsed;
}
async function ingestFile(file, onProgress) {
	return ingestBuffer(await file.arrayBuffer(), file.name, onProgress);
}
function unBag(lines) {
	const m = /* @__PURE__ */ new Map();
	for (const l of lines) {
		const cur = m.get(l.un) ?? {
			n: 0,
			name: l.name
		};
		cur.n += 1;
		if (!cur.name) cur.name = l.name;
		m.set(l.un, cur);
	}
	return m;
}
function mergeStowFromAll(results) {
	const preferred = selectPreferred(results);
	if (!preferred) return null;
	const others = results.filter((r) => r !== preferred && r.lines.length > 0);
	if (others.length === 0) return preferred;
	const byContainer = /* @__PURE__ */ new Map();
	for (const o of others) for (const l of o.lines) {
		const c = l.container?.toUpperCase();
		if (c) byContainer.set(c, l);
	}
	return {
		...preferred,
		lines: preferred.lines.map((l) => {
			if (l.stowLoc && l.container) return l;
			const hit = l.container ? byContainer.get(l.container.toUpperCase()) : void 0;
			return {
				...l,
				stowLoc: l.stowLoc || hit?.stowLoc,
				container: l.container || hit?.container
			};
		})
	};
}
function selectPreferred(results) {
	const withLines = results.filter((r) => r.lines.length > 0);
	if (withLines.length === 0) return null;
	const xlsx = withLines.find((r) => r.delimiter === "xlsx");
	if (xlsx) return xlsx;
	return [...withLines].sort((a, b) => b.lines.length - a.lines.length)[0];
}
function compareManifests(a, b) {
	const bagA = unBag(a.lines);
	const bagB = unBag(b.lines);
	const uns = /* @__PURE__ */ new Set([...bagA.keys(), ...bagB.keys()]);
	const mismatches = [];
	for (const un of uns) {
		const left = bagA.get(un);
		const right = bagB.get(un);
		const na = left?.n ?? 0;
		const nb = right?.n ?? 0;
		if (na !== nb) mismatches.push({
			un,
			name: left?.name || right?.name || "",
			a: na,
			b: nb
		});
	}
	mismatches.sort((x, y) => Math.abs(y.a - y.b) - Math.abs(x.a - x.b) || x.un.localeCompare(y.un));
	const evalA = a.lines.length ? evaluateManifest(a.lines, CONTAINER_OPTIONS) : null;
	const evalB = b.lines.length ? evaluateManifest(b.lines, CONTAINER_OPTIONS) : null;
	const aCdc = evalA ? evalA.cdc + evalA.residue : 0;
	const bCdc = evalB ? evalB.cdc + evalB.residue : 0;
	const preferred = selectPreferred([a, b]);
	return {
		aName: a.sourceName || "file A",
		bName: b.sourceName || "file B",
		aKind: a.delimiter,
		bKind: b.delimiter,
		aLines: a.lines.length,
		bLines: b.lines.length,
		preferredName: preferred?.sourceName || a.sourceName || "",
		preferredKind: preferred?.delimiter || a.delimiter,
		mismatches,
		aCdc,
		bCdc,
		aReview: evalA?.review ?? 0,
		bReview: evalB?.review ?? 0,
		agreesCdc: aCdc === bCdc && (evalA?.review ?? 0) === (evalB?.review ?? 0)
	};
}
function kindLabel(kind) {
	if (kind === "xlsx") return "Excel DCM";
	if (kind === "pdf") return "Printed manifest";
	if (kind === "doc" || kind === "docx") return "Word DCM";
	return kind.toUpperCase();
}
var RULE_CARDS = [
	{
		id: "p1",
		paragraph: "160.202(1)",
		title: "Division 1.1 or 1.2 explosives",
		summary: "Any Division 1.1 or 1.2 explosive, as defined in 49 CFR 173.50, is Certain Dangerous Cargo. Quantity and packaging do not matter.",
		threshold: "Any quantity",
		commonMiss: "Report every 1.1 / 1.2 line. 1.4S small-arms cartridges are not this category."
	},
	{
		id: "p2",
		paragraph: "160.202(2)",
		title: "Division 1.5D blasting agents (permit)",
		summary: "Only 1.5D blasting agents that require a Captain of the Port permit under 49 CFR 176.415 are CDC. Combustible bags typically need the permit; rigid packaging with non-combustible inners is excepted.",
		threshold: "Permit required under 49 CFR 176.415",
		commonMiss: "Do not auto-flag every 1.5 as CDC."
	},
	{
		id: "p3",
		paragraph: "160.202(3)",
		title: "Division 2.3 PIH gas",
		summary: "A Division 2.3 poisonous gas that is also poisonous by inhalation is CDC only when the quantity of that cargo on the vessel exceeds 1 metric ton. Totals are per UN — ammonia and chlorine each have their own 1 MT line. A few cylinders of chlorine are not CDC. An ISO tank of anhydrous ammonia usually is.",
		threshold: "> 1 metric ton per vessel, per UN",
		commonMiss: "UN 1005 / 1017 / 1079 are not automatic CDC — add that UN's vessel total first. Do not mix different 2.3 gases together."
	},
	{
		id: "p4",
		paragraph: "160.202(4)",
		title: "Division 5.1 oxidizers (permit)",
		summary: "Division 5.1 oxidizing materials that require a 49 CFR 176.415 permit — typically ammonium nitrate UN 1942 in paper or burlap bags — are CDC. Rigid UN 1942 with non-combustible inners, and UN 2067 with 24-hour COTP notice, are excepted from the permit.",
		threshold: "Permit required under 49 CFR 176.415",
		commonMiss: "Pool shock (UN 2880 / 2468) and other 5.1 oxidizers are not CDC just because they are 5.1."
	},
	{
		id: "p5",
		paragraph: "160.202(5)",
		title: "Liquid 6.1 PIH",
		summary: "A liquid with a primary or subsidiary Division 6.1 classification that is poisonous by inhalation is CDC if it is in bulk packaging (portable tank, IBC, tote) or, when not in bulk packaging, if the vessel total of that UN exceeds 20 metric tons. Totals are per UN. Ordinary 6.1 (oral/dermal toxic) is not CDC. A 5 lb carton of UN 2810 is almost never CDC.",
		threshold: "Bulk packaging, or > 20 MT packaged, per UN",
		commonMiss: "Class 6.1 on the DCM is not enough — it must be PIH, and packaged lots have a 20 MT floor. Do not mix different PIH liquids together."
	},
	{
		id: "p6",
		paragraph: "160.202(6)",
		title: "Class 7 HRCQ / fissile controlled shipment",
		summary: "Only highway route controlled quantity radioactive material or a fissile material, controlled shipment (49 CFR 173.403) is CDC. Excepted packages (UN 2910, 2911, 2908, 2909) are never HRCQ.",
		threshold: "HRCQ or fissile controlled shipment",
		commonMiss: "Do not send every Class 7 row to eNOAD as CDC."
	},
	{
		id: "p7",
		paragraph: "160.202(7)",
		title: "Bulk liquefied gas (flammable and/or toxic)",
		summary: "Ship’s-tank liquefied gas under 46 CFR 151.50-31 / 154.7. Portable tanks and cylinders on a container ship are not “carried in bulk.” This screener is locked to container ships, so (7) will not fire.",
		threshold: "Carried in bulk (vessel tanks) — not used here",
		commonMiss: "An ISO tank of LPG on a boxship is packaged cargo, not paragraph (7)."
	},
	{
		id: "p8",
		paragraph: "160.202(8)",
		title: "Named bulk liquids",
		summary: "Acetone cyanohydrin, allyl alcohol, chlorosulfonic acid, crotonaldehyde, ethylene chlorohydrin, ethylene dibromide, methacrylonitrile, oleum, and propylene oxide are CDC when carried in the ship’s tanks. Packaged drums or tank containers on a boxship are not (8).",
		threshold: "Carried in bulk (vessel tanks) — not used here",
		commonMiss: "PO or oleum in a tank container is not named-bulk-liquid CDC."
	},
	{
		id: "p9",
		paragraph: "160.202(9)",
		title: "Bulk ammonium nitrate solids",
		summary: "Ammonium nitrate and AN-based fertilizer listed as Division 5.1, when carried in bulk in the ship’s holds. Bagged AN on a container ship is evaluated under (4), not (9). After discharge, leftover bulk AN is CDC residue only at ≤ 1,000 lb total and not piled in pockets over 2 cubic feet; more than that is still CDC.",
		threshold: "Carried in bulk as Division 5.1 — residue only ≤ 1,000 lb / 2 cu ft",
		commonMiss: "Containerized bags of UN 1942 are a permit test, not a bulk-solid CDC. Residue is not 'whatever is left' — the 1,000 lb cap is in the definition."
	}
];
var ENOAD_BLURB = "Paste the boxed block into an email to the Master, then into the NVMC eNOAD cargo section. Table 160.206 (3) is CONTAINERIZED general cargo plus NAME / UN / AMOUNT for each Certain Dangerous Cargo. The packet also carries class, kg, container, stow and residue. If nothing qualifies: CDC CARRIED: NO.";
var DISCLAIMER = "Screening aid for container-ship cargo based on 33 CFR 160.202, the permit rule in 49 CFR 176.415, the IMDG Code, and GEORGE II’s CSM. It is not a Coast Guard determination, not legal advice, and not a substitute for the IMDG Code, 49 CFR, EmS, SDS, or the shipping papers. Prefer the Excel DCM over the printed PDF when both exist. If you are not sure, report it.";
var KEY$1 = "cdc-enoad-log-v1";
var MAX = 12;
function read() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY$1);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function write(entries) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(KEY$1, JSON.stringify(entries.slice(0, MAX)));
	} catch {}
}
function loadVoyageLog() {
	return read();
}
function pushVoyageLog(entry) {
	const next = [entry, ...read().filter((e) => !(e.vessel === entry.vessel && e.voyage === entry.voyage && e.sourceName === entry.sourceName))].slice(0, MAX);
	write(next);
	return next;
}
function voyageBits(v) {
	return {
		vessel: v.vessel,
		voyage: v.voyage,
		pol: v.pol,
		pod: v.pod
	};
}
function logLabel(e) {
	return [e.vessel, e.voyage].filter(Boolean).join(" ") || e.sourceName || "Voyage";
}
var CARGO_KEY = "cdc-enoad-cargo-v1";
function saveCargo(entry) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(CARGO_KEY, JSON.stringify(entry));
	} catch {}
}
function clearCargo() {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.removeItem(CARGO_KEY);
	} catch {}
}
function loadCargo() {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(CARGO_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed?.lines?.length) return null;
		if (isDemoSource(parsed.sourceName)) {
			window.localStorage.removeItem(CARGO_KEY);
			return null;
		}
		return parsed;
	} catch {
		return null;
	}
}
/** Old in-app sample files — not a real voyage. */
function isDemoSource(name) {
	return /pasha-style-sample|worked-cdc-example|sample-george-ii/i.test(name || "");
}
function inputOf(line) {
	return "input" in line ? line.input : line;
}
var NEVER_LQ_UN = /^(3480|3481|3090|3091|2794|2795|310[1-9]|311[1-9]|0081|0082|0331|0332|1942|1005|1017|1079)$/;
/** Printed “Ltd Qty” / LIMITED QUANTITIES / excepted quantity — not a bare “eq”. */
function textSaysLimitedQty(blob) {
	return /\bltd\.?\s*qty\b|\blimited\s+quantit|\bexcepted\s+quantit|\(\s*e\.?q\.?\s*\)|\bE\.Q\.?\b/i.test(blob);
}
function blobOf(input) {
	return [
		input.packaging,
		input.quantityRaw,
		input.name,
		...input.raw || []
	].join(" ");
}
function bulkOrCylinder(pkg) {
	return /\b(TK|TNK|TANK|TOTE|IBC|CYL(?:INDER)?S?|CY\b|PLTS?|PALLETS?|DRUMS?|DRM)\b/i.test(pkg);
}
/**
* IMDG 3.4 / 49 CFR 173.27 limited (and excepted) quantity.
* CargoMax uses the DCM Limited QTY column. Do not infer LQ for a whole
* printed PDF just because it has no Limited QTY column.
*
* cartonFallback is opt-in only (default false). Production screens pass false.
*/
function isLimitedQty(line, cartonFallback = false) {
	const input = inputOf(line);
	if (input.limitedQty) return true;
	if (textSaysLimitedQty(blobOf(input))) return true;
	const un = (input.un || ("un" in line ? line.un : "") || "").replace(/^UN/i, "");
	const cls = (input.hazClass || ("hazClass" in line ? line.hazClass : "") || "").trim();
	const pkg = input.packaging || "";
	if (NEVER_LQ_UN.test(un)) return false;
	if (/^1/.test(cls) || /^5\.2/.test(cls) || /^6\.2/.test(cls) || /^7/.test(cls) || /^2\.3/.test(cls)) return false;
	if (un === "1950" && !bulkOrCylinder(pkg)) return true;
	if (cartonFallback) {
		if (bulkOrCylinder(pkg)) return false;
		if (/\b(CN|CTN|CARTONS?|CANS?|BX|BOXES|BOX)\b/i.test(pkg) || !pkg.trim()) {
			const n = input.quantityKg;
			const countMatch = (pkg || "").trim().match(/^(\d+(?:\.\d+)?)\s+/);
			const count = countMatch ? Number(countMatch[1]) : 1;
			const per = n == null ? null : n / (Number.isFinite(count) && count > 0 ? count : 1);
			if (per == null || per < 30) return true;
		}
	}
	return false;
}
function sheetSections(sheet) {
	return [
		{
			title: "Hazards",
			items: sheet.hazards
		},
		{
			title: "Fire",
			items: sheet.fire
		},
		{
			title: "Spill / leak",
			items: sheet.spill
		},
		{
			title: "Explosion",
			items: sheet.explosion ?? []
		},
		{
			title: "Toxic vapor / asphyxiation",
			items: sheet.vapor ?? []
		},
		{
			title: "Water / wetting",
			items: sheet.wetting ?? []
		},
		{
			title: "Hold / confined space",
			items: sheet.hold ?? []
		},
		{
			title: "Lost overboard",
			items: sheet.overboard ?? []
		},
		{
			title: "Pollution",
			items: sheet.pollution ?? []
		},
		{
			title: "PPE",
			items: sheet.ppe
		},
		{
			title: "First aid",
			items: sheet.firstAid
		},
		{
			title: "On GEORGE II",
			items: sheet.ship
		}
	].filter((s) => s.items.length > 0);
}
var CLASS_SHEETS = {
	"1": {
		name: "Explosives",
		guide: "ERG 112",
		cls: "1",
		looksLike: "Cartridges, detonators, or boxed explosives. No leak to see until something cooks off.",
		hazards: ["Mass explosion or projection hazard.", "Fire may cause containers to explode."],
		fire: ["If the cargo is not burning: fight from the best cover, copious water on adjacent boxes.", "If explosives are involved in fire: withdraw. Do not fight. Cool nearby cargo from a distance."],
		spill: ["Do not touch damaged packages.", "Keep ignition sources away. Notify the Master and the DG locker."],
		explosion: ["1.1/1.2: mass explosion. 1.3: fireball / projection. 1.4: mostly fire and fragments.", "A box in a stack fire is the one you walk away from. Do not open it to 'check'."],
		vapor: ["Post-blast and fire smoke is toxic. Upwind. SCBA."],
		hold: ["Class 1.1–1.6 is on-deck only on GEORGE II. 1.4S may go in Hold 2. A hold of explosives on fire is abandon-ship territory."],
		overboard: ["A lost class 1 box is a notification and an exclusion-zone problem. Do not send a boat crew onto it."],
		ppe: ["Full fire kit if you must approach. SCBA."],
		firstAid: ["Blast / fragment injuries — treat as trauma. Move upwind of smoke."],
		ship: ["On GEORGE II, class 1.1–1.6 is on-deck only. 1.4S may go in Hold 2."]
	},
	"2.1": {
		name: "Flammable gas",
		guide: "ERG 115",
		cls: "2.1",
		looksLike: "Cylinders or tank containers. May frost at a leak. Often odorized; LPG is heavier than air.",
		hazards: ["Extremely flammable. Vapor can travel and flash back.", "BLEVE if a tank is fire-impaged."],
		fire: ["Do not extinguish a leaking gas fire unless the leak can be stopped.", "Water spray to cool the container. Withdraw if the tank discolors or vents rise."],
		spill: ["Isolate. Eliminate ignition (no smoking, no non-rated radios in the plume).", "Ventilate. Vapor is heavier than air — check bilges, holds, and the house intakes."],
		explosion: ["A tank in fire can BLEVE. If you cannot cool it, pull the team back.", "Aerosol cartons rocket. Do not stand in front of them."],
		vapor: ["Heavier-than-air vapor in a hold or the house is a flash-fire and asphyxiation pair."],
		hold: ["Gas-free before entry. Mechanical ventilation on Hold 2 is not a substitute for readings."],
		overboard: ["A floating LPG tank is still a BLEVE problem for the boat that goes after it."],
		pollution: ["Most 2.1 gases dissipate. The liquid pool on deck is the fire problem, not the sheen."],
		ppe: ["SCBA. Fire kit. No bare skin on a liquid LPG leak (frostbite)."],
		firstAid: ["Move to fresh air. Frostbite: warm water, do not rub. Burns: cool water."],
		ship: ["On-deck or Hold 2 (Hatches 3 & 4). Residue last contained in a tank is still a leak/fire problem."]
	},
	"2.2": {
		name: "Non-flammable gas",
		guide: "ERG 121",
		cls: "2.2",
		looksLike: "Cylinders or tanks. May be cold at a leak. Some are oxidizers (green/yellow labels).",
		hazards: ["Asphyxiation in a hold or house. Some support combustion."],
		fire: ["Use an extinguisher suited to the surrounding cargo. Cool cylinders with water."],
		spill: ["Ventilate. Do not enter a hold without atmosphere readings and SCBA."],
		vapor: ["Oxygen-deficient atmosphere. Nitrogen, CO2, argon, and helium will drop you with no smell.", "Oxidizing 2.2 (oxygen, nitrous) will turn an ordinary fire into a torch. Keep combustibles off a leak."],
		hold: ["Hold 2 is mechanically ventilated — still gas-free before entry. Empty uncleaned is still a gas."],
		ppe: ["SCBA in any poorly ventilated space."],
		firstAid: ["Fresh air. Oxygen if trained. Treat asphyxia."],
		ship: ["Hold 2 is mechanically ventilated — still gas-free before entry."]
	},
	"2.3": {
		name: "Toxic gas / PIH",
		guide: "ERG 123",
		cls: "2.3",
		looksLike: "Cylinders or tanks. May have no color. Smell is not a reliable warning.",
		hazards: ["Poisonous by inhalation. Can be fatal in a hold or on deck in still air."],
		fire: ["Cool from upwind with water. Do not get in the plume. Let it burn if the leak is the fuel."],
		spill: ["Upwind, uphill. Isolate. SCBA only. Do not enter holds. Notify USCG if in port."],
		explosion: ["Some 2.3 gases are also flammable. A 'toxic only' label does not make a BLEVE impossible."],
		vapor: ["A cylinder bank on Hatch 1 will put the house in the plume on the wrong wind.", "No filter mask. No 'I'll just crack the door'. CDC if that UN’s ship total is over 1 MT."],
		hold: ["Do not enter. Period. A 2.3 leak under deck is a stay-out and notify problem."],
		overboard: ["A leaking 2.3 package in the water is still a downwind kill zone for a rescue boat."],
		pollution: ["Notify. A PIH release in port is a COTP event, not a deck-wash."],
		ppe: ["SCBA + chemical suit. No filter mask."],
		firstAid: ["Fresh air. Do not mouth-to-mouth if inhalation poison. Medical help immediately."],
		ship: ["CDC if the ship total of that UN is over 1 MT. Keep off the house intakes."]
	},
	"3": {
		name: "Flammable liquid",
		guide: "ERG 128",
		cls: "3",
		looksLike: "Paint, solvents, alcohols — liquid in drums, cans, or IBCs. Sharp solvent smell. May be colored.",
		hazards: ["Vapor + air = flash fire. Runoff can carry fire into a hold or scupper."],
		fire: ["Foam or dry chemical on a pool. Water spray to cool boxes. Aqueous film-forming foam if you have it."],
		spill: ["Stop the leak if you can do it without walking in it. Absorb. Keep out of scuppers if you can boom it."],
		explosion: ["Vapor in a closed hold will flash. Cans and drums BLEVE/burst in a stack fire."],
		vapor: ["Heavier-than-air solvent vapor on a still night sits on deck and in the house door sills."],
		wetting: ["Water on a polar solvent (alcohol, acetone) can spread the fire. Foam is the tool."],
		hold: ["FP < 23 °C in a hold: no hot work, gas-free before entry, charged hose on that bay."],
		overboard: ["A lost paint box is a sheen and a harbor problem. Plug scuppers; do not pump it over."],
		pollution: ["Most class 3 is a marine pollutant in practice once it hits the harbor. SOPEP."],
		ppe: ["Gloves, eye protection. SCBA if the vapor is thick. No sparks."],
		firstAid: ["Skin: soap and water. Eyes: 15 minutes of water. Inhalation: fresh air."],
		ship: ["FP < 23 °C may go on deck or Hold 2. Keep ignition control on that hatch."]
	},
	"4.1": {
		name: "Flammable solid",
		guide: "ERG 133",
		cls: "4.1",
		looksLike: "Matches, sulfur, fused solids. Dust may ignite.",
		hazards: ["Easy to ignite. Some burn fiercely once started."],
		fire: ["Water, foam, or dry chemical depending on the SDS. Smother if water is the wrong tool."],
		spill: ["Sweep carefully. Avoid making a dust cloud."],
		explosion: ["Dust cloud + ignition = flash. Some 4.1 (desensitized explosives) get nastier as they dry."],
		wetting: ["A few 4.1 are wetted to stay safe. If the box is leaking water, the solid may be waking up."],
		hold: ["On-deck only on GEORGE II. Do not restow into a hold to 'get it out of the weather' without checking."],
		ppe: ["Gloves, eye protection, dust mask or SCBA in a cloud."],
		firstAid: ["Burns: cool water. Dust in eyes: rinse."],
		ship: ["On-deck only on GEORGE II (not Hold 2)."]
	},
	"4.2": {
		name: "Spontaneously combustible / self-heating",
		guide: "ERG 136",
		cls: "4.2",
		looksLike: "May look like ordinary bags or drums. The tell is heat in a stack that has no outside flame.",
		hazards: ["Can ignite without an external flame. Some react with air; some just heat in bulk."],
		fire: ["Copious water from cover if the SDS allows it. Do not stir a decomposing package.", "A hold of 4.2 on fire may not be a fight you can win — cool adjacent cargo and get people out."],
		spill: ["Do not leave a broken package to 'air out' on deck without a watch. Cover, isolate, SDS."],
		explosion: ["Some self-heating cargoes run away to a fireball once they take off."],
		wetting: ["Water is right for some and wrong for others. Read the SDS before you open the fire main on it."],
		hold: ["A 4.2 that is heating in a hold is a stay-out. Ventilate from outside. No entry."],
		ppe: ["SCBA, fire kit. Do not put a bare hand on a 'warm' bag."],
		firstAid: ["Burns: cool water. Smoke: fresh air, medical — delayed lung injury is real."],
		ship: ["Keep off live reefers. On-deck preferred. A warm box with a 4.2 label is already an incident."]
	},
	"4.3": {
		name: "Dangerous when wet",
		guide: "ERG 138",
		cls: "4.3",
		looksLike: "Drums or boxes. Often no smell until water hits it — then hydrogen or a toxic gas.",
		hazards: ["Water (rain, fire main, hold flood, a holed box) makes flammable or toxic gas."],
		fire: ["Do not put a straight stream on it unless the SDS says so. Dry powder / sand if that is the tool.", "If it is already in a fire and making gas, cool from cover and stay out of the plume."],
		spill: ["Keep it dry. Cover. No deck wash. No hold bilge pumping onto it."],
		explosion: ["Hydrogen off a wet 4.3 leak in a closed space will flash. Isolate ignition."],
		vapor: ["Some 4.3 make toxic gas with water (phosphine, ammonia). SCBA. No filter mask."],
		wetting: ["This is the casualty. Rain in a damaged roof, a leaking reefer drain, a fire-main test, a flooded hold.", "Know which hatch before the weather turns. Do not stow 4.3 in a hold that has a known leak."],
		hold: ["A flooded hold with 4.3 in it is a gas-and-fire problem. Nobody in until it is proven dry and gas-free."],
		overboard: ["In the water it will keep making gas. Exclusion zone. Notify."],
		ppe: ["SCBA. Keep skin dry. Fire kit if it has ignited."],
		firstAid: ["Fresh air. Burns: cool water. Do not use water on a still-reacting residue on the skin — brush off first."],
		ship: ["On-deck only on GEORGE II. Keep off the scuppers and off any hatch that takes green water."]
	},
	"5.1": {
		name: "Oxidizer",
		guide: "ERG 140",
		cls: "5.1",
		looksLike: "White prills or crystals (nitrates), or clear oxidizing solutions. May look like fertilizer.",
		hazards: ["Feeds a fire. Contamination with oil or combustibles can make it explosive."],
		fire: ["Flood with water. Do not use dry chemical or foam as the only tool. Cool adjacent cargo."],
		spill: ["Keep combustibles off it. Sweep dry material. Do not mix with fuels or oils."],
		explosion: ["Ammonium nitrate contaminated with oil, or in a hold fire you cannot flood, is the Texas City problem.", "Pool shock and chlorinated oxidizers with acids make chlorine gas."],
		vapor: ["Decomposition smoke is NOx — brown/orange, delayed lung injury. SCBA."],
		wetting: ["Keep AN dry and uncontaminated. A wet, oil-stained bag is worse, not better."],
		hold: ["On-deck only on GEORGE II. Do not put bagged AN in a hold to get it out of the rain."],
		pollution: ["Nitrates in the harbor are a report, not a deck wash."],
		ppe: ["Gloves, eye protection. SCBA in decomposition smoke (toxic NOx)."],
		firstAid: ["Skin/eyes: water. Inhalation of NOx: medical help — symptoms can be delayed."],
		ship: ["On-deck only. Ammonium nitrate in bags is a CDC conversation if a permit is required."]
	},
	"5.2": {
		name: "Organic peroxide",
		guide: "ERG 145",
		cls: "5.2",
		looksLike: "Often temperature-controlled. May be labeled 'keep refrigerated'. A runaway pack hisses, heats, then vents.",
		hazards: ["Can decompose violently if heated or contaminated. Some are also flammable."],
		fire: ["Cool from a distance with water. Do not stir. Withdraw if it is venting hard or the box is deforming.", "A hold of 5.2 on fire is not a hero job — cool adjacent cargo and get people out."],
		spill: ["Do not mop it into the bilge. Isolate. SDS — some peroxides detonate if they dry out."],
		explosion: ["Runaway decomposition can be a deflagration. Heat (live reefer compressor, engine casing, sun) starts it."],
		hold: ["On-deck preferred. A temperature-controlled 5.2 that has lost power is already an incident."],
		ppe: ["SCBA, face shield. Do not put a bare hand on a hot pack."],
		firstAid: ["Burns: cool water. Eyes: water 15 min. Smoke: fresh air, medical."],
		ship: ["Keep off live reefers and Hatch 10 casing. If it is a reefer itself, treat a power loss as a casualty."]
	},
	"8": {
		name: "Corrosive",
		guide: "ERG 154",
		cls: "8",
		looksLike: "Acids and alkalis in drums, totes, or wet-cell batteries. May fume. Eats steel and skin.",
		hazards: ["Burns skin and eyes. Some give off flammable or toxic vapor. Battery acid is sulfuric."],
		fire: ["Water spray. Do not get a straight stream into a tote of acid (spatter). Cool the box."],
		spill: ["For acid: soda ash / lime if you have it, otherwise dilute with lots of water on deck and keep people out of the runoff.", "For alkali: vinegar is not a shipboard plan — lots of water and keep it off the skin."],
		explosion: ["Acid on some metals makes hydrogen. Caustic on aluminum does the same. Keep ignition down on a leak."],
		vapor: ["HCl, oleum, and ammonia solution fume. Hatch 1 + wrong wind = house intakes."],
		wetting: ["Water is the usual diluent on deck. Do not trap concentrated acid in a hold bilge."],
		hold: ["Hold 2 is allowed for class 8. A fuming leak under deck is still a confined-space job — SCBA, readings."],
		overboard: ["A corrosive box over the side is a pollution and a hull-paint problem for whoever picks it up."],
		pollution: ["Do not pump it over. Boom / absorb. In port, call it in."],
		ppe: ["Face shield, chemical gloves, apron. SCBA if it fumes."],
		firstAid: ["Skin/eyes: water for 15–20 minutes. Remove clothing. Do not neutralize on the body."],
		ship: ["Hold 2 OK for class 8. Battery pallets on deck are a leak/fire pair with class 9 lithium nearby — keep segregation."]
	},
	"9": {
		name: "Miscellaneous DG",
		guide: "ERG 171",
		cls: "9",
		looksLike: "Lithium batteries, vehicles, environmentally hazardous liquids. Often no obvious leak.",
		hazards: ["Depends on the commodity. Lithium: thermal runaway. Vehicles: fuel + battery."],
		fire: ["See the UN sheet. Default: water to cool adjacent cargo. Lithium needs a long water attack."],
		spill: ["Contain. Do not walk in it. Check the SDS / UN sheet."],
		explosion: ["Lithium packs pop and throw cells. Vehicle fuel tanks add a class 3 fire on top."],
		vapor: ["Lithium vent gas is toxic and flammable. SCBA."],
		hold: ["A hold fire of lithium is a long, ugly fight. On-deck preferred."],
		overboard: ["A lithium box in the water can still run away. A 3082 box is a sheen / pollution claim."],
		pollution: ["UN 3077 / 3082 are the marine-pollutant pair. Plug scuppers. Do not pump over."],
		ppe: ["Gloves, eye protection. SCBA in smoke."],
		firstAid: ["As for the specific commodity."],
		ship: ["On-deck or Hold 2. Lithium ion is the usual class 9 fire problem on this trade."]
	},
	"6.1": {
		name: "Toxic / PIH liquid",
		guide: "ERG 151",
		cls: "6.1",
		looksLike: "Liquids or solids. May have no warning smell. PIH liquids are CDC if bulk or over 20 MT packaged.",
		hazards: ["Poison. Some are inhalation hazards (Hazard Zone A–D)."],
		fire: ["Water spray from upwind. Contain runoff — it is still toxic."],
		spill: ["Do not touch. Isolate. SCBA. Do not put it in the bilge."],
		vapor: ["PIH liquids throw a lethal vapor. No filter mask. Hatch 1 + still air = house problem."],
		hold: ["Packaged 6.1 is on-deck only on GEORGE II. Hold 2 is not approved for 6.1. Do not restow it down."],
		overboard: ["A 6.1 box in the water is still a downwind poison problem for a boat crew."],
		pollution: ["Toxic runoff is a MARPOL and a notification event. Do not wash it over the side."],
		ppe: ["SCBA + chemical protection. No filter mask for PIH."],
		firstAid: ["Fresh air. Water on skin. Medical help. Do not mouth-to-mouth."],
		ship: ["Packaged 6.1 is on-deck only on GEORGE II. Hold 2 is not approved for 6.1."]
	},
	"6.2": {
		name: "Infectious substance",
		guide: "ERG 158",
		cls: "6.2",
		looksLike: "Usually small packages, often refrigerated. Biohazard mark. Do not open 'to see'.",
		hazards: ["Infection. A broken pack is a medical and a notification problem, not a mop job."],
		fire: ["Cool adjacent cargo. Do not smash the pack with a stream. The smoke is not the only hazard."],
		spill: ["Do not touch. Isolate the box. Notify the agent, medical, and the Master. Cover. Do not sweep."],
		vapor: ["Aerosolized material from a fire or a smashed pack. SCBA. Stay out of the smoke."],
		hold: ["Nobody in that hold. This is not a 'ventilate and have a look' cargo."],
		overboard: ["Do not send a boat crew onto a 6.2 pack in the water. Notify and exclude."],
		ppe: ["SCBA, chemical gloves, coveralls. Dispose of PPE as infectious waste per the agent."],
		firstAid: ["Do not touch your face. Wash. Medical — they need to know it was 6.2."],
		ship: ["Treat it as a stay-out. The DCM line is enough to keep that hatch off-limits until the agent has a plan."]
	},
	"7": {
		name: "Radioactive",
		guide: "ERG 163",
		cls: "7",
		looksLike: "Type A / B packages, excepted packages, or industrial packages. Labels I / II / III. No leak you can see.",
		hazards: ["Radiation. Fire can breach a package. Excepted packages (UN 2910 etc.) are not CDC; HRCQ / fissile controlled is."],
		fire: ["Fight from the best distance. Do not smash the package. Cool adjacent cargo.", "If the package is involved, isolate and notify — this is no longer a deck fire only."],
		spill: ["Do not touch a damaged package. Limit time, maximize distance. Notify."],
		vapor: ["Smoke from a burning class 7 package may carry contamination. SCBA. Stay upwind."],
		hold: ["Do not enter a hold that has a damaged class 7 package. Survey first if you have the kit; if not, stay out."],
		overboard: ["A lost class 7 package is a notification to the flag, the Coast Guard, and the shipper. Mark the position."],
		ppe: ["SCBA in smoke. Gloves. Do not eat, drink, or smoke on that hatch."],
		firstAid: ["Move away. Remove outer clothing if you were in the smoke. Medical — tell them it is class 7."],
		ship: ["Excepted packages are common and are not CDC. Type B and fissile are the ones that change the voyage."]
	}
};
var UN_SHEETS = {
	"1075": {
		un: "1075",
		name: "Petroleum gases, liquefied",
		guide: "ERG 115",
		cls: "2.1",
		looksLike: "Cylinders or a tank. Colorless vapor, often odorized (mercaptan). Heavier than air. Liquid is ice-cold.",
		hazards: ["Flammable. Vapor collects in holds, house intakes, and on deck in still weather.", "BLEVE if fire-impaged."],
		fire: ["Let a leaking gas fire burn until the leak is shut, while cooling the bottle with water.", "If you cannot cool a tank in fire, pull the team back."],
		spill: ["Shut valves if it is safe. Isolate ignition. Ventilate low spaces. Gas-free before entry."],
		explosion: ["BLEVE if the tank is in fire and you cannot cool it. Aerosol-style rocket is not the problem here — the tank is."],
		vapor: ["Heavier than air. House intakes, holds, and the tunnel will hold it."],
		ppe: ["SCBA. Fire kit. Gloves — liquid LPG freezes skin."],
		firstAid: ["Fresh air. Frostbite: warm water. Burns: cool water."],
		ship: ["Residue last contained in a tank or a bank of cylinders is still LPG. Treat empty uncleaned as full.", "Do not stow against the house or under intakes."]
	},
	"1005": {
		un: "1005",
		name: "Ammonia, anhydrous",
		guide: "ERG 125",
		cls: "2.3",
		looksLike: "Colorless gas, sharp choking smell. Tank or cylinders. White cloud in damp air.",
		hazards: ["Poisonous by inhalation. Corrosive to eyes and lungs. Can be flammable in a rich mix."],
		fire: ["Cool from upwind with water. Do not walk the white cloud. Water spray knocks down vapor."],
		spill: ["Upwind. Isolate. SCBA. Lots of water on deck to knock down vapor. Keep people out of the cloud."],
		vapor: ["The white cloud is not 'just irritant'. A tank leak on Hatch 1 will put the house in it."],
		hold: ["Do not enter. CDC if the ship total of UN 1005 is over 1 MT — do not mix with UN 1017."],
		pollution: ["In port this is a COTP / eNOAD event if it meets the 1 MT line."],
		ppe: ["SCBA + chemical suit. No filter mask."],
		firstAid: ["Fresh air. Eyes/skin: water 15–20 min. Do not mouth-to-mouth. Medical immediately."],
		ship: ["CDC over 1 MT of this UN. Keep off the house. Residue last contained in a tank is still ammonia."]
	},
	"1017": {
		un: "1017",
		name: "Chlorine",
		guide: "ERG 124",
		cls: "2.3",
		looksLike: "Green-yellow gas, sharp bleach smell. Cylinders or a tank. Heavier than air.",
		hazards: ["Poisonous by inhalation. Corrosive. Oxidizer — will feed a fire."],
		fire: ["Cool from upwind. Do not get in the plume. Water spray to knock down vapor."],
		spill: ["Upwind. Isolate. SCBA only. Do not enter holds. Notify USCG if in port."],
		vapor: ["Heavier than air. A few cylinders in a hold will kill. Smell is a late warning."],
		hold: ["Stay out. CDC if the ship total of UN 1017 is over 1 MT — do not add it to the ammonia total."],
		ppe: ["SCBA + chemical suit. No filter mask."],
		firstAid: ["Fresh air. Do not mouth-to-mouth. Medical immediately. Eyes: water."],
		ship: ["CDC over 1 MT of this UN, separate from 1005. Keep off the house intakes."]
	},
	"2672": {
		un: "2672",
		name: "Ammonia solution",
		guide: "ERG 154",
		cls: "8",
		looksLike: "Colorless liquid with a sharp, choking ammonia smell. Tank or drum. Fumes in air.",
		hazards: ["Corrosive to eyes, lungs, and skin. Not the same as anhydrous UN 1005 (that is 2.3 PIH / CDC)."],
		fire: ["Water spray. Cool the tank. The vapor is irritating — stay upwind with SCBA."],
		spill: ["Lots of water on deck. Do not trap it in a hold. Keep people out of the white cloud."],
		vapor: ["Fumes. Hatch 1 + still air = house intakes. This is class 8, not CDC as packaged 8."],
		ppe: ["SCBA, face shield, chemical gloves."],
		firstAid: ["Eyes/skin: water 15–20 min. Inhalation: fresh air, medical help."],
		ship: ["Class 8 tank on deck is allowed. This is not CDC as packaged class 8. Anhydrous 1005 is a different animal."]
	},
	"2794": {
		un: "2794",
		name: "Batteries, wet, filled with acid",
		guide: "ERG 154",
		cls: "8",
		looksLike: "Lead-acid batteries on pallets. Clear/amber sulfuric acid. White corrosion on terminals. Sharp acid smell if leaking.",
		hazards: ["Sulfuric acid burns. Hydrogen off-gassing can ignite. Short circuits start fires."],
		fire: ["CO2 or dry chemical on an electrical fire. Water spray to cool. Do not use a straight stream into a cracked case."],
		spill: ["Soda ash if you have it. Otherwise flood with water on deck and keep off the skin. Isolate from alkalis and cyanides."],
		explosion: ["Hydrogen at the terminals. No sparks, no smoking on a leaking pallet."],
		ppe: ["Face shield, rubber gloves, apron."],
		firstAid: ["Skin/eyes: water 15 min. Remove soaked clothes."],
		ship: ["Common on GEORGE II pallets. Keep off lithium boxes and class 5.1. Hold 2 is allowed for class 8."]
	},
	"3480": {
		un: "3480",
		name: "Lithium ion batteries",
		guide: "ERG 147",
		cls: "9",
		looksLike: "Cartons of cells or packs. A failing pack hisses, pops, vents white/grey smoke, then orange flame. Can reignite hours later.",
		hazards: ["Thermal runaway. Toxic/flammable vent gas. Water is the coolant, not a magic extinguisher."],
		fire: ["Copious water from a safe distance. Aim to cool the pack and neighbors.", "Do not put a closed lid on a burning pack and walk away — it will cook off again. Boundary-cool for hours."],
		spill: ["Damaged packs: isolate on deck in a steel tray if you can. No house, no hold if it is venting."],
		explosion: ["Cells pop and throw. Helmet visor down. A closed box can rupture."],
		vapor: ["Vent gas is toxic and flammable. SCBA. HF in some electrolytes."],
		hold: ["A hold fire of lithium is a long, ugly fight. Keep a charged hose on that bay. On-deck preferred."],
		overboard: ["A runaway pack in the water can still burn. Do not send a boat crew onto a smoking box."],
		ppe: ["SCBA — the smoke is toxic. Fire kit. Helmet visor down (projectiles)."],
		firstAid: ["Smoke inhalation: fresh air, medical. Burns: cool water. HF in some electrolytes — calcium gluconate if in the med chest."],
		ship: ["On-deck preferred. A hold fire of lithium is a long, ugly fight. Keep a charged hose on that bay."]
	},
	"3481": {
		un: "3481",
		name: "Lithium ion batteries contained in / packed with equipment",
		guide: "ERG 147",
		cls: "9",
		looksLike: "Equipment with packs inside. Same runaway signs as UN 3480.",
		hazards: ["Same thermal runaway as 3480, sometimes delayed inside a cabinet."],
		fire: ["Water to cool. Pull power if you can do it without putting a hand in the smoke."],
		spill: ["Treat a damaged unit as a 3480 pack."],
		ppe: ["SCBA, fire kit."],
		firstAid: ["As UN 3480."],
		ship: ["Same as 3480."]
	},
	"3090": {
		un: "3090",
		name: "Lithium metal batteries",
		guide: "ERG 138",
		cls: "9",
		looksLike: "Cells or packs. Runaway looks like 3480 but water can make it worse on some metal cells — cool the neighbors anyway.",
		hazards: ["Thermal runaway. Water on burning lithium metal can throw molten metal. Toxic smoke."],
		fire: ["Cool adjacent cargo with water. A class D extinguisher if you have it on a small pack.", "Do not stand over it. Reignition is the rule. Boundary-cool for hours."],
		spill: ["Isolate a damaged pack on deck. No hold, no house."],
		explosion: ["Cells pop. Molten lithium. Visor down."],
		hold: ["Worse than 3480 in a hold. On-deck only if you can help it."],
		ppe: ["SCBA, fire kit, visor down."],
		firstAid: ["Smoke: fresh air, medical. Burns: cool water."],
		ship: ["Treat as the nastier lithium. Keep off class 8 batteries and 5.1."]
	},
	"1263": {
		un: "1263",
		name: "Paint / paint related material",
		guide: "ERG 128",
		cls: "3",
		looksLike: "Cans or pails. Colored liquid, solvent smell. May be PG I–III.",
		hazards: ["Flammable vapor. Some are corrosive (then see 8)."],
		fire: ["Foam / dry chemical on a pool. Water spray to cool cans (they burst)."],
		spill: ["Absorb. Keep ignition down. Ventilate."],
		explosion: ["Cans burst and rocket in a stack fire. Do not stand in front of the carton."],
		pollution: ["A paint box over the side or into the scuppers is a sheen. Plug scuppers."],
		ppe: ["Gloves, eye protection. SCBA in a thick vapor."],
		firstAid: ["Skin: soap and water. Eyes: water. Fresh air."],
		ship: ["Very common on this trade. PG I is the jumpy one. Hatch 8 on-deck is a CSM block."]
	},
	"1950": {
		un: "1950",
		name: "Aerosols",
		guide: "ERG 126",
		cls: "2.1",
		looksLike: "Cans. Will rocket or burst in a fire. Flammable fill on 2.1; 2.2 is just the propellant.",
		hazards: ["Projectiles in a fire. Flammable mist."],
		fire: ["Water spray from cover. Do not stand in front of the carton."],
		spill: ["Leaking cans: isolate, no sparks. Ventilate."],
		explosion: ["The carton is a box of rockets once it cooks. Ltd Qty still does this."],
		ppe: ["Eye protection. SCBA in a fire."],
		firstAid: ["As for the fill — often solvent or paint."],
		ship: ["Limited quantity cartons still burn. Keep off the house."]
	},
	"1942": {
		un: "1942",
		name: "Ammonium nitrate",
		guide: "ERG 140",
		cls: "5.1",
		looksLike: "White prills or bags. Looks like fertilizer. No smell until it decomposes (acrid NOx).",
		hazards: ["Oxidizer. Contaminated with oil or combustibles it can detonate. Decomposition gas is toxic."],
		fire: ["Flood with water. If it is in a hold fire you cannot flood, get the people off — this is the Texas City problem."],
		spill: ["Keep it dry and uncontaminated. Sweep. No oil, no sawdust."],
		explosion: ["Contaminated AN, or AN in a hold fire you cannot flood, can detonate. This is the one that sinks ships."],
		vapor: ["NOx can kill hours later. SCBA. Medical even if they feel fine."],
		wetting: ["Keep it dry. Wet + oil + heat is the worst mix, not a safety wash."],
		hold: ["On-deck only. Residue in a hold has a 1,000 lb / 2 cu ft CDC test."],
		ppe: ["SCBA in brown/orange NOx. Gloves."],
		firstAid: ["NOx inhalation can kill hours later — medical, even if they feel fine."],
		ship: ["On-deck only. Bags of AN are a CDC item if a permit is required. Residue in a hold has a 1,000 lb / 2 cu ft test."]
	},
	"1824": {
		un: "1824",
		name: "Sodium hydroxide solution",
		guide: "ERG 154",
		cls: "8",
		looksLike: "Clear or cloudy caustic liquid in drums or totes. Slippery. No strong smell.",
		hazards: ["Deep chemical burns. Reacts with aluminum and some metals, giving hydrogen."],
		fire: ["Not flammable. Water spray. Keep runoff off aluminum fittings if you can."],
		spill: ["Lots of water. Do not use acid to 'neutralize' on deck unless the chief says so."],
		explosion: ["Hydrogen off aluminum. Isolate ignition on a leak against fittings."],
		ppe: ["Face shield, chemical gloves, apron."],
		firstAid: ["Water 15–20 min. Do not put acid on the skin."],
		ship: ["Class 8 — Hold 2 or on deck."]
	},
	"1789": {
		un: "1789",
		name: "Hydrochloric acid",
		guide: "ERG 157",
		cls: "8",
		looksLike: "Fuming liquid, sharp acid smell, white vapor in damp air.",
		hazards: ["Corrosive vapor. Attacks steel and lungs."],
		fire: ["Not flammable. Water spray to knock down vapor. Cool the box."],
		spill: ["Upwind. Water spray on the vapor. Soda ash if you have it. Keep out of the hold bilge."],
		vapor: ["Fuming on deck will head for the house intakes — know the wind."],
		pollution: ["Do not pump it over. It will eat the harbor and the report will eat you."],
		ppe: ["SCBA, face shield, chemical gloves."],
		firstAid: ["Water 15–20 min. Fresh air."],
		ship: ["Fuming on deck will head for the house intakes — know the wind."]
	},
	"1203": {
		un: "1203",
		name: "Gasoline",
		guide: "ERG 128",
		cls: "3",
		looksLike: "Colored liquid, strong gasoline smell.",
		hazards: ["Very low flashpoint. Vapor explodes in a hold."],
		fire: ["Foam. No straight water on a pool. Cool tanks."],
		spill: ["Ignition control. Absorb. No bilge pumping into the harbor."],
		explosion: ["A hold of gasoline vapor will flash. Empty uncleaned tanks are still full."],
		pollution: ["Sheen in the harbor is a notification. Plug scuppers."],
		ppe: ["SCBA in vapor. Fire kit."],
		firstAid: ["Fresh air. Do not induce vomiting."],
		ship: ["On deck or Hold 2. Treat empty uncleaned tanks as full."]
	},
	"1866": {
		un: "1866",
		name: "Resin solution",
		guide: "ERG 127",
		cls: "3",
		looksLike: "Viscous, often styrene or solvent smell.",
		hazards: ["Flammable. Some can polymerize if they cook."],
		fire: ["Foam / dry chemical. Cool."],
		spill: ["Absorb. Ignition control."],
		explosion: ["A cooking tote can polymerize — heat and pressure. Cool, do not stir."],
		ppe: ["Gloves, eye protection."],
		firstAid: ["Skin: soap and water."],
		ship: ["Common construction cargo."]
	},
	"3082": {
		un: "3082",
		name: "Environmentally hazardous substance, liquid, n.o.s.",
		guide: "ERG 171",
		cls: "9",
		looksLike: "Often resins, oils, or pesticides in drums or cans. May have no obvious smell.",
		hazards: ["Marine pollutant. Some are also combustible. The casualty is the harbor, not a fireball."],
		fire: ["Water spray / foam as for the fill. Cool the box."],
		spill: ["Absorb. Plug scuppers. Do not pump over the side."],
		pollution: ["This UN exists because of the water. A scupper leak in port is a notification."],
		overboard: ["A lost 3082 box is a pollution claim and a report. Mark the position."],
		ppe: ["Gloves, eye protection."],
		firstAid: ["Skin: soap and water. SDS for the technical name."],
		ship: ["Very common on this trade. Not CDC. Still a MARPOL problem if it hits the water."]
	}
};
function classKey$1(cls) {
	const c = (cls || "").trim();
	if (c.startsWith("1")) return "1";
	if (c.startsWith("2.1")) return "2.1";
	if (c.startsWith("2.3")) return "2.3";
	if (c.startsWith("2.2") || c.startsWith("2")) return "2.2";
	if (c.startsWith("3")) return "3";
	if (c.startsWith("4.2")) return "4.2";
	if (c.startsWith("4.3")) return "4.3";
	if (c.startsWith("4")) return "4.1";
	if (c.startsWith("5.2")) return "5.2";
	if (c.startsWith("5")) return "5.1";
	if (c.startsWith("6.2")) return "6.2";
	if (c.startsWith("6.1") || c.startsWith("6")) return "6.1";
	if (c.startsWith("7")) return "7";
	if (c.startsWith("8")) return "8";
	if (c.startsWith("9")) return "9";
	return "9";
}
var EXTRA_KEYS = [
	"explosion",
	"vapor",
	"wetting",
	"hold",
	"overboard",
	"pollution"
];
function sheetFor(un, cls, name) {
	const u = (un || "").replace(/\D/g, "").padStart(4, "0");
	const base = CLASS_SHEETS[classKey$1(cls)] ?? CLASS_SHEETS["9"];
	const specific = UN_SHEETS[u];
	if (specific) {
		const merged = {
			...base,
			...specific,
			un: u,
			cls: specific.cls || cls || base.cls
		};
		for (const k of EXTRA_KEYS) if (!merged[k]?.length) merged[k] = base[k];
		return merged;
	}
	return {
		...base,
		un: u,
		name: name || base.name,
		cls: cls || base.cls
	};
}
var GROUPS = [
	"1.1",
	"1.3",
	"1.4",
	"2.1",
	"2.2",
	"2.3",
	"3",
	"4.1",
	"4.2",
	"4.3",
	"5.1",
	"5.2",
	"6.1",
	"6.2",
	"7",
	"8",
	"9"
];
/** 49 CFR 176.83(b) as in CSM 1.6 — row order matches GROUPS. */
var TABLE = [
	[
		"*",
		"*",
		"*",
		"4",
		"2",
		"2",
		"4",
		"4",
		"4",
		"4",
		"4",
		"4",
		"2",
		"4",
		"2",
		"4",
		"X"
	],
	[
		"*",
		"*",
		"*",
		"4",
		"2",
		"2",
		"4",
		"3",
		"3",
		"4",
		"4",
		"4",
		"2",
		"4",
		"2",
		"2",
		"X"
	],
	[
		"*",
		"*",
		"*",
		"2",
		"1",
		"1",
		"2",
		"2",
		"2",
		"2",
		"2",
		"2",
		"X",
		"4",
		"2",
		"2",
		"X"
	],
	[
		"4",
		"4",
		"2",
		"X",
		"X",
		"X",
		"2",
		"1",
		"2",
		"X",
		"2",
		"2",
		"X",
		"4",
		"2",
		"1",
		"X"
	],
	[
		"2",
		"2",
		"1",
		"X",
		"X",
		"X",
		"1",
		"X",
		"1",
		"X",
		"X",
		"1",
		"X",
		"2",
		"1",
		"X",
		"X"
	],
	[
		"2",
		"2",
		"1",
		"X",
		"X",
		"X",
		"2",
		"X",
		"2",
		"X",
		"X",
		"2",
		"X",
		"2",
		"1",
		"X",
		"X"
	],
	[
		"4",
		"4",
		"2",
		"2",
		"1",
		"2",
		"X",
		"X",
		"2",
		"1",
		"2",
		"2",
		"X",
		"3",
		"2",
		"X",
		"X"
	],
	[
		"4",
		"3",
		"2",
		"1",
		"X",
		"X",
		"X",
		"X",
		"1",
		"X",
		"1",
		"2",
		"X",
		"3",
		"2",
		"1",
		"X"
	],
	[
		"4",
		"3",
		"2",
		"2",
		"1",
		"2",
		"2",
		"1",
		"X",
		"1",
		"2",
		"2",
		"1",
		"3",
		"2",
		"1",
		"X"
	],
	[
		"4",
		"4",
		"2",
		"X",
		"X",
		"X",
		"1",
		"X",
		"1",
		"X",
		"2",
		"2",
		"X",
		"2",
		"2",
		"1",
		"X"
	],
	[
		"4",
		"4",
		"2",
		"2",
		"X",
		"X",
		"2",
		"1",
		"2",
		"2",
		"X",
		"2",
		"1",
		"3",
		"1",
		"2",
		"X"
	],
	[
		"4",
		"4",
		"2",
		"2",
		"1",
		"2",
		"2",
		"2",
		"2",
		"2",
		"2",
		"X",
		"1",
		"3",
		"2",
		"2",
		"X"
	],
	[
		"2",
		"2",
		"X",
		"X",
		"X",
		"X",
		"X",
		"X",
		"1",
		"X",
		"1",
		"1",
		"X",
		"1",
		"X",
		"X",
		"X"
	],
	[
		"4",
		"4",
		"4",
		"4",
		"2",
		"2",
		"3",
		"3",
		"3",
		"2",
		"3",
		"3",
		"1",
		"X",
		"3",
		"3",
		"X"
	],
	[
		"2",
		"2",
		"2",
		"2",
		"1",
		"1",
		"2",
		"2",
		"2",
		"2",
		"1",
		"2",
		"X",
		"3",
		"X",
		"2",
		"X"
	],
	[
		"4",
		"2",
		"2",
		"1",
		"X",
		"X",
		"X",
		"1",
		"1",
		"1",
		"2",
		"2",
		"X",
		"3",
		"2",
		"X",
		"X"
	],
	[
		"X",
		"X",
		"X",
		"X",
		"X",
		"X",
		"X",
		"X",
		"X",
		"X",
		"X",
		"X",
		"X",
		"X",
		"X",
		"X",
		"X"
	]
];
var CODE_RANK = {
	X: 0,
	"1": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"*": 5
};
function classGroup(raw) {
	const c = (raw || "").trim().toUpperCase().replace(/\s+/g, "");
	if (!c) return null;
	if (c.startsWith("1.4") || c.startsWith("1.6")) return "1.4";
	if (c.startsWith("1.3")) return "1.3";
	if (c.startsWith("1.1") || c.startsWith("1.2") || c.startsWith("1.5") || c === "1") return "1.1";
	if (c.startsWith("2.1")) return "2.1";
	if (c.startsWith("2.2")) return "2.2";
	if (c.startsWith("2.3")) return "2.3";
	if (c === "2") return "2.1";
	if (c.startsWith("3")) return "3";
	if (c.startsWith("4.1")) return "4.1";
	if (c.startsWith("4.2")) return "4.2";
	if (c.startsWith("4.3")) return "4.3";
	if (c.startsWith("4")) return "4.1";
	if (c.startsWith("5.2")) return "5.2";
	if (c.startsWith("5.1") || c.startsWith("5")) return "5.1";
	if (c.startsWith("6.2")) return "6.2";
	if (c.startsWith("6.1") || c.startsWith("6")) return "6.1";
	if (c.startsWith("7")) return "7";
	if (c.startsWith("8")) return "8";
	if (c.startsWith("9")) return "9";
	return null;
}
function segregationCode(a, b) {
	const ga = classGroup(a);
	const gb = classGroup(b);
	if (!ga || !gb) return "X";
	const i = GROUPS.indexOf(ga);
	const j = GROUPS.indexOf(gb);
	return TABLE[i][j];
}
function worstCode(classesA, classesB) {
	let best = {
		code: "X",
		a: classesA[0] || "",
		b: classesB[0] || ""
	};
	for (const a of classesA) for (const b of classesB) {
		const code = segregationCode(a, b);
		if (CODE_RANK[code] > CODE_RANK[best.code]) best = {
			code,
			a,
			b
		};
	}
	return best;
}
function classesOnLine(line) {
	const out = [];
	const add = (raw) => {
		const g = classGroup(raw);
		if (g && !out.includes(g)) out.push(g);
	};
	add(line.hazClass);
	add(line.input.subsidiary);
	const fromName = line.hazClass.match(/\(([^)]+)\)/);
	if (fromName) add(fromName[1]);
	return out;
}
function holdId(hatch) {
	if (hatch <= 2) return 1;
	if (hatch <= 4) return 2;
	if (hatch <= 6) return 3;
	if (hatch <= 8) return 4;
	if (hatch === 9) return 5;
	if (hatch <= 11) return 6;
	return 7;
}
var CODE_LABEL = {
	X: "no extra segregation in the 176.83 table",
	"1": "Away from (1)",
	"2": "Separated from (2)",
	"3": "Separated by a complete compartment or hold (3)",
	"4": "Separated longitudinally by an intervening hold (4)",
	"*": "Class 1 — see 49 CFR 176.144"
};
/** BAPLIE box for this container number, if the plan has one. */
function planBoxFor(container, plan) {
	if (!plan || !container) return null;
	const k = containerKey(container);
	if (!k) return null;
	return plan.boxes.find((b) => containerKey(b.container) === k) ?? null;
}
/**
* Stow used for drawing and alarms: DCM if it parses, otherwise the BAPLIE cell.
* Never writes onto line.input — that is a view-model, not a mutate-in-render.
*/
function resolvedStow(line, plan = null) {
	const dcm = parseStow(line.input.stowLoc);
	if (dcm) return dcm;
	return planBoxFor(line.input.container, plan)?.stow ?? null;
}
function boxesFrom(lines, plan = null) {
	const map = /* @__PURE__ */ new Map();
	for (const line of lines) {
		if (!line.un) continue;
		const stow = resolvedStow(line, plan);
		const cn = containerKey(line.input.container) || `row-${line.input.rowIndex}`;
		const cur = map.get(cn) ?? {
			key: cn,
			container: line.input.container || "No container no.",
			stow,
			classes: [],
			fullClasses: [],
			fullLineGroups: [],
			uns: [],
			names: [],
			lines: [],
			allLq: true
		};
		cur.lines.push(line);
		if (!cur.stow && stow) cur.stow = stow;
		const groups = classesOnLine(line);
		for (const g of groups) if (!cur.classes.includes(g)) cur.classes.push(g);
		if (!isLimitedQty(line)) {
			cur.allLq = false;
			if (groups.length) cur.fullLineGroups.push(groups);
			for (const g of groups) if (!cur.fullClasses.includes(g)) cur.fullClasses.push(g);
		}
		if (!cur.uns.includes(line.un)) cur.uns.push(line.un);
		if (line.name && !cur.names.includes(line.name)) cur.names.push(line.name);
		map.set(cn, cur);
	}
	for (const b of map.values()) if (!b.lines.length) b.allLq = false;
	return [...map.values()];
}
function hold2Forbidden(cls) {
	const g = classGroup(cls);
	if (!g) return null;
	if (g === "1.1" || g === "1.3") return `Class ${cls} is not allowed in Cargo Hold No. 2 (only 1.4S of class 1 is).`;
	if (g.startsWith("4") || g.startsWith("5") || g === "6.1") return `Class ${cls} is not allowed below deck on GEORGE II — Hold 2 is only approved for 1.4S, 2.x, 3, 8 and 9.`;
	return null;
}
function locationIssues(box, spec) {
	if (!box.stow) return [];
	if (box.allLq) return [];
	const issues = [];
	const onDeck = box.stow.onDeck;
	const label = box.container;
	const cls = (box.fullClasses.length ? box.fullClasses : box.classes).join("/");
	const base = {
		hatch: spec.id,
		containers: [label],
		uns: box.uns
	};
	if (onDeck && !spec.imdgOnDeck) issues.push({
		id: `loc-deck-${box.key}-${spec.id}`,
		severity: "block",
		...base,
		title: `${label} should not be on Hatch ${spec.id}`,
		detail: `Class ${cls} is on this hatch cover. CSM 1.6 dropped hatches 8, 9, 10 and 12 from IMDG after the conversion. Hatch 11 is the aft exception.`,
		rule: "CSM 1.6 — on-deck IMDG not approved on this cover"
	});
	if (!onDeck && !spec.imdgHold) issues.push({
		id: `loc-hold-${box.key}-${spec.id}`,
		severity: "block",
		...base,
		title: `${label} should not be below deck on Hatch ${spec.id}`,
		detail: `Only Cargo Hold No. 2 (Hatches 3 & 4) is approved for hazardous cargo below deck.`,
		rule: "CSM 1.6 — under-deck IMDG is Hold 2 only"
	});
	if (!onDeck && spec.imdgHold) {
		const checks = box.lines.length > 0 ? box.lines.filter((line) => !isLimitedQty(line)).map((line) => ({
			un: line.un,
			cls: line.hazClass,
			sub: line.input.subsidiary
		})) : box.fullClasses.map((c, i) => ({
			un: box.uns[i] || box.uns[0] || "",
			cls: c,
			sub: ""
		}));
		for (const line of checks) {
			const why = hold2Forbidden(line.cls);
			if (why) issues.push({
				id: `loc-h2-${box.key}-${line.un || line.cls}`,
				severity: "block",
				...base,
				uns: line.un ? [line.un] : box.uns,
				title: `${label} UN ${line.un || line.cls} should not be in Hold 2`,
				detail: why,
				rule: "CSM 1.6 loading table — Hold 2 (Hatches 3 & 4)"
			});
			const sub = classGroup(line.sub);
			if (classGroup(line.cls) === "2.3" && sub === "2.1") issues.push({
				id: `loc-23fl-${box.key}`,
				severity: "block",
				...base,
				title: `${label} UN ${line.un} 2.3 (2.1) is prohibited under deck`,
				detail: "IMDG / CSM note 20: class 2.3 with subsidiary 2.1 may not go under deck or in an enclosed Ro-Ro space.",
				rule: "CSM 1.6 note 20"
			});
			if (classGroup(line.cls) === "5.2") issues.push({
				id: `loc-52-${box.key}`,
				severity: "block",
				...base,
				title: `${label} class 5.2 is prohibited under deck`,
				detail: "CSM note 16: class 5.2 under deck or in enclosed Ro-Ro spaces is prohibited.",
				rule: "CSM 1.6 note 16"
			});
		}
	}
	if (spec.id === 10 && box.stow && isCasingCell(10, box.stow.row)) issues.push({
		id: `watch-casing-${box.key}`,
		severity: "watch",
		...base,
		title: `${label} is against the new engine casing`,
		detail: "Hatch 10 inboard cells next to the casing should be void unless the cargo must go here. A puncture takes the ship off hire. Outboard cells on this cover are not this watch.",
		rule: "Loading precautions — Hatch 10 casing"
	});
	return issues;
}
function pairSatisfied(code, a, b) {
	if (code === "X") return true;
	if (a.key === b.key) return false;
	if (!a.stow || !b.stow) return true;
	const sameHatch = a.stow.hatch === b.stow.hatch;
	const sameLevel = a.stow.onDeck === b.stow.onDeck;
	const cells = sameHatch && sameLevel ? athwartGap(a.stow.hatch, a.stow.onDeck, a.stow.row, b.stow.row) : 99;
	const sameRow = a.stow.row === b.stow.row;
	const hDiff = Math.abs(a.stow.hatch - b.stow.hatch);
	const holdDiff = Math.abs(holdId(a.stow.hatch) - holdId(b.stow.hatch));
	const tierGap = Math.abs(a.stow.tier - b.stow.tier);
	const bayGap = Math.abs(a.stow.bay - b.stow.bay);
	if (code === "1") return true;
	if (code === "*") return false;
	if (code === "2") {
		if (!sameLevel) return true;
		if (!sameHatch) {
			if (hDiff !== 1) return true;
			if (athwartGap(a.stow.hatch, a.stow.onDeck, a.stow.row, b.stow.row) >= 2) return true;
			if (!footprintsTouchForeAft(a.stow, b.stow)) return true;
			return false;
		}
		if (cells >= 2) return true;
		if (tierGap >= 4) return true;
		if (sameRow && bayGap >= 2) return true;
		return false;
	}
	if (code === "3") {
		if (sameHatch) return false;
		if (a.stow.onDeck && b.stow.onDeck && hDiff <= 1) return false;
		if (!a.stow.onDeck && !b.stow.onDeck && holdDiff === 0) return false;
		return true;
	}
	if (code === "4") return holdDiff >= 2;
	return true;
}
/** True when occupied bays meet along the ship (no empty 20' between). */
function footprintsTouchForeAft(a, b) {
	if (a.hatch === b.hatch) {
		const oa = occupiedBays(a);
		const ob = occupiedBays(b);
		return oa.some((bay) => ob.includes(bay));
	}
	const fwd = a.hatch < b.hatch ? a : b;
	const aft = a.hatch < b.hatch ? b : a;
	if (aft.hatch - fwd.hatch !== 1) return false;
	const fwdMax = Math.max(...occupiedBays(fwd));
	return Math.min(...occupiedBays(aft)) - fwdMax <= 2;
}
function pairIssue(a, b) {
	if (a.key === b.key) {
		const groups = a.fullLineGroups;
		if (groups.length < 2) return null;
		let worst = null;
		for (let i = 0; i < groups.length; i++) for (let j = i + 1; j < groups.length; j++) {
			const hit = worstCode(groups[i], groups[j]);
			if (!worst || CODE_RANK[hit.code] > CODE_RANK[worst.code]) worst = {
				code: hit.code,
				x: hit.a,
				y: hit.b
			};
		}
		if (!worst || CODE_RANK[worst.code] <= 1) return null;
		return {
			id: `seg-same-${a.key}-${worst.x}-${worst.y}`,
			severity: "seg",
			hatch: a.stow?.hatch ?? 0,
			containers: [a.container],
			uns: a.uns,
			title: `${a.container} has incompatible classes in the same box`,
			detail: `Class ${worst.x} and class ${worst.y} require ${CODE_LABEL[worst.code]}. Limited quantity lines in this box are ignored (IMDG 3.4.4.2). Full DG cannot share a container at that code.`,
			rule: `49 CFR 176.83(b) ${worst.code}`
		};
	}
	const classesA = a.fullClasses;
	const classesB = b.fullClasses;
	if (!classesA.length || !classesB.length) return null;
	const { code, a: ca, b: cb } = worstCode(classesA, classesB);
	if (CODE_RANK[code] <= 1) return null;
	if (pairSatisfied(code, a, b)) return null;
	const hatch = a.stow?.hatch ?? b.stow?.hatch ?? 0;
	const where = a.stow && b.stow ? `Hatch ${a.stow.hatch} ${a.stow.onDeck ? "deck" : "hold"} row ${String(a.stow.row).padStart(2, "0")} vs Hatch ${b.stow.hatch} ${b.stow.onDeck ? "deck" : "hold"} row ${String(b.stow.row).padStart(2, "0")}` : "positions on this voyage";
	return {
		id: `seg-${a.key}-${b.key}-${ca}-${cb}`,
		severity: "seg",
		hatch,
		containers: [a.container, b.container],
		uns: [...a.uns, ...b.uns],
		title: `${a.container} and ${b.container} are too close`,
		detail: `Class ${ca} vs class ${cb} is “${CODE_LABEL[code]}”. ${where}. Closed-container distances from 176.83 / IMDG 7.4.2.`,
		rule: `49 CFR 176.83(b) ${code}`
	};
}
function mergeBaplie(boxes, plan) {
	if (!plan) return boxes;
	const map = new Map(boxes.map((b) => [b.key, b]));
	for (const p of plan.boxes) {
		if (!p.dg.length) continue;
		const key = containerKey(p.container) || p.container.toUpperCase();
		const cur = map.get(key) ?? {
			key,
			container: p.container,
			stow: p.stow,
			classes: [],
			fullClasses: [],
			fullLineGroups: [],
			uns: [],
			names: [],
			lines: [],
			allLq: false
		};
		if (!cur.stow && p.stow) cur.stow = p.stow;
		const dcmPresent = cur.lines.length > 0;
		for (const dg of p.dg) {
			const g = classGroup(dg.cls);
			if (g && !cur.classes.includes(g)) cur.classes.push(g);
			if (dg.subsidiary) {
				const sg = classGroup(dg.subsidiary);
				if (sg && !cur.classes.includes(sg)) cur.classes.push(sg);
			}
			if (!dcmPresent) {
				const group = [g, dg.subsidiary ? classGroup(dg.subsidiary) : null].filter(Boolean);
				if (g && !cur.fullClasses.includes(g)) cur.fullClasses.push(g);
				if (group.length) cur.fullLineGroups.push(group);
				if (dg.subsidiary) {
					const sg = classGroup(dg.subsidiary);
					if (sg && !cur.fullClasses.includes(sg)) cur.fullClasses.push(sg);
				}
			}
			if (dg.un && !cur.uns.includes(dg.un)) cur.uns.push(dg.un);
			if (dg.name && !cur.names.includes(dg.name)) cur.names.push(dg.name);
		}
		map.set(key, cur);
	}
	return [...map.values()];
}
/**
* Stow disagreement only. Does not write onto line.input — use resolvedStow
* for the view-model cell.
*/
function applyPlanStow(lines, plan) {
	if (!plan) return [];
	const byCn = /* @__PURE__ */ new Map();
	for (const b of plan.boxes) {
		const k = containerKey(b.container);
		if (k && b.stow) byCn.set(k, b);
	}
	const issues = [];
	const seen = /* @__PURE__ */ new Set();
	for (const line of lines) {
		const k = containerKey(line.input.container);
		if (!k) continue;
		const box = byCn.get(k);
		if (!box?.stow) continue;
		const dcm = parseStow(line.input.stowLoc);
		const planRaw = box.stowRaw || formatStowRaw(box.stow);
		if (!dcm) continue;
		if (stowEqual(dcm, box.stow)) continue;
		if (seen.has(k)) continue;
		seen.add(k);
		const dcmRaw = line.input.stowLoc || formatStowRaw(dcm);
		issues.push({
			id: `stow-mismatch-${k}`,
			severity: "watch",
			hatch: dcm.hatch,
			containers: [line.input.container || k],
			uns: line.un ? [line.un] : [],
			title: `DCM stow ${dcmRaw} vs BAPLIE ${planRaw} — pick one.`,
			detail: `${line.input.container || k} is ${dcmRaw} on the DCM and ${planRaw} on the BAPLIE. Alarms stay on the DCM cell; the plan slot is drawn separately.`,
			rule: "DCM vs BAPLIE stow"
		});
	}
	return issues;
}
function padUn$1(un) {
	const d = (un || "").replace(/^UN/i, "").replace(/\D/g, "");
	if (!d) return "";
	return d.padStart(4, "0").slice(-4);
}
function classDisplay(cls, sub) {
	const c = (cls || "").trim();
	const extracted = c.match(/^([^\s(]+)\s*\(([^)]+)\)/);
	const primary = extracted ? extracted[1] : c;
	const s = (sub || extracted?.[2] || "").trim();
	if (s) return `${primary} (${s})`;
	return primary;
}
function classSig(cls, sub) {
	const g = classGroup(cls) || (cls || "").replace(/\s+/g, "").toUpperCase();
	const extracted = (cls || "").match(/\(([^)]+)\)/);
	const subRaw = (sub || extracted?.[1] || "").trim();
	const sg = subRaw ? classGroup(subRaw) || subRaw : "";
	if (!g) return sg;
	return sg ? `${g}|${sg}` : g;
}
function cargoCompareIssues(lines, plan) {
	if (!plan) return [];
	const byCn = /* @__PURE__ */ new Map();
	for (const b of plan.boxes) {
		const k = containerKey(b.container);
		if (k) byCn.set(k, b);
	}
	const issues = [];
	const seen = /* @__PURE__ */ new Set();
	for (const line of lines) {
		const k = containerKey(line.input.container);
		if (!k) continue;
		const box = byCn.get(k);
		if (!box?.dg.length) continue;
		const dcmUn = padUn$1(line.un);
		const dcmSig = classSig(line.hazClass, line.input.subsidiary);
		const planUns = [...new Set(box.dg.map((d) => padUn$1(d.un)).filter(Boolean))];
		const planSigs = [...new Set(box.dg.map((d) => classSig(d.cls, d.subsidiary)).filter(Boolean))];
		const hatch = resolvedStow(line, plan)?.hatch ?? box.stow?.hatch ?? 0;
		if (dcmUn && planUns.length && !planUns.includes(dcmUn)) {
			const id = `cargo-un-${k}`;
			if (!seen.has(id)) {
				seen.add(id);
				issues.push({
					id,
					severity: "watch",
					hatch,
					containers: [line.input.container || k],
					uns: [dcmUn, ...planUns],
					title: `DCM UN ${dcmUn} vs BAPLIE UN ${planUns.join(", ")} — pick one.`,
					detail: `${line.input.container || k} is UN ${dcmUn} on the Excel DCM and UN ${planUns.join(", ")} on the BAPLIE DGS.`,
					rule: "DCM vs BAPLIE cargo"
				});
			}
		}
		if (dcmSig && planSigs.length && !planSigs.includes(dcmSig)) {
			const planLabel = box.dg.map((d) => classDisplay(d.cls, d.subsidiary)).filter(Boolean)[0] || planSigs[0];
			const dcmLabel = classDisplay(line.hazClass, line.input.subsidiary);
			const id = `cargo-cls-${k}`;
			if (!seen.has(id)) {
				seen.add(id);
				issues.push({
					id,
					severity: "watch",
					hatch,
					containers: [line.input.container || k],
					uns: dcmUn ? [dcmUn] : [],
					title: `DCM class ${dcmLabel} vs BAPLIE ${planLabel} — pick one.`,
					detail: `${line.input.container || k} is class ${dcmLabel} on the DCM and ${planLabel} on the BAPLIE DGS.`,
					rule: "DCM vs BAPLIE cargo"
				});
			}
		}
	}
	return issues;
}
function csmShipWatches(lines, plan) {
	const issues = [];
	const seen = /* @__PURE__ */ new Set();
	const push = (issue) => {
		if (seen.has(issue.id)) return;
		seen.add(issue.id);
		issues.push(issue);
	};
	const occupants = [];
	if (plan) for (const b of plan.boxes) {
		if (!b.stow) continue;
		occupants.push({
			container: b.container,
			stow: b.stow,
			dg: b.dg.length > 0,
			reefer: b.reefer,
			operating: b.operating
		});
	}
	for (const line of lines) {
		const stow = resolvedStow(line, plan);
		if (!stow) continue;
		const k = containerKey(line.input.container);
		if (k && occupants.some((o) => containerKey(o.container) === k)) {
			const cur = occupants.find((o) => containerKey(o.container) === k);
			if (cur && !isLimitedQty(line)) cur.dg = true;
			continue;
		}
		occupants.push({
			container: line.input.container || `row-${line.input.rowIndex}`,
			stow,
			dg: !isLimitedQty(line),
			reefer: false,
			operating: false
		});
	}
	for (const o of occupants) {
		const { stow, container } = o;
		if (o.operating && stow.bay === 18 && stow.tier === 92) push({
			id: `csm-bay18-t92-${containerKey(container) || container}`,
			severity: "watch",
			hatch: stow.hatch,
			containers: [container],
			uns: [],
			title: `${container} is a Bay 18 6th-tier live reefer`,
			detail: "The conversion sheet does not allow live reefers on bay 18 at the 6th tier (92).",
			rule: "Conversion sheet — Bay 18 reefer height"
		});
		if (o.dg && !stow.onDeck && (stow.hatch === 3 || stow.hatch === 4) && (stow.row === 5 || stow.row === 6)) push({
			id: `csm-h2-mach-${containerKey(container) || container}`,
			severity: "watch",
			hatch: stow.hatch,
			containers: [container],
			uns: [],
			title: `${container} is within 3 m of a Hold 2 machinery-space boundary`,
			detail: "CSM: stow 3 m from machinery-space boundaries in Hold 2. Outboard rows 05 and 06 under hatches 3 and 4 are that strip — not only Hatch 10 casing rows 03/04.",
			rule: "CSM — Hold 2 machinery-space 3 m"
		});
		if (stow.hatch === 5 && stow.onDeck && (stow.row === 5 || stow.row === 6) && stow.tier === 90) push({
			id: `csm-fan-h5-${containerKey(container) || container}`,
			severity: "watch",
			hatch: 5,
			containers: [container],
			uns: [],
			title: `${container} is on Hatch 5 outboard ${String(stow.row).padStart(2, "0")}, 5th tier — cargo-fan access`,
			detail: "Prefer not to use outboard cells 05 and 06 on Hatch 5 at the 5th tier. That is cargo-fan access.",
			rule: "Conversion sheet — Hatch 5 cargo-fan"
		});
	}
	return issues;
}
function slotOccupants(lines, plan) {
	const map = /* @__PURE__ */ new Map();
	if (plan) for (const b of plan.boxes) {
		if (!b.stow) continue;
		const key = containerKey(b.container) || b.container.toUpperCase();
		map.set(key, {
			key,
			container: b.container,
			stow: b.stow
		});
	}
	for (const line of lines) {
		const stow = resolvedStow(line, plan);
		if (!stow) continue;
		const key = containerKey(line.input.container) || `row-${line.input.rowIndex}`;
		if (map.has(key)) continue;
		map.set(key, {
			key,
			container: line.input.container || key,
			stow
		});
	}
	return [...map.values()];
}
function baysOverlap(a, b) {
	if (a.stow.hatch !== b.stow.hatch) return false;
	if (a.stow.onDeck !== b.stow.onDeck) return false;
	if (a.stow.row !== b.stow.row) return false;
	if (a.stow.tier !== b.stow.tier) return false;
	const spec = hatchSpec(a.stow.hatch);
	const oa = occupiedBays(a.stow, spec);
	const ob = occupiedBays(b.stow, spec);
	return oa.some((bay) => ob.includes(bay));
}
function slotOverlapIssues(lines, plan) {
	const occ = slotOccupants(lines, plan);
	const issues = [];
	for (let i = 0; i < occ.length; i++) for (let j = i + 1; j < occ.length; j++) {
		const a = occ[i];
		const b = occ[j];
		if (a.key === b.key) continue;
		if (!baysOverlap(a, b)) continue;
		issues.push({
			id: `slot-${a.key}-${b.key}-${a.stow.bay}-${a.stow.row}-${a.stow.tier}`,
			severity: "block",
			hatch: a.stow.hatch,
			containers: [a.container, b.container],
			uns: [],
			title: "two boxes in one slot.",
			detail: `${a.container} at ${formatStowRaw(a.stow)} and ${b.container} at ${formatStowRaw(b.stow)} occupy the same 20'/40' footprint on Hatch ${a.stow.hatch}. Not 176.83.`,
			rule: "Slot overlap — two boxes in one cell"
		});
	}
	return issues;
}
function screenVoyage(lines, plan = null) {
	const mismatch = applyPlanStow(lines, plan);
	const boxes = mergeBaplie(boxesFrom(lines, plan), plan);
	const issues = [
		...mismatch,
		...cargoCompareIssues(lines, plan),
		...csmShipWatches(lines, plan),
		...slotOverlapIssues(lines, plan)
	];
	for (const box of boxes) {
		const spec = box.stow ? hatchSpec(box.stow.hatch) : void 0;
		if (spec) issues.push(...locationIssues(box, spec));
	}
	for (const box of boxes) {
		const inner = pairIssue(box, box);
		if (inner) issues.push(inner);
	}
	for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
		const hit = pairIssue(boxes[i], boxes[j]);
		if (hit) issues.push(hit);
	}
	const seen = /* @__PURE__ */ new Set();
	const unique = issues.filter((x) => {
		if (seen.has(x.id)) return false;
		seen.add(x.id);
		return true;
	});
	unique.sort((a, b) => {
		const rank = {
			block: 0,
			seg: 1,
			watch: 2
		};
		return rank[a.severity] - rank[b.severity] || a.hatch - b.hatch;
	});
	const byHatch = /* @__PURE__ */ new Map();
	const byContainer = /* @__PURE__ */ new Map();
	for (const h of HATCHES) byHatch.set(h.id, []);
	for (const issue of unique) {
		const list = byHatch.get(issue.hatch) ?? [];
		list.push(issue);
		byHatch.set(issue.hatch, list);
		for (const c of issue.containers) {
			const key = containerKey(c) || c.toUpperCase();
			const cur = byContainer.get(key) ?? [];
			cur.push(issue);
			byContainer.set(key, cur);
		}
	}
	return {
		issues: unique,
		blocks: unique.filter((i) => i.severity === "block").length,
		segs: unique.filter((i) => i.severity === "seg").length,
		watches: unique.filter((i) => i.severity === "watch").length,
		byHatch,
		byContainer
	};
}
function issuesForKey(screen, key) {
	const raw = key.split("#")[0];
	return screen.byContainer.get(containerKey(raw) || raw.toUpperCase()) ?? [];
}
function worstSeverity(issues) {
	if (issues.some((i) => i.severity === "block")) return "block";
	if (issues.some((i) => i.severity === "seg")) return "seg";
	if (issues.some((i) => i.severity === "watch")) return "watch";
	return null;
}
function dgLines(lines, plan = null) {
	return lines.filter((l) => l.input.un).map((l) => ({
		line: l,
		stow: resolvedStow(l, plan)
	}));
}
function hatchBuckets(lines, plan = null) {
	const all = dgLines(lines, plan);
	return HATCHES.map((spec) => {
		const mine = all.filter((d) => d.stow?.hatch === spec.id);
		const classes = [...new Set(mine.map((d) => d.line.hazClass).filter(Boolean))].sort();
		return {
			spec,
			lines: mine,
			containers: new Set(mine.map((d) => containerKey(d.line.input.container) || d.line.input.container).filter(Boolean)).size,
			classes,
			onDeck: mine.filter((d) => d.stow?.onDeck).length,
			inHold: mine.filter((d) => d.stow && !d.stow.onDeck).length,
			unknownStow: 0,
			cdc: mine.filter((d) => d.line.verdict === "CDC" || d.line.verdict === "CDC_RESIDUE").length,
			review: mine.filter((d) => d.line.verdict === "REVIEW").length
		};
	});
}
function unstowed(lines, plan = null) {
	return dgLines(lines, plan).filter((d) => !d.stow);
}
function containersOnHatch(bucket) {
	const map = /* @__PURE__ */ new Map();
	for (const d of bucket.lines) {
		const cn = containerKey(d.line.input.container) || `row-${d.line.input.rowIndex}`;
		const cur = map.get(cn) ?? {
			key: cn,
			container: d.line.input.container || "No container no.",
			stow: d.stow,
			lines: []
		};
		cur.lines.push(d);
		if (!cur.stow && d.stow) cur.stow = d.stow;
		map.set(cn, cur);
	}
	return [...map.values()].sort((a, b) => {
		const ta = a.stow?.tier ?? 0;
		const tb = b.stow?.tier ?? 0;
		if (ta !== tb) return ta - tb;
		const ra = (a.stow?.row ?? 0) - (b.stow?.row ?? 0);
		if (ra) return ra;
		return (a.stow?.bay ?? 0) - (b.stow?.bay ?? 0);
	});
}
function footprintKeys(stow) {
	return occupiedBays(stow).map((bay) => `${stow.hatch}-${bay}-${stow.row}-${stow.tier}-${stow.onDeck ? "d" : "h"}`);
}
function markConflicts(slots) {
	const byLoc = /* @__PURE__ */ new Map();
	for (const s of slots) {
		if (!s.stow) continue;
		for (const k of footprintKeys(s.stow)) {
			const cur = byLoc.get(k) ?? [];
			cur.push(s);
			byLoc.set(k, cur);
		}
	}
	for (const group of byLoc.values()) if (new Set(group.map((s) => containerKey(s.container))).size > 1) for (const s of group) s.conflict = true;
}
function hatchSlots(bucket, plan) {
	const spec = bucket.spec;
	const fromDg = containersOnHatch(bucket);
	if (!plan) {
		const only = fromDg.map((s) => ({
			...s,
			reefer: false,
			operating: false,
			ghost: ghostOf(s, spec)
		}));
		markConflicts(only);
		return sortSlots(only);
	}
	const slots = fromDg.map((s) => ({
		...s,
		reefer: false,
		operating: false
	}));
	for (const box of plan.boxes) {
		if (box.stow?.hatch !== spec.id) continue;
		const key = containerKey(box.container) || box.container.toUpperCase();
		const dcm = slots.find((s) => containerKey(s.container) === key && !s.box);
		if (!dcm) {
			slots.push({
				key,
				container: box.container,
				stow: box.stow,
				lines: [],
				box,
				reefer: box.reefer,
				operating: box.operating
			});
			continue;
		}
		if (!dcm.stow) {
			dcm.stow = box.stow;
			dcm.box = box;
			dcm.reefer = box.reefer;
			dcm.operating = box.operating;
			continue;
		}
		if (stowEqual(dcm.stow, box.stow)) {
			dcm.box = box;
			dcm.reefer = box.reefer;
			dcm.operating = box.operating;
			continue;
		}
		dcm.mismatch = true;
		dcm.key = `${key}#dcm`;
		slots.push({
			key,
			container: box.container,
			stow: box.stow,
			lines: [],
			box,
			reefer: box.reefer,
			operating: box.operating,
			mismatch: true
		});
	}
	for (const s of slots) s.ghost = ghostOf(s, spec);
	markConflicts(slots);
	return sortSlots(slots);
}
function ghostOf(s, spec) {
	if (!s.stow) return false;
	if (!isRealRow(spec, s.stow.onDeck, s.stow.row)) return true;
	if (s.stow.onDeck && s.stow.tier < 82) return true;
	return false;
}
function sortSlots(slots) {
	return slots.sort((a, b) => {
		const ta = a.stow?.tier ?? 0;
		const tb = b.stow?.tier ?? 0;
		if (ta !== tb) return ta - tb;
		const ra = a.stow?.row ?? 0;
		const rb = b.stow?.row ?? 0;
		if (ra !== rb) return ra - rb;
		return (a.stow?.bay ?? 0) - (b.stow?.bay ?? 0);
	});
}
function ghostSlots(slots, spec) {
	return slots.filter((s) => {
		if (s.ghost) return true;
		if (!s.stow || !spec) return false;
		return !isRealRow(spec, s.stow.onDeck, s.stow.row);
	});
}
function unplacedBoxes(plan) {
	if (!plan) return [];
	return plan.boxes.filter((b) => !b.stow || !HATCHES.some((h) => h.id === b.stow?.hatch));
}
/** Conversion sheet: all reefers face aft, except bay 6 or 22 below (motors fwd). HAN+RFF overrides. */
function reeferMotors(stow) {
	if (!stow.onDeck && (stow.bay === 6 || stow.bay === 22)) return "fwd";
	return "aft";
}
function heatSensitive(cls, un) {
	const c = (cls || "").trim();
	if (/^1/.test(c)) return true;
	if (/^2\.1/.test(c) || c === "2") return true;
	if (/^3/.test(c)) return true;
	if (/^4\./.test(c)) return true;
	if (/^5\./.test(c)) return true;
	if (un && /^(3090|3091|3480|3481)$/.test(un)) return true;
	return false;
}
function beside(a, b) {
	if (a.onDeck !== b.onDeck) return false;
	if (a.hatch !== b.hatch) return false;
	if (!sameBayColumn(a, b)) return false;
	const tierGap = Math.abs(a.tier - b.tier);
	if (a.row === b.row && tierGap > 0 && tierGap <= 2) return true;
	if (a.tier === b.tier && athwartGap(a.hatch, a.onDeck, a.row, b.row) <= 1) return true;
	return false;
}
function atMotorEnd(reefer, other, motors) {
	if (reefer.onDeck !== other.onDeck) return false;
	if (!sameBayColumn(reefer, other)) return false;
	if (reefer.row !== other.row) return false;
	if (Math.abs(reefer.tier - other.tier) > 2) return false;
	const mine = occupiedBays(reefer);
	if (mine.length < 2) return false;
	const theirs = occupiedBays(other);
	const motorBay = motors === "aft" ? Math.max(...mine) : Math.min(...mine);
	return theirs.includes(motorBay);
}
function dgSpots(lines, plan) {
	const out = [];
	const seen = /* @__PURE__ */ new Set();
	const onDcm = /* @__PURE__ */ new Set();
	for (const line of lines) {
		const stow = resolvedStow(line, plan);
		if (!stow) continue;
		const container = containerKey(line.input.container) || `row-${line.input.rowIndex}`;
		if (containerKey(line.input.container)) onDcm.add(container);
		const key = `${container}|${line.un}|${stow.bay}-${stow.row}-${stow.tier}`;
		if (seen.has(key)) continue;
		seen.add(key);
		if (isLimitedQty(line)) continue;
		out.push({
			container: line.input.container || container,
			stow,
			cls: line.hazClass,
			un: line.un,
			name: line.name
		});
	}
	if (plan) for (const box of plan.boxes) {
		if (!box.stow || !box.dg.length) continue;
		const ck = containerKey(box.container);
		if (ck && onDcm.has(ck)) continue;
		for (const dg of box.dg) {
			const key = `${ck || box.container}|${dg.un}|${box.stow.bay}-${box.stow.row}-${box.stow.tier}`;
			if (seen.has(key)) continue;
			seen.add(key);
			out.push({
				container: box.container,
				stow: box.stow,
				cls: dg.cls,
				un: dg.un,
				name: dg.name || "BAPLIE DGS"
			});
		}
	}
	return out;
}
function reeferHeatIssues(lines, plan) {
	if (!plan) return [];
	const reefers = plan.boxes.filter((b) => b.reefer && b.operating && b.stow);
	const dgs = dgSpots(lines, plan);
	const issues = [];
	for (const dg of dgs) for (const rf of reefers) {
		const stow = rf.stow;
		if (containerKey(dg.container) && containerKey(dg.container) === containerKey(rf.container)) continue;
		const motors = rf.motors;
		const motor = atMotorEnd(stow, dg.stow, motors);
		if (!(beside(stow, dg.stow) || motor)) continue;
		if (!heatSensitive(dg.cls, dg.un)) continue;
		issues.push({
			id: `rf-${dg.container}-${rf.container}-${dg.un}`,
			severity: "seg",
			hatch: dg.stow.hatch,
			containers: [dg.container, rf.container],
			uns: dg.un ? [dg.un] : [],
			title: `${dg.container} UN ${dg.un} class ${dg.cls} is too close to a live reefer`,
			detail: motor ? `Reefers on GEORGE II face ${motors === "aft" ? "aft (motors aft)" : `forward — bay ${stow.bay} below is the exception`}. ${rf.container} ${rf.iso || "RF"} ${rf.tempC ?? "set"}°C. DG ${dg.un || dg.cls} is on the compressor end.` : `${rf.container} is a live reefer (${rf.iso || "R"}) ${formatSpot(stow)}. ${dg.container} UN ${dg.un || "—"} class ${dg.cls} is in an adjacent cell.`,
			rule: "Heat source — live reefer compressor (IMDG keep away from sources of heat)"
		});
	}
	return issues;
}
function formatSpot(s) {
	return `Hatch ${s.hatch} ${s.onDeck ? "deck" : "hold"} row ${String(s.row).padStart(2, "0")} tier ${s.tier}`;
}
function countReefers(plan, hatch) {
	if (!plan) return 0;
	return plan.boxes.filter((b) => b.reefer && (hatch == null || b.stow?.hatch === hatch)).length;
}
function countBoxes(plan, hatch) {
	if (!plan) return 0;
	return plan.boxes.filter((b) => hatch == null || b.stow?.hatch === hatch).length;
}
/** Unique containers that carry DG — DCM lines plus BAPLIE DGS. */
function countDangerous(lines, plan, hatch) {
	const keys = /* @__PURE__ */ new Set();
	for (const line of lines) {
		if (!line.un) continue;
		const stow = resolvedStow(line, plan);
		if (hatch != null && stow?.hatch !== hatch) continue;
		keys.add(containerKey(line.input.container) || `row-${line.input.rowIndex}`);
	}
	if (plan) for (const box of plan.boxes) {
		if (!box.dg.length) continue;
		if (hatch != null && box.stow?.hatch !== hatch) continue;
		keys.add(containerKey(box.container) || box.container.toUpperCase());
	}
	return keys.size;
}
function motorsNote(box) {
	if (!box.reefer) return "";
	if (box.han && /^RFF/i.test(box.han)) return "Motor faces FORWARD (HAN+RFF on the BAPLIE).";
	if (box.motors === "fwd") return "Motor faces FORWARD — bay 6 or 22 below is the conversion-sheet exception.";
	return "Motor faces AFT (whole vessel except bay 6 / 22 below, unless HAN+RFF).";
}
function slotLookupKey(key) {
	return key.split("#")[0];
}
function slotIsDg(s) {
	if (s.lines.length > 0) return true;
	return Boolean(s.box?.dg.length);
}
function slotCargoClass(s) {
	const dg = slotIsDg(s);
	const rf = Boolean(s.reefer);
	if (rf && dg) return "slot-cargo-reefer-dg";
	if (rf && s.operating) return "slot-cargo-reefer";
	if (rf) return "slot-cargo-nor";
	if (dg) return "slot-cargo-dg";
	return "slot-cargo-dry";
}
function ShipBoard({ parsed, result, baplie }) {
	const [hatchId, setHatchId] = (0, import_react.useState)(null);
	const [slotKey, setSlotKey] = (0, import_react.useState)(null);
	const [chem, setChem] = (0, import_react.useState)(null);
	const lines = result?.lines ?? [];
	const lqOf = (line) => isLimitedQty(line);
	const buckets = (0, import_react.useMemo)(() => hatchBuckets(lines, baplie), [lines, baplie]);
	const screen = (0, import_react.useMemo)(() => screenVoyage(lines, baplie), [lines, baplie]);
	const heat = (0, import_react.useMemo)(() => reeferHeatIssues(lines, baplie), [lines, baplie]);
	const loose = (0, import_react.useMemo)(() => unstowed(lines, baplie), [lines, baplie]);
	const unplaced = (0, import_react.useMemo)(() => unplacedBoxes(baplie), [baplie]);
	const active = buckets.find((b) => b.spec.id === hatchId) ?? null;
	const slots = active ? hatchSlots(active, baplie) : [];
	const slot = slots.find((s) => s.key === slotKey) ?? null;
	const totalRf = countReefers(baplie);
	const totalDg = countDangerous(lines, baplie);
	const totalBoxes = countBoxes(baplie);
	const voyageName = parsed?.voyage.voyage ? `${parsed.voyage.vessel || VESSEL.name} ${parsed.voyage.voyage}` : baplie?.voyage ? `${baplie.vessel || VESSEL.name} ${baplie.voyage}` : VESSEL.name;
	(0, import_react.useEffect)(() => {
		if (!slotKey) return;
		const onKey = (e) => {
			if (e.key === "Escape") {
				if (chem) setChem(null);
				else setSlotKey(null);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [slotKey, chem]);
	if (active) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HatchView, {
		bucket: active,
		slots,
		issues: [...screen.byHatch.get(active.spec.id) ?? [], ...heat.filter((i) => i.hatch === active.spec.id)],
		baplie,
		onBack: () => {
			setHatchId(null);
			setSlotKey(null);
			setChem(null);
		},
		onSlot: (k) => {
			setChem(null);
			setSlotKey(k);
		}
	}), slot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContainerPopout, {
		slot,
		hatch: active,
		issues: [...issuesForKey(screen, slotLookupKey(slot.key)), ...heat.filter((i) => i.containers.some((c) => containerKey(c) === containerKey(slotLookupKey(slot.key))))],
		chem,
		onClose: () => {
			setSlotKey(null);
			setChem(null);
		},
		onChem: setChem,
		onBackFromChem: () => setChem(null)
	}) : null] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs tracking-[0.14em] text-subtle uppercase",
					children: [
						VESSEL.name,
						" · ",
						VESSEL.clazz,
						" · ABS ",
						VESSEL.abs
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-1 text-xl font-medium",
					children: [
						voyageName,
						" ",
						"— ",
						baplie ? "bay plan" : "dangerous cargo by hatch"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 max-w-3xl text-sm text-muted",
					children: ["House and conning are forward. Hatches 1–12 run aft. The engine casing sits at Hatch 10; the LNG vent mast is part of the plant, not a cargo tank.", baplie ? " Reefers are blue. DG is red. A box that is both is split on the diagonal. Other cargo is plain." : " Drop a BAPLIE on Manifest when you want reefers and the rest of the boxes. DCM-only still works."]
				}),
				baplie ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-mono text-sm text-ink",
					children: [
						totalBoxes,
						" boxes · ",
						totalRf,
						" reefers · ",
						totalDg,
						" DG",
						unplaced.length ? ` · ${unplaced.length} unplaced` : ""
					]
				}) : totalDg > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-mono text-sm text-ink",
					children: [totalDg, " DG containers"]
				}) : null
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Profile, {
				buckets,
				screen,
				baplie,
				lines,
				onHatch: setHatchId
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: buckets.map((b) => {
					const worst = worstSeverity(screen.byHatch.get(b.spec.id) ?? []);
					const nBoxes = baplie ? countBoxes(baplie, b.spec.id) : 0;
					const nRf = baplie ? countReefers(baplie, b.spec.id) : 0;
					const nDg = countDangerous(lines, baplie, b.spec.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setHatchId(b.spec.id),
						className: cn("rounded-lg border bg-surface p-4 text-left shadow-border transition-colors duration-150", worst === "block" ? "border-cdc" : worst === "seg" ? "border-review" : b.lines.length > 0 || nBoxes > 0 ? "border-accent/40 hover:border-accent" : "hover:border-navy/30"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-medium",
									children: ["Hatch ", b.spec.id]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										b.spec.hold || "On deck",
										" · Bays ",
										b.spec.bays.join("-"),
										b.spec.holdAccess === "tunnel" ? " · tunnel" : b.spec.holdAccess === "deck" ? " · deck access" : ""
									]
								})] }), nBoxes > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "navy",
									children: [
										nBoxes,
										" boxes",
										nDg ? ` · ${nDg} DG` : ""
									]
								}) : nDg > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "navy",
									children: [nDg, " DG"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-subtle",
									children: "No DG"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted",
								children: [b.spec.imdgOnDeck ? "On-deck IMDG OK" : "No IMDG on this cover", b.spec.imdgHold ? " · Hold 2 IMDG" : ""]
							}),
							b.classes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-xs text-ink",
								children: ["Class ", b.classes.join(", ")]
							}),
							b.lines.some((d) => lqOf(d.line)) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted",
								children: [
									b.lines.filter((d) => lqOf(d.line)).length,
									" Ltd Qty ·",
									" ",
									b.lines.filter((d) => !lqOf(d.line)).length,
									" full DG"
								]
							}),
							nRf > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-ink",
								children: [nRf, " reefers"]
							}),
							b.cdc > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-cdc",
								children: [b.cdc, " CDC"]
							})
						]
					}, b.spec.id);
				})
			}),
			loose.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-review/30 bg-review-soft p-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-medium",
					children: [loose.length, " DG lines have no stowage position"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted",
					children: "Drop the Excel DCM if you have it — Stow Loc is on that sheet. The printed manifest still screens for CDC."
				})]
			}),
			unplaced.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-review/30 bg-review-soft p-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-medium",
					children: [unplaced.length, " BAPLIE boxes have no hatch on this ship"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted",
					children: "Unknown bays stay unplaced. They still count in the reefer and DG totals above."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueBanner, {
				screen,
				extra: heat,
				onHatch: setHatchId
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1 text-sm text-muted",
				children: SHIP_NOTES.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["— ", n] }, n))
			})
		]
	});
}
function IssueBanner({ screen, extra, onHatch }) {
	const all = [...screen.issues, ...extra];
	const hot = all.filter((i) => i.severity !== "watch");
	if (!all.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-lg border border-ok/30 bg-ok-soft p-4 text-sm text-ok",
		children: "No CSM location block and no 176.83 segregation hits on the positions we could read. Limited quantities (IMDG 3.4) are not segregated and are not under the hatch DoC — same as CargoMax. Full DG is still checked against CSM 1.6 and 176.83. A UN is not segregated from its own subsidiary."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-lg border p-4", screen.blocks ? "border-cdc/40 bg-cdc-soft" : "border-review/40 bg-review-soft"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium text-ink",
				children: "What is wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					screen.blocks ? `${screen.blocks} should not be in that space` : "Spaces look allowed",
					screen.segs + extra.filter((i) => i.severity === "seg").length ? ` · ${screen.segs + extra.filter((i) => i.severity === "seg").length} too close / heat` : "",
					screen.watches + extra.filter((i) => i.severity === "watch").length ? ` · ${screen.watches + extra.filter((i) => i.severity === "watch").length} caution` : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: hot.slice(0, 12).map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => issue.hatch && onHatch(issue.hatch),
					className: "text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-ink",
						children: issue.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: issue.detail
					})]
				}) }, issue.id))
			}),
			hot.length > 12 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: [
					"+ ",
					hot.length - 12,
					" more — open the hatch."
				]
			})
		]
	});
}
function IssueList({ issues }) {
	if (!issues.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-2",
		children: issues.map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: cn("rounded-lg border p-3", issue.severity === "block" ? "border-cdc/40 bg-cdc-soft" : issue.severity === "seg" ? "border-review/40 bg-review-soft" : "border-accent/30 bg-residue-soft"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-ink",
				children: issue.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: issue.detail
			})]
		}, issue.id))
	});
}
function Profile({ buckets, screen, baplie, lines, onHatch }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-lg border bg-navy p-4 text-primary-foreground shadow-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 1120 260",
			className: "h-auto w-full min-w-[720px]",
			role: "img",
			"aria-label": "GEORGE II profile, bow to the left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "M/V GEORGE II · bow left · house forward · hatches 1–12 aft" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "hatch-reefer-dg",
					x1: "1",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "var(--color-reefer)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "49%",
							stopColor: "var(--color-reefer)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "51%",
							stopColor: "var(--color-dg-box)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "var(--color-dg-box)"
						})
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "20",
					y1: "200",
					x2: "1100",
					y2: "200",
					stroke: "currentColor",
					strokeOpacity: "0.25"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M70 200 L110 128 L180 118 L980 118 L1040 138 L1088 200 Z",
					fill: "currentColor",
					fillOpacity: "0.12",
					stroke: "currentColor",
					strokeOpacity: "0.45"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M70 200 L96 92 L118 118",
					fill: "none",
					stroke: "currentColor",
					strokeOpacity: "0.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "118",
					y: "48",
					width: "86",
					height: "70",
					rx: "2",
					fill: "currentColor",
					fillOpacity: "0.28"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "126",
					y: "58",
					width: "18",
					height: "12",
					fill: "currentColor",
					fillOpacity: "0.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "150",
					y: "58",
					width: "18",
					height: "12",
					fill: "currentColor",
					fillOpacity: "0.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "174",
					y: "58",
					width: "18",
					height: "12",
					fill: "currentColor",
					fillOpacity: "0.5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "161",
					y: "40",
					textAnchor: "middle",
					fill: "currentColor",
					fontSize: "11",
					children: "HOUSE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "161",
					y1: "48",
					x2: "161",
					y2: "18",
					stroke: "currentColor",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "161",
					y1: "22",
					x2: "178",
					y2: "34",
					stroke: "currentColor"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "161",
					y: "14",
					textAnchor: "middle",
					fill: "currentColor",
					fontSize: "9",
					children: "FWD MAST"
				}),
				HATCHES.map((h, i) => {
					const x = 218 + i * 68;
					const b = buckets[i];
					const nBoxes = baplie ? countBoxes(baplie, h.id) : 0;
					const hot = b.lines.length > 0 || nBoxes > 0;
					const w = h.id === 10 ? 44 : 58;
					const worst = worstSeverity(screen.byHatch.get(h.id) ?? []);
					const rf = baplie ? countReefers(baplie, h.id) : 0;
					const dg = countDangerous(lines, baplie, h.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x,
							y: 86,
							width: w,
							height: 32,
							rx: "2",
							fill: dg && rf ? "url(#hatch-reefer-dg)" : dg ? "var(--color-dg-box)" : rf ? "var(--color-reefer)" : nBoxes ? "var(--color-navy-2)" : "currentColor",
							fillOpacity: hot || rf || dg ? .95 : .2,
							stroke: "currentColor",
							strokeOpacity: "0.6",
							className: "cursor-pointer",
							onClick: () => onHatch(h.id)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: x + w / 2,
							y: 107,
							textAnchor: "middle",
							fill: hot || rf || dg ? "var(--color-primary-foreground)" : "currentColor",
							fontSize: "12",
							fontWeight: 600,
							className: "cursor-pointer",
							onClick: () => onHatch(h.id),
							children: h.id
						}),
						worst === "block" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: x + w / 2,
							y: 80,
							textAnchor: "middle",
							fill: "var(--color-cdc)",
							fontSize: "10",
							children: "!"
						})
					] }, h.id);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "818",
					y: "54",
					width: "36",
					height: "64",
					fill: "currentColor",
					fillOpacity: "0.4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "836",
					y: "48",
					textAnchor: "middle",
					fill: "currentColor",
					fontSize: "9",
					children: "CASING"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "980",
					y: "62",
					width: "22",
					height: "56",
					fill: "currentColor",
					fillOpacity: "0.45"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "1016",
					y1: "118",
					x2: "1016",
					y2: "28",
					stroke: "currentColor",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "1016",
					y: "22",
					textAnchor: "middle",
					fill: "currentColor",
					fontSize: "9",
					children: "LNG VENT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "70",
					y: "222",
					fill: "currentColor",
					fontSize: "11",
					children: "BOW"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "1040",
					y: "222",
					textAnchor: "end",
					fill: "currentColor",
					fontSize: "11",
					children: "STERN"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "560",
					y: "248",
					textAnchor: "middle",
					fill: "currentColor",
					fontSize: "11",
					fillOpacity: "0.7",
					children: "Aft of the house: H1–2 Hold 1 · H3–4 Hold 2 IMDG · H9 Hold 5 engine · H10 casing · H11 on-deck IMDG · H12 Hold 7 / FPR"
				})
			]
		})
	});
}
function HatchView({ bucket, slots, issues, baplie, onBack, onSlot }) {
	const drawn = slots.filter((s) => !s.ghost);
	const ghosts = ghostSlots(slots, bucket.spec);
	const deckTiers = deckTiersFor(bucket.spec, drawn.filter((s) => s.stow?.onDeck).map((s) => s.stow.tier));
	const holdTiers = holdTiersFor(bucket.spec);
	const deckRowList = deckRowsFor(bucket.spec);
	const holdRowList = holdRowsFor(bucket.spec);
	function cells(tier, row, bay) {
		return drawn.filter((s) => {
			if (!s.stow || s.stow.tier !== tier || s.stow.row !== row) return false;
			return occupiedBays(s.stow, bucket.spec).includes(bay);
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "inline-flex items-center gap-2 text-sm text-accent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Ship profile"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-xl font-medium",
				children: [
					"Hatch ",
					bucket.spec.id,
					bucket.spec.hold ? ` · ${bucket.spec.hold}` : ""
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					"Section looking forward from aft — port is to the left (even cells), 00 is centerline, starboard is odd. Each cell is three bays: ",
					bucket.spec.bays[0],
					" (20' fwd) ·",
					" ",
					bucket.spec.bay40,
					" (40') · ",
					bucket.spec.bays[2],
					" (20' aft). Press a box for the cargo list."
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2 text-xs",
				children: [
					baplie && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "navy",
						children: [
							countBoxes(baplie, bucket.spec.id),
							" boxes · ",
							countReefers(baplie, bucket.spec.id),
							" RF ·",
							" ",
							drawn.filter(slotIsDg).length,
							" DG"
						]
					}),
					!baplie && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "navy",
						children: [bucket.lines.length, " DG lines"]
					}),
					bucket.spec.imdgOnDeck ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "On-deck IMDG OK" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "navy",
						children: "No IMDG on cover"
					}),
					bucket.spec.imdgHold && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Hold 2 IMDG" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3 text-xs text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "slot-cargo-reefer size-3 rounded-sm" }), " Reefer"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "slot-cargo-dg size-3 rounded-sm" }), " DG"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "slot-cargo-reefer-dg size-3 rounded-sm" }), " Reefer + DG"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "slot-cargo-dry size-3 rounded-sm ring-1 ring-border" }), " Other cargo"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BayGrid, {
				title: `On deck · bays ${bucket.spec.bays.join("-")} · 20'/40'/20'${bucket.spec.id === 1 ? " · 11 across with 00" : bucket.spec.id === 10 ? " · bay 38 no middle" : " · 12 across"}`,
				tiers: deckTiers,
				rows: deckRowList,
				bays: bucket.spec.bays,
				cells,
				onSlot
			}),
			holdRowList.length > 0 && holdTiers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BayGrid, {
				title: `Below deck · ${bucket.spec.hold || "hold"} · ${bucket.spec.holdAccess} access · 7 across with 00 · 20'/40'/20'`,
				tiers: holdTiers,
				rows: holdRowList,
				bays: bucket.spec.bays,
				cells,
				onSlot
			}),
			ghosts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "Not a real cell on this cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted",
					children: [
						"Hatch ",
						bucket.spec.id,
						" does not have these rows. They stay off the grid."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: ghosts.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onSlot(s.key),
						className: "rounded-md border border-review/40 bg-review-soft px-3 py-2 font-mono text-xs",
						children: [s.container, s.stow ? ` · ${s.stow.bay}-${String(s.stow.row).padStart(2, "0")}-${s.stow.tier}` : ""]
					}, s.key))
				})
			] }),
			slots.some((s) => !s.stow) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-medium",
				children: "On this hatch, position not parsed"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: slots.filter((s) => !s.stow).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onSlot(s.key),
					className: "rounded-md border bg-surface px-3 py-2 font-mono text-xs",
					children: s.container
				}, s.key))
			})] }),
			issues.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "What is wrong on this hatch"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: "Told here — the grid is cargo only (blue reefer, red DG)."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueList, { issues })
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1 text-sm text-muted",
				children: bucket.spec.notes.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["— ", w] }, w))
			})
		]
	});
}
function slotLabel(s) {
	const cls = s.lines.map((l) => l.line.hazClass).filter(Boolean)[0] || s.box?.dg.map((d) => d.cls).filter(Boolean)[0] || "";
	if (s.reefer && slotIsDg(s)) return `${s.operating ? "RF" : "NOR"}/${cls || "DG"}`;
	if (slotIsDg(s)) return cls || "DG";
	if (s.reefer) {
		const face = s.box?.motors === "fwd" ? "fwd" : "aft";
		return `${s.operating ? "RF" : "NOR"} ${face}`;
	}
	if (s.stow?.fortyFoot) return s.box?.iso || "40'";
	return s.box?.iso || "20'";
}
function SlotButton({ s, wide, home, onSlot }) {
	const span = !home && !!s.stow?.fortyFoot;
	const cargo = slotCargoClass(s);
	const light = cargo !== "slot-cargo-dry";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => onSlot(s.key),
		title: span ? `${s.container} 40' occupies this 20' end` : s.container,
		className: cn("flex min-h-14 w-full flex-col items-center justify-center rounded-sm px-0.5 font-mono text-[9px] leading-tight", wide ? "min-w-[2.4rem]" : "min-w-[1.6rem]", cargo, s.conflict || s.mismatch ? "ring-1 ring-review" : "", span ? "opacity-90" : ""),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "max-w-full truncate",
			children: s.container.replace(/[A-Z]{4}/, (p) => p.slice(0, 4))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: light ? "text-primary-foreground/85" : "text-muted",
			children: [
				span ? "40'" : slotLabel(s),
				!span && s.stow?.fortyFoot ? " 40'" : "",
				s.conflict ? " !" : ""
			]
		})]
	});
}
function BayGrid({ title, tiers, rows, bays, cells, onSlot }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-x-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-2 text-xs font-medium tracking-wide text-subtle uppercase",
			children: [title, " · PORT even ← · 00 CL · STBD odd →"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[720px] border-collapse text-center text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				className: "p-1 text-muted",
				children: "Tier"
			}), rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
				className: "p-1 font-mono text-muted",
				children: [String(r).padStart(2, "0"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-0.5 grid grid-cols-[1fr_1.3fr_1fr] font-normal text-[9px] text-subtle",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: bays[0] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: bays[1] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: bays[2] })
					]
				})]
			}, r))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [...tiers].reverse().map((tier) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "p-1 font-mono text-muted",
				children: tier
			}), rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "p-0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-[1fr_1.3fr_1fr] gap-px",
					children: bays.map((bay, i) => {
						const stack = cells(tier, row, bay);
						const wide = i === 1;
						if (!stack.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("min-h-14 rounded-sm bg-surface-2/80", wide && "min-w-[2.4rem]") }, bay);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-px",
							children: stack.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotButton, {
								s,
								wide,
								home: s.stow?.bay === bay,
								onSlot
							}, s.key))
						}, bay);
					})
				})
			}, row))] }, tier)) })]
		})]
	});
}
function CargoLine({ d, onChem, lq }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: "rounded-lg border bg-surface p-4 shadow-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-medium",
				children: [
					"UN ",
					d.line.un,
					" · ",
					d.line.name || "Proper shipping name not parsed",
					lq ? " · Ltd Qty" : ""
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					"Class ",
					d.line.hazClass || "—",
					d.line.input.packingGroup ? ` PG ${d.line.input.packingGroup}` : "",
					" ·",
					" ",
					d.line.packaging || "package",
					" · ",
					formatKg(d.line.quantityKg)
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onChem({
					un: d.line.un,
					cls: d.line.hazClass,
					name: d.line.name
				}),
				className: "inline-flex h-10 items-center gap-2 rounded-md bg-navy px-3 text-sm text-primary-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4" }), " Spill / fire"]
			})]
		})
	});
}
function ContainerPopout({ slot, hatch, issues, chem, onClose, onChem, onBackFromChem }) {
	const full = slot.lines.filter((d) => !isLimitedQty(d.line));
	const lq = slot.lines.filter((d) => isLimitedQty(d.line));
	const sheet = chem ? sheetFor(chem.un, chem.cls, chem.name) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center sm:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Close",
			className: "absolute inset-0 bg-ink/40",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			className: "relative z-10 flex max-h-[88dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-lg border bg-surface shadow-border sm:rounded-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3 border-b px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0",
					children: sheet ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-subtle uppercase",
						children: [
							sheet.guide,
							" · Class ",
							sheet.cls,
							sheet.un ? ` · UN ${sheet.un}` : ""
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 truncate text-lg font-medium",
						children: sheet.name
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-xs text-subtle uppercase",
						children: [
							"Hatch ",
							hatch.spec.id,
							" · Container"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 truncate font-mono text-lg",
						children: slot.container
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "inline-flex size-10 shrink-0 items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-ink",
					"aria-label": "Close popout",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-y-auto px-4 py-4",
				children: sheet ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onBackFromChem,
							className: "inline-flex items-center gap-2 text-sm text-accent",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }),
								" ",
								slot.container
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: sheet.looksLike
						}),
						sheetSections(sheet).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetBlock, {
							title: s.title,
							items: s.items
						}, s.title))
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContainerBody, {
					slot,
					issues,
					full,
					lq,
					onChem
				})
			})]
		})]
	});
}
function ContainerBody({ slot, issues, full, lq, onChem }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			slot.stow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: formatStow(slot.stow)
			}),
			slot.mismatch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-review",
				children: "DCM and BAPLIE do not agree on this cell — pick one."
			}),
			slot.conflict && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-cdc",
				children: "Two boxes hash to this bay-row-tier."
			}),
			slot.reefer && slot.box ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-ink",
				children: [
					"Reefer ",
					slot.box.iso || "",
					" ",
					slot.operating ? `live ${slot.box.tempC ?? "set"}°C` : "NOR (not operating)",
					". ",
					motorsNote(slot.box)
				]
			}) : null,
			slot.box && !slot.reefer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					slot.box.iso || "Dry",
					" · ",
					slot.box.weightKg ? `${Math.round(slot.box.weightKg)} kg` : "weight —",
					slot.box.pol ? ` · POL ${slot.box.pol}` : "",
					slot.box.pod ? ` · POD ${slot.box.pod}` : ""
				]
			}),
			issues.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueList, { issues }) : null,
			full.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-sm font-medium",
					children: ["Dangerous goods · ", full.length]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: "Press the chemical for the spill / fire sheet."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-3",
					children: full.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CargoLine, {
						d,
						onChem,
						lq: false
					}, d.line.input.rowIndex))
				})
			] }),
			lq.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "text-sm font-medium",
				children: ["Limited quantity · ", lq.length]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-3",
				children: lq.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CargoLine, {
					d,
					onChem,
					lq: true
				}, d.line.input.rowIndex))
			})] }),
			!slot.lines.length && slot.box?.dg.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: slot.box.dg.map((dg, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border bg-surface p-4 shadow-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-medium",
							children: [
								"UN ",
								dg.un || "—",
								" · ",
								dg.name || "From BAPLIE DGS"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								"Class ",
								dg.cls || "—",
								" ",
								dg.packingGroup ? `PG ${dg.packingGroup}` : "",
								" · not on the DCM"
							]
						}),
						dg.un ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => onChem({
								un: dg.un,
								cls: dg.cls,
								name: dg.name
							}),
							className: "mt-2 inline-flex h-10 items-center gap-2 rounded-md bg-navy px-3 text-sm text-primary-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4" }), " Spill / fire"]
						}) : null
					]
				}, `${dg.un}-${i}`))
			}) : null,
			!slot.lines.length && !slot.box?.dg.length && slot.box && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Other cargo from the BAPLIE. No dangerous goods on the DCM for this box."
			})
		]
	});
}
function ChemicalView({ sheet, onBack }) {
	const sections = sheetSections(sheet);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "inline-flex items-center gap-2 text-sm text-accent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs tracking-wide text-subtle uppercase",
					children: [
						sheet.guide,
						" · Class ",
						sheet.cls,
						sheet.un ? ` · UN ${sheet.un}` : ""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-xl font-medium",
					children: sheet.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: sheet.looksLike
				})
			] }),
			sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetBlock, {
				title: s.title,
				items: s.items
			}, s.title)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-subtle",
				children: "Public ERG actions for a container ship — fire, spill, explosion, vapor, wetting, hold entry, lost overboard, pollution. Confirm against the SDS, EmS, and the Master’s orders before you commit people."
			})
		]
	});
}
function SheetBlock({ title, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-lg border bg-surface p-4 shadow-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-sm font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-2 space-y-1.5 text-sm text-muted",
			children: items.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["— ", t] }, t))
		})]
	});
}
var FAMILY_LABEL = {
	fire: "Fire",
	explosion: "Explosion",
	toxic: "Toxic / asphyxiation",
	spill: "Spill / leak",
	wetting: "Water / wetting",
	heat: "Heat / reefer",
	stow: "Wrong place",
	overboard: "Lost overboard",
	entry: "Hold entry",
	pollution: "Pollution",
	report: "CDC / eNOAD",
	electrical: "Electrical"
};
var FAMILY_ORDER = [
	"stow",
	"fire",
	"explosion",
	"toxic",
	"spill",
	"wetting",
	"heat",
	"electrical",
	"overboard",
	"entry",
	"pollution",
	"report"
];
var LITHIUM = /^(3090|3091|3480|3481|3536|3171)$/;
var AN = /^(1942|2067|2426|3375|0222)$/;
var WET_BATT = /^(2794|2795|2800)$/;
var POLLUTANT = /^(3077|3082)$/;
var AEROSOL = /^1950$/;
function padUn(un) {
	const d = (un || "").replace(/\D/g, "");
	return d ? d.padStart(4, "0") : "";
}
function clsOf(c) {
	return (c || "").trim();
}
function starts(c, p) {
	return clsOf(c).startsWith(p);
}
function uniq(xs) {
	return [...new Set(xs.filter(Boolean))];
}
function hatchesOf(rows, pred = () => true) {
	return [...new Set(rows.filter(pred).map((r) => r.hatch).filter((h) => h != null))].sort((a, b) => a - b);
}
function unsOf(rows) {
	return uniq(rows.map((r) => r.un));
}
function boxesOf(rows) {
	return uniq(rows.map((r) => r.container));
}
function list(rows, n = 4) {
	const names = uniq(rows.map((r) => r.un ? `UN ${r.un}` : r.cls || "DG"));
	if (names.length <= n) return names.join(", ");
	return `${names.slice(0, n).join(", ")} +${names.length - n}`;
}
function hatchList(hs) {
	if (!hs.length) return "stow not on the papers";
	return hs.map((h) => `Hatch ${h}`).join(", ");
}
function inventory(lines, plan) {
	const out = [];
	const onDcm = /* @__PURE__ */ new Set();
	for (const line of lines) {
		const stow = resolvedStow(line, plan);
		const ck = containerKey(line.input.container);
		if (ck) onDcm.add(ck);
		out.push({
			un: padUn(line.un),
			cls: clsOf(line.hazClass),
			name: line.name,
			container: line.input.container || "",
			hatch: stow?.hatch ?? null,
			onDeck: stow ? stow.onDeck : null,
			cdc: line.verdict === "CDC",
			residue: line.verdict === "CDC_RESIDUE",
			review: line.verdict === "REVIEW",
			lq: isLimitedQty(line),
			pih: line.pih,
			packForm: line.packForm,
			kg: line.quantityKg
		});
	}
	if (plan) for (const box of plan.boxes) {
		const ck = containerKey(box.container);
		if (ck && onDcm.has(ck)) continue;
		for (const dg of box.dg) out.push({
			un: padUn(dg.un),
			cls: clsOf(dg.cls),
			name: dg.name,
			container: box.container,
			hatch: box.stow?.hatch ?? null,
			onDeck: box.stow ? box.stow.onDeck : null,
			cdc: false,
			residue: false,
			review: false,
			lq: false,
			pih: false,
			packForm: "unknown",
			kg: null
		});
	}
	return out;
}
function fromIssue(issue, family) {
	const now = issue.severity === "block" || issue.severity === "seg";
	return {
		id: `issue-${issue.id}`,
		family,
		severity: now ? "now" : "watch",
		title: issue.title,
		why: issue.detail,
		do: [issue.rule],
		uns: issue.uns,
		hatches: issue.hatch ? [issue.hatch] : [],
		containers: issue.containers
	};
}
function familyOfIssue(issue) {
	const blob = `${issue.rule} ${issue.title} ${issue.detail}`.toLowerCase();
	if (blob.includes("heat") || blob.includes("reefer")) return "heat";
	if (blob.includes("fan") || blob.includes("access")) return "entry";
	if (blob.includes("overlap") || blob.includes("same cell")) return "stow";
	if (blob.includes("un ") && blob.includes(" vs ")) return "stow";
	if (blob.includes("class") && blob.includes(" vs ")) return "stow";
	return "stow";
}
function voyageRisks(lines, plan) {
	const cargo = inventory(lines, plan);
	const screen = screenVoyage(lines, plan);
	const heat = reeferHeatIssues(lines, plan);
	const out = [];
	const seen = /* @__PURE__ */ new Set();
	const push = (r) => {
		if (seen.has(r.id)) return;
		seen.add(r.id);
		out.push(r);
	};
	for (const issue of screen.issues) {
		if (issue.severity === "seg") continue;
		if (!issue.hatch) continue;
		push(fromIssue(issue, familyOfIssue(issue)));
	}
	const segs = screen.issues.filter((i) => i.severity === "seg");
	if (segs.length) push({
		id: "seg-summary",
		family: "stow",
		severity: "now",
		title: segs.length === 1 ? segs[0].title : `${segs.length} segregation hits — boxes that should not sit this close`,
		why: segs.slice(0, 6).map((s) => s.title).join(" · "),
		do: ["Open Ship and move one of the pair, or confirm they are LQ / same-UN subsidiary (not a real 176.83 hit).", "Code 2 on the next hatch is the whole cover — that is noisy and intended."],
		uns: uniq(segs.flatMap((s) => s.uns)),
		hatches: [...new Set(segs.map((s) => s.hatch).filter(Boolean))],
		containers: uniq(segs.flatMap((s) => s.containers))
	});
	for (const issue of heat) push(fromIssue(issue, "heat"));
	const dg = cargo.filter((r) => r.un || r.cls);
	if (!dg.length && !out.length) return [];
	const full = dg.filter((r) => !r.lq);
	const lithium = full.filter((r) => LITHIUM.test(r.un));
	const an = full.filter((r) => AN.test(r.un) || starts(r.cls, "5.1") && /nitrate/i.test(r.name));
	const cls3 = full.filter((r) => starts(r.cls, "3"));
	const gas21 = full.filter((r) => starts(r.cls, "2.1") || AEROSOL.test(r.un));
	const gas23 = full.filter((r) => starts(r.cls, "2.3") || r.pih);
	const gas22 = full.filter((r) => starts(r.cls, "2.2"));
	const expl = full.filter((r) => starts(r.cls, "1"));
	const ox = full.filter((r) => starts(r.cls, "5.1"));
	const op = full.filter((r) => starts(r.cls, "5.2"));
	const flSol = full.filter((r) => starts(r.cls, "4.1"));
	const selfHeat = full.filter((r) => starts(r.cls, "4.2"));
	const waterRx = full.filter((r) => starts(r.cls, "4.3"));
	const toxic61 = full.filter((r) => starts(r.cls, "6.1"));
	const infect = full.filter((r) => starts(r.cls, "6.2"));
	const rad = full.filter((r) => starts(r.cls, "7"));
	const corr = full.filter((r) => starts(r.cls, "8"));
	const batt = full.filter((r) => WET_BATT.test(r.un));
	const aero = dg.filter((r) => AEROSOL.test(r.un));
	const poll = dg.filter((r) => POLLUTANT.test(r.un) || /environmentally hazardous/i.test(r.name));
	const under = full.filter((r) => r.onDeck === false);
	const deck = full.filter((r) => r.onDeck === true);
	const hatch1 = full.filter((r) => r.hatch === 1);
	const hatch10 = full.filter((r) => r.hatch === 10);
	const cdc = cargo.filter((r) => r.cdc || r.residue);
	const review = cargo.filter((r) => r.review);
	const liveRf = plan?.boxes.filter((b) => b.reefer && b.operating) ?? [];
	if (lithium.length) {
		const hold = lithium.filter((r) => r.onDeck === false);
		push({
			id: "lithium-runaway",
			family: "fire",
			severity: "watch",
			title: "Lithium thermal runaway — long water attack, can reignite for hours",
			why: `${list(lithium)} on ${hatchList(hatchesOf(lithium))}${hold.length ? ". Under deck: a hold lithium fire is a long, ugly fight." : ". On deck is the less-bad place."}`,
			do: [
				"Copious water from cover. Cool the pack and the neighbors. Do not lid it and walk away.",
				"SCBA — the smoke is toxic. Boundary-cool for hours. Expect reignition.",
				"If it is in a hold you cannot flood, get people out of that space and keep a charged hose on the bay."
			],
			uns: unsOf(lithium),
			hatches: hatchesOf(lithium),
			containers: boxesOf(lithium)
		});
	}
	if (cls3.length) {
		const hold3 = cls3.filter((r) => r.onDeck === false);
		push({
			id: "class3-fire",
			family: "fire",
			severity: "watch",
			title: hold3.length ? "Flammable liquid fire — and vapor can explode in a hold" : "Flammable liquid fire — vapor + air, cans burst, runoff carries fire",
			why: `${list(cls3)} on ${hatchList(hatchesOf(cls3))}. Paint and solvents are the usual ones on this trade.`,
			do: [
				"Foam or dry chemical on a pool. Water spray to cool boxes. No straight stream into a tote.",
				"Ignition control on that hatch. Absorb a spill; keep it out of scuppers if you can boom it.",
				...hold3.length ? ["Under deck: ventilate, gas-free before entry, no hot work. A hold of gasoline vapor will flash."] : []
			],
			uns: unsOf(cls3),
			hatches: hatchesOf(cls3),
			containers: boxesOf(cls3)
		});
	}
	if (gas21.length) push({
		id: "flammable-gas",
		family: "explosion",
		severity: "watch",
		title: "Flammable gas leak — flash-back, BLEVE if a tank is in fire",
		why: `${list(gas21)} on ${hatchList(hatchesOf(gas21))}. Vapor is heavier than air and will find a hold, a bilge, or the house intakes.`,
		do: [
			"Do not extinguish a leaking gas fire unless the leak can be stopped. Cool the tank with water.",
			"If the tank discolors or vents rise, pull the team back — that is the BLEVE problem.",
			"Isolate ignition. Ventilate low spaces. Residue last contained in a tank is still a leak/fire problem."
		],
		uns: unsOf(gas21),
		hatches: hatchesOf(gas21),
		containers: boxesOf(gas21)
	});
	if (aero.length) push({
		id: "aerosol-rockets",
		family: "explosion",
		severity: "watch",
		title: "Aerosol cans rocket and burst in a fire",
		why: `${list(aero)} — even Ltd Qty cartons still cook off. Do not stand in front of the carton.`,
		do: ["Water spray from cover. Treat leaking cans as a flammable-mist leak: isolate, no sparks, ventilate."],
		uns: unsOf(aero),
		hatches: hatchesOf(aero),
		containers: boxesOf(aero)
	});
	if (expl.length) push({
		id: "explosives",
		family: "explosion",
		severity: "now",
		title: "Explosives on board — if they are in a fire, withdraw",
		why: `${list(expl)} on ${hatchList(hatchesOf(expl))}. Class 1.1/1.2 is CDC at any quantity. On GEORGE II, 1.1–1.6 is on-deck only (1.4S may go in Hold 2).`,
		do: [
			"If the cargo is not burning: fight from cover, flood adjacent boxes.",
			"If explosives are involved in fire: withdraw. Do not fight. Cool nearby cargo from a distance.",
			"Keep ignition and heat (live reefers) off that stack."
		],
		uns: unsOf(expl),
		hatches: hatchesOf(expl),
		containers: boxesOf(expl)
	});
	if (an.length) push({
		id: "an-decompose",
		family: "explosion",
		severity: "watch",
		title: "Ammonium nitrate — contamination or a hold fire is the Texas City problem",
		why: `${list(an)} on ${hatchList(hatchesOf(an))}. Bags of AN are a CDC conversation if a 176.415 permit is required.`,
		do: [
			"Flood with water. Keep oil, sawdust, and combustibles off it.",
			"Brown/orange NOx is toxic and can kill hours later — SCBA, medical even if they feel fine.",
			"If it is in a hold fire you cannot flood, get the people off."
		],
		uns: unsOf(an),
		hatches: hatchesOf(an),
		containers: boxesOf(an)
	});
	else if (ox.length) push({
		id: "oxidizer-fire",
		family: "fire",
		severity: "watch",
		title: "Oxidizer will feed a fire — do not treat it like ordinary cargo",
		why: `${list(ox)} on ${hatchList(hatchesOf(ox))}.`,
		do: ["Flood with water. Dry chemical or foam alone is the wrong tool.", "Keep oil and combustibles off a spill. Decomposition smoke (NOx) needs SCBA."],
		uns: unsOf(ox),
		hatches: hatchesOf(ox),
		containers: boxesOf(ox)
	});
	if (op.length) push({
		id: "organic-peroxide",
		family: "explosion",
		severity: "watch",
		title: "Organic peroxide — heat can run it away",
		why: `${list(op)} on ${hatchList(hatchesOf(op))}. Keep off live reefers and the engine casing.`,
		do: ["Cool. Do not stir a decomposing package. Withdraw if it is venting or discoloring.", "On-deck preferred. SDS / EmS for that UN — some want water, some do not."],
		uns: unsOf(op),
		hatches: hatchesOf(op),
		containers: boxesOf(op)
	});
	if (flSol.length) push({
		id: "flammable-solid",
		family: "fire",
		severity: "watch",
		title: "Flammable solid — easy to ignite, some burn fiercely",
		why: `${list(flSol)} on ${hatchList(hatchesOf(flSol))}. On GEORGE II class 4.1 is on-deck only.`,
		do: ["Water, foam, or dry chemical per the SDS. Sweep a spill — do not make a dust cloud."],
		uns: unsOf(flSol),
		hatches: hatchesOf(flSol),
		containers: boxesOf(flSol)
	});
	if (selfHeat.length) push({
		id: "self-heating",
		family: "fire",
		severity: "watch",
		title: "Self-heating cargo — it can take off without an outside flame",
		why: `${list(selfHeat)} on ${hatchList(hatchesOf(selfHeat))}.`,
		do: ["Watch that stack for heat and smoke. Water may be the wrong tool — check the SDS.", "Keep off live reefers. Ventilate. Do not bury it in a hold if the papers want on-deck."],
		uns: unsOf(selfHeat),
		hatches: hatchesOf(selfHeat),
		containers: boxesOf(selfHeat)
	});
	if (waterRx.length) push({
		id: "water-reactive",
		family: "wetting",
		severity: "watch",
		title: "Water-reactive — fire main, rain in a holed box, or a leaking hold makes flammable gas",
		why: `${list(waterRx)} on ${hatchList(hatchesOf(waterRx))}.`,
		do: ["Keep it dry. Do not put a straight stream on a spill unless the SDS says so.", "A flooded hold with 4.3 in it is a hydrogen / fire problem. Know which hatch before the weather turns."],
		uns: unsOf(waterRx),
		hatches: hatchesOf(waterRx),
		containers: boxesOf(waterRx)
	});
	if (gas23.length) push({
		id: "pih-gas",
		family: "toxic",
		severity: "now",
		title: "Poison gas / PIH — a leak can kill on deck in still air, and will kill in a hold",
		why: `${list(gas23)} on ${hatchList(hatchesOf(gas23))}. Smell is not a warning. CDC if that UN’s vessel total is over 1 MT.`,
		do: ["Upwind. Isolate. SCBA only — no filter mask. Do not enter holds.", "Keep off the house intakes. Notify USCG if in port. Cool from upwind if it is in a fire; do not walk the plume."],
		uns: unsOf(gas23),
		hatches: hatchesOf(gas23),
		containers: boxesOf(gas23)
	});
	if (toxic61.length && !gas23.some((r) => toxic61.includes(r))) {
		const pihLiq = toxic61.filter((r) => r.pih || r.packForm === "bulk_packaging");
		push({
			id: "toxic-61",
			family: "toxic",
			severity: pihLiq.length ? "now" : "watch",
			title: pihLiq.length ? "PIH / toxic liquid — bulk or a big packaged lot is CDC; a leak is still poison" : "Toxic (6.1) — do not touch a leak, do not put it in the bilge",
			why: `${list(toxic61)} on ${hatchList(hatchesOf(toxic61))}. Packaged 6.1 is on-deck only on GEORGE II.`,
			do: ["Isolate. SCBA. Do not mouth-to-mouth. Medical help.", "Runoff is still toxic — keep it off the scuppers and out of the hold bilge."],
			uns: unsOf(toxic61),
			hatches: hatchesOf(toxic61),
			containers: boxesOf(toxic61)
		});
	}
	if (gas22.length) push({
		id: "asphyxiant",
		family: "toxic",
		severity: "watch",
		title: "Non-flammable gas — asphyxiation in a hold or the house",
		why: `${list(gas22)} on ${hatchList(hatchesOf(gas22))}. Some also support combustion.`,
		do: ["Do not enter a hold without atmosphere readings and SCBA. Ventilate. Treat empty uncleaned as full."],
		uns: unsOf(gas22),
		hatches: hatchesOf(gas22),
		containers: boxesOf(gas22)
	});
	if (infect.length) push({
		id: "infectious",
		family: "toxic",
		severity: "now",
		title: "Infectious substance — do not touch, do not put people in that hold",
		why: `${list(infect)} on ${hatchList(hatchesOf(infect))}.`,
		do: ["Isolate the box. Notify the agent and medical. PPE per the SDS — this is not a mop-and-bucket spill."],
		uns: unsOf(infect),
		hatches: hatchesOf(infect),
		containers: boxesOf(infect)
	});
	if (rad.length) push({
		id: "radioactive",
		family: "toxic",
		severity: "watch",
		title: "Radioactive cargo — isolate, limit time, notify",
		why: `${list(rad)} on ${hatchList(hatchesOf(rad))}. Excepted packages (UN 2910/2911/2908/2909) are not CDC; HRCQ / fissile controlled is.`,
		do: ["Do not fight a fire that has involved the package unless you must. Keep time short and distance long.", "Notify the Master and, in port, the Coast Guard. Do not eat, drink, or smoke on that hatch."],
		uns: unsOf(rad),
		hatches: hatchesOf(rad),
		containers: boxesOf(rad)
	});
	if (corr.length) push({
		id: "corrosive",
		family: "spill",
		severity: "watch",
		title: "Corrosive leak — burns people and eats steel; some fume toward the house",
		why: `${list(corr)} on ${hatchList(hatchesOf(corr))}.`,
		do: [
			"Face shield, chemical gloves. Water on skin 15–20 min — do not neutralize on the body.",
			"Acid: soda ash if you have it, otherwise lots of water on deck. Keep runoff off aluminum and out of the bilge.",
			"Fuming acids on Hatch 1 will head for the house intakes — know the wind."
		],
		uns: unsOf(corr),
		hatches: hatchesOf(corr),
		containers: boxesOf(corr)
	});
	if (batt.length) push({
		id: "wet-batteries",
		family: "electrical",
		severity: "watch",
		title: "Wet-cell batteries — acid, hydrogen, and a short that starts a fire",
		why: `${list(batt)} on ${hatchList(hatchesOf(batt))}. Common pallet cargo on this trade.`,
		do: ["CO2 or dry chemical on an electrical fire. Do not put a straight stream into a cracked case.", "Keep off lithium boxes and class 5.1. Isolate leaking acid from alkalis and cyanides."],
		uns: unsOf(batt),
		hatches: hatchesOf(batt),
		containers: boxesOf(batt)
	});
	if (under.length) push({
		id: "hold-entry",
		family: "entry",
		severity: "watch",
		title: "DG under deck — confined space, vapor, and a hold fire you may not be able to flood",
		why: `${list(under)} under deck on ${hatchList(hatchesOf(under))}. Hold 2 (Hatches 3 & 4) is the only under-deck IMDG space on GEORGE II.`,
		do: ["No entry without atmosphere readings, a permit, and SCBA. Hold 2 is mechanically ventilated — still gas-free.", "After smoke, treat the hold as IDLH until it is proven otherwise."],
		uns: unsOf(under),
		hatches: hatchesOf(under),
		containers: boxesOf(under)
	});
	if (deck.length) push({
		id: "lost-overboard",
		family: "overboard",
		severity: "prep",
		title: "On-deck DG can go over the side — lashing, heavy weather, a holed box",
		why: `${list(deck, 5)} on deck at ${hatchList(hatchesOf(deck))}. A lost box is still your cargo until someone else has it.`,
		do: ["Check lashings on DG stacks before weather. Do not sail a damaged DG box on an outboard 05/06 if you can restow.", "Notify: lost DG is a pollution and a notification problem, not just a cargo claim."],
		uns: unsOf(deck),
		hatches: hatchesOf(deck),
		containers: boxesOf(deck)
	});
	if (poll.length || cls3.length || corr.length) {
		const rows = poll.length ? poll : [...cls3, ...corr];
		push({
			id: "pollution",
			family: "pollution",
			severity: "prep",
			title: "A leak to the scuppers is a MARPOL problem, not just a deck wash",
			why: poll.length ? `${list(poll)} is marked environmentally hazardous.` : `Flammable liquid and corrosive on this voyage will ride the scuppers into the harbor.`,
			do: ["Plug scuppers if you can boom it. Do not pump a DG spill over the side.", "SOPEP / DG locker gear first. In port, call it in — do not wait for a sheen report from the dock."],
			uns: unsOf(rows),
			hatches: hatchesOf(rows),
			containers: boxesOf(rows)
		});
	}
	if (hatch1.length) push({
		id: "house-intakes",
		family: "toxic",
		severity: "watch",
		title: "Cargo on Hatch 1 sits against the house — vapor goes in the intakes",
		why: `${list(hatch1)} on Hatch 1. House and conning are forward on GEORGE II.`,
		do: ["Know the wind before you open a leaking box on Hatch 1. Shut intakes if a plume is heading for the house.", "No smoking, no hot work on that cover."],
		uns: unsOf(hatch1),
		hatches: [1],
		containers: boxesOf(hatch1)
	});
	if (hatch10.length) push({
		id: "hatch10-casing",
		family: "fire",
		severity: "watch",
		title: "Hatch 10 is the engine casing — a fire there is a machinery-space problem",
		why: `${list(hatch10)} on Hatch 10. Inboard rows 03/04 sit against the casing. The LNG vent mast is plant, not a cargo tank.`,
		do: ["Keep DG off the inboard casing cells. Cool the casing if that stack is on fire.", "On-deck IMDG is not allowed on Hatch 10 — if a box is there, it is already a CSM hit (see Ship)."],
		uns: unsOf(hatch10),
		hatches: [10],
		containers: boxesOf(hatch10)
	});
	if (liveRf.length) push({
		id: "reefer-fire",
		family: "electrical",
		severity: "watch",
		title: `${liveRf.length} live reefer${liveRf.length === 1 ? "" : "s"} — compressor fire, and heat into the next cell`,
		why: "Only operating reefers count as a heat source. NOR does not. Motors face aft except bay 6 or 22 below.",
		do: ["Pull power if you can do it without putting a hand in the smoke. Water to cool the box and neighbors.", "A live reefer next to class 2.1 / 3 / 4 / 5 / lithium is a segregation problem — it will also show on Ship."],
		uns: [],
		hatches: [...new Set(liveRf.map((b) => b.stow?.hatch).filter((h) => h != null))],
		containers: liveRf.map((b) => b.container)
	});
	if (cdc.length) push({
		id: "cdc-report",
		family: "report",
		severity: "now",
		title: "This voyage is Certain Dangerous Cargo — eNOAD and COTP care",
		why: `${list(cdc)} meets 33 CFR 160.202. Totals are per UN. Paste the boxed block into the NVMC cargo section.`,
		do: ["Copy the eNOAD packet from Manifest. Do not mix UN 1005 with UN 1017.", "In port, a CDC voyage is extra eyes on the dock. Wrong stow on a CDC box is not just an IMDG miss."],
		uns: unsOf(cdc),
		hatches: hatchesOf(cdc),
		containers: boxesOf(cdc)
	});
	else if (review.length) push({
		id: "cdc-review",
		family: "report",
		severity: "watch",
		title: "CDC is not a yes — but some lines still need a Master decision",
		why: `${list(review)} came back REVIEW. Do not paste them into eNOAD as CDC unless you confirm 160.202.`,
		do: ["Open Manifest, read the Need: line, and decide. If you are not sure, report it."],
		uns: unsOf(review),
		hatches: hatchesOf(review),
		containers: boxesOf(review)
	});
	else if (dg.length) push({
		id: "cdc-no",
		family: "report",
		severity: "prep",
		title: "This voyage is not CDC — still paste CDC CARRIED: NO",
		why: "Containerized general cargo plus a clean negative is what NVMC wants. A wrong YES is as bad as a missed YES.",
		do: ["Copy the boxed block from Manifest. The packet is a function of the DCM, not the BAPLIE."],
		uns: [],
		hatches: [],
		containers: []
	});
	if (dg.length) {
		push({
			id: "misdeclared",
			family: "stow",
			severity: "prep",
			title: "Misdeclared cargo is how boxship DG fires start",
			why: "The DCM and the BAPLIE can disagree on UN and class. A box that says furniture and burns like class 3 is still class 3.",
			do: ["If DCM UN / class does not match BAPLIE DGS on the same container, pick one — that watch is on Ship.", "A smell, a stain, or a hot box with a clean paper is a misdeclare until proven otherwise. Isolate."],
			uns: [],
			hatches: [],
			containers: []
		});
		push({
			id: "hot-work",
			family: "fire",
			severity: "prep",
			title: "Hot work, smoking, and grinding next to DG",
			why: "A legal stow still burns if someone welds on that cover or flicks a cigarette into a class 3 stack.",
			do: ["No hot work on a hatch with full DG without a permit and a charged hose. No smoking on deck period.", "Chipping / grinding on Hatch 1 throws sparks at the house and at whatever is on that cover."],
			uns: [],
			hatches: [],
			containers: []
		});
		push({
			id: "after-smoke",
			family: "entry",
			severity: "prep",
			title: "After smoke or a leak: nobody in that hold, nobody without SCBA",
			why: "The usual second casualty is the entry, not the box. CO, NOx, HF, HCl, and oxygen depletion all live in the same hatch.",
			do: ["Atmosphere readings. Permit. SCBA. The mechanical fan on Hold 2 does not make it a coffee shop.", "Medical: delayed NOx and smoke inhalation — send them even if they feel fine."],
			uns: [],
			hatches: [],
			containers: []
		});
	}
	const rank = {
		now: 0,
		watch: 1,
		prep: 2
	};
	const fam = Object.fromEntries(FAMILY_ORDER.map((f, i) => [f, i]));
	out.sort((a, b) => rank[a.severity] - rank[b.severity] || fam[a.family] - fam[b.family]);
	return out;
}
function risksByFamily(risks) {
	const grouped = /* @__PURE__ */ new Map();
	for (const r of risks) {
		const list = grouped.get(r.family) ?? [];
		list.push(r);
		grouped.set(r.family, list);
	}
	return FAMILY_ORDER.filter((f) => grouped.has(f)).map((f) => ({
		family: f,
		label: FAMILY_LABEL[f],
		items: grouped.get(f) ?? []
	}));
}
var FAMILY_ICON = {
	fire: Flame,
	explosion: TriangleAlert,
	toxic: Wind,
	spill: Droplets,
	wetting: Waves,
	heat: ThermometerSun,
	stow: MapPin,
	overboard: Ship,
	entry: DoorOpen,
	pollution: Waves,
	report: FileWarning,
	electrical: Zap
};
var FILTERS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "now",
		label: "Already wrong"
	},
	...FAMILY_ORDER.map((f) => ({
		id: f,
		label: FAMILY_LABEL[f]
	}))
];
function VoyageRisksView({ result, baplie, onOpen }) {
	const [filter, setFilter] = (0, import_react.useState)("all");
	const lines = result?.lines ?? [];
	const risks = (0, import_react.useMemo)(() => voyageRisks(lines, baplie), [lines, baplie]);
	const groups = risksByFamily(risks.filter((r) => {
		if (filter === "all") return true;
		if (filter === "now") return r.severity === "now";
		return r.family === filter;
	}));
	const now = risks.filter((r) => r.severity === "now").length;
	const watch = risks.filter((r) => r.severity === "watch").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-medium",
					children: "What can go wrong on this voyage"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-3xl text-sm text-muted",
					children: "Not just spill and fire. This list is built from the DCM and the BAPLIE: fire, explosion, toxic vapor, wetting, heat, hold entry, lost boxes, pollution, and the CDC report. Press a UN for the full sheet."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: now ? "cdc" : "ok",
							children: now ? `${now} already wrong` : "Nothing already wrong"
						}),
						watch ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "review",
							children: [watch, " live on this cargo"]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "navy",
							children: [risks.length, " watches"]
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-max gap-1 rounded-lg bg-surface-2 p-1",
					children: FILTERS.filter((f) => f.id === "all" || f.id === "now" || risks.some((r) => r.family === f.id)).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFilter(f.id),
						className: cn("h-10 whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors duration-150", filter === f.id ? "bg-surface text-ink shadow-border" : "text-muted hover:text-ink"),
						children: f.label
					}, f.id))
				})
			}),
			groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg border bg-surface p-5 text-sm text-muted shadow-border",
				children: risks.length ? "Nothing in this filter." : "No dangerous goods on the papers we have. Drop a DCM or a BAPLIE with DGS."
			}) : groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium tracking-wide text-muted uppercase",
					children: g.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-3 lg:grid-cols-2",
					children: g.items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskCard, {
						risk: r,
						onOpen
					}, r.id))
				})]
			}, g.family)),
			lines.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "By UN"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Every UN on the DCM. How it looks, how it burns, and the rest."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnIndex, {
					lines,
					onOpen
				})]
			})
		]
	});
}
function RiskCard({ risk, onOpen }) {
	const Icon = FAMILY_ICON[risk.family];
	const un = risk.uns[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: cn("rounded-lg border bg-surface p-4 shadow-border", risk.severity === "now" && "border-cdc/40", risk.severity === "watch" && "border-review/30"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md", risk.severity === "now" ? "bg-cdc-soft text-cdc" : risk.severity === "watch" ? "bg-review-soft text-review" : "bg-residue-soft text-residue"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-4",
					strokeWidth: 1.75
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: risk.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityMark, { severity: risk.severity })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: risk.why
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1 text-sm text-ink",
						children: risk.do.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["— ", d] }, d))
					}),
					(risk.uns.length > 0 || risk.hatches.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-mono text-xs text-subtle",
						children: [
							risk.uns.length ? `UN ${risk.uns.join(", ")}` : "",
							risk.uns.length && risk.hatches.length ? " · " : "",
							risk.hatches.length ? risk.hatches.map((h) => `H${h}`).join(" ") : ""
						]
					}),
					un ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							const sheet = sheetFor(un, "", "");
							onOpen({
								un,
								cls: sheet.cls,
								name: sheet.name
							});
						},
						className: "mt-3 inline-flex h-10 items-center gap-2 rounded-md bg-navy px-3 text-sm text-primary-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-4" }),
							" UN ",
							un,
							" sheet"
						]
					}) : null
				]
			})]
		})
	});
}
function UnIndex({ lines, onOpen }) {
	const uns = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		for (const l of lines) {
			const cur = m.get(l.un) ?? {
				un: l.un,
				cls: l.hazClass,
				name: l.name,
				n: 0
			};
			cur.n += 1;
			if (!cur.name) cur.name = l.name;
			m.set(l.un, cur);
		}
		return [...m.values()].sort((a, b) => b.n - a.n);
	}, [lines]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-2 sm:grid-cols-2",
		children: uns.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onOpen(u),
			className: "rounded-lg border bg-surface p-4 text-left shadow-border hover:border-accent",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-medium",
				children: [
					"UN ",
					u.un,
					" · ",
					u.name || "Shipping name"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted",
				children: [
					"Class ",
					u.cls || "—",
					" · ",
					u.n,
					" line",
					u.n === 1 ? "" : "s"
				]
			})]
		}, u.un))
	});
}
function SeverityMark({ severity }) {
	if (severity === "now") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "cdc",
		children: "Now"
	});
	if (severity === "watch") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "review",
		children: "This cargo"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "navy",
		children: "Routine"
	});
}
function looksLikeBaplie(text) {
	if (/UNH\+[^+]*\+BAPLIE/i.test(text) || /\bBAPLIE:D:/i.test(text)) return true;
	return /UNA:\+/.test(text) && /EQD\+CN/i.test(text) && /LOC\+147/.test(text);
}
function isBaplieFilename(name) {
	return /\.(edi|baplie|bec)$/i.test(name) || /baplie/i.test(name);
}
function splitReleased(src, sep, release) {
	const out = [];
	let cur = "";
	for (let i = 0; i < src.length; i++) {
		if (src[i] === release && i + 1 < src.length) {
			cur += src[i + 1];
			i++;
			continue;
		}
		if (src[i] === sep) {
			out.push(cur);
			cur = "";
			continue;
		}
		cur += src[i];
	}
	out.push(cur);
	return out;
}
function parseUna(text) {
	if (text.startsWith("UNA") && text.length >= 9) return {
		rest: text.slice(9),
		comp: text[3],
		data: text[4],
		rel: text[6],
		term: text[8]
	};
	return {
		rest: text,
		comp: ":",
		data: "+",
		rel: "?",
		term: "'"
	};
}
/**
* ISO 6346 reefer equipment:
* - 3rd character R (22R1, 45R1, L5R1)
* - 1984 numeric type 30–34 (2230, 4531, 4532)
* - bare RF / R
*/
function isoReefer(iso) {
	if (!iso) return false;
	const s = iso.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
	if (s.length < 1) return false;
	if (s === "R" || s === "RF" || s.startsWith("REEFER")) return true;
	if (s.length >= 3 && s[2] === "R") return true;
	if (s.length >= 4 && /^\d{4}/.test(s) && s[2] === "3" && s[3] >= "0" && s[3] <= "4") return true;
	return false;
}
function looksLikeIso(token) {
	const s = token.trim().toUpperCase();
	if (!/^[A-Z0-9]{3,4}$/.test(s)) return false;
	if (/^(6346|102|139|5)$/.test(s)) return false;
	return true;
}
function toC(value, unit) {
	const n = Number(value);
	if (!Number.isFinite(n)) return null;
	if (/FAH|FH/i.test(unit)) return (n - 32) * 5 / 9;
	return n;
}
function locCode(el, comp, rel) {
	return splitReleased(el, comp, rel)[0]?.trim() || "";
}
function parseStowField(el, comp, rel, iso) {
	const parts = splitReleased(el, comp, rel).map((p) => p.trim()).filter(Boolean);
	const head = parts[0] || "";
	const direct = parseStow(head.replace(/\s/g, ""), iso);
	if (direct) return {
		raw: head,
		stow: direct
	};
	if (parts.length >= 3 && /^\d+$/.test(parts[0]) && /^\d+$/.test(parts[1]) && /^\d+$/.test(parts[2])) {
		const raw = `${parts[0]}-${parts[1]}-${parts[2]}`;
		return {
			raw,
			stow: parseStow(raw, iso)
		};
	}
	return {
		raw: head,
		stow: parseStow(head, iso)
	};
}
function vesselFromTdt(els, comp, rel) {
	for (let i = els.length - 1; i >= 4; i--) {
		const named = [...splitReleased(els[i] || "", comp, rel)].reverse().find((p) => /[A-Za-z]{2,}/.test(p) && !/^(UN|IMO|LLOYD|LINES|SMDG)$/i.test(p.trim()));
		if (named) return named.trim();
	}
	return "";
}
function parseDgs(els, comp, rel) {
	const classParts = splitReleased(els[2] || "", comp, rel).map((p) => p.trim()).filter(Boolean);
	const cls = classParts[0] || "";
	let subsidiary = "";
	if (classParts[1] && /^\d(?:\.\d)?$/.test(classParts[1])) subsidiary = classParts[1];
	const un = (splitReleased(els[3] || "", comp, rel)[0] || "").replace(/^UN/i, "").replace(/\D/g, "").padStart(4, "0").slice(-4);
	const field4 = (els[4] || "").trim();
	const field5 = (els[5] || "").trim();
	const looksPg = (s) => /^(I{1,3}|[123])$/.test(s);
	const looksFlash = (s) => /CEL|FAH|CELSIUS|FAHR/i.test(s) || /:\d/.test(s) || /^\d+([.,]\d+)?$/.test(s);
	let packingGroup = "";
	let flashpoint = "";
	if (looksPg(field4) && !field4.includes(":")) packingGroup = field4;
	else if (looksFlash(field4) || !field4 && field5) {
		flashpoint = field4;
		packingGroup = looksPg(splitReleased(field5, comp, rel)[0] || "") ? splitReleased(field5, comp, rel)[0] : field5;
	} else if (looksPg(splitReleased(field5, comp, rel)[0] || "")) {
		packingGroup = splitReleased(field5, comp, rel)[0];
		flashpoint = field4;
	}
	return {
		un: un === "0000" ? "" : un,
		cls,
		subsidiary: subsidiary || void 0,
		name: "",
		packingGroup: packingGroup || void 0,
		flashpoint: flashpoint || void 0
	};
}
function emptyBox() {
	return {
		container: "",
		stow: null,
		reefer: false,
		operating: false,
		tempC: null,
		motors: "aft",
		dg: []
	};
}
function applyStow(box, raw, stow) {
	box.stowRaw = raw;
	box.stow = stow;
}
function parseBaplie(text, filename = "baplie.edi") {
	const una = parseUna(text.replace(/^\uFEFF/, "").trim());
	let body = una.rest.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
	if (!body.includes(una.term)) body = body.replace(/\n/g, una.term);
	const segments = splitReleased(body, una.term, una.rel).map((s) => s.replace(/\n/g, "").trim()).filter((s) => s.length > 1);
	const plan = {
		sourceName: filename,
		boxes: [],
		warnings: []
	};
	let cur = null;
	let pending = null;
	let pendingForNextEqd = false;
	let pendingTmp;
	let pendingHan = null;
	let hanMotors = null;
	const applyHan = (box, code) => {
		box.han = code;
		if (/^RF/.test(code) || /REEFER/.test(code)) box.reefer = true;
		if (/^RFF/.test(code) || /FWD|FORWARD/.test(code)) hanMotors = "fwd";
		if (/^RFA/.test(code) || /^RFB/.test(code) || /\bAFT\b/.test(code)) hanMotors = "aft";
	};
	const flush = () => {
		if (!cur?.container) return;
		if (isoReefer(cur.iso)) cur.reefer = true;
		if (cur.tempC != null) cur.reefer = true;
		if (cur.full === false) cur.operating = false;
		else if (cur.tempC != null) cur.operating = true;
		if (hanMotors) cur.motors = hanMotors;
		else if (cur.stow) cur.motors = reeferMotors(cur.stow);
		if (cur.stow && cur.iso) {
			const sized = parseStow(cur.stow.raw, cur.iso);
			if (sized) cur.stow = sized;
		}
		plan.boxes.push(cur);
		cur = null;
		hanMotors = null;
	};
	for (const seg of segments) {
		const els = splitReleased(seg, una.data, una.rel);
		const tag = (els[0] || "").trim().toUpperCase();
		if (tag === "TDT") {
			const voyage = els[2]?.trim();
			if (voyage) plan.voyage = voyage;
			const vessel = vesselFromTdt(els, una.comp, una.rel);
			if (vessel) plan.vessel = vessel;
		} else if (tag === "LOC") {
			const q = els[1]?.trim();
			const code = locCode(els[2] || "", una.comp, una.rel);
			if (q === "5" && code) plan.pol = code;
			else if ((q === "61" || q === "8") && code && !plan.pod) plan.pod = code;
			else if (q === "147") {
				pending = parseStowField(els[2] || "", una.comp, una.rel, cur?.iso);
				if (cur && !cur.stow) {
					applyStow(cur, pending.raw, pending.stow);
					pendingForNextEqd = false;
				} else pendingForNextEqd = true;
			} else if (q === "9" && cur && code) cur.pol = code;
			else if (q === "11" && cur && code) cur.pod = code;
			else if (q === "12" && cur && code) {
				cur.transship = code;
				if (!cur.pod) cur.pod = code;
			} else if (q === "83" && cur && code) {
				cur.finalPod = code;
				if (!cur.pod) cur.pod = code;
			}
		} else if (tag === "EQD") {
			flush();
			cur = emptyBox();
			const idParts = splitReleased(els[2] || "", una.comp, una.rel).map((p) => p.trim());
			cur.container = (idParts[0] || "").replace(/\s+/g, "").toUpperCase();
			const iso = locCode(els[3] || "", una.comp, una.rel);
			if (iso) cur.iso = iso.toUpperCase();
			else if (idParts[1] && looksLikeIso(idParts[1])) cur.iso = idParts[1].toUpperCase();
			const full = (els[6] || "").trim() || (els[5] || "").trim();
			if (full === "5") cur.full = true;
			if (full === "4") cur.full = false;
			if (pendingForNextEqd && pending) applyStow(cur, pending.raw, parseStow(pending.raw, cur.iso));
			if (pendingTmp !== void 0) {
				cur.tempC = pendingTmp;
				cur.reefer = true;
				cur.operating = cur.full !== false;
				pendingTmp = void 0;
			}
			if (pendingHan) {
				applyHan(cur, pendingHan);
				pendingHan = null;
			}
		} else if (tag === "MEA" && cur) {
			const joined = els.join(una.data);
			const m = joined.match(/KGM[:\+]?(\d+(?:\.\d+)?)/i) || joined.match(/LBR[:\+]?(\d+(?:\.\d+)?)/i);
			if (m) {
				const n = Number(m[1]);
				cur.weightKg = /LBR/i.test(m[0]) ? n * .453592 : n;
			}
		} else if (tag === "TMP") {
			const valParts = splitReleased(els[2] || "", una.comp, una.rel);
			const tempC = toC(valParts[0] || "", valParts[1] || "");
			if (cur) {
				cur.tempC = tempC;
				cur.reefer = true;
				cur.operating = cur.full !== false;
			} else pendingTmp = tempC;
		} else if (tag === "HAN") {
			const code = locCode(els[1] || "", una.comp, una.rel).toUpperCase();
			if (cur) applyHan(cur, code);
			else pendingHan = code;
		} else if (tag === "DGS" && cur) cur.dg.push(parseDgs(els, una.comp, una.rel));
		else if (tag === "FTX" && cur) {
			const q = els[1]?.trim();
			const name = [els[4], els[3]].map((x) => splitReleased(x || "", una.comp, una.rel).filter(Boolean).join(" ")).find((s) => s.trim());
			if (name && (q === "AAA" || q === "AAD" || q === "AAC") && cur.dg.length) cur.dg[cur.dg.length - 1].name = name.trim();
		} else if (tag === "RFF" && cur) {
			const parts = splitReleased(els[1] || "", una.comp, una.rel);
			if (parts[0] === "BN" && parts[1]) cur.booking = parts[1].trim();
		}
	}
	flush();
	if (plan.boxes.length === 0) plan.warnings.push("No containers in this BAPLIE.");
	const noStow = plan.boxes.filter((b) => !b.stow).length;
	if (noStow) plan.warnings.push(`${noStow} boxes have no LOC+147 stowage.`);
	return plan;
}
var KEY = "cdc-enoad-baplie-v1";
function saveBaplie(plan) {
	if (typeof window === "undefined") return;
	try {
		if (!plan) {
			window.localStorage.removeItem(KEY);
			return;
		}
		window.localStorage.setItem(KEY, JSON.stringify(plan));
	} catch {}
}
function loadBaplie() {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed?.boxes?.length) return null;
		return parsed;
	} catch {
		return null;
	}
}
/** 1 metric tonne = 1 000 kg. */
var KG_PER_MT = 1e3;
/** 1 long ton = 2 240 lb = 1 016.0469088 kg. */
var KG_PER_LT = 2240 * .45359237;
var PORT_NAMES = {
	USHNL: "Honolulu",
	USHN: "Honolulu",
	USOGG: "Kahului",
	USHLI: "Hilo",
	USNAW: "Nawiliwili",
	USLGB: "Long Beach",
	USLG: "Long Beach",
	USLAX: "Los Angeles",
	USOAK: "Oakland",
	USSEA: "Seattle",
	USTIW: "Tacoma",
	USSAN: "San Diego",
	USPDX: "Portland",
	USNYC: "New York",
	USORF: "Norfolk",
	USCHS: "Charleston",
	USHOU: "Houston",
	USMIA: "Miami",
	USJAX: "Jacksonville",
	GUGUM: "Guam",
	MPSPN: "Saipan",
	ASPPG: "Pago Pago",
	SGSIN: "Singapore",
	SGS: "Singapore",
	HKHKG: "Hong Kong",
	TWKHH: "Kaohsiung",
	CNNGB: "Ningbo",
	CNSHA: "Shanghai",
	CNSZX: "Shenzhen",
	KRPUS: "Busan",
	JPTYO: "Tokyo",
	JPYOK: "Yokohama",
	JPOSA: "Osaka",
	JPNGY: "Nagoya",
	PHMNL: "Manila",
	VNSGN: "Ho Chi Minh",
	VNHPH: "Haiphong",
	THLCH: "Laem Chabang",
	MYPKG: "Port Klang",
	IDJKT: "Jakarta",
	AUSYD: "Sydney",
	AUMEL: "Melbourne",
	NZAKL: "Auckland",
	MXZLO: "Manzanillo",
	PACFZ: "Colon",
	CAVAN: "Vancouver"
};
function locode(raw) {
	return (raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
}
function portName(code) {
	const c = locode(code);
	if (!c || c === "UNSTATED") return "Not stated";
	return PORT_NAMES[c] || PORT_NAMES[c.slice(0, 4)] || PORT_NAMES[c.slice(0, 3)] || c;
}
function kgToMt(kg) {
	return kg / KG_PER_MT;
}
function kgToLt(kg) {
	return kg / KG_PER_LT;
}
function formatTons(n) {
	return n.toLocaleString("en-US", {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	});
}
/** ISO 6346 first char: 2 = 20', 4 = 40' (incl. 45G1 high cube), L = 45'. */
function boxSize(box) {
	const c = (box.iso || "").trim().toUpperCase()[0];
	if (c === "2") return "20";
	if (c === "L") return "45";
	if (c === "4") return "40";
	if (c === "M" || c === "P") return "other";
	if (box.stow?.fortyFoot === false) return "20";
	if (box.stow?.fortyFoot === true) return "40";
	return "other";
}
/** Second ISO char 5 = 9'6" high cube (45G1, L5G1, 25G1). */
function isHighCube(box) {
	const s = (box.iso || "").trim().toUpperCase();
	return s.length >= 2 && s[1] === "5";
}
function teuOf(size) {
	return size === "20" ? 1 : 2;
}
function blank(code, name) {
	return {
		code,
		name,
		units: 0,
		teu: 0,
		kg: 0,
		twenty: 0,
		forty: 0,
		fortyFive: 0,
		other: 0,
		hc: 0,
		full: 0,
		empty: 0,
		rf: 0,
		live: 0,
		dry: 0,
		dg: 0,
		missingWeight: 0
	};
}
function addBox(t, box) {
	t.units += 1;
	const size = boxSize(box);
	t.teu += teuOf(size);
	if (size === "20") t.twenty += 1;
	else if (size === "40") t.forty += 1;
	else if (size === "45") t.fortyFive += 1;
	else t.other += 1;
	if (isHighCube(box)) t.hc += 1;
	if (box.full === false) t.empty += 1;
	else t.full += 1;
	if (box.reefer) {
		t.rf += 1;
		if (box.operating) t.live += 1;
	} else t.dry += 1;
	if (box.dg.length) t.dg += 1;
	if (box.weightKg != null && Number.isFinite(box.weightKg)) t.kg += box.weightKg;
	else t.missingWeight += 1;
}
function dischargeOf(box, plan) {
	return locode(box.pod || box.finalPod || box.transship || plan.pod) || "UNSTATED";
}
function classKey(cls) {
	return cls.replace(/[^0-9.]/g, "") || cls.trim() || "?";
}
function summarizePlan(plan) {
	const totals = blank("TOTAL", "On board");
	const deck = blank("DECK", "On deck");
	const hold = blank("HOLD", "Below");
	const unplaced = blank("UNPLACED", "Unplaced");
	const byPort = /* @__PURE__ */ new Map();
	const byHatch = /* @__PURE__ */ new Map();
	const byClass = /* @__PURE__ */ new Map();
	for (const box of plan.boxes) {
		const code = dischargeOf(box, plan);
		let port = byPort.get(code);
		if (!port) {
			port = blank(code, portName(code));
			byPort.set(code, port);
		}
		addBox(port, box);
		addBox(totals, box);
		if (!box.stow) addBox(unplaced, box);
		else if (box.stow.onDeck) addBox(deck, box);
		else addBox(hold, box);
		if (box.stow?.hatch) {
			let h = byHatch.get(box.stow.hatch);
			if (!h) {
				h = {
					hatch: box.stow.hatch,
					units: 0,
					dg: 0,
					rf: 0
				};
				byHatch.set(box.stow.hatch, h);
			}
			h.units += 1;
			if (box.dg.length) h.dg += 1;
			if (box.reefer) h.rf += 1;
		}
		if (box.dg.length) for (const d of box.dg) {
			const cls = classKey(d.cls);
			let g = byClass.get(cls);
			if (!g) {
				g = {
					boxes: /* @__PURE__ */ new Set(),
					uns: /* @__PURE__ */ new Set()
				};
				byClass.set(cls, g);
			}
			g.boxes.add(box.container || "?");
			if (d.un) g.uns.add(d.un);
		}
	}
	const ports = [...byPort.values()].sort((a, b) => {
		if (a.code === "UNSTATED") return 1;
		if (b.code === "UNSTATED") return -1;
		if (b.units !== a.units) return b.units - a.units;
		return a.code.localeCompare(b.code);
	});
	const dgClasses = [...byClass.entries()].map(([cls, g]) => ({
		cls,
		boxes: g.boxes.size,
		uns: [...g.uns].sort()
	})).sort((a, b) => parseFloat(a.cls) - parseFloat(b.cls) || a.cls.localeCompare(b.cls));
	const hatches = [...byHatch.values()].sort((a, b) => a.hatch - b.hatch);
	return {
		vessel: plan.vessel,
		voyage: plan.voyage,
		sourceName: plan.sourceName,
		pol: plan.pol,
		pod: plan.pod,
		ports,
		totals,
		deck,
		hold,
		unplaced,
		dgClasses,
		hatches
	};
}
function tallyLine(t) {
	const mt = t.missingWeight === t.units && t.units > 0 ? "—" : formatTons(kgToMt(t.kg));
	const lt = t.missingWeight === t.units && t.units > 0 ? "—" : formatTons(kgToLt(t.kg));
	return [
		t.name,
		t.units,
		t.teu,
		mt,
		lt,
		t.twenty,
		t.forty,
		t.fortyFive,
		t.full,
		t.empty,
		t.rf,
		t.live,
		t.dry,
		t.dg
	].join("	");
}
function summaryText(s) {
	const head = [
		"Discharge",
		"Units",
		"TEU",
		"MT",
		"LT",
		"20'",
		"40'",
		"45'",
		"Full",
		"Empty",
		"RF",
		"Live",
		"Dry",
		"DG"
	].join("	");
	const title = [
		s.vessel,
		s.voyage,
		s.sourceName
	].filter(Boolean).join(" · ");
	const rows = s.ports.map(tallyLine);
	rows.push(tallyLine(s.totals));
	const place = `On deck ${s.deck.units} · Below ${s.hold.units} · Unplaced ${s.unplaced.units}`;
	const dg = s.dgClasses.length === 0 ? "No DGS in this BAPLIE." : `DG: ${s.dgClasses.map((d) => `class ${d.cls} × ${d.boxes}`).join(" · ")}`;
	return [
		`${title}`,
		head,
		...rows,
		place,
		dg,
		"Gross container weight (MEA). 1 LT = 2,240 lb. Not DG net."
	].join("\n");
}
function tonsCell(t, kind) {
	if (t.units > 0 && t.missingWeight === t.units) return "—";
	return formatTons(kind === "mt" ? kgToMt(t.kg) : kgToLt(t.kg));
}
function TallyRow({ t, code, total }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: cn("border-b border-border last:border-0", total && "bg-surface-2 font-medium"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
				className: cn("sticky left-0 z-10 px-3 py-2 sm:px-4", total ? "bg-surface-2" : "bg-surface"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t.name }), code && code !== "UNSTATED" && code !== "TOTAL" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] text-muted",
					children: code
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-2 py-2 text-right font-mono tabular-nums",
				children: t.units
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-2 py-2 text-right font-mono tabular-nums",
				children: t.teu
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-2 py-2 text-right font-mono tabular-nums",
				children: tonsCell(t, "mt")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-2 py-2 text-right font-mono tabular-nums",
				children: tonsCell(t, "lt")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-2 py-2 text-right font-mono tabular-nums",
				children: t.twenty
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-2 py-2 text-right font-mono tabular-nums",
				children: t.forty
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-2 py-2 text-right font-mono tabular-nums",
				children: t.fortyFive
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-2 py-2 text-right font-mono tabular-nums",
				children: t.full
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-2 py-2 text-right font-mono tabular-nums",
				children: t.empty
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-2 py-2 text-right font-mono tabular-nums",
				children: t.rf
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-2 py-2 text-right font-mono tabular-nums",
				children: t.live
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-2 py-2 text-right font-mono tabular-nums",
				children: t.dry
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: cn("px-3 py-2 text-right font-mono tabular-nums sm:px-4", t.dg > 0 && "text-cdc"),
				children: t.dg
			})
		]
	});
}
function BaplieSummary({ plan }) {
	const summary = (0, import_react.useMemo)(() => summarizePlan(plan), [plan]);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const t = summary.totals;
	const showOther = t.other > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "baplie-onboard",
		className: "overflow-hidden rounded-lg border border-border bg-surface-2/40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-2 border-b border-border px-3 py-2.5 sm:px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-[0.16em] text-muted uppercase",
						children: "On board"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-sm font-medium",
						children: [
							t.units.toLocaleString("en-US"),
							" boxes · ",
							t.teu.toLocaleString("en-US"),
							" TEU · ",
							tonsCell(t, "mt"),
							" ",
							"MT / ",
							tonsCell(t, "lt"),
							" LT"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-muted",
						children: [summary.pol ? `Loaded ${portName(summary.pol)} (${locode(summary.pol)})` : null, summary.pod ? `voyage POD ${portName(summary.pod)}` : "By discharge port."].filter(Boolean).join(" · ")
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: async () => {
						try {
							await navigator.clipboard.writeText(summaryText(summary));
							setCopied(true);
							window.setTimeout(() => setCopied(false), 1600);
						} catch {}
					},
					children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCopy, {}), copied ? "Copied" : "Copy"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[860px] text-left text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border text-[11px] tracking-wide text-muted uppercase",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "sticky left-0 z-10 bg-surface-2 px-3 py-2 font-medium sm:px-4",
								children: "Discharge"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "Units"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "TEU"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "MT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "LT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "20'"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "40'"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "45'"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "Full"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "Empty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "RF"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "Live"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 text-right font-medium",
								children: "Dry"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 text-right font-medium sm:px-4",
								children: "DG"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [summary.ports.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TallyRow, {
						t: p,
						code: p.code
					}, p.code)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TallyRow, {
						t,
						total: true
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 border-t border-border px-3 py-2.5 sm:px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "navy",
								children: ["On deck ", summary.deck.units]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "muted",
								children: ["Below ", summary.hold.units]
							}),
							summary.unplaced.units ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "review",
								children: ["Unplaced ", summary.unplaced.units]
							}) : null,
							t.hc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "muted",
								children: ["HC 9'6\" ", t.hc]
							}) : null,
							showOther ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "review",
								children: ["Other size ", t.other]
							}) : null,
							t.missingWeight ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "review",
								children: ["No MEA ", t.missingWeight]
							}) : null
						]
					}),
					summary.hatches.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[11px] leading-relaxed text-muted",
						children: [
							"Hatches",
							" ",
							summary.hatches.map((h) => `H${h.hatch} ${h.units}${h.dg ? `/${h.dg} DG` : ""}`).join(" · ")
						]
					}) : null,
					summary.dgClasses.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-cdc",
							children: [
								t.dg,
								" DG ",
								t.dg === 1 ? "box" : "boxes"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								" ",
								"·",
								" ",
								summary.dgClasses.map((d) => `class ${d.cls} × ${d.boxes}${d.uns.length ? ` (UN ${d.uns.join(", ")})` : ""}`).join(" · ")
							]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "No DGS in this BAPLIE — DG column stays 0 until the plan carries it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-subtle",
						children: "Weight is container gross from MEA (tare + cargo), in metric tonnes and long tons (1 LT = 2,240 lb). Not DG net. 20' = 1 TEU; 40' and 45' = 2 TEU. ISO 45G1 is a 40' high cube; a true 45' is ISO L. Live = reefer with a set temperature."
					})
				]
			})
		]
	});
}
function Screener() {
	const [tab, setTab] = (0, import_react.useState)("manifest");
	const [parsed, setParsed] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	const [baplie, setBaplie] = (0, import_react.useState)(null);
	const [chem, setChem] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const stored = loadCargo();
		if (stored) {
			const restored = {
				header: [],
				lines: stored.lines,
				warnings: [],
				delimiter: "xlsx",
				voyage: stored.voyage,
				unitGuess: "lb",
				sourceName: stored.sourceName
			};
			setParsed(restored);
			setResult(evaluateManifest(stored.lines, CONTAINER_OPTIONS));
		}
		const plan = loadBaplie();
		if (plan && isDemoSource(plan.sourceName)) saveBaplie(null);
		else setBaplie(plan);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
			tab,
			onTab: setTab,
			hasVoyage: Boolean(result || baplie)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8",
			children: [
				tab === "manifest" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManifestPanel, {
					parsed,
					result,
					baplie,
					setParsed,
					setResult,
					setBaplie
				}),
				tab === "ship" && (result || baplie) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShipBoard, {
					parsed,
					result,
					baplie
				}),
				tab === "ship" && !result && !baplie && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedVoyage, { onGo: () => setTab("manifest") }),
				tab === "response" && (result || baplie) && !chem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoyageRisksView, {
					result,
					baplie,
					onOpen: setChem
				}),
				tab === "response" && chem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChemicalView, {
					sheet: sheetFor(chem.un, chem.cls, chem.name),
					onBack: () => setChem(null)
				}),
				tab === "response" && !result && !baplie && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedVoyage, { onGo: () => setTab("manifest") }),
				tab === "lookup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookupPanel, {}),
				tab === "rules" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RulesPanel, {})
			]
		})]
	});
}
function Header({ tab, onTab, hasVoyage }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "bg-navy text-primary-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1400px] flex-col gap-5 px-4 py-5 sm:px-6 sm:py-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 hidden size-10 items-center justify-center rounded-md bg-navy-2 sm:flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
							className: "size-5",
							strokeWidth: 1.75
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] tracking-[0.18em] text-primary-foreground/60 uppercase",
							children: "Container ship · DCM + BAPLIE · 33 CFR 160.202"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 text-xl font-medium tracking-tight sm:text-2xl",
							children: "Cargo and DCM Viewer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-2xl text-sm text-primary-foreground/70",
							children: "Drop the Excel DCM, the Word FINAL DCM, and the printed manifest. Stow and CDC come from that voyage. BAPLIE is optional. Open What can go wrong for fire, explosion, toxic vapor, wetting, hold entry, lost boxes, and the rest."
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "navy",
					className: "border border-primary-foreground/15 bg-navy-2",
					children: "Container ships only"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-wrap gap-1 overflow-x-auto rounded-lg bg-navy-2 p-1",
				"aria-label": "Primary",
				children: [
					["manifest", "Manifest"],
					["ship", "Ship"],
					["response", "What can go wrong"],
					["lookup", "UN lookup"],
					["rules", "33 CFR 160.202"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onTab(id),
					className: cn("h-10 shrink-0 whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors duration-150 sm:px-5", tab === id ? "bg-surface text-ink" : "text-primary-foreground/70 hover:text-primary-foreground"),
					children: id === "ship" && hasVoyage ? `${label} ·` : label
				}, id))
			})]
		})
	});
}
function NeedVoyage({ onGo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border bg-surface p-6 shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Load a voyage first"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Drop the Excel DCM (and the Word or PDF if you have them) on Manifest. Stow positions live on the Excel sheet. A BAPLIE is optional — the hatch plan still works from the DCM."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				onClick: onGo,
				children: "Open Manifest"
			})
		]
	});
}
function ManifestPanel({ parsed, result, baplie, setParsed, setResult, setBaplie }) {
	const [error, setError] = (0, import_react.useState)(null);
	const [filter, setFilter] = (0, import_react.useState)("flagged");
	const [query, setQuery] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [progress, setProgress] = (0, import_react.useState)(null);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const [showPaste, setShowPaste] = (0, import_react.useState)(false);
	const [pasteText, setPasteText] = (0, import_react.useState)("");
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [log, setLog] = (0, import_react.useState)([]);
	const [restored, setRestored] = (0, import_react.useState)(null);
	const [compare, setCompare] = (0, import_react.useState)(null);
	const fileRef = (0, import_react.useRef)(null);
	const baplieRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setMounted(true);
		setLog(loadVoyageLog().filter((e) => !isDemoSource(e.sourceName)));
	}, []);
	function applyParsed(next) {
		if (next.lines.length === 0) {
			setParsed(next);
			setResult(null);
			setError(next.warnings[0] || "No UN numbers found.");
			return;
		}
		const evaluated = evaluateManifest(next.lines, CONTAINER_OPTIONS);
		setError(null);
		setParsed(next);
		setResult(evaluated);
		setFilter("flagged");
		setQuery("");
		setRestored(null);
		setCompare(null);
		saveCargo({
			at: Date.now(),
			voyage: next.voyage,
			sourceName: next.sourceName,
			lines: next.lines
		});
		const mail = masterEmail(evaluated, next.voyage, next.sourceName);
		setLog(pushVoyageLog({
			at: Date.now(),
			...voyageBits(next.voyage),
			sourceName: next.sourceName,
			total: evaluated.total,
			cdc: evaluated.cdc + evaluated.residue,
			review: evaluated.review,
			flag: evaluated.enoad.length === 0 ? "NO" : "YES",
			subject: mail.subject,
			body: mail.body,
			paste: mail.paste
		}));
	}
	async function applyBaplieFile(file) {
		const text = await file.text();
		if (!looksLikeBaplie(text) && !isBaplieFilename(file.name)) throw new Error("That file does not look like a BAPLIE (UNH+BAPLIE).");
		const plan = parseBaplie(text, file.name);
		setBaplie(plan);
		saveBaplie(plan);
	}
	async function onFiles(files) {
		const list = [...files];
		const baplieFiles = [];
		const dcmFiles = [];
		for (const f of list) {
			if (isBaplieFilename(f.name)) {
				baplieFiles.push(f);
				continue;
			}
			if (/\.txt$/i.test(f.name)) {
				if (looksLikeBaplie((await f.text()).slice(0, 65536))) {
					baplieFiles.push(f);
					continue;
				}
			}
			if (/\.(xlsx|xls|xlsm|pdf|csv|tsv|txt|doc|docx|edi|baplie|bec)$/i.test(f.name)) {
				if (/\.(edi|baplie|bec)$/i.test(f.name)) baplieFiles.push(f);
				else dcmFiles.push(f);
			}
		}
		setProgress(null);
		setError(null);
		setCompare(null);
		try {
			if (baplieFiles[0]) {
				setBusy("Reading BAPLIE…");
				await applyBaplieFile(baplieFiles[0]);
			}
			if (dcmFiles.length === 0) {
				if (baplieFiles[0]) return;
				return;
			}
			const parsedList = [];
			const take = Math.min(dcmFiles.length, 3);
			for (let i = 0; i < take; i++) {
				const file = dcmFiles[i];
				const isPdf = file.name.toLowerCase().endsWith(".pdf");
				const isDoc = /\.docx?$/i.test(file.name);
				setBusy(dcmFiles.length > 1 ? `Reading file ${i + 1} of ${take}…` : isPdf ? "Reading PDF…" : isDoc ? "Reading Word DCM…" : "Reading workbook…");
				const next = await ingestFile(file, (done, total) => {
					setBusy(dcmFiles.length > 1 ? `File ${i + 1}: page ${done} of ${total}` : total > 0 && done === 0 ? "Reading scanned DCM…" : `Reading PDF page ${done} of ${total}`);
					setProgress({
						done,
						total
					});
				});
				parsedList.push(next);
			}
			const usable = parsedList.filter((p) => p.lines.length > 0);
			const preferred = mergeStowFromAll(usable) ?? selectPreferred(usable);
			if (!preferred) {
				setParsed(parsedList[0] ?? null);
				setResult(null);
				setError(parsedList[0]?.warnings[0] || "No UN numbers found.");
				return;
			}
			applyParsed(preferred);
			if (usable.length === 2) setCompare(compareManifests(usable[0], usable[1]));
			else if (parsedList.length === 2 && parsedList.some((p) => p.lines.length === 0)) {
				const empty = parsedList.find((p) => p.lines.length === 0);
				if (empty?.warnings[0]) setError(empty.warnings[0]);
			}
		} catch (err) {
			setResult(null);
			setParsed(null);
			setError(err instanceof Error ? err.message : "Could not read that file.");
		} finally {
			setBusy(null);
			setProgress(null);
		}
	}
	const flaggedCount = result ? result.cdc + result.residue + result.review : 0;
	const lqCount = result ? result.lines.filter((l) => isLimitedQty(l)).length : 0;
	const fullCount = result ? result.total - lqCount : 0;
	const filtered = (0, import_react.useMemo)(() => {
		if (!result) return [];
		const needle = query.trim().toLowerCase().replace(/^un\s*/, "");
		return result.lines.filter((l) => {
			if (filter === "flagged" && l.verdict === "NOT_CDC") return false;
			if (filter === "CDC" && l.verdict !== "CDC" && l.verdict !== "CDC_RESIDUE") return false;
			if (filter === "REVIEW" && l.verdict !== "REVIEW") return false;
			if (filter === "NOT_CDC" && l.verdict !== "NOT_CDC") return false;
			if (filter === "full" && isLimitedQty(l)) return false;
			if (filter === "lq" && !isLimitedQty(l)) return false;
			if (!needle) return true;
			return [
				l.un,
				l.name,
				l.hazClass,
				l.packaging,
				l.input.container,
				l.input.booking,
				l.input.technicalName,
				isLimitedQty(l) ? "ltd qty limited" : "full dg"
			].filter(Boolean).join(" ").toLowerCase().includes(needle);
		}).sort((a, b) => {
			const lq = Number(isLimitedQty(a)) - Number(isLimitedQty(b));
			if (lq) return lq;
			const ca = (a.input.container || "").toUpperCase();
			const cb = (b.input.container || "").toUpperCase();
			if (ca !== cb) return ca.localeCompare(cb);
			return a.un.localeCompare(b.un);
		});
	}, [
		result,
		filter,
		query
	]);
	function onDrop(e) {
		e.preventDefault();
		setDragOver(false);
		if (e.dataTransfer.files?.length) onFiles(e.dataTransfer.files);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-medium",
							children: "Dangerous cargo manifest"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Drop up to three files for this voyage: Excel DCM, Word FINAL DCM, printed EXP023AR PDF. Excel carries Stow Loc for the hatch plan. A BAPLIE is optional and loads separately — you do not need it for CDC."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onDragOver: (e) => {
								e.preventDefault();
								setDragOver(true);
							},
							onDragLeave: () => setDragOver(false),
							onDrop,
							className: cn("relative flex min-h-36 flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-8 text-center transition-colors duration-150", dragOver ? "border-navy bg-surface-2" : "border-border bg-surface-2/60", busy && "opacity-70"),
							children: [
								mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileRef,
									type: "file",
									multiple: true,
									accept: ".xlsx,.xls,.xlsm,.pdf,.doc,.docx,.csv,.tsv,.txt,.edi,.baplie,.bec,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
									disabled: Boolean(busy),
									"aria-label": "Upload dangerous cargo manifest",
									className: "absolute inset-0 z-10 cursor-pointer opacity-0",
									onChange: (e) => {
										if (e.target.files?.length) onFiles(e.target.files);
										e.target.value = "";
									}
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pointer-events-none flex size-11 items-center justify-center rounded-md bg-navy text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pointer-events-none text-sm font-medium",
									children: "Drop Excel, Word FINAL DCM, and the printed PDF"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pointer-events-none text-xs text-muted",
									children: "Up to three files · Excel has hatch stowage · CDC from the preferred sheet"
								}),
								busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "pointer-events-none mt-2 w-full max-w-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-accent",
										children: busy
									}), progress ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-2 block h-1.5 overflow-hidden rounded-full bg-border",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block h-full bg-navy transition-[width] duration-150",
											style: { width: `${Math.round(progress.done / progress.total * 100)}%` }
										})
									}) : null]
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setShowPaste((v) => !v),
								children: "Paste instead"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								className: "ml-auto",
								onClick: () => {
									setParsed(null);
									setResult(null);
									setError(null);
									setPasteText("");
									setRestored(null);
									setQuery("");
									setCompare(null);
									clearCargo();
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, {}), "Clear DCM"]
							})]
						}),
						showPaste ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: pasteText,
								onChange: (e) => setPasteText(e.target.value),
								spellCheck: false,
								className: "h-36",
								placeholder: "UN/NA NO - Shipping Name - Hazardous Class - Packing Group	Weight Lbs	Packaging\nUN2810,TOXIC LIQUIDS, ORGANIC, N.O.S., 6.1,III	5.5	1 CN"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => {
									const next = parseManifest(pasteText, "lb");
									next.sourceName = "pasted-manifest";
									applyParsed(next);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}), "Screen pasted text"]
							})]
						}) : null,
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md bg-cdc-soft px-3 py-2 text-sm text-cdc",
							children: error
						}) : null
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "baplie-panel",
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-medium",
							children: "BAPLIE (optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Drop the bay plan when you have it. Reefers, dry cargo, and DG-next-to-reefer show on Ship. All reefers face aft except bay 6 or 22 below (motors forward). CDC and the hatch plan still run from the DCM alone."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex min-h-24 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-surface-2/60 px-4 py-6 text-center",
							children: [
								mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: baplieRef,
									type: "file",
									accept: ".edi,.baplie,.bec,.txt,text/plain",
									disabled: Boolean(busy),
									"aria-label": "Upload BAPLIE",
									className: "absolute inset-0 z-10 cursor-pointer opacity-0",
									onChange: (e) => {
										if (e.target.files?.length) onFiles(e.target.files);
										e.target.value = "";
									}
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pointer-events-none text-sm font-medium",
									children: "Drop BAPLIE · .edi / .txt"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pointer-events-none text-xs text-muted",
									children: "Compiles onto the DCM after both are loaded. Does not replace the manifest."
								})
							]
						}),
						baplie ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "navy",
									children: [
										baplie.boxes.length,
										" boxes · ",
										baplie.boxes.filter((b) => b.reefer).length,
										" RF"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted",
									children: [
										baplie.vessel,
										baplie.voyage,
										baplie.sourceName
									].filter(Boolean).join(" · ")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "sm",
									className: "ml-auto",
									onClick: () => {
										setBaplie(null);
										saveBaplie(null);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, {}), "Clear BAPLIE"]
								})
							]
						}) : null,
						baplie?.warnings.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-review",
							children: baplie.warnings.join(" ")
						}) : null,
						baplie ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaplieSummary, { plan: baplie }) : null
					]
				})
			}),
			result && parsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoyageBanner, {
					parsed,
					lqCount,
					fullCount
				}),
				compare ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareCard, { compare }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stats, { result }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCheck, { result }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailCard, {
					result,
					voyage: parsed.voyage,
					sourceName: parsed.sourceName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "min-w-0 rounded-xl bg-surface shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 border-b border-border px-4 py-3 sm:px-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-sm font-medium",
									children: "Line-by-line determination"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1",
									children: [
										["flagged", `Flagged ${flaggedCount}`],
										["all", `All ${result.total}`],
										["full", `Full DG ${fullCount}`],
										["lq", `Ltd Qty ${lqCount}`],
										["CDC", `CDC ${result.cdc + result.residue}`],
										["REVIEW", `Review ${result.review}`],
										["NOT_CDC", `Not CDC ${result.notCdc}`]
									].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setFilter(id),
										className: cn("h-9 rounded-full px-3 text-xs font-medium transition-colors duration-150", filter === id ? "bg-navy text-primary-foreground" : "bg-surface-2 text-muted hover:text-fg"),
										children: label
									}, id))
								})]
							}), filter === "all" || filter === "full" || filter === "lq" || query || flaggedCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: query,
									onChange: (e) => setQuery(e.target.value),
									placeholder: "Search UN, name, container, booking…",
									className: "h-10 pl-9",
									"aria-label": "Search cargo lines"
								})]
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsTable, {
							rows: filtered,
							filter,
							query,
							flaggedCount,
							total: result.total,
							onShowAll: () => setFilter("all")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "flex flex-col gap-4",
						children: [
							result.notes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rounded-xl bg-surface p-4 text-sm text-muted shadow-[var(--shadow-border)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium tracking-wide text-fg uppercase",
									children: "Vessel totals"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-2 space-y-1",
									children: result.notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: n }, n))
								})]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => downloadText("cdc-screening.csv", resultsCsv(result), "text/csv"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Download full results"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-1 text-xs leading-relaxed text-subtle",
								children: DISCLAIMER
							})
						]
					})]
				})
			] }) : restored ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RestoredEmail, {
				entry: restored,
				onDismiss: () => setRestored(null)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyHint, {
				log,
				onRestore: setRestored
			})
		]
	});
}
function VoyageBanner({ parsed, lqCount, fullCount }) {
	const v = parsed.voyage;
	const bits = [
		v.vessel,
		v.voyage,
		v.pol && v.pod ? `${v.pol} → ${v.pod}` : v.pol || v.pod,
		parsed.sourceName,
		`${parsed.lines.length} DG lines`,
		fullCount ? `${fullCount} full DG` : null,
		lqCount ? `${lqCount} Ltd Qty` : ""
	].filter((b) => b);
	if (bits.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-navy px-4 py-3 text-primary-foreground sm:px-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[11px] tracking-[0.16em] text-primary-foreground/60 uppercase",
			children: "Voyage"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm font-medium",
			children: bits.join("  ·  ")
		})]
	});
}
function CategoryCheck({ result }) {
	const items = (0, import_react.useMemo)(() => categoryScan(result), [result]);
	const cdcN = items.filter((i) => i.tone === "cdc").length;
	const watchN = items.filter((i) => i.tone === "watch").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-surface shadow-[var(--shadow-border)]",
		"data-testid": "category-check",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3 border-b border-border px-4 py-4 sm:px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-base font-medium",
				children: cdcN > 0 ? "Why CDC is YES" : "Why CDC is NO"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-sm text-muted",
				children: "Nine families in 33 CFR 160.202. Clear means not on this voyage. Watch means it was on board but did not meet the CDC threshold."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[11px] tracking-wide text-muted uppercase",
				children: [
					cdcN,
					" CDC · ",
					watchN,
					" watch · ",
					9 - cdcN - watchN,
					" clear"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanRow, { item }, item.id))
		})]
	});
}
function ScanRow({ item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-start gap-3 px-4 py-2.5 sm:px-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("mt-1.5 size-2.5 shrink-0 rounded-full", item.tone === "clear" && "bg-ok", item.tone === "watch" && "bg-review", item.tone === "cdc" && "bg-cdc"),
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: item.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("text-xs sm:text-right", item.tone === "clear" && "text-muted", item.tone === "watch" && "text-review", item.tone === "cdc" && "text-cdc"),
				children: item.detail
			})]
		})]
	});
}
function CompareCard({ compare }) {
	const a = kindLabel(compare.aKind);
	const b = kindLabel(compare.bKind);
	const pref = kindLabel(compare.preferredKind);
	const delta = Math.abs(compare.aLines - compare.bLines);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"data-testid": "manifest-compare",
		className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 flex size-10 items-center justify-center rounded-md bg-navy text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCompare, { className: "size-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-medium",
						children: "Excel vs printed manifest"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							a,
							": ",
							compare.aLines,
							" lines · ",
							b,
							": ",
							compare.bLines,
							" lines",
							delta === 0 ? " — same count." : ` — off by ${delta}.`,
							" ",
							"CDC ",
							compare.agreesCdc ? "agrees" : "does not agree",
							". Using ",
							pref,
							" for the eNOAD block."
						]
					}),
					compare.mismatches.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-1 font-mono text-xs text-muted",
						children: [compare.mismatches.slice(0, 8).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"UN ",
							m.un,
							" ",
							m.name ? `· ${m.name}` : "",
							" — ",
							a,
							" ",
							m.a,
							" / ",
							b,
							" ",
							m.b
						] }, m.un)), compare.mismatches.length > 8 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"+ ",
							compare.mismatches.length - 8,
							" more UN counts"
						] }) : null]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-ok",
						children: "UN counts match."
					})
				]
			})]
		})
	});
}
function EmailCard({ result, voyage, sourceName }) {
	const mail = (0, import_react.useMemo)(() => masterEmail(result, voyage, sourceName), [
		result,
		voyage,
		sourceName
	]);
	const hasCdc = result.enoad.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailPanel, {
		subject: mail.subject,
		body: mail.body,
		paste: mail.paste,
		mailto: mail.mailto,
		hasCdc,
		filename: emailFilename(voyage, hasCdc ? "YES" : "NO"),
		pasteLive: enoadPasteBlock(result)
	});
}
function RestoredEmail({ entry, onDismiss }) {
	const mailto = `mailto:?subject=${encodeURIComponent(entry.subject)}&body=${encodeURIComponent(entry.body)}`;
	const when = new Date(entry.at).toLocaleString();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3 rounded-xl bg-navy px-4 py-3 text-primary-foreground sm:px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[11px] tracking-[0.16em] text-primary-foreground/60 uppercase",
				children: "Restored email · cargo lines not stored"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm font-medium",
				children: [
					logLabel(entry),
					" · CDC ",
					entry.flag,
					" · ",
					entry.total,
					" lines · ",
					when
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "navy",
				size: "sm",
				onClick: onDismiss,
				className: "border border-primary-foreground/20",
				children: "Dismiss"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailPanel, {
			subject: entry.subject,
			body: entry.body,
			paste: entry.paste,
			mailto,
			hasCdc: entry.flag === "YES",
			filename: emailFilename({
				vessel: entry.vessel,
				voyage: entry.voyage
			}, entry.flag)
		})]
	});
}
function EmailPanel({ subject, body, paste, mailto, hasCdc, filename, pasteLive }) {
	const [copied, setCopied] = (0, import_react.useState)(null);
	async function copy(kind) {
		const text = kind === "email" ? `${subject}\n\n${body}` : paste;
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			const ta = document.createElement("textarea");
			ta.value = text;
			document.body.appendChild(ta);
			ta.select();
			document.execCommand("copy");
			ta.remove();
		}
		setCopied(kind);
		window.setTimeout(() => setCopied(null), 1800);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-surface shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3 border-b border-border px-4 py-4 sm:px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("mt-0.5 flex size-10 items-center justify-center rounded-md", hasCdc ? "bg-cdc text-primary-foreground" : "bg-ok text-primary-foreground"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-medium",
					children: "Email to the Master — eNOAD cargo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-xl text-sm text-muted",
					children: ENOAD_BLURB
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: hasCdc ? "cdc" : "ok",
				children: hasCdc ? "CDC CARRIED: YES" : "CDC CARRIED: NO"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_280px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: "Subject"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-medium",
					children: subject
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-3 max-h-[28rem] overflow-auto rounded-md bg-navy p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-primary-foreground",
					children: body
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("rounded-md px-3 py-3 font-mono text-sm whitespace-pre-wrap", hasCdc ? "bg-cdc-soft text-cdc" : "bg-ok-soft text-ok"),
						children: pasteLive ?? paste
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => void copy("email"),
						children: [copied === "email" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCopy, {}), copied === "email" ? "Copied email" : "Copy email to Master"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: mailto,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {}), "Open in mail app"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => downloadText(filename, emailFileContents(subject, body), "text/plain;charset=utf-8"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Download email .txt"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => void copy("block"),
						children: [copied === "block" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCopy, {}), copied === "block" ? "Copied block" : "Copy eNOAD block only"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs leading-relaxed text-muted",
						children: "Address it to the Master yourself — no recipient is filled in. Download the .txt if the ship PC blocks clipboard. The block-only button is just the eNOAD fields, with no review notes."
					})
				]
			})]
		})]
	});
}
function EmptyHint({ log, onRestore }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-dashed border-border bg-surface/60 px-5 py-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
					className: "mx-auto size-6 text-accent",
					strokeWidth: 1.5
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-base font-medium",
					children: "No manifest screened yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-2 max-w-md text-sm text-muted",
					children: "Drop this voyage’s Excel DCM, Word FINAL DCM, and printed PDF (any mix). Excel has the hatch stowage. You still get the Master-ready eNOAD CDC block."
				})
			]
		}), log.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Recent voyages"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: "Email is kept here. The last voyage’s cargo lines stay on this computer for the hatch plan."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-2",
					children: log.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onRestore(e),
						className: "flex min-h-11 w-full items-center justify-between gap-3 rounded-md bg-surface-2 px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate font-medium",
								children: logLabel(e)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block truncate text-xs text-muted",
								children: [
									e.pol && e.pod ? `${e.pol} → ${e.pod} · ` : "",
									e.total,
									" lines · ",
									e.sourceName || "manifest"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: e.flag === "YES" ? "cdc" : "ok",
							children: ["CDC ", e.flag]
						})]
					}) }, `${e.at}-${e.vessel}-${e.voyage}-${e.sourceName}`))
				})
			]
		}) : null]
	});
}
function Stats({ result }) {
	const items = [
		{
			label: "Rows evaluated",
			value: result.total,
			tone: "ink"
		},
		{
			label: "CDC to report",
			value: result.cdc,
			tone: "cdc"
		},
		{
			label: "Needs review",
			value: result.review,
			tone: "review"
		},
		{
			label: "Not CDC",
			value: result.notCdc,
			tone: "ok"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3 md:grid-cols-4",
		children: items.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl bg-surface px-4 py-4 shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-wide text-muted uppercase",
				children: s.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-1 font-mono text-2xl font-medium tabular-nums", s.tone === "cdc" && s.value > 0 && "text-cdc", s.tone === "review" && s.value > 0 && "text-review", s.tone === "ok" && "text-ok"),
				children: s.value
			})]
		}, s.label))
	});
}
function ResultsTable({ rows, filter, query, flaggedCount, total, onShowAll }) {
	if (rows.length === 0) {
		const nothingFlagged = filter === "flagged" && flaggedCount === 0 && !query;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-5 py-10 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: nothingFlagged ? "Nothing to flag. No CDC, and no rows that need a Master decision." : query ? `No lines match “${query}”.` : "No rows in this filter."
			}), nothingFlagged ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				className: "mt-4",
				onClick: onShowAll,
				children: [
					"Show all ",
					total,
					" lines"
				]
			}) : null]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[720px] text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-border text-xs tracking-wide text-muted uppercase",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium sm:px-5",
						children: "UN"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-3 font-medium",
						children: "Name / class"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-3 font-medium",
						children: "Packaging"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-3 font-medium",
						children: "Qty"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-3 py-3 font-medium",
						children: "Verdict"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "px-4 py-3 font-medium sm:px-5",
						children: "Basis"
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: cn("border-b border-border align-top last:border-0", row.verdict === "CDC" && "border-l-[3px] border-l-cdc", row.verdict === "REVIEW" && "border-l-[3px] border-l-review", row.verdict === "NOT_CDC" && "border-l-[3px] border-l-transparent", row.verdict === "CDC_RESIDUE" && "border-l-[3px] border-l-residue"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-4 py-3 font-mono text-xs tabular-nums sm:px-5",
						children: row.un
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: row.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 font-mono text-xs text-muted",
							children: [
								"Class ",
								row.hazClass || "—",
								row.input.subsidiary ? ` (${row.input.subsidiary})` : "",
								row.pih ? " · PIH" : "",
								isLimitedQty(row) ? " · Ltd qty" : "",
								row.input.container ? ` · ${row.input.container}` : ""
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "px-3 py-3 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: row.packaging || "—" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-muted",
							children: packFormLabel(row.packForm)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "px-3 py-3 font-mono text-xs tabular-nums",
						children: [formatKg(row.quantityKg), row.input.quantityRaw ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block text-muted",
							children: row.input.quantityRaw
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-3 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerdictBadge, { verdict: row.verdict })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "px-4 py-3 text-xs leading-relaxed text-muted sm:px-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: row.reasons[0] }),
							row.needs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-review",
								children: ["Need: ", row.needs.join(" ")]
							}) : null,
							row.paragraphs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-[11px] text-subtle",
								children: row.paragraphs.join(" · ")
							}) : null
						]
					})
				]
			}, `${row.input.rowIndex}-${row.un}-${row.input.container ?? ""}`)) })]
		})
	});
}
function LookupPanel() {
	const [un, setUn] = (0, import_react.useState)("2810");
	const [cls, setCls] = (0, import_react.useState)("");
	const [pkg, setPkg] = (0, import_react.useState)("1 CN");
	const [qty, setQty] = (0, import_react.useState)("5.5");
	const [row, setRow] = (0, import_react.useState)(null);
	function screen() {
		const padded = un.replace(/\D/g, "").padStart(4, "0");
		const entry = lookupUn(padded);
		const n = Number(qty.replace(/,/g, ""));
		const kg = Number.isFinite(n) && qty.trim() ? n * .45359237 : null;
		setRow(evaluateSingle({
			un: padded,
			name: entry?.name,
			hazClass: cls || entry?.cls,
			packaging: pkg,
			quantityKg: kg,
			carriageMode: "containerized"
		}));
	}
	const hint = lookupUn(un.replace(/\D/g, "").padStart(4, "0"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-3xl gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-medium",
						children: "Single UN check"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Container-ship packaging. Quantity is pounds, same as the DCM."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
								label: "UN / NA number",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: un,
									onChange: (e) => setUn(e.target.value),
									className: "font-mono"
								}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted",
									children: [
										hint.name,
										" · Class ",
										hint.cls,
										hint.zone ? ` · PIH Zone ${hint.zone}` : ""
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-subtle",
									children: "Not in the local catalog — class rules still apply."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Hazard class (optional override)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: cls,
									onChange: (e) => setCls(e.target.value),
									placeholder: hint?.cls || "6.1"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Packaging (CN / CY / BX / TANK)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: pkg,
									onChange: (e) => setPkg(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Net quantity (lb)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: qty,
									onChange: (e) => setQty(e.target.value),
									inputMode: "decimal"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-5",
						onClick: screen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}), "Evaluate"]
					})
				]
			}),
			row ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerdictBadge, { verdict: row.verdict }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegacyBadge, { verdict: row.legacy })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 text-lg font-medium",
						children: row.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-mono text-xs text-muted",
						children: [
							"UN ",
							row.un,
							" · Class ",
							row.hazClass || "—",
							" · ",
							packFormLabel(row.packForm),
							" ·",
							" ",
							formatKg(row.quantityKg)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2 text-sm leading-relaxed",
						children: row.reasons.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: r }, r))
					}),
					row.needs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-review",
						children: ["Need: ", row.needs.join(" ")]
					}) : null
				]
			}) : null,
			row ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookupSheet, {
				un: row.un,
				cls: row.hazClass,
				name: row.name
			}) : null
		]
	});
}
function LookupSheet({ un, cls, name }) {
	const sheet = sheetFor(un, cls, name);
	const sections = sheetSections(sheet);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-[11px] tracking-wide text-accent uppercase",
				children: [
					sheet.guide,
					" · Class ",
					sheet.cls
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mt-2 text-base font-medium",
				children: ["What can go wrong — UN ", sheet.un]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: sheet.looksLike
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-3 md:grid-cols-2",
				children: sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: s.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 space-y-1 text-sm text-muted",
					children: s.items.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["— ", t] }, t))
				})] }, s.title))
			})
		]
	});
}
function RulesPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-medium",
					children: "What counts as Certain Dangerous Cargo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-3xl text-sm leading-relaxed text-muted",
					children: "33 CFR 160.202 lists nine categories. This screener is locked to container ships: portable tanks and cartons are packaging, not ship’s tanks, so paragraphs (7), (8) and (9) will not fire. The usual hits on a boxship are 1.1/1.2 explosives, 2.3 over 1 MT, PIH 6.1 in a tank or over 20 MT, and bagged ammonium nitrate that needs a 176.415 permit."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-2 xl:grid-cols-3",
				children: RULE_CARDS.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] tracking-wide text-accent uppercase",
							children: card.paragraph
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-sm font-medium",
							children: card.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: card.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs font-medium text-fg",
							children: ["Threshold: ", card.threshold]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs leading-relaxed text-review",
							children: card.commonMiss
						})
					]
				}, card.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-subtle",
				children: DISCLAIMER
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-medium tracking-wide text-muted",
			children: label
		}), children]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screener, {});
}
//#endregion
export { looksLikeTableDcm as a, parseExp023Text as c, normalizeUn as d, stowFromRowText as f, parseRowMatrix as i, parseQuantityToKg as l, coalesceVoyage as n, parseTableDcmText as o, extractVoyage as r, looksLikeExp023 as s, routes_exports as t, classFromToken as u };
