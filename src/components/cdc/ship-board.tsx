import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, TriangleAlert, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sheetFor, sheetSections, type ErgSheet } from "@/lib/erg/guides.ts";
import { HATCHES, SHIP_NOTES, VESSEL, deckRowsFor, holdRowsFor, deckTiersFor, holdTiersFor, occupiedBays } from "@/lib/ship/george-ii.ts";
import {
  hatchBuckets,
  unstowed,
  type ContainerSlot,
  type HatchBucket,
} from "@/lib/ship/layout.ts";
import {
  issuesForKey,
  screenVoyage,
  worstSeverity,
  type StowIssue,
  type VoyageScreen,
} from "@/lib/ship/segregation.ts";
import { containerKey, formatStow } from "@/lib/ship/stow.ts";
import { formatKg } from "@/lib/cdc/quantity.ts";
import { isLimitedQty } from "@/lib/cdc/limited.ts";
import { ghostSlots, hatchSlots, unplacedBoxes } from "@/lib/baplie/overlay.ts";
import { countBoxes, countDangerous, countReefers, motorsNote, reeferHeatIssues } from "@/lib/baplie/heat.ts";
import type { BapliePlan } from "@/lib/baplie/types.ts";
import type { EvalResult, LineResult, ParseResult } from "@/lib/cdc/types.ts";
import { cn } from "@/lib/utils";

function slotLookupKey(key: string): string {
  return key.split("#")[0];
}

function countLabel(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`;
}

function slotIsDg(s: ContainerSlot): boolean {
  if (s.lines.length > 0) return true;
  return Boolean(s.box?.dg.length);
}

function slotCargoClass(s: ContainerSlot): string {
  const dg = slotIsDg(s);
  const rf = Boolean(s.reefer);
  if (rf && dg) return "slot-cargo-reefer-dg";
  if (rf && s.operating) return "slot-cargo-reefer";
  if (rf) return "slot-cargo-nor";
  if (dg) return "slot-cargo-dg";
  return "slot-cargo-dry";
}

export function ShipBoard({
  parsed,
  result,
  baplie,
}: {
  parsed: ParseResult | null;
  result: EvalResult | null;
  baplie: BapliePlan | null;
}) {
  const [hatchId, setHatchId] = useState<number | null>(null);
  const [slotKey, setSlotKey] = useState<string | null>(null);
  const [chem, setChem] = useState<{ un: string; cls: string; name: string } | null>(null);

  const lines = result?.lines ?? [];
  const lqOf = (line: LineResult) => isLimitedQty(line);
  const buckets = useMemo(() => hatchBuckets(lines, baplie), [lines, baplie]);
  const screen = useMemo(() => screenVoyage(lines, baplie), [lines, baplie]);
  const heat = useMemo(() => reeferHeatIssues(lines, baplie), [lines, baplie]);
  const loose = useMemo(() => unstowed(lines, baplie), [lines, baplie]);
  const unplaced = useMemo(() => unplacedBoxes(baplie), [baplie]);
  const active = buckets.find((b) => b.spec.id === hatchId) ?? null;
  const slots = active ? hatchSlots(active, baplie) : [];
  const slot = slots.find((s) => s.key === slotKey) ?? null;
  const totalRf = countReefers(baplie);
  const totalDg = countDangerous(lines, baplie);
  const totalBoxes = countBoxes(baplie);
  const voyageName =
    parsed?.voyage.voyage
      ? `${parsed.voyage.vessel || VESSEL.name} ${parsed.voyage.voyage}`
      : baplie?.voyage
        ? `${baplie.vessel || VESSEL.name} ${baplie.voyage}`
        : VESSEL.name;

  useEffect(() => {
    if (!slotKey) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (chem) setChem(null);
        else setSlotKey(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slotKey, chem]);

  if (active) {
    return (
      <>
        <HatchView
          bucket={active}
          slots={slots}
          issues={[...(screen.byHatch.get(active.spec.id) ?? []), ...heat.filter((i) => i.hatch === active.spec.id)]}
          baplie={baplie}
          onBack={() => {
            setHatchId(null);
            setSlotKey(null);
            setChem(null);
          }}
          onSlot={(k) => {
            setChem(null);
            setSlotKey(k);
          }}
        />
        {slot ? (
          <ContainerPopout
            slot={slot}
            hatch={active}
            issues={[
              ...issuesForKey(screen, slotLookupKey(slot.key)),
              ...heat.filter((i) =>
                i.containers.some((c) => containerKey(c) === containerKey(slotLookupKey(slot.key))),
              ),
            ]}
            chem={chem}
            onClose={() => {
              setSlotKey(null);
              setChem(null);
            }}
            onChem={setChem}
            onBackFromChem={() => setChem(null)}
          />
        ) : null}
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs tracking-[0.14em] text-subtle uppercase">
          {VESSEL.name} · {VESSEL.clazz} · ABS {VESSEL.abs}
        </p>
        <h2 className="mt-1 text-xl font-medium">
          {voyageName}{" "}
          — {baplie ? "bay plan" : "dangerous cargo by hatch"}
        </h2>
        <p className="mt-1 max-w-3xl text-sm text-muted">
          House and conning are forward. Hatches 1–12 run aft. The engine casing sits at Hatch 10;
          the LNG vent mast is part of the plant, not a cargo tank.
          {baplie
            ? " Reefers are blue. DG is red. A box that is both is split on the diagonal. Other cargo is plain."
            : " Drop a BAPLIE on Manifest when you want reefers and the rest of the boxes. DCM-only still works."}
        </p>
        {baplie ? (
          <p className="mt-3 font-mono text-sm text-ink">
            {countLabel(totalBoxes, "box", "boxes")} · {countLabel(totalRf, "reefer", "reefers")} · {totalDg} DG
            {unplaced.length ? ` · ${unplaced.length} unplaced` : ""}
          </p>
        ) : totalDg > 0 ? (
          <p className="mt-3 font-mono text-sm text-ink">{totalDg} DG containers</p>
        ) : null}
      </div>

      <Profile buckets={buckets} screen={screen} baplie={baplie} lines={lines} onHatch={setHatchId} />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {buckets.map((b) => {
          const issues = screen.byHatch.get(b.spec.id) ?? [];
          const worst = worstSeverity(issues);
          const nBoxes = baplie ? countBoxes(baplie, b.spec.id) : 0;
          const nRf = baplie ? countReefers(baplie, b.spec.id) : 0;
          const nDg = countDangerous(lines, baplie, b.spec.id);
          return (
          <button
            key={b.spec.id}
            type="button"
            onClick={() => setHatchId(b.spec.id)}
            className={cn(
              "rounded-lg border bg-surface p-4 text-left shadow-border transition-colors duration-150",
              worst === "block"
                ? "border-cdc"
                : worst === "seg"
                  ? "border-review"
                  : b.lines.length > 0 || nBoxes > 0
                    ? "border-accent/40 hover:border-accent"
                    : "hover:border-navy/30",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium">Hatch {b.spec.id}</p>
                <p className="text-xs text-muted">
                  {b.spec.hold || "On deck"} · Bays {b.spec.bays.join("-")}
                  {b.spec.holdAccess === "tunnel" ? " · tunnel" : b.spec.holdAccess === "deck" ? " · deck access" : ""}
                </p>
              </div>
              {nBoxes > 0 ? (
                <Badge variant="navy">
                  {countLabel(nBoxes, "box", "boxes")}
                  {nDg ? ` · ${nDg} DG` : ""}
                </Badge>
              ) : nDg > 0 ? (
                <Badge variant="navy">{nDg} DG</Badge>
              ) : (
                <span className="text-xs text-subtle">No DG</span>
              )}
            </div>
            <p className="mt-2 text-xs text-muted">
              {b.spec.imdgOnDeck ? "On-deck IMDG OK" : "No IMDG on this cover"}
              {b.spec.imdgHold ? " · Hold 2 IMDG" : ""}
            </p>
            {b.classes.length > 0 && (
              <p className="mt-1 font-mono text-xs text-ink">Class {b.classes.join(", ")}</p>
            )}
            {b.lines.some((d) => lqOf(d.line)) && (
              <p className="mt-1 text-xs text-muted">
                {b.lines.filter((d) => lqOf(d.line)).length} Ltd Qty ·{" "}
                {b.lines.filter((d) => !lqOf(d.line)).length} full DG
              </p>
            )}
            {nRf > 0 && <p className="mt-1 text-xs text-ink">{countLabel(nRf, "reefer", "reefers")}</p>}
            {b.cdc > 0 && <p className="mt-1 text-xs text-cdc">{b.cdc} CDC</p>}
          </button>
          );
        })}
      </div>

      {loose.length > 0 && (
        <div className="rounded-lg border border-review/30 bg-review-soft p-4 text-sm">
          <p className="font-medium">{loose.length} DG lines have no stowage position</p>
          <p className="mt-1 text-muted">
            Drop the Excel DCM if you have it — Stow Loc is on that sheet. The printed
            manifest still screens for CDC.
          </p>
        </div>
      )}

      {unplaced.length > 0 && (
        <div className="rounded-lg border border-review/30 bg-review-soft p-4 text-sm">
          <p className="font-medium">{unplaced.length} BAPLIE boxes have no hatch on this ship</p>
          <p className="mt-1 text-muted">
            Unknown bays stay unplaced. They still count in the reefer and DG totals above.
          </p>
        </div>
      )}

      <IssueBanner screen={screen} extra={heat} onHatch={setHatchId} />

      <ul className="space-y-1 text-sm text-muted">
        {SHIP_NOTES.map((n) => (
          <li key={n}>— {n}</li>
        ))}
      </ul>
    </div>
  );
}

function IssueBanner({
  screen,
  extra,
  onHatch,
}: {
  screen: VoyageScreen;
  extra: StowIssue[];
  onHatch: (id: number) => void;
}) {
  const all = [...screen.issues, ...extra];
  const rank: Record<StowIssue["severity"], number> = { block: 0, seg: 1, watch: 2 };
  const listed = [...all].sort((a, b) => rank[a.severity] - rank[b.severity] || a.hatch - b.hatch);
  if (!all.length) {
    return (
      <div className="rounded-lg border border-ok/30 bg-ok-soft p-4 text-sm text-ok">
        No CSM location block and no 176.83 segregation hits on the positions we could read.
        Limited quantities (IMDG 3.4) are not segregated and are not under the hatch DoC — same as CargoMax.
        Full DG is still checked against CSM 1.6 and 176.83. A UN is not segregated from its own subsidiary.
      </div>
    );
  }
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        screen.blocks ? "border-cdc/40 bg-cdc-soft" : "border-review/40 bg-review-soft",
      )}
    >
      <p className="font-medium text-ink">What is wrong</p>
      <p className="mt-1 text-sm text-muted">
        {screen.blocks ? `${screen.blocks} should not be in that space` : "Spaces look allowed"}
        {screen.segs + extra.filter((i) => i.severity === "seg").length
          ? ` · ${screen.segs + extra.filter((i) => i.severity === "seg").length} too close / heat`
          : ""}
        {screen.watches + extra.filter((i) => i.severity === "watch").length
          ? ` · ${screen.watches + extra.filter((i) => i.severity === "watch").length} caution`
          : ""}
      </p>
      <ul className="mt-3 space-y-2">
        {listed.slice(0, 12).map((issue) => (
          <li key={issue.id}>
            <button type="button" onClick={() => issue.hatch && onHatch(issue.hatch)} className="text-left">
              <p className="text-sm font-medium text-ink">{issue.title}</p>
              <p className="text-xs text-muted">{issue.detail}</p>
            </button>
          </li>
        ))}
      </ul>
      {listed.length > 12 && (
        <p className="mt-2 text-xs text-muted">+ {listed.length - 12} more — open the hatch.</p>
      )}
    </div>
  );
}

function IssueList({ issues }: { issues: StowIssue[] }) {
  if (!issues.length) return null;
  return (
    <ul className="space-y-2">
      {issues.map((issue) => (
        <li
          key={issue.id}
          className={cn(
            "rounded-lg border p-3",
            issue.severity === "block"
              ? "border-cdc/40 bg-cdc-soft"
              : issue.severity === "seg"
                ? "border-review/40 bg-review-soft"
                : "border-accent/30 bg-residue-soft",
          )}
        >
          <p className="text-sm font-medium text-ink">{issue.title}</p>
          <p className="mt-1 text-sm text-muted">{issue.detail}</p>
        </li>
      ))}
    </ul>
  );
}

function Profile({
  buckets,
  screen,
  baplie,
  lines,
  onHatch,
}: {
  buckets: HatchBucket[];
  screen: VoyageScreen;
  baplie: BapliePlan | null;
  lines: LineResult[];
  onHatch: (id: number) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-navy p-4 text-primary-foreground shadow-border">
      <svg viewBox="0 0 1120 260" className="h-auto w-full min-w-[720px]" role="img" aria-label="GEORGE II profile, bow to the left">
        <title>M/V GEORGE II · bow left · house forward · hatches 1–12 aft</title>
        <defs>
          <linearGradient id="hatch-reefer-dg" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-reefer)" />
            <stop offset="49%" stopColor="var(--color-reefer)" />
            <stop offset="51%" stopColor="var(--color-dg-box)" />
            <stop offset="100%" stopColor="var(--color-dg-box)" />
          </linearGradient>
        </defs>
        <line x1="20" y1="200" x2="1100" y2="200" stroke="currentColor" strokeOpacity="0.25" />
        <path
          d="M70 200 L110 128 L180 118 L980 118 L1040 138 L1088 200 Z"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeOpacity="0.45"
        />
        <path d="M70 200 L96 92 L118 118" fill="none" stroke="currentColor" strokeOpacity="0.5" />
        <rect x="118" y="48" width="86" height="70" rx="2" fill="currentColor" fillOpacity="0.28" />
        <rect x="126" y="58" width="18" height="12" fill="currentColor" fillOpacity="0.5" />
        <rect x="150" y="58" width="18" height="12" fill="currentColor" fillOpacity="0.5" />
        <rect x="174" y="58" width="18" height="12" fill="currentColor" fillOpacity="0.5" />
        <text x="161" y="40" textAnchor="middle" fill="currentColor" fontSize="11">
          HOUSE
        </text>
        <line x1="161" y1="48" x2="161" y2="18" stroke="currentColor" strokeWidth="2" />
        <line x1="161" y1="22" x2="178" y2="34" stroke="currentColor" />
        <text x="161" y="14" textAnchor="middle" fill="currentColor" fontSize="9">
          FWD MAST
        </text>
        {HATCHES.map((h, i) => {
          const x = 218 + i * 68;
          const b = buckets[i];
          const nBoxes = baplie ? countBoxes(baplie, h.id) : 0;
          const hot = b.lines.length > 0 || nBoxes > 0;
          const w = h.id === 10 ? 44 : 58;
          const worst = worstSeverity(screen.byHatch.get(h.id) ?? []);
          const rf = baplie ? countReefers(baplie, h.id) : 0;
          const dg = countDangerous(lines, baplie, h.id);
          const fill =
            dg && rf
              ? "url(#hatch-reefer-dg)"
              : dg
                ? "var(--color-dg-box)"
                : rf
                  ? "var(--color-reefer)"
                  : nBoxes
                    ? "var(--color-navy-2)"
                    : "currentColor";
          return (
            <g key={h.id}>
              <rect
                x={x}
                y={86}
                width={w}
                height={32}
                rx="2"
                fill={fill}
                fillOpacity={hot || rf || dg ? 0.95 : 0.2}
                stroke="currentColor"
                strokeOpacity="0.6"
                className="cursor-pointer"
                onClick={() => onHatch(h.id)}
              />
              <text
                x={x + w / 2}
                y={107}
                textAnchor="middle"
                fill={hot || rf || dg ? "var(--color-primary-foreground)" : "currentColor"}
                fontSize="12"
                fontWeight={600}
                className="cursor-pointer"
                onClick={() => onHatch(h.id)}
              >
                {h.id}
              </text>
              {worst === "block" && (
                <text x={x + w / 2} y={80} textAnchor="middle" fill="var(--color-cdc)" fontSize="10">
                  !
                </text>
              )}
            </g>
          );
        })}
        <rect x="818" y="54" width="36" height="64" fill="currentColor" fillOpacity="0.4" />
        <text x="836" y="48" textAnchor="middle" fill="currentColor" fontSize="9">
          CASING
        </text>
        <rect x="980" y="62" width="22" height="56" fill="currentColor" fillOpacity="0.45" />
        <line x1="1016" y1="118" x2="1016" y2="28" stroke="currentColor" strokeWidth="2" />
        <text x="1016" y="22" textAnchor="middle" fill="currentColor" fontSize="9">
          LNG VENT
        </text>
        <text x="70" y="222" fill="currentColor" fontSize="11">
          BOW
        </text>
        <text x="1040" y="222" textAnchor="end" fill="currentColor" fontSize="11">
          STERN
        </text>
        <text x="560" y="248" textAnchor="middle" fill="currentColor" fontSize="11" fillOpacity="0.7">
          Aft of the house: H1–2 Hold 1 · H3–4 Hold 2 IMDG · H9 Hold 5 engine · H10 casing · H11 on-deck IMDG · H12 Hold 7 / FPR
        </text>
      </svg>
    </div>
  );
}

function HatchView({
  bucket,
  slots,
  issues,
  baplie,
  onBack,
  onSlot,
}: {
  bucket: HatchBucket;
  slots: ContainerSlot[];
  issues: StowIssue[];
  baplie: BapliePlan | null;
  onBack: () => void;
  onSlot: (key: string) => void;
}) {
  const drawn = slots.filter((s) => !s.ghost);
  const ghosts = ghostSlots(slots, bucket.spec);
  const deckTiers = deckTiersFor(
    bucket.spec,
    drawn.filter((s) => s.stow?.onDeck).map((s) => s.stow!.tier),
  );
  const holdTiers = holdTiersFor(bucket.spec);
  const deckRowList = deckRowsFor(bucket.spec);
  const holdRowList = holdRowsFor(bucket.spec);

  function cells(tier: number, row: number, bay: number) {
    return drawn.filter((s) => {
      if (!s.stow || s.stow.tier !== tier || s.stow.row !== row) return false;
      return occupiedBays(s.stow, bucket.spec).includes(bay);
    });
  }

  return (
    <div className="space-y-5">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-sm text-accent">
        <ArrowLeft className="size-4" /> Ship profile
      </button>
      <div>
        <h2 className="text-xl font-medium">
          Hatch {bucket.spec.id}
          {bucket.spec.hold ? ` · ${bucket.spec.hold}` : ""}
        </h2>
        <p className="mt-1 text-sm text-muted">
          Section looking forward from aft — port is to the left (even cells), 00 is
          centerline, starboard is odd. Each cell is three bays: {bucket.spec.bays[0]} (20' fwd) ·{" "}
          {bucket.spec.bay40} (40') · {bucket.spec.bays[2]} (20' aft). Press a box for the cargo list.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        {baplie && (
          <Badge variant="navy">
            {countLabel(countBoxes(baplie, bucket.spec.id), "box", "boxes")} · {countReefers(baplie, bucket.spec.id)} RF ·{" "}
            {drawn.filter(slotIsDg).length} DG
          </Badge>
        )}
        {!baplie && <Badge variant="navy">{bucket.lines.length} DG lines</Badge>}
        {bucket.spec.imdgOnDeck ? <Badge>On-deck IMDG OK</Badge> : <Badge variant="navy">No IMDG on cover</Badge>}
        {bucket.spec.imdgHold && <Badge>Hold 2 IMDG</Badge>}
      </div>
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="slot-cargo-reefer size-3 rounded-sm" /> Reefer
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="slot-cargo-dg size-3 rounded-sm" /> DG
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="slot-cargo-reefer-dg size-3 rounded-sm" /> Reefer + DG
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="slot-cargo-dry size-3 rounded-sm ring-1 ring-border" /> Other cargo
        </span>
      </div>

      <BayGrid
        title={`On deck · bays ${bucket.spec.bays.join("-")} · 20'/40'/20'${bucket.spec.id === 1 ? " · 11 across with 00" : bucket.spec.id === 10 ? " · bay 38 no middle" : " · 12 across"}`}
        tiers={deckTiers}
        rows={deckRowList}
        bays={bucket.spec.bays}
        cells={cells}
        onSlot={onSlot}
      />
      {holdRowList.length > 0 && holdTiers.length > 0 && (
        <BayGrid
          title={`Below deck · ${bucket.spec.hold || "hold"} · ${bucket.spec.holdAccess} access · 7 across with 00 · 20'/40'/20'`}
          tiers={holdTiers}
          rows={holdRowList}
          bays={bucket.spec.bays}
          cells={cells}
          onSlot={onSlot}
        />
      )}

      {ghosts.length > 0 && (
        <div>
          <h3 className="text-sm font-medium">Not a real cell on this cover</h3>
          <p className="mt-1 text-xs text-muted">
            Hatch {bucket.spec.id} does not have these rows. They stay off the grid.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {ghosts.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => onSlot(s.key)}
                className="rounded-md border border-review/40 bg-review-soft px-3 py-2 font-mono text-xs"
              >
                {s.container}
                {s.stow ? ` · ${s.stow.bay}-${String(s.stow.row).padStart(2, "0")}-${s.stow.tier}` : ""}
              </button>
            ))}
          </div>
        </div>
      )}

      {slots.some((s) => !s.stow) && (
        <div>
          <h3 className="text-sm font-medium">On this hatch, position not parsed</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {slots
              .filter((s) => !s.stow)
              .map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => onSlot(s.key)}
                  className="rounded-md border bg-surface px-3 py-2 font-mono text-xs"
                >
                  {s.container}
                </button>
              ))}
          </div>
        </div>
      )}

      {issues.length > 0 && (
        <div>
          <h3 className="text-sm font-medium">What is wrong on this hatch</h3>
          <p className="mt-1 text-xs text-muted">Told here — the grid is cargo only (blue reefer, red DG).</p>
          <div className="mt-2">
            <IssueList issues={issues} />
          </div>
        </div>
      )}

      <ul className="space-y-1 text-sm text-muted">
        {bucket.spec.notes.map((w) => (
          <li key={w}>— {w}</li>
        ))}
      </ul>
    </div>
  );
}

function slotLabel(s: ContainerSlot): string {
  const cls =
    s.lines.map((l) => l.line.hazClass).filter(Boolean)[0] ||
    s.box?.dg.map((d) => d.cls).filter(Boolean)[0] ||
    "";
  if (s.reefer && slotIsDg(s)) return `${s.operating ? "RF" : "NOR"}/${cls || "DG"}`;
  if (slotIsDg(s)) return cls || "DG";
  if (s.reefer) {
    const face = s.box?.motors === "fwd" ? "fwd" : "aft";
    return `${s.operating ? "RF" : "NOR"} ${face}`;
  }
  if (s.stow?.fortyFoot) return s.box?.iso || "40'";
  return s.box?.iso || "20'";
}

function SlotButton({
  s,
  wide,
  home,
  onSlot,
}: {
  s: ContainerSlot;
  wide: boolean;
  home: boolean;
  onSlot: (key: string) => void;
}) {
  const span = !home && !!s.stow?.fortyFoot;
  const cargo = slotCargoClass(s);
  const light = cargo !== "slot-cargo-dry";
  return (
    <button
      type="button"
      onClick={() => onSlot(s.key)}
      title={span ? `${s.container} 40' occupies this 20' end` : s.container}
      className={cn(
        "flex min-h-14 w-full flex-col items-center justify-center rounded-sm px-0.5 font-mono text-[9px] leading-tight",
        wide ? "min-w-[2.4rem]" : "min-w-[1.6rem]",
        cargo,
        s.conflict || s.mismatch ? "ring-1 ring-review" : "",
        span ? "opacity-90" : "",
      )}
    >
      <span className="max-w-full truncate">{s.container.replace(/[A-Z]{4}/, (p) => p.slice(0, 4))}</span>
      <span className={light ? "text-primary-foreground/85" : "text-muted"}>
        {span ? "40'" : slotLabel(s)}
        {!span && s.stow?.fortyFoot ? " 40'" : ""}
        {s.conflict ? " !" : ""}
      </span>
    </button>
  );
}

function BayGrid({
  title,
  tiers,
  rows,
  bays,
  cells,
  onSlot,
}: {
  title: string;
  tiers: number[];
  rows: number[];
  bays: [number, number, number];
  cells: (tier: number, row: number, bay: number) => ContainerSlot[];
  onSlot: (key: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <p className="mb-2 text-xs font-medium tracking-wide text-subtle uppercase">
        {title} · PORT even ← · 00 CL · STBD odd →
      </p>
      <table className="w-full min-w-[720px] border-collapse text-center text-xs">
        <thead>
          <tr>
            <th className="p-1 text-muted">Tier</th>
            {rows.map((r) => (
              <th key={r} className="p-1 font-mono text-muted">
                {String(r).padStart(2, "0")}
                <div className="mt-0.5 grid grid-cols-[1fr_1.3fr_1fr] font-normal text-[9px] text-subtle">
                  <span>{bays[0]}</span>
                  <span>{bays[1]}</span>
                  <span>{bays[2]}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...tiers].reverse().map((tier) => (
            <tr key={tier}>
              <td className="p-1 font-mono text-muted">{String(tier).padStart(2, "0")}</td>
              {rows.map((row) => (
                <td key={row} className="p-0.5">
                  <div className="grid grid-cols-[1fr_1.3fr_1fr] gap-px">
                    {bays.map((bay, i) => {
                      const stack = cells(tier, row, bay);
                      const wide = i === 1;
                      if (!stack.length) {
                        return (
                          <div
                            key={bay}
                            className={cn("min-h-14 rounded-sm bg-surface-2/80", wide && "min-w-[2.4rem]")}
                          />
                        );
                      }
                      return (
                        <div key={bay} className="flex flex-col gap-px">
                          {stack.map((s) => (
                            <SlotButton
                              key={s.key}
                              s={s}
                              wide={wide}
                              home={s.stow?.bay === bay}
                              onSlot={onSlot}
                            />
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CargoLine({
  d,
  onChem,
  lq,
}: {
  d: { line: LineResult };
  onChem: (c: { un: string; cls: string; name: string }) => void;
  lq: boolean;
}) {
  return (
    <li className="rounded-lg border bg-surface p-4 shadow-border">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <button
          type="button"
          onClick={() => onChem({ un: d.line.un, cls: d.line.hazClass, name: d.line.name })}
          className="min-w-0 flex-1 text-left"
        >
          <p className="font-medium">
            UN {d.line.un} · {d.line.name || "Proper shipping name not parsed"}
            {lq ? " · Ltd Qty" : ""}
          </p>
          <p className="mt-1 text-sm text-muted">
            Class {d.line.hazClass || "—"}
            {d.line.input.packingGroup ? ` PG ${d.line.input.packingGroup}` : ""} ·{" "}
            {d.line.packaging || "package"} · {formatKg(d.line.quantityKg)}
          </p>
        </button>
        <button
          type="button"
          onClick={() => onChem({ un: d.line.un, cls: d.line.hazClass, name: d.line.name })}
          className="inline-flex h-10 items-center gap-2 rounded-md bg-navy px-3 text-sm text-primary-foreground"
        >
          <TriangleAlert className="size-4" /> Spill / fire
        </button>
      </div>
    </li>
  );
}

function ContainerPopout({
  slot,
  hatch,
  issues,
  chem,
  onClose,
  onChem,
  onBackFromChem,
}: {
  slot: ContainerSlot;
  hatch: HatchBucket;
  issues: StowIssue[];
  chem: { un: string; cls: string; name: string } | null;
  onClose: () => void;
  onChem: (c: { un: string; cls: string; name: string }) => void;
  onBackFromChem: () => void;
}) {
  const full = slot.lines.filter((d) => !isLimitedQty(d.line));
  const lq = slot.lines.filter((d) => isLimitedQty(d.line));
  const sheet = chem ? sheetFor(chem.un, chem.cls, chem.name) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex max-h-[88dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-lg border bg-surface shadow-border sm:rounded-lg"
      >
        <div className="flex items-start justify-between gap-3 border-b px-4 py-3">
          <div className="min-w-0">
            {sheet ? (
              <>
                <p className="font-mono text-xs text-subtle uppercase">
                  {sheet.guide} · Class {sheet.cls}
                  {sheet.un ? ` · UN ${sheet.un}` : ""}
                </p>
                <h2 className="mt-1 truncate text-lg font-medium">{sheet.name}</h2>
              </>
            ) : (
              <>
                <p className="font-mono text-xs text-subtle uppercase">Hatch {hatch.spec.id} · Container</p>
                <h2 className="mt-1 truncate font-mono text-lg">{slot.container}</h2>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-ink"
            aria-label="Close popout"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="overflow-y-auto px-4 py-4">
          {sheet ? (
            <div className="space-y-4">
              <button type="button" onClick={onBackFromChem} className="inline-flex items-center gap-2 text-sm text-accent">
                <ArrowLeft className="size-4" /> {slot.container}
              </button>
              <p className="text-sm text-muted">{sheet.looksLike}</p>
              {sheetSections(sheet).map((s) => (
                <SheetBlock key={s.title} title={s.title} items={s.items} />
              ))}
            </div>
          ) : (
            <ContainerBody slot={slot} issues={issues} full={full} lq={lq} onChem={onChem} />
          )}
        </div>
      </div>
    </div>
  );
}

function ContainerBody({
  slot,
  issues,
  full,
  lq,
  onChem,
}: {
  slot: ContainerSlot;
  issues: StowIssue[];
  full: { line: LineResult }[];
  lq: { line: LineResult }[];
  onChem: (c: { un: string; cls: string; name: string }) => void;
}) {
  return (
    <div className="space-y-4">
      {slot.stow && <p className="text-sm text-muted">{formatStow(slot.stow)}</p>}
      {slot.mismatch && (
        <p className="text-sm text-review">DCM and BAPLIE do not agree on this cell — pick one.</p>
      )}
      {slot.conflict && (
        <p className="text-sm text-cdc">Two boxes hash to this bay-row-tier.</p>
      )}
      {slot.reefer && slot.box ? (
        <p className="text-sm text-ink">
          Reefer {slot.box.iso || ""} {slot.operating ? `live ${slot.box.tempC ?? "set"}°C` : "NOR (not operating)"}. {motorsNote(slot.box)}
        </p>
      ) : null}
      {slot.box && !slot.reefer && (
        <p className="text-sm text-muted">
          {slot.box.iso || "Dry"} · {slot.box.weightKg ? `${Math.round(slot.box.weightKg)} kg` : "weight —"}
          {slot.box.pol ? ` · POL ${slot.box.pol}` : ""}
          {slot.box.pod ? ` · POD ${slot.box.pod}` : ""}
        </p>
      )}
      {issues.length ? <IssueList issues={issues} /> : null}
      {full.length > 0 && (
        <div>
          <h3 className="text-sm font-medium">Dangerous goods · {full.length}</h3>
          <p className="mt-1 text-xs text-muted">Press the chemical for the spill / fire sheet.</p>
          <ul className="mt-2 space-y-3">
            {full.map((d) => (
              <CargoLine key={d.line.input.rowIndex} d={d} onChem={onChem} lq={false} />
            ))}
          </ul>
        </div>
      )}
      {lq.length > 0 && (
        <div>
          <h3 className="text-sm font-medium">Limited quantity · {lq.length}</h3>
          <ul className="mt-2 space-y-3">
            {lq.map((d) => (
              <CargoLine key={d.line.input.rowIndex} d={d} onChem={onChem} lq />
            ))}
          </ul>
        </div>
      )}
      {!slot.lines.length && slot.box?.dg.length ? (
        <ul className="space-y-3">
          {slot.box.dg.map((dg, i) => (
            <li key={`${dg.un}-${i}`} className="rounded-lg border bg-surface p-4 shadow-border">
              <button
                type="button"
                disabled={!dg.un}
                onClick={() => dg.un && onChem({ un: dg.un, cls: dg.cls, name: dg.name })}
                className="text-left"
              >
                <p className="font-medium">
                  UN {dg.un || "—"} · {dg.name || "From BAPLIE DGS"}
                </p>
                <p className="mt-1 text-sm text-muted">
                  Class {dg.cls || "—"} {dg.packingGroup ? `PG ${dg.packingGroup}` : ""} · not on the DCM
                </p>
              </button>
              {dg.un ? (
                <button
                  type="button"
                  onClick={() => onChem({ un: dg.un, cls: dg.cls, name: dg.name })}
                  className="mt-2 inline-flex h-10 items-center gap-2 rounded-md bg-navy px-3 text-sm text-primary-foreground"
                >
                  <TriangleAlert className="size-4" /> Spill / fire
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
      {!slot.lines.length && !slot.box?.dg.length && slot.box && (
        <p className="text-sm text-muted">
          Other cargo from the BAPLIE. No dangerous goods on the DCM for this box.
        </p>
      )}
    </div>
  );
}

export function ChemicalView({ sheet, onBack }: { sheet: ErgSheet; onBack: () => void }) {
  const sections = sheetSections(sheet);
  return (
    <div className="space-y-5">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-sm text-accent">
        <ArrowLeft className="size-4" /> Back
      </button>
      <div>
        <p className="font-mono text-xs tracking-wide text-subtle uppercase">
          {sheet.guide} · Class {sheet.cls}
          {sheet.un ? ` · UN ${sheet.un}` : ""}
        </p>
        <h2 className="mt-1 text-xl font-medium">{sheet.name}</h2>
        <p className="mt-2 text-sm text-muted">{sheet.looksLike}</p>
      </div>
      {sections.map((s) => (
        <SheetBlock key={s.title} title={s.title} items={s.items} />
      ))}
      <p className="text-xs text-subtle">
        Public ERG actions for a container ship — fire, spill, explosion, vapor, wetting,
        hold entry, lost overboard, pollution. Confirm against the SDS, EmS, and the
        Master’s orders before you commit people.
      </p>
    </div>
  );
}

function SheetBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border bg-surface p-4 shadow-border">
      <h3 className="text-sm font-medium">{title}</h3>
      <ul className="mt-2 space-y-1.5 text-sm text-muted">
        {items.map((t) => (
          <li key={t}>— {t}</li>
        ))}
      </ul>
    </section>
  );
}

export function ResponseIndex({
  lines,
  onOpen,
}: {
  lines: LineResult[];
  onOpen: (c: { un: string; cls: string; name: string }) => void;
}) {
  const uns = useMemo(() => {
    const m = new Map<string, { un: string; cls: string; name: string; n: number }>();
    for (const l of lines) {
      const cur = m.get(l.un) ?? { un: l.un, cls: l.hazClass, name: l.name, n: 0 };
      cur.n += 1;
      if (!cur.name) cur.name = l.name;
      m.set(l.un, cur);
    }
    return [...m.values()].sort((a, b) => b.n - a.n);
  }, [lines]);

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {uns.map((u) => (
        <button
          key={u.un}
          type="button"
          onClick={() => onOpen(u)}
          className="rounded-lg border bg-surface p-4 text-left shadow-border hover:border-accent"
        >
          <p className="font-medium">
            UN {u.un} · {u.name || "Shipping name"}
          </p>
          <p className="mt-1 text-xs text-muted">
            Class {u.cls || "—"} · {u.n} line{u.n === 1 ? "" : "s"}
          </p>
        </button>
      ))}
    </div>
  );
}
