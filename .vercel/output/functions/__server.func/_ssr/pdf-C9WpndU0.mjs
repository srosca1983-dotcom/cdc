import { a as looksLikeTableDcm, c as parseExp023Text, d as normalizeUn, f as stowFromRowText, l as parseQuantityToKg, n as coalesceVoyage, o as parseTableDcmText, s as looksLikeExp023, u as classFromToken } from "./routes-CxJ4Je3u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pdf-C9WpndU0.js
function asBytes(data) {
	return data instanceof Uint8Array ? data : new Uint8Array(data);
}
function ascii(bytes, start, end) {
	const n = Math.min(end, bytes.length);
	let s = "";
	for (let i = start; i < n; i++) s += String.fromCharCode(bytes[i]);
	return s;
}
function findAll(bytes, needle) {
	const n = needle.length;
	const out = [];
	for (let i = 0; i <= bytes.length - n; i++) {
		let ok = true;
		for (let j = 0; j < n; j++) if (bytes[i + j] !== needle.charCodeAt(j)) {
			ok = false;
			break;
		}
		if (ok) out.push(i);
	}
	return out;
}
function wrapCcittTiff(data, width, height) {
	const n = 10;
	const ifd = 8;
	const dataOffset = 134;
	const buf = new Uint8Array(dataOffset + data.length);
	const view = new DataView(buf.buffer);
	buf[0] = 73;
	buf[1] = 73;
	view.setUint16(2, 42, true);
	view.setUint32(4, ifd, true);
	view.setUint16(ifd, n, true);
	const put = (i, tag, typ, count, val) => {
		const o = 10 + i * 12;
		view.setUint16(o, tag, true);
		view.setUint16(o + 2, typ, true);
		view.setUint32(o + 4, count, true);
		view.setUint32(o + 8, val, true);
	};
	put(0, 256, 4, 1, width);
	put(1, 257, 4, 1, height);
	put(2, 258, 3, 1, 1);
	put(3, 259, 3, 1, 4);
	put(4, 262, 3, 1, 0);
	put(5, 273, 4, 1, dataOffset);
	put(6, 277, 3, 1, 1);
	put(7, 278, 4, 1, height);
	put(8, 279, 4, 1, data.length);
	put(9, 266, 3, 1, 1);
	view.setUint32(130, 0, true);
	buf.set(data, dataOffset);
	return buf;
}
function streamAfter(bytes, objStart) {
	const marker = findAll(bytes.subarray(objStart, Math.min(bytes.length, objStart + 4e3)), "stream");
	if (!marker.length) return null;
	let start = objStart + marker[0] + 6;
	if (bytes[start] === 13) start++;
	if (bytes[start] === 10) start++;
	const lenM = ascii(bytes, objStart, objStart + marker[0]).match(/\/Length\s+(\d+)(?!\s+\d+\s+R)/);
	if (lenM) {
		const len = Number(lenM[1]);
		return {
			start,
			end: Math.min(bytes.length, start + len)
		};
	}
	const end = bytes.subarray(start).findIndex((_, i, arr) => {
		return i + 9 <= arr.length && ascii(arr, i, i + 9).startsWith("endstream");
	});
	if (end < 0) return null;
	let close = start + end;
	if (bytes[close - 1] === 10) close--;
	if (bytes[close - 1] === 13) close--;
	return {
		start,
		end: close
	};
}
function extractPdfRasters(data) {
	const bytes = asBytes(data);
	const hits = [...findAll(bytes, "/Subtype/Image"), ...findAll(bytes, "/Subtype /Image")].sort((a, b) => a - b);
	const out = [];
	const seen = /* @__PURE__ */ new Set();
	for (const h of hits) {
		const objStart = Math.max(0, h - 80);
		if (seen.has(objStart)) continue;
		seen.add(objStart);
		const window = ascii(bytes, objStart, objStart + 2500);
		const stream = streamAfter(bytes, objStart);
		if (!stream || stream.end <= stream.start) continue;
		const payload = bytes.subarray(stream.start, stream.end);
		const width = Number(window.match(/\/Width\s+(\d+)/)?.[1] || 0);
		const height = Number(window.match(/\/(?:Height|Rows)\s+(\d+)/)?.[1] || 0);
		if (/CCITTFaxDecode/.test(window)) {
			const cols = Number(window.match(/\/Columns\s+(\d+)/)?.[1] || width);
			const rows = Number(window.match(/\/Rows\s+(\d+)/)?.[1] || height);
			if (cols && rows && payload.length > 20) out.push({
				kind: "tiff",
				data: wrapCcittTiff(payload, cols, rows),
				width: cols,
				height: rows
			});
		} else if (/DCTDecode/.test(window) && payload[0] === 255 && payload[1] === 216) out.push({
			kind: "jpeg",
			data: payload,
			width,
			height
		});
	}
	return out;
}
var UN_TOKEN = /^UN\s+(\d{3,5})$/i;
var CLASS_TOKEN = /^(\d(?:\.\d)?)(?:\s*\(\s*(\d(?:\.\d)?)\s*\))?$/;
var PKG_TOKEN = /^(\d+(?:\.\d+)?)\s+(CARTONS?|BOXES|BOX|DRUMS?|CYLINDERS?|PALLETS?|CASES?|TOTES?|BAGS?|CANS?|PAILS?|CRATES?|PACKAGES?|TUBES?|JERRICANS?)$/i;
var CONTAINER_TOKEN = /^[A-Z]{4}\d{7}$/;
var PG_TOKEN = /^(I{1,3}|PG\s*I{1,3})$/i;
var WEIGHT_UNIT = /^(LBS?|KGS?|MT|POUNDS?|KILOGRAMS?)$/i;
var SKIP_NAME = /^(FLAMMABLE|CORROSIVE|TOXIC|OXIDIZING|MISC|LIMITED|NON-FLAMMABLE|GROUP|SUBSTANCES)/i;
var SCAN_PDF_WARNING = "This PDF is a photograph or fax of a signed DCM. If reading the scan failed, drop the Excel DCM (.xlsx) or the Word FINAL DCM (.doc).";
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
	const stowLoc = stowFromRowText(cluster.map((t) => t.str).join(" "));
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
		limitedQty: limitedQty || void 0,
		stowLoc
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
function parsedFromOcrText(text, sourceName, voyage) {
	if (!text.trim()) return null;
	if (looksLikeExp023(text)) {
		const parsed = parseExp023Text(text, sourceName);
		parsed.warnings.unshift("Read from a scanned page. Prefer the Excel DCM when you have it.");
		parsed.voyage = coalesceVoyage([parsed.voyage, voyage], sourceName);
		return parsed;
	}
	if (looksLikeTableDcm(text) || (text.match(/^\s*\d{3,5}\s+[A-Z]/gm) ?? []).length >= 3) {
		const parsed = parseTableDcmText(text, sourceName);
		if (parsed.lines.length === 0) return null;
		parsed.warnings.unshift("Read from a scanned page. Prefer the Excel DCM when you have it.");
		parsed.voyage = coalesceVoyage([parsed.voyage, voyage], sourceName);
		return parsed;
	}
	return null;
}
async function parsePdfArrayBuffer(data, sourceName = "manifest.pdf", onProgress) {
	const pdfjs = await import("../_libs/pdfjs-dist.mjs").then((n) => n.t);
	if (typeof window !== "undefined" && !pdfjs.GlobalWorkerOptions.workerSrc) {
		const worker = await import("./pdf.worker.min-B_MS44GK.mjs");
		pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
	}
	const bytes = toUint8(data);
	const pdfBytes = bytes.slice();
	const pdf = await pdfjs.getDocument({
		data: pdfBytes,
		isEvalSupported: false,
		useSystemFonts: true,
		disableWorker: typeof window === "undefined"
	}).promise;
	const warnings = [];
	const lines = [];
	let voyage = {};
	const total = pdf.numPages;
	let textChars = 0;
	const pageTexts = [];
	for (let n = 1; n <= total; n++) {
		const content = await (await pdf.getPage(n)).getTextContent({ includeMarkedContent: false });
		const tokens = [];
		const parts = [];
		for (const item of content.items) {
			if (!("str" in item)) continue;
			const str = String(item.str ?? "").trim();
			if (!str) continue;
			textChars += str.length;
			parts.push(str);
			const tr = item.transform;
			tokens.push({
				str,
				x: Math.round(tr[4]),
				y: Math.round(tr[5])
			});
		}
		pageTexts.push(parts.join("\n"));
		if (n === 1) voyage = extractPdfVoyage(tokens);
		const pageLines = linesFromPdfTokens(tokens, lines.length);
		lines.push(...pageLines);
		onProgress?.(n, total);
	}
	let extraText = pageTexts.join("\n");
	if (lines.length === 0 && extraText.trim()) {
		if (looksLikeExp023(extraText)) {
			const parsed = parseExp023Text(extraText, sourceName);
			parsed.voyage = coalesceVoyage([parsed.voyage, voyage], sourceName);
			return parsed;
		}
		if (looksLikeTableDcm(extraText)) {
			const parsed = parseTableDcmText(extraText, sourceName);
			parsed.voyage = coalesceVoyage([parsed.voyage, voyage], sourceName);
			return parsed;
		}
	}
	if (lines.length === 0 && textChars < 20) try {
		const rasters = extractPdfRasters(bytes).filter((r) => {
			if (r.kind === "tiff") return true;
			return Boolean(r.width && r.height && r.width >= r.height);
		});
		if (rasters.length > 0) {
			onProgress?.(0, rasters.length);
			const { ocrRaster } = await import("./ocr-CNAPZAD7.mjs");
			const ocrParts = [];
			const pagesToRead = Math.min(rasters.length, 8);
			for (let i = 0; i < pagesToRead; i++) {
				ocrParts.push(await ocrRaster(rasters[i]));
				onProgress?.(i + 1, pagesToRead);
			}
			const ocrHit = parsedFromOcrText(ocrParts.join("\n"), sourceName, voyage);
			if (ocrHit) return ocrHit;
		} else if (typeof document !== "undefined") {
			onProgress?.(0, total);
			const { ocrCanvas, renderPdfPageToCanvas } = await import("./ocr-CNAPZAD7.mjs");
			const ocrParts = [];
			const pagesToRead = Math.min(total, 8);
			for (let n = 1; n <= pagesToRead; n++) {
				const canvas = await renderPdfPageToCanvas(await pdf.getPage(n), 1.6);
				ocrParts.push(await ocrCanvas(canvas));
				onProgress?.(n, pagesToRead);
			}
			const ocrHit = parsedFromOcrText(ocrParts.join("\n"), sourceName, voyage);
			if (ocrHit) return ocrHit;
		}
	} catch (err) {
		warnings.push(`${SCAN_PDF_WARNING} (${err instanceof Error ? err.message : "OCR failed"})`);
	}
	voyage = coalesceVoyage([voyage], sourceName);
	if (lines.length === 0 && !warnings.length) warnings.push(textChars < 20 ? SCAN_PDF_WARNING : "No UN numbers were found in the PDF.");
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
