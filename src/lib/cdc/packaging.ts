import type { CarriageMode, PackForm } from "./types.ts";

/** Trailing package-type codes used on Pasha / ocean DCMs (`10 CN`, `7 CY`). */
const CODE_FORM: Record<string, PackForm> = {
  CN: "rigid",
  CTN: "rigid",
  CS: "rigid",
  BX: "rigid",
  BOX: "rigid",
  FB: "rigid",
  PL: "rigid",
  PLT: "rigid",
  PLTS: "rigid",
  DR: "rigid",
  DRM: "rigid",
  PA: "rigid",
  CR: "rigid",
  PK: "rigid",
  PKG: "rigid",
  TO: "rigid",
  CY: "cylinder",
  CYL: "cylinder",
  BG: "combustible_bag",
  BAG: "combustible_bag",
  SK: "combustible_bag",
  TK: "bulk_packaging",
  TNK: "bulk_packaging",
  IBC: "bulk_packaging",
  TOT: "bulk_packaging",
};

export function packagingCode(raw: string): string {
  const t = (raw ?? "").toUpperCase().trim();
  const m = t.match(/(?:^|\s)(\d+(?:\.\d+)?)?\s*([A-Z]{1,6})$/);
  if (m) return m[2];
  return t;
}

export function classifyPackaging(raw: string, mode: CarriageMode): PackForm {
  const t = (raw ?? "").toUpperCase();
  const code = packagingCode(t);
  if (CODE_FORM[code]) return CODE_FORM[code];

  if (mode === "bulk_tanker" && (!t || /^(N\/A|-|NA|NONE|LOOSE|BULK)$/.test(t))) {
    return "ship_bulk";
  }

  if (
    /\b(CARGO\s*TANK|SHIP'?S?\s*TANK|IN\s*BULK|UNPACKAGED|LOOSE\s*BULK)\b/.test(t) ||
    /^BULK$/.test(t.trim())
  ) {
    return "ship_bulk";
  }

  if (mode === "bulk_tanker" && /\b(TANK|TANKER)\b/.test(t) && !/\b(ISO|IMO|PORTABLE|CONTAINER|TANKTAINER)\b/.test(t)) {
    return "ship_bulk";
  }

  if (
    /\b(PORTABLE\s*TANK|IMO\s*TANK|ISO\s*TANK|TANKTAINER|TANK\s*CONTAINER|T\d{1,2}\b|IBC|TOTE|FLEXITANK)\b/.test(
      t,
    ) ||
    (/\bTANK\b/.test(t) && mode !== "bulk_tanker")
  ) {
    return "bulk_packaging";
  }

  if (/\b(CYL|CYLINDER|BOTTLE|FLASK|TUBE)\b/.test(t)) return "cylinder";

  if (/\b(BURLAP|PAPER\s*BAG|PP\s*BAG|WOVEN\s*BAG)\b/.test(t) || /\b(BAG|SACK)S?\b/.test(t)) {
    return "combustible_bag";
  }

  if (
    /\b(BOX|DRUM|FIBR[E]?|JERRICAN|CRATE|CARTON|PACKAGE|PKG|PAIL|CAN|CASE|PALLET)\b/.test(t)
  ) {
    return "rigid";
  }

  if (mode === "bulk_tanker") return "ship_bulk";
  return "unknown";
}

export function packFormLabel(form: PackForm): string {
  switch (form) {
    case "ship_bulk":
      return "Carried in bulk (vessel tanks)";
    case "bulk_packaging":
      return "Bulk packaging (portable tank / IBC)";
    case "combustible_bag":
      return "Combustible bag / sack";
    case "rigid":
      return "Rigid package";
    case "cylinder":
      return "Cylinder";
    default:
      return "Packaging not identified";
  }
}
