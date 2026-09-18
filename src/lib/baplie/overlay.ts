import { containersOnHatch, type ContainerSlot, type HatchBucket } from "../ship/layout.ts";
import { HATCHES, isRealRow, occupiedBays, type HatchSpec } from "../ship/george-ii.ts";
import { containerKey, stowEqual, type StowPos } from "../ship/stow.ts";
import type { BapliePlan } from "./types.ts";

function footprintKeys(stow: StowPos): string[] {
  return occupiedBays(stow).map(
    (bay) => `${stow.hatch}-${bay}-${stow.row}-${stow.tier}-${stow.onDeck ? "d" : "h"}`,
  );
}

function markConflicts(slots: ContainerSlot[]): void {
  const byLoc = new Map<string, ContainerSlot[]>();
  for (const s of slots) {
    if (!s.stow) continue;
    for (const k of footprintKeys(s.stow)) {
      const cur = byLoc.get(k) ?? [];
      cur.push(s);
      byLoc.set(k, cur);
    }
  }
  for (const group of byLoc.values()) {
    const keys = new Set(group.map((s) => containerKey(s.container)));
    if (keys.size > 1) {
      for (const s of group) s.conflict = true;
    }
  }
}

export function hatchSlots(bucket: HatchBucket, plan: BapliePlan | null): ContainerSlot[] {
  const spec = bucket.spec;
  const fromDg = containersOnHatch(bucket);
  if (!plan) {
    const only = fromDg.map((s) => ({
      ...s,
      reefer: false,
      operating: false,
      ghost: ghostOf(s, spec),
    }));
    markConflicts(only);
    return sortSlots(only);
  }

  const slots: ContainerSlot[] = fromDg.map((s) => ({
    ...s,
    reefer: false,
    operating: false,
  }));

  for (const box of plan.boxes) {
    if (box.stow?.hatch !== spec.id) continue;
    const key = containerKey(box.container) || box.container.toUpperCase();
    const dcm = slots.find((s) => containerKey(s.container) === key && !s.box);
    if (!dcm) {
      slots.push({
        key,
        container: box.container,
        stow: box.stow,
        lines: [],
        box,
        reefer: box.reefer,
        operating: box.operating,
      });
      continue;
    }
    if (!dcm.stow) {
      dcm.stow = box.stow;
      dcm.box = box;
      dcm.reefer = box.reefer;
      dcm.operating = box.operating;
      continue;
    }
    if (stowEqual(dcm.stow, box.stow)) {
      dcm.box = box;
      dcm.reefer = box.reefer;
      dcm.operating = box.operating;
      continue;
    }
    dcm.mismatch = true;
    dcm.key = `${key}#dcm`;
    slots.push({
      key,
      container: box.container,
      stow: box.stow,
      lines: [],
      box,
      reefer: box.reefer,
      operating: box.operating,
      mismatch: true,
    });
  }

  for (const s of slots) s.ghost = ghostOf(s, spec);
  markConflicts(slots);
  return sortSlots(slots);
}

function ghostOf(s: ContainerSlot, spec: HatchSpec): boolean {
  if (!s.stow) return false;
  if (!isRealRow(spec, s.stow.onDeck, s.stow.row)) return true;
  if (s.stow.onDeck && s.stow.tier < 82) return true;
  return false;
}

function sortSlots(slots: ContainerSlot[]): ContainerSlot[] {
  return slots.sort((a, b) => {
    const ta = a.stow?.tier ?? 0;
    const tb = b.stow?.tier ?? 0;
    if (ta !== tb) return ta - tb;
    const ra = a.stow?.row ?? 0;
    const rb = b.stow?.row ?? 0;
    if (ra !== rb) return ra - rb;
    return (a.stow?.bay ?? 0) - (b.stow?.bay ?? 0);
  });
}

export function slotsAtBay(slots: ContainerSlot[], bay: number, row: number, tier: number): ContainerSlot[] {
  return slots.filter((s) => {
    if (!s.stow || s.stow.row !== row || s.stow.tier !== tier) return false;
    return occupiedBays(s.stow).includes(bay);
  });
}

export function ghostSlots(slots: ContainerSlot[], spec?: HatchSpec): ContainerSlot[] {
  return slots.filter((s) => {
    if (s.ghost) return true;
    if (!s.stow || !spec) return false;
    return !isRealRow(spec, s.stow.onDeck, s.stow.row);
  });
}

export function unplacedBoxes(plan: BapliePlan | null) {
  if (!plan) return [];
  return plan.boxes.filter((b) => !b.stow || !HATCHES.some((h) => h.id === b.stow?.hatch));
}
