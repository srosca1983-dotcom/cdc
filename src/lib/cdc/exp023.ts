import { classFromToken, normalizeUn } from "./imdg.ts";
import { parseQuantityToKg } from "./quantity.ts";
import type { LineInput, ParseResult, VoyageInfo } from "./types.ts";

const UN_IN_LINE = /\bUN\s+(\d{3,5})\b/i;
const CONTAINER_RE = /\b([A-Z]{4}\d{7})\b/;
const PKG_RE =
  /^(\d+(?:,\d{3})*(?:\.\d+)?)\s+(CARTONS?|BOXES|BOX|DRUMS?|CYLINDERS?|CYL|PALLETS?|CASES?|TOTES?|BAGS?|CANS?|PAILS?|CRATES?|PACKAGES?|TUBES?|JERRICANS?|TANKS?|IBCS?)\b/i;
const WEIGHT_RE = /(\d+(?:,\d{3})*(?:\.\d+)?)\s+(LBS?|KGS?|POUNDS?|KILOGRAMS?|MT)\b/i;
const SKIP_NEAR =
  /^(ACCURATE AND COMPLETE|PREPARER:|MASTER:|EXP023AR|PAGE\s+\d|VESSEL:|VOYAGE:|COUNTRY OF|RADIO CALL|PORT OF LOADING|DISCHARGE PORT|DESTINATION:|<<<|GRAND TOTAL|END\s+OF\s+REPORT|CONTAINER\s+NET WEIGH|BOOKING\s+GROSS|SAID TO CONTAIN|STOWAGE|REMARKS|CAT A$)/i;
const LABEL_NAME =
  /^(FLAMMABLE|CORROSIVE|TOXIC|OXIDIZING|MISC|LIMITED|NON-FLAMMABLE|GROUP|SUBSTANCES|DANGEROUS WHEN WET|MARINE POLLUTANT)/i;

export function looksLikeExp023(text: string): boolean {
  const t = text.slice(0, 8000);
  return /EXP023AR|HAZARDOUS CARGO MANIFEST BY POD/i.test(t) && UN_IN_LINE.test(text);
}

function nearby(lines: string[], i: number, dir: 1 | -1, max = 8): string[] {
  const out: string[] = [];
  for (let j = i + dir; j >= 0 && j < lines.length && out.length < max; j += dir) {
    const t = lines[j].trim();
    if (!t) continue;
    if (/^-{8,}$/.test(t)) break;
    if (SKIP_NEAR.test(t)) continue;
    out.push(t);
  }
  return out;
}

function parseContainerLine(s: string): {
  container: string;
  hazClass: string;
  subsidiary: string;
  packingGroup: string;
  name: string;
} | null {
  const cm = s.match(
    /^([A-Z]{4}\d{7})\s+(\d(?:\.\d)?(?:\s*\(\s*\d(?:\.\d)?\s*\))?)\s+(.*)$/,
  );
  if (!cm) return null;
  const parsed = classFromToken(cm[2]);
  const rest = cm[3].trim();
  const restM = rest.match(/^(?:(\d{6,8})\s+)?(?:(I{1,3})\s+)?(.+)$/);
  const name = (restM?.[3] ?? rest).trim();
  if (LABEL_NAME.test(name)) return { container: cm[1], hazClass: parsed.primary, subsidiary: parsed.subsidiary, packingGroup: restM?.[2] ?? "", name: "" };
  return {
    container: cm[1],
    hazClass: parsed.primary,
    subsidiary: parsed.subsidiary,
    packingGroup: restM?.[2] ?? "",
    name,
  };
}

export function linesFromExp023Text(text: string): LineInput[] {
  const rows = text.split(/\r?\n/);
  const lines: LineInput[] = [];
  for (let i = 0; i < rows.length; i++) {
    const unm = rows[i].match(UN_IN_LINE);
    if (!unm) continue;
    const un = normalizeUn(unm[1]) || unm[1].padStart(4, "0");
    const cur = rows[i];
    const above = nearby(rows, i, -1);
    const below = nearby(rows, i, 1);

    let meta: ReturnType<typeof parseContainerLine> = null;
    for (const a of above) {
      meta = parseContainerLine(a);
      if (meta) break;
      const cOnly = a.match(CONTAINER_RE);
      if (cOnly && !meta) {
        meta = { container: cOnly[1], hazClass: "", subsidiary: "", packingGroup: "", name: "" };
      }
    }

    const wm = cur.match(WEIGHT_RE);
    const quantityRaw = wm ? `${wm[1]} ${wm[2]}` : "";
    const booking = cur.match(/^\s*(\d{7,12})\b/)?.[1];
    const tech = cur.match(/\(([^)]+)\)/)?.[0];

    let packaging = "";
    for (const b of below) {
      if (PKG_RE.test(b.trim())) {
        packaging = b.trim().match(PKG_RE)?.[0] ?? b.trim();
        break;
      }
    }

    const windowText = [cur, ...above, ...below].join("\n");
    const limitedQty = /LTD\s*QTY|LIMITED QUANTIT/i.test(windowText);

    let name = meta?.name ?? "";
    if (name && /N\.O\.S\.?\s*$/i.test(name)) {
      const nos = cur.match(/\bN\.O\.S\.?\b/i);
      if (nos && !/N\.O\.S/i.test(name)) name = `${name} N.O.S.`;
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
      raw: [above[0] ?? "", cur.trim(), below[0] ?? ""].filter(Boolean),
      container: meta?.container,
      booking,
      technicalName: tech,
      limitedQty: limitedQty || undefined,
    });
  }
  return lines;
}

export function voyageFromExp023(text: string): VoyageInfo {
  const info: VoyageInfo = {};
  const grab = (label: string) => {
    const m = text.match(new RegExp(`^\\s*${label}\\s*:\\s*(.+)$`, "im"));
    return m?.[1]?.trim();
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

export function parseExp023Text(text: string, sourceName = "manifest.doc"): ParseResult {
  const lines = linesFromExp023Text(text);
  const warnings: string[] = [];
  if (lines.length === 0) warnings.push("No UN numbers were found in the hazardous cargo manifest.");
  return {
    header: ["UN", "Proper Shipping Name", "Class", "Packaging", "Weight"],
    lines,
    warnings,
    delimiter: "pdf",
    voyage: voyageFromExp023(text),
    unitGuess: "lb",
    sourceName,
  };
}
