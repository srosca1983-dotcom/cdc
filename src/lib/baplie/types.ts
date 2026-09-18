import type { StowPos } from "../ship/stow.ts";

export interface BaplieDg {
  un: string;
  cls: string;
  subsidiary?: string;
  name: string;
  packingGroup?: string;
  flashpoint?: string;
}

export interface BaplieBox {
  container: string;
  iso?: string;
  stowRaw?: string;
  stow: StowPos | null;
  /** Container gross (MEA WT/VGM). Not DG net — do not run CDC on this. */
  weightKg?: number;
  pol?: string;
  pod?: string;
  transship?: string;
  finalPod?: string;
  full?: boolean;
  reefer: boolean;
  operating: boolean;
  tempC?: number | null;
  /** GEORGE II default aft; HAN+RFF overrides to forward. */
  motors: "aft" | "fwd";
  han?: string;
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
