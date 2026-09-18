import { useEffect, useMemo, useRef, useState, type DragEvent, type ReactNode } from "react";
import {
  Anchor,
  Check,
  ClipboardCopy,
  Download,
  Eraser,
  FileSpreadsheet,
  FileText,
  GitCompare,
  History,
  Mail,
  Search,
  Shield,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LegacyBadge, VerdictBadge } from "@/components/cdc/verdict-badge";
import { evaluateManifest, evaluateSingle } from "@/lib/cdc/evaluate.ts";
import {
  masterEmail,
  enoadPasteBlock,
  emailFilename,
  emailFileContents,
} from "@/lib/cdc/email.ts";
import { downloadText, resultsCsv } from "@/lib/cdc/export.ts";
import { ingestFile } from "@/lib/cdc/ingest.ts";
import { lookupUn } from "@/lib/cdc/catalog.ts";
import { parseManifest } from "@/lib/cdc/parse.ts";
import { compareManifests, kindLabel, mergeStowFromAll, selectPreferred, type ManifestCompare } from "@/lib/cdc/compare.ts";
import { packFormLabel } from "@/lib/cdc/packaging.ts";
import { formatKg } from "@/lib/cdc/quantity.ts";
import { DISCLAIMER, ENOAD_BLURB, RULE_CARDS } from "@/lib/cdc/rules-text.ts";
import { PASHA_SAMPLE, WORKED_SAMPLE } from "@/lib/cdc/sample.ts";
import { categoryScan, type ScanItem } from "@/lib/cdc/scan.ts";
import { loadCargo, loadVoyageLog, logLabel, pushVoyageLog, saveCargo, voyageBits, type VoyageLog } from "@/lib/cdc/history.ts";
import { isLimitedQty } from "@/lib/cdc/limited.ts";
import { CONTAINER_OPTIONS } from "@/lib/cdc/types.ts";
import type { EvalResult, LineResult, ParseResult, VoyageInfo } from "@/lib/cdc/types.ts";
import { cn } from "@/lib/utils";
import { ShipBoard, ChemicalView } from "@/components/cdc/ship-board.tsx";
import { VoyageRisksView } from "@/components/cdc/voyage-risks.tsx";
import { sheetFor, sheetSections } from "@/lib/erg/guides.ts";
import { isBaplieFilename, looksLikeBaplie, parseBaplie } from "@/lib/baplie/parse.ts";
import { SAMPLE_BAPLIE } from "@/lib/baplie/sample.ts";
import { loadBaplie, saveBaplie } from "@/lib/baplie/store.ts";
import type { BapliePlan } from "@/lib/baplie/types.ts";
import { BaplieSummary } from "@/components/cdc/baplie-summary.tsx";

type Tab = "manifest" | "ship" | "response" | "lookup" | "rules";
type Filter = "flagged" | "all" | "CDC" | "REVIEW" | "NOT_CDC" | "full" | "lq";

export function Screener() {
  const [tab, setTab] = useState<Tab>("manifest");
  const [parsed, setParsed] = useState<ParseResult | null>(null);
  const [result, setResult] = useState<EvalResult | null>(null);
  const [baplie, setBaplie] = useState<BapliePlan | null>(null);
  const [chem, setChem] = useState<{ un: string; cls: string; name: string } | null>(null);

  useEffect(() => {
    const stored = loadCargo();
    if (stored) {
      const restored: ParseResult = {
        header: [],
        lines: stored.lines,
        warnings: [],
        delimiter: "xlsx",
        voyage: stored.voyage,
        unitGuess: "lb",
        sourceName: stored.sourceName,
      };
      setParsed(restored);
      setResult(evaluateManifest(stored.lines, CONTAINER_OPTIONS));
    }
    setBaplie(loadBaplie());
  }, []);

  return (
    <div className="min-h-dvh bg-bg">
      <Header tab={tab} onTab={setTab} hasVoyage={Boolean(result || baplie)} />
      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
        {tab === "manifest" && (
          <ManifestPanel
            parsed={parsed}
            result={result}
            baplie={baplie}
            setParsed={setParsed}
            setResult={setResult}
            setBaplie={setBaplie}
          />
        )}
        {tab === "ship" && (result || baplie) && (
          <ShipBoard parsed={parsed} result={result} baplie={baplie} />
        )}
        {tab === "ship" && !result && !baplie && <NeedVoyage onGo={() => setTab("manifest")} />}
        {tab === "response" && (result || baplie) && !chem && (
          <VoyageRisksView result={result} baplie={baplie} onOpen={setChem} />
        )}
        {tab === "response" && chem && (
          <ChemicalView
            sheet={sheetFor(chem.un, chem.cls, chem.name)}
            onBack={() => setChem(null)}
          />
        )}
        {tab === "response" && !result && !baplie && <NeedVoyage onGo={() => setTab("manifest")} />}
        {tab === "lookup" && <LookupPanel />}
        {tab === "rules" && <RulesPanel />}
      </main>
    </div>
  );
}

function Header({ tab, onTab, hasVoyage }: { tab: Tab; onTab: (t: Tab) => void; hasVoyage: boolean }) {
  return (
    <header className="bg-navy text-primary-foreground">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 hidden size-10 items-center justify-center rounded-md bg-navy-2 sm:flex">
              <Anchor className="size-5" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-primary-foreground/60 uppercase">
                Container ship · DCM + BAPLIE · 33 CFR 160.202
              </p>
              <h1 className="mt-1 text-xl font-medium tracking-tight sm:text-2xl">
                Cargo and DCM Viewer
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-primary-foreground/70">
                Drop the Excel DCM, the Word FINAL DCM, and the printed manifest.
                Stow and CDC come from that voyage. BAPLIE is optional. Open
                What can go wrong for fire, explosion, toxic vapor, wetting, hold
                entry, lost boxes, and the rest.
              </p>
            </div>
          </div>
          <Badge variant="navy" className="border border-primary-foreground/15 bg-navy-2">
            Container ships only
          </Badge>
        </div>
        <nav className="flex flex-wrap gap-1 overflow-x-auto rounded-lg bg-navy-2 p-1" aria-label="Primary">
          {(
            [
              ["manifest", "Manifest"],
              ["ship", "Ship"],
              ["response", "What can go wrong"],
              ["lookup", "UN lookup"],
              ["rules", "33 CFR 160.202"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => onTab(id)}
              className={cn(
                "h-10 shrink-0 whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors duration-150 sm:px-5",
                tab === id
                  ? "bg-surface text-ink"
                  : "text-primary-foreground/70 hover:text-primary-foreground",
              )}
            >
              {id === "ship" && hasVoyage ? `${label} ·` : label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function NeedVoyage({ onGo }: { onGo: () => void }) {
  return (
    <div className="rounded-lg border bg-surface p-6 shadow-border">
      <h2 className="text-lg font-medium">Load a voyage first</h2>
      <p className="mt-2 text-sm text-muted">
        Drop the Excel DCM (and the Word or PDF if you have them) on Manifest. Stow
        positions live on the Excel sheet. A BAPLIE is optional — the hatch plan still
        works from the DCM.
      </p>
      <Button className="mt-4" onClick={onGo}>
        Open Manifest
      </Button>
    </div>
  );
}

function ManifestPanel({
  parsed,
  result,
  baplie,
  setParsed,
  setResult,
  setBaplie,
}: {
  parsed: ParseResult | null;
  result: EvalResult | null;
  baplie: BapliePlan | null;
  setParsed: (p: ParseResult | null) => void;
  setResult: (r: EvalResult | null) => void;
  setBaplie: (p: BapliePlan | null) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("flagged");
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [showPaste, setShowPaste] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [mounted, setMounted] = useState(false);
  const [log, setLog] = useState<VoyageLog[]>([]);
  const [restored, setRestored] = useState<VoyageLog | null>(null);
  const [compare, setCompare] = useState<ManifestCompare | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const baplieRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    setLog(loadVoyageLog());
  }, []);

  function applyParsed(next: ParseResult) {
    if (next.lines.length === 0) {
      setParsed(next);
      setResult(null);
      setError(next.warnings[0] || "No UN numbers found.");
      return;
    }
    const evaluated = evaluateManifest(next.lines, CONTAINER_OPTIONS);
    setError(null);
    setParsed(next);
    setResult(evaluated);
    setFilter("flagged");
    setQuery("");
    setRestored(null);
    setCompare(null);
    saveCargo({
      at: Date.now(),
      voyage: next.voyage,
      sourceName: next.sourceName,
      lines: next.lines,
    });
    const mail = masterEmail(evaluated, next.voyage, next.sourceName);
    setLog(
      pushVoyageLog({
        at: Date.now(),
        ...voyageBits(next.voyage),
        sourceName: next.sourceName,
        total: evaluated.total,
        cdc: evaluated.cdc + evaluated.residue,
        review: evaluated.review,
        flag: evaluated.enoad.length === 0 ? "NO" : "YES",
        subject: mail.subject,
        body: mail.body,
        paste: mail.paste,
      }),
    );
  }

  async function applyBaplieFile(file: File) {
    const text = await file.text();
    if (!looksLikeBaplie(text) && !isBaplieFilename(file.name)) {
      throw new Error("That file does not look like a BAPLIE (UNH+BAPLIE).");
    }
    const plan = parseBaplie(text, file.name);
    setBaplie(plan);
    saveBaplie(plan);
  }

  async function onFiles(files: FileList | File[]) {
    const list = [...files];
    const baplieFiles: File[] = [];
    const dcmFiles: File[] = [];
    for (const f of list) {
      if (isBaplieFilename(f.name)) {
        baplieFiles.push(f);
        continue;
      }
      if (/\.txt$/i.test(f.name)) {
        const head = (await f.text()).slice(0, 65536);
        if (looksLikeBaplie(head)) {
          baplieFiles.push(f);
          continue;
        }
      }
      if (/\.(xlsx|xls|xlsm|pdf|csv|tsv|txt|doc|docx|edi|baplie|bec)$/i.test(f.name)) {
        if (/\.(edi|baplie|bec)$/i.test(f.name)) baplieFiles.push(f);
        else dcmFiles.push(f);
      }
    }
    setProgress(null);
    setError(null);
    setCompare(null);
    try {
      if (baplieFiles[0]) {
        setBusy("Reading BAPLIE…");
        await applyBaplieFile(baplieFiles[0]);
      }
      if (dcmFiles.length === 0) {
        if (baplieFiles[0]) return;
        return;
      }
      const parsedList = [];
      const take = Math.min(dcmFiles.length, 3);
      for (let i = 0; i < take; i++) {
        const file = dcmFiles[i];
        const isPdf = file.name.toLowerCase().endsWith(".pdf");
        const isDoc = /\.docx?$/i.test(file.name);
        setBusy(
          dcmFiles.length > 1
            ? `Reading file ${i + 1} of ${take}…`
            : isPdf
              ? "Reading PDF…"
              : isDoc
                ? "Reading Word DCM…"
                : "Reading workbook…",
        );
        const next = await ingestFile(file, (done, total) => {
          setBusy(
            dcmFiles.length > 1
              ? `File ${i + 1}: page ${done} of ${total}`
              : total > 0 && done === 0
                ? "Reading scanned DCM…"
                : `Reading PDF page ${done} of ${total}`,
          );
          setProgress({ done, total });
        });
        parsedList.push(next);
      }
      const usable = parsedList.filter((p) => p.lines.length > 0);
      const preferred = mergeStowFromAll(usable) ?? selectPreferred(usable);
      if (!preferred) {
        setParsed(parsedList[0] ?? null);
        setResult(null);
        setError(parsedList[0]?.warnings[0] || "No UN numbers found.");
        return;
      }
      applyParsed(preferred);
      if (usable.length === 2) {
        setCompare(compareManifests(usable[0], usable[1]));
      } else if (parsedList.length === 2 && parsedList.some((p) => p.lines.length === 0)) {
        const empty = parsedList.find((p) => p.lines.length === 0);
        if (empty?.warnings[0]) setError(empty.warnings[0]);
      }
    } catch (err) {
      setResult(null);
      setParsed(null);
      setError(err instanceof Error ? err.message : "Could not read that file.");
    } finally {
      setBusy(null);
      setProgress(null);
    }
  }

  function loadSample(text: string, name: string) {
    const next = parseManifest(text, "lb");
    next.sourceName = name;
    applyParsed(next);
  }

  const flaggedCount = result ? result.cdc + result.residue + result.review : 0;
  const lqCount = result ? result.lines.filter((l) => isLimitedQty(l)).length : 0;
  const fullCount = result ? result.total - lqCount : 0;

  const filtered = useMemo(() => {
    if (!result) return [];
    const needle = query.trim().toLowerCase().replace(/^un\s*/, "");
    return result.lines
      .filter((l) => {
      if (filter === "flagged" && l.verdict === "NOT_CDC") return false;
      if (filter === "CDC" && l.verdict !== "CDC" && l.verdict !== "CDC_RESIDUE") return false;
      if (filter === "REVIEW" && l.verdict !== "REVIEW") return false;
      if (filter === "NOT_CDC" && l.verdict !== "NOT_CDC") return false;
      if (filter === "full" && isLimitedQty(l)) return false;
      if (filter === "lq" && !isLimitedQty(l)) return false;
      if (!needle) return true;
      const hay = [
        l.un,
        l.name,
        l.hazClass,
        l.packaging,
        l.input.container,
        l.input.booking,
        l.input.technicalName,
        isLimitedQty(l) ? "ltd qty limited" : "full dg",
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    })
      .sort((a, b) => {
        const lq = Number(isLimitedQty(a)) - Number(isLimitedQty(b));
        if (lq) return lq;
        const ca = (a.input.container || "").toUpperCase();
        const cb = (b.input.container || "").toUpperCase();
        if (ca !== cb) return ca.localeCompare(cb);
        return a.un.localeCompare(b.un);
      });
  }, [result, filter, query]);

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) void onFiles(e.dataTransfer.files);
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-base font-medium">Dangerous cargo manifest</h2>
            <p className="mt-1 text-sm text-muted">
              Drop up to three files for this voyage: Excel DCM, Word FINAL DCM, printed
              EXP023AR PDF. Excel carries Stow Loc for the hatch plan. A BAPLIE is
              optional and loads separately — you do not need it for CDC.
            </p>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={cn(
              "relative flex min-h-36 flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-8 text-center transition-colors duration-150",
              dragOver ? "border-navy bg-surface-2" : "border-border bg-surface-2/60",
              busy && "opacity-70",
            )}
          >
            {mounted ? (
              <input
                ref={fileRef}
                type="file"
                multiple
                accept=".xlsx,.xls,.xlsm,.pdf,.doc,.docx,.csv,.tsv,.txt,.edi,.baplie,.bec,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                disabled={Boolean(busy)}
                aria-label="Upload dangerous cargo manifest"
                className="absolute inset-0 z-10 cursor-pointer opacity-0"
                onChange={(e) => {
                  if (e.target.files?.length) void onFiles(e.target.files);
                  e.target.value = "";
                }}
              />
            ) : null}
            <span className="pointer-events-none flex size-11 items-center justify-center rounded-md bg-navy text-primary-foreground">
              <Upload className="size-5" />
            </span>
            <span className="pointer-events-none text-sm font-medium">
              Drop Excel, Word FINAL DCM, and the printed PDF
            </span>
            <span className="pointer-events-none text-xs text-muted">
              Up to three files · Excel has hatch stowage · CDC from the preferred sheet
            </span>
            {busy ? (
              <span className="pointer-events-none mt-2 w-full max-w-xs">
                <span className="block text-xs text-accent">{busy}</span>
                {progress ? (
                  <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-border">
                    <span
                      className="block h-full bg-navy transition-[width] duration-150"
                      style={{ width: `${Math.round((progress.done / progress.total) * 100)}%` }}
                    />
                  </span>
                ) : null}
              </span>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => loadSample(PASHA_SAMPLE, "pasha-style-sample.tsv")}>
              <FileSpreadsheet />
              Pasha-style sample
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadSample(WORKED_SAMPLE, "worked-cdc-example.tsv")}>
              <FileText />
              Example with CDC
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowPaste((v) => !v)}>
              Paste instead
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto"
              onClick={() => {
                setParsed(null);
                setResult(null);
                setError(null);
                setPasteText("");
                setRestored(null);
                setQuery("");
                setCompare(null);
              }}
            >
              <Eraser />
              Clear DCM
            </Button>
          </div>

          {showPaste ? (
            <div className="flex flex-col gap-2">
              <Textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                spellCheck={false}
                className="h-36"
                placeholder={"UN/NA NO - Shipping Name - Hazardous Class - Packing Group\tWeight Lbs\tPackaging\nUN2810,TOXIC LIQUIDS, ORGANIC, N.O.S., 6.1,III\t5.5\t1 CN"}
              />
              <Button
                size="sm"
                onClick={() => {
                  const next = parseManifest(pasteText, "lb");
                  next.sourceName = "pasted-manifest";
                  applyParsed(next);
                }}
              >
                <Search />
                Screen pasted text
              </Button>
            </div>
          ) : null}

          {error ? (
            <p className="rounded-md bg-cdc-soft px-3 py-2 text-sm text-cdc">{error}</p>
          ) : null}
        </div>
      </section>

      <section id="baplie-panel" className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
        <div className="flex flex-col gap-3">
          <div>
            <h2 className="text-base font-medium">BAPLIE (optional)</h2>
            <p className="mt-1 text-sm text-muted">
              Drop the bay plan when you have it. Reefers, dry cargo, and DG-next-to-reefer
              show on Ship. All reefers face aft except bay 6 or 22 below (motors forward).
              CDC and the hatch plan still run from the DCM alone.
            </p>
          </div>
          <div className="relative flex min-h-24 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border bg-surface-2/60 px-4 py-6 text-center">
            {mounted ? (
              <input
                ref={baplieRef}
                type="file"
                accept=".edi,.baplie,.bec,.txt,text/plain"
                disabled={Boolean(busy)}
                aria-label="Upload BAPLIE"
                className="absolute inset-0 z-10 cursor-pointer opacity-0"
                onChange={(e) => {
                  if (e.target.files?.length) void onFiles(e.target.files);
                  e.target.value = "";
                }}
              />
            ) : null}
            <span className="pointer-events-none text-sm font-medium">Drop BAPLIE · .edi / .txt</span>
            <span className="pointer-events-none text-xs text-muted">
              Compiles onto the DCM after both are loaded. Does not replace the manifest.
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const plan = parseBaplie(SAMPLE_BAPLIE, "sample-george-ii.edi");
                setBaplie(plan);
                saveBaplie(plan);
              }}
            >
              Example BAPLIE
            </Button>
            {baplie ? (
              <>
                <Badge variant="navy">
                  {baplie.boxes.length} boxes · {baplie.boxes.filter((b) => b.reefer).length} RF
                </Badge>
                <span className="text-xs text-muted">
                  {[baplie.vessel, baplie.voyage, baplie.sourceName].filter(Boolean).join(" · ")}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                  onClick={() => {
                    setBaplie(null);
                    saveBaplie(null);
                  }}
                >
                  <Eraser />
                  Clear BAPLIE
                </Button>
              </>
            ) : null}
          </div>
          {baplie?.warnings.length ? (
            <p className="text-xs text-review">{baplie.warnings.join(" ")}</p>
          ) : null}
          {baplie ? <BaplieSummary plan={baplie} /> : null}
        </div>
      </section>

      {result && parsed ? (
        <>
          <VoyageBanner parsed={parsed} lqCount={lqCount} fullCount={fullCount} />
          {compare ? <CompareCard compare={compare} /> : null}
          <Stats result={result} />
          <CategoryCheck result={result} />
          <EmailCard result={result} voyage={parsed.voyage} sourceName={parsed.sourceName} />

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
            <section className="min-w-0 rounded-xl bg-surface shadow-[var(--shadow-border)]">
              <div className="flex flex-col gap-3 border-b border-border px-4 py-3 sm:px-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-sm font-medium">Line-by-line determination</h2>
                  <div className="flex flex-wrap gap-1">
                    {(
                      [
                        ["flagged", `Flagged ${flaggedCount}`],
                        ["all", `All ${result.total}`],
                        ["full", `Full DG ${fullCount}`],
                        ["lq", `Ltd Qty ${lqCount}`],
                        ["CDC", `CDC ${result.cdc + result.residue}`],
                        ["REVIEW", `Review ${result.review}`],
                        ["NOT_CDC", `Not CDC ${result.notCdc}`],
                      ] as const
                    ).map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setFilter(id)}
                        className={cn(
                          "h-9 rounded-full px-3 text-xs font-medium transition-colors duration-150",
                          filter === id ? "bg-navy text-primary-foreground" : "bg-surface-2 text-muted hover:text-fg",
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                {filter === "all" || filter === "full" || filter === "lq" || query || flaggedCount > 0 ? (
                  <div className="relative">
                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search UN, name, container, booking…"
                      className="h-10 pl-9"
                      aria-label="Search cargo lines"
                    />
                  </div>
                ) : null}
              </div>
              <ResultsTable
                rows={filtered}
                filter={filter}
                query={query}
                flaggedCount={flaggedCount}
                total={result.total}
                onShowAll={() => setFilter("all")}
              />
            </section>

            <aside className="flex flex-col gap-4">
              {result.notes.length > 0 ? (
                <section className="rounded-xl bg-surface p-4 text-sm text-muted shadow-[var(--shadow-border)]">
                  <p className="text-xs font-medium tracking-wide text-fg uppercase">Vessel totals</p>
                  <ul className="mt-2 space-y-1">
                    {result.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  downloadText("cdc-screening.csv", resultsCsv(result), "text/csv")
                }
              >
                <Download />
                Download full results
              </Button>
              <p className="px-1 text-xs leading-relaxed text-subtle">{DISCLAIMER}</p>
            </aside>
          </div>
        </>
      ) : restored ? (
        <RestoredEmail
          entry={restored}
          onDismiss={() => setRestored(null)}
        />
      ) : (
        <EmptyHint log={log} onRestore={setRestored} />
      )}
    </div>
  );
}

function VoyageBanner({
  parsed,
  lqCount,
  fullCount,
}: {
  parsed: ParseResult;
  lqCount: number;
  fullCount: number;
}) {
  const v = parsed.voyage;
  const bits = [
    v.vessel,
    v.voyage,
    v.pol && v.pod ? `${v.pol} → ${v.pod}` : v.pol || v.pod,
    parsed.sourceName,
    `${parsed.lines.length} DG lines`,
    fullCount ? `${fullCount} full DG` : null,
    lqCount ? `${lqCount} Ltd Qty` : "",
  ].filter((b) => b);
  if (bits.length === 0) return null;
  return (
    <section className="rounded-xl bg-navy px-4 py-3 text-primary-foreground sm:px-5">
      <p className="font-mono text-[11px] tracking-[0.16em] text-primary-foreground/60 uppercase">
        Voyage
      </p>
      <p className="mt-1 text-sm font-medium">{bits.join("  ·  ")}</p>
    </section>
  );
}

function CategoryCheck({ result }: { result: EvalResult }) {
  const items = useMemo(() => categoryScan(result), [result]);
  const cdcN = items.filter((i) => i.tone === "cdc").length;
  const watchN = items.filter((i) => i.tone === "watch").length;
  return (
    <section className="rounded-xl bg-surface shadow-[var(--shadow-border)]" data-testid="category-check">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
        <div>
          <h2 className="text-base font-medium">
            {cdcN > 0 ? "Why CDC is YES" : "Why CDC is NO"}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Nine families in 33 CFR 160.202. Clear means not on this voyage.
            Watch means it was on board but did not meet the CDC threshold.
          </p>
        </div>
        <p className="font-mono text-[11px] tracking-wide text-muted uppercase">
          {cdcN} CDC · {watchN} watch · {9 - cdcN - watchN} clear
        </p>
      </div>
      <ul className="divide-y divide-border">
        {items.map((item) => (
          <ScanRow key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}

function ScanRow({ item }: { item: ScanItem }) {
  return (
    <li className="flex items-start gap-3 px-4 py-2.5 sm:px-5">
      <span
        className={cn(
          "mt-1.5 size-2.5 shrink-0 rounded-full",
          item.tone === "clear" && "bg-ok",
          item.tone === "watch" && "bg-review",
          item.tone === "cdc" && "bg-cdc",
        )}
        aria-hidden
      />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <span className="text-sm font-medium">{item.label}</span>
        <span
          className={cn(
            "text-xs sm:text-right",
            item.tone === "clear" && "text-muted",
            item.tone === "watch" && "text-review",
            item.tone === "cdc" && "text-cdc",
          )}
        >
          {item.detail}
        </span>
      </div>
    </li>
  );
}

function CompareCard({ compare }: { compare: ManifestCompare }) {
  const a = kindLabel(compare.aKind);
  const b = kindLabel(compare.bKind);
  const pref = kindLabel(compare.preferredKind);
  const delta = Math.abs(compare.aLines - compare.bLines);
  return (
    <section
      data-testid="manifest-compare"
      className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-10 items-center justify-center rounded-md bg-navy text-primary-foreground">
          <GitCompare className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-medium">Excel vs printed manifest</h2>
          <p className="mt-1 text-sm text-muted">
            {a}: {compare.aLines} lines · {b}: {compare.bLines} lines
            {delta === 0 ? " — same count." : ` — off by ${delta}.`}
            {" "}CDC {compare.agreesCdc ? "agrees" : "does not agree"}. Using {pref} for the
            eNOAD block.
          </p>
          {compare.mismatches.length > 0 ? (
            <ul className="mt-3 space-y-1 font-mono text-xs text-muted">
              {compare.mismatches.slice(0, 8).map((m) => (
                <li key={m.un}>
                  UN {m.un} {m.name ? `· ${m.name}` : ""} — {a} {m.a} / {b} {m.b}
                </li>
              ))}
              {compare.mismatches.length > 8 ? (
                <li>+ {compare.mismatches.length - 8} more UN counts</li>
              ) : null}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-ok">UN counts match.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function EmailCard({
  result,
  voyage,
  sourceName,
}: {
  result: EvalResult;
  voyage: VoyageInfo;
  sourceName?: string;
}) {
  const mail = useMemo(
    () => masterEmail(result, voyage, sourceName),
    [result, voyage, sourceName],
  );
  const hasCdc = result.enoad.length > 0;
  return (
    <EmailPanel
      subject={mail.subject}
      body={mail.body}
      paste={mail.paste}
      mailto={mail.mailto}
      hasCdc={hasCdc}
      filename={emailFilename(voyage, hasCdc ? "YES" : "NO")}
      pasteLive={enoadPasteBlock(result)}
    />
  );
}

function RestoredEmail({
  entry,
  onDismiss,
}: {
  entry: VoyageLog;
  onDismiss: () => void;
}) {
  const mailto = `mailto:?subject=${encodeURIComponent(entry.subject)}&body=${encodeURIComponent(entry.body)}`;
  const when = new Date(entry.at).toLocaleString();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-navy px-4 py-3 text-primary-foreground sm:px-5">
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-primary-foreground/60 uppercase">
            Restored email · cargo lines not stored
          </p>
          <p className="mt-1 text-sm font-medium">
            {logLabel(entry)} · CDC {entry.flag} · {entry.total} lines · {when}
          </p>
        </div>
        <Button variant="navy" size="sm" onClick={onDismiss} className="border border-primary-foreground/20">
          Dismiss
        </Button>
      </div>
      <EmailPanel
        subject={entry.subject}
        body={entry.body}
        paste={entry.paste}
        mailto={mailto}
        hasCdc={entry.flag === "YES"}
        filename={emailFilename(
          { vessel: entry.vessel, voyage: entry.voyage },
          entry.flag,
        )}
      />
    </div>
  );
}

function EmailPanel({
  subject,
  body,
  paste,
  mailto,
  hasCdc,
  filename,
  pasteLive,
}: {
  subject: string;
  body: string;
  paste: string;
  mailto: string;
  hasCdc: boolean;
  filename: string;
  pasteLive?: string;
}) {
  const [copied, setCopied] = useState<"email" | "block" | null>(null);

  async function copy(kind: "email" | "block") {
    const text = kind === "email" ? `${subject}\n\n${body}` : paste;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1800);
  }

  return (
    <section className="rounded-xl bg-surface shadow-[var(--shadow-border)]">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "mt-0.5 flex size-10 items-center justify-center rounded-md",
              hasCdc ? "bg-cdc text-primary-foreground" : "bg-ok text-primary-foreground",
            )}
          >
            <Mail className="size-5" />
          </span>
          <div>
            <h2 className="text-base font-medium">Email to the Master — eNOAD cargo</h2>
            <p className="mt-1 max-w-xl text-sm text-muted">{ENOAD_BLURB}</p>
          </div>
        </div>
        <Badge variant={hasCdc ? "cdc" : "ok"}>{hasCdc ? "CDC CARRIED: YES" : "CDC CARRIED: NO"}</Badge>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">Subject</p>
          <p className="mt-1 font-medium">{subject}</p>
          <pre className="mt-3 max-h-[28rem] overflow-auto rounded-md bg-navy p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-primary-foreground">
            {body}
          </pre>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className={cn(
              "rounded-md px-3 py-3 font-mono text-sm whitespace-pre-wrap",
              hasCdc ? "bg-cdc-soft text-cdc" : "bg-ok-soft text-ok",
            )}
          >
            {pasteLive ?? paste}
          </div>
          <Button onClick={() => void copy("email")}>
            {copied === "email" ? <Check /> : <ClipboardCopy />}
            {copied === "email" ? "Copied email" : "Copy email to Master"}
          </Button>
          <Button variant="outline" asChild>
            <a href={mailto}>
              <Mail />
              Open in mail app
            </a>
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              downloadText(filename, emailFileContents(subject, body), "text/plain;charset=utf-8")
            }
          >
            <Download />
            Download email .txt
          </Button>
          <Button variant="outline" onClick={() => void copy("block")}>
            {copied === "block" ? <Check /> : <ClipboardCopy />}
            {copied === "block" ? "Copied block" : "Copy eNOAD block only"}
          </Button>
          <p className="text-xs leading-relaxed text-muted">
            Address it to the Master yourself — no recipient is filled in. Download
            the .txt if the ship PC blocks clipboard. The block-only button is just
            the eNOAD fields, with no review notes.
          </p>
        </div>
      </div>
    </section>
  );
}

function EmptyHint({
  log,
  onRestore,
}: {
  log: VoyageLog[];
  onRestore: (e: VoyageLog) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-dashed border-border bg-surface/60 px-5 py-10 text-center">
        <Shield className="mx-auto size-6 text-accent" strokeWidth={1.5} />
        <h2 className="mt-3 text-base font-medium">No manifest screened yet</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Drop this voyage’s Excel DCM, Word FINAL DCM, and printed PDF (any mix).
          Excel has the hatch stowage. You still get the Master-ready eNOAD CDC block.
        </p>
      </div>
      {log.length > 0 ? (
        <section className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
          <div className="flex items-center gap-2">
            <History className="size-4 text-accent" />
            <h2 className="text-sm font-medium">Recent voyages</h2>
          </div>
          <p className="mt-1 text-xs text-muted">
            Email is kept here. The last voyage’s cargo lines stay on this computer
            for the hatch plan.
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {log.map((e) => (
              <li key={`${e.at}-${e.vessel}-${e.voyage}-${e.sourceName}`}>
                <button
                  type="button"
                  onClick={() => onRestore(e)}
                  className="flex min-h-11 w-full items-center justify-between gap-3 rounded-md bg-surface-2 px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-border"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{logLabel(e)}</span>
                    <span className="block truncate text-xs text-muted">
                      {e.pol && e.pod ? `${e.pol} → ${e.pod} · ` : ""}
                      {e.total} lines · {e.sourceName || "manifest"}
                    </span>
                  </span>
                  <Badge variant={e.flag === "YES" ? "cdc" : "ok"}>CDC {e.flag}</Badge>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function Stats({ result }: { result: EvalResult }) {
  const items = [
    { label: "Rows evaluated", value: result.total, tone: "ink" as const },
    { label: "CDC to report", value: result.cdc, tone: "cdc" as const },
    { label: "Needs review", value: result.review, tone: "review" as const },
    { label: "Not CDC", value: result.notCdc, tone: "ok" as const },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="rounded-xl bg-surface px-4 py-4 shadow-[var(--shadow-border)]">
          <p className="text-xs tracking-wide text-muted uppercase">{s.label}</p>
          <p
            className={cn(
              "mt-1 font-mono text-2xl font-medium tabular-nums",
              s.tone === "cdc" && s.value > 0 && "text-cdc",
              s.tone === "review" && s.value > 0 && "text-review",
              s.tone === "ok" && "text-ok",
            )}
          >
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function ResultsTable({
  rows,
  filter,
  query,
  flaggedCount,
  total,
  onShowAll,
}: {
  rows: LineResult[];
  filter: Filter;
  query: string;
  flaggedCount: number;
  total: number;
  onShowAll: () => void;
}) {
  if (rows.length === 0) {
    const nothingFlagged = filter === "flagged" && flaggedCount === 0 && !query;
    return (
      <div className="px-5 py-10 text-center">
        <p className="text-sm text-muted">
          {nothingFlagged
            ? "Nothing to flag. No CDC, and no rows that need a Master decision."
            : query
              ? `No lines match “${query}”.`
              : "No rows in this filter."}
        </p>
        {nothingFlagged ? (
          <Button variant="outline" size="sm" className="mt-4" onClick={onShowAll}>
            Show all {total} lines
          </Button>
        ) : null}
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs tracking-wide text-muted uppercase">
            <th className="px-4 py-3 font-medium sm:px-5">UN</th>
            <th className="px-3 py-3 font-medium">Name / class</th>
            <th className="px-3 py-3 font-medium">Packaging</th>
            <th className="px-3 py-3 font-medium">Qty</th>
            <th className="px-3 py-3 font-medium">Verdict</th>
            <th className="px-4 py-3 font-medium sm:px-5">Basis</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={`${row.input.rowIndex}-${row.un}-${row.input.container ?? ""}`}
              className={cn(
                "border-b border-border align-top last:border-0",
                row.verdict === "CDC" && "border-l-[3px] border-l-cdc",
                row.verdict === "REVIEW" && "border-l-[3px] border-l-review",
                row.verdict === "NOT_CDC" && "border-l-[3px] border-l-transparent",
                row.verdict === "CDC_RESIDUE" && "border-l-[3px] border-l-residue",
              )}
            >
              <td className="px-4 py-3 font-mono text-xs tabular-nums sm:px-5">{row.un}</td>
              <td className="px-3 py-3">
                <p className="font-medium">{row.name}</p>
                <p className="mt-0.5 font-mono text-xs text-muted">
                  Class {row.hazClass || "—"}
                  {row.input.subsidiary ? ` (${row.input.subsidiary})` : ""}
                  {row.pih ? " · PIH" : ""}
                  {isLimitedQty(row) ? " · Ltd qty" : ""}
                  {row.input.container ? ` · ${row.input.container}` : ""}
                </p>
              </td>
              <td className="px-3 py-3 text-xs">
                <p>{row.packaging || "—"}</p>
                <p className="mt-0.5 text-muted">{packFormLabel(row.packForm)}</p>
              </td>
              <td className="px-3 py-3 font-mono text-xs tabular-nums">
                {formatKg(row.quantityKg)}
                {row.input.quantityRaw ? (
                  <span className="mt-0.5 block text-muted">{row.input.quantityRaw}</span>
                ) : null}
              </td>
              <td className="px-3 py-3">
                <VerdictBadge verdict={row.verdict} />
              </td>
              <td className="px-4 py-3 text-xs leading-relaxed text-muted sm:px-5">
                <p>{row.reasons[0]}</p>
                {row.needs.length > 0 ? (
                  <p className="mt-1 text-review">Need: {row.needs.join(" ")}</p>
                ) : null}
                {row.paragraphs.length > 0 ? (
                  <p className="mt-1 font-mono text-[11px] text-subtle">{row.paragraphs.join(" · ")}</p>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LookupPanel() {
  const [un, setUn] = useState("2810");
  const [cls, setCls] = useState("");
  const [pkg, setPkg] = useState("1 CN");
  const [qty, setQty] = useState("5.5");
  const [row, setRow] = useState<LineResult | null>(null);

  function screen() {
    const padded = un.replace(/\D/g, "").padStart(4, "0");
    const entry = lookupUn(padded);
    const n = Number(qty.replace(/,/g, ""));
    const kg = Number.isFinite(n) && qty.trim() ? n * 0.45359237 : null;
    setRow(
      evaluateSingle({
        un: padded,
        name: entry?.name,
        hazClass: cls || entry?.cls,
        packaging: pkg,
        quantityKg: kg,
        carriageMode: "containerized",
      }),
    );
  }

  const hint = lookupUn(un.replace(/\D/g, "").padStart(4, "0"));

  return (
    <div className="mx-auto grid max-w-3xl gap-6">
      <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <h2 className="text-base font-medium">Single UN check</h2>
        <p className="mt-1 text-sm text-muted">
          Container-ship packaging. Quantity is pounds, same as the DCM.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Field label="UN / NA number">
            <Input value={un} onChange={(e) => setUn(e.target.value)} className="font-mono" />
            {hint ? (
              <p className="mt-1 text-xs text-muted">
                {hint.name} · Class {hint.cls}
                {hint.zone ? ` · PIH Zone ${hint.zone}` : ""}
              </p>
            ) : (
              <p className="mt-1 text-xs text-subtle">Not in the local catalog — class rules still apply.</p>
            )}
          </Field>
          <Field label="Hazard class (optional override)">
            <Input value={cls} onChange={(e) => setCls(e.target.value)} placeholder={hint?.cls || "6.1"} />
          </Field>
          <Field label="Packaging (CN / CY / BX / TANK)">
            <Input value={pkg} onChange={(e) => setPkg(e.target.value)} />
          </Field>
          <Field label="Net quantity (lb)">
            <Input value={qty} onChange={(e) => setQty(e.target.value)} inputMode="decimal" />
          </Field>
        </div>
        <Button className="mt-5" onClick={screen}>
          <Search />
          Evaluate
        </Button>
      </section>

      {row ? (
        <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
          <div className="flex flex-wrap items-center gap-2">
            <VerdictBadge verdict={row.verdict} />
            <LegacyBadge verdict={row.legacy} />
          </div>
          <h3 className="mt-4 text-lg font-medium">{row.name}</h3>
          <p className="mt-1 font-mono text-xs text-muted">
            UN {row.un} · Class {row.hazClass || "—"} · {packFormLabel(row.packForm)} ·{" "}
            {formatKg(row.quantityKg)}
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed">
            {row.reasons.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          {row.needs.length > 0 ? (
            <p className="mt-3 text-sm text-review">Need: {row.needs.join(" ")}</p>
          ) : null}
        </section>
      ) : null}

      {row ? <LookupSheet un={row.un} cls={row.hazClass} name={row.name} /> : null}
    </div>
  );
}

function LookupSheet({ un, cls, name }: { un: string; cls: string; name: string }) {
  const sheet = sheetFor(un, cls, name);
  const sections = sheetSections(sheet);
  return (
    <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
      <p className="font-mono text-[11px] tracking-wide text-accent uppercase">
        {sheet.guide} · Class {sheet.cls}
      </p>
      <h2 className="mt-2 text-base font-medium">What can go wrong — UN {sheet.un}</h2>
      <p className="mt-1 text-sm text-muted">{sheet.looksLike}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {sections.map((s) => (
          <article key={s.title}>
            <h3 className="text-sm font-medium">{s.title}</h3>
            <ul className="mt-1 space-y-1 text-sm text-muted">
              {s.items.map((t) => (
                <li key={t}>— {t}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function RulesPanel() {
  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <h2 className="text-base font-medium">What counts as Certain Dangerous Cargo</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
          33 CFR 160.202 lists nine categories. This screener is locked to container
          ships: portable tanks and cartons are packaging, not ship’s tanks, so
          paragraphs (7), (8) and (9) will not fire. The usual hits on a boxship
          are 1.1/1.2 explosives, 2.3 over 1 MT, PIH 6.1 in a tank or over 20 MT,
          and bagged ammonium nitrate that needs a 176.415 permit.
        </p>
      </section>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {RULE_CARDS.map((card) => (
          <article key={card.id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-[11px] tracking-wide text-accent uppercase">{card.paragraph}</p>
            <h3 className="mt-2 text-sm font-medium">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{card.summary}</p>
            <p className="mt-3 text-xs font-medium text-fg">Threshold: {card.threshold}</p>
            <p className="mt-2 text-xs leading-relaxed text-review">{card.commonMiss}</p>
          </article>
        ))}
      </div>
      <p className="text-xs leading-relaxed text-subtle">{DISCLAIMER}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium tracking-wide text-muted">{label}</span>
      {children}
    </div>
  );
}
