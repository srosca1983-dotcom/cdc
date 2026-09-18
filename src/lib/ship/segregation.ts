/**
 * GEORGE II stowage screen:
 * - CSM 1.6 / IMDG cargo loading plan (where a class may sit)
 * - 49 CFR 176.83(b) as printed in CSM Rev. 15 (how far apart classes must be)
 *
 * Closed freight containers, container-ship distances (IMDG 7.4.2 / 176.83(f)).
 * Not a substitute for the IMDG Code, 49 CFR 176, or the Master’s stowage plan.
 */

import type { LineResult } from "../cdc/types.ts";
import { HATCHES, hatchSpec, type HatchSpec } from "./george-ii.ts";
import { parseStow, type StowPos } from "./stow.ts";

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
  uns: string[];
  names: string[];
  lines: LineResult[];
}

function boxesFrom(lines: LineResult[]): Box[] {
  const map = new Map<string, Box>();
  for (const line of lines) {
    if (!line.un) continue;
    const stow = parseStow(line.input.stowLoc);
    const cn = (line.input.container || "").toUpperCase() || `row-${line.input.rowIndex}`;
    const cur = map.get(cn) ?? {
      key: cn,
      container: line.input.container || "No container no.",
      stow,
      classes: [],
      uns: [],
      names: [],
      lines: [],
    };
    cur.lines.push(line);
    if (!cur.stow && stow) cur.stow = stow;
    for (const g of classesOnLine(line)) {
      if (!cur.classes.includes(g)) cur.classes.push(g);
    }
    if (!cur.uns.includes(line.un)) cur.uns.push(line.un);
    if (line.name && !cur.names.includes(line.name)) cur.names.push(line.name);
    map.set(cn, cur);
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
  const issues: StowIssue[] = [];
  const onDeck = box.stow.onDeck;
  const label = box.container;
  const cls = box.classes.join("/");
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
    for (const line of box.lines) {
      const why = hold2Forbidden(line.hazClass);
      if (why) {
        issues.push({
          id: `loc-h2-${box.key}-${line.un}`,
          severity: "block",
          ...base,
          uns: [line.un],
          title: `${label} UN ${line.un} should not be in Hold 2`,
          detail: why,
          rule: "CSM 1.6 loading table — Hold 2 (Hatches 3 & 4)",
        });
      }
      const sub = classGroup(line.input.subsidiary);
      if (classGroup(line.hazClass) === "2.3" && sub === "2.1") {
        issues.push({
          id: `loc-23fl-${box.key}`,
          severity: "block",
          ...base,
          title: `${label} UN ${line.un} 2.3 (2.1) is prohibited under deck`,
          detail: "IMDG / CSM note 20: class 2.3 with subsidiary 2.1 may not go under deck or in an enclosed Ro-Ro space.",
          rule: "CSM 1.6 note 20",
        });
      }
      if (classGroup(line.hazClass) === "5.2") {
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

  if (spec.id === 10 && box.stow) {
    issues.push({
      id: `watch-casing-${box.key}`,
      severity: "watch",
      ...base,
      title: `${label} is against the new engine casing`,
      detail: "Hatch 10 cells next to the casing should be void unless the cargo must go here. A puncture takes the ship off hire.",
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
  const rowGap = Math.abs(a.stow.row - b.stow.row);
  const sameRow = a.stow.row === b.stow.row;
  const hDiff = Math.abs(a.stow.hatch - b.stow.hatch);
  const holdDiff = Math.abs(holdId(a.stow.hatch) - holdId(b.stow.hatch));

  if (code === "1") return true;
  if (code === "*") return false;
  if (code === "2") {
    if (sameHatch && sameLevel && (rowGap < 2 || sameRow)) return false;
    return true;
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
  if (!a.classes.length || !b.classes.length) return null;

  if (a.key === b.key) {
    if (a.classes.length < 2) return null;
    let worst: { code: SegCode; x: string; y: string } | null = null;
    for (let i = 0; i < a.classes.length; i++) {
      for (let j = i + 1; j < a.classes.length; j++) {
        const code = segregationCode(a.classes[i], a.classes[j]);
        if (!worst || CODE_RANK[code] > CODE_RANK[worst.code]) {
          worst = { code, x: a.classes[i], y: a.classes[j] };
        }
      }
    }
    if (!worst || CODE_RANK[worst.code] === 0) return null;
    return {
      id: `seg-same-${a.key}-${worst.x}-${worst.y}`,
      severity: "seg",
      hatch: a.stow?.hatch ?? 0,
      containers: [a.container],
      uns: a.uns,
      title: `${a.container} has incompatible classes in the same box`,
      detail: `Class ${worst.x} and class ${worst.y} require ${CODE_LABEL[worst.code]}. They cannot share a container.`,
      rule: `49 CFR 176.83(b) ${worst.code}`,
    };
  }

  const { code, a: ca, b: cb } = worstCode(a.classes, b.classes);
  if (CODE_RANK[code] === 0) return null;
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

export function screenVoyage(lines: LineResult[]): VoyageScreen {
  const boxes = boxesFrom(lines);
  const issues: StowIssue[] = [];
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
      const key = c.toUpperCase();
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
  return screen.byContainer.get(key.toUpperCase()) ?? [];
}

export function worstSeverity(issues: StowIssue[]): IssueSeverity | null {
  if (issues.some((i) => i.severity === "block")) return "block";
  if (issues.some((i) => i.severity === "seg")) return "seg";
  if (issues.some((i) => i.severity === "watch")) return "watch";
  return null;
}
