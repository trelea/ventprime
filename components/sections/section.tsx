import { cn } from "cn";

/**
 * The site's single width rule. Every top-level content box on every page —
 * each `Section`, the hero column, the stats band, the service-page hero, both
 * footer rows — uses this one class string, so nothing can drift.
 *
 * What it resolves to, and why it is written this oddly: the content box must
 * be `min(88rem, 100vw - 2 × gutter)`, which is exactly the box the header pill
 * spans. The pill gets there from the other side — it caps at `max-w-[88rem]`
 * *inside* a `px-4 sm:px-6 lg:px-8` wrapper (see `components/layout/site-header`)
 * — so the gutter sits outside its cap. Here the gutter is inside the cap (the
 * padding belongs to the same element), which only reaches the same box if the
 * cap is widened by the gutter, hence `88rem + the gutter`. Verified equal at
 * 1920 / 1440 / 1280 / 1024 / 640 / 390px.
 *
 * ⚠️  Underscores, not spaces: this is a Tailwind arbitrary value, so
 * `calc(88rem_+_2rem)` is how `calc(88rem + 2rem)` gets emitted (CSS requires
 * whitespace around `+`, so it cannot be written without the underscores).
 *
 * ⚠️  Do not put the gutter directly on an element that owns a `fill` image or
 * an `inset-0` overlay and expect the overlay to stay full-bleed: for absolutely
 * positioned children the containing block is the padding box. `hero.tsx` keeps
 * its gutter on the content column for exactly this reason.
 */
export const container =
  "mx-auto w-full max-w-[calc(88rem_+_2rem)] px-4 sm:max-w-[calc(88rem_+_3rem)] sm:px-6 lg:max-w-[calc(88rem_+_4rem)] lg:px-8";

/**
 * Shared eyebrow + heading block used by every section
 * (see the per-section layouts in AGENTS.md §5).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  invert = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-sm font-semibold tracking-wide uppercase",
            invert ? "text-brand-green" : "text-primary",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={cn(
          "text-3xl font-bold tracking-tight text-balance sm:text-4xl",
          invert && "text-white",
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed text-pretty",
            invert ? "text-white/75" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/** Consistent vertical rhythm + max width for a section's inner content. */
export function Section({
  id,
  children,
  className,
  tone = "default",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "surface";
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-16 sm:py-24",
        tone === "surface" && "bg-surface-section",
        className,
      )}
    >
      <div className={container}>{children}</div>
    </section>
  );
}