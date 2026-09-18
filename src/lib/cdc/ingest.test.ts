import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { masterEmail, enoadPasteBlock, NO_CDC_PASTE, emailFilename } from "./email.ts";
import { evaluateManifest } from "./evaluate.ts";
import { parseCombinedHazmat } from "./imdg.ts";
import { ingestBuffer } from "./ingest.ts";
import { classifyPackaging } from "./packaging.ts";
import { extractVoyage, parseManifest, pickVoyage, voyageFromFilename } from "./parse.ts";
import { linesFromPdfTokens, extractPdfVoyage, SCAN_PDF_WARNING } from "./pdf.ts";
import { PASHA_SAMPLE, WORKED_SAMPLE } from "./sample.ts";
import { categoryScan } from "./scan.ts";
import { CONTAINER_OPTIONS } from "./types.ts";
import { parseXlsxArrayBuffer } from "./xlsx.ts";
import { compareManifests, selectPreferred } from "./compare.ts";

const ATTACH = join(dirname(fileURLToPath(import.meta.url)), "../../../attachments");
const XLSX_PATH = join(ATTACH, "DCM G2069W.xlsx");
const PDF_PATH = join(ATTACH, "GEORGE II 069W HAZ MANIFEST.pdf");

describe("combined IMDG cell", () => {
  it("parses Pasha UN/name/class/PG in one cell", () => {
    const a = parseCombinedHazmat("UN3082,ENVIRONMENTALLY HAZARDOUS SUBSTANCE, LIQUID, N.O.S., 9,III");
    assert.equal(a?.un, "3082");
    assert.equal(a?.hazClass, "9");
    assert.equal(a?.packingGroup, "III");
    assert.match(a?.name ?? "", /ENVIRONMENTALLY HAZARDOUS/);

    const b = parseCombinedHazmat("UN3480,LITHIUM ION BATTERIES, 9,");
    assert.equal(b?.un, "3480");
    assert.equal(b?.hazClass, "9");

    const c = parseCombinedHazmat("UN1992,FLAMMABLE LIQUID, TOXIC, N.O.S., 3(6.1), II");
    assert.equal(c?.un, "1992");
    assert.equal(c?.hazClass, "3");
    assert.equal(c?.subsidiary, "6.1");
    assert.equal(c?.packingGroup, "II");
  });
});

describe("Pasha package codes", () => {
  it("maps CN / CY / BG / TK on a container ship", () => {
    assert.equal(classifyPackaging("10 CN", "containerized"), "rigid");
    assert.equal(classifyPackaging("7 CY", "containerized"), "cylinder");
    assert.equal(classifyPackaging("1 TO", "containerized"), "bulk_packaging");
    assert.equal(classifyPackaging("1 TOTE", "containerized"), "bulk_packaging");
    assert.equal(classifyPackaging("40 BG", "containerized"), "combustible_bag");
    assert.equal(classifyPackaging("1 TK", "containerized"), "bulk_packaging");
    assert.equal(classifyPackaging("1 CARTON", "containerized"), "rigid");
  });
});

describe("Pasha-style sample email", () => {
  it("writes CDC CARRIED: NO for a typical boxship DCM", () => {
    const parsed = parseManifest(PASHA_SAMPLE, "lb");
    const result = evaluateManifest(parsed.lines, CONTAINER_OPTIONS);
    assert.equal(result.cdc, 0);
    assert.equal(enoadPasteBlock(result), NO_CDC_PASTE);
    assert.match(enoadPasteBlock(result), /GENERAL CARGO \(other than CDC\): CONTAINERIZED/);
    const u2810 = result.lines.find((l) => l.un === "2810");
    assert.equal(u2810?.verdict, "NOT_CDC");
    const mail = masterEmail(result, { vessel: "GEORGE II", voyage: "069W" }, "sample");
    assert.match(mail.subject, /GEORGE II/);
    assert.match(mail.subject, /CDC: NO/);
    assert.match(mail.body, /^Master,/);
    assert.match(mail.body, /PASTE INTO eNOAD/);
    assert.match(mail.body, /CDC CARRIED: NO/);
    assert.match(mail.body, /CATEGORY CHECK/);
    assert.match(mail.body, /6\.1 PIH tank or > 20 MT/);
    assert.doesNotMatch(mail.body, /TO: /);
    assert.doesNotMatch(mail.body, /Captain/i);
    assert.match(mail.mailto, /^mailto:\?/);
    assert.equal(emailFilename({ vessel: "GEORGE II", voyage: "069W" }, "NO"), "GEORGE_II_069W_eNOAD-CDC-NO.txt");
  });

  it("writes NAME / UN NUMBER / AMOUNT when CDC is present", () => {
    const parsed = parseManifest(WORKED_SAMPLE, "lb");
    const result = evaluateManifest(parsed.lines, CONTAINER_OPTIONS);
    assert.ok(result.cdc >= 2);
    const paste = enoadPasteBlock(result);
    assert.match(paste, /GENERAL CARGO \(other than CDC\): CONTAINERIZED/);
    assert.match(paste, /CDC CARRIED: YES/);
    assert.match(paste, /UN NUMBER: /);
    assert.match(paste, /AMOUNT: /);
  });
});

describe("category scan", () => {
  it("marks 6.1 cartons as watch, not CDC, on a typical boxship sample", () => {
    const parsed = parseManifest(PASHA_SAMPLE, "lb");
    const result = evaluateManifest(parsed.lines, CONTAINER_OPTIONS);
    const items = categoryScan(result);
    assert.equal(items.length, 9);
    const byId = Object.fromEntries(items.map((i) => [i.id, i]));
    assert.equal(byId.p1.tone, "clear");
    assert.equal(byId.p3.tone, "clear");
    assert.equal(byId.p5.tone, "watch");
    assert.match(byId.p5.detail, /under 20 MT/);
    assert.ok(items.every((i) => i.tone !== "cdc"));
  });

  it("flags 1.1, 2.3 over 1 MT, bagged AN, and 6.1 tank as CDC on the worked example", () => {
    const parsed = parseManifest(WORKED_SAMPLE, "lb");
    const result = evaluateManifest(parsed.lines, CONTAINER_OPTIONS);
    const byId = Object.fromEntries(categoryScan(result).map((i) => [i.id, i]));
    assert.equal(byId.p1.tone, "cdc");
    assert.equal(byId.p3.tone, "cdc");
    assert.equal(byId.p4.tone, "cdc");
    assert.equal(byId.p5.tone, "cdc");
  });
});

describe("real Pasha DCM workbook", () => {
  it("reads 928 cargo rows and voyage header, with no confirmed CDC", () => {
    const buf = readFileSync(XLSX_PATH);
    const parsed = parseXlsxArrayBuffer(buf, "DCM G2069W.xlsx");
    assert.equal(parsed.delimiter, "xlsx");
    assert.equal(parsed.lines.length, 928);
    assert.match(parsed.voyage.vessel ?? "", /GEORGE II/i);
    assert.match(parsed.voyage.voyage ?? "", /069W/i);
    assert.equal(parsed.unitGuess, "lb");
    assert.equal(parsed.voyage.vessel, "GEORGE II");
    assert.doesNotMatch(JSON.stringify(parsed.voyage), /captain|master name/i);

    const u2810 = parsed.lines.find((l) => l.un === "2810");
    assert.ok(u2810, "UN 2810 must be on the DCM");
    assert.equal(u2810.hazClass, "6.1");
    assert.ok(u2810.quantityKg !== null && u2810.quantityKg < 10);
    assert.match(u2810.packaging, /CN/i);

    const result = evaluateManifest(parsed.lines, CONTAINER_OPTIONS);
    assert.equal(result.cdc, 0);
    assert.equal(result.enoad.length, 0);
    assert.equal(enoadPasteBlock(result), NO_CDC_PASTE);
    assert.equal(result.review, 0);
    assert.ok(result.lines.some((l) => l.un === "2810" && l.verdict === "NOT_CDC"));

    const scan = categoryScan(result);
    assert.ok(scan.every((i) => i.tone !== "cdc"));
    const six = scan.find((i) => i.id === "p5");
    assert.equal(six?.tone, "watch");
    const mail = masterEmail(result, parsed.voyage, parsed.sourceName);
    assert.match(mail.body, /^Master,/);
    assert.doesNotMatch(mail.body, /TO: /);
  });
});

describe("PDF token layout (EXP023AR)", () => {
  it("reads UN 1263 from a page-1 style cluster", () => {
    const tokens = [
      { str: "VESSEL: GEORGE II", x: 281, y: 554 },
      { str: "VOYAGE: 069W", x: 281, y: 545 },
      { str: "PORT OF LOADING: LONG BEACH", x: 238, y: 518 },
      { str: "DISCHARGE PORT: HONOLULU", x: 243, y: 509 },
      { str: "BSIU8070423", x: 27, y: 427 },
      { str: "3", x: 156, y: 427 },
      { str: "III", x: 367, y: 427 },
      { str: "PAINT", x: 449, y: 427 },
      { str: "3606912032", x: 32, y: 418 },
      { str: "298", x: 109, y: 418 },
      { str: "LB", x: 132, y: 418 },
      { str: "PHH", x: 156, y: 418 },
      { str: "UN 1263", x: 185, y: 418 },
      { str: "7 CARTON", x: 27, y: 409 },
    ];
    const voyage = extractPdfVoyage(tokens);
    assert.equal(voyage.vessel, "GEORGE II");
    assert.equal(voyage.voyage, "069W");
    const lines = linesFromPdfTokens(tokens);
    assert.equal(lines.length, 1);
    assert.equal(lines[0].un, "1263");
    assert.equal(lines[0].name, "PAINT");
    assert.equal(lines[0].hazClass, "3");
    assert.equal(lines[0].packaging, "7 CARTON");
    assert.ok(lines[0].quantityKg && lines[0].quantityKg > 100);
  });
});

describe("real haz-manifest PDF", () => {
  it("reads UN tokens and agrees CDC CARRIED: NO", async () => {
    const buf = readFileSync(PDF_PATH);
    const parsed = await ingestBuffer(buf, "GEORGE II 069W HAZ MANIFEST.pdf");
    assert.equal(parsed.delimiter, "pdf");
    assert.ok(parsed.lines.length >= 900, `expected ~929 lines, got ${parsed.lines.length}`);
    assert.match(parsed.voyage.vessel ?? "", /GEORGE II/i);
    assert.match(parsed.voyage.voyage ?? "", /069W/i);
    assert.ok(parsed.lines.some((l) => l.un === "2810"));
    const result = evaluateManifest(parsed.lines, CONTAINER_OPTIONS);
    assert.equal(result.cdc, 0);
    assert.equal(result.review, 0);
    assert.equal(enoadPasteBlock(result), NO_CDC_PASTE);
  });
});

describe("voyage cell walker", () => {
  it("reads the Pasha header layout with blank cells between label and value", () => {
    const rows = [
      ["COMPANY NAME: PASHA HAWAII"],
      ["Nationality:", "", "United States", "", "", "Load Port:", "", "LBA", "", "", "", "Voyage:", "", "069W"],
      ["Date of Loading:", "", "9/2/26", "", "", "Final Disch Port", "", "HNL", "", "", "", "Vessel:", "", "GEORGE II"],
    ];
    const v = extractVoyage(rows);
    assert.equal(v.vessel, "GEORGE II");
    assert.equal(v.voyage, "069W");
    assert.equal(v.pol, "LBA");
    assert.equal(v.pod, "HNL");
    assert.equal(v.company, "PASHA HAWAII");
  });
});

describe("voyage quality merge", () => {
  it("prefers GEORGE II / 068W over header G2 / G2068W", () => {
    const cargo = extractVoyage([
      ["POL", "LGB", "Voyage:", "068W", "Vessel:", "GEORGE II"],
    ]);
    const header = extractVoyage([
      ["Load Port:", "LBA", "Voyage:", "G2", "Vessel:", "G2068W"],
    ]);
    const v = pickVoyage(cargo, header, voyageFromFilename("Copy of G2068W LGB DCM - Audited.xlsx"));
    assert.equal(v.vessel, "GEORGE II");
    assert.equal(v.voyage, "068W");
  });

  it("reads G2068W / G2069W from filenames as 068W / 069W", () => {
    assert.equal(voyageFromFilename("DCM G2069W.xlsx").voyage, "069W");
    assert.equal(voyageFromFilename("Copy of G2068W LGB DCM - Audited.xlsx").voyage, "068W");
    assert.equal(voyageFromFilename("GEORGE II 068W HAZ MANIFEST.pdf").vessel, "GEORGE II");
    assert.equal(voyageFromFilename("GEORGE II 068W HAZ MANIFEST.pdf").voyage, "068W");
  });
});

describe("real 068W audited DCM", () => {
  it("reads 961 lines as GEORGE II 068W with no CDC", () => {
    const buf = readFileSync(join(ATTACH, "Copy of G2068W LGB DCM - Audited.xlsx"));
    const parsed = parseXlsxArrayBuffer(buf, "Copy of G2068W LGB DCM - Audited.xlsx");
    assert.equal(parsed.lines.length, 961);
    assert.equal(parsed.voyage.vessel, "GEORGE II");
    assert.equal(parsed.voyage.voyage, "068W");
    const result = evaluateManifest(parsed.lines, CONTAINER_OPTIONS);
    assert.equal(result.cdc, 0);
    assert.equal(result.review, 0);
    assert.equal(enoadPasteBlock(result), NO_CDC_PASTE);
    const mail = masterEmail(result, parsed.voyage, parsed.sourceName);
    assert.match(mail.subject, /GEORGE II 068W/);
    assert.doesNotMatch(mail.body, /Mark Tuck|RAFIK|Captain name/i);
  });
});

describe("signed scan PDF", () => {
  it("explains that a photo of the DCM cannot be read", async () => {
    const buf = readFileSync(join(ATTACH, "G2 DCM.pdf"));
    const parsed = await ingestBuffer(buf, "G2 DCM.pdf");
    assert.equal(parsed.lines.length, 0);
    assert.equal(parsed.warnings[0], SCAN_PDF_WARNING);
  });
});

describe("xlsx vs pdf compare", () => {
  it("flags UN count mismatches and prefers Excel", () => {
    const a = parseManifest(PASHA_SAMPLE, "lb");
    a.sourceName = "dcm.xlsx";
    a.delimiter = "xlsx";
    const b = parseManifest(PASHA_SAMPLE, "lb");
    b.sourceName = "haz.pdf";
    b.delimiter = "pdf";
    b.lines = b.lines.slice(1);
    const cmp = compareManifests(a, b);
    assert.equal(cmp.agreesCdc, true);
    assert.ok(cmp.mismatches.length >= 1);
    assert.equal(selectPreferred([a, b])?.sourceName, "dcm.xlsx");
  });
});
