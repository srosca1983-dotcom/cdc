import { Badge } from "@/components/ui/badge";
import type { LegacyVerdict, Verdict } from "@/lib/cdc/types.ts";

export function VerdictBadge({ verdict }: { verdict: Verdict }) {
  switch (verdict) {
    case "CDC":
      return <Badge variant="cdc">CDC — report</Badge>;
    case "CDC_RESIDUE":
      return <Badge variant="residue">CDC residue</Badge>;
    case "REVIEW":
      return <Badge variant="review">Needs review</Badge>;
    default:
      return <Badge variant="ok">Not CDC</Badge>;
  }
}

export function LegacyBadge({ verdict }: { verdict: LegacyVerdict }) {
  switch (verdict) {
    case "CDC":
      return <Badge variant="cdc">v1.0 CDC</Badge>;
    case "REVIEW":
      return <Badge variant="review">v1.0 review</Badge>;
    default:
      return <Badge variant="muted">v1.0 clear</Badge>;
  }
}
