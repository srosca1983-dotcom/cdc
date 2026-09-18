import type { LineResult } from "../cdc/types.ts";
import { isLimitedQty } from "../cdc/limited.ts";
import { HATCHES, hatchSpec, imdgAllowed, type HatchSpec } from "./george-ii.ts";
import { containerKey, parseStow, type StowPos } from "./stow.ts";

export interface DgLine {
  line: LineResult;
  stow: StowPos | null;
}

export interface HatchBucket {
  spec: HatchSpec;
  lines: DgLine[];
  containers: number;
  classes: string[];
  onDeck: number;
  inHold: number;
  unknownStow: number;
  cdc: number;
  review: number;
}

export interface ContainerSlot {
  key: string;
  container: string;
  stow: StowPos | null;
  lines: DgLine[];
  box?: import("../baplie/types.ts").BaplieBox;
  reefer?: boolean;
  operating?: boolean;
  conflict?: boolean;
  ghost?: boolean;
  mismatch?: boolean;
}

export function dgLines(lines: LineResult[]): DgLine[] {
  return lines
    .filter((l) => l.input.un)
    .map((l) => ({ line: l, stow: parseStow(l.input.stowLoc) }));
}

export function hatchBuckets(lines: LineResult[]): HatchBucket[] {
  const all = dgLines(lines);
  return HATCHES.map((spec) => {
    const mine = all.filter((d) => d.stow?.hatch === spec.id);
    const classes = [...new Set(mine.map((d) => d.line.hazClass).filter(Boolean))].sort();
    const containers = new Set(mine.map((d) => containerKey(d.line.input.container) || d.line.input.container).filter(Boolean)).size;
    return {
      spec,
      lines: mine,
      containers,
      classes,
      onDeck: mine.filter((d) => d.stow?.onDeck).length,
      inHold: mine.filter((d) => d.stow && !d.stow.onDeck).length,
      unknownStow: 0,
      cdc: mine.filter((d) => d.line.verdict === "CDC" || d.line.verdict === "CDC_RESIDUE").length,
      review: mine.filter((d) => d.line.verdict === "REVIEW").length,
    };
  });
}

export function unstowed(lines: LineResult[]): DgLine[] {
  return dgLines(lines).filter((d) => !d.stow);
}

export function containersOnHatch(bucket: HatchBucket): ContainerSlot[] {
  const map = new Map<string, ContainerSlot>();
  for (const d of bucket.lines) {
    const cn = containerKey(d.line.input.container) || `row-${d.line.input.rowIndex}`;
    const cur = map.get(cn) ?? {
      key: cn,
      container: d.line.input.container || "No container no.",
      stow: d.stow,
      lines: [],
    };
    cur.lines.push(d);
    if (!cur.stow && d.stow) cur.stow = d.stow;
    map.set(cn, cur);
  }
  return [...map.values()].sort((a, b) => {
    const ta = a.stow?.tier ?? 0;
    const tb = b.stow?.tier ?? 0;
    if (ta !== tb) return ta - tb;
    const ra = (a.stow?.row ?? 0) - (b.stow?.row ?? 0);
    if (ra) return ra;
    return (a.stow?.bay ?? 0) - (b.stow?.bay ?? 0);
  });
}

export function hatchWarnings(bucket: HatchBucket): string[] {
  const out: string[] = [...bucket.spec.notes];
  for (const d of bucket.lines) {
    if (!d.stow) continue;
    if (isLimitedQty(d.line)) continue;
    const cls = d.line.hazClass;
    if (!imdgAllowed(bucket.spec, cls, d.stow.onDeck)) {
      out.push(
        `${d.line.input.container || "A box"} UN ${d.line.un} class ${cls} is in a space this ship does not approve for IMDG (${d.stow.onDeck ? "on deck" : "below deck"} Hatch ${bucket.spec.id}).`,
      );
    }
  }
  return [...new Set(out)];
}

export function classColor(cls: string): string {
  if (cls.startsWith("1")) return "var(--color-cdc)";
  if (cls.startsWith("2.3") || cls.startsWith("6.1")) return "var(--color-cdc)";
  if (cls.startsWith("2")) return "var(--color-review)";
  if (cls.startsWith("3")) return "var(--color-review)";
  if (cls.startsWith("8")) return "var(--color-accent)";
  if (cls.startsWith("9")) return "var(--color-navy)";
  if (cls.startsWith("5") || cls.startsWith("4")) return "var(--color-review)";
  return "var(--color-navy-2)";
}

export { hatchSpec };
