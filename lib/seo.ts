import { services, type ServiceKey } from "@/lib/services";
import { site, absoluteUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

/**
 * JSON-LD builders (AGENTS.md §5.9, §10).
 *
 * Every URL produced here is a localized path, matching what the next-intl
 * proxy actually serves.
 */

type Json = Record<string, unknown>;

/** Localized service names, resolved from the active message catalog. */
export type ServiceNames = Record<ServiceKey, string>;

export function organizationSchema(
  locale: Locale,
  serviceNames: ServiceNames,
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl("/logo.svg"),
    image: absoluteUrl("/images/og-image.webp"),
    telephone: site.contact.phone,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.city,
      postalCode: site.contact.address.postalCode,
      addressCountry: site.contact.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.contact.geo.latitude,
      longitude: site.contact.geo.longitude,
    },
    openingHoursSpecification: site.contact.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    areaServed: site.serviceArea.map((area) => ({
      "@type": "City",
      name: area,
    })),
    priceRange: "$$",
    sameAs: site.socials.map((social) => social.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicii",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: serviceNames[service.key],
          url: serviceUrl(service.key, locale),
        },
      })),
    },
  };
}

/** Only emitted once the placeholders in `lib/testimonials.ts` are replaced. */
export function aggregateRatingSchema(): Json | null {
  if (!site.rating.hasRealReviews) return null;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.reviewCount,
    },
  };
}

export function faqSchema(
  items: { question: string; answer: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function serviceSchema(
  key: ServiceKey,
  locale: Locale,
  data: { name: string; description: string },
): Json {
  const url = serviceUrl(key, locale);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    description: data.description,
    url,
    serviceType: data.name,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: site.serviceArea.map((area) => ({ "@type": "City", name: area })),
  };
}

export function breadcrumbSchema(
  trail: { name: string; url: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Canonical URL of a service page in a given locale. */
export function serviceUrl(key: ServiceKey, locale: Locale): string {
  const service = services.find((entry) => entry.key === key);
  return absoluteUrl(`/${locale}/${service?.slug[locale] ?? key}`);
}