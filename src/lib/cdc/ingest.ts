import { parseManifest, coalesceVoyage } from "./parse.ts";
import type { ParseResult } from "./types.ts";

export type IngestProgress = (done: number, total: number) => void;

function decodeText(data: ArrayBuffer | Uint8Array): string {
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) {
    return new TextDecoder("utf-16le").decode(bytes);
  }
  return new TextDecoder("utf-8").decode(bytes);
}

export async function ingestBuffer(
  data: ArrayBuffer | Uint8Array,
  filename: string,
  onProgress?: IngestProgress,
): Promise<ParseResult> {
  const name = (filename || "manifest").toLowerCase();
  if (name.endsWith(".pdf")) {
    const { parsePdfArrayBuffer } = await import("./pdf.ts");
    return parsePdfArrayBuffer(data, filename, onProgress);
  }
  if (name.endsWith(".xlsx") || name.endsWith(".xls") || name.endsWith(".xlsm")) {
    const { parseXlsxArrayBuffer } = await import("./xlsx.ts");
    return parseXlsxArrayBuffer(data, filename);
  }
  if (name.endsWith(".doc") || name.endsWith(".docx")) {
    const { extractDocText } = await import("./doc.ts");
    const text = extractDocText(data);
    const parsed = parseManifest(text, "lb");
    parsed.sourceName = filename;
    parsed.voyage = coalesceVoyage([parsed.voyage], filename);
    parsed.delimiter = name.endsWith(".docx") ? "docx" : "doc";
    if (parsed.lines.length === 0) {
      parsed.warnings.push(
        "This Word file had no UN numbers. Drop the Excel DCM or the EXP023AR hazardous cargo manifest.",
      );
    }
    return parsed;
  }
  const parsed = parseManifest(decodeText(data), "lb");
  parsed.sourceName = filename;
  parsed.voyage = coalesceVoyage([parsed.voyage], filename);
  return parsed;
}

export async function ingestFile(file: File, onProgress?: IngestProgress): Promise<ParseResult> {
  const buf = await file.arrayBuffer();
  return ingestBuffer(buf, file.name, onProgress);
}