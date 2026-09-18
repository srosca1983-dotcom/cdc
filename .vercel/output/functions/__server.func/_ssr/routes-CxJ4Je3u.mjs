import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { I as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Mail, c as Flame, d as Eraser, f as Download, g as Anchor, h as ArrowLeft, i as Search, l as FileText, m as Check, o as History, p as ClipboardCopy, r as Shield, s as GitCompare, t as Upload, u as FileSpreadsheet } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CxJ4Je3u.js
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
var CASING_ROWS_H10 = [
	0,
	1,
	2,
	3,
	4
];
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
function deckRowsFor(spec, occupied = []) {
	return rowsPortToStbd([...spec.deckRowIds, ...occupied]);
}
function holdRowsFor(spec, occupied = []) {
	if (!spec.holdRowIds.length && !occupied.length) return [];
	return rowsPortToStbd([...spec.holdRowIds, ...occupied]);
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
	if (bay >= 1 && bay <= 47) return Math.min(12, Math.max(1, Math.ceil(bay / 4)));
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
function starts(line, re) {
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
		item("p1", "1.1 / 1.2 explosives", (l) => starts(l, /^1\.[12]/), "{n} on board — still CDC at any qty (check class)"),
		item("p2", "1.5D (176.415 permit)", (l) => starts(l, /^1\.5D/) || l.paragraphs.includes("160.202(2)"), "{n} on board, not in combustible bags"),
		item("p3", "2.3 PIH gas > 1 MT", (l) => starts(l, /^2\.3/) || l.paragraphs.includes("160.202(3)"), "{n} on board, vessel total ≤ 1 MT"),
		item("p4", "5.1 ammonium nitrate", (l) => l.paragraphs.includes("160.202(4)") || l.paragraphs.includes("160.202(9)") || [
			"1942",
			"2067",
			"2426",
			"3375"
		].includes(l.un), "{n} on board, no 176.415 permit case"),
		item("p5", "6.1 PIH tank or > 20 MT", (l) => starts(l, /^6\.1/) || l.paragraphs.includes("160.202(5)"), "{n} packaged line(s) under 20 MT — not CDC"),
		item("p6", "Class 7 HRCQ / fissile", (l) => starts(l, /^7/) || l.paragraphs.includes("160.202(6)"), "{n} on board, not HRCQ / excepted package"),
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
/** 33 CFR 160.206 (3) cargo fields for NVMC eNOAD. */
function enoadPasteBlock(result) {
	if (result.enoad.length === 0) return NO_CDC_PASTE;
	return [
		GENERAL_CARGO_LINE,
		"CDC CARRIED: YES",
		"",
		...result.enoad.map((e) => {
			const amount = e.amountLabel && e.amountLabel !== "—" ? e.amountLabel : "AMOUNT NOT ON MANIFEST — CONFIRM";
			return [
				`NAME: ${e.name.toUpperCase()}`,
				`UN NUMBER: ${e.un}`,
				`AMOUNT: ${amount}`
			].join("\n");
		})
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
		const { parsePdfArrayBuffer } = await import("./pdf-C9WpndU0.mjs");
		return parsePdfArrayBuffer(data, filename, onProgress);
	}
	if (name.endsWith(".xlsx") || name.endsWith(".xls") || name.endsWith(".xlsm")) {
		const { parseXlsxArrayBuffer } = await import("./xlsx-BAKMt8MP.mjs");
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
var ENOAD_BLURB = "Paste the boxed block into an email to the Master, then into the NVMC eNOAD cargo section. Table 160.206 (3)(i) is general cargo other than CDC (CONTAINERIZED). (3)(ii)–(iii) are name, UN number, and amount of each Certain Dangerous Cargo. If nothing qualifies: CDC CARRIED: NO.";
var DISCLAIMER = "Screening aid for container-ship cargo based on 33 CFR 160.202 and the permit rule in 49 CFR 176.415. It is not a Coast Guard determination, not legal advice, and not a substitute for the IMDG Code, 49 CFR, or the shipping papers. Prefer the Excel DCM over the printed PDF when both exist. If you are not sure, report it.";
var WORKED_SAMPLE = `UN/NA NO	Proper Shipping Name	HAZ Class	Packaging	Net Qty
3480	LITHIUM ION BATTERIES	9	BOX	2400 kg
1049	HYDROGEN, COMPRESSED	2.1	CYL	80 kg
3265	CORROSIVE LIQUID, ACIDIC, ORGANIC, N.O.S.	8	BOX	500 kg
1005	AMMONIA, ANHYDROUS	2.3	PORTABLE TANK	18000 kg
2910	RADIOACTIVE MATERIAL, EXCEPTED PACKAGE	7	BOX	12 kg
1992	FLAMMABLE LIQUID, TOXIC, N.O.S.	3	TANK	20000 kg
1942	AMMONIUM NITRATE	5.1	BAG	25000 kg
0081	EXPLOSIVE, BLASTING, TYPE A	1.1D	BOX	400 kg
1017	CHLORINE	2.3	CYL	50 kg
1098	ALLYL ALCOHOL	6.1	PORTABLE TANK	5000 kg
1280	PROPYLENE OXIDE	3	TANK	12000 kg
0332	EXPLOSIVE, BLASTING, TYPE E	1.5D	BAG	800 kg
2916	RADIOACTIVE MATERIAL, TYPE B(U) PACKAGE	7	BOX	1 kg
1831	SULFURIC ACID, FUMING	8	DRUM	200 kg
1079	SULFUR DIOXIDE	2.3	CYL	400 kg`;
/** Combined-cell Pasha DCM style (container ship, pounds). */
var PASHA_SAMPLE = `UN/NA NO - Shipping Name - Hazardous Class - Packing Group	Technical Name	Limited QTY	Weight Lbs	Packaging	Container	Booking
UN3082,ENVIRONMENTALLY HAZARDOUS SUBSTANCE, LIQUID, N.O.S., 9,III	(CONTAINS: EPOXY RESIN)		265	10 CN	PGHU4013587	3606910301
UN3480,LITHIUM ION BATTERIES, 9,			3795	3 PLTS	PGHU4013587	3606910301
UN1954,COMPRESSED GAS, FLAMMABLE, N.O.S., 2.1,	(HYDROGEN, NITROGEN)		495	7 CY	PGHU4010335	3606910301
UN2810,TOXIC LIQUIDS, ORGANIC, N.O.S., 6.1,III	(3-OXA-1-HEPTANOL)		5.5	1 CN	PGHU4508204	3606910871
UN1263,PAINT, 3,II		Ltd Qty	0.1	1 TO	PGHU4011840	3606910973
UN3085,OXIDIZING SOLID, CORROSIVE, N.O.S., 5.1(8),II	(1-BROMO-3-CHLORO-5,5-DIMETHYLHYDANTOIN)		3	1 CN	PGHU4508204	3606910871`;
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
function loadCargo() {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(CARGO_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed?.lines?.length) return null;
		return parsed;
	} catch {
		return null;
	}
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
function packageCount(pkg) {
	const m = pkg.trim().match(/^(\d+(?:\.\d+)?)\s+/);
	const n = m ? Number(m[1]) : 1;
	return Number.isFinite(n) && n > 0 ? n : 1;
}
function kgPerPackage(input) {
	if (input.quantityKg == null) return null;
	return input.quantityKg / packageCount(input.packaging || "");
}
function bulkOrCylinder(pkg) {
	return /\b(TK|TNK|TANK|TOTE|IBC|CYL(?:INDER)?S?|CY\b|PLTS?|PALLETS?|DRUMS?|DRM)\b/i.test(pkg);
}
/** Hardware-store class 2 inner packagings (aerosol cartons, lighter/cartridge CN). */
function consumerClass2Package(input) {
	const pkg = input.packaging || "";
	if (bulkOrCylinder(pkg)) return false;
	if (/\b(CN|CTN|CARTONS?|CANS?|BX|BOXES|BOX)\b/i.test(pkg)) return true;
	const kg = input.quantityKg;
	if (/\b(CS|CASES?)\b/i.test(pkg) && kg != null && kg < 25) return true;
	if (!pkg.trim() && kg != null && kg < 25) return true;
	return false;
}
function hasExplicitLqMarks(lines) {
	return lines.some((line) => {
		const input = inputOf(line);
		return Boolean(input.limitedQty) || textSaysLimitedQty(blobOf(input));
	});
}
/**
* IMDG 3.4 / 49 CFR 173.27 limited (and excepted) quantity.
* CargoMax uses the DCM Limited QTY column. When that column is missing
* (printed HAZ PDF) pass cartonFallback so CN/CARTON lots still count as LQ.
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
	if (/^2/.test(cls) && consumerClass2Package(input)) return true;
	if (cartonFallback) {
		if (bulkOrCylinder(pkg)) return false;
		if (/\b(CN|CTN|CARTONS?|CANS?|BX|BOXES|BOX)\b/i.test(pkg) || !pkg.trim()) {
			const per = kgPerPackage(input);
			if (per == null || per < 30) return true;
		}
	}
	return false;
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
		ppe: ["Gloves, eye protection, dust mask or SCBA in a cloud."],
		firstAid: ["Burns: cool water. Dust in eyes: rinse."],
		ship: ["On-deck only on GEORGE II (not Hold 2)."]
	},
	"5.1": {
		name: "Oxidizer",
		guide: "ERG 140",
		cls: "5.1",
		looksLike: "White prills or crystals (nitrates), or clear oxidizing solutions. May look like fertilizer.",
		hazards: ["Feeds a fire. Contamination with oil or combustibles can make it explosive."],
		fire: ["Flood with water. Do not use dry chemical or foam as the only tool. Cool adjacent cargo."],
		spill: ["Keep combustibles off it. Sweep dry material. Do not mix with fuels or oils."],
		ppe: ["Gloves, eye protection. SCBA in decomposition smoke (toxic NOx)."],
		firstAid: ["Skin/eyes: water. Inhalation of NOx: medical help — symptoms can be delayed."],
		ship: ["On-deck only. Ammonium nitrate in bags is a CDC conversation if a permit is required."]
	},
	"8": {
		name: "Corrosive",
		guide: "ERG 154",
		cls: "8",
		looksLike: "Acids and alkalis in drums, totes, or wet-cell batteries. May fume. Eats steel and skin.",
		hazards: ["Burns skin and eyes. Some give off flammable or toxic vapor. Battery acid is sulfuric."],
		fire: ["Water spray. Do not get a straight stream into a tote of acid (spatter). Cool the box."],
		spill: ["For acid: soda ash / lime if you have it, otherwise dilute with lots of water on deck and keep people out of the runoff.", "For alkali: vinegar is not a shipboard plan — lots of water and keep it off the skin."],
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
		ppe: ["SCBA + chemical protection. No filter mask for PIH."],
		firstAid: ["Fresh air. Water on skin. Medical help. Do not mouth-to-mouth."],
		ship: ["Packaged 6.1 is on-deck only on GEORGE II. Hold 2 is not approved for 6.1."]
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
		ppe: ["SCBA. Fire kit. Gloves — liquid LPG freezes skin."],
		firstAid: ["Fresh air. Frostbite: warm water. Burns: cool water."],
		ship: ["Residue last contained in a tank or a bank of cylinders is still LPG. Treat empty uncleaned as full.", "Do not stow against the house or under intakes."]
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
	"1263": {
		un: "1263",
		name: "Paint / paint related material",
		guide: "ERG 128",
		cls: "3",
		looksLike: "Cans or pails. Colored liquid, solvent smell. May be PG I–III.",
		hazards: ["Flammable vapor. Some are corrosive (then see 8)."],
		fire: ["Foam / dry chemical on a pool. Water spray to cool cans (they burst)."],
		spill: ["Absorb. Keep ignition down. Ventilate."],
		ppe: ["Gloves, eye protection. SCBA in a thick vapor."],
		firstAid: ["Skin: soap and water. Eyes: water. Fresh air."],
		ship: ["Very common on this trade. PG I is the jumpy one."]
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
		ppe: ["Gloves, eye protection."],
		firstAid: ["Skin: soap and water."],
		ship: ["Common construction cargo."]
	}
};
function classKey(cls) {
	const c = (cls || "").trim();
	if (c.startsWith("1")) return "1";
	if (c.startsWith("2.1")) return "2.1";
	if (c.startsWith("2.3")) return "2.3";
	if (c.startsWith("2.2") || c.startsWith("2")) return "2.2";
	if (c.startsWith("3")) return "3";
	if (c.startsWith("4")) return "4.1";
	if (c.startsWith("5")) return "5.1";
	if (c.startsWith("6.1") || c.startsWith("6")) return "6.1";
	if (c.startsWith("8")) return "8";
	if (c.startsWith("9")) return "9";
	return "9";
}
function sheetFor(un, cls, name) {
	const u = (un || "").replace(/\D/g, "").padStart(4, "0");
	if (UN_SHEETS[u]) return UN_SHEETS[u];
	const base = CLASS_SHEETS[classKey(cls)] ?? CLASS_SHEETS["9"];
	return {
		...base,
		un: u,
		name: name || base.name,
		cls: cls || base.cls
	};
}
function dgLines(lines) {
	return lines.filter((l) => l.input.un).map((l) => ({
		line: l,
		stow: parseStow(l.input.stowLoc)
	}));
}
function hatchBuckets(lines) {
	const all = dgLines(lines);
	return HATCHES.map((spec) => {
		const mine = all.filter((d) => d.stow?.hatch === spec.id);
		const classes = [...new Set(mine.map((d) => d.line.hazClass).filter(Boolean))].sort();
		return {
			spec,
			lines: mine,
			containers: new Set(mine.map((d) => d.line.input.container).filter(Boolean)).size,
			classes,
			onDeck: mine.filter((d) => d.stow?.onDeck).length,
			inHold: mine.filter((d) => d.stow && !d.stow.onDeck).length,
			unknownStow: 0,
			cdc: mine.filter((d) => d.line.verdict === "CDC" || d.line.verdict === "CDC_RESIDUE").length,
			review: mine.filter((d) => d.line.verdict === "REVIEW").length
		};
	});
}
function unstowed(lines) {
	return dgLines(lines).filter((d) => !d.stow);
}
function containersOnHatch(bucket) {
	const map = /* @__PURE__ */ new Map();
	for (const d of bucket.lines) {
		const cn = (d.line.input.container || "").toUpperCase() || `row-${d.line.input.rowIndex}`;
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
		return (a.stow?.row ?? 0) - (b.stow?.row ?? 0);
	});
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
function boxesFrom(lines) {
	const cartonFallback = !hasExplicitLqMarks(lines);
	const lq = (line) => isLimitedQty(line, cartonFallback);
	const map = /* @__PURE__ */ new Map();
	for (const line of lines) {
		if (!line.un) continue;
		const stow = parseStow(line.input.stowLoc);
		const cn = (line.input.container || "").toUpperCase() || `row-${line.input.rowIndex}`;
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
		if (!lq(line)) {
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
function locationIssues(box, spec, cartonFallback) {
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
		const checks = box.lines.length > 0 ? box.lines.filter((line) => !isLimitedQty(line, cartonFallback)).map((line) => ({
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
	if (code === "1") return true;
	if (code === "*") return false;
	if (code === "2") {
		if (sameHatch && sameLevel && (cells < 2 || sameRow)) return false;
		return true;
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
		const key = p.container.toUpperCase();
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
		const dcmOwnsLq = cur.lines.length > 0;
		for (const dg of p.dg) {
			const g = classGroup(dg.cls);
			if (g && !cur.classes.includes(g)) cur.classes.push(g);
			if (dg.subsidiary) {
				const sg = classGroup(dg.subsidiary);
				if (sg && !cur.classes.includes(sg)) cur.classes.push(sg);
			}
			if (!dcmOwnsLq) {
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
function screenVoyage(lines, plan = null) {
	const cartonFallback = !hasExplicitLqMarks(lines);
	const boxes = mergeBaplie(boxesFrom(lines), plan);
	const issues = [];
	for (const box of boxes) {
		const spec = box.stow ? hatchSpec(box.stow.hatch) : void 0;
		if (spec) issues.push(...locationIssues(box, spec, cartonFallback));
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
			const key = c.toUpperCase();
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
	return screen.byContainer.get(key.toUpperCase()) ?? [];
}
function worstSeverity(issues) {
	if (issues.some((i) => i.severity === "block")) return "block";
	if (issues.some((i) => i.severity === "seg")) return "seg";
	if (issues.some((i) => i.severity === "watch")) return "watch";
	return null;
}
function hatchSlots(bucket, plan) {
	const fromDg = containersOnHatch(bucket);
	if (!plan) return fromDg;
	const map = /* @__PURE__ */ new Map();
	const byStow = /* @__PURE__ */ new Map();
	for (const s of fromDg) {
		map.set(s.key, {
			...s,
			reefer: false,
			operating: false
		});
		if (s.stow) byStow.set(`${s.stow.bay}-${s.stow.row}-${s.stow.tier}`, map.get(s.key));
	}
	for (const box of plan.boxes) {
		if (box.stow?.hatch !== bucket.spec.id) continue;
		const key = box.container.toUpperCase();
		const loc = `${box.stow.bay}-${box.stow.row}-${box.stow.tier}`;
		let cur = map.get(key);
		if (!cur && byStow.has(loc) && !byStow.get(loc).box) cur = byStow.get(loc);
		if (!cur) {
			cur = {
				key,
				container: box.container,
				stow: box.stow,
				lines: [],
				reefer: false,
				operating: false
			};
			map.set(key, cur);
		}
		cur.box = box;
		cur.reefer = box.reefer;
		cur.operating = box.operating;
		if (!cur.stow) cur.stow = box.stow;
		if (box.container && cur.container.startsWith("row-")) cur.container = box.container;
		byStow.set(loc, cur);
	}
	return [...map.values()].sort((a, b) => {
		const ta = a.stow?.tier ?? 0;
		const tb = b.stow?.tier ?? 0;
		if (ta !== tb) return ta - tb;
		return (a.stow?.row ?? 0) - (b.stow?.row ?? 0);
	});
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
	const tierGap = Math.abs(a.tier - b.tier);
	if (a.row === b.row && tierGap > 0 && tierGap <= 2) return true;
	if (a.tier === b.tier && athwartGap(a.hatch, a.onDeck, a.row, b.row) <= 1) return true;
	return false;
}
function atMotorEnd(reefer, other, motors) {
	if (reefer.onDeck !== other.onDeck) return false;
	if (reefer.row !== other.row) return false;
	if (Math.abs(reefer.tier - other.tier) > 2) return false;
	if (motors === "aft") return other.bay > reefer.bay && other.bay - reefer.bay <= 2;
	return other.bay < reefer.bay && reefer.bay - other.bay <= 2;
}
function dgSpots(lines, plan) {
	const cartonFallback = !hasExplicitLqMarks(lines);
	const out = [];
	const seen = /* @__PURE__ */ new Set();
	for (const line of lines) {
		const stow = parseStow(line.input.stowLoc);
		if (!stow) continue;
		const container = (line.input.container || "").toUpperCase() || `row-${line.input.rowIndex}`;
		const key = `${container}|${line.un}|${stow.bay}-${stow.row}-${stow.tier}`;
		if (seen.has(key)) continue;
		seen.add(key);
		if (isLimitedQty(line, cartonFallback)) continue;
		out.push({
			container,
			stow,
			cls: line.hazClass,
			un: line.un,
			name: line.name
		});
	}
	if (plan) for (const box of plan.boxes) {
		if (!box.stow || !box.dg.length) continue;
		for (const dg of box.dg) {
			const key = `${box.container}|${dg.un}|${box.stow.bay}-${box.stow.row}-${box.stow.tier}`;
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
	const reefers = plan.boxes.filter((b) => b.reefer && b.stow);
	const dgs = dgSpots(lines, plan);
	const issues = [];
	for (const dg of dgs) for (const rf of reefers) {
		const stow = rf.stow;
		if (dg.container === rf.container) continue;
		const motors = rf.motors;
		const motor = atMotorEnd(stow, dg.stow, motors);
		if (!(beside(stow, dg.stow) || motor)) continue;
		const hot = rf.operating && heatSensitive(dg.cls, dg.un);
		const where = motor ? `at the ${motors === "aft" ? "aft (motor)" : "fwd (motor)"} end of ${rf.container}` : `next to reefer ${rf.container}`;
		issues.push({
			id: `rf-${dg.container}-${rf.container}-${dg.un}`,
			severity: hot ? "seg" : "watch",
			hatch: dg.stow.hatch,
			containers: [dg.container, rf.container],
			uns: dg.un ? [dg.un] : [],
			title: hot ? `${dg.container} UN ${dg.un} class ${dg.cls} is too close to a live reefer` : `${dg.container} sits ${where}`,
			detail: motor ? `Reefers on GEORGE II face ${motors === "aft" ? "aft (motors aft)" : `forward — bay ${stow.bay} below is the exception`}. ${rf.container} ${rf.iso || "RF"} ${rf.operating ? `${rf.tempC ?? "set"}°C` : "NOR"}. DG ${dg.un || dg.cls} is on the compressor end.` : `${rf.container} is a ${rf.operating ? "live" : "NOR"} reefer (${rf.iso || "R"}) ${formatSpot(stow)}. ${dg.container} UN ${dg.un || "—"} class ${dg.cls} is in an adjacent cell.`,
			rule: rf.operating ? "Heat source — live reefer compressor (IMDG keep away from sources of heat)" : "NOR reefer on the bay plan — confirm it stays off"
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
function motorsNote(box) {
	if (!box.reefer) return "";
	if (box.han && /^RFF/i.test(box.han)) return "Motor faces FORWARD (HAN+RFF on the BAPLIE).";
	if (box.motors === "fwd") return "Motor faces FORWARD — bay 6 or 22 below is the conversion-sheet exception.";
	return "Motor faces AFT (whole vessel except bay 6 / 22 below, unless HAN+RFF).";
}
function ShipBoard({ parsed, result, baplie }) {
	const [hatchId, setHatchId] = (0, import_react.useState)(null);
	const [slotKey, setSlotKey] = (0, import_react.useState)(null);
	const [chem, setChem] = (0, import_react.useState)(null);
	const lines = result?.lines ?? [];
	const cartonFallback = !hasExplicitLqMarks(lines);
	const lqOf = (line) => isLimitedQty(line, cartonFallback);
	const buckets = (0, import_react.useMemo)(() => hatchBuckets(lines), [lines]);
	const screen = (0, import_react.useMemo)(() => screenVoyage(lines, baplie), [lines, baplie]);
	const heat = (0, import_react.useMemo)(() => reeferHeatIssues(lines, baplie), [lines, baplie]);
	const loose = (0, import_react.useMemo)(() => unstowed(lines), [lines]);
	const active = buckets.find((b) => b.spec.id === hatchId) ?? null;
	const slots = active ? hatchSlots(active, baplie) : [];
	const slot = slots.find((s) => s.key === slotKey) ?? null;
	const voyageName = parsed?.voyage.voyage ? `${parsed.voyage.vessel || VESSEL.name} ${parsed.voyage.voyage}` : baplie?.voyage ? `${baplie.vessel || VESSEL.name} ${baplie.voyage}` : VESSEL.name;
	if (chem) {
		const sheet = sheetFor(chem.un, chem.cls, chem.name);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChemicalView, {
			sheet,
			onBack: () => setChem(null)
		});
	}
	if (slot && active) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContainerView, {
		slot,
		hatch: active,
		issues: [...issuesForKey(screen, slot.key), ...heat.filter((i) => i.containers.some((c) => c.toUpperCase() === slot.key))],
		onBack: () => setSlotKey(null),
		onChem: setChem,
		cartonFallback
	});
	if (active) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HatchView, {
		bucket: active,
		slots,
		issues: [...screen.byHatch.get(active.spec.id) ?? [], ...heat.filter((i) => i.hatch === active.spec.id)],
		screen,
		baplie,
		cartonFallback,
		onBack: () => {
			setHatchId(null);
			setSlotKey(null);
		},
		onSlot: (k) => setSlotKey(k)
	});
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
					children: ["House and conning are forward. Hatches 1–12 run aft. The engine casing sits at Hatch 10; the LNG vent mast is part of the plant, not a cargo tank.", baplie ? " BAPLIE is on this voyage: reefers (motors aft), dry cargo, and DG from the DCM share the same cells." : " Drop a BAPLIE on Manifest when you want reefers and the rest of the boxes. DCM-only still works."]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueBanner, {
				screen,
				extra: heat,
				onHatch: setHatchId
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Profile, {
				buckets,
				screen,
				baplie,
				onHatch: setHatchId
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: buckets.map((b) => {
					const issues = screen.byHatch.get(b.spec.id) ?? [];
					const worst = worstSeverity(issues);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setHatchId(b.spec.id),
						className: cn("rounded-lg border bg-surface p-4 text-left shadow-border transition-colors duration-150", worst === "block" ? "border-cdc" : worst === "seg" ? "border-review" : b.lines.length > 0 ? "border-accent/40 hover:border-accent" : "hover:border-navy/30"),
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
								})] }), b.lines.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "navy",
									children: [b.lines.length, " DG"]
								}) : baplie && countBoxes(baplie, b.spec.id) > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "navy",
									children: [countBoxes(baplie, b.spec.id), " boxes"]
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
							worst && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: cn("mt-1 text-xs", worst === "block" ? "text-cdc" : "text-review"),
								children: [
									issues.filter((i) => i.severity === "block").length ? `${issues.filter((i) => i.severity === "block").length} should not be here` : "",
									issues.filter((i) => i.severity === "block").length && issues.filter((i) => i.severity === "seg").length ? " · " : "",
									issues.filter((i) => i.severity === "seg").length ? `${issues.filter((i) => i.severity === "seg").length} segregation` : "",
									!issues.filter((i) => i.severity === "block").length && !issues.filter((i) => i.severity === "seg").length && issues.filter((i) => i.severity === "watch").length ? `${issues.filter((i) => i.severity === "watch").length} caution` : ""
								]
							}),
							baplie && countReefers(baplie, b.spec.id) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-ink",
								children: [countReefers(baplie, b.spec.id), " reefers · motors aft"]
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-medium text-ink",
				children: [
					screen.blocks ? `${screen.blocks} should not be in that space` : "Spaces look allowed",
					screen.segs + extra.filter((i) => i.severity === "seg").length ? ` · ${screen.segs + extra.filter((i) => i.severity === "seg").length} segregation / heat` : "",
					screen.watches + extra.filter((i) => i.severity === "watch").length ? ` · ${screen.watches + extra.filter((i) => i.severity === "watch").length} caution` : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: hot.slice(0, 8).map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => issue.hatch && onHatch(issue.hatch),
					className: "text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-ink",
							children: issue.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: issue.detail
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 font-mono text-xs text-subtle",
							children: issue.rule
						})
					]
				}) }, issue.id))
			}),
			hot.length > 8 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted",
				children: [
					"+ ",
					hot.length - 8,
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
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-ink",
					children: issue.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: issue.detail
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-mono text-xs text-subtle",
					children: issue.rule
				})
			]
		}, issue.id))
	});
}
function Profile({ buckets, screen, baplie, onHatch }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-lg border bg-navy p-4 text-primary-foreground shadow-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 1120 260",
			className: "h-auto w-full min-w-[720px]",
			role: "img",
			"aria-label": "GEORGE II profile, bow to the left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "M/V GEORGE II · bow left · house forward · hatches 1–12 aft" }),
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
					const hot = b.lines.length > 0;
					const w = h.id === 10 ? 44 : 58;
					const worst = worstSeverity(screen.byHatch.get(h.id) ?? []);
					const rf = baplie ? countReefers(baplie, h.id) : 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x,
							y: 86,
							width: w,
							height: 32,
							rx: "2",
							fill: worst === "block" ? "var(--color-cdc)" : worst === "seg" ? "var(--color-review)" : hot ? "var(--color-ok)" : rf ? "var(--color-accent)" : "currentColor",
							fillOpacity: hot || worst || rf ? .95 : .2,
							stroke: "currentColor",
							strokeOpacity: "0.6",
							className: "cursor-pointer",
							onClick: () => onHatch(h.id)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: x + w / 2,
							y: 107,
							textAnchor: "middle",
							fill: hot || worst ? "var(--color-primary-foreground)" : "currentColor",
							fontSize: "12",
							fontWeight: 600,
							className: "cursor-pointer",
							onClick: () => onHatch(h.id),
							children: h.id
						}),
						worst && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: x + w / 2,
							y: 80,
							textAnchor: "middle",
							fill: worst === "block" ? "var(--color-cdc)" : "var(--color-review)",
							fontSize: "10",
							children: "!"
						}),
						!worst && hot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x: x + w / 2,
							y: 80,
							textAnchor: "middle",
							fill: "var(--color-review)",
							fontSize: "10",
							children: b.lines.length
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
function HatchView({ bucket, slots, issues, screen, baplie, cartonFallback, onBack, onSlot }) {
	const deckOccupied = slots.filter((s) => s.stow?.onDeck).map((s) => s.stow.row);
	const holdOccupied = slots.filter((s) => s.stow && !s.stow.onDeck).map((s) => s.stow.row);
	const deckRowList = deckRowsFor(bucket.spec, deckOccupied);
	const holdRowList = holdRowsFor(bucket.spec, holdOccupied);
	const deckTiers = [
		82,
		84,
		86,
		88,
		90
	];
	const holdTiers = [
		2,
		4,
		6,
		8,
		10,
		12
	];
	function cell(tier, row) {
		return slots.find((s) => s.stow?.tier === tier && s.stow?.row === row);
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
					"Section looking forward from aft — port is to the left (even cells), 00 is centerline, starboard is odd. Bays ",
					bucket.spec.bays.join("-"),
					" (",
					bucket.spec.bay40,
					" is the 40'). Press a box for the cargo list."
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "navy",
						children: [bucket.lines.length, " DG lines"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "navy",
						children: [bucket.containers, " containers"]
					}),
					bucket.spec.imdgOnDeck ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "On-deck IMDG OK" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "navy",
						children: "No IMDG on cover"
					}),
					bucket.spec.imdgHold && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Hold 2 IMDG" }),
					issues.some((i) => i.severity === "block") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "cdc",
						children: "Should not be here"
					}),
					issues.some((i) => i.severity === "seg") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "review",
						children: "Segregation"
					}),
					baplie && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "navy",
						children: [
							countBoxes(baplie, bucket.spec.id),
							" BAPLIE · ",
							countReefers(baplie, bucket.spec.id),
							" RF"
						]
					})
				]
			}),
			baplie ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Navy = live reefer (motors aft). Muted navy = NOR. Green = Ltd Qty only. Ink = full DG. Red/amber = a real CSM or 176.83 hit. Grey = other cargo. Empty cells are empty."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueList, { issues }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BayGrid, {
				title: `On deck · bays ${bucket.spec.bays.join("-")}${bucket.spec.id === 1 ? " · 11 across with 00" : bucket.spec.id === 10 ? " · bay 38 no middle" : " · 12 across"}`,
				tiers: deckTiers,
				rows: deckRowList,
				cell,
				onSlot,
				screen,
				cartonFallback
			}),
			bucket.spec.holdRows > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BayGrid, {
				title: `Below deck · ${bucket.spec.hold || "hold"} · ${bucket.spec.holdAccess} access · 7 across with 00`,
				tiers: holdTiers,
				rows: holdRowList,
				cell,
				onSlot,
				screen,
				cartonFallback
			}),
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1 text-sm text-muted",
				children: bucket.spec.notes.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["— ", w] }, w))
			})
		]
	});
}
function BayGrid({ title, tiers, rows, cell, onSlot, screen, cartonFallback }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-x-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-2 text-xs font-medium tracking-wide text-subtle uppercase",
			children: [title, " · PORT even ← · 00 CL · STBD odd →"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[520px] border-collapse text-center text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				className: "p-1 text-muted",
				children: "Tier"
			}), rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
				className: "p-1 font-mono text-muted",
				children: String(r).padStart(2, "0")
			}, r))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: [...tiers].reverse().map((tier) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "p-1 font-mono text-muted",
				children: tier
			}), rows.map((row) => {
				const s = cell(tier, row);
				const worst = s ? worstSeverity(issuesForKey(screen, s.key)) : null;
				const lqOnly = !!s && s.lines.length > 0 && s.lines.every((d) => isLimitedQty(d.line, cartonFallback));
				const fullDg = !!s && s.lines.some((d) => !isLimitedQty(d.line, cartonFallback));
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "p-0.5",
					children: s ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onSlot(s.key),
						className: cn("flex h-14 w-full flex-col items-center justify-center rounded-sm px-1 font-mono text-[10px] leading-tight", worst === "block" ? "bg-cdc-soft text-ink" : worst === "seg" ? "bg-review-soft text-ink" : fullDg ? "bg-navy/15 text-ink" : lqOnly ? "bg-ok-soft text-ink" : s.operating ? "bg-navy text-primary-foreground" : s.reefer ? "bg-navy-2 text-primary-foreground" : s.box ? "bg-surface-2 text-ink" : "bg-ok-soft text-ink"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.container.replace(/[A-Z]{4}/, (p) => p.slice(0, 4)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: s.operating || s.reefer ? "text-primary-foreground/80" : "text-muted",
							children: [s.lines.length ? s.lines.map((l) => l.line.hazClass).filter(Boolean)[0] : s.reefer ? s.operating ? "RF" : "NOR" : s.box?.iso || "—", worst ? " !" : ""]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-14 rounded-sm bg-surface-2/80" })
				}, row);
			})] }, tier)) })]
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4" }), " Spill / fire"]
			})]
		})
	});
}
function ContainerView({ slot, hatch, issues, onBack, onChem, cartonFallback }) {
	const full = slot.lines.filter((d) => !isLimitedQty(d.line, cartonFallback));
	const lq = slot.lines.filter((d) => isLimitedQty(d.line, cartonFallback));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "inline-flex items-center gap-2 text-sm text-accent",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }),
					" Hatch ",
					hatch.spec.id
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-subtle uppercase",
					children: "Container"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-mono text-xl",
					children: slot.container
				}),
				slot.stow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: formatStow(slot.stow)
				}),
				slot.reefer && slot.box ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-ink",
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
					className: "mt-1 text-sm text-muted",
					children: [
						slot.box.iso || "Dry",
						" · ",
						slot.box.weightKg ? `${Math.round(slot.box.weightKg)} kg` : "weight —",
						slot.box.pol ? ` · POL ${slot.box.pol}` : "",
						slot.box.pod ? ` · POD ${slot.box.pod}` : ""
					]
				})
			] }),
			issues.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IssueList, { issues }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-lg border border-ok/30 bg-ok-soft p-3 text-sm text-ok",
				children: "No CSM location block and no 176.83 hit against this box on the positions we have."
			}),
			full.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "text-sm font-medium",
				children: ["Dangerous goods · ", full.length]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-3",
				children: full.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CargoLine, {
					d,
					onChem,
					lq: false
				}, d.line.input.rowIndex))
			})] }),
			lq.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-sm font-medium",
					children: ["Limited quantity · ", lq.length]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: "IMDG 3.4.4.2 — not segregated from other boxes, and not under the hatch class table."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-3",
					children: lq.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CargoLine, {
						d,
						onChem,
						lq: true
					}, d.line.input.rowIndex))
				})
			] }),
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-4" }), " Spill / fire"]
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetBlock, {
				title: "Hazards",
				items: sheet.hazards
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetBlock, {
				title: "Fire",
				items: sheet.fire
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetBlock, {
				title: "Spill",
				items: sheet.spill
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetBlock, {
				title: "PPE",
				items: sheet.ppe
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetBlock, {
				title: "First aid",
				items: sheet.firstAid
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetBlock, {
				title: "On GEORGE II",
				items: sheet.ship
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-subtle",
				children: "Public ERG actions for a container ship. Confirm against the SDS, EmS, and the Master’s orders before you commit people."
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
function ResponseIndex({ lines, onOpen }) {
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
function isoReefer(iso) {
	if (!iso) return false;
	return /^\d{2}R/i.test(iso) || /^[A-Z][0-9]R/i.test(iso);
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
	let hanMotors = null;
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
			cur.container = locCode(els[2] || "", una.comp, una.rel).replace(/\s+/g, "").toUpperCase();
			const iso = locCode(els[3] || "", una.comp, una.rel);
			if (iso) cur.iso = iso.toUpperCase();
			const full = (els[6] || "").trim() || (els[5] || "").trim();
			if (full === "5") cur.full = true;
			if (full === "4") cur.full = false;
			if (pendingForNextEqd && pending) applyStow(cur, pending.raw, parseStow(pending.raw, cur.iso));
		} else if (tag === "MEA" && cur) {
			const joined = els.join(una.data);
			const m = joined.match(/KGM[:\+]?(\d+(?:\.\d+)?)/i) || joined.match(/LBR[:\+]?(\d+(?:\.\d+)?)/i);
			if (m) {
				const n = Number(m[1]);
				cur.weightKg = /LBR/i.test(m[0]) ? n * .453592 : n;
			}
		} else if (tag === "TMP" && cur) {
			const valParts = splitReleased(els[2] || "", una.comp, una.rel);
			cur.tempC = toC(valParts[0] || "", valParts[1] || "");
			cur.reefer = true;
			cur.operating = cur.full !== false;
		} else if (tag === "HAN" && cur) {
			const code = locCode(els[1] || "", una.comp, una.rel).toUpperCase();
			cur.han = code;
			if (/^RFF/.test(code) || /FWD|FORWARD/.test(code)) hanMotors = "fwd";
			if (/^RFA/.test(code) || /^RFB/.test(code) || /\bAFT\b/.test(code)) hanMotors = "aft";
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
/** Tiny GEORGE II-style BAPLIE for the example button. */
var SAMPLE_BAPLIE = `UNA:+.? '
UNB+UNOA:2+PASHA+GEORGEII+260908:1200+1'
UNH+1+BAPLIE:D:95B:UN:SMDG22'
BGM+34+G2069W+9'
DTM+137:20260908:102'
TDT+20+G2069W+1++PHK:172:20+++8012487:103:GEORGE II'
LOC+5+USLGB:139:6'
LOC+61+USHNL:139:6'
EQD+CN+RFRA0000001+45R1:102:5++2+5'
LOC+147+0180284:139:5'
MEA+WT+G+KGM:28000'
TMP+2+-18:CEL'
LOC+9+USHNL:139:6'
EQD+CN+DGPA0000002+45G1:102:5++2+5'
LOC+147+0180184:139:5'
MEA+WT+G+KGM:18000'
DGS+IMD+3+1263+III'
FTX+AAD+++PAINT'
LOC+9+USHNL:139:6'
EQD+CN+DRYA0000003+45G1:102:5++2+5'
LOC+147+0181184:139:5'
MEA+WT+G+KGM:22000'
LOC+9+USHNL:139:6'
EQD+CN+RFRA0000004+22R1:102:5++2+5'
LOC+147+0060504:139:5'
MEA+WT+G+KGM:24000'
TMP+2+2:CEL'
EQD+CN+NORA0000005+45R1:102:5++2+4'
LOC+147+0180186:139:5'
UNT+30+1'
UNZ+1+1'
`;
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
		setBaplie(loadBaplie());
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
				tab === "response" && result && !chem && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium",
						children: "Spill and fire sheets"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Every UN on this voyage. Press a line for how it looks, how it burns, and what to do on GEORGE II."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponseIndex, {
						lines: result.lines,
						onOpen: setChem
					})]
				}),
				tab === "response" && chem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChemicalView, {
					sheet: sheetFor(chem.un, chem.cls, chem.name),
					onBack: () => setChem(null)
				}),
				tab === "response" && !result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedVoyage, { onGo: () => setTab("manifest") }),
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
							children: "Container ship · USCG eNOAD · 33 CFR 160.202"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 text-xl font-medium tracking-tight sm:text-2xl",
							children: "Certain Dangerous Cargo for the Master"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-2xl text-sm text-primary-foreground/70",
							children: "Drop the Excel DCM, the Word FINAL DCM, and the printed manifest. CDC is screened from that voyage. BAPLIE is optional — drop it when you want reefers and the rest of the bay plan."
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "navy",
					className: "border border-primary-foreground/15 bg-navy-2",
					children: "Container ships only"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-wrap gap-1 rounded-lg bg-navy-2 p-1",
				"aria-label": "Primary",
				children: [
					["manifest", "Manifest"],
					["ship", "Ship"],
					["response", "Spill / fire"],
					["lookup", "UN lookup"],
					["rules", "33 CFR 160.202"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onTab(id),
					className: cn("h-10 flex-1 rounded-md px-3 text-sm font-medium transition-colors duration-150 sm:flex-none sm:px-5", tab === id ? "bg-surface text-ink" : "text-primary-foreground/70 hover:text-primary-foreground"),
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
		setLog(loadVoyageLog());
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
	function loadSample(text, name) {
		const next = parseManifest(text, "lb");
		next.sourceName = name;
		applyParsed(next);
	}
	const flaggedCount = result ? result.cdc + result.residue + result.review : 0;
	const cartonFallback = result ? !hasExplicitLqMarks(result.lines) : false;
	const lqCount = result ? result.lines.filter((l) => isLimitedQty(l, cartonFallback)).length : 0;
	const fullCount = result ? result.total - lqCount : 0;
	const filtered = (0, import_react.useMemo)(() => {
		if (!result) return [];
		const needle = query.trim().toLowerCase().replace(/^un\s*/, "");
		return result.lines.filter((l) => {
			if (filter === "flagged" && l.verdict === "NOT_CDC") return false;
			if (filter === "CDC" && l.verdict !== "CDC" && l.verdict !== "CDC_RESIDUE") return false;
			if (filter === "REVIEW" && l.verdict !== "REVIEW") return false;
			if (filter === "NOT_CDC" && l.verdict !== "NOT_CDC") return false;
			if (filter === "full" && isLimitedQty(l, cartonFallback)) return false;
			if (filter === "lq" && !isLimitedQty(l, cartonFallback)) return false;
			if (!needle) return true;
			return [
				l.un,
				l.name,
				l.hazClass,
				l.packaging,
				l.input.container,
				l.input.booking,
				l.input.technicalName,
				isLimitedQty(l, cartonFallback) ? "ltd qty limited" : "full dg"
			].filter(Boolean).join(" ").toLowerCase().includes(needle);
		}).sort((a, b) => {
			const lq = Number(isLimitedQty(a, cartonFallback)) - Number(isLimitedQty(b, cartonFallback));
			if (lq) return lq;
			const ca = (a.input.container || "").toUpperCase();
			const cb = (b.input.container || "").toUpperCase();
			if (ca !== cb) return ca.localeCompare(cb);
			return a.un.localeCompare(b.un);
		});
	}, [
		result,
		filter,
		query,
		cartonFallback
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
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => loadSample(PASHA_SAMPLE, "pasha-style-sample.tsv"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, {}), "Pasha-style sample"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => loadSample(WORKED_SAMPLE, "worked-cdc-example.tsv"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {}), "Example with CDC"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: () => setShowPaste((v) => !v),
									children: "Paste instead"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
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
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, {}), "Clear DCM"]
								})
							]
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => {
									const plan = parseBaplie(SAMPLE_BAPLIE, "sample-george-ii.edi");
									setBaplie(plan);
									saveBaplie(plan);
								},
								children: "Example BAPLIE"
							}), baplie ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
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
							] }) : null]
						}),
						baplie?.warnings.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-review",
							children: baplie.warnings.join(" ")
						}) : null
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
							cartonFallback,
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
function ResultsTable({ rows, filter, query, flaggedCount, total, cartonFallback, onShowAll }) {
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
								isLimitedQty(row, cartonFallback) ? " · Ltd qty" : "",
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
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
		}), row ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
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
		}) : null]
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
