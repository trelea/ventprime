import { Check, Phone, Send } from "lucide-react";
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
const AURORA_COLORS_LIGHT = ["#1E6FB8", "#10b981", "#0F2E4D"];

/** SERVICES (`#servicii`) — AGENTS.md §5.2. */
export async function ServicesSection() {
  const t = await getTranslations("Services");

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
              Photo side alternates per *row*, not per card: row 1 reads one
              split direction, row 2 mirrors it, and row 3 returns to row 1's
              direction on the left-hand card (`ozonizare-incaperi`), while the
              CTA card occupies row 3's right-hand cell.
            */}
            <ServiceCard
              service={service}
              reverse={Math.floor(index / 2) % 2 === 1}
            />
          </li>
        ))}

        {/*
          Row 3, right-hand cell — CTA card placed alongside the 5th service
          card (`ozonizare-incaperi`) in the same 2-column grid.
        */}
        <li className="h-full">
          <div className="bg-brand-blue-dark border-border relative isolate flex h-full min-h-68 flex-col justify-between gap-6 overflow-hidden rounded-md border p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:min-h-88 sm:p-8">
            <DotPattern
              id="services-dot-pattern"
              className="text-white/20 [mask-image:linear-gradient(to_right,transparent,black_65%)]"
            />

            <div
              aria-hidden
              className="bg-emerald-500/20 pointer-events-none absolute top-1/2 right-[-12%] hidden h-72 w-96 -translate-y-1/2 rounded-full blur-3xl sm:block"
            />

            <div className="relative z-10 min-w-0">
              <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {t("cta.title")}
              </h3>
              <p className="mt-2 max-w-xl text-base text-white/85 sm:text-lg">
                {t("cta.text")}
              </p>

              <ul className="mt-3 flex flex-col gap-1.5">
                {(
                  [
                    t("cta.pointCallback", { hours: site.responseTimeHours }),
                    t("cta.pointCoverage"),
                    t("cta.pointDiagnostics"),
                  ] as string[]
                ).map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <Check className="text-emerald-500 mt-1 size-4 shrink-0" />
                    <span className="text-base leading-relaxed text-white/85 sm:text-lg">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ButtonLink
                render={<Link href={{ pathname: "/", hash: "#contacte" }} />}
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-500/90 h-12 w-full gap-2 rounded-md px-5 text-base font-semibold text-white shadow-sm"
              >
                <Send className="size-4" />
                {t("cta.sendRequest")}
              </ButtonLink>
              <ButtonLink
                render={<a href={`tel:${site.contact.phone}`} />}
                size="lg"
                className="text-brand-blue h-12 w-full gap-2 rounded-md bg-white px-5 text-base font-semibold shadow-sm hover:bg-white/90"
              >
                <Phone className="size-4" />
                {t("cta.getConsultation")}
              </ButtonLink>
            </div>
          </div>
        </li>
      </ul>
    </Section>
  );
}