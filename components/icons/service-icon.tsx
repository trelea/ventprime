import {
  ArrowUpDown,
  Building2,
  Calendar,
  Drill,
  Droplets,
  Fan,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Wind,
  ZapOff,
  Wrench,
  Ruler,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIcon } from "@/lib/services";
import type { USP, Stat } from "@/lib/stats";
import { cn } from "cn";

const SERVICE_ICONS: Record<ServiceIcon, LucideIcon> = {
  airflow: Wind,
  fan: Fan,
  mold: SprayCan,
  drill: Drill,
  ozonizare: Sparkles,
};

const USP_ICONS: Record<USP["icon"], LucideIcon> = {
  "zap-off": ZapOff,
  wrench: Wrench,
  "shield-check": ShieldCheck,
  ruler: Ruler,
};

/*
 * One icon per STATS-band metric (AGENTS.md §5.3): the card shows only a
 * glyph, the count-up number and one short caption line.
 */
const STAT_ICONS: Record<Stat["icon"], LucideIcon> = {
  calendar: Calendar,
  building: Building2,
  droplets: Droplets,
  "zap-off": ZapOff,
  ruler: Ruler,
  "shield-check": ShieldCheck,
};

/**
 * Icons are rendered inside a soft emerald-50 circle, per the service card
 * anatomy in AGENTS.md §5.2.
 *
 * The classes are combined with `cn()` rather than string-concatenated on
 * purpose. `cn` runs tailwind-merge, so a caller's `size-9` actually replaces
 * the default `size-14`; with plain concatenation both utilities end up in the
 * attribute and the winner depends on Tailwind's output order instead of the
 * call site.
 */
export function IconCircle({
  icon: Icon,
  className,
  iconClassName,
}: {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span
      className={cn(
        "bg-emerald-50 text-primary flex size-14 shrink-0 items-center justify-center rounded-2xl",
        className,
      )}
    >
      <Icon className={cn("size-7", iconClassName)} strokeWidth={1.75} />
    </span>
  );
}

type IconCircleProps = Omit<React.ComponentProps<typeof IconCircle>, "icon">;

export function ServiceIcon({ icon, ...props }: { icon: ServiceIcon } & IconCircleProps) {
  return <IconCircle icon={SERVICE_ICONS[icon]} {...props} />;
}

export function UspIcon({ icon, ...props }: { icon: USP["icon"] } & IconCircleProps) {
  return <IconCircle icon={USP_ICONS[icon]} {...props} />;
}

export function StatIcon({ icon, ...props }: { icon: Stat["icon"] } & IconCircleProps) {
  return <IconCircle icon={STAT_ICONS[icon]} {...props} />;
}

/**
 * The bare service glyph with no circle wrapper, for compact contexts where the
 * surrounding markup supplies its own chip (the navbar dropdown and mobile
 * sheet). Sized entirely by `className`.
 */
export function ServiceGlyph({
  icon,
  className,
}: {
  icon: ServiceIcon;
  className?: string;
}) {
  const Icon = SERVICE_ICONS[icon];
  return <Icon className={className} strokeWidth={1.75} />;
}

/**
 * The bare USP glyph, same idea as `ServiceGlyph` for the `USP["icon"]` set —
 * the hero's badges supply their own chip, so the emerald-50 circle that
 * `UspIcon` wraps around the icon would be a second, nested chip.
 *
 * `strokeWidth` 2 rather than `IconCircle`'s 1.75: the hero renders these at
 * 16px, where the lighter stroke reads as haze instead of as an icon.
 *
 * Size comes from the caller, usually via the parent's `[&_svg]:size-*`.
 */
export function UspGlyph({
  icon,
  className,
}: {
  icon: USP["icon"];
  className?: string;
}) {
  const Icon = USP_ICONS[icon];
  return <Icon className={className} strokeWidth={2} />;
}

/** Alternating arrows used inside the TECH cross-section diagram. */
export const FlowArrows = ArrowUpDown;