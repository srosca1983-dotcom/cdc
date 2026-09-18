import { useMemo, useState } from "react";
import { ArrowLeft, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sheetFor, type ErgSheet } from "@/lib/erg/guides.ts";
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
import { ghostSlots, hatchSlots } from "@/lib/baplie/overlay.ts";
import { countBoxes, countReefers, motorsNote, reeferHeatIssues } from "@/lib/baplie/heat.ts";
import type { BapliePlan } from "@/lib/baplie/types.ts";
import type { EvalResult, LineResult, ParseResult } from "@/lib/cdc/types.ts";
import { cn } from "@/lib/utils";

function slotLookupKey(key: string): string {
  return key.split("#")[0];
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
  const active = buckets.find((b) => b.spec.id === hatchId) ?? null;
  const slots = active ? hatchSlots(active, baplie) : [];
  const slot = slots.find((s) => s.key === slotKey) ?? null;
  const voyageName =
    parsed?.voyage.voyage
      ? `${parsed.voyage.vessel || VESSEL.name} ${parsed.voyage.voyage}`
      : baplie?.voyage
        ? `${baplie.vessel || VESSEL.name} ${baplie.voyage}`
        : VESSEL.name;

  if (chem) {
    const sheet = sheetFor(chem.un, chem.cls, chem.name);
    return <ChemicalView sheet={sheet} onBack={() => setChem(null)} />;
  }

  if (slot && active) {
    const k = slotLookupKey(slot.key);
    return (
      <ContainerView
        slot={slot}
        hatch={active}
        issues={[
          ...issuesForKey(screen, k),
          ...heat.filter((i) => i.containers.some((c) => containerKey(c) === containerKey(k))),
        ]}
        onBack={() => setSlotKey(null)}
        onChem={setChem}
      />
    );
  }

  if (active) {
    return (
      <HatchView
        bucket={active}
        slots={slots}
        issues={[...(screen.byHatch.get(active.spec.id) ?? []), ...heat.filter((i) => i.hatch === active.spec.id)]}
        screen={screen}
        baplie={baplie}
        onBack={() => {
          setHatchId(null);
          setSlotKey(null);
        }}
        onSlot={(k) => setSlotKey(k)}
      />
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
            ? " BAPLIE is on this voyage: reefers, dry cargo, and DG from the DCM share the same cells."
            : " Drop a BAPLIE on Manifest when you want reefers and the rest of the boxes. DCM-only still works."}
        </p>
      </div>

      <IssueBanner screen={screen} extra={heat} onHatch={setHatchId} />

      <Profile buckets={buckets} screen={screen} baplie={baplie} onHatch={setHatchId} />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {buckets.map((b) => {
          const issues = screen.byHatch.get(b.spec.id) ?? [];
          const worst = worstSeverity(issues);
          const nBoxes = baplie ? countBoxes(baplie, b.spec.id) : 0;
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
                  {nBoxes} boxes{b.lines.length ? ` · ${b.lines.length} DG` : ""}
                </Badge>
              ) : b.lines.length > 0 ? (
                <Badge variant="navy">{b.lines.length} DG</Badge>
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
            {worst && (
              <p className={cn("mt-1 text-xs", worst === "block" ? "text-cdc" : "text-review")}>
                {issues.filter((i) => i.severity === "block").length
                  ? `${issues.filter((i) => i.severity === "block").length} should not be here`
                  : ""}
                {issues.filter((i) => i.severity === "block").length &&
                issues.filter((i) => i.severity === "seg").length
                  ? " · "
                  : ""}
                {issues.filter((i) => i.severity === "seg").length
                  ? `${issues.filter((i) => i.severity === "seg").length} segregation`
                  : ""}
                {!issues.filter((i) => i.severity === "block").length &&
                !issues.filter((i) => i.severity === "seg").length &&
                issues.filter((i) => i.severity === "watch").length
                  ? `${issues.filter((i) => i.severity === "watch").length} caution`
                  : ""}
              </p>
            )}
            {baplie && countReefers(baplie, b.spec.id) > 0 && (
              <p className="mt-1 text-xs text-ink">{countReefers(baplie, b.spec.id)} reefers</p>
            )}
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
  const hot = all.filter((i) => i.severity !== "watch");
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
      <p className="font-medium text-ink">
        {screen.blocks ? `${screen.blocks} should not be in that space` : "Spaces look allowed"}
        {screen.segs + extra.filter((i) => i.severity === "seg").length
          ? ` · ${screen.segs + extra.filter((i) => i.severity === "seg").length} segregation / heat`
          : ""}
        {screen.watches + extra.filter((i) => i.severity === "watch").length
          ? ` · ${screen.watches + extra.filter((i) => i.severity === "watch").length} caution`
          : ""}
      </p>
      <ul className="mt-3 space-y-2">
        {hot.slice(0, 8).map((issue) => (
          <li key={issue.id}>
            <button type="button" onClick={() => issue.hatch && onHatch(issue.hatch)} className="text-left">
              <p className="text-sm font-medium text-ink">{issue.title}</p>
              <p className="text-xs text-muted">{issue.detail}</p>
              <p className="mt-0.5 font-mono text-xs text-subtle">{issue.rule}</p>
            </button>
          </li>
        ))}
      </ul>
      {hot.length > 8 && (
        <p className="mt-2 text-xs text-muted">+ {hot.length - 8} more — open the hatch.</p>
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
          <p className="mt-1 font-mono text-xs text-subtle">{issue.rule}</p>
        </li>
      ))}
    </ul>
  );
}

function Profile({
  buckets,
  screen,
  baplie,
  onHatch,
}: {
  buckets: HatchBucket[];
  screen: VoyageScreen;
  baplie: BapliePlan | null;
  onHatch: (id: number) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-navy p-4 text-primary-foreground shadow-border">
      <svg viewBox="0 0 1120 260" className="h-auto w-full min-w-[720px]" role="img" aria-label="GEORGE II profile, bow to the left">
        <title>M/V GEORGE II · bow left · house forward · hatches 1–12 aft</title>
        {/* waterline */}
        <line x1="20" y1="200" x2="1100" y2="200" stroke="currentColor" strokeOpacity="0.25" />
        {/* hull */}
        <path
          d="M70 200 L110 128 L180 118 L980 118 L1040 138 L1088 200 Z"
          fill="currentColor"
          fillOpacity="0.12"
          stroke="currentColor"
          strokeOpacity="0.45"
        />
        {/* bow flare */}
        <path d="M70 200 L96 92 L118 118" fill="none" stroke="currentColor" strokeOpacity="0.5" />
        {/* house — FORWARD */}
        <rect x="118" y="48" width="86" height="70" rx="2" fill="currentColor" fillOpacity="0.28" />
        <rect x="126" y="58" width="18" height="12" fill="currentColor" fillOpacity="0.5" />
        <rect x="150" y="58" width="18" height="12" fill="currentColor" fillOpacity="0.5" />
        <rect x="174" y="58" width="18" height="12" fill="currentColor" fillOpacity="0.5" />
        <text x="161" y="40" textAnchor="middle" fill="currentColor" fontSize="11">
          HOUSE
        </text>
        {/* fwd mast */}
        <line x1="161" y1="48" x2="161" y2="18" stroke="currentColor" strokeWidth="2" />
        <line x1="161" y1="22" x2="178" y2="34" stroke="currentColor" />
        <text x="161" y="14" textAnchor="middle" fill="currentColor" fontSize="9">
          FWD MAST
        </text>
        {/* hatches 1-12 */}
        {HATCHES.map((h, i) => {
          const x = 218 + i * 68;
          const b = buckets[i];
          const nBoxes = baplie ? countBoxes(baplie, h.id) : 0;
          const hot = b.lines.length > 0 || nBoxes > 0;
          const w = h.id === 10 ? 44 : 58;
          const worst = worstSeverity(screen.byHatch.get(h.id) ?? []);
          const rf = baplie ? countReefers(baplie, h.id) : 0;
          const fill =
            worst === "block"
              ? "var(--color-cdc)"
              : worst === "seg"
                ? "var(--color-review)"
                : b.lines.length
                  ? "var(--color-ok)"
                  : rf
                    ? "var(--color-accent)"
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
                fillOpacity={hot || worst || rf ? 0.95 : 0.2}
                stroke="currentColor"
                strokeOpacity="0.6"
                className="cursor-pointer"
                onClick={() => onHatch(h.id)}
              />
              <text
                x={x + w / 2}
                y={107}
                textAnchor="middle"
                fill={hot || worst ? "var(--color-primary-foreground)" : "currentColor"}
                fontSize="12"
                fontWeight={600}
                className="cursor-pointer"
                onClick={() => onHatch(h.id)}
              >
                {h.id}
              </text>
              {worst && (
                <text
                  x={x + w / 2}
                  y={80}
                  textAnchor="middle"
                  fill={worst === "block" ? "var(--color-cdc)" : "var(--color-review)"}
                  fontSize="10"
                >
                  !
                </text>
              )}
              {!worst && hot && (
                <text x={x + w / 2} y={80} textAnchor="middle" fill="var(--color-review)" fontSize="10">
                  {b.lines.length || nBoxes}
                </text>
              )}
            </g>
          );
        })}
        {/* engine casing at hatch 10 */}
        <rect x="818" y="54" width="36" height="64" fill="currentColor" fillOpacity="0.4" />
        <text x="836" y="48" textAnchor="middle" fill="currentColor" fontSize="9">
          CASING
        </text>
        {/* funnel + LNG vent, AFT of casing, not amidships tanks */}
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
  screen,
  baplie,
  onBack,
  onSlot,
}: {
  bucket: HatchBucket;
  slots: ContainerSlot[];
  issues: StowIssue[];
  screen: VoyageScreen;
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
        <Badge variant="navy">{bucket.lines.length} DG lines</Badge>
        <Badge variant="navy">{bucket.containers} containers</Badge>
        {bucket.spec.imdgOnDeck ? <Badge>On-deck IMDG OK</Badge> : <Badge variant="navy">No IMDG on cover</Badge>}
        {bucket.spec.imdgHold && <Badge>Hold 2 IMDG</Badge>}
        {issues.some((i) => i.severity === "block") && (
          <Badge variant="cdc">Should not be here</Badge>
        )}
        {issues.some((i) => i.severity === "seg") && (
          <Badge variant="review">Segregation</Badge>
        )}
        {baplie && (
          <Badge variant="navy">
            {countBoxes(baplie, bucket.spec.id)} BAPLIE · {countReefers(baplie, bucket.spec.id)} RF
          </Badge>
        )}
      </div>
      {baplie ? (
        <p className="text-xs text-muted">
          Navy = live reefer. Muted navy = NOR. Green = Ltd Qty only. Ink = full DG. Red/amber = a real CSM or 176.83 hit. Grey =
          Empty cells are empty. A 40' occupies the even bay and hatches out both 20' ends.
        </p>
      ) : null}

      <IssueList issues={issues} />

      <BayGrid
        title={`On deck · bays ${bucket.spec.bays.join("-")} · 20'/40'/20'${bucket.spec.id === 1 ? " · 11 across with 00" : bucket.spec.id === 10 ? " · bay 38 no middle" : " · 12 across"}`}
        tiers={deckTiers}
        rows={deckRowList}
        bays={bucket.spec.bays}
        cells={cells}
        onSlot={onSlot}
        screen={screen}
      />
      {holdRowList.length > 0 && holdTiers.length > 0 && (
        <BayGrid
          title={`Below deck · ${bucket.spec.hold || "hold"} · ${bucket.spec.holdAccess} access · 7 across with 00 · 20'/40'/20'`}
          tiers={holdTiers}
          rows={holdRowList}
          bays={bucket.spec.bays}
          cells={cells}
          onSlot={onSlot}
          screen={screen}
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

      <ul className="space-y-1 text-sm text-muted">
        {bucket.spec.notes.map((w) => (
          <li key={w}>— {w}</li>
        ))}
      </ul>
    </div>
  );
}

function slotLabel(s: ContainerSlot): string {
  if (s.lines.length) return s.lines.map((l) => l.line.hazClass).filter(Boolean)[0] || "DG";
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
  screen,
}: {
  s: ContainerSlot;
  wide: boolean;
  home: boolean;
  onSlot: (key: string) => void;
  screen: VoyageScreen;
}) {
  const worst = worstSeverity(issuesForKey(screen, slotLookupKey(s.key)));
  const lqOnly = s.lines.length > 0 && s.lines.every((d) => isLimitedQty(d.line));
  const fullDg = s.lines.some((d) => !isLimitedQty(d.line));
  const span = !home && !!s.stow?.fortyFoot;
  return (
    <button
      type="button"
      onClick={() => onSlot(s.key)}
      title={span ? `${s.container} 40' occupies this 20' end` : s.container}
      className={cn(
        "flex min-h-14 w-full flex-col items-center justify-center rounded-sm px-0.5 font-mono text-[9px] leading-tight",
        wide ? "min-w-[2.4rem]" : "min-w-[1.6rem]",
        s.conflict || s.mismatch ? "ring-1 ring-review" : "",
        span
          ? "bg-[repeating-linear-gradient(-45deg,transparent,transparent_4px,rgba(15,23,42,0.14)_4px,rgba(15,23,42,0.14)_8px)] text-muted"
          : worst === "block"
            ? "bg-cdc-soft text-ink"
            : worst === "seg"
              ? "bg-review-soft text-ink"
              : fullDg
                ? "bg-navy/15 text-ink"
                : lqOnly
                  ? "bg-ok-soft text-ink"
                  : s.operating
                    ? "bg-navy text-primary-foreground"
                    : s.reefer
                      ? "bg-navy-2 text-primary-foreground"
                      : s.box
                        ? "bg-surface-2 text-ink"
                        : "bg-ok-soft text-ink",
      )}
    >
      <span className="max-w-full truncate">{s.container.replace(/[A-Z]{4}/, (p) => p.slice(0, 4))}</span>
      <span className={span ? "text-subtle" : s.operating || s.reefer ? "text-primary-foreground/80" : "text-muted"}>
        {span ? "40'" : slotLabel(s)}
        {!span && s.stow?.fortyFoot ? " 40'" : ""}
        {worst || s.conflict ? " !" : ""}
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
  screen,
}: {
  title: string;
  tiers: number[];
  rows: number[];
  bays: [number, number, number];
  cells: (tier: number, row: number, bay: number) => ContainerSlot[];
  onSlot: (key: string) => void;
  screen: VoyageScreen;
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
              <td className="p-1 font-mono text-muted">{tier}</td>
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
                              screen={screen}
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
        <div>
          <p className="font-medium">
            UN {d.line.un} · {d.line.name || "Proper shipping name not parsed"}
            {lq ? " · Ltd Qty" : ""}
          </p>
          <p className="mt-1 text-sm text-muted">
            Class {d.line.hazClass || "—"}
            {d.line.input.packingGroup ? ` PG ${d.line.input.packingGroup}` : ""} ·{" "}
            {d.line.packaging || "package"} · {formatKg(d.line.quantityKg)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChem({ un: d.line.un, cls: d.line.hazClass, name: d.line.name })}
          className="inline-flex h-10 items-center gap-2 rounded-md bg-navy px-3 text-sm text-primary-foreground"
        >
          <Flame className="size-4" /> Spill / fire
        </button>
      </div>
    </li>
  );
}

function ContainerView({
  slot,
  hatch,
  issues,
  onBack,
  onChem,
}: {
  slot: ContainerSlot;
  hatch: HatchBucket;
  issues: StowIssue[];
  onBack: () => void;
  onChem: (c: { un: string; cls: string; name: string }) => void;
}) {
  const full = slot.lines.filter((d) => !isLimitedQty(d.line));
  const lq = slot.lines.filter((d) => isLimitedQty(d.line));
  return (
    <div className="space-y-5">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-2 text-sm text-accent">
        <ArrowLeft className="size-4" /> Hatch {hatch.spec.id}
      </button>
      <div>
        <p className="font-mono text-xs text-subtle uppercase">Container</p>
        <h2 className="mt-1 font-mono text-xl">{slot.container}</h2>
        {slot.stow && <p className="mt-1 text-sm text-muted">{formatStow(slot.stow)}</p>}
        {slot.mismatch && (
          <p className="mt-1 text-sm text-review">DCM and BAPLIE do not agree on this cell — pick one.</p>
        )}
        {slot.conflict && (
          <p className="mt-1 text-sm text-cdc">Two boxes hash to this bay-row-tier.</p>
        )}
        {slot.reefer && slot.box ? (
          <p className="mt-1 text-sm text-ink">
            Reefer {slot.box.iso || ""} {slot.operating ? `live ${slot.box.tempC ?? "set"}°C` : "NOR (not operating)"}. {motorsNote(slot.box)}
          </p>
        ) : null}
        {slot.box && !slot.reefer && (
          <p className="mt-1 text-sm text-muted">
            {slot.box.iso || "Dry"} · {slot.box.weightKg ? `${Math.round(slot.box.weightKg)} kg` : "weight —"}
            {slot.box.pol ? ` · POL ${slot.box.pol}` : ""}
            {slot.box.pod ? ` · POD ${slot.box.pod}` : ""}
          </p>
        )}
      </div>
      {issues.length ? (
        <IssueList issues={issues} />
      ) : (
        <p className="rounded-lg border border-ok/30 bg-ok-soft p-3 text-sm text-ok">
          No CSM location block and no 176.83 hit against this box on the positions we have.
        </p>
      )}
      {full.length > 0 && (
        <div>
          <h3 className="text-sm font-medium">Dangerous goods · {full.length}</h3>
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
          <p className="mt-1 text-xs text-muted">
            IMDG 3.4.4.2 — not segregated from other boxes, and not under the hatch class table.
          </p>
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
              <p className="font-medium">
                UN {dg.un || "—"} · {dg.name || "From BAPLIE DGS"}
              </p>
              <p className="mt-1 text-sm text-muted">
                Class {dg.cls || "—"} {dg.packingGroup ? `PG ${dg.packingGroup}` : ""} · not on the DCM
              </p>
              {dg.un ? (
                <button
                  type="button"
                  onClick={() => onChem({ un: dg.un, cls: dg.cls, name: dg.name })}
                  className="mt-2 inline-flex h-10 items-center gap-2 rounded-md bg-navy px-3 text-sm text-primary-foreground"
                >
                  <Flame className="size-4" /> Spill / fire
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
      <SheetBlock title="Hazards" items={sheet.hazards} />
      <SheetBlock title="Fire" items={sheet.fire} />
      <SheetBlock title="Spill" items={sheet.spill} />
      <SheetBlock title="PPE" items={sheet.ppe} />
      <SheetBlock title="First aid" items={sheet.firstAid} />
      <SheetBlock title="On GEORGE II" items={sheet.ship} />
      <p className="text-xs text-subtle">
        Public ERG actions for a container ship. Confirm against the SDS, EmS, and the
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
