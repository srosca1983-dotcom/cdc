import type { LineInput, VoyageInfo } from "./types.ts";

const KEY = "cdc-enoad-log-v1";
const MAX = 12;

export interface VoyageLog {
  at: number;
  vessel?: string;
  voyage?: string;
  pol?: string;
  pod?: string;
  sourceName?: string;
  total: number;
  cdc: number;
  review: number;
  flag: "YES" | "NO";
  subject: string;
  body: string;
  paste: string;
}

function read(): VoyageLog[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as VoyageLog[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(entries: VoyageLog[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(entries.slice(0, MAX)));
  } catch {
    /* private mode / quota */
  }
}

export function loadVoyageLog(): VoyageLog[] {
  return read();
}

export function pushVoyageLog(entry: VoyageLog): VoyageLog[] {
  const prev = read().filter(
    (e) => !(e.vessel === entry.vessel && e.voyage === entry.voyage && e.sourceName === entry.sourceName),
  );
  const next = [entry, ...prev].slice(0, MAX);
  write(next);
  return next;
}

export function voyageBits(v: VoyageInfo): Pick<VoyageLog, "vessel" | "voyage" | "pol" | "pod"> {
  return { vessel: v.vessel, voyage: v.voyage, pol: v.pol, pod: v.pod };
}

export function logLabel(e: VoyageLog): string {
  const name = [e.vessel, e.voyage].filter(Boolean).join(" ") || e.sourceName || "Voyage";
  return name;
}

const CARGO_KEY = "cdc-enoad-cargo-v1";

export interface StoredCargo {
  at: number;
  voyage: VoyageInfo;
  sourceName?: string;
  sources?: string[];
  lines: LineInput[];
}

export function saveCargo(entry: StoredCargo) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CARGO_KEY, JSON.stringify(entry));
  } catch {
    /* quota */
  }
}

export function loadCargo(): StoredCargo | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CARGO_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredCargo;
    if (!parsed?.lines?.length) return null;
    return parsed;
  } catch {
    return null;
  }
}
