import { parseStow } from "../ship/stow.ts";
import { reeferMotors } from "./heat.ts";
import type { BaplieBox, BaplieDg, BapliePlan } from "./types.ts";

export function looksLikeBaplie(text: string): boolean {
  return /UNH\+[^+]*\+BAPLIE/i.test(text) || /\bBAPLIE:D:/i.test(text);
}

export function isBaplieFilename(name: string): boolean {
  return /\.(edi|baplie|bec)$/i.test(name) || /baplie/i.test(name);
}

function splitReleased(src: string, sep: string, release: string): string[] {
  const out: string[] = [];
  let cur = "";
  for (let i = 0; i < src.length; i++) {
    if (src[i] === release && i + 1 < src.length) {
      cur += src[i + 1];
      i++;
      continue;
    }
    if (src[i] === sep) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += src[i];
  }
  out.push(cur);
  return out;
}

function parseUna(text: string): { rest: string; data: string; comp: string; rel: string; term: string } {
  if (text.startsWith("UNA") && text.length >= 9) {
    return {
      rest: text.slice(9),
      comp: text[3],
      data: text[4],
      rel: text[6],
      term: text[8],
    };
  }
  return { rest: text, comp: ":", data: "+", rel: "?", term: "'" };
}

function isoReefer(iso?: string): boolean {
  if (!iso) return false;
  return /^\d{2}R/i.test(iso) || /^[A-Z][0-9]R/i.test(iso);
}

function toC(value: string, unit: string): number | null {
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  if (/FAH|FH/i.test(unit)) return ((n - 32) * 5) / 9;
  return n;
}

function locCode(el: string, comp: string, rel: string): string {
  return splitReleased(el, comp, rel)[0]?.trim() || "";
}

function parseStowField(el: string, comp: string, rel: string): { raw: string; stow: ReturnType<typeof parseStow> } {
  const parts = splitReleased(el, comp, rel).map((p) => p.trim()).filter(Boolean);
  const head = parts[0] || "";
  const direct = parseStow(head.replace(/\s/g, ""));
  if (direct) return { raw: head, stow: direct };
  if (parts.length >= 3 && /^\d+$/.test(parts[0]) && /^\d+$/.test(parts[1]) && /^\d+$/.test(parts[2])) {
    const raw = `${parts[0]}-${parts[1]}-${parts[2]}`;
    return { raw, stow: parseStow(raw) };
  }
  return { raw: head, stow: parseStow(head) };
}

function emptyBox(): BaplieBox {
  return {
    container: "",
    stow: null,
    reefer: false,
    operating: false,
    tempC: null,
    motors: "aft",
    dg: [],
  };
}

export function parseBaplie(text: string, filename = "baplie.edi"): BapliePlan {
  const una = parseUna(text.replace(/^\uFEFF/, "").trim());
  let body = una.rest.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  if (!body.includes(una.term)) body = body.replace(/\n/g, una.term);
  const segments = splitReleased(body, una.term, una.rel)
    .map((s) => s.replace(/\n/g, "").trim())
    .filter((s) => s.length > 1);

  const plan: BapliePlan = { sourceName: filename, boxes: [], warnings: [] };
  let cur: BaplieBox | null = null;

  const flush = () => {
    if (!cur?.container) return;
    if (isoReefer(cur.iso)) cur.reefer = true;
    if (cur.operating) cur.reefer = true;
    if (cur.stow) cur.motors = reeferMotors(cur.stow);
    plan.boxes.push(cur);
    cur = null;
  };

  for (const seg of segments) {
    const els = splitReleased(seg, una.data, una.rel);
    const tag = (els[0] || "").trim().toUpperCase();
    if (tag === "TDT") {
      const voyage = els[2]?.trim();
      if (voyage) plan.voyage = voyage;
      const vesselEl = els[8] || els[7] || "";
      const vesselParts = splitReleased(vesselEl, una.comp, una.rel);
      const vessel = vesselParts[2] || vesselParts[0];
      if (vessel && /[A-Za-z]/.test(vessel)) plan.vessel = vessel.trim();
    } else if (tag === "LOC") {
      const q = els[1]?.trim();
      const code = locCode(els[2] || "", una.comp, una.rel);
      if (q === "5" && code) plan.pol = code;
      else if ((q === "61" || q === "8") && code && !plan.pod) plan.pod = code;
      else if (q === "147" && cur) {
        const st = parseStowField(els[2] || "", una.comp, una.rel);
        cur.stowRaw = st.raw;
        cur.stow = st.stow;
      } else if (q === "9" && cur && code) cur.pod = code;
      else if (q === "11" && cur && code) cur.pol = code;
    } else if (tag === "EQD") {
      flush();
      cur = emptyBox();
      cur.container = (els[2] || "").replace(/\s+/g, "").toUpperCase();
      const iso = splitReleased(els[3] || "", una.comp, una.rel)[0]?.trim();
      if (iso) cur.iso = iso.toUpperCase();
      const full = (els[6] || els[5] || "").trim();
      if (full === "5") cur.full = true;
      if (full === "4") cur.full = false;
    } else if (tag === "MEA" && cur) {
      const joined = els.join(una.data);
      const m = joined.match(/KGM[:\+]?(\d+(?:\.\d+)?)/i) || joined.match(/LBR[:\+]?(\d+(?:\.\d+)?)/i);
      if (m) {
        const n = Number(m[1]);
        cur.weightKg = /LBR/i.test(m[0]) ? n * 0.453592 : n;
      }
    } else if (tag === "TMP" && cur) {
      const valParts = splitReleased(els[2] || "", una.comp, una.rel);
      cur.tempC = toC(valParts[0] || "", valParts[1] || "");
      cur.operating = true;
      cur.reefer = true;
    } else if (tag === "DGS" && cur) {
      const cls = (els[2] || "").trim();
      const un = (els[3] || "").replace(/^UN/i, "").trim();
      const pg = (els[4] || "").trim();
      const dg: BaplieDg = { un: un.replace(/\D/g, "").padStart(4, "0").slice(-4), cls, name: "", packingGroup: pg || undefined };
      if (dg.un === "0000") dg.un = "";
      cur.dg.push(dg);
    } else if (tag === "FTX" && cur) {
      const q = els[1]?.trim();
      const name = [els[4], els[3]].map((x) => splitReleased(x || "", una.comp, una.rel).filter(Boolean).join(" ")).find((s) => s.trim());
      if (name && (q === "AAA" || q === "AAD" || q === "AAC") && cur.dg.length) {
        cur.dg[cur.dg.length - 1].name = name.trim();
      }
    } else if (tag === "RFF" && cur) {
      const parts = splitReleased(els[1] || "", una.comp, una.rel);
      if (parts[0] === "BN" && parts[1]) cur.booking = parts[1].trim();
    }
  }
  flush();

  if (plan.boxes.length === 0) {
    plan.warnings.push("No containers in this BAPLIE.");
  }
  const noStow = plan.boxes.filter((b) => !b.stow).length;
  if (noStow) plan.warnings.push(`${noStow} boxes have no LOC+147 stowage.`);
  return plan;
}
