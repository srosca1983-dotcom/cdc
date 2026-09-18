import type { BapliePlan } from "./types.ts";

const KEY = "cdc-enoad-baplie-v1";

export function saveBaplie(plan: BapliePlan | null) {
  if (typeof window === "undefined") return;
  try {
    if (!plan) {
      window.localStorage.removeItem(KEY);
      return;
    }
    window.localStorage.setItem(KEY, JSON.stringify(plan));
  } catch {
    /* quota */
  }
}

export function loadBaplie(): BapliePlan | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as BapliePlan;
    if (!parsed?.boxes?.length) return null;
    return parsed;
  } catch {
    return null;
  }
}
