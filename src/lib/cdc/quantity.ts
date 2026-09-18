import type { QtyUnit } from "./types.ts";

const LB_TO_KG = 0.45359237;
const MT_TO_KG = 1000;
const LONG_TON_TO_KG = 1016.0469088;
const SHORT_TON_TO_KG = 907.18474;

export function parseNumber(raw: string): number | null {
  if (!raw) return null;
  const cleaned = raw.replace(/,/g, "").replace(/\s+/g, " ").trim();
  const m = cleaned.match(/-?\d+(?:\.\d+)?/);
  if (!m) return null;
  const n = Number(m[0]);
  return Number.isFinite(n) ? n : null;
}

export function toKg(value: number, unit: QtyUnit): number {
  if (unit === "lb") return value * LB_TO_KG;
  if (unit === "mt") return value * MT_TO_KG;
  return value;
}

export function parseQuantityToKg(
  raw: string,
  defaultUnit: QtyUnit,
): number | null {
  if (!raw) return null;
  const text = raw.replace(/,/g, "").trim().toLowerCase();
  if (!text || text === "-" || text === "n/a" || text === "na") return null;

  const n = parseNumber(text);
  if (n === null) return null;

  if (/\b(metric\s*tons?|m\/t|mt|tonnes?)\b/.test(text)) return n * MT_TO_KG;
  if (/\b(long\s*tons?|l\/t|lt)\b/.test(text)) return n * LONG_TON_TO_KG;
  if (/\b(short\s*tons?|s\/t|st|net\s*tons?)\b/.test(text)) return n * SHORT_TON_TO_KG;
  if (/\b(lbs?|pounds?)\b/.test(text)) return n * LB_TO_KG;
  if (/\b(kgs?|kilograms?)\b/.test(text)) return n;
  if (/\bgrams?\b/.test(text) || /\bg\b/.test(text)) return n / 1000;
  if (/\btons?\b/.test(text) || /(^|\s)t(\s|$)/.test(text)) return n * MT_TO_KG;

  return toKg(n, defaultUnit);
}

export function formatKg(kg: number | null): string {
  if (kg === null || !Number.isFinite(kg)) return "—";
  if (kg >= 1000) {
    const mt = kg / 1000;
    return `${trimNum(mt)} MT`;
  }
  if (kg >= 1) return `${trimNum(kg)} kg`;
  return `${trimNum(kg * 1000)} g`;
}

function trimNum(n: number): string {
  if (Number.isInteger(n)) return n.toLocaleString("en-US");
  return n.toLocaleString("en-US", { maximumFractionDigits: 3 });
}

export const ONE_METRIC_TON_KG = 1000;
export const TWENTY_METRIC_TON_KG = 20_000;
/** 33 CFR 160.202 CDC residue (1) — bulk AN leftover cap. */
export const ONE_THOUSAND_POUNDS_KG = 1000 * LB_TO_KG;
