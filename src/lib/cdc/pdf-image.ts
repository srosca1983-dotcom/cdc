/** Pull raster page images out of simple DCM scans (fax CCITT or JPEG). */

export interface PdfRaster {
  kind: "tiff" | "jpeg";
  data: Uint8Array;
  width?: number;
  height?: number;
}

function asBytes(data: ArrayBuffer | Uint8Array): Uint8Array {
  return data instanceof Uint8Array ? data : new Uint8Array(data);
}

function ascii(bytes: Uint8Array, start: number, end: number): string {
  const n = Math.min(end, bytes.length);
  let s = "";
  for (let i = start; i < n; i++) s += String.fromCharCode(bytes[i]);
  return s;
}

function findAll(bytes: Uint8Array, needle: string): number[] {
  const n = needle.length;
  const out: number[] = [];
  for (let i = 0; i <= bytes.length - n; i++) {
    let ok = true;
    for (let j = 0; j < n; j++) {
      if (bytes[i + j] !== needle.charCodeAt(j)) {
        ok = false;
        break;
      }
    }
    if (ok) out.push(i);
  }
  return out;
}

function wrapCcittTiff(data: Uint8Array, width: number, height: number): Uint8Array {
  const n = 10;
  const ifd = 8;
  const dataOffset = ifd + 2 + n * 12 + 4;
  const buf = new Uint8Array(dataOffset + data.length);
  const view = new DataView(buf.buffer);
  buf[0] = 0x49;
  buf[1] = 0x49;
  view.setUint16(2, 42, true);
  view.setUint32(4, ifd, true);
  view.setUint16(ifd, n, true);
  const put = (i: number, tag: number, typ: number, count: number, val: number) => {
    const o = ifd + 2 + i * 12;
    view.setUint16(o, tag, true);
    view.setUint16(o + 2, typ, true);
    view.setUint32(o + 4, count, true);
    view.setUint32(o + 8, val, true);
  };
  put(0, 256, 4, 1, width);
  put(1, 257, 4, 1, height);
  put(2, 258, 3, 1, 1);
  put(3, 259, 3, 1, 4);
  put(4, 262, 3, 1, 0);
  put(5, 273, 4, 1, dataOffset);
  put(6, 277, 3, 1, 1);
  put(7, 278, 4, 1, height);
  put(8, 279, 4, 1, data.length);
  put(9, 266, 3, 1, 1);
  view.setUint32(ifd + 2 + n * 12, 0, true);
  buf.set(data, dataOffset);
  return buf;
}

function streamAfter(bytes: Uint8Array, objStart: number): { start: number; end: number } | null {
  const marker = findAll(bytes.subarray(objStart, Math.min(bytes.length, objStart + 4000)), "stream");
  if (!marker.length) return null;
  let start = objStart + marker[0] + 6;
  if (bytes[start] === 13) start++;
  if (bytes[start] === 10) start++;
  const dict = ascii(bytes, objStart, objStart + marker[0]);
  const lenM = dict.match(/\/Length\s+(\d+)(?!\s+\d+\s+R)/);
  if (lenM) {
    const len = Number(lenM[1]);
    return { start, end: Math.min(bytes.length, start + len) };
  }
  const end = bytes.subarray(start).findIndex((_, i, arr) => {
    return (
      i + 9 <= arr.length &&
      ascii(arr, i, i + 9).startsWith("endstream")
    );
  });
  if (end < 0) return null;
  let close = start + end;
  if (bytes[close - 1] === 10) close--;
  if (bytes[close - 1] === 13) close--;
  return { start, end: close };
}

export function extractPdfRasters(data: ArrayBuffer | Uint8Array): PdfRaster[] {
  const bytes = asBytes(data);
  const hits = [
    ...findAll(bytes, "/Subtype/Image"),
    ...findAll(bytes, "/Subtype /Image"),
  ].sort((a, b) => a - b);
  const out: PdfRaster[] = [];
  const seen = new Set<number>();
  for (const h of hits) {
    const objStart = Math.max(0, h - 80);
    if (seen.has(objStart)) continue;
    seen.add(objStart);
    const window = ascii(bytes, objStart, objStart + 2500);
    const stream = streamAfter(bytes, objStart);
    if (!stream || stream.end <= stream.start) continue;
    const payload = bytes.subarray(stream.start, stream.end);
    const width = Number(window.match(/\/Width\s+(\d+)/)?.[1] || 0);
    const height = Number(window.match(/\/(?:Height|Rows)\s+(\d+)/)?.[1] || 0);
    if (/CCITTFaxDecode/.test(window)) {
      const cols = Number(window.match(/\/Columns\s+(\d+)/)?.[1] || width);
      const rows = Number(window.match(/\/Rows\s+(\d+)/)?.[1] || height);
      if (cols && rows && payload.length > 20) {
        out.push({
          kind: "tiff",
          data: wrapCcittTiff(payload, cols, rows),
          width: cols,
          height: rows,
        });
      }
    } else if (/DCTDecode/.test(window) && payload[0] === 0xff && payload[1] === 0xd8) {
      out.push({ kind: "jpeg", data: payload, width, height });
    }
  }
  return out;
}
