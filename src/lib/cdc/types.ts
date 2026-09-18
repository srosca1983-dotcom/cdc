export type CarriageMode = "containerized" | "breakbulk" | "bulk_tanker";
export type QtyUnit = "kg" | "lb" | "mt";
export type Verdict = "CDC" | "CDC_RESIDUE" | "REVIEW" | "NOT_CDC";
export type LegacyVerdict = "CDC" | "REVIEW" | "CLEAR";

export type PackForm =
  | "ship_bulk"
  | "bulk_packaging"
  | "combustible_bag"
  | "rigid"
  | "cylinder"
  | "unknown";

export type CdcParagraph =
  | "160.202(1)"
  | "160.202(2)"
  | "160.202(3)"
  | "160.202(4)"
  | "160.202(5)"
  | "160.202(6)"
  | "160.202(7)"
  | "160.202(8)"
  | "160.202(9)";

export interface CatalogEntry {
  un: string;
  name: string;
  cls: string;
  flags: CatalogFlag[];
  zone?: string;
}

export type CatalogFlag =
  | "pih_gas"
  | "pih_liquid"
  | "bulk_lpgas"
  | "residue_always"
  | "named_bulk_liquid"
  | "an_51"
  | "an_fertilizer"
  | "an_other"
  | "expl_15d"
  | "rad_excepted"
  | "rad_type_b"
  | "rad_fissile"
  | "rad_other";

export interface VoyageInfo {
  vessel?: string;
  voyage?: string;
  pol?: string;
  pod?: string;
  date?: string;
  officialNumber?: string;
  company?: string;
}

export interface LineInput {
  rowIndex: number;
  un: string;
  na?: string;
  name: string;
  hazClass: string;
  subsidiary: string;
  packaging: string;
  packingGroup: string;
  quantityKg: number | null;
  quantityRaw: string;
  raw: string[];
  container?: string;
  booking?: string;
  technicalName?: string;
  limitedQty?: boolean;
  /** Hazard Zone A–D from the shipping paper, if a column or the name carries it. */
  hazardZone?: string;
}

export interface LineResult {
  input: LineInput;
  un: string;
  name: string;
  hazClass: string;
  packaging: string;
  packForm: PackForm;
  quantityKg: number | null;
  verdict: Verdict;
  paragraphs: CdcParagraph[];
  reasons: string[];
  needs: string[];
  pih: boolean;
  catalogName: string | null;
  legacy: LegacyVerdict;
  legacyReason: string;
  disagrees: boolean;
}

export interface EvalOptions {
  carriageMode: CarriageMode;
  defaultQtyUnit: QtyUnit;
  residueMode: boolean;
}

export interface EnoadItem {
  name: string;
  un: string;
  amountKg: number | null;
  amountLabel: string;
  basis: string;
  verdict: Verdict;
}

export interface EvalResult {
  lines: LineResult[];
  total: number;
  cdc: number;
  residue: number;
  review: number;
  notCdc: number;
  disagreements: number;
  enoad: EnoadItem[];
  notes: string[];
}

export interface ParseResult {
  header: string[];
  lines: LineInput[];
  warnings: string[];
  delimiter: "tab" | "comma" | "semicolon" | "xlsx" | "pdf";
  voyage: VoyageInfo;
  unitGuess: QtyUnit;
  sourceName?: string;
}

export const DEFAULT_OPTIONS: EvalOptions = {
  carriageMode: "containerized",
  defaultQtyUnit: "lb",
  residueMode: false,
};

export const CONTAINER_OPTIONS: EvalOptions = DEFAULT_OPTIONS;
