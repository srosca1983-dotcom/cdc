import { useMemo, useState } from "react";
import { Check, ClipboardCopy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BapliePlan } from "@/lib/baplie/types.ts";
import {
  formatTons,
  kgToLt,
  kgToMt,
  locode,
  portName,
  summarizePlan,
  summaryText,
  type CargoTally,
} from "@/lib/baplie/summary.ts";
import { cn } from "@/lib/utils";

function tonsCell(t: CargoTally, kind: "mt" | "lt"): string {
  if (t.units > 0 && t.missingWeight === t.units) return "—";
  return formatTons(kind === "mt" ? kgToMt(t.kg) : kgToLt(t.kg));
}

function TallyRow({
  t,
  code,
  total,
}: {
  t: CargoTally;
  code?: string;
  total?: boolean;
}) {
  return (
    <tr className={cn("border-b border-border last:border-0", total && "bg-surface-2 font-medium")}>
      <td className={cn("sticky left-0 z-10 px-3 py-2 sm:px-4", total ? "bg-surface-2" : "bg-surface")}>
        <p>{t.name}</p>
        {code && code !== "UNSTATED" && code !== "TOTAL" ? (
          <p className="font-mono text-[11px] text-muted">{code}</p>
        ) : null}
      </td>
      <td className="px-2 py-2 text-right font-mono tabular-nums">{t.units}</td>
      <td className="px-2 py-2 text-right font-mono tabular-nums">{t.teu}</td>
      <td className="px-2 py-2 text-right font-mono tabular-nums">{tonsCell(t, "mt")}</td>
      <td className="px-2 py-2 text-right font-mono tabular-nums">{tonsCell(t, "lt")}</td>
      <td className="px-2 py-2 text-right font-mono tabular-nums">{t.twenty}</td>
      <td className="px-2 py-2 text-right font-mono tabular-nums">{t.forty}</td>
      <td className="px-2 py-2 text-right font-mono tabular-nums">{t.fortyFive}</td>
      <td className="px-2 py-2 text-right font-mono tabular-nums">{t.full}</td>
      <td className="px-2 py-2 text-right font-mono tabular-nums">{t.empty}</td>
      <td className="px-2 py-2 text-right font-mono tabular-nums">{t.rf}</td>
      <td className="px-2 py-2 text-right font-mono tabular-nums">{t.live}</td>
      <td className="px-2 py-2 text-right font-mono tabular-nums">{t.dry}</td>
      <td className={cn("px-3 py-2 text-right font-mono tabular-nums sm:px-4", t.dg > 0 && "text-cdc")}>
        {t.dg}
      </td>
    </tr>
  );
}

export function BaplieSummary({ plan }: { plan: BapliePlan }) {
  const summary = useMemo(() => summarizePlan(plan), [plan]);
  const [copied, setCopied] = useState(false);
  const t = summary.totals;
  const showOther = t.other > 0;

  return (
    <div id="baplie-onboard" className="overflow-hidden rounded-lg border border-border bg-surface-2/40">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border px-3 py-2.5 sm:px-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">On board</p>
          <p className="mt-0.5 text-sm font-medium">
            {t.units.toLocaleString("en-US")} boxes · {t.teu.toLocaleString("en-US")} TEU · {tonsCell(t, "mt")}{" "}
            MT / {tonsCell(t, "lt")} LT
          </p>
          <p className="mt-0.5 text-xs text-muted">
            {[
              summary.pol ? `Loaded ${portName(summary.pol)} (${locode(summary.pol)})` : null,
              summary.pod ? `voyage POD ${portName(summary.pod)}` : "By discharge port.",
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(summaryText(summary));
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1600);
            } catch {
              /* ignore */
            }
          }}
        >
          {copied ? <Check /> : <ClipboardCopy />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-xs">
          <thead>
            <tr className="border-b border-border text-[11px] tracking-wide text-muted uppercase">
              <th className="sticky left-0 z-10 bg-surface-2 px-3 py-2 font-medium sm:px-4">Discharge</th>
              <th className="px-2 py-2 text-right font-medium">Units</th>
              <th className="px-2 py-2 text-right font-medium">TEU</th>
              <th className="px-2 py-2 text-right font-medium">MT</th>
              <th className="px-2 py-2 text-right font-medium">LT</th>
              <th className="px-2 py-2 text-right font-medium">20'</th>
              <th className="px-2 py-2 text-right font-medium">40'</th>
              <th className="px-2 py-2 text-right font-medium">45'</th>
              <th className="px-2 py-2 text-right font-medium">Full</th>
              <th className="px-2 py-2 text-right font-medium">Empty</th>
              <th className="px-2 py-2 text-right font-medium">RF</th>
              <th className="px-2 py-2 text-right font-medium">Live</th>
              <th className="px-2 py-2 text-right font-medium">Dry</th>
              <th className="px-3 py-2 text-right font-medium sm:px-4">DG</th>
            </tr>
          </thead>
          <tbody>
            {summary.ports.map((p) => (
              <TallyRow key={p.code} t={p} code={p.code} />
            ))}
            <TallyRow t={t} total />
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-2 border-t border-border px-3 py-2.5 sm:px-4">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="navy">On deck {summary.deck.units}</Badge>
          <Badge variant="muted">Below {summary.hold.units}</Badge>
          {summary.unplaced.units ? <Badge variant="review">Unplaced {summary.unplaced.units}</Badge> : null}
          {t.hc ? <Badge variant="muted">HC 9'6" {t.hc}</Badge> : null}
          {showOther ? <Badge variant="review">Other size {t.other}</Badge> : null}
          {t.missingWeight ? <Badge variant="review">No MEA {t.missingWeight}</Badge> : null}
        </div>
        {summary.hatches.length ? (
          <p className="font-mono text-[11px] leading-relaxed text-muted">
            Hatches{" "}
            {summary.hatches
              .map((h) => `H${h.hatch} ${h.units}${h.dg ? `/${h.dg} DG` : ""}`)
              .join(" · ")}
          </p>
        ) : null}
        {summary.dgClasses.length ? (
          <p className="text-xs">
            <span className="text-cdc">
              {t.dg} DG {t.dg === 1 ? "box" : "boxes"}
            </span>
            <span className="text-muted">
              {" "}
              ·{" "}
              {summary.dgClasses
                .map((d) => `class ${d.cls} × ${d.boxes}${d.uns.length ? ` (UN ${d.uns.join(", ")})` : ""}`)
                .join(" · ")}
            </span>
          </p>
        ) : (
          <p className="text-xs text-muted">No DGS in this BAPLIE — DG column stays 0 until the plan carries it.</p>
        )}
        <p className="text-[11px] text-subtle">
          Weight is container gross from MEA (tare + cargo), in metric tonnes and long tons (1 LT = 2,240 lb). Not DG
          net. 20' = 1 TEU; 40' and 45' = 2 TEU. ISO 45G1 is a 40' high cube; a true 45' is ISO L. Live = reefer with a
          set temperature.
        </p>
      </div>
    </div>
  );
}
