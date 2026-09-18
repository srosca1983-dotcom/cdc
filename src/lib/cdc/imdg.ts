export function normalizeUn(raw: string): string {
  if (!raw) return "";
  const t = raw.toUpperCase().replace(/["']/g, "").trim();
  if (!t || t === "NAN" || t === "N/A" || t === "-" || t === "NONE") return "";
  const m = t.match(/\b(?:UN|NA)?\s*(\d{3,5})\b/);
  if (!m) return "";
  return m[1].padStart(4, "0");
}

export function parseHazardClass(raw: string): { primary: string; subsidiary: string } {
  if (!raw) return { primary: "", subsidiary: "" };
  const t = raw.trim();
  const subMatch = t.match(/\(([^)]+)\)/);
  const subsidiary = subMatch ? subMatch[1].trim() : "";
  const primary = t
    .replace(/class(ification)?/gi, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/div(ision)?/gi, "")
    .trim();
  const compact = primary.replace(/\s+/g, "");
  const m = compact.match(/(\d(?:\.\d)?[A-Z]?)/i);
  return { primary: m ? m[1].toUpperCase().replace(/(\d)([A-Z])/, "$1$2") : compact, subsidiary };
}

export interface CombinedHazmat {
  un: string;
  name: string;
  hazClass: string;
  subsidiary: string;
  packingGroup: string;
}

/**
 * Pasha / IMDG one-cell description:
 * UN3082,ENVIRONMENTALLY HAZARDOUS SUBSTANCE, LIQUID, N.O.S., 9,III
 * UN3480,LITHIUM ION BATTERIES, 9,
 * UN1992,FLAMMABLE LIQUID, TOXIC, N.O.S., 3(6.1), II
 */
export function parseCombinedHazmat(raw: string): CombinedHazmat | null {
  if (!raw) return null;
  const t = raw.replace(/\s+/g, " ").trim();
  const head = t.match(/^(UN|NA)\s*(\d{3,5})\s*,\s*(.+)$/i);
  if (!head) return null;
  const rest = head[3].trim();
  const tail = rest.match(
    /^(.*),\s*(\d(?:\.\d)?)\s*(?:\(\s*(\d(?:\.\d)?)\s*\))?\s*,?\s*(I{1,3}|[123])?\s*$/i,
  );
  if (!tail) {
    const un = normalizeUn(t);
    return un
      ? { un, name: rest.replace(/,$/, "").trim(), hazClass: "", subsidiary: "", packingGroup: "" }
      : null;
  }
  const pgRaw = (tail[4] || "").toUpperCase();
  const packingGroup = pgRaw === "1" ? "I" : pgRaw === "2" ? "II" : pgRaw === "3" ? "III" : pgRaw;
  return {
    un: head[2].padStart(4, "0"),
    name: tail[1].replace(/,\s*$/, "").trim(),
    hazClass: tail[2],
    subsidiary: tail[3] || "",
    packingGroup,
  };
}

export function looksLikeCombinedHazmat(raw: string): boolean {
  return /^(UN|NA)\s*\d{3,5}\s*,/i.test(raw.trim()) && /,\s*\d(?:\.\d)?/.test(raw);
}

export function classFromToken(raw: string): { primary: string; subsidiary: string } {
  const m = (raw || "").replace(/\s+/g, " ").trim().match(/^(\d(?:\.\d)?)\s*(?:\(\s*(\d(?:\.\d)?)\s*\))?$/);
  if (m) return { primary: m[1], subsidiary: m[2] || "" };
  return parseHazardClass(raw);
}
