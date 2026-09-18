import type { LineInput, ParseResult, QtyUnit, VoyageInfo } from "./types.ts";
import { parseQuantityToKg } from "./quantity.ts";
import {
  looksLikeCombinedHazmat,
  normalizeUn,
  parseCombinedHazmat,
  parseHazardClass,
} from "./imdg.ts";

const UN_ALIASES = [
  /^un\/?na$/,
  /^un\s*(no|num|number|#)?$/,
  /^undg$/,
  /^un\s*code$/,
  /^na\s*(no|num|number)?$/,
  /^imo\s*un$/,
  /un\/?na\s*no.*ship/,
];
const NAME_ALIASES = [
  /proper\s*ship/,
  /\bpsn\b/,
  /shipping\s*name/,
  /^description$/,
  /commodity/,
  /cargo\s*name/,
  /goods\s*name/,
];
const CLASS_ALIASES = [
  /haz(ard)?\s*class/,
  /imo\s*class/,
  /imd?g\s*class/,
  /class\s*(no|num|#)?$/,
  /^class$/,
  /^div(ision)?$/,
  /primary\s*class/,
];
const PKG_ALIASES = [
  /packag(e|ing)?\s*(type|desc)?/,
  /^pkg$/,
  /pack\s*type/,
  /type\s*of\s*pack/,
  /^package$/,
];
const QTY_ALIASES = [
  /weight\s*lbs?/,
  /net\s*(wt|weight|qty|mass|kgs?)?/,
  /quantity/,
  /^kgs?$/,
  /^lbs?$/,
  /weight\s*(kg|kgs|net)?/,
  /gross\s*(wt|weight|kgs?)?/,
  /^mass$/,
  /qty\s*(kg|kgs|mt)?/,
];
const PG_ALIASES = [/pack(ing)?\s*group/, /^pg$/];
const SUB_ALIASES = [/subsid/, /sub\s*risk/, /secondary\s*(class|risk)/, /sub\s*haz/];
const CONTAINER_ALIASES = [/^container$/, /^cntr$/, /^unit\s*no/];
const BOOKING_ALIASES = [/^booking$/, /^bkg$/];
const TECH_ALIASES = [/technical\s*name/, /tech\s*name/];
const LTD_ALIASES = [/limited\s*q/, /ltd\s*qty/, /^lq$/, /limit(ed)?\s*quant/];

function scoreAliases(cell: string, aliases: RegExp[]): number {
  const c = cell.toLowerCase().replace(/[_./]+/g, " ").trim();
  for (let i = 0; i < aliases.length; i++) {
    if (aliases[i].test(c)) return 100 - i;
  }
  return 0;
}

function bestCol(header: string[], aliases: RegExp[]): number {
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

function detectDelimiter(text: string): "tab" | "comma" | "semicolon" {
  const first = text.split(/\r?\n/).find((l) => l.trim()) ?? "";
  const tabs = (first.match(/\t/g) ?? []).length;
  const semis = (first.match(/;/g) ?? []).length;
  const commas = (first.match(/,/g) ?? []).length;
  if (tabs >= 2 || (tabs > 0 && tabs >= commas)) return "tab";
  if (semis > commas && semis >= 2) return "semicolon";
  return "comma";
}

function splitCsvLine(line: string, delimiter: string): string[] {
  if (delimiter === "tab") return line.split("\t").map((c) => c.trim());
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === delimiter && !inQuotes) {
      out.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur.trim());
  return out;
}

export function looksLikeHeader(cells: string[]): boolean {
  const joined = cells.join(" ").toUpperCase();
  return (
    /UN\/?NA/.test(joined) ||
    /PROPER\s*SHIP/.test(joined) ||
    /HAZ(ARD)?\s*CLASS/.test(joined) ||
    /SHIPPING\s*NAME/.test(joined) ||
    /UNDG/.test(joined) ||
    cells.some((c) => scoreAliases(c, UN_ALIASES) > 0)
  );
}

interface ColMap {
  unCol: number;
  nameCol: number;
  hazCol: number;
  pkgCol: number;
  qtyCol: number;
  pgCol: number;
  subCol: number;
  containerCol: number;
  bookingCol: number;
  techCol: number;
  ltdCol: number;
}

function at(row: string[], i: number): string {
  return i >= 0 && i < row.length ? (row[i] ?? "").trim() : "";
}

function buildLine(row: string[], rowIndex: number, cols: ColMap, unitGuess: QtyUnit): LineInput | null {
  const rawUnCell = at(row, cols.unCol);
  let combined = looksLikeCombinedHazmat(rawUnCell) ? parseCombinedHazmat(rawUnCell) : null;
  if (!combined) {
    for (const c of row) {
      if (looksLikeCombinedHazmat(c)) {
        combined = parseCombinedHazmat(c);
        if (combined?.un) break;
      }
    }
  }

  const un = combined?.un || normalizeUn(rawUnCell);
  if (!un) return null;

  const nameFromCol = cols.nameCol !== cols.unCol ? at(row, cols.nameCol) : "";
  const classFromCol = cols.hazCol !== cols.unCol ? at(row, cols.hazCol) : "";
  const parsedClass = parseHazardClass(classFromCol);
  const subFromCol = at(row, cols.subCol);
  const ltdRaw = at(row, cols.ltdCol);
  const limitedQty =
    /^(y|yes|ltd|lq|true|x|1)$/i.test(ltdRaw) || /ltd/i.test(ltdRaw) || undefined;

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
    container: at(row, cols.containerCol) || undefined,
    booking: at(row, cols.bookingCol) || undefined,
    technicalName: at(row, cols.techCol) || undefined,
    limitedQty: limitedQty || undefined,
  };
}

export function parseRowMatrix(rawRows: string[][], defaultQtyUnit: QtyUnit = "kg"): ParseResult {
  const warnings: string[] = [];
  const voyage = extractVoyage(rawRows);

  if (rawRows.length === 0) {
    return {
      header: [],
      lines: [],
      warnings: ["No rows found."],
      delimiter: "tab",
      voyage,
      unitGuess: defaultQtyUnit,
    };
  }

  let headerIdx = -1;
  for (let i = 0; i < Math.min(rawRows.length, 16); i++) {
    if (looksLikeHeader(rawRows[i])) {
      headerIdx = i;
      break;
    }
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
  if (nameCol === unCol || nameCol === hazCol) {
    nameCol = isCombined ? techCol : nameCol === 1 ? 1 : -1;
  }

  const cols: ColMap = {
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
  };
  const start = headerIdx >= 0 ? headerIdx + 1 : 0;
  const lines: LineInput[] = [];

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
    header: header.length ? header : ["UN/NA", "Proper Shipping Name", "HAZ Class", "Packaging"],
    lines,
    warnings,
    delimiter: "tab",
    voyage,
    unitGuess,
  };
}

const VOYAGE_LABELS: Array<[RegExp, keyof VoyageInfo]> = [
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
  [/^date\s*of\s*loading:?$/i, "date"],
];

function matchVoyageLabel(raw: string): keyof VoyageInfo | null {
  const t = raw.trim();
  if (!t) return null;
  for (const [re, key] of VOYAGE_LABELS) {
    if (re.test(t) || re.test(`${t}:`)) return key;
  }
  return null;
}

function cleanVoyageVal(v: string): string {
  return v.replace(/\s+/g, " ").replace(/^NULL$/i, "").trim();
}

export function extractVoyage(rows: string[][]): VoyageInfo {
  const info: VoyageInfo = {};
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

export function vesselQuality(v?: string): number {
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

export function voyageQuality(v?: string): number {
  const s = (v ?? "").trim();
  if (!s) return 0;
  if (/^\d{2,3}[A-Z]$/i.test(s)) return 100;
  if (/^g2\d{3}[A-Z]$/i.test(s)) return 80;
  if (/^g\d$/i.test(s)) return 20;
  if (/george|hawaii|horizon/i.test(s)) return 5;
  return 30;
}

/** G2068W / G2069W → 068W / 069W */
export function normalizeVoyageCode(v: string): string {
  const g = v.trim().match(/^G2(\d{3}[A-Z])$/i);
  if (g) return g[1].toUpperCase();
  return v.trim();
}

export function voyageFromFilename(name: string): VoyageInfo {
  const n = name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
  const info: VoyageInfo = {};
  if (/george\s*ii/i.test(n)) info.vessel = "GEORGE II";
  const g2 = n.match(/\bG2(\d{3}[A-Z])\b/i);
  if (g2) info.voyage = g2[1].toUpperCase();
  else {
    const v = n.match(/\b(\d{2,3}[A-Z])\b/i);
    if (v) info.voyage = v[1].toUpperCase();
  }
  return info;
}

export function repairVoyage(info: VoyageInfo): VoyageInfo {
  const out: VoyageInfo = { ...info };
  if (out.voyage) out.voyage = normalizeVoyageCode(out.voyage);

  if (out.vessel && /^G2\d{3}[A-Z]$/i.test(out.vessel)) {
    const asVoyage = normalizeVoyageCode(out.vessel);
    if (!out.voyage || voyageQuality(asVoyage) >= voyageQuality(out.voyage)) out.voyage = asVoyage;
    if (vesselQuality(out.vessel) < 50) delete out.vessel;
  }

  if (out.vessel && /^\d{2,3}[A-Z]$/i.test(out.vessel)) {
    const asVoyage = out.vessel.toUpperCase();
    if (!out.voyage || /^g\d$/i.test(out.voyage) || /george|hawaii|horizon|pasha/i.test(out.voyage)) {
      if (out.voyage && /[A-Za-z]{3,}/.test(out.voyage) && vesselQuality(out.voyage) >= 70) {
        out.vessel = out.voyage;
      } else {
        delete out.vessel;
      }
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

export function pickVoyage(...candidates: VoyageInfo[]): VoyageInfo {
  const out: VoyageInfo = {};
  const keys: (keyof VoyageInfo)[] = ["vessel", "voyage", "pol", "pod", "date", "officialNumber", "company"];
  for (const key of keys) {
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

export function coalesceVoyage(parts: VoyageInfo[], filename?: string): VoyageInfo {
  const fromFile = filename ? voyageFromFilename(filename) : {};
  return pickVoyage(...parts, fromFile);
}

export function parseManifest(text: string, defaultQtyUnit: QtyUnit = "kg"): ParseResult {
  const trimmed = text.replace(/^\uFEFF/, "").trim();
  if (!trimmed) {
    return {
      header: [],
      lines: [],
      warnings: ["No text to parse."],
      delimiter: "tab",
      voyage: {},
      unitGuess: defaultQtyUnit,
    };
  }
  const delimiter = detectDelimiter(trimmed);
  const delimChar = delimiter === "tab" ? "\t" : delimiter === "semicolon" ? ";" : ",";
  const rawRows = trimmed
    .split(/\r?\n/)
    .map((l) => splitCsvLine(l, delimChar))
    .filter((r) => r.some((c) => c.length > 0));
  const parsed = parseRowMatrix(rawRows, defaultQtyUnit);
  parsed.delimiter = delimiter;
  return parsed;
}
