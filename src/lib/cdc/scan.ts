import type { EvalResult, LineResult } from "./types.ts";

export type ScanTone = "clear" | "watch" | "cdc";

export interface ScanItem {
  id: string;
  label: string;
  tone: ScanTone;
  detail: string;
}

function starts(line: LineResult, re: RegExp): boolean {
  return re.test((line.hazClass || "").replace(/\s+/g, "")) || re.test((line.input.subsidiary || "").replace(/\s+/g, ""));
}

/**
 * Why CDC is YES or NO — the nine 160.202 families, in language a Master can scan.
 * "watch" means the family was on the ship but did not meet a CDC threshold.
 */
export function categoryScan(result: EvalResult): ScanItem[] {
  const lines = result.lines;

  function item(
    id: string,
    label: string,
    pred: (l: LineResult) => boolean,
    underThreshold: string,
  ): ScanItem {
    const hits = lines.filter(pred);
    const cdcHits = hits.filter((l) => l.verdict === "CDC" || l.verdict === "CDC_RESIDUE");
    const reviewHits = hits.filter((l) => l.verdict === "REVIEW");
    if (cdcHits.length > 0) {
      return { id, label, tone: "cdc", detail: `CDC — ${cdcHits.length} line(s)` };
    }
    if (reviewHits.length > 0) {
      return { id, label, tone: "watch", detail: `review — ${reviewHits.length} line(s)` };
    }
    if (hits.length > 0) {
      return { id, label, tone: "watch", detail: underThreshold.replace("{n}", String(hits.length)) };
    }
    return { id, label, tone: "clear", detail: "none" };
  }

  return [
    item("p1", "1.1 / 1.2 explosives", (l) => starts(l, /^1\.[12]/), "{n} on board — still CDC at any qty (check class)"),
    item("p2", "1.5D (176.415 permit)", (l) => starts(l, /^1\.5/), "{n} on board, not in combustible bags"),
    item(
      "p3",
      "2.3 PIH gas > 1 MT",
      (l) => starts(l, /^2\.3/) || l.paragraphs.includes("160.202(3)"),
      "{n} on board, vessel total ≤ 1 MT",
    ),
    item(
      "p4",
      "5.1 ammonium nitrate",
      (l) =>
        l.paragraphs.includes("160.202(4)") ||
        l.paragraphs.includes("160.202(9)") ||
        ["1942", "2067", "2426", "3375"].includes(l.un),
      "{n} on board, no 176.415 permit case",
    ),
    item(
      "p5",
      "6.1 PIH tank or > 20 MT",
      (l) => starts(l, /^6\.1/) || l.paragraphs.includes("160.202(5)"),
      "{n} packaged line(s) under 20 MT — not CDC",
    ),
    item(
      "p6",
      "Class 7 HRCQ / fissile",
      (l) => starts(l, /^7/) || l.paragraphs.includes("160.202(6)"),
      "{n} on board, not HRCQ / excepted package",
    ),
    item(
      "p7",
      "Bulk liquefied gas",
      (l) => l.paragraphs.includes("160.202(7)"),
      "{n} — not ship's-tank cargo",
    ),
    item(
      "p8",
      "Named bulk liquids",
      (l) => l.paragraphs.includes("160.202(8)") || ["1098", "1280", "1831", "1541", "1135", "1143", "1605", "1754"].includes(l.un),
      "{n} packaged — (8) is ship's tanks only",
    ),
    item(
      "p9",
      "Bulk ammonium nitrate",
      (l) => l.paragraphs.includes("160.202(9)"),
      "{n} — not carried in bulk",
    ),
  ];
}

export function formatScanLines(items: ScanItem[]): string {
  const width = Math.max(...items.map((i) => i.label.length));
  return items.map((i) => `  ${i.label.padEnd(width)}  ${i.detail}`).join("\n");
}
