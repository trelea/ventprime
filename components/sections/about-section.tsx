import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getImage } from "@/lib/images";
import { site } from "@/lib/site";
import { usps } from "@/lib/stats";
import { UspIcon } from "@/components/icons/service-icon";
import { GlareHover } from "@/components/ui/glare-hover";
import { Section } from "@/components/sections/section";

/** ABOUT US (`#despre`) — AGENTS.md §5.4. */
export async function AboutSection() {
  const t = await getTranslations("About");

  return (
    <Section id="despre">
      {/* Block A — intro fills exactly one viewport height: the grid itself
          carries `min-h-screen-safe` (100svh) so photos + title + 2x2 cards
          occupy the full screen, with the timeline flowing below it. Inner
          columns stay top-aligned (`items-start`); `content-center` centers
          the whole row vertically inside the viewport. */}
      <div className="min-h-screen-safe grid content-center items-start gap-12 lg:grid-cols-2">
        <div>
          <div className="relative">
            <div className="relative aspect-4/5 w-4/5 overflow-hidden rounded-2xl">
              <Image
                src={getImage("about-installation").src}
                alt={t("section.imageAlt")}
                fill
                sizes="(max-width: 1024px) 80vw, 35vw"
                className="object-cover"
              />
            </div>
            <div className="absolute right-0 bottom-0 aspect-4/5 w-2/5 overflow-hidden rounded-2xl border-4 border-background shadow-lg">
              <Image
                src={getImage("about-attic").src}
                alt=""
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <h2 className="font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            {t("section.title")}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl text-base leading-relaxed text-pretty sm:text-lg">
            {t("section.description")}
          </p>

          {/*
            The four "why choose us" points as a 2x2 of solid brand-blue cards —
            one saturated color across all four, white copy for contrast. Each
            card is a Magic UI `GlareHover` root (CSS-only diagonal sheen on
            hover, zero deps): `width="100%"` + matching `background` fill the
            grid cell, a white glare sweep tints the hover, and the inner stack
            lays out icon over title over description. `place-items-stretch`
            cancels the component's centering so the copy stays left-aligned.
            Equal size via `auto-rows-fr` + `h-full` down the whole chain, so
            all four resolve to the tallest cell's height in every locale.
          */}
          <ul className="mt-16 grid auto-rows-fr items-stretch gap-4 sm:grid-cols-2">
            {usps.map((usp) => {
              // `warranty` is the only USP whose title interpolates a value, so the
              // ICU variable has to be supplied to `t()` — a post-hoc string
              // replacement would throw FORMATTING_ERROR before it ever ran.
              const title =
                usp.id === "warranty"
                  ? t("usp.warranty.title", { years: site.warrantyYears })
                  : (t(`usp.${usp.id}.title` as never) as unknown as string);
              const description = t(
                `usp.${usp.id}.description` as never,
              ) as unknown as string;

              return (
                <li key={usp.id} className="h-full min-w-0">
                  <GlareHover
                    width="100%"
                    background="#1e6fb8"
                    color="#ffffff"
                    opacity={0.25}
                    className="h-full w-full place-items-stretch rounded-md border border-white/15 text-left shadow-lg shadow-black/20 transition-shadow duration-300 hover:shadow-xl"
                  >
                    <div className="flex h-full w-full flex-col p-5">
                      <UspIcon
                        icon={usp.icon}
                        className="bg-brand-green size-11 rounded-md text-white"
                        iconClassName="size-5"
                      />
                      <h3 className="mt-3 text-base font-semibold text-white">{title}</h3>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/85">
                        {description}
                      </p>
                    </div>
                  </GlareHover>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
