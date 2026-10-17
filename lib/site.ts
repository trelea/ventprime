/**
 * Central site configuration for VENTPRIME.
 *
 * ⚠️  PLACEHOLDERS — every value marked with `TODO(client)` must be replaced
 * with the client's real data before launch (see AGENTS.md §11).
 *
 * NAP rule: name, address and phone MUST be written identically here, in the
 * header, contacts section, footer, JSON-LD schema and the Google Business
 * Profile, otherwise local SEO suffers.
 */

export const site = {
  name: "VENTPRIME",
  legalName: "VENTPRIME SRL", // TODO(client)
  idno: "1000000000000", // TODO(client)
  domain: "stopmucegai.md",
  url: "https://stopmucegai.md",
  locale: "ro-MD",
  foundedYear: 2015, // TODO(client)

  /**
   * Figures interpolated into translated copy (e.g. "Garanție {years} ani").
   * They live here rather than in components so every translated string that
   * mentions them stays in sync across locales.
   */
  warrantyYears: 5, // TODO(client)
  experienceYears: 5,
  valveInstallationPrice: 1500,

  contact: {
    phone: "+37360000000", // TODO(client)
    phoneDisplay: "+373 60 000 000", // TODO(client)
    email: "ventprimemd@gmail.com",
    address: {
      street: "str. Exemplu 1", // TODO(client)
      city: "Chișinău",
      region: "mun. Chișinău",
      postalCode: "2001", // TODO(client)
      country: "MD",
      countryCode: "MD",
    },
    geo: {
      latitude: 47.0105, // TODO(client)
      longitude: 28.8638, // TODO(client)
    },
    /** Schema.org OpeningHoursSpecification */
    openingHours: [
      {
        days: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "19:00",
      },
    ],
  },

  /** Rendered as plain text for local SEO (AGENTS.md §5.9). */
  serviceArea: [
    "Chișinău",
    "Bălți",
    "Orhei",
    "Ungheni",
    "Căușeni",
    "Strășeni",
    "Ialoveni",
    "Cimișlia",
  ], // TODO(client)

  socials: [
    // TODO(client): replace the `#` placeholders below with the real profile
    // URLs — only list profiles that exist (the reference site ships dead `#`
    // placeholders, which is exactly what we must avoid, AGENTS.md §2).
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
  ] as { label: string; href: string }[],

  messengers: {
    viber: "viber://chat?number=%2B37360000000", // TODO(client)
    whatsapp: "https://wa.me/37360000000", // TODO(client)
    telegram: "https://t.me/ventprime", // TODO(client)
  },

  rating: {
    value: 4.9, // TODO(client)
    reviewCount: 120, // TODO(client)
    googleUrl: "", // TODO(client) — Google Business Profile link
    /**
     * Gate for `aggregateRating` / `review` JSON-LD. Google penalises invented
     * review markup, so it stays `false` until real, permissioned reviews
     * replace the placeholders in `lib/testimonials.ts`.
     */
    hasRealReviews: false,
  },

  /** Promise shown under the hero CTA and in the contacts section. */
  responseTimeHours: 2, // TODO(client)
} as const;

export type Site = typeof site;

/** Canonical absolute URL for a path, used by metadata, sitemap and JSON-LD. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}