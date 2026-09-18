import { containersOnHatch, type ContainerSlot, type HatchBucket } from "../ship/layout.ts";
import { HATCHES } from "../ship/george-ii.ts";
import type { BapliePlan } from "./types.ts";

export function hatchSlots(bucket: HatchBucket, plan: BapliePlan | null): ContainerSlot[] {
  const fromDg = containersOnHatch(bucket);
  if (!plan) return fromDg;

  const map = new Map<string, ContainerSlot>();
  const byStow = new Map<string, ContainerSlot>();

  for (const s of fromDg) {
    map.set(s.key, { ...s, reefer: false, operating: false });
    if (s.stow) byStow.set(`${s.stow.bay}-${s.stow.row}-${s.stow.tier}`, map.get(s.key)!);
  }

  for (const box of plan.boxes) {
    if (box.stow?.hatch !== bucket.spec.id) continue;
    const key = box.container.toUpperCase();
    const loc = `${box.stow.bay}-${box.stow.row}-${box.stow.tier}`;
    let cur = map.get(key);
    if (!cur && byStow.has(loc) && !byStow.get(loc)!.box) cur = byStow.get(loc);
    if (!cur) {
      cur = {
        key,
        container: box.container,
        stow: box.stow,
        lines: [],
        reefer: false,
        operating: false,
      };
      map.set(key, cur);
    }
    cur.box = box;
    cur.reefer = box.reefer;
    cur.operating = box.operating;
    if (!cur.stow) cur.stow = box.stow;
    if (box.container && cur.container.startsWith("row-")) cur.container = box.container;
    byStow.set(loc, cur);
  }

  return [...map.values()].sort((a, b) => {
    const ta = a.stow?.tier ?? 0;
    const tb = b.stow?.tier ?? 0;
    if (ta !== tb) return ta - tb;
    return (a.stow?.row ?? 0) - (b.stow?.row ?? 0);
  });
}

export function unplacedBoxes(plan: BapliePlan | null) {
  if (!plan) return [];
  return plan.boxes.filter((b) => !b.stow || !HATCHES.some((h) => h.id === b.stow?.hatch));
}

