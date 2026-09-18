import * as CFB from "cfb";

const OLE_MAGIC = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1];

export function isOleDoc(bytes: Uint8Array): boolean {
  if (bytes.length < 8) return false;
  return OLE_MAGIC.every((b, i) => bytes[i] === b);
}

export function isZipDocx(bytes: Uint8Array): boolean {
  return bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04;
}

function printableFromBytes(bytes: Uint8Array): string {
  const runs: string[] = [];
  let cur = "";
  const flush = (force = false) => {
    if (cur.length >= 4 || (force && cur.length)) runs.push(cur);
    cur = "";
  };
  for (const x of bytes) {
    if (x >= 32 && x < 127) cur += String.fromCharCode(x);
    else if (x === 9) cur += " ";
    else if (x === 10 || x === 13) {
      flush(true);
      runs.push("\n");
    } else {
      flush();
    }
  }
  flush();
  return runs.join("").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n");
}

function decodeUtf16le(bytes: Uint8Array): string {
  const even = bytes.length % 2 === 0 ? bytes : bytes.subarray(0, bytes.length - 1);
  const parts: string[] = [];
  let buf = "";
  for (let i = 0; i + 1 < even.length; i += 2) {
    const code = even[i] | (even[i + 1] << 8);
    if (code >= 32 && code < 127) buf += String.fromCharCode(code);
    else if (code === 9) buf += " ";
    else if (code === 10 || code === 13) {
      if (buf.length >= 4) parts.push(buf);
      parts.push("\n");
      buf = "";
    } else {
      if (buf.length >= 4) parts.push(buf);
      buf = "";
    }
  }
  if (buf.length >= 4) parts.push(buf);
  return parts.join("");
}

function streamBytes(entry: { content?: Buffer | number[] | Uint8Array } | null): Uint8Array | null {
  if (!entry?.content) return null;
  const c = entry.content;
  if (c instanceof Uint8Array) return c;
  return Uint8Array.from(c as number[]);
}

/** Pull the EXP023AR / Word report text out of a .doc (OLE) or .docx (zip). */
export function extractDocText(data: ArrayBuffer | Uint8Array): string {
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  if (isZipDocx(bytes)) return extractDocxText(bytes);
  if (!isOleDoc(bytes)) return printableFromBytes(bytes);

  const cfb = CFB.read(bytes, { type: "array" });
  const word = CFB.find(cfb, "WordDocument") ?? CFB.find(cfb, "Root Entry/WordDocument");
  const stream = streamBytes(word);
  if (!stream) return printableFromBytes(bytes);
  const ascii = printableFromBytes(stream);
  if (/\bUN\s+\d{3,5}\b/i.test(ascii) || /EXP023AR/i.test(ascii)) return ascii;
  const wide = decodeUtf16le(stream);
  if (wide.length > ascii.length) return wide;
  return ascii;
}

function extractDocxText(bytes: Uint8Array): string {
  try {
    const cfb = CFB.read(bytes, { type: "array" });
    const doc = CFB.find(cfb, "word/document.xml");
    const xmlBytes = streamBytes(doc);
    if (!xmlBytes) return printableFromBytes(bytes);
    const xml = new TextDecoder("utf-8").decode(xmlBytes);
    return xml
      .replace(/<w:tab\b[^/]*\/>/g, "\t")
      .replace(/<w:br\b[^/]*\/>/g, "\n")
      .replace(/<\/w:p>/g, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/"/g, '"')
      .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
  } catch {
    return printableFromBytes(bytes);
  }
}
