/**
 * Permanent redirects for the six-service revision of the site (AGENTS.md §3,
 * §10).
 *
 * This module is deliberately **self-contained** — it imports nothing and uses
 * no `@/` path aliases. `next.config.ts` is transpiled outside the app's
 * module graph, so anything it pulls in must resolve with plain relative paths.
 * That is also why the target slugs are spelled out here instead of being read
 * from `lib/services.ts`: the two would otherwise need an import that breaks
 * the config build.
 *
 * Keep the `locales` list in sync with `i18n/routing.ts`, and the `to` slugs
 * with `services` in `lib/services.ts`.
 */

/** Mirrors `routing.locales`. */
export const locales = ["ro", "ru", "en"] as const;

type Locale = (typeof locales)[number];
type SlugMap = Record<Locale, string>;

interface RetiredRoute {
  /** Slug the retired page was served under, per locale. */
  from: SlugMap;
  /** Slug of the page that absorbed it, per locale. */
  to: SlugMap;
}

export const retiredRoutes: RetiredRoute[] = [
  // ── folded into /ventilatie-pasiva ────────────────────────────────────────
  {
    from: {
      ro: "ventilatie-autonoma",
      ru: "avtonomnaya-ventilyaciya",
      en: "autonomous-ventilation",
    },
    to: {
      ro: "ventilatie-pasiva",
      ru: "passivnaya-ventilyaciya",
      en: "passive-ventilation",
    },
  },
  {
    from: {
      ro: "circulatia-aerului",
      ru: "tsirkulyatsiya-vozdukha",
      en: "air-circulation",
    },
    to: {
      ro: "ventilatie-pasiva",
      ru: "passivnaya-ventilyaciya",
      en: "passive-ventilation",
    },
  },
  {
    from: {
      ro: "eliminarea-umiditatii",
      ru: "ustranenie-prichin-vlazhnosti",
      en: "humidity-cause-elimination",
    },
    to: {
      ro: "ventilatie-pasiva",
      ru: "passivnaya-ventilyaciya",
      en: "passive-ventilation",
    },
  },
  {
    from: {
      ro: "ventilatie-subsol-mansarda",
      ru: "ventilyaciya-podvalov-cherdakov",
      en: "basement-attic-ventilation",
    },
    to: {
      ro: "ventilatie-pasiva",
      ru: "passivnaya-ventilyaciya",
      en: "passive-ventilation",
    },
  },
  // ── folded into /tratare-mucegai ─────────────────────────────────────────
  {
    from: {
      ro: "eliminarea-mucegaiului",
      ru: "udalenie-pleseni",
      en: "mold-removal",
    },
    to: {
      ro: "tratare-mucegai",
      ru: "obrabotka-ot-pleseni",
      en: "mold-treatment",
    },
  },
  {
    from: {
      ro: "prevenirea-mucegaiului",
      ru: "profilaktika-pleseni",
      en: "mold-prevention",
    },
    to: {
      ro: "tratare-mucegai",
      ru: "obrabotka-ot-pleseni",
      en: "mold-treatment",
    },
  },
];

/**
 * Expanded to the flat `source` → `destination` list `next.config.ts` needs.
 *
 * Each retired slug gets a locale-prefixed rule plus an unprefixed one, so both
 * `/ro/udalenie-pleseni` and `/udalenie-pleseni` land on a live page. Sources
 * are literal paths on purpose: next-intl's proxy rewrites happen after these
 * redirects are evaluated, so a localized `source` can never match here.
 */
export const retiredRedirects = retiredRoutes.flatMap(({ from, to }) => [
  ...locales.map((locale) => ({
    source: `/${locale}/${from[locale]}`,
    destination: `/${locale}/${to[locale]}`,
    permanent: true,
  })),
  {
    source: `/${from.ro}`,
    destination: `/${to.ro}`,
    permanent: true,
  },
]);
