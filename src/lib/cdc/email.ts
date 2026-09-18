import { formatKg } from "./quantity.ts";
import { packFormLabel } from "./packaging.ts";
import { categoryScan, formatScanLines } from "./scan.ts";
import type { EvalResult, LineResult, VoyageInfo } from "./types.ts";

function clean(v?: string): string {
  return (v ?? "").replace(/\s+/g, " ").trim();
}

function voyageLine(voyage: VoyageInfo): string {
  const bits = [
    voyage.vessel ? `VESSEL: ${clean(voyage.vessel)}` : null,
    voyage.voyage ? `VOYAGE: ${clean(voyage.voyage)}` : null,
  ].filter(Boolean);
  return bits.join("    ");
}

function routeLine(voyage: VoyageInfo): string {
  const pol = clean(voyage.pol);
  const pod = clean(voyage.pod);
  if (pol && pod) return `LOAD: ${pol}    DISCHARGE: ${pod}`;
  if (pol) return `LOAD: ${pol}`;
  if (pod) return `DISCHARGE: ${pod}`;
  return "";
}

export const GENERAL_CARGO_LINE = "GENERAL CARGO (other than CDC): CONTAINERIZED";

export const NO_CDC_PASTE = `${GENERAL_CARGO_LINE}\nCDC CARRIED: NO`;

/** 33 CFR 160.206 (3) cargo fields for NVMC eNOAD. */
export function enoadPasteBlock(result: EvalResult): string {
  if (result.enoad.length === 0) return NO_CDC_PASTE;
  const items = result.enoad.map((e) => {
    const amount = e.amountLabel && e.amountLabel !== "—" ? e.amountLabel : "AMOUNT NOT ON MANIFEST — CONFIRM";
    return [`NAME: ${e.name.toUpperCase()}`, `UN NUMBER: ${e.un}`, `AMOUNT: ${amount}`].join("\n");
  });
  return [GENERAL_CARGO_LINE, "CDC CARRIED: YES", "", ...items].join("\n");
}

function reviewNotes(result: EvalResult): string {
  const review = result.lines.filter((l) => l.verdict === "REVIEW");
  if (review.length === 0) return "";
  const byUn = new Map<string, LineResult[]>();
  for (const l of review) {
    const list = byUn.get(l.un) ?? [];
    list.push(l);
    byUn.set(l.un, list);
  }
  const lines: string[] = [
    "REVIEW — do not paste these into eNOAD as CDC unless you confirm they meet 33 CFR 160.202:",
  ];
  for (const [un, group] of byUn) {
    let kg: number | null = 0;
    for (const l of group) {
      if (l.quantityKg === null) {
        kg = kg === 0 ? null : kg;
        continue;
      }
      kg = (kg ?? 0) + l.quantityKg;
    }
    const sample = group[0];
    lines.push(
      `  UN ${un}  ${sample.name}  class ${sample.hazClass || "—"}  ${formatKg(kg)}  ${group.length} line(s)`,
    );
    if (sample.needs[0]) lines.push(`    Need: ${sample.needs[0]}`);
    else if (sample.reasons[0]) lines.push(`    ${sample.reasons[0]}`);
  }
  return lines.join("\n");
}

export function masterEmail(
  result: EvalResult,
  voyage: VoyageInfo,
  sourceName?: string,
): { subject: string; body: string; paste: string; mailto: string } {
  const paste = enoadPasteBlock(result);
  const vessel = clean(voyage.vessel) || "Vessel";
  const voy = clean(voyage.voyage);
  const flag = result.enoad.length === 0 ? "NO" : "YES";
  const subject = voy
    ? `${vessel} ${voy} — eNOAD CDC: ${flag}`
    : `${vessel} — eNOAD CDC: ${flag}`;

  const header = [
    voyageLine(voyage),
    routeLine(voyage),
    sourceName ? `SOURCE: ${sourceName}` : "",
    `SCREENED: ${result.total} containerized DG line(s) against 33 CFR 160.202`,
  ].filter(Boolean);

  const intro =
    result.enoad.length === 0
      ? "No cargo on this manifest meets a Certain Dangerous Cargo category. Paste the boxed block into the eNOAD cargo section (33 CFR 160.206 Table (3))."
      : "The following cargo is Certain Dangerous Cargo and must be entered on the eNOAD. Paste the boxed block into the cargo section (33 CFR 160.206 Table (3)).";

  const review = reviewNotes(result);
  const checks = formatScanLines(categoryScan(result));

  const body = [
    "Master,",
    "",
    intro,
    "",
    "========== PASTE INTO eNOAD CARGO ==========",
    paste,
    "============================================",
    "",
    header.join("\n"),
    "",
    "CATEGORY CHECK (why this determination):",
    checks,
    "",
    review,
    review ? "" : null,
    "This is a screening aid based on 33 CFR 160.202. It is not a Coast Guard determination.",
  ]
    .filter((l) => l !== null)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { subject, body, paste, mailto };
}

export function emailFilename(voyage: VoyageInfo, flag: "YES" | "NO"): string {
  const v = (clean(voyage.vessel) || "vessel").replace(/[^\w]+/g, "_");
  const y = (clean(voyage.voyage) || "voyage").replace(/[^\w]+/g, "_");
  return `${v}_${y}_eNOAD-CDC-${flag}.txt`;
}

export function emailFileContents(subject: string, body: string): string {
  return `Subject: ${subject}\n\n${body}\n`;
}

export function packHint(line: LineResult): string {
  return `${line.packaging || "—"} · ${packFormLabel(line.packForm)}`;
}
