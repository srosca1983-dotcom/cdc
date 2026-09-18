import type { LineResult } from "../cdc/types.ts";
import { hasExplicitLqMarks, isLimitedQty } from "../cdc/limited.ts";
import { athwartGap } from "../ship/george-ii.ts";
import { parseStow, type StowPos } from "../ship/stow.ts";
import type { StowIssue } from "../ship/segregation.ts";
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
  const tierGap = Math.abs(a.tier - b.tier);
  if (a.row === b.row && tierGap > 0 && tierGap <= 2) return true;
  if (a.tier === b.tier && athwartGap(a.hatch, a.onDeck, a.row, b.row) <= 1) return true;
  return false;
}

function atMotorEnd(reefer: StowPos, other: StowPos, motors: "aft" | "fwd"): boolean {
  if (reefer.onDeck !== other.onDeck) return false;
  if (reefer.row !== other.row) return false;
  if (Math.abs(reefer.tier - other.tier) > 2) return false;
  if (motors === "aft") return other.bay > reefer.bay && other.bay - reefer.bay <= 2;
  return other.bay < reefer.bay && reefer.bay - other.bay <= 2;
}

interface DgSpot {
  container: string;
  stow: StowPos;
  cls: string;
  un: string;
  name: string;
}

function dgSpots(lines: LineResult[], plan: BapliePlan | null): DgSpot[] {
  const cartonFallback = !hasExplicitLqMarks(lines);
  const out: DgSpot[] = [];
  const seen = new Set<string>();
  for (const line of lines) {
    const stow = parseStow(line.input.stowLoc);
    if (!stow) continue;
    const container = (line.input.container || "").toUpperCase() || `row-${line.input.rowIndex}`;
    const key = `${container}|${line.un}|${stow.bay}-${stow.row}-${stow.tier}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (isLimitedQty(line, cartonFallback)) continue;
    out.push({ container, stow, cls: line.hazClass, un: line.un, name: line.name });
  }
  if (plan) {
    for (const box of plan.boxes) {
      if (!box.stow || !box.dg.length) continue;
      for (const dg of box.dg) {
        const key = `${box.container}|${dg.un}|${box.stow.bay}-${box.stow.row}-${box.stow.tier}`;
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
  const reefers = plan.boxes.filter((b) => b.reefer && b.stow);
  const dgs = dgSpots(lines, plan);
  const issues: StowIssue[] = [];

  for (const dg of dgs) {
    for (const rf of reefers) {
      const stow = rf.stow as StowPos;
      if (dg.container === rf.container) continue;
      const motors = rf.motors;
      const motor = atMotorEnd(stow, dg.stow, motors);
      const near = beside(stow, dg.stow) || motor;
      if (!near) continue;
      const hot = rf.operating && heatSensitive(dg.cls, dg.un);
      const where = motor
        ? `at the ${motors === "aft" ? "aft (motor)" : "fwd (motor)"} end of ${rf.container}`
        : `next to reefer ${rf.container}`;
      issues.push({
        id: `rf-${dg.container}-${rf.container}-${dg.un}`,
        severity: hot ? "seg" : "watch",
        hatch: dg.stow.hatch,
        containers: [dg.container, rf.container],
        uns: dg.un ? [dg.un] : [],
        title: hot
          ? `${dg.container} UN ${dg.un} class ${dg.cls} is too close to a live reefer`
          : `${dg.container} sits ${where}`,
        detail: motor
          ? `Reefers on GEORGE II face ${motors === "aft" ? "aft (motors aft)" : `forward — bay ${stow.bay} below is the exception`}. ${rf.container} ${rf.iso || "RF"} ${rf.operating ? `${rf.tempC ?? "set"}°C` : "NOR"}. DG ${dg.un || dg.cls} is on the compressor end.`
          : `${rf.container} is a ${rf.operating ? "live" : "NOR"} reefer (${rf.iso || "R"}) ${formatSpot(stow)}. ${dg.container} UN ${dg.un || "—"} class ${dg.cls} is in an adjacent cell.`,
        rule: rf.operating
          ? "Heat source — live reefer compressor (IMDG keep away from sources of heat)"
          : "NOR reefer on the bay plan — confirm it stays off",
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
