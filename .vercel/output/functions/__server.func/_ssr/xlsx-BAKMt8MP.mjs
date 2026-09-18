import { i as parseRowMatrix, n as coalesceVoyage, r as extractVoyage } from "./routes-CxJ4Je3u.mjs";
import { n as utils, t as readSync } from "../_libs/xlsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/xlsx-BAKMt8MP.js
var SKIP_SHEET = /^(data|shp\s*emg|shipper|emergency|lookup|codes|ref)$/i;
var HEADER_SHEET = /header/i;
var CARGO_SHEET = /^(dcm|manifest|haz|dg|cargo)/i;
function sheetRows(ws) {
	return utils.sheet_to_json(ws, {
		header: 1,
		defval: "",
		raw: false,
		blankrows: false
	}).map((row) => row.map((c) => String(c ?? "").trim()));
}
function countUnRows(rows) {
	return rows.filter((r) => r.some((c) => /\b(?:UN|NA)\s*\d{3,5}\b/i.test(c))).length;
}
function parseXlsxArrayBuffer(data, sourceName = "manifest.xlsx") {
	const bytes = data instanceof Uint8Array ? new Uint8Array(data) : new Uint8Array(data);
	const wb = readSync(bytes, {
		type: "array",
		raw: false,
		cellDates: true
	});
	if (!wb.SheetNames.length) return {
		header: [],
		lines: [],
		warnings: ["Workbook has no sheets."],
		delimiter: "xlsx",
		voyage: {},
		unitGuess: "lb",
		sourceName
	};
	let headerVoyage = {};
	const cargoCandidates = [];
	for (const name of wb.SheetNames) {
		const ws = wb.Sheets[name];
		if (!ws) continue;
		const rows = sheetRows(ws);
		if (HEADER_SHEET.test(name)) {
			headerVoyage = extractVoyage(rows);
			continue;
		}
		if (SKIP_SHEET.test(name.trim())) continue;
		cargoCandidates.push({
			name,
			rows
		});
	}
	if (cargoCandidates.length === 0) {
		const first = wb.SheetNames[0];
		cargoCandidates.push({
			name: first,
			rows: sheetRows(wb.Sheets[first])
		});
	}
	cargoCandidates.sort((a, b) => {
		const aPref = CARGO_SHEET.test(a.name) ? 1 : 0;
		const bPref = CARGO_SHEET.test(b.name) ? 1 : 0;
		if (aPref !== bPref) return bPref - aPref;
		return countUnRows(b.rows) - countUnRows(a.rows);
	});
	const chosen = cargoCandidates[0];
	const cargoVoyage = extractVoyage(chosen.rows);
	const voyage = coalesceVoyage([cargoVoyage, headerVoyage], sourceName);
	const parsed = parseRowMatrix(chosen.rows, "lb");
	parsed.delimiter = "xlsx";
	parsed.voyage = voyage;
	parsed.sourceName = sourceName;
	if (parsed.lines.length === 0) parsed.warnings.push(`Sheet “${chosen.name}” had no UN/NA cargo rows.`);
	return parsed;
}
//#endregion
export { parseXlsxArrayBuffer };
