import { formatKg } from "./quantity.ts";
import type { EvalResult } from "./types.ts";

export function enoadTsv(result: EvalResult): string {
  const header = ["CDC Name", "UN Number", "Amount", "Status", "33 CFR basis"];
  const rows = result.enoad.map((e) =>
    [e.name, e.un, e.amountLabel, e.verdict === "CDC_RESIDUE" ? "CDC residue" : "CDC", e.basis].join("\t"),
  );
  return [header.join("\t"), ...rows].join("\n");
}

export function resultsCsv(result: EvalResult): string {
  const header = [
    "UN",
    "Name",
    "Class",
    "Packaging",
    "Quantity",
    "Verdict",
    "CFR paragraphs",
    "Reason",
    "Needs",
    "v1.0 verdict",
    "Disagrees with v1.0",
  ];
  const rows = result.lines.map((l) =>
    [
      l.un,
      csv(l.name),
      l.hazClass,
      csv(l.packaging),
      formatKg(l.quantityKg),
      l.verdict,
      l.paragraphs.join(" "),
      csv(l.reasons.join(" | ")),
      csv(l.needs.join(" | ")),
      l.legacy,
      l.disagrees ? "yes" : "no",
    ].join(","),
  );
  return [header.join(","), ...rows].join("\n");
}

function csv(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export function downloadText(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
