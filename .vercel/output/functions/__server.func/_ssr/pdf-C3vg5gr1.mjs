import { a as parseQuantityToKg, n as coalesceVoyage, o as classFromToken, s as normalizeUn } from "./routes-Dwgy1K_5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pdf-C3vg5gr1.js
var UN_TOKEN = /^UN\s+(\d{3,5})$/i;
var CLASS_TOKEN = /^(\d(?:\.\d)?)(?:\s*\(\s*(\d(?:\.\d)?)\s*\))?$/;
var PKG_TOKEN = /^(\d+(?:\.\d+)?)\s+(CARTONS?|BOXES|BOX|DRUMS?|CYLINDERS?|PALLETS?|CASES?|TOTES?|BAGS?|CANS?|PAILS?|CRATES?|PACKAGES?|TUBES?|JERRICANS?)$/i;
var CONTAINER_TOKEN = /^[A-Z]{4}\d{7}$/;
var PG_TOKEN = /^(I{1,3}|PG\s*I{1,3})$/i;
var WEIGHT_UNIT = /^(LBS?|KGS?|MT|POUNDS?|KILOGRAMS?)$/i;
var SKIP_NAME = /^(FLAMMABLE|CORROSIVE|TOXIC|OXIDIZING|MISC|LIMITED|NON-FLAMMABLE|GROUP|SUBSTANCES)/i;
var SCAN_PDF_WARNING = "This PDF is a photograph of a signed DCM — there is no text to read. Drop the Excel DCM (.xlsx) or the printed hazardous cargo manifest (the EXP023AR file), not the signed scan.";
function toUint8(data) {
	return new Uint8Array(data instanceof Uint8Array ? data : data);
}
function extractPdfVoyage(tokens) {
	const info = {};
	for (const t of tokens) {
		const pair = t.str.trim().match(/^(VESSEL|VOYAGE|PORT OF LOADING|DISCHARGE PORT|DESTINATION)\s*:\s*(.+)$/i);
		if (!pair) continue;
		const label = pair[1].toUpperCase();
		const val = pair[2].trim();
		if (label === "VESSEL") info.vessel = val;
		else if (label === "VOYAGE") info.voyage = val;
		else if (label === "PORT OF LOADING") info.pol = val;
		else if (label === "DISCHARGE PORT") info.pod = val;
		else if (label === "DESTINATION" && !info.pod) info.pod = val;
	}
	return info;
}
function lineFromUn(unTok, pageTokens, rowIndex) {
	const unMatch = unTok.str.match(UN_TOKEN);
	if (!unMatch) return null;
	const un = unMatch[1].padStart(4, "0");
	const cluster = pageTokens.filter((t) => t.y <= unTok.y + 24 && t.y >= unTok.y - 24);
	const above = cluster.filter((t) => t.y > unTok.y + 4);
	const same = cluster.filter((t) => Math.abs(t.y - unTok.y) <= 4);
	const below = cluster.filter((t) => t.y < unTok.y - 4);
	let hazClass = "";
	let subsidiary = "";
	const classCandidates = above.filter((t) => t.x >= 130 && t.x <= 260).sort((a, b) => a.x - b.x);
	for (const t of classCandidates) if (CLASS_TOKEN.test(t.str.trim())) {
		const parsed = classFromToken(t.str);
		if (parsed.primary) {
			hazClass = parsed.primary;
			subsidiary = parsed.subsidiary;
			break;
		}
	}
	const name = above.filter((t) => t.x >= 400 && t.str.length > 2 && !SKIP_NAME.test(t.str) && !/^\(/.test(t.str)).sort((a, b) => b.y - a.y || a.x - b.x)[0]?.str ?? "";
	const techTok = [...above, ...same].find((t) => t.x >= 400 && /^\(/.test(t.str));
	let quantityRaw = "";
	const sortedSame = [...same].sort((a, b) => a.x - b.x);
	for (let i = 0; i < sortedSame.length; i++) if (WEIGHT_UNIT.test(sortedSame[i].str) && i > 0 && /^-?\d/.test(sortedSame[i - 1].str)) {
		quantityRaw = `${sortedSame[i - 1].str} ${sortedSame[i].str}`;
		break;
	}
	const packaging = below.find((t) => t.x < 140 && PKG_TOKEN.test(t.str))?.str ?? "";
	const container = [...above, ...same].find((t) => CONTAINER_TOKEN.test(t.str))?.str;
	const booking = [...above, ...same].find((t) => t.x < 120 && /^\d{7,12}$/.test(t.str))?.str;
	const pg = above.find((t) => t.x >= 330 && t.x <= 420 && PG_TOKEN.test(t.str))?.str ?? "";
	const limitedQty = cluster.some((t) => /LTD\s*QTY|LIMITED QUANTIT/i.test(t.str));
	return {
		rowIndex,
		un: normalizeUn(un) || un,
		name,
		hazClass,
		subsidiary,
		packaging,
		packingGroup: pg.replace(/^PG\s*/i, ""),
		quantityKg: parseQuantityToKg(quantityRaw, "lb"),
		quantityRaw,
		raw: cluster.map((t) => t.str),
		container,
		booking,
		technicalName: techTok?.str,
		limitedQty: limitedQty || void 0
	};
}
function linesFromPdfTokens(tokens, startIndex = 0) {
	const uns = tokens.filter((t) => UN_TOKEN.test(t.str.trim()));
	const lines = [];
	uns.forEach((tok, i) => {
		const line = lineFromUn(tok, tokens, startIndex + i + 1);
		if (line) lines.push(line);
	});
	return lines;
}
async function parsePdfArrayBuffer(data, sourceName = "manifest.pdf", onProgress) {
	const pdfjs = await import("../_libs/pdfjs-dist.mjs").then((n) => n.t);
	if (typeof window !== "undefined" && !pdfjs.GlobalWorkerOptions.workerSrc) {
		const worker = await import("./pdf.worker.min-B_MS44GK.mjs");
		pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
	}
	const bytes = toUint8(data);
	const pdf = await pdfjs.getDocument({
		data: bytes,
		isEvalSupported: false,
		useSystemFonts: true,
		disableWorker: typeof window === "undefined"
	}).promise;
	const warnings = [];
	const lines = [];
	let voyage = {};
	const total = pdf.numPages;
	let textChars = 0;
	for (let n = 1; n <= total; n++) {
		const content = await (await pdf.getPage(n)).getTextContent({ includeMarkedContent: false });
		const tokens = [];
		for (const item of content.items) {
			if (!("str" in item)) continue;
			const str = String(item.str ?? "").trim();
			if (!str) continue;
			textChars += str.length;
			const tr = item.transform;
			tokens.push({
				str,
				x: Math.round(tr[4]),
				y: Math.round(tr[5])
			});
		}
		if (n === 1) voyage = extractPdfVoyage(tokens);
		const pageLines = linesFromPdfTokens(tokens, lines.length);
		lines.push(...pageLines);
		onProgress?.(n, total);
	}
	voyage = coalesceVoyage([voyage], sourceName);
	if (lines.length === 0) warnings.push(textChars < 20 ? SCAN_PDF_WARNING : "No UN numbers were found in the PDF.");
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
		voyage,
		unitGuess: "lb",
		sourceName
	};
}
//#endregion
export { parsePdfArrayBuffer };
