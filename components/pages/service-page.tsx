import type { Metadata } from "next";
import Image from "next/image";
import { Phone } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  otherServices,
  serviceByKey,
  type ServiceKey,
} from "@/lib/services";
import { getImage, type ImageName } from "@/lib/images";
import { formatMDLCurency } from "@/lib/currency";
import { site } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading, Section, container } from "@/components/sections/section";
import { ServiceCard } from "@/components/sections/service-card";
import { CtaStrip } from "@/components/sections/cta-strip";
import { ContactForm } from "@/components/forms/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

/**
 * Marks a block whose long-form copy still has to be written (AGENTS.md §7).
 * Renders nothing in production; visible while the content is outstanding.
 */
function PendingBlock({
  title,
  note,
  className,
}: {
  title: string;
  note: string;
  className?: string;
}) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div
      className={`rounded-2xl border border-dashed border-border p-8 text-center ${className ?? ""}`}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-muted-foreground mt-2 text-sm">{note}</p>
    </div>
  );
}

/** Shared metadata for all four service pages. */
export async function generateServiceMetadata(
  key: ServiceKey,
): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations(`Services.items.${key}` as never);
  const tMeta = await getTranslations("Metadata");

  const title = t("title") as unknown as string;
  const description = t("description") as unknown as string;
  const slug = serviceByKey[key].slug[locale];

  return {
    title,
    description: tMeta("service.description", { description }),
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: Object.fromEntries(
        routing.locales.map((candidate) => [
          candidate,
          `/${candidate}/${serviceByKey[key].slug[candidate]}`,
        ]),
      ),
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/${slug}`,
      images: [{ url: "/images/og-image.webp", width: 1200, height: 630 }],
    },
  };
}

/**
 * Service page template (AGENTS.md §7) — shared by all four services.
 *
 * Headline copy comes from `Services.items.<key>` in the active catalog. The
 * long-form blocks are intentionally left as `PendingBlock` until the client
 * supplies the text (AGENTS.md §7, §11).
 */
export async function ServicePage({ service: key }: { service: ServiceKey }) {
  const locale = (await getLocale()) as Locale;
  const service = serviceByKey[key];

  const t = await getTranslations(`Services.items.${key}` as never);
  const tCommon = await getTranslations("Common");
  const tNav = await getTranslations("Nav");

  const title = t("title") as unknown as string;
  const description = t("description") as unknown as string;
  const alt = t("alt") as unknown as string;
  const zeroPrice = formatMDLCurency(0, locale);
  const points = (t.raw("points") as unknown as string[]).map((point) =>
    point.replaceAll("{zeroPrice}", zeroPrice),
  );

  const image = getImage(service.image as ImageName);
  const slug = service.slug[locale];

  return (
    <>
      <JsonLd
        data={serviceSchema(key, locale, { name: title, description })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: tNav("home"), url: `/${locale}` },
          { name: title, url: `/${locale}/${slug}` },
        ])}
      />

      {/* 1 — Hero. `pt-28`/`sm:pt-32` clear the fixed header (80px) now that it
          no longer reserves its own space in the flow. */}
      <section
        className={`${container} grid items-center gap-10 pt-28 pb-16 sm:pt-32 lg:grid-cols-2`}
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed text-pretty">
            {description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {points.map((point) => (
              <li
                key={point}
                className="bg-emerald-50 text-brand-blue-dark rounded-full px-3 py-1.5 text-sm font-medium"
              >
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              render={<Link href={{ pathname: "/", hash: "#contacte" }} />}
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-500/90 text-white"
            >
              {tCommon("freeInspection")}
            </ButtonLink>
            <ButtonLink
              render={<a href={`tel:${site.contact.phone}`} />}
              size="lg"
              variant="outline"
            >
              <Phone />
              {site.contact.phoneDisplay}
            </ButtonLink>
          </div>
        </div>

        <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
          <Image
            src={image.src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* 2–8 — long-form blocks, pending content */}
      <Section tone="surface">
        <PendingBlock
          title={title}
          note="Sections 2–8 (problem, solution, what's included, benefits, before/after, price, FAQ) are wired up and waiting on copy."
        />
      </Section>

      {/* 9 — Other services */}
      <Section>
        <SectionHeading title={tCommon("otherServices")} />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherServices(key).map((other, index) => (
            <li key={other.key}>
              {/* Three across: the card stacks at this width. */}
              <ServiceCard
                service={other}
                reverse={index % 2 === 1}
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* 10 — CTA + full form (service + problem pre-selected) */}
      <Section tone="surface">
        <CtaStrip title={title} description={description} />
        <div className="mt-12">
          <ContactForm
            source={`${locale}/${slug}`}
            preselectedService={key}
            preselectedProblem={preselectedProblem[key]}
          />
        </div>
      </Section>
    </>
  );
}

/**
 * Which "Problem" option each service page pre-selects in the form.
 *
 * The "Service" field is derived from the route, so it needs no map — see
 * `preselectedService={key}` above (AGENTS.md §6: pre-selected on service pages).
 */
const preselectedProblem: Partial<Record<ServiceKey, string>> = {
  "ventilatie-pasiva": "highHumidity",
  "ventilatie-fortata": "smell",
  "tratare-mucegai": "mold",
  "foraj-diamantat": "newVentilation",
  "ozonizare-incaperi": "smell",
};