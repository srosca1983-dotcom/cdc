import type { CatalogEntry, CatalogFlag } from "./types.ts";

/**
 * Compact UN catalog for 33 CFR 160.202 screening.
 * Flags encode the regulatory hooks; this is not a copy of 49 CFR 172.101.
 * Unknown UNs still evaluate via class rules. Missing PIH zone data produces
 * REVIEW, not a silent NOT_CDC.
 *
 * Format: UN|Proper shipping name|class|flag,flag|zone
 */
const RAW = `
1005|Ammonia, anhydrous|2.3|pih_gas,bulk_lpgas,residue_always|D
1008|Boron trifluoride|2.3|pih_gas|B
1010|Butadienes, stabilized|2.1|bulk_lpgas|
1011|Butane|2.1|bulk_lpgas|
1012|Butylene|2.1|bulk_lpgas|
1016|Carbon monoxide, compressed|2.3|pih_gas|D
1017|Chlorine|2.3|pih_gas,bulk_lpgas,residue_always|B
1023|Coal gas, compressed|2.3|pih_gas|
1026|Cyanogen|2.3|pih_gas|A
1032|Dimethylamine, anhydrous|2.1|bulk_lpgas|
1035|Ethane|2.1|bulk_lpgas,residue_always|
1036|Ethylamine|2.1|bulk_lpgas|
1037|Ethyl chloride|2.1|bulk_lpgas|
1038|Ethylene, refrigerated liquid|2.1|bulk_lpgas|
1040|Ethylene oxide|2.3|pih_gas,bulk_lpgas,residue_always|D
1045|Fluorine, compressed|2.3|pih_gas|A
1048|Hydrogen bromide, anhydrous|2.3|pih_gas|C
1050|Hydrogen chloride, anhydrous|2.3|pih_gas|C
1051|Hydrogen cyanide, stabilized|6.1|pih_liquid|A
1053|Hydrogen sulfide|2.3|pih_gas|B
1060|Methyl acetylene and propadiene mixture|2.1|bulk_lpgas|
1062|Methyl bromide|2.3|pih_gas,bulk_lpgas,residue_always|C
1063|Methyl chloride|2.1|bulk_lpgas|
1064|Methyl mercaptan|2.3|pih_gas|C
1067|Dinitrogen tetroxide|2.3|pih_gas|A
1069|Nitrosyl chloride|2.3|pih_gas|A
1071|Oil gas, compressed|2.3|pih_gas|
1075|Petroleum gases, liquefied|2.1|bulk_lpgas|
1076|Phosgene|2.3|pih_gas|A
1077|Propylene|2.1|bulk_lpgas|
1079|Sulfur dioxide|2.3|pih_gas,bulk_lpgas,residue_always|C
1082|Trifluorochloroethylene, stabilized|2.3|pih_gas|C
1086|Vinyl chloride, stabilized|2.1|bulk_lpgas,residue_always|
1089|Acetaldehyde|3|bulk_lpgas|
1092|Acrolein, stabilized|6.1|pih_liquid|A
1098|Allyl alcohol|6.1|pih_liquid,named_bulk_liquid|B
1135|Ethylene chlorohydrin|6.1|pih_liquid,named_bulk_liquid|B
1143|Crotonaldehyde or crotonaldehyde, stabilized|6.1|pih_liquid,named_bulk_liquid|B
1163|Dimethylhydrazine, unsymmetrical|6.1|pih_liquid|B
1182|Ethyl chloroformate|6.1|pih_liquid|A
1185|Ethyleneimine, stabilized|6.1|pih_liquid|A
1238|Methyl chloroformate|6.1|pih_liquid|A
1239|Methyl chloromethyl ether|6.1|pih_liquid|A
1244|Methylhydrazine|6.1|pih_liquid|A
1251|Methyl vinyl ketone, stabilized|6.1|pih_liquid|A
1259|Nickel carbonyl|6.1|pih_liquid|A
1280|Propylene oxide|3|named_bulk_liquid|
1380|Pentaborane|4.2|pih_liquid|A
1510|Tetranitromethane|5.1|pih_liquid|B
1541|Acetone cyanohydrin, stabilized|6.1|pih_liquid,named_bulk_liquid|B
1556|Arsenic compound, liquid, n.o.s.|6.1|pih_liquid|
1560|Arsenic trichloride|6.1|pih_liquid|A
1569|Bromoacetone|6.1|pih_liquid|B
1580|Chloropicrin|6.1|pih_liquid|A
1589|Cyanogen chloride, stabilized|2.3|pih_gas|A
1595|Dimethyl sulfate|6.1|pih_liquid|B
1605|Ethylene dibromide|6.1|pih_liquid,named_bulk_liquid|B
1614|Hydrogen cyanide, stabilized (absorbed)|6.1|pih_liquid|A
1647|Methyl bromide and ethylene dibromide mixture|6.1|pih_liquid|B
1649|Motor fuel anti-knock mixture|6.1|pih_liquid|B
1660|Nitric oxide, compressed|2.3|pih_gas|A
1670|Perchloromethyl mercaptan|6.1|pih_liquid|B
1695|Chloroacetone, stabilized|6.1|pih_liquid|A
1722|Allyl chloroformate|6.1|pih_liquid|A
1741|Boron trichloride|2.3|pih_gas|C
1744|Bromine|8|pih_liquid|A
1745|Bromine pentafluoride|5.1|pih_liquid|A
1746|Bromine trifluoride|5.1|pih_liquid|A
1749|Chlorine trifluoride|2.3|pih_gas|B
1754|Chlorosulfonic acid|8|named_bulk_liquid,pih_liquid|B
1809|Phosphorus trichloride|6.1|pih_liquid|B
1810|Phosphorus oxychloride|6.1|pih_liquid|B
1829|Sulfur trioxide, stabilized|8|pih_liquid|A
1831|Sulfuric acid, fuming (oleum)|8|named_bulk_liquid|
1834|Sulfuryl chloride|8|pih_liquid|B
1838|Titanium tetrachloride|8|pih_liquid|B
1859|Silicon tetrafluoride|2.3|pih_gas|B
1892|Ethyldichloroarsine|6.1|pih_liquid|A
1911|Diborane|2.3|pih_gas|A
1942|Ammonium nitrate|5.1|an_51|
1961|Ethane, refrigerated liquid|2.1|bulk_lpgas,residue_always|
1962|Ethylene, refrigerated liquid|2.1|bulk_lpgas|
1965|Hydrocarbon gas mixture, liquefied, n.o.s.|2.1|bulk_lpgas|
1966|Hydrogen, refrigerated liquid|2.1|bulk_lpgas|
1967|Insecticide gas, toxic, n.o.s.|2.3|pih_gas|
1969|Isobutane|2.1|bulk_lpgas|
1972|Methane, refrigerated liquid (LNG)|2.1|bulk_lpgas,residue_always|
1975|Nitric oxide and dinitrogen tetroxide mixture|2.3|pih_gas|A
1978|Propane|2.1|bulk_lpgas|
1994|Iron pentacarbonyl|6.1|pih_liquid|A
2032|Nitric acid, red fuming|8|pih_liquid|B
2067|Ammonium nitrate based fertilizer|5.1|an_fertilizer|
2071|Ammonium nitrate based fertilizer|9||
2188|Arsine|2.3|pih_gas|A
2189|Dichlorosilane|2.3|pih_gas|B
2190|Oxygen difluoride, compressed|2.3|pih_gas|A
2191|Sulfuryl fluoride|2.3|pih_gas|D
2192|Germane|2.3|pih_gas|B
2194|Selenium hexafluoride|2.3|pih_gas|A
2195|Tellurium hexafluoride|2.3|pih_gas|A
2196|Tungsten hexafluoride|2.3|pih_gas|B
2197|Hydrogen iodide, anhydrous|2.3|pih_gas|C
2198|Phosphorus pentafluoride|2.3|pih_gas|B
2199|Phosphine|2.3|pih_gas|A
2202|Hydrogen selenide, anhydrous|2.3|pih_gas|A
2204|Carbonyl sulfide|2.3|pih_gas|C
2232|2-Chloroethanal|6.1|pih_liquid|A
2334|Allylamine|6.1|pih_liquid|B
2337|Phenyl mercaptan|6.1|pih_liquid|B
2382|Dimethylhydrazine, symmetrical|6.1|pih_liquid|B
2407|Isopropyl chloroformate|6.1|pih_liquid|A
2417|Carbonyl fluoride|2.3|pih_gas|B
2418|Sulfur tetrafluoride|2.3|pih_gas|A
2420|Hexafluoroacetone|2.3|pih_gas|B
2421|Nitrogen trioxide|2.3|pih_gas|A
2426|Ammonium nitrate, liquid|5.1|an_other|
2438|Trimethylacetyl chloride|6.1|pih_liquid|B
2442|Trichloroacetyl chloride|8|pih_liquid|B
2474|Thiophosgene|6.1|pih_liquid|B
2477|Methyl isothiocyanate|6.1|pih_liquid|B
2480|Methyl isocyanate|6.1|pih_liquid|A
2481|Ethyl isocyanate|6.1|pih_liquid|A
2482|n-Propyl isocyanate|6.1|pih_liquid|A
2483|Isopropyl isocyanate|6.1|pih_liquid|A
2484|tert-Butyl isocyanate|6.1|pih_liquid|A
2485|n-Butyl isocyanate|6.1|pih_liquid|A
2486|Isobutyl isocyanate|6.1|pih_liquid|A
2487|Phenyl isocyanate|6.1|pih_liquid|B
2488|Cyclohexyl isocyanate|6.1|pih_liquid|B
2521|Diketene, stabilized|6.1|pih_liquid|B
2534|Methylchlorosilane|2.3|pih_gas|B
2548|Chlorine pentafluoride|2.3|pih_gas|B
2605|Methoxymethyl isocyanate|6.1|pih_liquid|A
2606|Methyl orthosilicate|6.1|pih_liquid|B
2644|Methyl iodide|6.1|pih_liquid|B
2646|Hexachlorocyclopentadiene|6.1|pih_liquid|B
2668|Chloroacetonitrile|6.1|pih_liquid|B
2676|Stibine|2.3|pih_gas|A
2692|Boron tribromide|8|pih_liquid|B
2740|n-Propyl chloroformate|6.1|pih_liquid|B
2742|Chloroformates, toxic, corrosive, flammable, n.o.s.|6.1|pih_liquid|
2743|n-Butyl chloroformate|6.1|pih_liquid|B
2810|Toxic liquid, organic, n.o.s.|6.1||
2826|Ethyl chlorothioformate|8|pih_liquid|B
2901|Bromine chloride|2.3|pih_gas|B
2908|Radioactive material, excepted package, empty packaging|7|rad_excepted|
2909|Radioactive material, excepted package, articles|7|rad_excepted|
2910|Radioactive material, excepted package, limited quantity|7|rad_excepted|
2911|Radioactive material, excepted package, instruments or articles|7|rad_excepted|
2912|Radioactive material, low specific activity (LSA-I)|7|rad_other|
2913|Radioactive material, surface contaminated objects (SCO-I or SCO-II)|7|rad_other|
2915|Radioactive material, Type A package|7|rad_other|
2916|Radioactive material, Type B(U) package|7|rad_type_b|
2917|Radioactive material, Type B(M) package|7|rad_type_b|
2918|Radioactive material, Type A package, fissile|7|rad_fissile|
2977|Radioactive material, uranium hexafluoride, fissile|7|rad_fissile|
2978|Radioactive material, uranium hexafluoride|7|rad_other|
2983|Ethylene oxide and propylene oxide mixture|3|named_bulk_liquid,bulk_lpgas|
3023|2-Methyl-2-heptanethiol|6.1|pih_liquid|B
3057|Trifluoroacetyl chloride|2.3|pih_gas|B
3079|Methacrylonitrile, stabilized|3|pih_liquid,named_bulk_liquid|B
3083|Perchloryl fluoride|2.3|pih_gas|B
3160|Liquefied gas, toxic, flammable, n.o.s.|2.3|pih_gas|
3162|Liquefied gas, toxic, n.o.s.|2.3|pih_gas|
3246|Methanesulfonyl chloride|6.1|pih_liquid|B
3278|Organophosphorus compound, liquid, toxic, n.o.s.|6.1||
3286|Flammable liquid, toxic, corrosive, n.o.s.|3||
3300|Carbon dioxide and ethylene oxide mixture|2.3|pih_gas|
3303|Compressed gas, toxic, oxidizing, n.o.s.|2.3|pih_gas|
3304|Compressed gas, toxic, corrosive, n.o.s.|2.3|pih_gas|
3305|Compressed gas, toxic, flammable, corrosive, n.o.s.|2.3|pih_gas|
3306|Compressed gas, toxic, oxidizing, corrosive, n.o.s.|2.3|pih_gas|
3307|Liquefied gas, toxic, oxidizing, n.o.s.|2.3|pih_gas|
3308|Liquefied gas, toxic, corrosive, n.o.s.|2.3|pih_gas|
3309|Liquefied gas, toxic, flammable, corrosive, n.o.s.|2.3|pih_gas|
3310|Liquefied gas, toxic, oxidizing, corrosive, n.o.s.|2.3|pih_gas|
3318|Ammonia solution (>50% ammonia)|2.3|pih_gas|D
3321|Radioactive material, low specific activity (LSA-II)|7|rad_other|
3322|Radioactive material, low specific activity (LSA-III)|7|rad_other|
3323|Radioactive material, Type C package|7|rad_type_b|
3324|Radioactive material, low specific activity (LSA-II), fissile|7|rad_fissile|
3325|Radioactive material, low specific activity (LSA-III), fissile|7|rad_fissile|
3326|Radioactive material, surface contaminated objects, fissile|7|rad_fissile|
3327|Radioactive material, Type A package, fissile|7|rad_fissile|
3328|Radioactive material, Type B(U) package, fissile|7|rad_fissile|
3329|Radioactive material, Type B(M) package, fissile|7|rad_fissile|
3330|Radioactive material, Type C package, fissile|7|rad_fissile|
3331|Radioactive material, transported under special arrangement, fissile|7|rad_fissile|
3332|Radioactive material, Type A package, special form|7|rad_other|
3333|Radioactive material, Type A package, special form, fissile|7|rad_fissile|
3355|Insecticide gas, toxic, flammable, n.o.s.|2.3|pih_gas|
3375|Ammonium nitrate emulsion or suspension or gel|5.1|an_other|
3381|Toxic by inhalation liquid, n.o.s. (Hazard Zone A)|6.1|pih_liquid|A
3382|Toxic by inhalation liquid, n.o.s. (Hazard Zone B)|6.1|pih_liquid|B
3383|Toxic by inhalation liquid, flammable, n.o.s. (Zone A)|6.1|pih_liquid|A
3384|Toxic by inhalation liquid, flammable, n.o.s. (Zone B)|6.1|pih_liquid|B
3385|Toxic by inhalation liquid, water-reactive, n.o.s. (Zone A)|6.1|pih_liquid|A
3386|Toxic by inhalation liquid, water-reactive, n.o.s. (Zone B)|6.1|pih_liquid|B
3387|Toxic by inhalation liquid, oxidizing, n.o.s. (Zone A)|6.1|pih_liquid|A
3388|Toxic by inhalation liquid, oxidizing, n.o.s. (Zone B)|6.1|pih_liquid|B
3389|Toxic by inhalation liquid, corrosive, n.o.s. (Zone A)|6.1|pih_liquid|A
3390|Toxic by inhalation liquid, corrosive, n.o.s. (Zone B)|6.1|pih_liquid|B
3483|Motor fuel anti-knock mixture, flammable|6.1|pih_liquid|
3488|Toxic by inhalation liquid, flammable, corrosive, n.o.s. (Zone A)|6.1|pih_liquid|A
3489|Toxic by inhalation liquid, flammable, corrosive, n.o.s. (Zone B)|6.1|pih_liquid|B
3490|Toxic by inhalation liquid, water-reactive, flammable, n.o.s. (Zone A)|6.1|pih_liquid|A
3491|Toxic by inhalation liquid, water-reactive, flammable, n.o.s. (Zone B)|6.1|pih_liquid|B
3507|Uranium hexafluoride, radioactive material, excepted package|7|rad_excepted|
0331|Explosive, blasting, Type B|1.5D|expl_15d|
0332|Explosive, blasting, Type E|1.5D|expl_15d|
0081|Explosive, blasting, Type A|1.1D||
0082|Explosive, blasting, Type B|1.1D||
0241|Explosive, blasting, Type E|1.1D||
`.trim();

const FLAG_SET = new Set<CatalogFlag>([
  "pih_gas",
  "pih_liquid",
  "bulk_lpgas",
  "residue_always",
  "named_bulk_liquid",
  "an_51",
  "an_fertilizer",
  "an_other",
  "expl_15d",
  "rad_excepted",
  "rad_type_b",
  "rad_fissile",
  "rad_other",
]);

function parseFlags(raw: string): CatalogFlag[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is CatalogFlag => FLAG_SET.has(s as CatalogFlag));
}

export const CATALOG: Record<string, CatalogEntry> = {};

for (const line of RAW.split("\n")) {
  const [un, name, cls, flags, zone] = line.split("|");
  CATALOG[un] = {
    un,
    name,
    cls,
    flags: parseFlags(flags ?? ""),
    zone: zone || undefined,
  };
}

export function lookupUn(un: string): CatalogEntry | undefined {
  return CATALOG[un];
}

function tokens(s: string): string[] {
  return s
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, " ")
    .split(" ")
    .filter((t) => t.length >= 4);
}

function nameScore(catalogName: string, ocrName: string): number {
  const hay = ocrName.toUpperCase();
  return tokens(catalogName).reduce((n, t) => n + (hay.includes(t) ? 1 : 0), 0);
}

/**
 * OCR on a scanned DCM sometimes flips a digit (1075 LPG → 1076 phosgene).
 * Only move the UN when this UN is in the catalog and the printed name
 * does not match it.
 */
export function resolveOcrUn(un: string, name: string): string {
  if (!un || !name) return un;
  const current = lookupUn(un);
  if (!current) return un;
  const currentScore = nameScore(current.name, name);
  if (currentScore >= 1) return un;
  let bestUn = un;
  let best = 0;
  for (const e of Object.values(CATALOG)) {
    const s = nameScore(e.name, name);
    if (s > best) {
      best = s;
      bestUn = e.un;
    }
  }
  if (best >= 2) return bestUn;
  return un;
}

export function hasFlag(entry: CatalogEntry | undefined, flag: CatalogFlag): boolean {
  return Boolean(entry?.flags.includes(flag));
}

const PIH_PAPERS =
  /\b(PIH|TIH|poison(?:ous)?\s+by\s+inhalation|toxic\s+by\s+inhalation|inhalation\s+hazard)\b/i;
const ZONE_PAPERS = /(?:hazard\s*)?zone\s*([A-D])\b/i;

/** PIH / Hazard Zone taken from the shipping paper when the UN is not in the hook list. */
export function detectPihFromPapers(line: {
  name?: string;
  technicalName?: string;
  hazardZone?: string;
  raw?: string[];
}): { pih: boolean; zone?: string } {
  const zoneCol = (line.hazardZone ?? "").trim().toUpperCase();
  if (/^[A-D]$/.test(zoneCol)) return { pih: true, zone: zoneCol };

  const blob = [line.name, line.technicalName, ...(line.raw ?? [])].filter(Boolean).join("\n");
  const zm = blob.match(ZONE_PAPERS);
  if (zm) return { pih: true, zone: zm[1].toUpperCase() };
  if (PIH_PAPERS.test(blob)) return { pih: true };
  return { pih: false };
}
