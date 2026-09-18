/** GEORGE II stowage from the Bay-Hatch conversion sheet and Pasha DCM. */

import { BAYS_BY_HATCH } from "./george-ii.ts";

export interface StowPos {
  raw: string;
  bay: number;
  row: number;
  tier: number;
  onDeck: boolean;
  hatch: number;
  /** Even bay = 40'. Odd bay = 20' (fwd or aft in the cell). */
  fortyFoot: boolean;
}

export function hatchFromBay(bay: number): number {
  for (let i = 0; i < BAYS_BY_HATCH.length; i++) {
    if (BAYS_BY_HATCH[i].includes(bay)) return i + 1;
  }
  if (bay >= 1 && bay <= 47) return Math.min(12, Math.max(1, Math.ceil(bay / 4)));
  return 0;
}

function partsFrom(raw: string): { bay: number; row: number; tier: number } | null {
  const t = String(raw).trim();
  const split = t.split(/[\s\-\/.]+/).filter((p) => /^\d+$/.test(p));
  if (split.length === 3) {
    return { bay: Number(split[0]), row: Number(split[1]), tier: Number(split[2]) };
  }
  const digits = t.replace(/\D/g, "");
  if (digits.length === 7) {
    return { bay: Number(digits.slice(0, 3)), row: Number(digits.slice(3, 5)), tier: Number(digits.slice(5, 7)) };
  }
  if (digits.length === 6) {
    return { bay: Number(digits.slice(0, 2)), row: Number(digits.slice(2, 4)), tier: Number(digits.slice(4, 6)) };
  }
  return null;
}

export function parseStow(raw: string | undefined | null): StowPos | null {
  if (!raw) return null;
  const p = partsFrom(raw);
  if (!p) return null;
  const { bay, row, tier } = p;
  if (!bay || bay > 47 || row > 22 || row < 0) return null;
  if ((tier > 16 && tier < 80) || tier > 96 || tier < 0) return null;
  if (tier === 0) return null;
  const hatch = hatchFromBay(bay);
  if (!hatch) return null;
  return {
    raw: String(raw).trim(),
    bay,
    row,
    tier,
    onDeck: tier >= 80,
    hatch,
    fortyFoot: bay % 2 === 0,
  };
}

/** Prefer a 6–7 digit stow token, or bay-row-tier like 14-08-84. */
export function stowFromRowText(text: string): string | undefined {
  const hyphen = [...text.matchAll(/\b(\d{1,3})[-/](\d{1,2})[-/](\d{2})\b/g)];
  for (let i = hyphen.length - 1; i >= 0; i--) {
    const token = hyphen[i][0];
    const pos = parseStow(token);
    if (pos && pos.row <= 16 && (pos.onDeck || (pos.tier >= 2 && pos.tier <= 16))) return token;
  }
  const matches = [...text.matchAll(/\b(\d{6,7})\b/g)].map((m) => m[1]);
  for (let i = matches.length - 1; i >= 0; i--) {
    const pos = parseStow(matches[i]);
    if (!pos) continue;
    if (pos.row <= 16 && (pos.onDeck || (pos.tier >= 2 && pos.tier <= 16))) return matches[i];
  }
  return undefined;
}

function tierLabel(pos: StowPos): string {
  if (pos.onDeck) {
    const n = (pos.tier - 80) / 2;
    if (n >= 1 && n <= 6 && Number.isInteger(n)) {
      const ord = ["1st", "2nd", "3rd", "4th", "5th", "6th"][n - 1];
      return `${ord} tier on deck`;
    }
    return "on deck";
  }
  const n = pos.tier / 2;
  if (n >= 1 && n <= 8 && Number.isInteger(n)) {
    const ord = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"][n - 1];
    return `${ord} tier below deck`;
  }
  return "in hold";
}

export function formatStow(pos: StowPos): string {
  const bay = String(pos.bay).padStart(2, "0");
  const row = String(pos.row).padStart(2, "0");
  const tier = String(pos.tier).padStart(2, "0");
  const ft = pos.fortyFoot ? "40'" : "20'";
  return `${bay}-${row}-${tier} · Hatch ${pos.hatch} · cell ${row} · ${ft} · ${tierLabel(pos)}`;
}
