import { evaluateManifest } from "./evaluate.ts";
import { CONTAINER_OPTIONS } from "./types.ts";
import type { LineInput, ParseResult } from "./types.ts";

export interface UnDelta {
  un: string;
  name: string;
  a: number;
  b: number;
}

export interface ManifestCompare {
  aName: string;
  bName: string;
  aKind: string;
  bKind: string;
  aLines: number;
  bLines: number;
  preferredName: string;
  preferredKind: string;
  mismatches: UnDelta[];
  aCdc: number;
  bCdc: number;
  aReview: number;
  bReview: number;
  agreesCdc: boolean;
}

function unBag(lines: LineInput[]): Map<string, { n: number; name: string }> {
  const m = new Map<string, { n: number; name: string }>();
  for (const l of lines) {
    const cur = m.get(l.un) ?? { n: 0, name: l.name };
    cur.n += 1;
    if (!cur.name) cur.name = l.name;
    m.set(l.un, cur);
  }
  return m;
}

export function mergeStowFromAll(results: ParseResult[]): ParseResult | null {
  const preferred = selectPreferred(results);
  if (!preferred) return null;
  const others = results.filter((r) => r !== preferred && r.lines.length > 0);
  if (others.length === 0) return preferred;
  const byContainer = new Map<string, LineInput>();
  for (const o of others) {
    for (const l of o.lines) {
      const c = l.container?.toUpperCase();
      if (c) byContainer.set(c, l);
    }
  }
  return {
    ...preferred,
    lines: preferred.lines.map((l) => {
      if (l.stowLoc && l.container) return l;
      const hit = l.container ? byContainer.get(l.container.toUpperCase()) : undefined;
      return {
        ...l,
        stowLoc: l.stowLoc || hit?.stowLoc,
        container: l.container || hit?.container,
      };
    }),
  };
}

export function selectPreferred(results: ParseResult[]): ParseResult | null {
  const withLines = results.filter((r) => r.lines.length > 0);
  if (withLines.length === 0) return null;
  const xlsx = withLines.find((r) => r.delimiter === "xlsx");
  if (xlsx) return xlsx;
  return [...withLines].sort((a, b) => b.lines.length - a.lines.length)[0];
}

export function compareManifests(a: ParseResult, b: ParseResult): ManifestCompare {
  const bagA = unBag(a.lines);
  const bagB = unBag(b.lines);
  const uns = new Set([...bagA.keys(), ...bagB.keys()]);
  const mismatches: UnDelta[] = [];
  for (const un of uns) {
    const left = bagA.get(un);
    const right = bagB.get(un);
    const na = left?.n ?? 0;
    const nb = right?.n ?? 0;
    if (na !== nb) {
      mismatches.push({
        un,
        name: left?.name || right?.name || "",
        a: na,
        b: nb,
      });
    }
  }
  mismatches.sort((x, y) => Math.abs(y.a - y.b) - Math.abs(x.a - x.b) || x.un.localeCompare(y.un));

  const evalA = a.lines.length ? evaluateManifest(a.lines, CONTAINER_OPTIONS) : null;
  const evalB = b.lines.length ? evaluateManifest(b.lines, CONTAINER_OPTIONS) : null;
  const aCdc = evalA ? evalA.cdc + evalA.residue : 0;
  const bCdc = evalB ? evalB.cdc + evalB.residue : 0;
  const preferred = selectPreferred([a, b]);

  return {
    aName: a.sourceName || "file A",
    bName: b.sourceName || "file B",
    aKind: a.delimiter,
    bKind: b.delimiter,
    aLines: a.lines.length,
    bLines: b.lines.length,
    preferredName: preferred?.sourceName || a.sourceName || "",
    preferredKind: preferred?.delimiter || a.delimiter,
    mismatches,
    aCdc,
    bCdc,
    aReview: evalA?.review ?? 0,
    bReview: evalB?.review ?? 0,
    agreesCdc: aCdc === bCdc && (evalA?.review ?? 0) === (evalB?.review ?? 0),
  };
}

export function kindLabel(kind: string): string {
  if (kind === "xlsx") return "Excel DCM";
  if (kind === "pdf") return "Printed manifest";
  if (kind === "doc" || kind === "docx") return "Word DCM";
  return kind.toUpperCase();
}
