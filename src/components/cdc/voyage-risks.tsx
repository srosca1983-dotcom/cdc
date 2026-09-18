import { useMemo, useState } from "react";
import {
  AlertTriangle,
  DoorOpen,
  Droplets,
  FileWarning,
  Flame,
  MapPin,
  Radio,
  Ship,
  ThermometerSun,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sheetFor } from "@/lib/erg/guides.ts";
import {
  FAMILY_LABEL,
  FAMILY_ORDER,
  risksByFamily,
  voyageRisks,
  type RiskFamily,
  type RiskSeverity,
  type VoyageRisk,
} from "@/lib/erg/voyage-risks.ts";
import type { BapliePlan } from "@/lib/baplie/types.ts";
import type { EvalResult, LineResult } from "@/lib/cdc/types.ts";
import { cn } from "@/lib/utils";

const FAMILY_ICON: Record<RiskFamily, typeof Flame> = {
  fire: Flame,
  explosion: AlertTriangle,
  toxic: Wind,
  spill: Droplets,
  wetting: Waves,
  heat: ThermometerSun,
  stow: MapPin,
  overboard: Ship,
  entry: DoorOpen,
  pollution: Waves,
  report: FileWarning,
  electrical: Zap,
};

const FILTERS: { id: "all" | "now" | RiskFamily; label: string }[] = [
  { id: "all", label: "All" },
  { id: "now", label: "Already wrong" },
  ...FAMILY_ORDER.map((f) => ({ id: f, label: FAMILY_LABEL[f] })),
];

export function VoyageRisksView({
  result,
  baplie,
  onOpen,
}: {
  result: EvalResult | null;
  baplie: BapliePlan | null;
  onOpen: (c: { un: string; cls: string; name: string }) => void;
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const lines = result?.lines ?? [];
  const risks = useMemo(() => voyageRisks(lines, baplie), [lines, baplie]);
  const visible = risks.filter((r) => {
    if (filter === "all") return true;
    if (filter === "now") return r.severity === "now";
    return r.family === filter;
  });
  const groups = risksByFamily(visible);
  const now = risks.filter((r) => r.severity === "now").length;
  const watch = risks.filter((r) => r.severity === "watch").length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium">What can go wrong on this voyage</h2>
        <p className="mt-1 max-w-3xl text-sm text-muted">
          Not just spill and fire. This list is built from the DCM and the BAPLIE:
          fire, explosion, toxic vapor, wetting, heat, hold entry, lost boxes,
          pollution, and the CDC report. Press a UN for the full sheet.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant={now ? "cdc" : "ok"}>{now ? `${now} already wrong` : "Nothing already wrong"}</Badge>
          {watch ? <Badge variant="review">{watch} live on this cargo</Badge> : null}
          <Badge variant="navy">{risks.length} watches</Badge>
        </div>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-1 rounded-lg bg-surface-2 p-1">
          {FILTERS.filter((f) => f.id === "all" || f.id === "now" || risks.some((r) => r.family === f.id)).map(
            (f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "h-10 whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors duration-150",
                  filter === f.id ? "bg-surface text-ink shadow-border" : "text-muted hover:text-ink",
                )}
              >
                {f.label}
              </button>
            ),
          )}
        </div>
      </div>

      {groups.length === 0 ? (
        <p className="rounded-lg border bg-surface p-5 text-sm text-muted shadow-border">
          {risks.length
            ? "Nothing in this filter."
            : "No dangerous goods on the papers we have. Drop a DCM or a BAPLIE with DGS."}
        </p>
      ) : (
        groups.map((g) => (
          <section key={g.family} className="space-y-3">
            <h3 className="text-sm font-medium tracking-wide text-muted uppercase">{g.label}</h3>
            <ul className="grid gap-3 lg:grid-cols-2">
              {g.items.map((r) => (
                <RiskCard key={r.id} risk={r} onOpen={onOpen} />
              ))}
            </ul>
          </section>
        ))
      )}

      {lines.length > 0 && (
        <section className="space-y-3">
          <div>
            <h3 className="text-sm font-medium">By UN</h3>
            <p className="mt-1 text-sm text-muted">Every UN on the DCM. How it looks, how it burns, and the rest.</p>
          </div>
          <UnIndex lines={lines} onOpen={onOpen} />
        </section>
      )}
    </div>
  );
}

function RiskCard({
  risk,
  onOpen,
}: {
  risk: VoyageRisk;
  onOpen: (c: { un: string; cls: string; name: string }) => void;
}) {
  const Icon = FAMILY_ICON[risk.family];
  const un = risk.uns[0];
  return (
    <li
      className={cn(
        "rounded-lg border bg-surface p-4 shadow-border",
        risk.severity === "now" && "border-cdc/40",
        risk.severity === "watch" && "border-review/30",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md",
            risk.severity === "now"
              ? "bg-cdc-soft text-cdc"
              : risk.severity === "watch"
                ? "bg-review-soft text-review"
                : "bg-residue-soft text-residue",
          )}
        >
          <Icon className="size-4" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium">{risk.title}</p>
            <SeverityMark severity={risk.severity} />
          </div>
          <p className="mt-1 text-sm text-muted">{risk.why}</p>
          <ul className="mt-2 space-y-1 text-sm text-ink">
            {risk.do.map((d) => (
              <li key={d}>— {d}</li>
            ))}
          </ul>
          {(risk.uns.length > 0 || risk.hatches.length > 0) && (
            <p className="mt-2 font-mono text-xs text-subtle">
              {risk.uns.length ? `UN ${risk.uns.join(", ")}` : ""}
              {risk.uns.length && risk.hatches.length ? " · " : ""}
              {risk.hatches.length ? risk.hatches.map((h) => `H${h}`).join(" ") : ""}
            </p>
          )}
          {un ? (
            <button
              type="button"
              onClick={() => {
                const sheet = sheetFor(un, "", "");
                onOpen({ un, cls: sheet.cls, name: sheet.name });
              }}
              className="mt-3 inline-flex h-10 items-center gap-2 rounded-md bg-navy px-3 text-sm text-primary-foreground"
            >
              <Radio className="size-4" /> UN {un} sheet
            </button>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function UnIndex({
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

function SeverityMark({ severity }: { severity: RiskSeverity }) {
  if (severity === "now") return <Badge variant="cdc">Now</Badge>;
  if (severity === "watch") return <Badge variant="review">This cargo</Badge>;
  return <Badge variant="navy">Routine</Badge>;
}
