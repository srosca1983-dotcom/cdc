import type { StowPos } from "../ship/stow.ts";

export interface BaplieDg {
  un: string;
  cls: string;
  name: string;
  packingGroup?: string;
}

export interface BaplieBox {
  container: string;
  iso?: string;
  stowRaw?: string;
  stow: StowPos | null;
  weightKg?: number;
  pol?: string;
  pod?: string;
  full?: boolean;
  reefer: boolean;
  operating: boolean;
  tempC?: number | null;
  /** GEORGE II: aft everywhere except bay 6 or 22 below. */
  motors: "aft" | "fwd";
  dg: BaplieDg[];
  booking?: string;
}

export interface BapliePlan {
  sourceName: string;
  vessel?: string;
  voyage?: string;
  pol?: string;
  pod?: string;
  boxes: BaplieBox[];
  warnings: string[];
}
