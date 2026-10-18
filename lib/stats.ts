import type { ServiceKey } from "@/lib/services";

/**
 * STATS band metrics (AGENTS.md §5.3).
 *
 * ⚠️  PLACEHOLDERS — every value below is a stand-in. The client must supply
 * real figures; the spec explicitly forbids inventing numbers.
 *
 * `value` is the final, server-rendered number. `NumberTicker` animates from
 * zero to it, so the correct figure is always present in the HTML for crawlers
 * and for users with reduced motion.
 */

export type StatFormat = "number" | "currency" | "percent" | "years";

export interface Stat {
  id: string;
  value: number;
  format: StatFormat;
  /**
   * Glyph shown beside the number, e.g. `"+"` so a cumulative metric reads
   * `+500` / `+5 ani`. Rendered as a sibling of `StatCounter`, so it stays in
   * the server HTML and does not flicker during the count-up.
   */
  symbol?: string;
  /**
   * Glyph resolvable through `components/icons/service-icon.tsx`, shown in the
   * STATS band card on top of the number.
   */
  icon:
    | "calendar"
    | "building"
    | "droplets"
    | "zap-off"
    | "ruler"
    | "shield-check";
  /** Message key for the short label, e.g. `stats.yearsExperience.label`. */
  labelKey: string;
  captionKey: string;
}

export const stats: Stat[] = [
  {
    id: "years",
    value: 5,
    format: "years",
    symbol: "+",
    icon: "calendar",
    labelKey: "years",
    captionKey: "years.caption",
  },
  {
    id: "objects",
    value: 500,
    format: "number",
    symbol: "+",
    icon: "building",
    labelKey: "objects",
    captionKey: "objects.caption",
  },
  {
    id: "humidity",
    value: 40,
    format: "percent",
    icon: "droplets",
    labelKey: "humidity",
    captionKey: "humidity.caption",
  },
  {
    id: "electricity",
    value: 0,
    format: "currency",
    icon: "zap-off",
    labelKey: "electricity",
    captionKey: "electricity.caption",
  },
  {
    id: "area",
    value: 12000,
    format: "number",
    symbol: "+",
    icon: "ruler",
    labelKey: "area",
    captionKey: "area.caption",
  },
  {
    id: "warranty",
    value: 5,
    format: "years",
    icon: "shield-check",
    labelKey: "warranty",
    captionKey: "warranty.caption",
  },
];

/** The four highlighted metrics shown first on wide screens. */
export const primaryStats = stats.filter((stat) =>
  ["years", "objects", "humidity", "electricity"].includes(stat.id),
);

/**
 * Look up a metric by id so surfaces outside the STATS band (e.g. the hero
 * trust strip) quote the same number instead of repeating a literal.
 */
export function statValue(id: string): number {
  return stats.find((stat) => stat.id === id)?.value ?? 0;
}

/**
 * The four-step "how we work" timeline (AGENTS.md §5.4 Block C).
 */
export interface ProcessStep {
  id: string;
  titleKey: string;
  descriptionKey: string;
}

export const processSteps: ProcessStep[] = [
  { id: "request", titleKey: "title", descriptionKey: "description" },
  { id: "inspection", titleKey: "title", descriptionKey: "description" },
  { id: "work", titleKey: "title", descriptionKey: "description" },
  { id: "result", titleKey: "title", descriptionKey: "description" },
];

/** "Why choose us" blocks (AGENTS.md §5.4 Block B). */
export interface USP {
  id: "no-electricity" | "no-maintenance" | "warranty" | "free-inspection";
  icon: "zap-off" | "wrench" | "shield-check" | "ruler";
  titleKey: string;
  descriptionKey: string;
}

export const usps: USP[] = [
  { id: "no-electricity", icon: "zap-off", titleKey: "title", descriptionKey: "description" },
  { id: "no-maintenance", icon: "wrench", titleKey: "title", descriptionKey: "description" },
  { id: "warranty", icon: "shield-check", titleKey: "title", descriptionKey: "description" },
  { id: "free-inspection", icon: "ruler", titleKey: "title", descriptionKey: "description" },
];

/** Links back to Home sections from a service page (AGENTS.md §7). */
export const crossLinks = {
  tech: { href: "/#tehnologie", hash: "#tehnologie" },
  reviews: { href: "/#recenzii", hash: "#recenzii" },
  contacts: { href: "/#contacte", hash: "#contacte" },
} as const;

export type { ServiceKey };