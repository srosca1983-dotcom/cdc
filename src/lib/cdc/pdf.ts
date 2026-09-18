import { classFromToken, normalizeUn } from "./imdg.ts";
import { coalesceVoyage } from "./parse.ts";
import { parseQuantityToKg } from "./quantity.ts";
import type { LineInput, ParseResult, VoyageInfo } from "./types.ts";

export interface PdfToken {
  str: string;
  x: number;
  y: number;
}

const UN_TOKEN = /^UN\s+(\d{3,5})$/i;
const CLASS_TOKEN = /^(\d(?:\.\d)?)(?:\s*\(\s*(\d(?:\.\d)?)\s*\))?$/;
const PKG_TOKEN =
  /^(\d+(?:\.\d+)?)\s+(CARTONS?|BOXES|BOX|DRUMS?|CYLINDERS?|PALLETS?|CASES?|TOTES?|BAGS?|CANS?|PAILS?|CRATES?|PACKAGES?|TUBES?|JERRICANS?)$/i;
const CONTAINER_TOKEN = /^[A-Z]{4}\d{7}$/;
const PG_TOKEN = /^(I{1,3}|PG\s*I{1,3})$/i;
const WEIGHT_UNIT = /^(LBS?|KGS?|MT|POUNDS?|KILOGRAMS?)$/i;
const SKIP_NAME = /^(FLAMMABLE|CORROSIVE|TOXIC|OXIDIZING|MISC|LIMITED|NON-FLAMMABLE|GROUP|SUBSTANCES)/i;

export const SCAN_PDF_WARNING =
  "This PDF is a photograph of a signed DCM — there is no text to read. Drop the Excel DCM (.xlsx) or the printed hazardous cargo manifest (the EXP023AR file), not the signed scan.";

function toUint8(data: ArrayBuffer | Uint8Array): Uint8Array {
  return new Uint8Array(data instanceof Uint8Array ? data : data);
}

export function extractPdfVoyage(tokens: PdfToken[]): VoyageInfo {
  const info: VoyageInfo = {};
  for (const t of tokens) {
    const s = t.str.trim();
    const pair = s.match(
      /^(VESSEL|VOYAGE|PORT OF LOADING|DISCHARGE PORT|DESTINATION)\s*:\s*(.+)$/i,
    );
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

function lineFromUn(unTok: PdfToken, pageTokens: PdfToken[], rowIndex: number): LineInput | null {
  const unMatch = unTok.str.match(UN_TOKEN);
  if (!unMatch) return null;
  const un = unMatch[1].padStart(4, "0");
  const cluster = pageTokens.filter((t) => t.y <= unTok.y + 24 && t.y >= unTok.y - 24);
  const above = cluster.filter((t) => t.y > unTok.y + 4);
  const same = cluster.filter((t) => Math.abs(t.y - unTok.y) <= 4);
  const below = cluster.filter((t) => t.y < unTok.y - 4);

  let hazClass = "";
  let subsidiary = "";
  const classCandidates = above
    .filter((t) => t.x >= 130 && t.x <= 260)
    .sort((a, b) => a.x - b.x);
  for (const t of classCandidates) {
    if (CLASS_TOKEN.test(t.str.trim())) {
      const parsed = classFromToken(t.str);
      if (parsed.primary) {
        hazClass = parsed.primary;
        subsidiary = parsed.subsidiary;
        break;
      }
    }
  }

  const nameTok = above
    .filter((t) => t.x >= 400 && t.str.length > 2 && !SKIP_NAME.test(t.str) && !/^\(/.test(t.str))
    .sort((a, b) => b.y - a.y || a.x - b.x)[0];
  const name = nameTok?.str ?? "";

  const techTok = [...above, ...same].find((t) => t.x >= 400 && /^\(/.test(t.str));

  let quantityRaw = "";
  const sortedSame = [...same].sort((a, b) => a.x - b.x);
  for (let i = 0; i < sortedSame.length; i++) {
    if (WEIGHT_UNIT.test(sortedSame[i].str) && i > 0 && /^-?\d/.test(sortedSame[i - 1].str)) {
      quantityRaw = `${sortedSame[i - 1].str} ${sortedSame[i].str}`;
      break;
    }
  }

  const pkgTok = below.find((t) => t.x < 140 && PKG_TOKEN.test(t.str));
  const packaging = pkgTok?.str ?? "";
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
    limitedQty: limitedQty || undefined,
  };
}

export function linesFromPdfTokens(tokens: PdfToken[], startIndex = 0): LineInput[] {
  const uns = tokens.filter((t) => UN_TOKEN.test(t.str.trim()));
  const lines: LineInput[] = [];
  uns.forEach((tok, i) => {
    const line = lineFromUn(tok, tokens, startIndex + i + 1);
    if (line) lines.push(line);
  });
  return lines;
}

export async function parsePdfArrayBuffer(
  data: ArrayBuffer | Uint8Array,
  sourceName = "manifest.pdf",
  onProgress?: (done: number, total: number) => void,
): Promise<ParseResult> {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  if (typeof window !== "undefined" && !pdfjs.GlobalWorkerOptions.workerSrc) {
    const worker = await import("pdfjs-dist/legacy/build/pdf.worker.min.mjs?url");
    pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  }
  const bytes = toUint8(data);
  const pdf = await pdfjs.getDocument({
    data: bytes,
    isEvalSupported: false,
    useSystemFonts: true,
    disableWorker: typeof window === "undefined",
  } as Parameters<typeof pdfjs.getDocument>[0]).promise;

  const warnings: string[] = [];
  const lines: LineInput[] = [];
  let voyage: VoyageInfo = {};
  const total = pdf.numPages;
  let textChars = 0;

  for (let n = 1; n <= total; n++) {
    const page = await pdf.getPage(n);
    const content = await page.getTextContent({ includeMarkedContent: false });
    const tokens: PdfToken[] = [];
    for (const item of content.items) {
      if (!("str" in item)) continue;
      const str = String(item.str ?? "").trim();
      if (!str) continue;
      textChars += str.length;
      const tr = item.transform;
      tokens.push({
        str,
        x: Math.round(tr[4]),
        y: Math.round(tr[5]),
      });
    }
    if (n === 1) voyage = extractPdfVoyage(tokens);
    const pageLines = linesFromPdfTokens(tokens, lines.length);
    lines.push(...pageLines);
    onProgress?.(n, total);
  }

  voyage = coalesceVoyage([voyage], sourceName);

  if (lines.length === 0) {
    warnings.push(textChars < 20 ? SCAN_PDF_WARNING : "No UN numbers were found in the PDF.");
  }

  return {
    header: ["UN", "Proper Shipping Name", "Class", "Packaging", "Weight"],
    lines,
    warnings,
    delimiter: "pdf",
    voyage,
    unitGuess: "lb",
    sourceName,
  };
}
