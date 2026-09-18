import type { LegacyVerdict, LineInput } from "./types.ts";

/**
 * Exact rule set from the v1.0 local HTML auditor the user attached.
 * Used only so results can be compared — not for eNOAD determinations.
 */
const LEGACY_CDC_CLASSES = ["1.1", "1.2", "1.5", "2.3"];
const LEGACY_CDC_UNS = ["1005", "1017", "1079", "1942", "2067", "2426", "3375"];

export function evaluateLegacy(line: LineInput): { verdict: LegacyVerdict; reason: string } {
  const unNum = line.un.replace(/["'\s]/g, "");
  const hazClass = line.hazClass ?? "";
  const packaging = (line.packaging ?? "").toUpperCase();

  if (LEGACY_CDC_CLASSES.some((cls) => hazClass.startsWith(cls))) {
    return {
      verdict: "CDC",
      reason: `v1.0 treated any ${hazClass} as automatic CDC (class list 1.1 / 1.2 / 1.5 / 2.3).`,
    };
  }
  if (LEGACY_CDC_UNS.includes(unNum)) {
    return {
      verdict: "CDC",
      reason: `v1.0 treated UN ${unNum} as an automatic high-risk CDC regardless of quantity or packaging.`,
    };
  }
  if (hazClass.startsWith("7")) {
    return {
      verdict: "REVIEW",
      reason: "v1.0 sent every Class 7 item to manual HRCQ review.",
    };
  }
  if (hazClass.startsWith("6.1") || packaging.includes("TANK")) {
    return {
      verdict: "REVIEW",
      reason: packaging.includes("TANK")
        ? "v1.0 sent every TANK package to bulk-threshold review, including non-PIH cargo."
        : `v1.0 sent every Division 6.1 item to bulk-threshold review.`,
    };
  }
  return { verdict: "CLEAR", reason: "v1.0 did not flag this row." };
}
