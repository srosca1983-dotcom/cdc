/**
 * Voyage-level “what can go wrong” from the DCM + optional BAPLIE.
 * Not EmS, not the SDS, not a substitute for the Master’s standing orders.
 * Stow / 176.83 / CSM watches still live on the Ship tab — this tab is the
 * casualty briefing (fire, explosion, toxic, wetting, overboard, entry, …).
 */

import type { LineResult } from "../cdc/types.ts";
import { isLimitedQty } from "../cdc/limited.ts";
import type { BapliePlan } from "../baplie/types.ts";
import { reeferHeatIssues } from "../baplie/heat.ts";
import { resolvedStow, screenVoyage, type StowIssue } from "../ship/segregation.ts";
import { containerKey } from "../ship/stow.ts";

export type RiskSeverity = "now" | "watch" | "prep";

export type RiskFamily =
  | "fire"
  | "explosion"
  | "toxic"
  | "spill"
  | "wetting"
  | "heat"
  | "stow"
  | "overboard"
  | "entry"
  | "pollution"
  | "report"
  | "electrical";

export const FAMILY_LABEL: Record<RiskFamily, string> = {
  fire: "Fire",
  explosion: "Explosion",
  toxic: "Toxic / asphyxiation",
  spill: "Spill / leak",
  wetting: "Water / wetting",
  heat: "Heat / reefer",
  stow: "Wrong place",
  overboard: "Lost overboard",
  entry: "Hold entry",
  pollution: "Pollution",
  report: "CDC / eNOAD",
  electrical: "Electrical",
};

export const FAMILY_ORDER: RiskFamily[] = [
  "stow",
  "fire",
  "explosion",
  "toxic",
  "spill",
  "wetting",
  "heat",
  "electrical",
  "overboard",
  "entry",
  "pollution",
  "report",
];

export interface VoyageRisk {
  id: string;
  family: RiskFamily;
  severity: RiskSeverity;
  title: string;
  why: string;
  do: string[];
  uns: string[];
  hatches: number[];
  containers: string[];
}

interface OnBoard {
  un: string;
  cls: string;
  name: string;
  container: string;
  hatch: number | null;
  onDeck: boolean | null;
  cdc: boolean;
  residue: boolean;
  review: boolean;
  lq: boolean;
  pih: boolean;
  packForm: string;
  kg: number | null;
}

const LITHIUM = /^(3090|3091|3480|3481|3536|3171)$/;
const AN = /^(1942|2067|2426|3375|0222)$/;
const WET_BATT = /^(2794|2795|2800)$/;
const POLLUTANT = /^(3077|3082)$/;
const AEROSOL = /^1950$/;

function padUn(un: string): string {
  const d = (un || "").replace(/\D/g, "");
  return d ? d.padStart(4, "0") : "";
}

function clsOf(c: string): string {
  return (c || "").trim();
}

function starts(c: string, p: string): boolean {
  return clsOf(c).startsWith(p);
}

function uniq(xs: string[]): string[] {
  return [...new Set(xs.filter(Boolean))];
}

function hatchesOf(rows: OnBoard[], pred: (r: OnBoard) => boolean = () => true): number[] {
  return [...new Set(rows.filter(pred).map((r) => r.hatch).filter((h): h is number => h != null))].sort(
    (a, b) => a - b,
  );
}

function unsOf(rows: OnBoard[]): string[] {
  return uniq(rows.map((r) => r.un));
}

function boxesOf(rows: OnBoard[]): string[] {
  return uniq(rows.map((r) => r.container));
}

function list(rows: OnBoard[], n = 4): string {
  const names = uniq(rows.map((r) => (r.un ? `UN ${r.un}` : r.cls || "DG")));
  if (names.length <= n) return names.join(", ");
  return `${names.slice(0, n).join(", ")} +${names.length - n}`;
}

function hatchList(hs: number[]): string {
  if (!hs.length) return "stow not on the papers";
  return hs.map((h) => `Hatch ${h}`).join(", ");
}

function inventory(lines: LineResult[], plan: BapliePlan | null): OnBoard[] {
  const out: OnBoard[] = [];
  const onDcm = new Set<string>();
  for (const line of lines) {
    const stow = resolvedStow(line, plan);
    const ck = containerKey(line.input.container);
    if (ck) onDcm.add(ck);
    out.push({
      un: padUn(line.un),
      cls: clsOf(line.hazClass),
      name: line.name,
      container: line.input.container || "",
      hatch: stow?.hatch ?? null,
      onDeck: stow ? stow.onDeck : null,
      cdc: line.verdict === "CDC",
      residue: line.verdict === "CDC_RESIDUE",
      review: line.verdict === "REVIEW",
      lq: isLimitedQty(line),
      pih: line.pih,
      packForm: line.packForm,
      kg: line.quantityKg,
    });
  }
  if (plan) {
    for (const box of plan.boxes) {
      const ck = containerKey(box.container);
      if (ck && onDcm.has(ck)) continue;
      for (const dg of box.dg) {
        out.push({
          un: padUn(dg.un),
          cls: clsOf(dg.cls),
          name: dg.name,
          container: box.container,
          hatch: box.stow?.hatch ?? null,
          onDeck: box.stow ? box.stow.onDeck : null,
          cdc: false,
          residue: false,
          review: false,
          lq: false,
          pih: false,
          packForm: "unknown",
          kg: null,
        });
      }
    }
  }
  return out;
}

function fromIssue(issue: StowIssue, family: RiskFamily): VoyageRisk {
  const now = issue.severity === "block" || issue.severity === "seg";
  return {
    id: `issue-${issue.id}`,
    family,
    severity: now ? "now" : "watch",
    title: issue.title,
    why: issue.detail,
    do: [issue.rule],
    uns: issue.uns,
    hatches: issue.hatch ? [issue.hatch] : [],
    containers: issue.containers,
  };
}

function familyOfIssue(issue: StowIssue): RiskFamily {
  const blob = `${issue.rule} ${issue.title} ${issue.detail}`.toLowerCase();
  if (blob.includes("heat") || blob.includes("reefer")) return "heat";
  if (blob.includes("fan") || blob.includes("access")) return "entry";
  if (blob.includes("overlap") || blob.includes("same cell")) return "stow";
  if (blob.includes("un ") && blob.includes(" vs ")) return "stow";
  if (blob.includes("class") && blob.includes(" vs ")) return "stow";
  return "stow";
}

export function voyageRisks(lines: LineResult[], plan: BapliePlan | null): VoyageRisk[] {
  const cargo = inventory(lines, plan);
  const screen = screenVoyage(lines, plan);
  const heat = reeferHeatIssues(lines, plan);
  const out: VoyageRisk[] = [];
  const seen = new Set<string>();
  const push = (r: VoyageRisk) => {
    if (seen.has(r.id)) return;
    seen.add(r.id);
    out.push(r);
  };

  for (const issue of screen.issues) {
    if (issue.severity === "seg") continue;
    if (!issue.hatch) continue;
    push(fromIssue(issue, familyOfIssue(issue)));
  }
  const segs = screen.issues.filter((i) => i.severity === "seg");
  if (segs.length) {
    push({
      id: "seg-summary",
      family: "stow",
      severity: "now",
      title:
        segs.length === 1
          ? segs[0].title
          : `${segs.length} segregation hits — boxes that should not sit this close`,
      why: segs
        .slice(0, 6)
        .map((s) => s.title)
        .join(" · "),
      do: [
        "Open Ship and move one of the pair, or confirm they are LQ / same-UN subsidiary (not a real 176.83 hit).",
        "Code 2 on the next hatch is the whole cover — that is noisy and intended.",
      ],
      uns: uniq(segs.flatMap((s) => s.uns)),
      hatches: [...new Set(segs.map((s) => s.hatch).filter(Boolean))],
      containers: uniq(segs.flatMap((s) => s.containers)),
    });
  }
  for (const issue of heat) push(fromIssue(issue, "heat"));

  const dg = cargo.filter((r) => r.un || r.cls);
  if (!dg.length && !out.length) return [];

  const full = dg.filter((r) => !r.lq);
  const lithium = full.filter((r) => LITHIUM.test(r.un));
  const an = full.filter((r) => AN.test(r.un) || (starts(r.cls, "5.1") && /nitrate/i.test(r.name)));
  const cls3 = full.filter((r) => starts(r.cls, "3"));
  const gas21 = full.filter((r) => starts(r.cls, "2.1") || AEROSOL.test(r.un));
  const gas23 = full.filter((r) => starts(r.cls, "2.3") || r.pih);
  const gas22 = full.filter((r) => starts(r.cls, "2.2"));
  const expl = full.filter((r) => starts(r.cls, "1"));
  const ox = full.filter((r) => starts(r.cls, "5.1"));
  const op = full.filter((r) => starts(r.cls, "5.2"));
  const flSol = full.filter((r) => starts(r.cls, "4.1"));
  const selfHeat = full.filter((r) => starts(r.cls, "4.2"));
  const waterRx = full.filter((r) => starts(r.cls, "4.3"));
  const toxic61 = full.filter((r) => starts(r.cls, "6.1"));
  const infect = full.filter((r) => starts(r.cls, "6.2"));
  const rad = full.filter((r) => starts(r.cls, "7"));
  const corr = full.filter((r) => starts(r.cls, "8"));
  const batt = full.filter((r) => WET_BATT.test(r.un));
  const aero = dg.filter((r) => AEROSOL.test(r.un));
  const poll = dg.filter(
    (r) => POLLUTANT.test(r.un) || /environmentally hazardous/i.test(r.name),
  );
  const under = full.filter((r) => r.onDeck === false);
  const deck = full.filter((r) => r.onDeck === true);
  const hatch1 = full.filter((r) => r.hatch === 1);
  const hatch10 = full.filter((r) => r.hatch === 10);
  const cdc = cargo.filter((r) => r.cdc || r.residue);
  const review = cargo.filter((r) => r.review);
  const liveRf = plan?.boxes.filter((b) => b.reefer && b.operating) ?? [];

  if (lithium.length) {
    const hold = lithium.filter((r) => r.onDeck === false);
    push({
      id: "lithium-runaway",
      family: "fire",
      severity: "watch",
      title: "Lithium thermal runaway — long water attack, can reignite for hours",
      why: `${list(lithium)} on ${hatchList(hatchesOf(lithium))}${
        hold.length ? ". Under deck: a hold lithium fire is a long, ugly fight." : ". On deck is the less-bad place."
      }`,
      do: [
        "Copious water from cover. Cool the pack and the neighbors. Do not lid it and walk away.",
        "SCBA — the smoke is toxic. Boundary-cool for hours. Expect reignition.",
        "If it is in a hold you cannot flood, get people out of that space and keep a charged hose on the bay.",
      ],
      uns: unsOf(lithium),
      hatches: hatchesOf(lithium),
      containers: boxesOf(lithium),
    });
  }

  if (cls3.length) {
    const hold3 = cls3.filter((r) => r.onDeck === false);
    push({
      id: "class3-fire",
      family: "fire",
      severity: "watch",
      title: hold3.length
        ? "Flammable liquid fire — and vapor can explode in a hold"
        : "Flammable liquid fire — vapor + air, cans burst, runoff carries fire",
      why: `${list(cls3)} on ${hatchList(hatchesOf(cls3))}. Paint and solvents are the usual ones on this trade.`,
      do: [
        "Foam or dry chemical on a pool. Water spray to cool boxes. No straight stream into a tote.",
        "Ignition control on that hatch. Absorb a spill; keep it out of scuppers if you can boom it.",
        ...(hold3.length
          ? ["Under deck: ventilate, gas-free before entry, no hot work. A hold of gasoline vapor will flash."]
          : []),
      ],
      uns: unsOf(cls3),
      hatches: hatchesOf(cls3),
      containers: boxesOf(cls3),
    });
  }

  if (gas21.length) {
    push({
      id: "flammable-gas",
      family: "explosion",
      severity: "watch",
      title: "Flammable gas leak — flash-back, BLEVE if a tank is in fire",
      why: `${list(gas21)} on ${hatchList(hatchesOf(gas21))}. Vapor is heavier than air and will find a hold, a bilge, or the house intakes.`,
      do: [
        "Do not extinguish a leaking gas fire unless the leak can be stopped. Cool the tank with water.",
        "If the tank discolors or vents rise, pull the team back — that is the BLEVE problem.",
        "Isolate ignition. Ventilate low spaces. Residue last contained in a tank is still a leak/fire problem.",
      ],
      uns: unsOf(gas21),
      hatches: hatchesOf(gas21),
      containers: boxesOf(gas21),
    });
  }

  if (aero.length) {
    push({
      id: "aerosol-rockets",
      family: "explosion",
      severity: "watch",
      title: "Aerosol cans rocket and burst in a fire",
      why: `${list(aero)} — even Ltd Qty cartons still cook off. Do not stand in front of the carton.`,
      do: [
        "Water spray from cover. Treat leaking cans as a flammable-mist leak: isolate, no sparks, ventilate.",
      ],
      uns: unsOf(aero),
      hatches: hatchesOf(aero),
      containers: boxesOf(aero),
    });
  }

  if (expl.length) {
    push({
      id: "explosives",
      family: "explosion",
      severity: "now",
      title: "Explosives on board — if they are in a fire, withdraw",
      why: `${list(expl)} on ${hatchList(hatchesOf(expl))}. Class 1.1/1.2 is CDC at any quantity. On GEORGE II, 1.1–1.6 is on-deck only (1.4S may go in Hold 2).`,
      do: [
        "If the cargo is not burning: fight from cover, flood adjacent boxes.",
        "If explosives are involved in fire: withdraw. Do not fight. Cool nearby cargo from a distance.",
        "Keep ignition and heat (live reefers) off that stack.",
      ],
      uns: unsOf(expl),
      hatches: hatchesOf(expl),
      containers: boxesOf(expl),
    });
  }

  if (an.length) {
    push({
      id: "an-decompose",
      family: "explosion",
      severity: "watch",
      title: "Ammonium nitrate — contamination or a hold fire is the Texas City problem",
      why: `${list(an)} on ${hatchList(hatchesOf(an))}. Bags of AN are a CDC conversation if a 176.415 permit is required.`,
      do: [
        "Flood with water. Keep oil, sawdust, and combustibles off it.",
        "Brown/orange NOx is toxic and can kill hours later — SCBA, medical even if they feel fine.",
        "If it is in a hold fire you cannot flood, get the people off.",
      ],
      uns: unsOf(an),
      hatches: hatchesOf(an),
      containers: boxesOf(an),
    });
  } else if (ox.length) {
    push({
      id: "oxidizer-fire",
      family: "fire",
      severity: "watch",
      title: "Oxidizer will feed a fire — do not treat it like ordinary cargo",
      why: `${list(ox)} on ${hatchList(hatchesOf(ox))}.`,
      do: [
        "Flood with water. Dry chemical or foam alone is the wrong tool.",
        "Keep oil and combustibles off a spill. Decomposition smoke (NOx) needs SCBA.",
      ],
      uns: unsOf(ox),
      hatches: hatchesOf(ox),
      containers: boxesOf(ox),
    });
  }

  if (op.length) {
    push({
      id: "organic-peroxide",
      family: "explosion",
      severity: "watch",
      title: "Organic peroxide — heat can run it away",
      why: `${list(op)} on ${hatchList(hatchesOf(op))}. Keep off live reefers and the engine casing.`,
      do: [
        "Cool. Do not stir a decomposing package. Withdraw if it is venting or discoloring.",
        "On-deck preferred. SDS / EmS for that UN — some want water, some do not.",
      ],
      uns: unsOf(op),
      hatches: hatchesOf(op),
      containers: boxesOf(op),
    });
  }

  if (flSol.length) {
    push({
      id: "flammable-solid",
      family: "fire",
      severity: "watch",
      title: "Flammable solid — easy to ignite, some burn fiercely",
      why: `${list(flSol)} on ${hatchList(hatchesOf(flSol))}. On GEORGE II class 4.1 is on-deck only.`,
      do: ["Water, foam, or dry chemical per the SDS. Sweep a spill — do not make a dust cloud."],
      uns: unsOf(flSol),
      hatches: hatchesOf(flSol),
      containers: boxesOf(flSol),
    });
  }

  if (selfHeat.length) {
    push({
      id: "self-heating",
      family: "fire",
      severity: "watch",
      title: "Self-heating cargo — it can take off without an outside flame",
      why: `${list(selfHeat)} on ${hatchList(hatchesOf(selfHeat))}.`,
      do: [
        "Watch that stack for heat and smoke. Water may be the wrong tool — check the SDS.",
        "Keep off live reefers. Ventilate. Do not bury it in a hold if the papers want on-deck.",
      ],
      uns: unsOf(selfHeat),
      hatches: hatchesOf(selfHeat),
      containers: boxesOf(selfHeat),
    });
  }

  if (waterRx.length) {
    push({
      id: "water-reactive",
      family: "wetting",
      severity: "watch",
      title: "Water-reactive — fire main, rain in a holed box, or a leaking hold makes flammable gas",
      why: `${list(waterRx)} on ${hatchList(hatchesOf(waterRx))}.`,
      do: [
        "Keep it dry. Do not put a straight stream on a spill unless the SDS says so.",
        "A flooded hold with 4.3 in it is a hydrogen / fire problem. Know which hatch before the weather turns.",
      ],
      uns: unsOf(waterRx),
      hatches: hatchesOf(waterRx),
      containers: boxesOf(waterRx),
    });
  }

  if (gas23.length) {
    push({
      id: "pih-gas",
      family: "toxic",
      severity: "now",
      title: "Poison gas / PIH — a leak can kill on deck in still air, and will kill in a hold",
      why: `${list(gas23)} on ${hatchList(hatchesOf(gas23))}. Smell is not a warning. CDC if that UN’s vessel total is over 1 MT.`,
      do: [
        "Upwind. Isolate. SCBA only — no filter mask. Do not enter holds.",
        "Keep off the house intakes. Notify USCG if in port. Cool from upwind if it is in a fire; do not walk the plume.",
      ],
      uns: unsOf(gas23),
      hatches: hatchesOf(gas23),
      containers: boxesOf(gas23),
    });
  }

  if (toxic61.length && !gas23.some((r) => toxic61.includes(r))) {
    const pihLiq = toxic61.filter((r) => r.pih || r.packForm === "bulk_packaging");
    push({
      id: "toxic-61",
      family: "toxic",
      severity: pihLiq.length ? "now" : "watch",
      title: pihLiq.length
        ? "PIH / toxic liquid — bulk or a big packaged lot is CDC; a leak is still poison"
        : "Toxic (6.1) — do not touch a leak, do not put it in the bilge",
      why: `${list(toxic61)} on ${hatchList(hatchesOf(toxic61))}. Packaged 6.1 is on-deck only on GEORGE II.`,
      do: [
        "Isolate. SCBA. Do not mouth-to-mouth. Medical help.",
        "Runoff is still toxic — keep it off the scuppers and out of the hold bilge.",
      ],
      uns: unsOf(toxic61),
      hatches: hatchesOf(toxic61),
      containers: boxesOf(toxic61),
    });
  }

  if (gas22.length) {
    push({
      id: "asphyxiant",
      family: "toxic",
      severity: "watch",
      title: "Non-flammable gas — asphyxiation in a hold or the house",
      why: `${list(gas22)} on ${hatchList(hatchesOf(gas22))}. Some also support combustion.`,
      do: [
        "Do not enter a hold without atmosphere readings and SCBA. Ventilate. Treat empty uncleaned as full.",
      ],
      uns: unsOf(gas22),
      hatches: hatchesOf(gas22),
      containers: boxesOf(gas22),
    });
  }

  if (infect.length) {
    push({
      id: "infectious",
      family: "toxic",
      severity: "now",
      title: "Infectious substance — do not touch, do not put people in that hold",
      why: `${list(infect)} on ${hatchList(hatchesOf(infect))}.`,
      do: [
        "Isolate the box. Notify the agent and medical. PPE per the SDS — this is not a mop-and-bucket spill.",
      ],
      uns: unsOf(infect),
      hatches: hatchesOf(infect),
      containers: boxesOf(infect),
    });
  }

  if (rad.length) {
    push({
      id: "radioactive",
      family: "toxic",
      severity: "watch",
      title: "Radioactive cargo — isolate, limit time, notify",
      why: `${list(rad)} on ${hatchList(hatchesOf(rad))}. Excepted packages (UN 2910/2911/2908/2909) are not CDC; HRCQ / fissile controlled is.`,
      do: [
        "Do not fight a fire that has involved the package unless you must. Keep time short and distance long.",
        "Notify the Master and, in port, the Coast Guard. Do not eat, drink, or smoke on that hatch.",
      ],
      uns: unsOf(rad),
      hatches: hatchesOf(rad),
      containers: boxesOf(rad),
    });
  }

  if (corr.length) {
    push({
      id: "corrosive",
      family: "spill",
      severity: "watch",
      title: "Corrosive leak — burns people and eats steel; some fume toward the house",
      why: `${list(corr)} on ${hatchList(hatchesOf(corr))}.`,
      do: [
        "Face shield, chemical gloves. Water on skin 15–20 min — do not neutralize on the body.",
        "Acid: soda ash if you have it, otherwise lots of water on deck. Keep runoff off aluminum and out of the bilge.",
        "Fuming acids on Hatch 1 will head for the house intakes — know the wind.",
      ],
      uns: unsOf(corr),
      hatches: hatchesOf(corr),
      containers: boxesOf(corr),
    });
  }

  if (batt.length) {
    push({
      id: "wet-batteries",
      family: "electrical",
      severity: "watch",
      title: "Wet-cell batteries — acid, hydrogen, and a short that starts a fire",
      why: `${list(batt)} on ${hatchList(hatchesOf(batt))}. Common pallet cargo on this trade.`,
      do: [
        "CO2 or dry chemical on an electrical fire. Do not put a straight stream into a cracked case.",
        "Keep off lithium boxes and class 5.1. Isolate leaking acid from alkalis and cyanides.",
      ],
      uns: unsOf(batt),
      hatches: hatchesOf(batt),
      containers: boxesOf(batt),
    });
  }

  if (under.length) {
    push({
      id: "hold-entry",
      family: "entry",
      severity: "watch",
      title: "DG under deck — confined space, vapor, and a hold fire you may not be able to flood",
      why: `${list(under)} under deck on ${hatchList(hatchesOf(under))}. Hold 2 (Hatches 3 & 4) is the only under-deck IMDG space on GEORGE II.`,
      do: [
        "No entry without atmosphere readings, a permit, and SCBA. Hold 2 is mechanically ventilated — still gas-free.",
        "After smoke, treat the hold as IDLH until it is proven otherwise.",
      ],
      uns: unsOf(under),
      hatches: hatchesOf(under),
      containers: boxesOf(under),
    });
  }

  if (deck.length) {
    push({
      id: "lost-overboard",
      family: "overboard",
      severity: "prep",
      title: "On-deck DG can go over the side — lashing, heavy weather, a holed box",
      why: `${list(deck, 5)} on deck at ${hatchList(hatchesOf(deck))}. A lost box is still your cargo until someone else has it.`,
      do: [
        "Check lashings on DG stacks before weather. Do not sail a damaged DG box on an outboard 05/06 if you can restow.",
        "Notify: lost DG is a pollution and a notification problem, not just a cargo claim.",
      ],
      uns: unsOf(deck),
      hatches: hatchesOf(deck),
      containers: boxesOf(deck),
    });
  }

  if (poll.length || cls3.length || corr.length) {
    const rows = poll.length ? poll : [...cls3, ...corr];
    push({
      id: "pollution",
      family: "pollution",
      severity: "prep",
      title: "A leak to the scuppers is a MARPOL problem, not just a deck wash",
      why: poll.length
        ? `${list(poll)} is marked environmentally hazardous.`
        : `Flammable liquid and corrosive on this voyage will ride the scuppers into the harbor.`,
      do: [
        "Plug scuppers if you can boom it. Do not pump a DG spill over the side.",
        "SOPEP / DG locker gear first. In port, call it in — do not wait for a sheen report from the dock.",
      ],
      uns: unsOf(rows),
      hatches: hatchesOf(rows),
      containers: boxesOf(rows),
    });
  }

  if (hatch1.length) {
    push({
      id: "house-intakes",
      family: "toxic",
      severity: "watch",
      title: "Cargo on Hatch 1 sits against the house — vapor goes in the intakes",
      why: `${list(hatch1)} on Hatch 1. House and conning are forward on GEORGE II.`,
      do: [
        "Know the wind before you open a leaking box on Hatch 1. Shut intakes if a plume is heading for the house.",
        "No smoking, no hot work on that cover.",
      ],
      uns: unsOf(hatch1),
      hatches: [1],
      containers: boxesOf(hatch1),
    });
  }

  if (hatch10.length) {
    push({
      id: "hatch10-casing",
      family: "fire",
      severity: "watch",
      title: "Hatch 10 is the engine casing — a fire there is a machinery-space problem",
      why: `${list(hatch10)} on Hatch 10. Inboard rows 03/04 sit against the casing. The LNG vent mast is plant, not a cargo tank.`,
      do: [
        "Keep DG off the inboard casing cells. Cool the casing if that stack is on fire.",
        "On-deck IMDG is not allowed on Hatch 10 — if a box is there, it is already a CSM hit (see Ship).",
      ],
      uns: unsOf(hatch10),
      hatches: [10],
      containers: boxesOf(hatch10),
    });
  }

  if (liveRf.length) {
    push({
      id: "reefer-fire",
      family: "electrical",
      severity: "watch",
      title: `${liveRf.length} live reefer${liveRf.length === 1 ? "" : "s"} — compressor fire, and heat into the next cell`,
      why: "Only operating reefers count as a heat source. NOR does not. Motors face aft except bay 6 or 22 below.",
      do: [
        "Pull power if you can do it without putting a hand in the smoke. Water to cool the box and neighbors.",
        "A live reefer next to class 2.1 / 3 / 4 / 5 / lithium is a segregation problem — it will also show on Ship.",
      ],
      uns: [],
      hatches: [...new Set(liveRf.map((b) => b.stow?.hatch).filter((h): h is number => h != null))],
      containers: liveRf.map((b) => b.container),
    });
  }

  if (cdc.length) {
    push({
      id: "cdc-report",
      family: "report",
      severity: "now",
      title: "This voyage is Certain Dangerous Cargo — eNOAD and COTP care",
      why: `${list(cdc)} meets 33 CFR 160.202. Totals are per UN. Paste the boxed block into the NVMC cargo section.`,
      do: [
        "Copy the eNOAD packet from Manifest. Do not mix UN 1005 with UN 1017.",
        "In port, a CDC voyage is extra eyes on the dock. Wrong stow on a CDC box is not just an IMDG miss.",
      ],
      uns: unsOf(cdc),
      hatches: hatchesOf(cdc),
      containers: boxesOf(cdc),
    });
  } else if (review.length) {
    push({
      id: "cdc-review",
      family: "report",
      severity: "watch",
      title: "CDC is not a yes — but some lines still need a Master decision",
      why: `${list(review)} came back REVIEW. Do not paste them into eNOAD as CDC unless you confirm 160.202.`,
      do: ["Open Manifest, read the Need: line, and decide. If you are not sure, report it."],
      uns: unsOf(review),
      hatches: hatchesOf(review),
      containers: boxesOf(review),
    });
  } else if (dg.length) {
    push({
      id: "cdc-no",
      family: "report",
      severity: "prep",
      title: "This voyage is not CDC — still paste CDC CARRIED: NO",
      why: "Containerized general cargo plus a clean negative is what NVMC wants. A wrong YES is as bad as a missed YES.",
      do: ["Copy the boxed block from Manifest. The packet is a function of the DCM, not the BAPLIE."],
      uns: [],
      hatches: [],
      containers: [],
    });
  }

  if (dg.length) {
    push({
      id: "misdeclared",
      family: "stow",
      severity: "prep",
      title: "Misdeclared cargo is how boxship DG fires start",
      why: "The DCM and the BAPLIE can disagree on UN and class. A box that says furniture and burns like class 3 is still class 3.",
      do: [
        "If DCM UN / class does not match BAPLIE DGS on the same container, pick one — that watch is on Ship.",
        "A smell, a stain, or a hot box with a clean paper is a misdeclare until proven otherwise. Isolate.",
      ],
      uns: [],
      hatches: [],
      containers: [],
    });
    push({
      id: "hot-work",
      family: "fire",
      severity: "prep",
      title: "Hot work, smoking, and grinding next to DG",
      why: "A legal stow still burns if someone welds on that cover or flicks a cigarette into a class 3 stack.",
      do: [
        "No hot work on a hatch with full DG without a permit and a charged hose. No smoking on deck period.",
        "Chipping / grinding on Hatch 1 throws sparks at the house and at whatever is on that cover.",
      ],
      uns: [],
      hatches: [],
      containers: [],
    });
    push({
      id: "after-smoke",
      family: "entry",
      severity: "prep",
      title: "After smoke or a leak: nobody in that hold, nobody without SCBA",
      why: "The usual second casualty is the entry, not the box. CO, NOx, HF, HCl, and oxygen depletion all live in the same hatch.",
      do: [
        "Atmosphere readings. Permit. SCBA. The mechanical fan on Hold 2 does not make it a coffee shop.",
        "Medical: delayed NOx and smoke inhalation — send them even if they feel fine.",
      ],
      uns: [],
      hatches: [],
      containers: [],
    });
  }

  const rank: Record<RiskSeverity, number> = { now: 0, watch: 1, prep: 2 };
  const fam = Object.fromEntries(FAMILY_ORDER.map((f, i) => [f, i])) as Record<RiskFamily, number>;
  out.sort((a, b) => rank[a.severity] - rank[b.severity] || fam[a.family] - fam[b.family]);
  return out;
}

export function risksByFamily(risks: VoyageRisk[]): { family: RiskFamily; label: string; items: VoyageRisk[] }[] {
  const grouped = new Map<RiskFamily, VoyageRisk[]>();
  for (const r of risks) {
    const list = grouped.get(r.family) ?? [];
    list.push(r);
    grouped.set(r.family, list);
  }
  return FAMILY_ORDER.filter((f) => grouped.has(f)).map((f) => ({
    family: f,
    label: FAMILY_LABEL[f],
    items: grouped.get(f) ?? [],
  }));
}
