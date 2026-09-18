/**
 * Shipboard emergency sheets keyed by UN / class.
 * Actions follow the public US DOT Emergency Response Guidebook
 * (U.S. Government work) plus container-ship practice. Not a substitute
 * for the EmS, SDS, or the ship's SOPEP / DG locker cards.
 */

export interface ErgSheet {
  un?: string;
  name: string;
  guide: string;
  cls: string;
  looksLike: string;
  hazards: string[];
  fire: string[];
  spill: string[];
  ppe: string[];
  firstAid: string[];
  ship: string[];
}

const CLASS_SHEETS: Record<string, Omit<ErgSheet, "un">> = {
  "1": {
    name: "Explosives",
    guide: "ERG 112",
    cls: "1",
    looksLike: "Cartridges, detonators, or boxed explosives. No leak to see until something cooks off.",
    hazards: ["Mass explosion or projection hazard.", "Fire may cause containers to explode."],
    fire: [
      "If the cargo is not burning: fight from the best cover, copious water on adjacent boxes.",
      "If explosives are involved in fire: withdraw. Do not fight. Cool nearby cargo from a distance.",
    ],
    spill: ["Do not touch damaged packages.", "Keep ignition sources away. Notify the Master and the DG locker."],
    ppe: ["Full fire kit if you must approach. SCBA."],
    firstAid: ["Blast / fragment injuries — treat as trauma. Move upwind of smoke."],
    ship: ["On GEORGE II, class 1.1–1.6 is on-deck only. 1.4S may go in Hold 2."],
  },
  "2.1": {
    name: "Flammable gas",
    guide: "ERG 115",
    cls: "2.1",
    looksLike: "Cylinders or tank containers. May frost at a leak. Often odorized; LPG is heavier than air.",
    hazards: ["Extremely flammable. Vapor can travel and flash back.", "BLEVE if a tank is fire-impaged."],
    fire: [
      "Do not extinguish a leaking gas fire unless the leak can be stopped.",
      "Water spray to cool the container. Withdraw if the tank discolors or vents rise.",
    ],
    spill: [
      "Isolate. Eliminate ignition (no smoking, no non-rated radios in the plume).",
      "Ventilate. Vapor is heavier than air — check bilges, holds, and the house intakes.",
    ],
    ppe: ["SCBA. Fire kit. No bare skin on a liquid LPG leak (frostbite)."],
    firstAid: ["Move to fresh air. Frostbite: warm water, do not rub. Burns: cool water."],
    ship: ["On-deck or Hold 2 (Hatches 3 & 4). Residue last contained in a tank is still a leak/fire problem."],
  },
  "2.2": {
    name: "Non-flammable gas",
    guide: "ERG 121",
    cls: "2.2",
    looksLike: "Cylinders or tanks. May be cold at a leak. Some are oxidizers (green/yellow labels).",
    hazards: ["Asphyxiation in a hold or house. Some support combustion."],
    fire: ["Use an extinguisher suited to the surrounding cargo. Cool cylinders with water."],
    spill: ["Ventilate. Do not enter a hold without atmosphere readings and SCBA."],
    ppe: ["SCBA in any poorly ventilated space."],
    firstAid: ["Fresh air. Oxygen if trained. Treat asphyxia."],
    ship: ["Hold 2 is mechanically ventilated — still gas-free before entry."],
  },
  "2.3": {
    name: "Toxic gas / PIH",
    guide: "ERG 123",
    cls: "2.3",
    looksLike: "Cylinders or tanks. May have no color. Smell is not a reliable warning.",
    hazards: ["Poisonous by inhalation. Can be fatal in a hold or on deck in still air."],
    fire: ["Cool from upwind with water. Do not get in the plume. Let it burn if the leak is the fuel."],
    spill: ["Upwind, uphill. Isolate. SCBA only. Do not enter holds. Notify USCG if in port."],
    ppe: ["SCBA + chemical suit. No filter mask."],
    firstAid: ["Fresh air. Do not mouth-to-mouth if inhalation poison. Medical help immediately."],
    ship: ["CDC if the ship total of that UN is over 1 MT. Keep off the house intakes."],
  },
  "3": {
    name: "Flammable liquid",
    guide: "ERG 128",
    cls: "3",
    looksLike: "Paint, solvents, alcohols — liquid in drums, cans, or IBCs. Sharp solvent smell. May be colored.",
    hazards: ["Vapor + air = flash fire. Runoff can carry fire into a hold or scupper."],
    fire: ["Foam or dry chemical on a pool. Water spray to cool boxes. Aqueous film-forming foam if you have it."],
    spill: ["Stop the leak if you can do it without walking in it. Absorb. Keep out of scuppers if you can boom it."],
    ppe: ["Gloves, eye protection. SCBA if the vapor is thick. No sparks."],
    firstAid: ["Skin: soap and water. Eyes: 15 minutes of water. Inhalation: fresh air."],
    ship: ["FP < 23 °C may go on deck or Hold 2. Keep ignition control on that hatch."],
  },
  "4.1": {
    name: "Flammable solid",
    guide: "ERG 133",
    cls: "4.1",
    looksLike: "Matches, sulfur, fused solids. Dust may ignite.",
    hazards: ["Easy to ignite. Some burn fiercely once started."],
    fire: ["Water, foam, or dry chemical depending on the SDS. Smother if water is the wrong tool."],
    spill: ["Sweep carefully. Avoid making a dust cloud."],
    ppe: ["Gloves, eye protection, dust mask or SCBA in a cloud."],
    firstAid: ["Burns: cool water. Dust in eyes: rinse."],
    ship: ["On-deck only on GEORGE II (not Hold 2)."],
  },
  "5.1": {
    name: "Oxidizer",
    guide: "ERG 140",
    cls: "5.1",
    looksLike: "White prills or crystals (nitrates), or clear oxidizing solutions. May look like fertilizer.",
    hazards: ["Feeds a fire. Contamination with oil or combustibles can make it explosive."],
    fire: ["Flood with water. Do not use dry chemical or foam as the only tool. Cool adjacent cargo."],
    spill: ["Keep combustibles off it. Sweep dry material. Do not mix with fuels or oils."],
    ppe: ["Gloves, eye protection. SCBA in decomposition smoke (toxic NOx)."],
    firstAid: ["Skin/eyes: water. Inhalation of NOx: medical help — symptoms can be delayed."],
    ship: ["On-deck only. Ammonium nitrate in bags is a CDC conversation if a permit is required."],
  },
  "8": {
    name: "Corrosive",
    guide: "ERG 154",
    cls: "8",
    looksLike: "Acids and alkalis in drums, totes, or wet-cell batteries. May fume. Eats steel and skin.",
    hazards: ["Burns skin and eyes. Some give off flammable or toxic vapor. Battery acid is sulfuric."],
    fire: ["Water spray. Do not get a straight stream into a tote of acid (spatter). Cool the box."],
    spill: [
      "For acid: soda ash / lime if you have it, otherwise dilute with lots of water on deck and keep people out of the runoff.",
      "For alkali: vinegar is not a shipboard plan — lots of water and keep it off the skin.",
    ],
    ppe: ["Face shield, chemical gloves, apron. SCBA if it fumes."],
    firstAid: ["Skin/eyes: water for 15–20 minutes. Remove clothing. Do not neutralize on the body."],
    ship: ["Hold 2 OK for class 8. Battery pallets on deck are a leak/fire pair with class 9 lithium nearby — keep segregation."],
  },
  "9": {
    name: "Miscellaneous DG",
    guide: "ERG 171",
    cls: "9",
    looksLike: "Lithium batteries, vehicles, environmentally hazardous liquids. Often no obvious leak.",
    hazards: ["Depends on the commodity. Lithium: thermal runaway. Vehicles: fuel + battery."],
    fire: ["See the UN sheet. Default: water to cool adjacent cargo. Lithium needs a long water attack."],
    spill: ["Contain. Do not walk in it. Check the SDS / UN sheet."],
    ppe: ["Gloves, eye protection. SCBA in smoke."],
    firstAid: ["As for the specific commodity."],
    ship: ["On-deck or Hold 2. Lithium ion is the usual class 9 fire problem on this trade."],
  },
  "6.1": {
    name: "Toxic / PIH liquid",
    guide: "ERG 151",
    cls: "6.1",
    looksLike: "Liquids or solids. May have no warning smell. PIH liquids are CDC if bulk or over 20 MT packaged.",
    hazards: ["Poison. Some are inhalation hazards (Hazard Zone A–D)."],
    fire: ["Water spray from upwind. Contain runoff — it is still toxic."],
    spill: ["Do not touch. Isolate. SCBA. Do not put it in the bilge."],
    ppe: ["SCBA + chemical protection. No filter mask for PIH."],
    firstAid: ["Fresh air. Water on skin. Medical help. Do not mouth-to-mouth."],
    ship: ["Packaged 6.1 is on-deck only on GEORGE II. Hold 2 is not approved for 6.1."],
  },
};

const UN_SHEETS: Record<string, ErgSheet> = {
  "1075": {
    un: "1075",
    name: "Petroleum gases, liquefied",
    guide: "ERG 115",
    cls: "2.1",
    looksLike: "Cylinders or a tank. Colorless vapor, often odorized (mercaptan). Heavier than air. Liquid is ice-cold.",
    hazards: ["Flammable. Vapor collects in holds, house intakes, and on deck in still weather.", "BLEVE if fire-impaged."],
    fire: [
      "Let a leaking gas fire burn until the leak is shut, while cooling the bottle with water.",
      "If you cannot cool a tank in fire, pull the team back.",
    ],
    spill: ["Shut valves if it is safe. Isolate ignition. Ventilate low spaces. Gas-free before entry."],
    ppe: ["SCBA. Fire kit. Gloves — liquid LPG freezes skin."],
    firstAid: ["Fresh air. Frostbite: warm water. Burns: cool water."],
    ship: [
      "Residue last contained in a tank or a bank of cylinders is still LPG. Treat empty uncleaned as full.",
      "Do not stow against the house or under intakes.",
    ],
  },
  "2672": {
    un: "2672",
    name: "Ammonia solution",
    guide: "ERG 154",
    cls: "8",
    looksLike: "Colorless liquid with a sharp, choking ammonia smell. Tank or drum. Fumes in air.",
    hazards: ["Corrosive to eyes, lungs, and skin. Not the same as anhydrous UN 1005 (that is 2.3 PIH / CDC)."],
    fire: ["Water spray. Cool the tank. The vapor is irritating — stay upwind with SCBA."],
    spill: ["Lots of water on deck. Do not trap it in a hold. Keep people out of the white cloud."],
    ppe: ["SCBA, face shield, chemical gloves."],
    firstAid: ["Eyes/skin: water 15–20 min. Inhalation: fresh air, medical help."],
    ship: ["Class 8 tank on deck is allowed. This is not CDC as packaged class 8. Anhydrous 1005 is a different animal."],
  },
  "2794": {
    un: "2794",
    name: "Batteries, wet, filled with acid",
    guide: "ERG 154",
    cls: "8",
    looksLike: "Lead-acid batteries on pallets. Clear/amber sulfuric acid. White corrosion on terminals. Sharp acid smell if leaking.",
    hazards: ["Sulfuric acid burns. Hydrogen off-gassing can ignite. Short circuits start fires."],
    fire: ["CO2 or dry chemical on an electrical fire. Water spray to cool. Do not use a straight stream into a cracked case."],
    spill: ["Soda ash if you have it. Otherwise flood with water on deck and keep off the skin. Isolate from alkalis and cyanides."],
    ppe: ["Face shield, rubber gloves, apron."],
    firstAid: ["Skin/eyes: water 15 min. Remove soaked clothes."],
    ship: ["Common on GEORGE II pallets. Keep off lithium boxes and class 5.1. Hold 2 is allowed for class 8."],
  },
  "3480": {
    un: "3480",
    name: "Lithium ion batteries",
    guide: "ERG 147",
    cls: "9",
    looksLike: "Cartons of cells or packs. A failing pack hisses, pops, vents white/grey smoke, then orange flame. Can reignite hours later.",
    hazards: ["Thermal runaway. Toxic/flammable vent gas. Water is the coolant, not a magic extinguisher."],
    fire: [
      "Copious water from a safe distance. Aim to cool the pack and neighbors.",
      "Do not put a closed lid on a burning pack and walk away — it will cook off again. Boundary-cool for hours.",
    ],
    spill: ["Damaged packs: isolate on deck in a steel tray if you can. No house, no hold if it is venting."],
    ppe: ["SCBA — the smoke is toxic. Fire kit. Helmet visor down (projectiles)."],
    firstAid: ["Smoke inhalation: fresh air, medical. Burns: cool water. HF in some electrolytes — calcium gluconate if in the med chest."],
    ship: ["On-deck preferred. A hold fire of lithium is a long, ugly fight. Keep a charged hose on that bay."],
  },
  "3481": {
    un: "3481",
    name: "Lithium ion batteries contained in / packed with equipment",
    guide: "ERG 147",
    cls: "9",
    looksLike: "Equipment with packs inside. Same runaway signs as UN 3480.",
    hazards: ["Same thermal runaway as 3480, sometimes delayed inside a cabinet."],
    fire: ["Water to cool. Pull power if you can do it without putting a hand in the smoke."],
    spill: ["Treat a damaged unit as a 3480 pack."],
    ppe: ["SCBA, fire kit."],
    firstAid: ["As UN 3480."],
    ship: ["Same as 3480."],
  },
  "1263": {
    un: "1263",
    name: "Paint / paint related material",
    guide: "ERG 128",
    cls: "3",
    looksLike: "Cans or pails. Colored liquid, solvent smell. May be PG I–III.",
    hazards: ["Flammable vapor. Some are corrosive (then see 8)."],
    fire: ["Foam / dry chemical on a pool. Water spray to cool cans (they burst)."],
    spill: ["Absorb. Keep ignition down. Ventilate."],
    ppe: ["Gloves, eye protection. SCBA in a thick vapor."],
    firstAid: ["Skin: soap and water. Eyes: water. Fresh air."],
    ship: ["Very common on this trade. PG I is the jumpy one."],
  },
  "1950": {
    un: "1950",
    name: "Aerosols",
    guide: "ERG 126",
    cls: "2.1",
    looksLike: "Cans. Will rocket or burst in a fire. Flammable fill on 2.1; 2.2 is just the propellant.",
    hazards: ["Projectiles in a fire. Flammable mist."],
    fire: ["Water spray from cover. Do not stand in front of the carton."],
    spill: ["Leaking cans: isolate, no sparks. Ventilate."],
    ppe: ["Eye protection. SCBA in a fire."],
    firstAid: ["As for the fill — often solvent or paint."],
    ship: ["Limited quantity cartons still burn. Keep off the house."],
  },
  "1942": {
    un: "1942",
    name: "Ammonium nitrate",
    guide: "ERG 140",
    cls: "5.1",
    looksLike: "White prills or bags. Looks like fertilizer. No smell until it decomposes (acrid NOx).",
    hazards: ["Oxidizer. Contaminated with oil or combustibles it can detonate. Decomposition gas is toxic."],
    fire: ["Flood with water. If it is in a hold fire you cannot flood, get the people off — this is the Texas City problem."],
    spill: ["Keep it dry and uncontaminated. Sweep. No oil, no sawdust."],
    ppe: ["SCBA in brown/orange NOx. Gloves."],
    firstAid: ["NOx inhalation can kill hours later — medical, even if they feel fine."],
    ship: ["On-deck only. Bags of AN are a CDC item if a permit is required. Residue in a hold has a 1,000 lb / 2 cu ft test."],
  },
  "1824": {
    un: "1824",
    name: "Sodium hydroxide solution",
    guide: "ERG 154",
    cls: "8",
    looksLike: "Clear or cloudy caustic liquid in drums or totes. Slippery. No strong smell.",
    hazards: ["Deep chemical burns. Reacts with aluminum and some metals, giving hydrogen."],
    fire: ["Not flammable. Water spray. Keep runoff off aluminum fittings if you can."],
    spill: ["Lots of water. Do not use acid to 'neutralize' on deck unless the chief says so."],
    ppe: ["Face shield, chemical gloves, apron."],
    firstAid: ["Water 15–20 min. Do not put acid on the skin."],
    ship: ["Class 8 — Hold 2 or on deck."],
  },
  "1789": {
    un: "1789",
    name: "Hydrochloric acid",
    guide: "ERG 157",
    cls: "8",
    looksLike: "Fuming liquid, sharp acid smell, white vapor in damp air.",
    hazards: ["Corrosive vapor. Attacks steel and lungs."],
    fire: ["Not flammable. Water spray to knock down vapor. Cool the box."],
    spill: ["Upwind. Water spray on the vapor. Soda ash if you have it. Keep out of the hold bilge."],
    ppe: ["SCBA, face shield, chemical gloves."],
    firstAid: ["Water 15–20 min. Fresh air."],
    ship: ["Fuming on deck will head for the house intakes — know the wind."],
  },
  "1203": {
    un: "1203",
    name: "Gasoline",
    guide: "ERG 128",
    cls: "3",
    looksLike: "Colored liquid, strong gasoline smell.",
    hazards: ["Very low flashpoint. Vapor explodes in a hold."],
    fire: ["Foam. No straight water on a pool. Cool tanks."],
    spill: ["Ignition control. Absorb. No bilge pumping into the harbor."],
    ppe: ["SCBA in vapor. Fire kit."],
    firstAid: ["Fresh air. Do not induce vomiting."],
    ship: ["On deck or Hold 2. Treat empty uncleaned tanks as full."],
  },
  "1866": {
    un: "1866",
    name: "Resin solution",
    guide: "ERG 127",
    cls: "3",
    looksLike: "Viscous, often styrene or solvent smell.",
    hazards: ["Flammable. Some can polymerize if they cook."],
    fire: ["Foam / dry chemical. Cool."],
    spill: ["Absorb. Ignition control."],
    ppe: ["Gloves, eye protection."],
    firstAid: ["Skin: soap and water."],
    ship: ["Common construction cargo."],
  },
};

function classKey(cls: string): string {
  const c = (cls || "").trim();
  if (c.startsWith("1")) return "1";
  if (c.startsWith("2.1")) return "2.1";
  if (c.startsWith("2.3")) return "2.3";
  if (c.startsWith("2.2") || c.startsWith("2")) return "2.2";
  if (c.startsWith("3")) return "3";
  if (c.startsWith("4")) return "4.1";
  if (c.startsWith("5")) return "5.1";
  if (c.startsWith("6.1") || c.startsWith("6")) return "6.1";
  if (c.startsWith("8")) return "8";
  if (c.startsWith("9")) return "9";
  return "9";
}

export function sheetFor(un: string, cls: string, name?: string): ErgSheet {
  const u = (un || "").replace(/\D/g, "").padStart(4, "0");
  if (UN_SHEETS[u]) return UN_SHEETS[u];
  const base = CLASS_SHEETS[classKey(cls)] ?? CLASS_SHEETS["9"];
  return {
    ...base,
    un: u,
    name: name || base.name,
    cls: cls || base.cls,
  };
}

export function knownUnSheets(): ErgSheet[] {
  return Object.values(UN_SHEETS);
}
