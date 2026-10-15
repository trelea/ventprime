import { Check, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/sections/section";
import { ServiceCard } from "@/components/sections/service-card";
import { AuroraText } from "@/components/ui/aurora-text";
import { DotPattern } from "@/components/ui/dot-pattern";

/**
 * Aurora gradient for the section title.
 *
 * Deliberately *not* the hero's palette: that one ends in white, which is
 * invisible against this section's light `bg-surface-section`. These three are
 * all clear of the 3:1 large-text bar on that surface — brand blue ~3.7:1,
 * brand green ~3.2:1, brand-blue-dark ~13:1.
 */
const AURORA_COLORS_LIGHT = ["#1E6FB8", "#2FB36D", "#0F2E4D"];

/** SERVICES (`#servicii`) — AGENTS.md §5.2. */
export async function ServicesSection() {
  const t = await getTranslations("Services");
  // The CTA button copies the navbar's "Get in touch" recipe, label included,
  // so its text reads from the Nav namespace too.
  const tNav = await getTranslations("Nav");

  return (
    <Section id="servicii" tone="surface">
      {/*
        A single centred title, in Aurora Text. No eyebrow and no intro
        paragraph — the card grid is self-explanatory at this point, and the
        copy that used to sit here is on the service pages where it belongs. The
        heading stays an `<h2>` and AuroraText keeps its `sr-only` copy, so the
        outline and the accessible name are untouched; it is only the paint that
        changes.
      */}
      <h2 className="font-display text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
        <AuroraText colors={AURORA_COLORS_LIGHT}>{t("section.title")}</AuroraText>
      </h2>

      <ul className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {services.map((service, index) => (
          <li key={service.key} className="h-full">
            {/*
              Photo side alternates per *row*, not per card: the top row reads
              one split direction throughout, the bottom row mirrors it, so the
              2x2 zigzags down the page instead of rendering as two rows of
              aligned stripes. Read down the columns the way the user parses the
              grid and cards 1/3 match, 2/4 match. No `sizes` here: the photo is
              full-bleed, so this grid's card width is the component's default.
            */}
            <ServiceCard
              service={service}
              reverse={Math.floor(index / 2) % 2 === 1}
            />
          </li>
        ))}
      </ul>

      {/*
        Bottom CTA (AGENTS.md §5.2) — the service-card shell without a photo:
        the same `brand-blue-dark` + `rounded-md` + border and shadow-hover
        recipe as `<article>` in `service-card.tsx`.

        Behind the copy sits a static Magic UI `DotPattern` — `glow` stays off
        so there is no JS animation at all — masked so its density ramps
        towards the button side and dissolves under the text, plus a static
        brand-green radial glow behind the button (no blur layer on phones:
        it is decorative and `blur-3xl` is a GPU cost there, not a feature).
        Both layers are decorative, beneath a `z-10` content layer.
      */}
      <div className="bg-brand-blue-dark border-border relative isolate mt-12 flex flex-col items-center gap-6 overflow-hidden rounded-md border p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:flex-row sm:justify-between sm:p-10">
        <DotPattern className="text-white/20 [mask-image:linear-gradient(to_right,transparent,black_65%)]" />

        <div
          aria-hidden
          className="bg-brand-green/20 pointer-events-none absolute top-1/2 right-[-12%] hidden h-72 w-96 -translate-y-1/2 rounded-full blur-3xl sm:block"
        />

        {/* Big title over a short description — the only copy in the card,
            nothing else between the background layers and the button. */}
        <div className="relative z-10 min-w-0 text-center sm:text-left">
          <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t("cta.title")}
          </h3>
          <p className="mt-2 max-w-xl text-base text-white/85 sm:text-lg">
            {t("cta.text")}
          </p>

          {/*
            Three supporting points, all restating claims the site already
            makes — the response promise (same {hours} interpolation pattern
            the Contacts section uses, fed from `site.responseTimeHours`), the
            service-area claim from the hero, and the on-site measurement from
            the hero subtitle. Green checks read against the blue-dark shell
            the same way they do elsewhere on the brand.
          */}
          <ul className="mt-3 flex flex-col gap-1.5">
            {(
              [
                t("cta.pointCallback", { hours: site.responseTimeHours }),
                t("cta.pointCoverage"),
                t("cta.pointDiagnostics"),
              ] as string[]
            ).map((point) => (
              <li key={point} className="flex items-start gap-2">
                <Check className="text-brand-green mt-1 size-4 shrink-0" />
                <span className="text-base leading-relaxed text-white/85 sm:text-lg">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ButtonLink
          render={<Link href={{ pathname: "/", hash: "#contacte" }} />}
          className="bg-brand-green hover:bg-brand-green/90 relative z-10 h-13 w-full shrink-0 gap-2.5 rounded-md px-7 text-base text-white shadow-sm sm:self-end sm:w-auto"
        >
          <Phone className="size-5" />
          {tNav("getInTouch")}
        </ButtonLink>
      </div>
    </Section>
  );
}