import { getFormatter, getTranslations } from "next-intl/server";
import { formatMDLCurency } from "@/lib/currency";
import { primaryStats, type Stat } from "@/lib/stats";
import { StatCounter } from "@/components/sections/stat-counter";
import { Meteors } from "@/components/ui/meteors";
import { StatIcon } from "@/components/icons/service-icon";
import { container, sectionSpacingTop } from "@/components/sections/section";

/** STATS / METRICS (`#cifre`) — AGENTS.md §5.3, rebuilt as a rounded band. */

/*
 * Unit suffixes are only shown for the formats that carry one visually:
 * percentages and the year formats, which reuse the stat's existing label
 * ("years" / "ani" / "лет") as its unit. Currency values are formatted with
 * `formatMDLCurency` directly, and plain numbers render bare — any `+` on a
 * cumulative metric comes from `stat.symbol`, rendered before the number.
 */
const UNIT = (stat: Stat, label: string) =>
  stat.format === "years" ? (
    <span className="text-2xl sm:text-3xl">{label}</span>
  ) : stat.format === "percent" ? (
    <span>%</span>
  ) : null;

export async function StatsSection({ locale }: { locale: string }) {
  const t = await getTranslations("Stats.section");
  const format = await getFormatter();

  return (
    <section
      id="cifre"
      /*
        The area around the rounded band keeps the surface tone the sections
        above it flow on — so the band reads as sitting *inside* that
        background rather than after it. Bottom padding is zero: the fade
        strip below ends the section on white, flush with About's background,
        so no surface band survives past the melt.
      */
      className={`scroll-mt-20 bg-surface-section ${sectionSpacingTop}`}
    >
      {/*
        The band is full-bleed again — 100% of the viewport width, edge to
        edge, like the strip it reimplements — but with its corners curbed:
        `rounded-2xl` on the band and a sliver of the page's white showing
        through the `py` above and below. The `container` drops inside to keep
        the content on the same width rule as every other section, while the
        gradient itself now reaches the screen edges. `isolate` +
        `overflow-hidden` clip the meteors exactly at the rounded edges.

        `py-20` / `sm:py-32` / `lg:py-44` applies equally above the title and
        below the cards, so the band keeps the same breathing room on both
        ends, trimmed on phones where the single-column grid already makes the
        section tall. Corners stay modest on phones (`rounded-[1.75rem]`) and open up
        to ~72px on PC (`lg:rounded-[72px]`, low end of the 70–100px range)
        so the full-bleed curb reads clearly on wide screens.
      */}
      <div className="bg-brand-gradient relative isolate overflow-hidden rounded-[1.75rem] py-20 shadow-lg shadow-black/10 sm:rounded-[3rem] sm:py-32 lg:rounded-[72px] lg:py-44">
        {/*
          Magic UI Meteors — faint white streaks drifting across the band,
          reading as air currents. The component itself mounts nothing under
          `prefers-reduced-motion` (its animation is JS-driven, immune to the
          global CSS override) and every span it renders is `aria-hidden`.
        */}
        <Meteors number={10} className="text-white/40" />

        <div className={container}>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">
              {t("title")}
            </h2>
          </div>

          {/*
            Four primary metric cards — light-mode white against the gradient:
            solid `bg-white` + `shadow-lg` to lift them off the band, and
            reduced corner rounding (`rounded-md`, mirrored on the icon tiles).
            Icon on top, the server-rendered count-up number with its unit,
            one extralight caption. Nothing else on the card.
          */}
          <dl className="relative z-10 mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {primaryStats.map((stat, index) => {
              const label = t(`${stat.labelKey}.label` as never) as unknown as string;
              /*
               * `captionKey` carries the full nested path ("years.caption")
               * against the `Stats.section` scope — the flat legacy values
               * ("yearsCaption") never matched anything in the messages.
               */
              const caption = t(stat.captionKey as never) as unknown as string;
              const formatted =
                stat.format === "currency"
                  ? formatMDLCurency(stat.value, locale)
                  : format.number(stat.value, { maximumFractionDigits: 0 });

              return (
                <div
                  key={stat.id}
                  className="flex flex-col items-center justify-center rounded-md border border-border bg-white p-8 text-center shadow-xl shadow-black/20 sm:aspect-3/4"
                >
                  <StatIcon
                    icon={stat.icon}
                    className="bg-emerald-500 text-white rounded-md size-14 sm:size-16"
                    iconClassName="size-7 sm:size-8"
                  />

                  <dd className="text-brand-blue-dark mt-8 flex items-baseline gap-1 text-4xl font-extrabold sm:mt-14 sm:text-5xl">
                    <span className="inline-flex items-baseline">
                      {/*
                        The symbol leads the number and sits tight against it
                        (no flex gap, so `+500` not `+ 500`), matching the
                        About indicators; `UNIT()` keeps the parent's `gap-1`
                        after the number (`+5 ani`).
                      */}
                      {stat.symbol ? <span>{stat.symbol}</span> : null}
                      <StatCounter
                        value={stat.value}
                        formatted={formatted}
                        locale={locale}
                        delay={index * 0.08}
                      />
                    </span>
                    {UNIT(stat, label)}
                  </dd>
                  {/*
                    Caption copy is balanced per locale (~85-95 chars) so all
                    four cards wrap to the same line count; `line-clamp-3` is
                    the equaliser if one locale still overruns, and the full
                    string stays in the HTML for SEO regardless.
                  */}
                  <dt className="text-muted-foreground mt-4 line-clamp-3 text-left text-base font-normal leading-relaxed text-pretty sm:text-lg">
                    {caption}
                  </dt>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
      {/*
        Surface-to-white fade: the stats wrapper sits on `bg-surface-section`
        and About starts on plain white, so without this the boundary is a hard
        horizontal edge. This strip gradients `transparent → white` over the
        surface tone, melting the grey out across its height so the sections
        flow into each other.
      */}
      <div
        aria-hidden
        className="pointer-events-none mt-6 h-16 bg-gradient-to-b from-transparent to-white sm:mt-10 sm:h-20"
      />
    </section>
  );
}
