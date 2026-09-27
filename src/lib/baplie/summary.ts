import type { BaplieBox, BapliePlan } from "./types.ts";

/** 1 metric tonne = 1 000 kg. */
export const KG_PER_MT = 1000;
/** 1 long ton = 2 240 lb = 1 016.0469088 kg. */
export const KG_PER_LT = 2240 * 0.45359237;

export type BoxSize = "20" | "40" | "45" | "other";

export interface CargoTally {
  code: string;
  name: string;
  units: number;
  teu: number;
  kg: number;
  twenty: number;
  forty: number;
  fortyFive: number;
  other: number;
  hc: number;
  full: number;
  empty: number;
  rf: number;
  live: number;
  dry: number;
  dg: number;
  missingWeight: number;
}

export interface DgClassTally {
  cls: string;
  boxes: number;
  uns: string[];
}

export interface HatchTally {
  hatch: number;
  units: number;
  dg: number;
  rf: number;
}

export interface PlanSummary {
  vessel?: string;
  voyage?: string;
  sourceName: string;
  pol?: string;
  pod?: string;
  ports: CargoTally[];
  totals: CargoTally;
  deck: CargoTally;
  hold: CargoTally;
  unplaced: CargoTally;
  dgClasses: DgClassTally[];
  hatches: HatchTally[];
}

const PORT_NAMES: Record<string, string> = {
  USHNL: "Honolulu",
  USHN: "Honolulu",
  USOGG: "Kahului",
  USHLI: "Hilo",
  USNAW: "Nawiliwili",
  USLGB: "Long Beach",
  USLG: "Long Beach",
  USLAX: "Los Angeles",
  USOAK: "Oakland",
  USSEA: "Seattle",
  USTIW: "Tacoma",
  USSAN: "San Diego",
  USPDX: "Portland",
  USNYC: "New York",
  USORF: "Norfolk",
  USCHS: "Charleston",
  USHOU: "Houston",
  USMIA: "Miami",
  USJAX: "Jacksonville",
  GUGUM: "Guam",
  MPSPN: "Saipan",
  ASPPG: "Pago Pago",
  SGSIN: "Singapore",
  SGS: "Singapore",
  HKHKG: "Hong Kong",
  TWKHH: "Kaohsiung",
  CNNGB: "Ningbo",
  CNSHA: "Shanghai",
  CNSZX: "Shenzhen",
  KRPUS: "Busan",
  JPTYO: "Tokyo",
  JPYOK: "Yokohama",
  JPOSA: "Osaka",
  JPNGY: "Nagoya",
  PHMNL: "Manila",
  VNSGN: "Ho Chi Minh",
  VNHPH: "Haiphong",
  THLCH: "Laem Chabang",
  MYPKG: "Port Klang",
  IDJKT: "Jakarta",
  AUSYD: "Sydney",
  AUMEL: "Melbourne",
  NZAKL: "Auckland",
  MXZLO: "Manzanillo",
  PACFZ: "Colon",
  CAVAN: "Vancouver",
};

export function locode(raw?: string | null): string {
  return (raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
}

export function portName(code: string): string {
  const c = locode(code);
  if (!c || c === "UNSTATED") return "Not stated";
  return PORT_NAMES[c] || PORT_NAMES[c.slice(0, 4)] || PORT_NAMES[c.slice(0, 3)] || c;
}

export function kgToMt(kg: number): number {
  return kg / KG_PER_MT;
}

export function kgToLt(kg: number): number {
  return kg / KG_PER_LT;
}

export function formatTons(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

/** ISO 6346 first char: 2 = 20', 4 = 40' (incl. 45G1 high cube), L = 45'. */
export function boxSize(box: BaplieBox): BoxSize {
  const c = (box.iso || "").trim().toUpperCase()[0];
  if (c === "2") return "20";
  if (c === "L") return "45";
  if (c === "4") return "40";
  if (c === "M" || c === "P") return "other";
  if (box.stow?.fortyFoot === false) return "20";
  if (box.stow?.fortyFoot === true) return "40";
  return "other";
}

/** Second ISO char 5 = 9'6" high cube (45G1, L5G1, 25G1). */
export function isHighCube(box: BaplieBox): boolean {
  const s = (box.iso || "").trim().toUpperCase();
  return s.length >= 2 && s[1] === "5";
}

export function teuOf(size: BoxSize): number {
  return size === "20" ? 1 : 2;
}

function blank(code: string, name: string): CargoTally {
  return {
    code,
    name,
    units: 0,
    teu: 0,
    kg: 0,
    twenty: 0,
    forty: 0,
    fortyFive: 0,
    other: 0,
    hc: 0,
    full: 0,
    empty: 0,
    rf: 0,
    live: 0,
    dry: 0,
    dg: 0,
    missingWeight: 0,
  };
}

function addBox(t: CargoTally, box: BaplieBox) {
  t.units += 1;
  const size = boxSize(box);
  t.teu += teuOf(size);
  if (size === "20") t.twenty += 1;
  else if (size === "40") t.forty += 1;
  else if (size === "45") t.fortyFive += 1;
  else t.other += 1;
  if (isHighCube(box)) t.hc += 1;
  if (box.full === false) t.empty += 1;
  else t.full += 1;
  if (box.reefer) {
    t.rf += 1;
    if (box.operating) t.live += 1;
  } else {
    t.dry += 1;
  }
  if (box.dg.length) t.dg += 1;
  if (box.weightKg != null && Number.isFinite(box.weightKg)) t.kg += box.weightKg;
  else t.missingWeight += 1;
}

function dischargeOf(box: BaplieBox, plan: BapliePlan): string {
  const code = locode(box.pod || box.finalPod || box.transship || plan.pod);
  return code || "UNSTATED";
}

function classKey(cls: string): string {
  return cls.replace(/[^0-9.]/g, "") || cls.trim() || "?";
}

export function summarizePlan(plan: BapliePlan): PlanSummary {
  const totals = blank("TOTAL", "On board");
  const deck = blank("DECK", "On deck");
  const hold = blank("HOLD", "Below");
  const unplaced = blank("UNPLACED", "Unplaced");
  const byPort = new Map<string, CargoTally>();
  const byHatch = new Map<number, HatchTally>();
  const byClass = new Map<string, { boxes: Set<string>; uns: Set<string> }>();

  for (const box of plan.boxes) {
    const code = dischargeOf(box, plan);
    let port = byPort.get(code);
    if (!port) {
      port = blank(code, portName(code));
      byPort.set(code, port);
    }
    addBox(port, box);
    addBox(totals, box);
    if (!box.stow) addBox(unplaced, box);
    else if (box.stow.onDeck) addBox(deck, box);
    else addBox(hold, box);

    if (box.stow?.hatch) {
      let h = byHatch.get(box.stow.hatch);
      if (!h) {
        h = { hatch: box.stow.hatch, units: 0, dg: 0, rf: 0 };
        byHatch.set(box.stow.hatch, h);
      }
      h.units += 1;
      if (box.dg.length) h.dg += 1;
      if (box.reefer) h.rf += 1;
    }

    if (box.dg.length) {
      for (const d of box.dg) {
        const cls = classKey(d.cls);
        let g = byClass.get(cls);
        if (!g) {
          g = { boxes: new Set(), uns: new Set() };
          byClass.set(cls, g);
        }
        g.boxes.add(box.container || "?");
        if (d.un) g.uns.add(d.un);
      }
    }
  }

  const ports = [...byPort.values()].sort((a, b) => {
    if (a.code === "UNSTATED") return 1;
    if (b.code === "UNSTATED") return -1;
    if (b.units !== a.units) return b.units - a.units;
    return a.code.localeCompare(b.code);
  });

  const dgClasses: DgClassTally[] = [...byClass.entries()]
    .map(([cls, g]) => ({ cls, boxes: g.boxes.size, uns: [...g.uns].sort() }))
    .sort((a, b) => parseFloat(a.cls) - parseFloat(b.cls) || a.cls.localeCompare(b.cls));

  const hatches = [...byHatch.values()].sort((a, b) => a.hatch - b.hatch);

  return {
    vessel: plan.vessel,
    voyage: plan.voyage,
    sourceName: plan.sourceName,
    pol: plan.pol,
    pod: plan.pod,
    ports,
    totals,
    deck,
    hold,
    unplaced,
    dgClasses,
    hatches,
  };
}

export function tallyLine(t: CargoTally): string {
  const mt = t.missingWeight === t.units && t.units > 0 ? "—" : formatTons(kgToMt(t.kg));
  const lt = t.missingWeight === t.units && t.units > 0 ? "—" : formatTons(kgToLt(t.kg));
  return [
    t.name,
    t.units,
    t.teu,
    mt,
    lt,
    t.twenty,
    t.forty,
    t.fortyFive,
    t.full,
    t.empty,
    t.rf,
    t.live,
    t.dry,
    t.dg,
  ].join("\t");
}

export function summaryText(s: PlanSummary): string {
  const head = ["Discharge", "Units", "TEU", "MT", "LT", "20'", "40'", "45'", "Full", "Empty", "RF", "Live", "Dry", "DG"].join("\t");
  const title = [s.vessel, s.voyage, s.sourceName].filter(Boolean).join(" · ");
  const rows = s.ports.map(tallyLine);
  rows.push(tallyLine(s.totals));
  const place = `On deck ${s.deck.units} · Below ${s.hold.units} · Unplaced ${s.unplaced.units}`;
  const dg =
    s.dgClasses.length === 0
      ? "No DGS in this BAPLIE."
      : `DG: ${s.dgClasses.map((d) => `class ${d.cls} × ${d.boxes}`).join(" · ")}`;
  return [`${title}`, head, ...rows, place, dg, "Gross container weight (MEA). 1 LT = 2,240 lb. Not DG net."].join("\n");
}
