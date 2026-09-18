import { o as __toESM } from "../_runtime.mjs";
import { t as require_cfb } from "../_libs/cfb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/doc-C43ochio.js
var import_cfb = /* @__PURE__ */ __toESM(require_cfb());
var OLE_MAGIC = [
	208,
	207,
	17,
	224,
	161,
	177,
	26,
	225
];
function isOleDoc(bytes) {
	if (bytes.length < 8) return false;
	return OLE_MAGIC.every((b, i) => bytes[i] === b);
}
function isZipDocx(bytes) {
	return bytes.length >= 4 && bytes[0] === 80 && bytes[1] === 75 && bytes[2] === 3 && bytes[3] === 4;
}
function printableFromBytes(bytes) {
	const runs = [];
	let cur = "";
	const flush = (force = false) => {
		if (cur.length >= 4 || force && cur.length) runs.push(cur);
		cur = "";
	};
	for (const x of bytes) if (x >= 32 && x < 127) cur += String.fromCharCode(x);
	else if (x === 9) cur += " ";
	else if (x === 10 || x === 13) {
		flush(true);
		runs.push("\n");
	} else flush();
	flush();
	return runs.join("").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n");
}
function decodeUtf16le(bytes) {
	const even = bytes.length % 2 === 0 ? bytes : bytes.subarray(0, bytes.length - 1);
	const parts = [];
	let buf = "";
	for (let i = 0; i + 1 < even.length; i += 2) {
		const code = even[i] | even[i + 1] << 8;
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
function streamBytes(entry) {
	if (!entry?.content) return null;
	const c = entry.content;
	if (c instanceof Uint8Array) return c;
	return Uint8Array.from(c);
}
/** Pull the EXP023AR / Word report text out of a .doc (OLE) or .docx (zip). */
function extractDocText(data) {
	const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
	if (isZipDocx(bytes)) return extractDocxText(bytes);
	if (!isOleDoc(bytes)) return printableFromBytes(bytes);
	const cfb = import_cfb.read(bytes, { type: "array" });
	const stream = streamBytes(import_cfb.find(cfb, "WordDocument") ?? import_cfb.find(cfb, "Root Entry/WordDocument"));
	if (!stream) return printableFromBytes(bytes);
	const ascii = printableFromBytes(stream);
	if (/\bUN\s+\d{3,5}\b/i.test(ascii) || /EXP023AR/i.test(ascii)) return ascii;
	const wide = decodeUtf16le(stream);
	if (wide.length > ascii.length) return wide;
	return ascii;
}
function extractDocxText(bytes) {
	try {
		const cfb = import_cfb.read(bytes, { type: "array" });
		const xmlBytes = streamBytes(import_cfb.find(cfb, "word/document.xml"));
		if (!xmlBytes) return printableFromBytes(bytes);
		return new TextDecoder("utf-8").decode(xmlBytes).replace(/<w:tab\b[^/]*\/>/g, "	").replace(/<w:br\b[^/]*\/>/g, "\n").replace(/<\/w:p>/g, "\n").replace(/<[^>]+>/g, "").replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, "\"").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
	} catch {
		return printableFromBytes(bytes);
	}
}
//#endregion
export { extractDocText };
