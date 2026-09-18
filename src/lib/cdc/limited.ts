import type { LineInput, LineResult } from "./types.ts";

type AnyLine = LineInput | LineResult;

function inputOf(line: AnyLine): LineInput {
  return "input" in line ? line.input : line;
}

const NEVER_LQ_UN =
  /^(3480|3481|3090|3091|2794|2795|310[1-9]|311[1-9]|0081|0082|0331|0332|1942|1005|1017|1079)$/;

/** Printed “Ltd Qty” / LIMITED QUANTITIES / excepted quantity — not a bare “eq”. */
export function textSaysLimitedQty(blob: string): boolean {
  return /\bltd\.?\s*qty\b|\blimited\s+quantit|\bexcepted\s+quantit|\(\s*e\.?q\.?\s*\)|\bE\.Q\.?\b/i.test(
    blob,
  );
}

function blobOf(input: LineInput): string {
  return [input.packaging, input.quantityRaw, input.name, ...(input.raw || [])].join(" ");
}

function bulkOrCylinder(pkg: string): boolean {
  return /\b(TK|TNK|TANK|TOTE|IBC|CYL(?:INDER)?S?|CY\b|PLTS?|PALLETS?|DRUMS?|DRM)\b/i.test(pkg);
}

export function hasExplicitLqMarks(lines: AnyLine[]): boolean {
  return lines.some((line) => {
    const input = inputOf(line);
    return Boolean(input.limitedQty) || textSaysLimitedQty(blobOf(input));
  });
}

/**
 * IMDG 3.4 / 49 CFR 173.27 limited (and excepted) quantity.
 * CargoMax uses the DCM Limited QTY column. Do not infer LQ for a whole
 * printed PDF just because it has no Limited QTY column.
 *
 * cartonFallback is opt-in only (default false). Production screens pass false.
 */
export function isLimitedQty(line: AnyLine, cartonFallback = false): boolean {
  const input = inputOf(line);
  if (input.limitedQty) return true;
  if (textSaysLimitedQty(blobOf(input))) return true;

  const un = (input.un || ("un" in line ? line.un : "") || "").replace(/^UN/i, "");
  const cls = (input.hazClass || ("hazClass" in line ? line.hazClass : "") || "").trim();
  const pkg = input.packaging || "";

  if (NEVER_LQ_UN.test(un)) return false;
  if (/^1/.test(cls) || /^5\.2/.test(cls) || /^6\.2/.test(cls) || /^7/.test(cls) || /^2\.3/.test(cls)) {
    return false;
  }

  // Pasha DCMs leave Limited QTY blank on many UN 1950 aerosol lines that
  // CargoMax still treats as 3.4. Other class 2 cartons are full DG unless marked.
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
