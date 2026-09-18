import { detectPihFromPapers, hasFlag, lookupUn } from "./catalog.ts";
import { evaluateLegacy } from "./legacy.ts";
import { classifyPackaging } from "./packaging.ts";
import { formatKg, ONE_METRIC_TON_KG, ONE_THOUSAND_POUNDS_KG, TWENTY_METRIC_TON_KG } from "./quantity.ts";
import type {
  CdcParagraph,
  EvalOptions,
  EvalResult,
  LineInput,
  LineResult,
  PackForm,
  Verdict,
} from "./types.ts";
import { DEFAULT_OPTIONS } from "./types.ts";

const DIV_11_12 = /^(1\.1|1\.2)/;
const DIV_15 = /^1\.5/;
const DIV_15D = /^1\.5D/;
const DIV_23 = /^2\.3/;
const DIV_51 = /^5\.1/;
const DIV_61 = /^6\.1/;
const CLASS_7 = /^7/;

/** IBC / bulk-packaging liquids are typically ≥ 450 kg. Smaller unknown pkgs are treated as non-bulk. */
const SMALL_PACKAGE_KG = 450;

function classTokens(line: LineInput, catalogClass?: string): string[] {
  const tokens = [line.hazClass, line.subsidiary, catalogClass ?? ""]
    .filter(Boolean)
    .map((s) => s.replace(/\s+/g, "").toUpperCase());
  return tokens;
}

function matches(tokens: string[], re: RegExp): boolean {
  return tokens.some((t) => re.test(t));
}

function upgrade(current: Verdict, next: Verdict): Verdict {
  const rank: Record<Verdict, number> = {
    NOT_CDC: 0,
    REVIEW: 1,
    CDC_RESIDUE: 2,
    CDC: 3,
  };
  return rank[next] > rank[current] ? next : current;
}

function addPara(paras: CdcParagraph[], p: CdcParagraph) {
  if (!paras.includes(p)) paras.push(p);
}

function clearlyNonBulk(line: LineInput, packForm: PackForm, qty: number | null): boolean {
  if (packForm === "bulk_packaging" || packForm === "ship_bulk") return false;
  if (packForm === "rigid" || packForm === "cylinder" || packForm === "combustible_bag") return true;
  if (line.limitedQty) return true;
  if (packForm === "unknown" && qty !== null && qty < SMALL_PACKAGE_KG) return true;
  return false;
}

interface Acc {
  verdict: Verdict;
  paras: CdcParagraph[];
  reasons: string[];
  needs: string[];
  pih: boolean;
}

function applyResidue(acc: Acc, options: EvalOptions, residueAlways: boolean, bulkLiquidOrGas: boolean) {
  if (!options.residueMode) return;
  // Residue applies only to cargo that was actually in the ship's tanks — never
  // to packaged/containerized lots just because the UN is a named bulk liquid.
  if (!bulkLiquidOrGas) return;
  if (residueAlways) {
    acc.reasons.push(
      "Residue of this liquefied gas is still CDC — 33 CFR 160.202 CDC residue excepts ammonia, chlorine, ethane, ethylene oxide, LNG, methyl bromide, sulfur dioxide, and vinyl chloride.",
    );
    return;
  }
  acc.verdict = "CDC_RESIDUE";
  acc.reasons.push(
    "Treated as CDC residue remaining after discharge (not accessible through normal transfer). Report as CDC residue on the eNOAD cargo section.",
  );
}

function evaluateLinePass1(line: LineInput, options: EvalOptions): Omit<LineResult, "disagrees" | "legacy" | "legacyReason"> {
  const entry = lookupUn(line.un);
  const catalogClass = entry?.cls;
  const tokens = classTokens(line, catalogClass);
  const packForm: PackForm = classifyPackaging(line.packaging, options.carriageMode);
  const displayName = line.name || entry?.name || `UN ${line.un}`;
  const displayClass = line.hazClass || catalogClass || "";
  const qty = line.quantityKg;

  const papers = detectPihFromPapers(line);
  const acc: Acc = {
    verdict: "NOT_CDC",
    paras: [],
    reasons: [],
    needs: [],
    pih: hasFlag(entry, "pih_gas") || hasFlag(entry, "pih_liquid") || papers.pih,
  };

  const is11or12 = matches(tokens, DIV_11_12);
  const is15d = matches(tokens, DIV_15D) || hasFlag(entry, "expl_15d");
  const is15other = matches(tokens, DIV_15) && !is15d;
  const is23 = matches(tokens, DIV_23) || hasFlag(entry, "pih_gas");
  const is51 = matches(tokens, DIV_51);
  const is61 = matches(tokens, DIV_61) || hasFlag(entry, "pih_liquid");
  const is7 = matches(tokens, CLASS_7) || Boolean(entry?.flags.some((f) => f.startsWith("rad_")));
  const shipBulk = packForm === "ship_bulk";
  const bulkPkg = packForm === "bulk_packaging" || shipBulk;
  const packaged = clearlyNonBulk(line, packForm, qty);

  // (1) Division 1.1 or 1.2 explosives — any quantity
  if (is11or12) {
    acc.verdict = "CDC";
    addPara(acc.paras, "160.202(1)");
    acc.reasons.push(
      `Division ${displayClass || "1.1/1.2"} explosive is Certain Dangerous Cargo at any quantity (33 CFR 160.202(1); 49 CFR 173.50).`,
    );
  }

  // (2) Division 1.5D blasting agents requiring a 49 CFR 176.415 permit
  if (is15d && acc.verdict !== "CDC") {
    addPara(acc.paras, "160.202(2)");
    if (packForm === "combustible_bag") {
      acc.verdict = "CDC";
      acc.reasons.push(
        "Division 1.5D blasting agent in a paper/burlap/nonrigid combustible package requires a COTP permit under 49 CFR 176.415 — that makes it CDC (33 CFR 160.202(2)).",
      );
    } else if (packForm === "rigid") {
      acc.reasons.push(
        "Division 1.5D in rigid packaging with non-combustible inner packaging is excepted from the 176.415 permit. Confirm inner packaging; if combustible inners are used it is CDC.",
      );
      acc.verdict = "REVIEW";
      acc.needs.push("Confirm inner packaging is non-combustible (49 CFR 176.415(b)(3)).");
    } else {
      acc.verdict = "REVIEW";
      acc.reasons.push(
        "Division 1.5D is CDC only when a 49 CFR 176.415 permit is required (typically combustible bags). Packaging is not clear enough to decide.",
      );
      acc.needs.push("Packaging type (bag vs rigid) for 1.5D permit test.");
    }
  } else if (is15other && acc.verdict !== "CDC") {
    acc.verdict = "REVIEW";
    acc.reasons.push(
      "Paragraph (2) is Division 1.5D blasting agents only, not every 1.5. Confirm the compatibility group on the shipping paper.",
    );
    acc.needs.push("Confirm compatibility group D for 49 CFR 176.415 / 33 CFR 160.202(2).");
  }

  // (7) Bulk liquefied gas, flammable and/or toxic, under 46 CFR 151.50-31 / 154.7
  if (hasFlag(entry, "bulk_lpgas") && shipBulk) {
    acc.verdict = "CDC";
    addPara(acc.paras, "160.202(7)");
    acc.reasons.push(
      `${entry?.name ?? displayName} carried in bulk as a flammable and/or toxic liquefied gas is CDC (33 CFR 160.202(7); 46 CFR 154.7).`,
    );
  } else if (hasFlag(entry, "bulk_lpgas") && options.carriageMode === "bulk_tanker") {
    acc.verdict = "CDC";
    addPara(acc.paras, "160.202(7)");
    acc.reasons.push(
      "Bulk-tanker mode: this liquefied gas is treated as ship's-tank cargo and is CDC under 33 CFR 160.202(7).",
    );
  }

  // (8) Named bulk liquids
  if (hasFlag(entry, "named_bulk_liquid") && shipBulk) {
    acc.verdict = "CDC";
    addPara(acc.paras, "160.202(8)");
    acc.reasons.push(
      `${entry?.name ?? displayName} is a named bulk liquid CDC when carried in bulk (33 CFR 160.202(8)).`,
    );
  } else if (hasFlag(entry, "named_bulk_liquid") && options.carriageMode === "bulk_tanker") {
    acc.verdict = "CDC";
    addPara(acc.paras, "160.202(8)");
    acc.reasons.push(
      "Bulk-tanker mode: named bulk liquid under 33 CFR 160.202(8) is CDC.",
    );
  } else if (hasFlag(entry, "named_bulk_liquid") && !shipBulk) {
    acc.reasons.push(
      `${entry?.name ?? displayName} is a named bulk-liquid CDC only when carried in the ship's tanks — packaged/containerized lots are not CDC under (8). Check Division 6.1 PIH rules separately if they apply.`,
    );
  }

  // (9) Bulk ammonium nitrate / AN fertilizer Division 5.1
  if ((hasFlag(entry, "an_51") || hasFlag(entry, "an_fertilizer")) && shipBulk) {
    acc.verdict = "CDC";
    addPara(acc.paras, "160.202(9)");
    acc.reasons.push(
      "Ammonium nitrate / AN-based fertilizer listed as Division 5.1 and carried in bulk is CDC (33 CFR 160.202(9)).",
    );
  } else if (
    (hasFlag(entry, "an_51") || hasFlag(entry, "an_fertilizer")) &&
    options.carriageMode === "bulk_tanker"
  ) {
    acc.verdict = "CDC";
    addPara(acc.paras, "160.202(9)");
    acc.reasons.push("Bulk-tanker mode: Division 5.1 ammonium nitrate in bulk is CDC.");
  }

  // (4) Division 5.1 oxidizers requiring a 176.415 permit (packaged AN)
  if (hasFlag(entry, "an_51") || hasFlag(entry, "an_other") || (hasFlag(entry, "an_fertilizer") && is51)) {
    addPara(acc.paras, "160.202(4)");
    if (packForm === "combustible_bag") {
      acc.verdict = upgrade(acc.verdict, "CDC");
      acc.reasons.push(
        "Ammonium nitrate in a paper/burlap/nonrigid combustible package requires a COTP permit (49 CFR 176.415(a)) and is therefore CDC (33 CFR 160.202(4)).",
      );
    } else if (hasFlag(entry, "an_51") && packForm === "rigid") {
      acc.reasons.push(
        "UN 1942 in a rigid packaging with non-combustible inner packaging does not need a 176.415 permit. Not CDC under (4) unless carried in bulk (see (9)).",
      );
      if (acc.verdict === "NOT_CDC") {
        acc.verdict = "REVIEW";
        acc.needs.push("Confirm inner packaging is non-combustible.");
      }
    } else if (hasFlag(entry, "an_fertilizer") && packForm === "rigid") {
      acc.reasons.push(
        "UN 2067 in rigid packaging is excepted from the permit if the COTP is notified 24 hours before loading/unloading more than 454 kg (49 CFR 176.415(b)(2)). Not automatic CDC when packaged.",
      );
    } else if (hasFlag(entry, "an_other")) {
      acc.verdict = upgrade(acc.verdict, "REVIEW");
      acc.reasons.push(
        "This ammonium nitrate variant (liquid or emulsion) may require a 176.415 permit as 'any other ammonium nitrate' not listed in 49 CFR 176.410. Confirm with the COTP / 176.415 before omitting it from the eNOAD.",
      );
      acc.needs.push("Confirm whether 49 CFR 176.415 permit applies.");
    } else if (packForm === "unknown" && !shipBulk) {
      acc.verdict = upgrade(acc.verdict, "REVIEW");
      acc.reasons.push("Packaged ammonium nitrate is CDC only if a 176.415 permit is required. Packaging type is missing.");
      acc.needs.push("Packaging type for ammonium nitrate permit test.");
    }
  }

  // (3) Division 2.3 PIH gas > 1 metric ton per vessel (per UN)
  if (is23) {
    acc.pih = true;
    addPara(acc.paras, "160.202(3)");
    if (qty !== null && qty > ONE_METRIC_TON_KG) {
      acc.verdict = upgrade(acc.verdict, "CDC");
      acc.reasons.push(
        `Division 2.3 PIH gas totaling ${formatKg(qty)} exceeds 1 metric ton — CDC (33 CFR 160.202(3)).`,
      );
    } else if (qty !== null && qty <= ONE_METRIC_TON_KG && acc.verdict !== "CDC") {
      acc.reasons.push(
        `Division 2.3 quantity on this line is ${formatKg(qty)}, at or under the 1 metric ton per-vessel threshold. Not CDC under (3) unless other lines of the same UN push the total over 1 MT, or it is bulk liquefied gas under (7).`,
      );
    } else if (qty === null && acc.verdict !== "CDC") {
      acc.verdict = "REVIEW";
      if (bulkPkg) {
        acc.reasons.push(
          "Division 2.3 in a tank typically exceeds 1 metric ton. Confirm net quantity — if the vessel total for this UN is over 1 MT it is CDC (33 CFR 160.202(3)).",
        );
      } else {
        acc.reasons.push(
          "Division 2.3 is CDC only when the vessel total exceeds 1 metric ton. Quantity is missing.",
        );
      }
      acc.needs.push("Net quantity (kg or MT) for this UN — 1 MT threshold.");
    }
  }

  // (5) Liquid 6.1 (primary or subsidiary) that is PIH, in bulk packaging OR > 20 MT packaged
  const pihLiquid = hasFlag(entry, "pih_liquid") || (papers.pih && is61);
  const maybe61 = is61 || pihLiquid;
  if (maybe61) {
    addPara(acc.paras, "160.202(5)");
    const knownPih = pihLiquid || acc.pih;
    if (pihLiquid) acc.pih = true;

    if (knownPih && bulkPkg) {
      acc.verdict = upgrade(acc.verdict, "CDC");
      acc.reasons.push(
        "Liquid PIH material (Division 6.1 primary or subsidiary) in bulk packaging is CDC at any quantity (33 CFR 160.202(5); 49 CFR 171.8 bulk packaging).",
      );
    } else if (knownPih && qty !== null && qty > TWENTY_METRIC_TON_KG) {
      acc.verdict = upgrade(acc.verdict, "CDC");
      acc.reasons.push(
        `Liquid PIH totaling ${formatKg(qty)} exceeds 20 metric tons when not in bulk packaging — CDC (33 CFR 160.202(5)).`,
      );
    } else if (knownPih && qty !== null && qty <= TWENTY_METRIC_TON_KG && !bulkPkg) {
      acc.reasons.push(
        `Known PIH liquid, packaged, ${formatKg(qty)} — under the 20 MT packaged threshold. Not CDC under (5) unless other lines of the same UN push the total over 20 MT.`,
      );
    } else if (knownPih && qty === null && !bulkPkg) {
      acc.verdict = upgrade(acc.verdict, "REVIEW");
      acc.reasons.push(
        "Known PIH liquid in non-bulk packaging is CDC only above 20 metric tons per vessel. Quantity is missing.",
      );
      acc.needs.push("Net quantity for 20 MT packaged-PIH test.");
    } else if (!knownPih) {
      if (bulkPkg) {
        acc.verdict = upgrade(acc.verdict, "REVIEW");
        acc.reasons.push(
          "Division 6.1 in bulk packaging. If this material is PIH it is CDC at any quantity (33 CFR 160.202(5)). Confirm the Hazard Zone on the shipping paper.",
        );
        acc.needs.push("Confirm whether this 6.1 liquid is PIH (Hazard Zone A–D).");
      } else if (packaged && qty !== null) {
        acc.reasons.push(
          `Division 6.1 in non-bulk packaging at ${formatKg(qty)}. Paragraph (5) applies only if the material is PIH and the vessel total exceeds 20 MT. This line is under that threshold.`,
        );
      } else if (packaged && qty === null) {
        acc.verdict = upgrade(acc.verdict, "REVIEW");
        acc.reasons.push(
          "Division 6.1 in non-bulk packaging. CDC only if PIH and the vessel total exceeds 20 MT. Quantity is missing.",
        );
        acc.needs.push("Net quantity for 20 MT packaged-PIH test.");
      } else {
        acc.verdict = upgrade(acc.verdict, "REVIEW");
        acc.reasons.push(
          "Division 6.1 applies, but this UN is not in the PIH catalog and packaging is not clear enough to apply the 20 MT packaged test. Confirm Hazard Zone and package type.",
        );
        acc.needs.push("Confirm whether this 6.1 liquid is PIH (Hazard Zone A–D).");
      }
    }
  }

  // (6) Class 7 HRCQ or fissile material, controlled shipment
  if (is7) {
    addPara(acc.paras, "160.202(6)");
    if (hasFlag(entry, "rad_excepted")) {
      acc.reasons.push(
        "Excepted-package Class 7 (UN 2908–2911 / 3507) cannot be a highway route controlled quantity. Not CDC under 33 CFR 160.202(6).",
      );
    } else if (hasFlag(entry, "rad_fissile")) {
      acc.verdict = upgrade(acc.verdict, "REVIEW");
      acc.reasons.push(
        "Fissile Class 7 — CDC if the shipment is a 'fissile material, controlled shipment' as defined in 49 CFR 173.403. Confirm operational controls / exclusive use.",
      );
      acc.needs.push("Confirm fissile controlled-shipment status (49 CFR 173.403).");
    } else if (hasFlag(entry, "rad_type_b")) {
      acc.verdict = upgrade(acc.verdict, "REVIEW");
      acc.reasons.push(
        "Type B / Type C package — CDC only if contents meet highway route controlled quantity (HRCQ) in 49 CFR 173.403. Check activity vs. 3,000 × A1/A2 or 1,000 TBq.",
      );
      acc.needs.push("Activity / HRCQ determination from the radioactive consignment certificate.");
    } else {
      acc.verdict = upgrade(acc.verdict, "REVIEW");
      acc.reasons.push(
        "Class 7 is CDC only as HRCQ or fissile controlled shipment — not every radioactive package. Confirm activity against 49 CFR 173.403.",
      );
      acc.needs.push("HRCQ / fissile-controlled status.");
    }
  }

  const bulkLiquidOrGas =
    acc.paras.includes("160.202(7)") || acc.paras.includes("160.202(8)");
  applyResidue(acc, options, hasFlag(entry, "residue_always"), bulkLiquidOrGas);

  if (acc.verdict === "NOT_CDC" && acc.reasons.length === 0) {
    acc.reasons.push("Does not meet any 33 CFR 160.202 Certain Dangerous Cargo category based on the class, UN, packaging, and quantity provided.");
  }

  return {
    input: line,
    un: line.un,
    name: displayName,
    hazClass: displayClass,
    packaging: line.packaging,
    packForm,
    quantityKg: qty,
    verdict: acc.verdict,
    paragraphs: acc.paras,
    reasons: acc.reasons,
    needs: acc.needs,
    pih: acc.pih,
    catalogName: entry?.name ?? null,
  };
}

function isPackaged61(l: LineResult): boolean {
  return (
    l.paragraphs.includes("160.202(5)") &&
    l.packForm !== "bulk_packaging" &&
    l.packForm !== "ship_bulk"
  );
}

function sumKnown(lines: LineResult[]): { known: number; missing: boolean } {
  let known = 0;
  let missing = false;
  for (const l of lines) {
    if (l.quantityKg === null) missing = true;
    else known += l.quantityKg;
  }
  return { known, missing };
}

function groupByUn(lines: LineResult[], pred: (l: LineResult) => boolean): Map<string, LineResult[]> {
  const map = new Map<string, LineResult[]>();
  for (const l of lines) {
    if (!pred(l)) continue;
    const arr = map.get(l.un);
    if (arr) arr.push(l);
    else map.set(l.un, [l]);
  }
  return map;
}

function pass2Quantities(lines: LineResult[], options: EvalOptions): string[] {
  const notes: string[] = [];

  // (3) per UN — "per vessel" means the whole ship of that material, not mixed 2.3s.
  for (const [un, related] of groupByUn(lines, (l) => l.paragraphs.includes("160.202(3)"))) {
    const { known, missing } = sumKnown(related);
    if (known > ONE_METRIC_TON_KG) {
      for (const l of related) {
        if (l.verdict === "CDC" || l.verdict === "CDC_RESIDUE") continue;
        l.verdict = "CDC";
        l.reasons.push(
          `Vessel total for UN ${un} Division 2.3 is ${formatKg(known)}, which exceeds 1 metric ton — CDC (33 CFR 160.202(3)). Same UN only; other 2.3 gases are totaled separately.`,
        );
        l.needs = l.needs.filter((n) => !n.includes("1 MT"));
      }
      notes.push(`UN ${un} Division 2.3 vessel total ${formatKg(known)} > 1 MT — CDC under (3).`);
    } else if (!missing) {
      for (const l of related) {
        if (l.verdict === "CDC" || l.verdict === "CDC_RESIDUE") continue;
        l.needs = l.needs.filter((n) => !n.includes("1 MT"));
        if (l.verdict === "REVIEW" && l.needs.length === 0 && !l.paragraphs.some((p) => p !== "160.202(3)")) {
          l.verdict = "NOT_CDC";
        }
      }
      notes.push(`UN ${un} Division 2.3 vessel total ${formatKg(known)} ≤ 1 MT — not CDC under (3).`);
    }
  }

  // (5) per UN packaged PIH liquid
  for (const [un, related] of groupByUn(lines, isPackaged61)) {
    const { known, missing } = sumKnown(related);
    const anyPih = related.some((l) => l.pih);
    if (known > TWENTY_METRIC_TON_KG) {
      for (const l of related) {
        if (l.verdict === "CDC" || l.verdict === "CDC_RESIDUE") continue;
        if (anyPih) {
          l.verdict = "CDC";
          l.reasons.push(
            `Vessel total for UN ${un} PIH liquid is ${formatKg(known)}, which exceeds 20 metric tons in non-bulk packaging — CDC (33 CFR 160.202(5)). Same UN only; other PIH liquids are totaled separately.`,
          );
        } else {
          l.verdict = "REVIEW";
          l.reasons.push(
            `Vessel total for UN ${un} Division 6.1 is ${formatKg(known)}, over 20 MT packaged. If this material is PIH it is CDC (33 CFR 160.202(5)). Confirm Hazard Zone on the shipping paper.`,
          );
          if (!l.needs.some((n) => n.includes("PIH"))) {
            l.needs.push("Confirm whether this 6.1 liquid is PIH (Hazard Zone A–D).");
          }
        }
        l.needs = l.needs.filter((n) => !n.includes("20 MT"));
      }
      if (anyPih) {
        notes.push(`UN ${un} packaged PIH liquid vessel total ${formatKg(known)} > 20 MT — CDC under (5).`);
      }
    } else if (!missing) {
      for (const l of related) {
        if (l.verdict === "CDC" || l.verdict === "CDC_RESIDUE") continue;
        l.needs = l.needs.filter((n) => !n.includes("20 MT"));
        if (l.verdict === "REVIEW" && l.needs.every((n) => n.includes("PIH") || n.includes("20 MT"))) {
          l.verdict = "NOT_CDC";
          l.needs = [];
          l.reasons.push(
            `Vessel total for UN ${un} ${formatKg(known)} ≤ 20 MT packaged — not CDC under (5) even if PIH.`,
          );
        }
      }
      if (anyPih) {
        notes.push(
          `UN ${un} packaged PIH liquid vessel total ${formatKg(known)} ≤ 20 MT — not CDC under (5) unless in bulk packaging.`,
        );
      }
    }
  }

  if (options.residueMode) {
    const bulkAn = lines.filter((l) => l.paragraphs.includes("160.202(9)"));
    if (bulkAn.length > 0) {
      const { known, missing } = sumKnown(bulkAn);
      if (!missing && known <= ONE_THOUSAND_POUNDS_KG) {
        for (const l of bulkAn) {
          l.verdict = "CDC_RESIDUE";
          l.reasons.push(
            `Bulk ammonium nitrate remaining after discharge is ${formatKg(known)} (≤ 1,000 lb). That meets the CDC residue quantity cap in 33 CFR 160.202. Confirm it is not piled in pockets over 2 cubic feet.`,
          );
          if (!l.needs.some((n) => n.includes("2 cubic"))) {
            l.needs.push("Confirm AN residue is not piled in pockets over 2 cubic feet — kilograms on the DCM cannot measure pile size.");
          }
        }
        notes.push(
          `Bulk AN residue ${formatKg(known)} ≤ 1,000 lb — report as CDC residue if not piled over 2 cu ft.`,
        );
      } else if (!missing && known > ONE_THOUSAND_POUNDS_KG) {
        for (const l of bulkAn) {
          l.reasons.push(
            `Remaining bulk ammonium nitrate is ${formatKg(known)}, over the 1,000 lb CDC residue cap. Still CDC under 33 CFR 160.202(9), not CDC residue.`,
          );
        }
        notes.push(`Bulk AN remaining ${formatKg(known)} > 1,000 lb — still CDC, not residue.`);
      } else if (missing) {
        for (const l of bulkAn) {
          if (l.verdict === "CDC") l.verdict = "REVIEW";
          l.reasons.push(
            "Residue of bulk ammonium nitrate is CDC residue only at ≤ 1,000 lb total and not piled in pockets over 2 cubic feet. Quantity is missing.",
          );
          if (!l.needs.some((n) => n.includes("1,000"))) {
            l.needs.push("Net quantity of remaining bulk AN — 1,000 lb residue cap.");
          }
        }
      }
    }
  }

  return notes;
}

function toEnoad(lines: LineResult[]): EvalResult["enoad"] {
  const reportable = lines.filter((l) => l.verdict === "CDC" || l.verdict === "CDC_RESIDUE");
  const byKey = new Map<string, { name: string; un: string; kg: number | null; basis: Set<string>; verdict: Verdict }>();
  for (const l of reportable) {
    const key = `${l.un}|${l.verdict}`;
    const existing = byKey.get(key);
    const basis = l.paragraphs.join(", ");
    if (!existing) {
      byKey.set(key, {
        name: l.catalogName || l.name,
        un: l.un,
        kg: l.quantityKg,
        basis: new Set(basis ? [basis] : []),
        verdict: l.verdict,
      });
    } else {
      if (l.quantityKg === null || existing.kg === null) existing.kg = existing.kg === null ? l.quantityKg : null;
      else existing.kg += l.quantityKg;
      if (basis) existing.basis.add(basis);
    }
  }
  return [...byKey.values()].map((v) => ({
    name: v.name,
    un: v.un,
    amountKg: v.kg,
    amountLabel: formatKg(v.kg),
    basis: `${[...v.basis].join("; ")}${v.verdict === "CDC_RESIDUE" ? " (residue)" : ""}`,
    verdict: v.verdict,
  }));
}

export function evaluateManifest(lines: LineInput[], options: EvalOptions = DEFAULT_OPTIONS): EvalResult {
  const evaluated: LineResult[] = lines.map((line) => {
    const pass1 = evaluateLinePass1(line, options);
    const legacy = evaluateLegacy(line);
    const mappedLegacy =
      legacy.verdict === "CLEAR" ? "NOT_CDC" : legacy.verdict === "CDC" ? "CDC" : "REVIEW";
    const disagrees = pass1.verdict !== mappedLegacy && !(pass1.verdict === "CDC_RESIDUE" && mappedLegacy === "CDC");
    return {
      ...pass1,
      legacy: legacy.verdict,
      legacyReason: legacy.reason,
      disagrees,
    };
  });

  const notes = pass2Quantities(evaluated, options);

  for (const l of evaluated) {
    const mappedLegacy = l.legacy === "CLEAR" ? "NOT_CDC" : l.legacy === "CDC" ? "CDC" : "REVIEW";
    l.disagrees = l.verdict !== mappedLegacy && !(l.verdict === "CDC_RESIDUE" && mappedLegacy === "CDC");
  }

  const cdc = evaluated.filter((l) => l.verdict === "CDC").length;
  const residue = evaluated.filter((l) => l.verdict === "CDC_RESIDUE").length;
  const review = evaluated.filter((l) => l.verdict === "REVIEW").length;
  const notCdc = evaluated.filter((l) => l.verdict === "NOT_CDC").length;

  return {
    lines: evaluated,
    total: evaluated.length,
    cdc,
    residue,
    review,
    notCdc,
    disagreements: evaluated.filter((l) => l.disagrees).length,
    enoad: toEnoad(evaluated),
    notes,
  };
}

export function evaluateSingle(partial: {
  un: string;
  name?: string;
  hazClass?: string;
  packaging?: string;
  quantityKg?: number | null;
  carriageMode?: EvalOptions["carriageMode"];
  residueMode?: boolean;
  limitedQty?: boolean;
}): LineResult {
  const line: LineInput = {
    rowIndex: 1,
    un: partial.un,
    name: partial.name ?? "",
    hazClass: partial.hazClass ?? "",
    subsidiary: "",
    packaging: partial.packaging ?? "",
    packingGroup: "",
    quantityKg: partial.quantityKg ?? null,
    quantityRaw: "",
    raw: [],
    limitedQty: partial.limitedQty,
  };
  const result = evaluateManifest([line], {
    carriageMode: partial.carriageMode ?? "containerized",
    defaultQtyUnit: "lb",
    residueMode: partial.residueMode ?? false,
  });
  return result.lines[0];
}
