/**
 * Shipboard emergency sheets keyed by UN / class.
 * Actions follow the public US DOT Emergency Response Guidebook
 * (U.S. Government work) plus container-ship practice. Not a substitute
 * for the EmS, SDS, or the ship's SOPEP / DG locker cards.
 *
 * Fire and spill are the usual pair. The extra fields cover the rest of
 * what actually goes wrong on a boxship: explosion, toxic vapor, wetting,
 * hold entry, lost overboard, pollution.
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
  explosion?: string[];
  vapor?: string[];
  wetting?: string[];
  hold?: string[];
  overboard?: string[];
  pollution?: string[];
  ppe: string[];
  firstAid: string[];
  ship: string[];
}

export interface SheetSection {
  title: string;
  items: string[];
}

export function sheetSections(sheet: ErgSheet): SheetSection[] {
  return [
    { title: "Hazards", items: sheet.hazards },
    { title: "Fire", items: sheet.fire },
    { title: "Spill / leak", items: sheet.spill },
    { title: "Explosion", items: sheet.explosion ?? [] },
    { title: "Toxic vapor / asphyxiation", items: sheet.vapor ?? [] },
    { title: "Water / wetting", items: sheet.wetting ?? [] },
    { title: "Hold / confined space", items: sheet.hold ?? [] },
    { title: "Lost overboard", items: sheet.overboard ?? [] },
    { title: "Pollution", items: sheet.pollution ?? [] },
    { title: "PPE", items: sheet.ppe },
    { title: "First aid", items: sheet.firstAid },
    { title: "On GEORGE II", items: sheet.ship },
  ].filter((s) => s.items.length > 0);
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
    explosion: [
      "1.1/1.2: mass explosion. 1.3: fireball / projection. 1.4: mostly fire and fragments.",
      "A box in a stack fire is the one you walk away from. Do not open it to 'check'.",
    ],
    vapor: ["Post-blast and fire smoke is toxic. Upwind. SCBA."],
    hold: ["Class 1.1–1.6 is on-deck only on GEORGE II. 1.4S may go in Hold 2. A hold of explosives on fire is abandon-ship territory."],
    overboard: ["A lost class 1 box is a notification and an exclusion-zone problem. Do not send a boat crew onto it."],
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
    explosion: [
      "A tank in fire can BLEVE. If you cannot cool it, pull the team back.",
      "Aerosol cartons rocket. Do not stand in front of them.",
    ],
    vapor: ["Heavier-than-air vapor in a hold or the house is a flash-fire and asphyxiation pair."],
    hold: ["Gas-free before entry. Mechanical ventilation on Hold 2 is not a substitute for readings."],
    overboard: ["A floating LPG tank is still a BLEVE problem for the boat that goes after it."],
    pollution: ["Most 2.1 gases dissipate. The liquid pool on deck is the fire problem, not the sheen."],
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
    vapor: [
      "Oxygen-deficient atmosphere. Nitrogen, CO2, argon, and helium will drop you with no smell.",
      "Oxidizing 2.2 (oxygen, nitrous) will turn an ordinary fire into a torch. Keep combustibles off a leak.",
    ],
    hold: ["Hold 2 is mechanically ventilated — still gas-free before entry. Empty uncleaned is still a gas."],
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
    explosion: ["Some 2.3 gases are also flammable. A 'toxic only' label does not make a BLEVE impossible."],
    vapor: [
      "A cylinder bank on Hatch 1 will put the house in the plume on the wrong wind.",
      "No filter mask. No 'I'll just crack the door'. CDC if that UN’s ship total is over 1 MT.",
    ],
    hold: ["Do not enter. Period. A 2.3 leak under deck is a stay-out and notify problem."],
    overboard: ["A leaking 2.3 package in the water is still a downwind kill zone for a rescue boat."],
    pollution: ["Notify. A PIH release in port is a COTP event, not a deck-wash."],
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
    explosion: ["Vapor in a closed hold will flash. Cans and drums BLEVE/burst in a stack fire."],
    vapor: ["Heavier-than-air solvent vapor on a still night sits on deck and in the house door sills."],
    wetting: ["Water on a polar solvent (alcohol, acetone) can spread the fire. Foam is the tool."],
    hold: ["FP < 23 °C in a hold: no hot work, gas-free before entry, charged hose on that bay."],
    overboard: ["A lost paint box is a sheen and a harbor problem. Plug scuppers; do not pump it over."],
    pollution: ["Most class 3 is a marine pollutant in practice once it hits the harbor. SOPEP."],
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
    explosion: ["Dust cloud + ignition = flash. Some 4.1 (desensitized explosives) get nastier as they dry."],
    wetting: ["A few 4.1 are wetted to stay safe. If the box is leaking water, the solid may be waking up."],
    hold: ["On-deck only on GEORGE II. Do not restow into a hold to 'get it out of the weather' without checking."],
    ppe: ["Gloves, eye protection, dust mask or SCBA in a cloud."],
    firstAid: ["Burns: cool water. Dust in eyes: rinse."],
    ship: ["On-deck only on GEORGE II (not Hold 2)."],
  },
  "4.2": {
    name: "Spontaneously combustible / self-heating",
    guide: "ERG 136",
    cls: "4.2",
    looksLike: "May look like ordinary bags or drums. The tell is heat in a stack that has no outside flame.",
    hazards: ["Can ignite without an external flame. Some react with air; some just heat in bulk."],
    fire: [
      "Copious water from cover if the SDS allows it. Do not stir a decomposing package.",
      "A hold of 4.2 on fire may not be a fight you can win — cool adjacent cargo and get people out.",
    ],
    spill: ["Do not leave a broken package to 'air out' on deck without a watch. Cover, isolate, SDS."],
    explosion: ["Some self-heating cargoes run away to a fireball once they take off."],
    wetting: ["Water is right for some and wrong for others. Read the SDS before you open the fire main on it."],
    hold: ["A 4.2 that is heating in a hold is a stay-out. Ventilate from outside. No entry."],
    ppe: ["SCBA, fire kit. Do not put a bare hand on a 'warm' bag."],
    firstAid: ["Burns: cool water. Smoke: fresh air, medical — delayed lung injury is real."],
    ship: ["Keep off live reefers. On-deck preferred. A warm box with a 4.2 label is already an incident."],
  },
  "4.3": {
    name: "Dangerous when wet",
    guide: "ERG 138",
    cls: "4.3",
    looksLike: "Drums or boxes. Often no smell until water hits it — then hydrogen or a toxic gas.",
    hazards: ["Water (rain, fire main, hold flood, a holed box) makes flammable or toxic gas."],
    fire: [
      "Do not put a straight stream on it unless the SDS says so. Dry powder / sand if that is the tool.",
      "If it is already in a fire and making gas, cool from cover and stay out of the plume.",
    ],
    spill: ["Keep it dry. Cover. No deck wash. No hold bilge pumping onto it."],
    explosion: ["Hydrogen off a wet 4.3 leak in a closed space will flash. Isolate ignition."],
    vapor: ["Some 4.3 make toxic gas with water (phosphine, ammonia). SCBA. No filter mask."],
    wetting: [
      "This is the casualty. Rain in a damaged roof, a leaking reefer drain, a fire-main test, a flooded hold.",
      "Know which hatch before the weather turns. Do not stow 4.3 in a hold that has a known leak.",
    ],
    hold: ["A flooded hold with 4.3 in it is a gas-and-fire problem. Nobody in until it is proven dry and gas-free."],
    overboard: ["In the water it will keep making gas. Exclusion zone. Notify."],
    ppe: ["SCBA. Keep skin dry. Fire kit if it has ignited."],
    firstAid: ["Fresh air. Burns: cool water. Do not use water on a still-reacting residue on the skin — brush off first."],
    ship: ["On-deck only on GEORGE II. Keep off the scuppers and off any hatch that takes green water."],
  },
  "5.1": {
    name: "Oxidizer",
    guide: "ERG 140",
    cls: "5.1",
    looksLike: "White prills or crystals (nitrates), or clear oxidizing solutions. May look like fertilizer.",
    hazards: ["Feeds a fire. Contamination with oil or combustibles can make it explosive."],
    fire: ["Flood with water. Do not use dry chemical or foam as the only tool. Cool adjacent cargo."],
    spill: ["Keep combustibles off it. Sweep dry material. Do not mix with fuels or oils."],
    explosion: [
      "Ammonium nitrate contaminated with oil, or in a hold fire you cannot flood, is the Texas City problem.",
      "Pool shock and chlorinated oxidizers with acids make chlorine gas.",
    ],
    vapor: ["Decomposition smoke is NOx — brown/orange, delayed lung injury. SCBA."],
    wetting: ["Keep AN dry and uncontaminated. A wet, oil-stained bag is worse, not better."],
    hold: ["On-deck only on GEORGE II. Do not put bagged AN in a hold to get it out of the rain."],
    pollution: ["Nitrates in the harbor are a report, not a deck wash."],
    ppe: ["Gloves, eye protection. SCBA in decomposition smoke (toxic NOx)."],
    firstAid: ["Skin/eyes: water. Inhalation of NOx: medical help — symptoms can be delayed."],
    ship: ["On-deck only. Ammonium nitrate in bags is a CDC conversation if a permit is required."],
  },
  "5.2": {
    name: "Organic peroxide",
    guide: "ERG 145",
    cls: "5.2",
    looksLike: "Often temperature-controlled. May be labeled 'keep refrigerated'. A runaway pack hisses, heats, then vents.",
    hazards: ["Can decompose violently if heated or contaminated. Some are also flammable."],
    fire: [
      "Cool from a distance with water. Do not stir. Withdraw if it is venting hard or the box is deforming.",
      "A hold of 5.2 on fire is not a hero job — cool adjacent cargo and get people out.",
    ],
    spill: ["Do not mop it into the bilge. Isolate. SDS — some peroxides detonate if they dry out."],
    explosion: ["Runaway decomposition can be a deflagration. Heat (live reefer compressor, engine casing, sun) starts it."],
    hold: ["On-deck preferred. A temperature-controlled 5.2 that has lost power is already an incident."],
    ppe: ["SCBA, face shield. Do not put a bare hand on a hot pack."],
    firstAid: ["Burns: cool water. Eyes: water 15 min. Smoke: fresh air, medical."],
    ship: ["Keep off live reefers and Hatch 10 casing. If it is a reefer itself, treat a power loss as a casualty."],
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
    explosion: ["Acid on some metals makes hydrogen. Caustic on aluminum does the same. Keep ignition down on a leak."],
    vapor: ["HCl, oleum, and ammonia solution fume. Hatch 1 + wrong wind = house intakes."],
    wetting: ["Water is the usual diluent on deck. Do not trap concentrated acid in a hold bilge."],
    hold: ["Hold 2 is allowed for class 8. A fuming leak under deck is still a confined-space job — SCBA, readings."],
    overboard: ["A corrosive box over the side is a pollution and a hull-paint problem for whoever picks it up."],
    pollution: ["Do not pump it over. Boom / absorb. In port, call it in."],
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
    explosion: ["Lithium packs pop and throw cells. Vehicle fuel tanks add a class 3 fire on top."],
    vapor: ["Lithium vent gas is toxic and flammable. SCBA."],
    hold: ["A hold fire of lithium is a long, ugly fight. On-deck preferred."],
    overboard: ["A lithium box in the water can still run away. A 3082 box is a sheen / pollution claim."],
    pollution: ["UN 3077 / 3082 are the marine-pollutant pair. Plug scuppers. Do not pump over."],
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
    vapor: ["PIH liquids throw a lethal vapor. No filter mask. Hatch 1 + still air = house problem."],
    hold: ["Packaged 6.1 is on-deck only on GEORGE II. Hold 2 is not approved for 6.1. Do not restow it down."],
    overboard: ["A 6.1 box in the water is still a downwind poison problem for a boat crew."],
    pollution: ["Toxic runoff is a MARPOL and a notification event. Do not wash it over the side."],
    ppe: ["SCBA + chemical protection. No filter mask for PIH."],
    firstAid: ["Fresh air. Water on skin. Medical help. Do not mouth-to-mouth."],
    ship: ["Packaged 6.1 is on-deck only on GEORGE II. Hold 2 is not approved for 6.1."],
  },
  "6.2": {
    name: "Infectious substance",
    guide: "ERG 158",
    cls: "6.2",
    looksLike: "Usually small packages, often refrigerated. Biohazard mark. Do not open 'to see'.",
    hazards: ["Infection. A broken pack is a medical and a notification problem, not a mop job."],
    fire: ["Cool adjacent cargo. Do not smash the pack with a stream. The smoke is not the only hazard."],
    spill: ["Do not touch. Isolate the box. Notify the agent, medical, and the Master. Cover. Do not sweep."],
    vapor: ["Aerosolized material from a fire or a smashed pack. SCBA. Stay out of the smoke."],
    hold: ["Nobody in that hold. This is not a 'ventilate and have a look' cargo."],
    overboard: ["Do not send a boat crew onto a 6.2 pack in the water. Notify and exclude."],
    ppe: ["SCBA, chemical gloves, coveralls. Dispose of PPE as infectious waste per the agent."],
    firstAid: ["Do not touch your face. Wash. Medical — they need to know it was 6.2."],
    ship: ["Treat it as a stay-out. The DCM line is enough to keep that hatch off-limits until the agent has a plan."],
  },
  "7": {
    name: "Radioactive",
    guide: "ERG 163",
    cls: "7",
    looksLike: "Type A / B packages, excepted packages, or industrial packages. Labels I / II / III. No leak you can see.",
    hazards: ["Radiation. Fire can breach a package. Excepted packages (UN 2910 etc.) are not CDC; HRCQ / fissile controlled is."],
    fire: [
      "Fight from the best distance. Do not smash the package. Cool adjacent cargo.",
      "If the package is involved, isolate and notify — this is no longer a deck fire only.",
    ],
    spill: ["Do not touch a damaged package. Limit time, maximize distance. Notify."],
    vapor: ["Smoke from a burning class 7 package may carry contamination. SCBA. Stay upwind."],
    hold: ["Do not enter a hold that has a damaged class 7 package. Survey first if you have the kit; if not, stay out."],
    overboard: ["A lost class 7 package is a notification to the flag, the Coast Guard, and the shipper. Mark the position."],
    ppe: ["SCBA in smoke. Gloves. Do not eat, drink, or smoke on that hatch."],
    firstAid: ["Move away. Remove outer clothing if you were in the smoke. Medical — tell them it is class 7."],
    ship: ["Excepted packages are common and are not CDC. Type B and fissile are the ones that change the voyage."],
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
    explosion: ["BLEVE if the tank is in fire and you cannot cool it. Aerosol-style rocket is not the problem here — the tank is."],
    vapor: ["Heavier than air. House intakes, holds, and the tunnel will hold it."],
    ppe: ["SCBA. Fire kit. Gloves — liquid LPG freezes skin."],
    firstAid: ["Fresh air. Frostbite: warm water. Burns: cool water."],
    ship: [
      "Residue last contained in a tank or a bank of cylinders is still LPG. Treat empty uncleaned as full.",
      "Do not stow against the house or under intakes.",
    ],
  },
  "1005": {
    un: "1005",
    name: "Ammonia, anhydrous",
    guide: "ERG 125",
    cls: "2.3",
    looksLike: "Colorless gas, sharp choking smell. Tank or cylinders. White cloud in damp air.",
    hazards: ["Poisonous by inhalation. Corrosive to eyes and lungs. Can be flammable in a rich mix."],
    fire: ["Cool from upwind with water. Do not walk the white cloud. Water spray knocks down vapor."],
    spill: ["Upwind. Isolate. SCBA. Lots of water on deck to knock down vapor. Keep people out of the cloud."],
    vapor: ["The white cloud is not 'just irritant'. A tank leak on Hatch 1 will put the house in it."],
    hold: ["Do not enter. CDC if the ship total of UN 1005 is over 1 MT — do not mix with UN 1017."],
    pollution: ["In port this is a COTP / eNOAD event if it meets the 1 MT line."],
    ppe: ["SCBA + chemical suit. No filter mask."],
    firstAid: ["Fresh air. Eyes/skin: water 15–20 min. Do not mouth-to-mouth. Medical immediately."],
    ship: ["CDC over 1 MT of this UN. Keep off the house. Residue last contained in a tank is still ammonia."],
  },
  "1017": {
    un: "1017",
    name: "Chlorine",
    guide: "ERG 124",
    cls: "2.3",
    looksLike: "Green-yellow gas, sharp bleach smell. Cylinders or a tank. Heavier than air.",
    hazards: ["Poisonous by inhalation. Corrosive. Oxidizer — will feed a fire."],
    fire: ["Cool from upwind. Do not get in the plume. Water spray to knock down vapor."],
    spill: ["Upwind. Isolate. SCBA only. Do not enter holds. Notify USCG if in port."],
    vapor: ["Heavier than air. A few cylinders in a hold will kill. Smell is a late warning."],
    hold: ["Stay out. CDC if the ship total of UN 1017 is over 1 MT — do not add it to the ammonia total."],
    ppe: ["SCBA + chemical suit. No filter mask."],
    firstAid: ["Fresh air. Do not mouth-to-mouth. Medical immediately. Eyes: water."],
    ship: ["CDC over 1 MT of this UN, separate from 1005. Keep off the house intakes."],
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
    vapor: ["Fumes. Hatch 1 + still air = house intakes. This is class 8, not CDC as packaged 8."],
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
    explosion: ["Hydrogen at the terminals. No sparks, no smoking on a leaking pallet."],
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
    explosion: ["Cells pop and throw. Helmet visor down. A closed box can rupture."],
    vapor: ["Vent gas is toxic and flammable. SCBA. HF in some electrolytes."],
    hold: ["A hold fire of lithium is a long, ugly fight. Keep a charged hose on that bay. On-deck preferred."],
    overboard: ["A runaway pack in the water can still burn. Do not send a boat crew onto a smoking box."],
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
  "3090": {
    un: "3090",
    name: "Lithium metal batteries",
    guide: "ERG 138",
    cls: "9",
    looksLike: "Cells or packs. Runaway looks like 3480 but water can make it worse on some metal cells — cool the neighbors anyway.",
    hazards: ["Thermal runaway. Water on burning lithium metal can throw molten metal. Toxic smoke."],
    fire: [
      "Cool adjacent cargo with water. A class D extinguisher if you have it on a small pack.",
      "Do not stand over it. Reignition is the rule. Boundary-cool for hours.",
    ],
    spill: ["Isolate a damaged pack on deck. No hold, no house."],
    explosion: ["Cells pop. Molten lithium. Visor down."],
    hold: ["Worse than 3480 in a hold. On-deck only if you can help it."],
    ppe: ["SCBA, fire kit, visor down."],
    firstAid: ["Smoke: fresh air, medical. Burns: cool water."],
    ship: ["Treat as the nastier lithium. Keep off class 8 batteries and 5.1."],
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
    explosion: ["Cans burst and rocket in a stack fire. Do not stand in front of the carton."],
    pollution: ["A paint box over the side or into the scuppers is a sheen. Plug scuppers."],
    ppe: ["Gloves, eye protection. SCBA in a thick vapor."],
    firstAid: ["Skin: soap and water. Eyes: water. Fresh air."],
    ship: ["Very common on this trade. PG I is the jumpy one. Hatch 8 on-deck is a CSM block."],
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
    explosion: ["The carton is a box of rockets once it cooks. Ltd Qty still does this."],
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
    explosion: ["Contaminated AN, or AN in a hold fire you cannot flood, can detonate. This is the one that sinks ships."],
    vapor: ["NOx can kill hours later. SCBA. Medical even if they feel fine."],
    wetting: ["Keep it dry. Wet + oil + heat is the worst mix, not a safety wash."],
    hold: ["On-deck only. Residue in a hold has a 1,000 lb / 2 cu ft CDC test."],
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
    explosion: ["Hydrogen off aluminum. Isolate ignition on a leak against fittings."],
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
    vapor: ["Fuming on deck will head for the house intakes — know the wind."],
    pollution: ["Do not pump it over. It will eat the harbor and the report will eat you."],
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
    explosion: ["A hold of gasoline vapor will flash. Empty uncleaned tanks are still full."],
    pollution: ["Sheen in the harbor is a notification. Plug scuppers."],
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
    explosion: ["A cooking tote can polymerize — heat and pressure. Cool, do not stir."],
    ppe: ["Gloves, eye protection."],
    firstAid: ["Skin: soap and water."],
    ship: ["Common construction cargo."],
  },
  "3082": {
    un: "3082",
    name: "Environmentally hazardous substance, liquid, n.o.s.",
    guide: "ERG 171",
    cls: "9",
    looksLike: "Often resins, oils, or pesticides in drums or cans. May have no obvious smell.",
    hazards: ["Marine pollutant. Some are also combustible. The casualty is the harbor, not a fireball."],
    fire: ["Water spray / foam as for the fill. Cool the box."],
    spill: ["Absorb. Plug scuppers. Do not pump over the side."],
    pollution: ["This UN exists because of the water. A scupper leak in port is a notification."],
    overboard: ["A lost 3082 box is a pollution claim and a report. Mark the position."],
    ppe: ["Gloves, eye protection."],
    firstAid: ["Skin: soap and water. SDS for the technical name."],
    ship: ["Very common on this trade. Not CDC. Still a MARPOL problem if it hits the water."],
  },
};

function classKey(cls: string): string {
  const c = (cls || "").trim();
  if (c.startsWith("1")) return "1";
  if (c.startsWith("2.1")) return "2.1";
  if (c.startsWith("2.3")) return "2.3";
  if (c.startsWith("2.2") || c.startsWith("2")) return "2.2";
  if (c.startsWith("3")) return "3";
  if (c.startsWith("4.2")) return "4.2";
  if (c.startsWith("4.3")) return "4.3";
  if (c.startsWith("4")) return "4.1";
  if (c.startsWith("5.2")) return "5.2";
  if (c.startsWith("5")) return "5.1";
  if (c.startsWith("6.2")) return "6.2";
  if (c.startsWith("6.1") || c.startsWith("6")) return "6.1";
  if (c.startsWith("7")) return "7";
  if (c.startsWith("8")) return "8";
  if (c.startsWith("9")) return "9";
  return "9";
}

const EXTRA_KEYS = ["explosion", "vapor", "wetting", "hold", "overboard", "pollution"] as const;

export function sheetFor(un: string, cls: string, name?: string): ErgSheet {
  const u = (un || "").replace(/\D/g, "").padStart(4, "0");
  const base = CLASS_SHEETS[classKey(cls)] ?? CLASS_SHEETS["9"];
  const specific = UN_SHEETS[u];
  if (specific) {
    const merged: ErgSheet = { ...base, ...specific, un: u, cls: specific.cls || cls || base.cls };
    for (const k of EXTRA_KEYS) {
      if (!merged[k]?.length) merged[k] = base[k];
    }
    return merged;
  }
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
