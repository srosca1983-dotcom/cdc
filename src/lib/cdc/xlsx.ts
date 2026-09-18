import * as XLSX from "xlsx";
import { coalesceVoyage, extractVoyage, parseRowMatrix } from "./parse.ts";
import type { ParseResult, VoyageInfo } from "./types.ts";

const SKIP_SHEET = /^(data|shp\s*emg|shipper|emergency|lookup|codes|ref)$/i;
const HEADER_SHEET = /header/i;
const CARGO_SHEET = /^(dcm|manifest|haz|dg|cargo)/i;

function sheetRows(ws: XLSX.WorkSheet): string[][] {
  const rows = XLSX.utils.sheet_to_json(ws, {
    header: 1,
    defval: "",
    raw: false,
    blankrows: false,
  }) as unknown[][];
  return rows.map((row) => row.map((c) => String(c ?? "").trim()));
}

function countUnRows(rows: string[][]): number {
  return rows.filter((r) => r.some((c) => /\b(?:UN|NA)\s*\d{3,5}\b/i.test(c))).length;
}

export function parseXlsxArrayBuffer(data: ArrayBuffer | Uint8Array, sourceName = "manifest.xlsx"): ParseResult {
  const bytes = data instanceof Uint8Array ? new Uint8Array(data) : new Uint8Array(data);
  const wb = XLSX.read(bytes, { type: "array", raw: false, cellDates: true });
  if (!wb.SheetNames.length) {
    return {
      header: [],
      lines: [],
      warnings: ["Workbook has no sheets."],
      delimiter: "xlsx",
      voyage: {},
      unitGuess: "lb",
      sourceName,
    };
  }

  let headerVoyage: VoyageInfo = {};
  const cargoCandidates: { name: string; rows: string[][] }[] = [];

  for (const name of wb.SheetNames) {
    const ws = wb.Sheets[name];
    if (!ws) continue;
    const rows = sheetRows(ws);
    if (HEADER_SHEET.test(name)) {
      headerVoyage = extractVoyage(rows);
      continue;
    }
    if (SKIP_SHEET.test(name.trim())) continue;
    cargoCandidates.push({ name, rows });
  }

  if (cargoCandidates.length === 0) {
    const first = wb.SheetNames[0];
    cargoCandidates.push({ name: first, rows: sheetRows(wb.Sheets[first]) });
  }

  cargoCandidates.sort((a, b) => {
    const aPref = CARGO_SHEET.test(a.name) ? 1 : 0;
    const bPref = CARGO_SHEET.test(b.name) ? 1 : 0;
    if (aPref !== bPref) return bPref - aPref;
    return countUnRows(b.rows) - countUnRows(a.rows);
  });

  const chosen = cargoCandidates[0];
  const cargoVoyage = extractVoyage(chosen.rows);
  // Cargo sheet (GEORGE II / 068W) beats header sheet (G2 / G2068W).
  const voyage = coalesceVoyage([cargoVoyage, headerVoyage], sourceName);

  const parsed = parseRowMatrix(chosen.rows, "lb");
  parsed.delimiter = "xlsx";
  parsed.voyage = voyage;
  parsed.sourceName = sourceName;
  if (parsed.lines.length === 0) {
    parsed.warnings.push(`Sheet “${chosen.name}” had no UN/NA cargo rows.`);
  }
  return parsed;
}
