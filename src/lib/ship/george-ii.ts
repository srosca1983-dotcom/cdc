/**
 * M/V GEORGE II — Pasha Hawaii C9 class (ABS 8012487).
 * Bay/hatch/cell from the ship’s “Bay - Hatch / Conversion” sheet:
 * odd bays = 20' (fwd/aft in the cell), even bays = 40'.
 * Aft looking forward: even rows port, 00 centerline, odd rows starboard.
 */

export type HoldAccess = "tunnel" | "deck" | "none";

export interface HatchSpec {
  id: number;
  label: string;
  hold?: string;
  holdAccess: HoldAccess;
  /** 20' / 40' / 20' bays on this hatch. */
  bays: [number, number, number];
  /** 40' design bay (even). */
  bay40: number;
  onDeckRows: number;
  onDeckTiers: number;
  holdRows: number;
  holdTiers: number;
  /** Port → stbd, aft looking forward. */
  deckRowIds: number[];
  holdRowIds: number[];
  /** On-hatch-cover IMDG allowed (CSM 1.6). Hatches 8, 9, 10, 12 are not. */
  imdgOnDeck: boolean;
  /** Below-deck IMDG only in Cargo Hold No. 2 (Hatches 3 & 4). */
  imdgHold: boolean;
  /** Hatch 10: inboard cells against the engine casing. */
  casingRows?: number[];
  notes: string[];
}

type StowLike = {
  bay: number;
  row: number;
  tier: number;
  hatch: number;
  onDeck: boolean;
  fortyFoot: boolean;
};

/** 12 across on deck. */
export const DECK_ROWS_12 = [12, 10, 8, 6, 4, 2, 1, 3, 5, 7, 9, 11];
/** Hatch 1 (bays 1-2-3): 11 across with a CL 0 cell. */
export const DECK_ROWS_H1 = [10, 8, 6, 4, 2, 0, 1, 3, 5, 7, 9];
/** Bay 38 missing the middle section. */
export const DECK_ROWS_H10 = [12, 10, 8, 6, 4, 3, 5, 7, 9, 11];
/** Inboard cells next to the Hatch 10 engine casing (not the whole cover). */
export const CASING_ROWS_H10 = [4, 3];
/** Every hold: 7 across with CL 0. */
export const HOLD_ROWS_7 = [6, 4, 2, 0, 1, 3, 5];

/** Hatch n → 20'/40'/20' bays. */
export const BAYS_BY_HATCH: [number, number, number][] = [
  [1, 2, 3],
  [5, 6, 7],
  [9, 10, 11],
  [13, 14, 15],
  [17, 18, 19],
  [21, 22, 23],
  [25, 26, 27],
  [29, 30, 31],
  [33, 34, 35],
  [37, 38, 39],
  [41, 42, 43],
  [45, 46, 47],
];

export const VESSEL = {
  name: "GEORGE II",
  clazz: "C9 class",
  abs: "8012487",
  officialNumber: "625873",
  company: "Pasha Hawaii",
  csm: "Cargo Securing Manual Rev. 15, December 2023",
  absLetter: "T2496467, 02-JAN-2024",
  house: "forward",
  sectionView: "aft-looking-forward" as const,
  conversion: "Bay - Hatch / Conversion (Antiquity / Standard)",
};

function hatch(
  id: number,
  hold: string | undefined,
  holdAccess: HoldAccess,
  extra: Partial<HatchSpec> & Pick<HatchSpec, "imdgOnDeck" | "imdgHold" | "notes" | "deckRowIds" | "holdRowIds">,
): HatchSpec {
  const bays = BAYS_BY_HATCH[id - 1];
  return {
    id,
    label: `Hatch ${id}`,
    hold,
    holdAccess,
    bays,
    bay40: bays[1],
    onDeckRows: extra.deckRowIds.length,
    onDeckTiers: extra.onDeckTiers ?? 5,
    holdRows: extra.holdRowIds.length,
    holdTiers: extra.holdTiers ?? (extra.holdRowIds.length ? 6 : 0),
    ...extra,
  };
}

export const HATCHES: HatchSpec[] = [
  hatch(1, "Hold 1", "tunnel", {
    deckRowIds: DECK_ROWS_H1,
    holdRowIds: HOLD_ROWS_7,
    onDeckTiers: 5,
    imdgOnDeck: true,
    imdgHold: false,
    notes: [
      "Bays 1-2-3. On deck is 11 across with a centerline 0 cell — the only deck bay that has 00.",
      "Hold 1 is tunnel access only. No haz below deck (not Hold 2).",
      "Immediately aft of the house. Reefers face aft; motors aft except as noted.",
    ],
  }),
  hatch(2, "Hold 1", "tunnel", {
    deckRowIds: DECK_ROWS_12,
    holdRowIds: HOLD_ROWS_7,
    imdgOnDeck: true,
    imdgHold: false,
    notes: [
      "Bays 5-6-7. On deck 12 across (no 00). Hold 1 with Hatch 1, tunnel access.",
      "If reefers go in bay 6 below (uncommon), motors must face forward.",
    ],
  }),
  hatch(3, "Hold 2 (IMDG)", "deck", {
    deckRowIds: DECK_ROWS_12,
    holdRowIds: HOLD_ROWS_7,
    imdgOnDeck: true,
    imdgHold: true,
    notes: [
      "Bays 9-10-11. Cargo Hold No. 2 — the only below-deck space approved for IMDG.",
      "Hold 2 is deck access only. Mechanically ventilated. Stow 3 m from machinery-space boundaries.",
    ],
  }),
  hatch(4, "Hold 2 (IMDG)", "deck", {
    deckRowIds: DECK_ROWS_12,
    holdRowIds: HOLD_ROWS_7,
    imdgOnDeck: true,
    imdgHold: true,
    notes: [
      "Bays 13-14-15. Hold 2 with Hatch 3. Example: 14-08-84 = Hatch 4, cell 8, 2nd tier on deck; 14-00-06 = cell 0, 3rd tier below.",
    ],
  }),
  hatch(5, "Hold 3", "tunnel", {
    deckRowIds: DECK_ROWS_12,
    holdRowIds: HOLD_ROWS_7,
    imdgOnDeck: true,
    imdgHold: false,
    notes: [
      "Bays 17-18-19. Hold 3 tunnel access only. No haz below deck.",
      "Bay 18 reefers: no 6th-tier reefers. Prefer not to use outboard cells 05 & 06 on the 5th tier (cargo-fan access).",
    ],
  }),
  hatch(6, "Hold 3", "tunnel", {
    deckRowIds: DECK_ROWS_12,
    holdRowIds: HOLD_ROWS_7,
    imdgOnDeck: true,
    imdgHold: false,
    notes: [
      "Bays 21-22-23. Hold 3 with Hatch 5. If reefers go in bay 22 below (uncommon), motors must face forward.",
    ],
  }),
  hatch(7, "Hold 4", "deck", {
    deckRowIds: DECK_ROWS_12,
    holdRowIds: HOLD_ROWS_7,
    imdgOnDeck: true,
    imdgHold: false,
    notes: ["Bays 25-26-27. Hold 4 deck access only. On-deck IMDG OK. No haz below deck."],
  }),
  hatch(8, "Hold 4", "deck", {
    deckRowIds: DECK_ROWS_12,
    holdRowIds: HOLD_ROWS_7,
    imdgOnDeck: false,
    imdgHold: false,
    notes: [
      "Bays 29-30-31. Hold 4 with Hatch 7.",
      "No IMDG on this hatch cover (CSM 1.6 — omitted after the conversion).",
    ],
  }),
  hatch(9, "Hold 5 (engine)", "none", {
    deckRowIds: DECK_ROWS_12,
    holdRowIds: [],
    holdTiers: 0,
    imdgOnDeck: false,
    imdgHold: false,
    notes: [
      "Bays 33-34-35. Hold 5 was consumed by the new engine room — no below-deck cargo.",
      "No IMDG on this hatch cover. Long lashing rods at the forward end.",
    ],
  }),
  hatch(10, "Hold 6", "deck", {
    deckRowIds: DECK_ROWS_H10,
    holdRowIds: HOLD_ROWS_7,
    onDeckTiers: 3,
    imdgOnDeck: false,
    imdgHold: false,
    casingRows: CASING_ROWS_H10,
    notes: [
      "Bays 37-38-39. Hold 6 deck access only. Bay 38 is missing the middle section.",
      "Cells next to the new engine casing — void unless cargo must go here.",
      "No IMDG on this hatch cover. Aft mast / LNG vent mast — crane booms stay clear.",
    ],
  }),
  hatch(11, "Hold 6", "deck", {
    deckRowIds: DECK_ROWS_12,
    holdRowIds: HOLD_ROWS_7,
    imdgOnDeck: true,
    imdgHold: false,
    notes: [
      "Bays 41-42-43. Hold 6 with Hatch 10. On-deck IMDG is allowed here (the aft exception).",
      "No haz below deck. Lashing is tight; 45' will fit, 40' preferred.",
    ],
  }),
  hatch(12, "Hold 7", "deck", {
    deckRowIds: DECK_ROWS_12,
    holdRowIds: HOLD_ROWS_7,
    holdTiers: 4,
    imdgOnDeck: false,
    imdgHold: false,
    notes: [
      "Bays 45-46-47. Hold 7 deck access only. Aft part of the hold is now the FPR.",
      "No IMDG on this hatch cover. Stern, next to the stack — not the house.",
      "LNG fuel tanks took former cargo space here and in Hold 5 — they are not deck cargo tanks.",
    ],
  }),
];

export function hatchSpec(id: number): HatchSpec | undefined {
  return HATCHES.find((h) => h.id === id);
}

/** Port (even, high) → centerline 00 → starboard (odd). */
export function rowsPortToStbd(rows: number[]): number[] {
  const uniq = [...new Set(rows)];
  const even = uniq.filter((r) => r !== 0 && r % 2 === 0).sort((a, b) => b - a);
  const cl = uniq.includes(0) ? [0] : [];
  const odd = uniq.filter((r) => r % 2 === 1).sort((a, b) => a - b);
  return [...even, ...cl, ...odd];
}

/** Real cover cells only — never invent Hatch 10 rows 0/1/2 or Hatch 9 hold. */
export function deckRowsFor(spec: HatchSpec, _occupied: number[] = []): number[] {
  return rowsPortToStbd([...spec.deckRowIds]);
}

export function holdRowsFor(spec: HatchSpec, _occupied: number[] = []): number[] {
  if (!spec.holdRowIds.length) return [];
  return rowsPortToStbd([...spec.holdRowIds]);
}

export function isRealRow(spec: HatchSpec, onDeck: boolean, row: number): boolean {
  const ids = onDeck ? spec.deckRowIds : spec.holdRowIds;
  return ids.includes(row);
}

/** Deck tiers start at 82 (1st on deck). 90/92 only when a box is actually there. */
export function deckTiersFor(spec: HatchSpec, occupied: number[] = []): number[] {
  const tiers: number[] = [];
  for (let i = 0; i < spec.onDeckTiers; i++) {
    const t = 82 + 2 * i;
    if (t >= 90) continue;
    tiers.push(t);
  }
  for (const t of occupied) {
    if ((t === 90 || t === 92) && !tiers.includes(t)) tiers.push(t);
  }
  return tiers.sort((a, b) => a - b);
}

/** Hold tiers start at 02. Hatch 9 is empty; Hatch 12 is four (02/04/06/08). */
export function holdTiersFor(spec: HatchSpec): number[] {
  if (!spec.holdTiers) return [];
  const tiers: number[] = [];
  for (let i = 0; i < spec.holdTiers; i++) tiers.push(2 + 2 * i);
  return tiers;
}

/** 0 = fwd 20', 1 = 40' middle, 2 = aft 20'. */
export function bayColumn(stow: Pick<StowLike, "bay">, spec: HatchSpec): 0 | 1 | 2 {
  if (stow.bay === spec.bays[0]) return 0;
  if (stow.bay === spec.bays[2]) return 2;
  return 1;
}

/** Bays a box actually occupies. A 40' takes the whole 20'/40'/20' triple. */
export function occupiedBays(stow: StowLike, spec?: HatchSpec): number[] {
  const h = spec ?? hatchSpec(stow.hatch);
  if (!h) return [stow.bay];
  if (stow.fortyFoot) return [...h.bays];
  return [stow.bay];
}

/** True when the 20'/40' footprints share a bay on the same hatch. */
export function sameBayColumn(a: StowLike, b: StowLike): boolean {
  if (a.hatch !== b.hatch) return false;
  const spec = hatchSpec(a.hatch);
  const oa = occupiedBays(a, spec);
  const ob = occupiedBays(b, spec);
  return oa.some((bay) => ob.includes(bay));
}

/** How many cells apart on the hatch line (port→stbd). 0 = same cell, 1 = neighbors. */
export function athwartGap(hatchId: number, onDeck: boolean, rowA: number, rowB: number): number {
  if (rowA === rowB) return 0;
  const spec = hatchSpec(hatchId);
  const base = spec ? (onDeck ? spec.deckRowIds : spec.holdRowIds) : [];
  const line = rowsPortToStbd([...base, rowA, rowB]);
  const ia = line.indexOf(rowA);
  const ib = line.indexOf(rowB);
  if (ia < 0 || ib < 0) return Math.abs(rowA - rowB);
  return Math.abs(ia - ib);
}

export function isCasingCell(hatchId: number, row: number): boolean {
  const spec = hatchSpec(hatchId);
  if (!spec?.casingRows?.length) return false;
  return spec.casingRows.includes(row);
}

/** CSM 1.6 — class allowed on deck (except 8/9/10/12) vs Hold 2. */
export function imdgAllowed(hatch: HatchSpec, cls: string, onDeck: boolean): boolean {
  const c = cls.trim();
  if (onDeck) return hatch.imdgOnDeck;
  if (!hatch.imdgHold) return false;
  if (/^1\.[1-6]/.test(c) && !/^1\.4S/i.test(c)) return false;
  if (/^4\./.test(c) || /^5\./.test(c)) return false;
  if (/^6\.1/.test(c)) return false;
  return true;
}

export const SHIP_NOTES = [
  "House and conning are forward. Cargo is all aft of the bridge (CSM 1.5 — no visibility restriction).",
  "Bays: each hatch is three numbers (20'/40'/20'). Odd = 20' fwd or aft in the cell; even = 40'.",
  "Cells: looking forward, port is even (12…2), centerline is 00, starboard is odd (1…11).",
  "Hatch 1 on deck is 11 across with a 00 cell. Other decks are 12 across. Holds are 7 across with 00.",
  "Below-deck IMDG: Cargo Hold No. 2 only (Hatches 3 & 4). Hold 5 is the new engine room.",
  "On-deck IMDG: every hatch cover except 8, 9, 10 and 12. Hatch 11 is allowed.",
  "Hold 7 aft is now the FPR. LNG fuel tanks replaced former cargo space — they are not deck tanks.",
];
