/**
 * GEORGE II stowage screen:
 * - CSM 1.6 / IMDG cargo loading plan (where a class may sit)
 * - 49 CFR 176.83(b) as printed in CSM Rev. 15 (how far apart classes must be)
 *
 * Closed freight containers, container-ship distances (IMDG 7.4.2 / 176.83(f)).
 * Limited / excepted quantity: IMDG 3.4.4 — not under the hatch DoC, and 7.2.4
 * does not apply to LQ packages or to CTUs of only LQ (CargoMax).
 * Not a substitute for the IMDG Code, 49 CFR 176, or the Master’s stowage plan.
 */

import type { LineResult } from "../cdc/types.ts";
import { isLimitedQty } from "../cdc/limited.ts";
import type { BaplieBox, BapliePlan } from "../baplie/types.ts";
import { HATCHES, hatchSpec, athwartGap, isCasingCell, occupiedBays, type HatchSpec } from "./george-ii.ts";
import { containerKey, formatStowRaw, parseStow, stowEqual, type StowPos } from "./stow.ts";

export type IssueSeverity = "block" | "seg" | "watch";

export interface StowIssue {
  id: string;
  severity: IssueSeverity;
  hatch: number;
  containers: string[];
  uns: string[];
  title: string;
  detail: string;
  rule: string;
}

type SegCode = "X" | "1" | "2" | "3" | "4" | "*";

const GROUPS = [
  "1.1",
  "1.3",
  "1.4",
  "2.1",
  "2.2",
  "2.3",
  "3",
  "4.1",
  "4.2",
  "4.3",
  "5.1",
  "5.2",
  "6.1",
  "6.2",
  "7",
  "8",
  "9",
] as const;
type Group = (typeof GROUPS)[number];

/** 49 CFR 176.83(b) as in CSM 1.6 — row order matches GROUPS. */
const TABLE: SegCode[][] = [
  /* 1.1 */ ["*", "*", "*", "4", "2", "2", "4", "4", "4", "4", "4", "4", "2", "4", "2", "4", "X"],
  /* 1.3 */ ["*", "*", "*", "4", "2", "2", "4", "3", "3", "4", "4", "4", "2", "4", "2", "2", "X"],
  /* 1.4 */ ["*", "*", "*", "2", "1", "1", "2", "2", "2", "2", "2", "2", "X", "4", "2", "2", "X"],
  /* 2.1 */ ["4", "4", "2", "X", "X", "X", "2", "1", "2", "X", "2", "2", "X", "4", "2", "1", "X"],
  /* 2.2 */ ["2", "2", "1", "X", "X", "X", "1", "X", "1", "X", "X", "1", "X", "2", "1", "X", "X"],
  /* 2.3 */ ["2", "2", "1", "X", "X", "X", "2", "X", "2", "X", "X", "2", "X", "2", "1", "X", "X"],
  /* 3   */ ["4", "4", "2", "2", "1", "2", "X", "X", "2", "1", "2", "2", "X", "3", "2", "X", "X"],
  /* 4.1 */ ["4", "3", "2", "1", "X", "X", "X", "X", "1", "X", "1", "2", "X", "3", "2", "1", "X"],
  /* 4.2 */ ["4", "3", "2", "2", "1", "2", "2", "1", "X", "1", "2", "2", "1", "3", "2", "1", "X"],
  /* 4.3 */ ["4", "4", "2", "X", "X", "X", "1", "X", "1", "X", "2", "2", "X", "2", "2", "1", "X"],
  /* 5.1 */ ["4", "4", "2", "2", "X", "X", "2", "1", "2", "2", "X", "2", "1", "3", "1", "2", "X"],
  /* 5.2 */ ["4", "4", "2", "2", "1", "2", "2", "2", "2", "2", "2", "X", "1", "3", "2", "2", "X"],
  /* 6.1 */ ["2", "2", "X", "X", "X", "X", "X", "X", "1", "X", "1", "1", "X", "1", "X", "X", "X"],
  /* 6.2 */ ["4", "4", "4", "4", "2", "2", "3", "3", "3", "2", "3", "3", "1", "X", "3", "3", "X"],
  /* 7   */ ["2", "2", "2", "2", "1", "1", "2", "2", "2", "2", "1", "2", "X", "3", "X", "2", "X"],
  /* 8   */ ["4", "2", "2", "1", "X", "X", "X", "1", "1", "1", "2", "2", "X", "3", "2", "X", "X"],
  /* 9   */ ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
];

const CODE_RANK: Record<SegCode, number> = { X: 0, "1": 1, "2": 2, "3": 3, "4": 4, "*": 5 };

export function classGroup(raw: string): Group | null {
  const c = (raw || "").trim().toUpperCase().replace(/\s+/g, "");
  if (!c) return null;
  if (c.startsWith("1.4") || c.startsWith("1.6")) return "1.4";
  if (c.startsWith("1.3")) return "1.3";
  if (c.startsWith("1.1") || c.startsWith("1.2") || c.startsWith("1.5") || c === "1") return "1.1";
  if (c.startsWith("2.1")) return "2.1";
  if (c.startsWith("2.2")) return "2.2";
  if (c.startsWith("2.3")) return "2.3";
  if (c === "2") return "2.1";
  if (c.startsWith("3")) return "3";
  if (c.startsWith("4.1")) return "4.1";
  if (c.startsWith("4.2")) return "4.2";
  if (c.startsWith("4.3")) return "4.3";
  if (c.startsWith("4")) return "4.1";
  if (c.startsWith("5.2")) return "5.2";
  if (c.startsWith("5.1") || c.startsWith("5")) return "5.1";
  if (c.startsWith("6.2")) return "6.2";
  if (c.startsWith("6.1") || c.startsWith("6")) return "6.1";
  if (c.startsWith("7")) return "7";
  if (c.startsWith("8")) return "8";
  if (c.startsWith("9")) return "9";
  return null;
}

export function segregationCode(a: string, b: string): SegCode {
  const ga = classGroup(a);
  const gb = classGroup(b);
  if (!ga || !gb) return "X";
  const i = GROUPS.indexOf(ga);
  const j = GROUPS.indexOf(gb);
  return TABLE[i][j];
}

function worstCode(classesA: string[], classesB: string[]): { code: SegCode; a: string; b: string } {
  let best: { code: SegCode; a: string; b: string } = { code: "X", a: classesA[0] || "", b: classesB[0] || "" };
  for (const a of classesA) {
    for (const b of classesB) {
      const code = segregationCode(a, b);
      if (CODE_RANK[code] > CODE_RANK[best.code]) best = { code, a, b };
    }
  }
  return best;
}

function classesOnLine(line: LineResult): string[] {
  const out: string[] = [];
  const add = (raw: string) => {
    const g = classGroup(raw);
    if (g && !out.includes(g)) out.push(g);
  };
  add(line.hazClass);
  add(line.input.subsidiary);
  const fromName = line.hazClass.match(/\(([^)]+)\)/);
  if (fromName) add(fromName[1]);
  return out;
}

function holdId(hatch: number): number {
  if (hatch <= 2) return 1;
  if (hatch <= 4) return 2;
  if (hatch <= 6) return 3;
  if (hatch <= 8) return 4;
  if (hatch === 9) return 5;
  if (hatch <= 11) return 6;
  return 7;
}

const CODE_LABEL: Record<SegCode, string> = {
  X: "no extra segregation in the 176.83 table",
  "1": "Away from (1)",
  "2": "Separated from (2)",
  "3": "Separated by a complete compartment or hold (3)",
  "4": "Separated longitudinally by an intervening hold (4)",
  "*": "Class 1 — see 49 CFR 176.144",
};

interface Box {
  key: string;
  container: string;
  stow: StowPos | null;
  classes: string[];
  /** Classes from non-LQ lines only — 176.83 / CSM DoC. Includes subsidiaries for between-box. */
  fullClasses: string[];
  /** Per full-DG line class lists — never compare a UN to its own subsidiary. */
  fullLineGroups: string[][];
  uns: string[];
  names: string[];
  lines: LineResult[];
  /** Every DG line in the box is limited / excepted quantity. */
  allLq: boolean;
}

/** BAPLIE box for this container number, if the plan has one. */
export function planBoxFor(container: string | undefined, plan: BapliePlan | null): BaplieBox | null {
  if (!plan || !container) return null;
  const k = containerKey(container);
  if (!k) return null;
  return plan.boxes.find((b) => containerKey(b.container) === k) ?? null;
}

/**
 * Stow used for drawing and alarms: DCM if it parses, otherwise the BAPLIE cell.
 * Never writes onto line.input — that is a view-model, not a mutate-in-render.
 */
export function resolvedStow(
  line: { input: { stowLoc?: string; container?: string } },
  plan: BapliePlan | null = null,
): StowPos | null {
  const dcm = parseStow(line.input.stowLoc);
  if (dcm) return dcm;
  return planBoxFor(line.input.container, plan)?.stow ?? null;
}

function boxesFrom(lines: LineResult[], plan: BapliePlan | null = null): Box[] {
  const map = new Map<string, Box>();
  for (const line of lines) {
    if (!line.un) continue;
    const stow = resolvedStow(line, plan);
    const cn = containerKey(line.input.container) || `row-${line.input.rowIndex}`;
    const cur = map.get(cn) ?? {
      key: cn,
      container: line.input.container || "No container no.",
      stow,
      classes: [],
      fullClasses: [],
      fullLineGroups: [],
      uns: [],
      names: [],
      lines: [],
      allLq: true,
    };
    cur.lines.push(line);
    if (!cur.stow && stow) cur.stow = stow;
    const groups = classesOnLine(line);
    for (const g of groups) {
      if (!cur.classes.includes(g)) cur.classes.push(g);
    }
    if (!isLimitedQty(line)) {
      cur.allLq = false;
      if (groups.length) cur.fullLineGroups.push(groups);
      for (const g of groups) {
        if (!cur.fullClasses.includes(g)) cur.fullClasses.push(g);
      }
    }
    if (!cur.uns.includes(line.un)) cur.uns.push(line.un);
    if (line.name && !cur.names.includes(line.name)) cur.names.push(line.name);
    map.set(cn, cur);
  }
  for (const b of map.values()) {
    if (!b.lines.length) b.allLq = false;
  }
  return [...map.values()];
}

function hold2Forbidden(cls: string): string | null {
  const g = classGroup(cls);
  if (!g) return null;
  if (g === "1.1" || g === "1.3") return `Class ${cls} is not allowed in Cargo Hold No. 2 (only 1.4S of class 1 is).`;
  if (g.startsWith("4") || g.startsWith("5") || g === "6.1") {
    return `Class ${cls} is not allowed below deck on GEORGE II — Hold 2 is only approved for 1.4S, 2.x, 3, 8 and 9.`;
  }
  return null;
}

function locationIssues(box: Box, spec: HatchSpec): StowIssue[] {
  if (!box.stow) return [];
  // IMDG 3.4.4 / CargoMax: limited quantities are not under the ship's class-by-hold DoC.
  if (box.allLq) return [];
  const issues: StowIssue[] = [];
  const onDeck = box.stow.onDeck;
  const label = box.container;
  const cls = (box.fullClasses.length ? box.fullClasses : box.classes).join("/");
  const base = {
    hatch: spec.id,
    containers: [label],
    uns: box.uns,
  };

  if (onDeck && !spec.imdgOnDeck) {
    issues.push({
      id: `loc-deck-${box.key}-${spec.id}`,
      severity: "block",
      ...base,
      title: `${label} should not be on Hatch ${spec.id}`,
      detail: `Class ${cls} is on this hatch cover. CSM 1.6 dropped hatches 8, 9, 10 and 12 from IMDG after the conversion. Hatch 11 is the aft exception.`,
      rule: "CSM 1.6 — on-deck IMDG not approved on this cover",
    });
  }

  if (!onDeck && !spec.imdgHold) {
    issues.push({
      id: `loc-hold-${box.key}-${spec.id}`,
      severity: "block",
      ...base,
      title: `${label} should not be below deck on Hatch ${spec.id}`,
      detail: `Only Cargo Hold No. 2 (Hatches 3 & 4) is approved for hazardous cargo below deck.`,
      rule: "CSM 1.6 — under-deck IMDG is Hold 2 only",
    });
  }

  if (!onDeck && spec.imdgHold) {
    const checks =
      box.lines.length > 0
        ? box.lines
            .filter((line) => !isLimitedQty(line))
            .map((line) => ({
              un: line.un,
              cls: line.hazClass,
              sub: line.input.subsidiary,
            }))
        : box.fullClasses.map((c, i) => ({ un: box.uns[i] || box.uns[0] || "", cls: c, sub: "" }));
    for (const line of checks) {
      const why = hold2Forbidden(line.cls);
      if (why) {
        issues.push({
          id: `loc-h2-${box.key}-${line.un || line.cls}`,
          severity: "block",
          ...base,
          uns: line.un ? [line.un] : box.uns,
          title: `${label} UN ${line.un || line.cls} should not be in Hold 2`,
          detail: why,
          rule: "CSM 1.6 loading table — Hold 2 (Hatches 3 & 4)",
        });
      }
      const sub = classGroup(line.sub);
      if (classGroup(line.cls) === "2.3" && sub === "2.1") {
        issues.push({
          id: `loc-23fl-${box.key}`,
          severity: "block",
          ...base,
          title: `${label} UN ${line.un} 2.3 (2.1) is prohibited under deck`,
          detail: "IMDG / CSM note 20: class 2.3 with subsidiary 2.1 may not go under deck or in an enclosed Ro-Ro space.",
          rule: "CSM 1.6 note 20",
        });
      }
      if (classGroup(line.cls) === "5.2") {
        issues.push({
          id: `loc-52-${box.key}`,
          severity: "block",
          ...base,
          title: `${label} class 5.2 is prohibited under deck`,
          detail: "CSM note 16: class 5.2 under deck or in enclosed Ro-Ro spaces is prohibited.",
          rule: "CSM 1.6 note 16",
        });
      }
    }
  }

  if (spec.id === 10 && box.stow && isCasingCell(10, box.stow.row)) {
    issues.push({
      id: `watch-casing-${box.key}`,
      severity: "watch",
      ...base,
      title: `${label} is against the new engine casing`,
      detail: "Hatch 10 inboard cells next to the casing should be void unless the cargo must go here. A puncture takes the ship off hire. Outboard cells on this cover are not this watch.",
      rule: "Loading precautions — Hatch 10 casing",
    });
  }

  return issues;
}

function pairSatisfied(code: SegCode, a: Box, b: Box): boolean {
  if (code === "X") return true;
  if (a.key === b.key) return false;
  if (!a.stow || !b.stow) return true;
  const sameHatch = a.stow.hatch === b.stow.hatch;
  const sameLevel = a.stow.onDeck === b.stow.onDeck;
  const cells = sameHatch && sameLevel ? athwartGap(a.stow.hatch, a.stow.onDeck, a.stow.row, b.stow.row) : 99;
  const sameRow = a.stow.row === b.stow.row;
  const hDiff = Math.abs(a.stow.hatch - b.stow.hatch);
  const holdDiff = Math.abs(holdId(a.stow.hatch) - holdId(b.stow.hatch));
  const tierGap = Math.abs(a.stow.tier - b.stow.tier);
  const bayGap = Math.abs(a.stow.bay - b.stow.bay);

  if (code === "1") return true;
  if (code === "*") return false;
  if (code === "2") {
    // Closed-container “Separated from”: one empty cell athwart, one empty
    // tier vertically, or 20' fwd vs 20' aft on the same hatch. Adjacent
    // hatch covers on the same level are not separated.
    if (!sameLevel) return true;
    if (!sameHatch) return hDiff !== 1;
    if (cells >= 2) return true;
    if (tierGap >= 4) return true;
    if (sameRow && bayGap >= 2) return true;
    return false;
  }
  if (code === "3") {
    if (sameHatch) return false;
    if (a.stow.onDeck && b.stow.onDeck && hDiff <= 1) return false;
    if (!a.stow.onDeck && !b.stow.onDeck && holdDiff === 0) return false;
    return true;
  }
  if (code === "4") {
    return holdDiff >= 2;
  }
  return true;
}

function pairIssue(a: Box, b: Box): StowIssue | null {
  // IMDG 3.4.4.2: 7.2.4 / 176.83 does not apply to LQ packages or to CTUs of only LQ.
  if (a.key === b.key) {
    const groups = a.fullLineGroups;
    if (groups.length < 2) return null;
    let worst: { code: SegCode; x: string; y: string } | null = null;
    for (let i = 0; i < groups.length; i++) {
      for (let j = i + 1; j < groups.length; j++) {
        const hit = worstCode(groups[i], groups[j]);
        if (!worst || CODE_RANK[hit.code] > CODE_RANK[worst.code]) {
          worst = { code: hit.code, x: hit.a, y: hit.b };
        }
      }
    }
    // Away from (1) may share a closed CTU. Do not segregate a UN from its own subsidiary.
    if (!worst || CODE_RANK[worst.code] <= 1) return null;
    return {
      id: `seg-same-${a.key}-${worst.x}-${worst.y}`,
      severity: "seg",
      hatch: a.stow?.hatch ?? 0,
      containers: [a.container],
      uns: a.uns,
      title: `${a.container} has incompatible classes in the same box`,
      detail: `Class ${worst.x} and class ${worst.y} require ${CODE_LABEL[worst.code]}. Limited quantity lines in this box are ignored (IMDG 3.4.4.2). Full DG cannot share a container at that code.`,
      rule: `49 CFR 176.83(b) ${worst.code}`,
    };
  }

  const classesA = a.fullClasses;
  const classesB = b.fullClasses;
  if (!classesA.length || !classesB.length) return null;

  const { code, a: ca, b: cb } = worstCode(classesA, classesB);
  if (CODE_RANK[code] <= 1) return null;
  if (pairSatisfied(code, a, b)) return null;
  const hatch = a.stow?.hatch ?? b.stow?.hatch ?? 0;
  const where =
    a.stow && b.stow
      ? `Hatch ${a.stow.hatch} ${a.stow.onDeck ? "deck" : "hold"} row ${String(a.stow.row).padStart(2, "0")} vs Hatch ${b.stow.hatch} ${b.stow.onDeck ? "deck" : "hold"} row ${String(b.stow.row).padStart(2, "0")}`
      : "positions on this voyage";
  return {
    id: `seg-${a.key}-${b.key}-${ca}-${cb}`,
    severity: "seg",
    hatch,
    containers: [a.container, b.container],
    uns: [...a.uns, ...b.uns],
    title: `${a.container} and ${b.container} are too close`,
    detail: `Class ${ca} vs class ${cb} is “${CODE_LABEL[code]}”. ${where}. Closed-container distances from 176.83 / IMDG 7.4.2.`,
    rule: `49 CFR 176.83(b) ${code}`,
  };
}

export interface VoyageScreen {
  issues: StowIssue[];
  blocks: number;
  segs: number;
  watches: number;
  byHatch: Map<number, StowIssue[]>;
  byContainer: Map<string, StowIssue[]>;
}

function mergeBaplie(boxes: Box[], plan: BapliePlan | null): Box[] {
  if (!plan) return boxes;
  const map = new Map(boxes.map((b) => [b.key, b]));
  for (const p of plan.boxes) {
    if (!p.dg.length) continue;
    const key = containerKey(p.container) || p.container.toUpperCase();
    const cur = map.get(key) ?? {
      key,
      container: p.container,
      stow: p.stow,
      classes: [],
      fullClasses: [],
      fullLineGroups: [],
      uns: [],
      names: [],
      lines: [],
      allLq: false,
    };
    if (!cur.stow && p.stow) cur.stow = p.stow;
    const dcmPresent = cur.lines.length > 0;
    for (const dg of p.dg) {
      const g = classGroup(dg.cls);
      if (g && !cur.classes.includes(g)) cur.classes.push(g);
      if (dg.subsidiary) {
        const sg = classGroup(dg.subsidiary);
        if (sg && !cur.classes.includes(sg)) cur.classes.push(sg);
      }
      // BAPLIE DGS has no LQ flag. DCM-present (including all-LQ) keeps DCM
      // classes; BAPLIE-only DGS is full DG.
      if (!dcmPresent) {
        const group = [g, dg.subsidiary ? classGroup(dg.subsidiary) : null].filter(Boolean) as string[];
        if (g && !cur.fullClasses.includes(g)) cur.fullClasses.push(g);
        if (group.length) cur.fullLineGroups.push(group);
        if (dg.subsidiary) {
          const sg = classGroup(dg.subsidiary);
          if (sg && !cur.fullClasses.includes(sg)) cur.fullClasses.push(sg);
        }
      }
      if (dg.un && !cur.uns.includes(dg.un)) cur.uns.push(dg.un);
      if (dg.name && !cur.names.includes(dg.name)) cur.names.push(dg.name);
    }
    map.set(key, cur);
  }
  return [...map.values()];
}

/**
 * Stow disagreement only. Does not write onto line.input — use resolvedStow
 * for the view-model cell.
 */
export function applyPlanStow(lines: LineResult[], plan: BapliePlan | null): StowIssue[] {
  if (!plan) return [];
  const byCn = new Map<string, BaplieBox>();
  for (const b of plan.boxes) {
    const k = containerKey(b.container);
    if (k && b.stow) byCn.set(k, b);
  }
  const issues: StowIssue[] = [];
  const seen = new Set<string>();
  for (const line of lines) {
    const k = containerKey(line.input.container);
    if (!k) continue;
    const box = byCn.get(k);
    if (!box?.stow) continue;
    const dcm = parseStow(line.input.stowLoc);
    const planRaw = box.stowRaw || formatStowRaw(box.stow);
    if (!dcm) continue;
    if (stowEqual(dcm, box.stow)) continue;
    if (seen.has(k)) continue;
    seen.add(k);
    const dcmRaw = line.input.stowLoc || formatStowRaw(dcm);
    issues.push({
      id: `stow-mismatch-${k}`,
      severity: "watch",
      hatch: dcm.hatch,
      containers: [line.input.container || k],
      uns: line.un ? [line.un] : [],
      title: `DCM stow ${dcmRaw} vs BAPLIE ${planRaw} — pick one.`,
      detail: `${line.input.container || k} is ${dcmRaw} on the DCM and ${planRaw} on the BAPLIE. Alarms stay on the DCM cell; the plan slot is drawn separately.`,
      rule: "DCM vs BAPLIE stow",
    });
  }
  return issues;
}

function padUn(un: string): string {
  const d = (un || "").replace(/^UN/i, "").replace(/\D/g, "");
  if (!d) return "";
  return d.padStart(4, "0").slice(-4);
}

function classSig(cls: string, sub?: string): string {
  const g = classGroup(cls) || (cls || "").replace(/\s+/g, "").toUpperCase();
  const extracted = (cls || "").match(/\(([^)]+)\)/);
  const subRaw = (sub || extracted?.[1] || "").trim();
  const sg = subRaw ? classGroup(subRaw) || subRaw : "";
  if (!g) return sg;
  return sg ? `${g}|${sg}` : g;
}

function classDisplay(cls: string, sub?: string): string {
  const c = (cls || "").trim();
  const extracted = c.match(/^([^\s(]+)\s*\(([^)]+)\)/);
  const primary = extracted ? extracted[1] : c;
  const s = (sub || extracted?.[2] || "").trim();
  if (s) return `${primary} (${s})`;
  return primary;
}

function uniqueJoin(values: string[]): string {
  return [...new Set(values.filter(Boolean))].join(", ");
}

/**
 * Same container: Excel UN/class vs BAPLIE DGS. Stow mismatch is a different watch.
 */
export function cargoCompareIssues(lines: LineResult[], plan: BapliePlan | null): StowIssue[] {
  if (!plan) return [];
  const dcmBy = new Map<string, LineResult[]>();
  for (const line of lines) {
    const k = containerKey(line.input.container);
    if (!k || !line.un) continue;
    const cur = dcmBy.get(k) ?? [];
    cur.push(line);
    dcmBy.set(k, cur);
  }
  const issues: StowIssue[] = [];
  const seen = new Set<string>();
  for (const box of plan.boxes) {
    if (!box.dg.length) continue;
    const k = containerKey(box.container);
    if (!k || seen.has(k)) continue;
    const dcmLines = dcmBy.get(k);
    if (!dcmLines?.length) continue;
    seen.add(k);
    const stow = parseStow(dcmLines[0].input.stowLoc) ?? box.stow;
    const hatch = stow?.hatch ?? 0;
    const dcmUns = [...new Set(dcmLines.map((l) => padUn(l.un)).filter(Boolean))].sort();
    const bapUns = [...new Set(box.dg.map((d) => padUn(d.un)).filter(Boolean))].sort();
    const dcmClass = new Map<string, string>();
    for (const l of dcmLines) {
      const sig = classSig(l.hazClass, l.input.subsidiary);
      if (!sig) continue;
      if (!dcmClass.has(sig)) dcmClass.set(sig, classDisplay(l.hazClass, l.input.subsidiary));
    }
    const bapClass = new Map<string, string>();
    for (const d of box.dg) {
      const sig = classSig(d.cls, d.subsidiary);
      if (!sig) continue;
      if (!bapClass.has(sig)) bapClass.set(sig, classDisplay(d.cls, d.subsidiary));
    }
    const base = {
      severity: "watch" as const,
      hatch,
      containers: [box.container],
    };
    if (bapUns.length && dcmUns.join(",") !== bapUns.join(",")) {
      issues.push({
        id: `cargo-un-${k}`,
        ...base,
        uns: [...new Set([...dcmUns, ...bapUns])],
        title: `DCM UN ${dcmUns.join(", ")} vs BAPLIE UN ${bapUns.join(", ")} — pick one.`,
        detail: `${box.container} lists UN ${uniqueJoin(dcmUns)} on the DCM and UN ${uniqueJoin(bapUns)} on the BAPLIE DGS. Same box cannot carry two identities.`,
        rule: "DCM vs BAPLIE cargo — UN",
      });
    }
    const dcmSigs = [...dcmClass.keys()].sort().join(",");
    const bapSigs = [...bapClass.keys()].sort().join(",");
    if (dcmClass.size && bapClass.size && dcmSigs !== bapSigs) {
      issues.push({
        id: `cargo-class-${k}`,
        ...base,
        uns: dcmUns.length ? dcmUns : bapUns,
        title: `DCM class ${[...dcmClass.values()].join(", ")} vs BAPLIE ${[...bapClass.values()].join(", ")} — pick one.`,
        detail: `${box.container} is class ${[...dcmClass.values()].join(", ")} on the DCM and ${[...bapClass.values()].join(", ")} on the BAPLIE DGS (including subsidiary).`,
        rule: "DCM vs BAPLIE cargo — class",
      });
    }
  }
  return issues;
}

function rowPad(row: number): string {
  return String(row).padStart(2, "0");
}

/**
 * Conversion-sheet / CSM watches that are not 176.83:
 * Bay 18 6th-tier live reefer, Hold 2 3 m from machinery, Hatch 5 05/06 5th tier.
 */
export function csmShipWatches(lines: LineResult[], plan: BapliePlan | null): StowIssue[] {
  const issues: StowIssue[] = [];
  const seen = new Set<string>();
  const push = (issue: StowIssue) => {
    if (seen.has(issue.id)) return;
    seen.add(issue.id);
    issues.push(issue);
  };

  const occupants: { key: string; container: string; stow: StowPos; operating: boolean }[] = [];
  const onPlan = new Set<string>();
  if (plan) {
    for (const b of plan.boxes) {
      if (!b.stow) continue;
      const key = containerKey(b.container) || b.container.toUpperCase();
      onPlan.add(key);
      occupants.push({
        key,
        container: b.container,
        stow: b.stow,
        operating: b.operating,
      });
    }
  }
  for (const line of lines) {
    const stow = resolvedStow(line, plan);
    if (!stow) continue;
    const key = containerKey(line.input.container) || `row-${line.input.rowIndex}`;
    if (onPlan.has(key)) continue;
    occupants.push({
      key,
      container: line.input.container || key,
      stow,
      operating: false,
    });
  }

  for (const o of occupants) {
    const spec = hatchSpec(o.stow.hatch);
    const bays = occupiedBays(o.stow, spec);
    if (o.operating && o.stow.onDeck && o.stow.tier === 92 && bays.includes(18)) {
      push({
        id: `watch-bay18-t92-${o.key}`,
        severity: "watch",
        hatch: o.stow.hatch,
        containers: [o.container],
        uns: [],
        title: `Bay 18 6th-tier live reefer — conversion sheet says do not.`,
        detail: `${o.container} is a live reefer at ${formatStowRaw(o.stow)} (Bay 18, tier 92). The conversion sheet does not allow 6th-tier reefers on bay 18.`,
        rule: "GEORGE II conversion — Bay 18 no 6th-tier reefer",
      });
    }
    if (
      o.stow.hatch === 5 &&
      o.stow.onDeck &&
      o.stow.tier === 90 &&
      (o.stow.row === 5 || o.stow.row === 6)
    ) {
      push({
        id: `watch-h5-fan-${o.key}`,
        severity: "watch",
        hatch: 5,
        containers: [o.container],
        uns: [],
        title: `${o.container} is on Hatch 5 outboard ${rowPad(o.stow.row)}, 5th tier — cargo-fan access.`,
        detail: `Outboard cells 05 and 06 on Hatch 5, 5th tier (90) are cargo-fan access. Prefer not to stow here.`,
        rule: "GEORGE II conversion — Hatch 5 cargo-fan access",
      });
    }
  }

  const hold2Boxes: { key: string; container: string; stow: StowPos; uns: string[] }[] = [];
  const hold2Seen = new Set<string>();
  for (const line of lines) {
    if (!line.un || isLimitedQty(line)) continue;
    const stow = resolvedStow(line, plan);
    if (!stow || stow.onDeck) continue;
    if (stow.hatch !== 3 && stow.hatch !== 4) continue;
    if (stow.row !== 5 && stow.row !== 6) continue;
    const key = containerKey(line.input.container) || `row-${line.input.rowIndex}`;
    if (hold2Seen.has(key)) continue;
    hold2Seen.add(key);
    hold2Boxes.push({ key, container: line.input.container || key, stow, uns: [line.un] });
  }
  if (plan) {
    for (const b of plan.boxes) {
      if (!b.dg.length || !b.stow || b.stow.onDeck) continue;
      if (b.stow.hatch !== 3 && b.stow.hatch !== 4) continue;
      if (b.stow.row !== 5 && b.stow.row !== 6) continue;
      const key = containerKey(b.container) || b.container.toUpperCase();
      if (hold2Seen.has(key)) continue;
      hold2Seen.add(key);
      hold2Boxes.push({
        key,
        container: b.container,
        stow: b.stow,
        uns: b.dg.map((d) => d.un).filter(Boolean),
      });
    }
  }
  for (const box of hold2Boxes) {
    push({
      id: `watch-h2-mach-${box.key}`,
      severity: "watch",
      hatch: box.stow.hatch,
      containers: [box.container],
      uns: box.uns,
      title: `${box.container} is within 3 m of a Hold 2 machinery-space boundary`,
      detail: `CSM Hold 2: stow 3 m from machinery-space boundaries. Outboard cells 05 and 06 sit against the vent/machinery casings — not only Hatch 10 rows 03/04.`,
      rule: "CSM Hold 2 — 3 m from machinery-space",
    });
  }
  return issues;
}

interface Occupant {
  key: string;
  container: string;
  stow: StowPos;
}

function slotOccupants(lines: LineResult[], plan: BapliePlan | null): Occupant[] {
  const map = new Map<string, Occupant>();
  if (plan) {
    for (const b of plan.boxes) {
      if (!b.stow) continue;
      const key = containerKey(b.container) || b.container.toUpperCase();
      map.set(key, { key, container: b.container, stow: b.stow });
    }
  }
  for (const line of lines) {
    const stow = resolvedStow(line, plan);
    if (!stow) continue;
    const key = containerKey(line.input.container) || `row-${line.input.rowIndex}`;
    if (map.has(key)) continue;
    map.set(key, { key, container: line.input.container || key, stow });
  }
  return [...map.values()];
}

function baysOverlap(a: Occupant, b: Occupant): boolean {
  if (a.stow.hatch !== b.stow.hatch) return false;
  if (a.stow.onDeck !== b.stow.onDeck) return false;
  if (a.stow.row !== b.stow.row) return false;
  if (a.stow.tier !== b.stow.tier) return false;
  const spec = hatchSpec(a.stow.hatch);
  const oa = occupiedBays(a.stow, spec);
  const ob = occupiedBays(b.stow, spec);
  return oa.some((bay) => ob.includes(bay));
}

export function slotOverlapIssues(lines: LineResult[], plan: BapliePlan | null): StowIssue[] {
  const occ = slotOccupants(lines, plan);
  const issues: StowIssue[] = [];
  for (let i = 0; i < occ.length; i++) {
    for (let j = i + 1; j < occ.length; j++) {
      const a = occ[i];
      const b = occ[j];
      if (a.key === b.key) continue;
      if (!baysOverlap(a, b)) continue;
      issues.push({
        id: `slot-${a.key}-${b.key}-${a.stow.bay}-${a.stow.row}-${a.stow.tier}`,
        severity: "block",
        hatch: a.stow.hatch,
        containers: [a.container, b.container],
        uns: [],
        title: "two boxes in one slot.",
        detail: `${a.container} at ${formatStowRaw(a.stow)} and ${b.container} at ${formatStowRaw(b.stow)} occupy the same 20'/40' footprint on Hatch ${a.stow.hatch}. Not 176.83.`,
        rule: "Slot overlap — two boxes in one cell",
      });
    }
  }
  return issues;
}

export function screenVoyage(lines: LineResult[], plan: BapliePlan | null = null): VoyageScreen {
  const mismatch = applyPlanStow(lines, plan);
  const cargo = cargoCompareIssues(lines, plan);
  const ship = csmShipWatches(lines, plan);
  const boxes = mergeBaplie(boxesFrom(lines, plan), plan);
  const issues: StowIssue[] = [...mismatch, ...cargo, ...ship, ...slotOverlapIssues(lines, plan)];
  for (const box of boxes) {
    const spec = box.stow ? hatchSpec(box.stow.hatch) : undefined;
    if (spec) issues.push(...locationIssues(box, spec));
  }
  for (const box of boxes) {
    const inner = pairIssue(box, box);
    if (inner) issues.push(inner);
  }
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const hit = pairIssue(boxes[i], boxes[j]);
      if (hit) issues.push(hit);
    }
  }

  const seen = new Set<string>();
  const unique = issues.filter((x) => {
    if (seen.has(x.id)) return false;
    seen.add(x.id);
    return true;
  });
  unique.sort((a, b) => {
    const rank = { block: 0, seg: 1, watch: 2 };
    return rank[a.severity] - rank[b.severity] || a.hatch - b.hatch;
  });

  const byHatch = new Map<number, StowIssue[]>();
  const byContainer = new Map<string, StowIssue[]>();
  for (const h of HATCHES) byHatch.set(h.id, []);
  for (const issue of unique) {
    const list = byHatch.get(issue.hatch) ?? [];
    list.push(issue);
    byHatch.set(issue.hatch, list);
    for (const c of issue.containers) {
      const key = containerKey(c) || c.toUpperCase();
      const cur = byContainer.get(key) ?? [];
      cur.push(issue);
      byContainer.set(key, cur);
    }
  }

  return {
    issues: unique,
    blocks: unique.filter((i) => i.severity === "block").length,
    segs: unique.filter((i) => i.severity === "seg").length,
    watches: unique.filter((i) => i.severity === "watch").length,
    byHatch,
    byContainer,
  };
}

export function issuesForKey(screen: VoyageScreen, key: string): StowIssue[] {
  const raw = key.split("#")[0];
  return screen.byContainer.get(containerKey(raw) || raw.toUpperCase()) ?? [];
}

export function worstSeverity(issues: StowIssue[]): IssueSeverity | null {
  if (issues.some((i) => i.severity === "block")) return "block";
  if (issues.some((i) => i.severity === "seg")) return "seg";
  if (issues.some((i) => i.severity === "watch")) return "watch";
  return null;
}
