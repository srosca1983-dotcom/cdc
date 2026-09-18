import type { LineResult } from "../cdc/types.ts";
import { isLimitedQty } from "../cdc/limited.ts";
import { athwartGap, occupiedBays, sameBayColumn } from "../ship/george-ii.ts";
import { containerKey, type StowPos } from "../ship/stow.ts";
import { resolvedStow, type StowIssue } from "../ship/segregation.ts";
import type { BaplieBox, BapliePlan } from "./types.ts";

/** Conversion sheet: all reefers face aft, except bay 6 or 22 below (motors fwd). HAN+RFF overrides. */
export function reeferMotors(stow: StowPos): "aft" | "fwd" {
  if (!stow.onDeck && (stow.bay === 6 || stow.bay === 22)) return "fwd";
  return "aft";
}

export function heatSensitive(cls: string, un?: string): boolean {
  const c = (cls || "").trim();
  if (/^1/.test(c)) return true;
  if (/^2\.1/.test(c) || c === "2") return true;
  if (/^3/.test(c)) return true;
  if (/^4\./.test(c)) return true;
  if (/^5\./.test(c)) return true;
  if (un && /^(3090|3091|3480|3481)$/.test(un)) return true;
  return false;
}

export function beside(a: StowPos, b: StowPos): boolean {
  if (a.onDeck !== b.onDeck) return false;
  if (a.hatch !== b.hatch) return false;
  if (!sameBayColumn(a, b)) return false;
  const tierGap = Math.abs(a.tier - b.tier);
  if (a.row === b.row && tierGap > 0 && tierGap <= 2) return true;
  if (a.tier === b.tier && athwartGap(a.hatch, a.onDeck, a.row, b.row) <= 1) return true;
  return false;
}

function atMotorEnd(reefer: StowPos, other: StowPos, motors: "aft" | "fwd"): boolean {
  if (reefer.onDeck !== other.onDeck) return false;
  if (!sameBayColumn(reefer, other)) return false;
  if (reefer.row !== other.row) return false;
  if (Math.abs(reefer.tier - other.tier) > 2) return false;
  const mine = occupiedBays(reefer);
  // A 20' only occupies one bay — there is no next-bay compressor cell.
  if (mine.length < 2) return false;
  const theirs = occupiedBays(other);
  const motorBay = motors === "aft" ? Math.max(...mine) : Math.min(...mine);
  return theirs.includes(motorBay);
}

interface DgSpot {
  container: string;
  stow: StowPos;
  cls: string;
  un: string;
  name: string;
}

function dgSpots(lines: LineResult[], plan: BapliePlan | null): DgSpot[] {
  const out: DgSpot[] = [];
  const seen = new Set<string>();
  const onDcm = new Set<string>();
  for (const line of lines) {
    const stow = resolvedStow(line, plan);
    if (!stow) continue;
    const container = containerKey(line.input.container) || `row-${line.input.rowIndex}`;
    if (containerKey(line.input.container)) onDcm.add(container);
    const key = `${container}|${line.un}|${stow.bay}-${stow.row}-${stow.tier}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (isLimitedQty(line)) continue;
    out.push({ container: line.input.container || container, stow, cls: line.hazClass, un: line.un, name: line.name });
  }
  if (plan) {
    for (const box of plan.boxes) {
      if (!box.stow || !box.dg.length) continue;
      const ck = containerKey(box.container);
      if (ck && onDcm.has(ck)) continue;
      for (const dg of box.dg) {
        const key = `${ck || box.container}|${dg.un}|${box.stow.bay}-${box.stow.row}-${box.stow.tier}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({
          container: box.container,
          stow: box.stow,
          cls: dg.cls,
          un: dg.un,
          name: dg.name || "BAPLIE DGS",
        });
      }
    }
  }
  return out;
}

export function reeferHeatIssues(lines: LineResult[], plan: BapliePlan | null): StowIssue[] {
  if (!plan) return [];
  const reefers = plan.boxes.filter((b) => b.reefer && b.operating && b.stow);
  const dgs = dgSpots(lines, plan);
  const issues: StowIssue[] = [];

  for (const dg of dgs) {
    for (const rf of reefers) {
      const stow = rf.stow as StowPos;
      if (containerKey(dg.container) && containerKey(dg.container) === containerKey(rf.container)) continue;
      const motors = rf.motors;
      const motor = atMotorEnd(stow, dg.stow, motors);
      const near = beside(stow, dg.stow) || motor;
      if (!near) continue;
      if (!heatSensitive(dg.cls, dg.un)) continue;
      issues.push({
        id: `rf-${dg.container}-${rf.container}-${dg.un}`,
        severity: "seg",
        hatch: dg.stow.hatch,
        containers: [dg.container, rf.container],
        uns: dg.un ? [dg.un] : [],
        title: `${dg.container} UN ${dg.un} class ${dg.cls} is too close to a live reefer`,
        detail: motor
          ? `Reefers on GEORGE II face ${motors === "aft" ? "aft (motors aft)" : `forward — bay ${stow.bay} below is the exception`}. ${rf.container} ${rf.iso || "RF"} ${rf.tempC ?? "set"}°C. DG ${dg.un || dg.cls} is on the compressor end.`
          : `${rf.container} is a live reefer (${rf.iso || "R"}) ${formatSpot(stow)}. ${dg.container} UN ${dg.un || "—"} class ${dg.cls} is in an adjacent cell.`,
        rule: "Heat source — live reefer compressor (IMDG keep away from sources of heat)",
      });
    }
  }
  return issues;
}

function formatSpot(s: StowPos): string {
  return `Hatch ${s.hatch} ${s.onDeck ? "deck" : "hold"} row ${String(s.row).padStart(2, "0")} tier ${s.tier}`;
}

export function countReefers(plan: BapliePlan | null, hatch?: number): number {
  if (!plan) return 0;
  return plan.boxes.filter((b) => b.reefer && (hatch == null || b.stow?.hatch === hatch)).length;
}

export function countBoxes(plan: BapliePlan | null, hatch?: number): number {
  if (!plan) return 0;
  return plan.boxes.filter((b) => hatch == null || b.stow?.hatch === hatch).length;
}

export function motorsNote(box: BaplieBox): string {
  if (!box.reefer) return "";
  if (box.han && /^RFF/i.test(box.han)) {
    return "Motor faces FORWARD (HAN+RFF on the BAPLIE).";
  }
  if (box.motors === "fwd") {
    return "Motor faces FORWARD — bay 6 or 22 below is the conversion-sheet exception.";
  }
  return "Motor faces AFT (whole vessel except bay 6 / 22 below, unless HAN+RFF).";
}
