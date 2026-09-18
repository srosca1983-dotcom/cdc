import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { I as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Mail, c as FileText, d as Download, f as ClipboardCopy, i as Search, l as FileSpreadsheet, m as Anchor, o as History, p as Check, r as Shield, s as GitCompare, t as Upload, u as Eraser } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dwgy1K_5.js
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
	/weight\s*lbs?/,
	/net\s*(wt|weight|qty|mass|kgs?)?/,
	/quantity/,
	/^kgs?$/,
	/^lbs?$/,
	/weight\s*(kg|kgs|net)?/,
	/gross\s*(wt|weight|kgs?)?/,
	/^mass$/,
	/qty\s*(kg|kgs|mt)?/
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
		limitedQty: limitedQty || void 0
	};
}
function parseRowMatrix(rawRows, defaultQtyUnit = "kg") {
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
	const qtyCol = headerIdx >= 0 ? bestCol(header, QTY_ALIASES) : -1;
	const pgCol = headerIdx >= 0 ? bestCol(header, PG_ALIASES) : -1;
	const subCol = headerIdx >= 0 ? bestCol(header, SUB_ALIASES) : -1;
	const containerCol = headerIdx >= 0 ? bestCol(header, CONTAINER_ALIASES) : -1;
	const bookingCol = headerIdx >= 0 ? bestCol(header, BOOKING_ALIASES) : -1;
	const techCol = headerIdx >= 0 ? bestCol(header, TECH_ALIASES) : -1;
	const ltdCol = headerIdx >= 0 ? bestCol(header, LTD_ALIASES) : -1;
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
		ltdCol
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
function parseManifest(text, defaultQtyUnit = "kg") {
	const trimmed = text.replace(/^\uFEFF/, "").trim();
	if (!trimmed) return {
		header: [],
		lines: [],
		warnings: ["No text to parse."],
		delimiter: "tab",
		voyage: {},
		unitGuess: defaultQtyUnit
	};
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
* Compact UN catalog for 33 CFR 160.202 screening.
* Flags encode the regulatory hooks; unknown UNs still evaluate via class rules.
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
1182|Ethyl chloroformate|6.1|pih_liquid|A
1238|Methyl chloroformate|6.1|pih_liquid|A
1239|Methyl chloromethyl ether|6.1|pih_liquid|A
1244|Methylhydrazine|6.1|pih_liquid|A
1251|Methyl vinyl ketone, stabilized|6.1|pih_liquid|A
1280|Propylene oxide|3|named_bulk_liquid|
1541|Acetone cyanohydrin, stabilized|6.1|pih_liquid,named_bulk_liquid|B
1556|Arsenic compound, liquid, n.o.s.|6.1|pih_liquid|
1560|Arsenic trichloride|6.1|pih_liquid|A
1580|Chloropicrin|6.1|pih_liquid|A
1589|Cyanogen chloride, stabilized|2.3|pih_gas|A
1595|Dimethyl sulfate|6.1|pih_liquid|B
1605|Ethylene dibromide|6.1|pih_liquid,named_bulk_liquid|B
1614|Hydrogen cyanide, stabilized (absorbed)|6.1|pih_liquid|A
1647|Methyl bromide and ethylene dibromide mixture|6.1|pih_liquid|B
1660|Nitric oxide, compressed|2.3|pih_gas|A
1670|Perchloromethyl mercaptan|6.1|pih_liquid|B
1695|Chloroacetone, stabilized|6.1|pih_liquid|A
1741|Boron trichloride|2.3|pih_gas|C
1744|Bromine|8|pih_liquid|A
1749|Chlorine trifluoride|2.3|pih_gas|B
1754|Chlorosulfonic acid|8|named_bulk_liquid,pih_liquid|B
1809|Phosphorus trichloride|6.1|pih_liquid|B
1810|Phosphorus oxychloride|6.1|pih_liquid|B
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
function hasFlag(entry, flag) {
	return Boolean(entry?.flags.includes(flag));
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
	TO: "rigid",
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
var DEFAULT_OPTIONS = {
	carriageMode: "containerized",
	defaultQtyUnit: "lb",
	residueMode: false
};
var CONTAINER_OPTIONS = DEFAULT_OPTIONS;
var DIV_11_12 = /^(1\.1|1\.2)/;
var DIV_15 = /^1\.5/;
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
function applyResidue(acc, options, residueAlways, namedBulk) {
	if (!options.residueMode) return;
	if (residueAlways) {
		acc.reasons.push("Residue of this liquefied gas is still CDC — 33 CFR 160.202 CDC residue definition excepts ammonia, chlorine, ethane, ethylene oxide, LNG, methyl bromide, sulfur dioxide, and vinyl chloride.");
		return;
	}
	if (namedBulk || acc.paras.includes("160.202(7)") || acc.paras.includes("160.202(8)") || acc.paras.includes("160.202(9)")) {
		acc.verdict = "CDC_RESIDUE";
		acc.reasons.push("Treated as CDC residue remaining after discharge (not accessible through normal transfer). Report as CDC residue on the eNOAD cargo section.");
	}
}
function evaluateLinePass1(line, options) {
	const entry = lookupUn(line.un);
	const catalogClass = entry?.cls;
	const tokens = classTokens(line, catalogClass);
	const packForm = classifyPackaging(line.packaging, options.carriageMode);
	const displayName = line.name || entry?.name || `UN ${line.un}`;
	const displayClass = line.hazClass || catalogClass || "";
	const qty = line.quantityKg;
	const acc = {
		verdict: "NOT_CDC",
		paras: [],
		reasons: [],
		needs: [],
		pih: hasFlag(entry, "pih_gas") || hasFlag(entry, "pih_liquid")
	};
	const is11or12 = matches(tokens, DIV_11_12);
	const is15 = matches(tokens, DIV_15) || hasFlag(entry, "expl_15d");
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
	if (is15 && acc.verdict !== "CDC") {
		addPara(acc.paras, "160.202(2)");
		if (packForm === "combustible_bag") {
			acc.verdict = "CDC";
			acc.reasons.push("Division 1.5 blasting agent in a paper/burlap/nonrigid combustible package requires a COTP permit under 49 CFR 176.415 — that makes it CDC (33 CFR 160.202(2)).");
		} else if (packForm === "rigid") {
			acc.reasons.push("Division 1.5D in rigid packaging with non-combustible inner packaging is excepted from the 176.415 permit. Confirm inner packaging; if combustible inners are used it is CDC.");
			acc.verdict = "REVIEW";
			acc.needs.push("Confirm inner packaging is non-combustible (49 CFR 176.415(b)(3)).");
		} else {
			acc.verdict = "REVIEW";
			acc.reasons.push("Division 1.5 is CDC only when a 49 CFR 176.415 permit is required (typically combustible bags). Packaging is not clear enough to decide.");
			acc.needs.push("Packaging type (bag vs rigid) for 1.5D permit test.");
		}
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
	const pihLiquid = hasFlag(entry, "pih_liquid");
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
	applyResidue(acc, options, hasFlag(entry, "residue_always"), hasFlag(entry, "named_bulk_liquid") || hasFlag(entry, "an_51") || hasFlag(entry, "an_fertilizer"));
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
function aggregateByUn(lines, pred) {
	const map = /* @__PURE__ */ new Map();
	for (const l of lines) {
		if (!pred(l)) continue;
		const prev = map.has(l.un) ? map.get(l.un) : 0;
		if (l.quantityKg === null || prev === null) map.set(l.un, null);
		else map.set(l.un, prev + l.quantityKg);
	}
	return map;
}
function isPackaged61(l) {
	return l.paragraphs.includes("160.202(5)") && l.packForm !== "bulk_packaging" && l.packForm !== "ship_bulk";
}
function pass2Quantities(lines) {
	const notes = [];
	const div23 = aggregateByUn(lines, (l) => l.paragraphs.includes("160.202(3)") && l.verdict !== "CDC");
	for (const [un, total] of div23) {
		const related = lines.filter((l) => l.un === un && l.paragraphs.includes("160.202(3)"));
		if (total !== null && total > 1e3) for (const l of related) {
			if (l.verdict === "CDC") continue;
			l.verdict = "CDC";
			l.reasons.push(`Vessel total for UN ${un} Division 2.3 is ${formatKg(total)}, which exceeds 1 metric ton — CDC (33 CFR 160.202(3)).`);
			l.needs = l.needs.filter((n) => !n.includes("1 MT"));
		}
		else if (total !== null && total <= 1e3) {
			for (const l of related) {
				if (l.verdict === "CDC" || l.verdict === "CDC_RESIDUE") continue;
				l.needs = l.needs.filter((n) => !n.includes("1 MT"));
				if (l.verdict === "REVIEW" && l.needs.length === 0 && !l.paragraphs.some((p) => p !== "160.202(3)")) l.verdict = "NOT_CDC";
			}
			notes.push(`UN ${un} Division 2.3 vessel total ${formatKg(total)} ≤ 1 MT — not CDC under (3).`);
		}
	}
	const div61 = aggregateByUn(lines, (l) => isPackaged61(l) && l.verdict !== "CDC");
	for (const [un, total] of div61) {
		const related = lines.filter((l) => l.un === un && isPackaged61(l));
		const anyPih = related.some((l) => l.pih);
		if (total !== null && total > 2e4) for (const l of related) {
			if (l.verdict === "CDC") continue;
			if (anyPih) {
				l.verdict = "CDC";
				l.reasons.push(`Vessel total for UN ${un} PIH liquid is ${formatKg(total)}, which exceeds 20 metric tons in non-bulk packaging — CDC (33 CFR 160.202(5)).`);
			} else {
				l.verdict = "REVIEW";
				l.reasons.push(`Vessel total for UN ${un} Division 6.1 is ${formatKg(total)}, over 20 MT packaged. If this material is PIH it is CDC (33 CFR 160.202(5)). Confirm Hazard Zone on the shipping paper.`);
				if (!l.needs.some((n) => n.includes("PIH"))) l.needs.push("Confirm whether this 6.1 liquid is PIH (Hazard Zone A–D).");
			}
			l.needs = l.needs.filter((n) => !n.includes("20 MT"));
		}
		else if (total !== null && total <= 2e4) {
			for (const l of related) {
				if (l.verdict === "CDC" || l.verdict === "CDC_RESIDUE") continue;
				l.needs = l.needs.filter((n) => !n.includes("20 MT"));
				if (l.verdict === "REVIEW" && l.needs.every((n) => n.includes("PIH") || n.includes("20 MT"))) {
					l.verdict = "NOT_CDC";
					l.needs = [];
					l.reasons.push(`Vessel total ${formatKg(total)} ≤ 20 MT packaged — not CDC under (5) even if PIH.`);
				}
			}
			if (anyPih) notes.push(`UN ${un} packaged PIH liquid vessel total ${formatKg(total)} ≤ 20 MT — not CDC under (5) unless in bulk packaging.`);
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
	const notes = pass2Quantities(evaluated);
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
		defaultQtyUnit: "kg",
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
		item("p2", "1.5D (176.415 permit)", (l) => starts(l, /^1\.5/), "{n} on board, not in combustible bags"),
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
		const { parsePdfArrayBuffer } = await import("./pdf-C3vg5gr1.mjs");
		return parsePdfArrayBuffer(data, filename, onProgress);
	}
	if (name.endsWith(".xlsx") || name.endsWith(".xls") || name.endsWith(".xlsm")) {
		const { parseXlsxArrayBuffer } = await import("./xlsx-B99IQhQN.mjs");
		return parseXlsxArrayBuffer(data, filename);
	}
	const parsed = parseManifest(decodeText(data), "lb");
	parsed.sourceName = filename;
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
		summary: "A Division 2.3 poisonous gas that is also poisonous by inhalation is CDC only when the quantity of that cargo on the vessel exceeds 1 metric ton. A few cylinders of chlorine are not CDC. An ISO tank of anhydrous ammonia usually is.",
		threshold: "> 1 metric ton per vessel",
		commonMiss: "UN 1005 / 1017 / 1079 are not automatic CDC — add the vessel total first."
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
		summary: "A liquid with a primary or subsidiary Division 6.1 classification that is poisonous by inhalation is CDC if it is in bulk packaging (portable tank, IBC) or, when not in bulk packaging, if the vessel total exceeds 20 metric tons. Ordinary 6.1 (oral/dermal toxic) is not CDC. A 5 lb carton of UN 2810 is almost never CDC.",
		threshold: "Bulk packaging, or > 20 MT packaged",
		commonMiss: "Class 6.1 on the DCM is not enough — it must be PIH, and packaged lots have a 20 MT floor."
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
		summary: "Ammonium nitrate and AN-based fertilizer listed as Division 5.1, when carried in bulk in the ship’s holds. Bagged AN on a container ship is evaluated under (4), not (9).",
		threshold: "Carried in bulk as Division 5.1 — not used here",
		commonMiss: "Containerized bags of UN 1942 are a permit test, not a bulk-solid CDC."
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
var KEY = "cdc-enoad-log-v1";
var MAX = 12;
function read() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
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
		window.localStorage.setItem(KEY, JSON.stringify(entries.slice(0, MAX)));
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
function Screener() {
	const [tab, setTab] = (0, import_react.useState)("manifest");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
			tab,
			onTab: setTab
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8",
			children: [
				tab === "manifest" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManifestPanel, {}),
				tab === "lookup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LookupPanel, {}),
				tab === "rules" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RulesPanel, {})
			]
		})]
	});
}
function Header({ tab, onTab }) {
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
							children: "Drop the Excel dangerous cargo manifest (or the printed PDF). The engine screens every line, shows why CDC is YES or NO against the nine 160.202 families, and writes the eNOAD cargo block for an email to the Master."
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "navy",
					className: "border border-primary-foreground/15 bg-navy-2",
					children: "Container ships only"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex gap-1 rounded-lg bg-navy-2 p-1",
				"aria-label": "Primary",
				children: [
					["manifest", "Manifest"],
					["lookup", "UN lookup"],
					["rules", "33 CFR 160.202"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onTab(id),
					className: cn("h-10 flex-1 rounded-md px-3 text-sm font-medium transition-colors duration-150 sm:flex-none sm:px-5", tab === id ? "bg-surface text-ink" : "text-primary-foreground/70 hover:text-primary-foreground"),
					children: label
				}, id))
			})]
		})
	});
}
function ManifestPanel() {
	const [parsed, setParsed] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
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
	async function onFiles(files) {
		const list = [...files].filter((f) => /\.(xlsx|xls|xlsm|pdf|csv|tsv|txt)$/i.test(f.name));
		if (list.length === 0) return;
		setProgress(null);
		setError(null);
		setCompare(null);
		try {
			const parsedList = [];
			for (let i = 0; i < Math.min(list.length, 2); i++) {
				const file = list[i];
				const isPdf = file.name.toLowerCase().endsWith(".pdf");
				setBusy(list.length > 1 ? `Reading file ${i + 1} of ${Math.min(list.length, 2)}…` : isPdf ? "Reading PDF…" : "Reading workbook…");
				const next = await ingestFile(file, (done, total) => {
					setBusy(list.length > 1 ? `File ${i + 1}: page ${done} of ${total}` : `Reading PDF page ${done} of ${total}`);
					setProgress({
						done,
						total
					});
				});
				parsedList.push(next);
			}
			const usable = parsedList.filter((p) => p.lines.length > 0);
			const preferred = selectPreferred(usable);
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
	const filtered = (0, import_react.useMemo)(() => {
		if (!result) return [];
		const needle = query.trim().toLowerCase().replace(/^un\s*/, "");
		return result.lines.filter((l) => {
			if (filter === "flagged" && l.verdict === "NOT_CDC") return false;
			if (filter === "CDC" && l.verdict !== "CDC" && l.verdict !== "CDC_RESIDUE") return false;
			if (filter === "REVIEW" && l.verdict !== "REVIEW") return false;
			if (filter === "NOT_CDC" && l.verdict !== "NOT_CDC") return false;
			if (!needle) return true;
			return [
				l.un,
				l.name,
				l.hazClass,
				l.packaging,
				l.input.container,
				l.input.booking,
				l.input.technicalName
			].filter(Boolean).join(" ").toLowerCase().includes(needle);
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-medium",
						children: "Dangerous cargo manifest"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Prefer the Excel DCM — exact pounds and the combined UN / name / class cell. Drop the printed haz-manifest with it to confirm they agree. A signed photo of the DCM cannot be read."
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
								accept: ".xlsx,.xls,.xlsm,.pdf,.csv,.tsv,.txt,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
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
								children: "Drop Excel DCM, printed haz-manifest, or both"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pointer-events-none text-xs text-muted",
								children: "Signed photo of the DCM cannot be read · CSV / TSV also accepted"
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
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, {}), "Clear"]
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
		}), result && parsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoyageBanner, { parsed }),
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
						}), filter === "all" || query || flaggedCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
		})]
	});
}
function VoyageBanner({ parsed }) {
	const v = parsed.voyage;
	const bits = [
		v.vessel,
		v.voyage,
		v.pol && v.pod ? `${v.pol} → ${v.pod}` : v.pol || v.pod,
		parsed.sourceName,
		`${parsed.lines.length} DG lines`
	].filter(Boolean);
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
					children: "Drop this voyage’s Excel DCM, the printed haz manifest, or both. A signed photo of the DCM has no text to read. You will get a Master-ready eNOAD CDC block — usually “CDC CARRIED: NO” — plus a nine-family check the Master can trust."
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
					children: "Email only — cargo lines are not stored. Drop the DCM again to re-screen."
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
								row.input.limitedQty ? " · Ltd qty" : "",
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
export { parseQuantityToKg as a, parseRowMatrix as i, coalesceVoyage as n, classFromToken as o, extractVoyage as r, normalizeUn as s, routes_exports as t };
