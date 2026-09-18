export interface RuleCard {
  id: string;
  paragraph: string;
  title: string;
  summary: string;
  threshold: string;
  commonMiss: string;
}

export const RULE_CARDS: RuleCard[] = [
  {
    id: "p1",
    paragraph: "160.202(1)",
    title: "Division 1.1 or 1.2 explosives",
    summary:
      "Any Division 1.1 or 1.2 explosive, as defined in 49 CFR 173.50, is Certain Dangerous Cargo. Quantity and packaging do not matter.",
    threshold: "Any quantity",
    commonMiss: "Report every 1.1 / 1.2 line. 1.4S small-arms cartridges are not this category.",
  },
  {
    id: "p2",
    paragraph: "160.202(2)",
    title: "Division 1.5D blasting agents (permit)",
    summary:
      "Only 1.5D blasting agents that require a Captain of the Port permit under 49 CFR 176.415 are CDC. Combustible bags typically need the permit; rigid packaging with non-combustible inners is excepted.",
    threshold: "Permit required under 49 CFR 176.415",
    commonMiss: "Do not auto-flag every 1.5 as CDC.",
  },
  {
    id: "p3",
    paragraph: "160.202(3)",
    title: "Division 2.3 PIH gas",
    summary:
      "A Division 2.3 poisonous gas that is also poisonous by inhalation is CDC only when the quantity of all such 2.3 PIH on the vessel exceeds 1 metric ton. Totals combine every 2.3 PIH UN on board, not each UN separately. A few cylinders of chlorine are not CDC. An ISO tank of anhydrous ammonia usually is.",
    threshold: "> 1 metric ton per vessel (all 2.3 PIH combined)",
    commonMiss: "UN 1005 / 1017 / 1079 are not automatic CDC — add the vessel total first. Two different 2.3 UNs that each sit under 1 MT can still be CDC together.",
  },
  {
    id: "p4",
    paragraph: "160.202(4)",
    title: "Division 5.1 oxidizers (permit)",
    summary:
      "Division 5.1 oxidizing materials that require a 49 CFR 176.415 permit — typically ammonium nitrate UN 1942 in paper or burlap bags — are CDC. Rigid UN 1942 with non-combustible inners, and UN 2067 with 24-hour COTP notice, are excepted from the permit.",
    threshold: "Permit required under 49 CFR 176.415",
    commonMiss: "Pool shock (UN 2880 / 2468) and other 5.1 oxidizers are not CDC just because they are 5.1.",
  },
  {
    id: "p5",
    paragraph: "160.202(5)",
    title: "Liquid 6.1 PIH",
    summary:
      "A liquid with a primary or subsidiary Division 6.1 classification that is poisonous by inhalation is CDC if it is in bulk packaging (portable tank, IBC) or, when not in bulk packaging, if the vessel total of packaged PIH liquid exceeds 20 metric tons. Totals combine every PIH liquid UN on board. Ordinary 6.1 (oral/dermal toxic) is not CDC. A 5 lb carton of UN 2810 is almost never CDC.",
    threshold: "Bulk packaging, or > 20 MT packaged (all PIH liquid combined)",
    commonMiss: "Class 6.1 on the DCM is not enough — it must be PIH, and packaged lots have a 20 MT floor.",
  },
  {
    id: "p6",
    paragraph: "160.202(6)",
    title: "Class 7 HRCQ / fissile controlled shipment",
    summary:
      "Only highway route controlled quantity radioactive material or a fissile material, controlled shipment (49 CFR 173.403) is CDC. Excepted packages (UN 2910, 2911, 2908, 2909) are never HRCQ.",
    threshold: "HRCQ or fissile controlled shipment",
    commonMiss: "Do not send every Class 7 row to eNOAD as CDC.",
  },
  {
    id: "p7",
    paragraph: "160.202(7)",
    title: "Bulk liquefied gas (flammable and/or toxic)",
    summary:
      "Ship’s-tank liquefied gas under 46 CFR 151.50-31 / 154.7. Portable tanks and cylinders on a container ship are not “carried in bulk.” This screener is locked to container ships, so (7) will not fire.",
    threshold: "Carried in bulk (vessel tanks) — not used here",
    commonMiss: "An ISO tank of LPG on a boxship is packaged cargo, not paragraph (7).",
  },
  {
    id: "p8",
    paragraph: "160.202(8)",
    title: "Named bulk liquids",
    summary:
      "Acetone cyanohydrin, allyl alcohol, chlorosulfonic acid, crotonaldehyde, ethylene chlorohydrin, ethylene dibromide, methacrylonitrile, oleum, and propylene oxide are CDC when carried in the ship’s tanks. Packaged drums or tank containers on a boxship are not (8).",
    threshold: "Carried in bulk (vessel tanks) — not used here",
    commonMiss: "PO or oleum in a tank container is not named-bulk-liquid CDC.",
  },
  {
    id: "p9",
    paragraph: "160.202(9)",
    title: "Bulk ammonium nitrate solids",
    summary:
      "Ammonium nitrate and AN-based fertilizer listed as Division 5.1, when carried in bulk in the ship’s holds. Bagged AN on a container ship is evaluated under (4), not (9). After discharge, leftover bulk AN is CDC residue only at ≤ 1,000 lb total and not piled in pockets over 2 cubic feet; more than that is still CDC.",
    threshold: "Carried in bulk as Division 5.1 — residue only ≤ 1,000 lb / 2 cu ft",
    commonMiss: "Containerized bags of UN 1942 are a permit test, not a bulk-solid CDC. Residue is not 'whatever is left' — the 1,000 lb cap is in the definition.",
  },
];

export const ENOAD_BLURB =
  "Paste the boxed block into an email to the Master, then into the NVMC eNOAD cargo section. Table 160.206 (3)(i) is general cargo other than CDC (CONTAINERIZED). (3)(ii)–(iii) are name, UN number, and amount of each Certain Dangerous Cargo. If nothing qualifies: CDC CARRIED: NO.";

export const DISCLAIMER =
  "Screening aid for container-ship cargo based on 33 CFR 160.202 and the permit rule in 49 CFR 176.415. It is not a Coast Guard determination, not legal advice, and not a substitute for the IMDG Code, 49 CFR, or the shipping papers. Prefer the Excel DCM over the printed PDF when both exist. If you are not sure, report it.";
