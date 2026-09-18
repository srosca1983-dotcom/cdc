import { lookupUn, resolveOcrUn } from "./catalog.ts";
import { classFromToken, normalizeUn } from "./imdg.ts";
import { parseQuantityToKg } from "./quantity.ts";
import { stowFromRowText } from "../ship/stow.ts";
import type { LineInput, ParseResult, VoyageInfo } from "./types.ts";

const HEADERISH = /UN\/?NA|PROPER\s*SHIPPING|HAZ\s*CLASS|WEIGHT\s*\(POUNDS\)/i;
const PKG_WORD =
  /\b(TANK|PALLET|PALLETS|BOX|BOXES|80X|8OX|B0X|CYL|CYLINDER|CYLINDERS|CARTON|CARTONS|DRUM|DRUMS|BAG|BAGS|TOTE|IBC|PACKAGE|PACKAGES)\b/i;

export function looksLikeTableDcm(text: string): boolean {
  if ((text.match(/\t/g) ?? []).length >= 2) return false;
  const head = text.slice(0, 3000);
  const formHeader =
    /UN\/?NA/i.test(head) ||
    /Weight\s*\(\s*Pounds\s*\)/i.test(head) ||
    /Packg\s*Group/i.test(head) ||
    /STOW\s*Loc/i.test(head) ||
    /DCM\s+G2\d{3}[A-Z]/i.test(head);
  if (!formHeader) return false;
  const bare = (text.match(/^\s*\d{3,5}\s+[A-Z]/gm) ?? []).length;
  return bare >= 3;
}

export function voyageFromTableDcm(text: string): VoyageInfo {
  const info: VoyageInfo = {};
  const grab = (label: string) => {
    const m = text.match(new RegExp(`${label}\\s*:\\s*([^\\n]+)`, "i"));
    return m?.[1]?.trim().split(/\s{2,}/)[0]?.trim();
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

function normalizeOcrClass(raw: string): string {
  const t = raw.replace(",", ".").trim();
  if (/^2[123]$/.test(t)) return `2.${t[1]}`;
  if (/^4[123]$/.test(t)) return `4.${t[1]}`;
  if (/^5[1]$/.test(t)) return "5.1";
  if (/^6[1]$/.test(t)) return "6.1";
  if (/^1\.[125]$/.test(t)) return t;
  return classFromToken(t).primary || t;
}

function normalizeOcrPkg(raw: string): string {
  const t = raw.toUpperCase();
  if (/80X|8OX|B0X/.test(t)) return "BOX";
  return t;
}

function looksLikeCargoRow(t: string): boolean {
  if (!/^\d{3,5}\s+[A-Z]/.test(t)) return false;
  if (PKG_WORD.test(t)) return true;
  if (
    /\b(AMMONIA|BATTER|LITHIUM|PETROLEUM|FLAMMABLE|CORROSIVE|TOXIC|AEROSOL|PAINT|ACID|GAS|SOLUTION|OXIDE|NITRATE)\b/i.test(
      t,
    )
  ) {
    return true;
  }
  const un = t.match(/^(\d{3,5})/)?.[1]?.padStart(4, "0");
  return Boolean(un && lookupUn(un));
}

function parseTableLine(raw: string, rowIndex: number): LineInput | null {
  const t = raw.replace(/\s+/g, " ").trim();
  const m = t.match(/^(\d{3,5})\s+(.+)$/);
  if (!m) return null;
  let un = normalizeUn(m[1]) || m[1].padStart(4, "0");
  const rest = m[2];

  const pkgM = rest.match(PKG_WORD);
  const packaging = pkgM ? normalizeOcrPkg(pkgM[0]) : "";
  const beforePkg = pkgM && pkgM.index !== undefined ? rest.slice(0, pkgM.index).trim() : rest;

  const classM = beforePkg.match(/\s(\d(?:[.,]\d)?|\d{2})(?:\s+(I{1,3}|[123](?!\d)))?(?:\s|$)/);
  let hazClass = "";
  let packingGroup = "";
  let name = beforePkg;
  let afterClass = beforePkg;
  if (classM && classM.index !== undefined) {
    hazClass = normalizeOcrClass(classM[1]);
    const pgRaw = (classM[2] ?? "").toUpperCase();
    packingGroup = pgRaw === "1" ? "I" : pgRaw === "2" ? "II" : pgRaw === "3" ? "III" : pgRaw;
    name = beforePkg.slice(0, classM.index).replace(/\/\s*$/, "").trim();
    afterClass = beforePkg.slice(classM.index + classM[0].length).trim();
  }

  un = resolveOcrUn(un, name);
  const cat = lookupUn(un);
  if (cat?.cls && hazClass !== cat.cls) {
    const close = hazClass === cat.cls.replace(".", "") || cat.cls.startsWith(hazClass);
    if (!close) hazClass = cat.cls;
  }
  if (/LITHIUM/i.test(name) && !/^9/.test(hazClass)) hazClass = "9";

  const nums = [...afterClass.matchAll(/(\d{1,3}(?:,\d{3})+|\d{2,6})(?:\.\d+)?/g)].map((x) =>
    Number(x[1].replace(/,/g, "")),
  );
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
    limitedQty: limitedQty || undefined,
    container,
    stowLoc,
  };
}

export function linesFromTableDcm(text: string): LineInput[] {
  const rows = text.split(/\r?\n/);
  const lines: LineInput[] = [];
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

export function parseTableDcmText(text: string, sourceName = "dcm.pdf"): ParseResult {
  const lines = linesFromTableDcm(text);
  return {
    header: ["UN", "Proper Shipping Name", "Class", "Packaging", "Weight"],
    lines,
    warnings: lines.length === 0 ? ["No cargo rows were found on this printed DCM."] : [],
    delimiter: "pdf",
    voyage: voyageFromTableDcm(text),
    unitGuess: "lb",
    sourceName,
  };
}
