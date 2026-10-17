/**
 * The four VENTPRIME services (AGENTS.md §3).
 *
 * An earlier revision of the plan described six services (humidity-cause
 * elimination, basement/attic ventilation, natural air circulation and mold
 * prevention were standalone pages). Those four were folded into the pages
 * below rather than dropped — AGENTS.md §3 records exactly where their content
 * went. Nothing needs to exist at `/eliminarea-umiditatii`,
 * `/ventilatie-subsol-mansarda`, `/circulatia-aerului` or
 * `/prevenirea-mucegaiului`; `next.config.ts` 301-redirects them.
 *
 * `key` is the internal pathname — the actual route on disk is
 * `app/[locale]/<key>/page.tsx`. The user-facing slug is localized through the
 * `pathnames` map in `i18n/routing.ts`, which is generated from `slug` below.
 *
 * Copy lives in `messages/<locale>.json` under `Services.items.<key>` — do not
 * put user-visible strings here.
 */

export const serviceKeys = [
  "ventilatie-pasiva",
  "ventilatie-fortata",
  "tratare-mucegai",
  "foraj-diamantat",
  "ozonizare-incaperi",
] as const;

export type ServiceKey = (typeof serviceKeys)[number];

export type ServiceIcon = "airflow" | "fan" | "mold" | "drill" | "ozonizare";

export interface Service {
  key: ServiceKey;
  /** Icon key resolved by `components/icons/service-icon.tsx`. */
  icon: ServiceIcon;
  /** Localized user-facing slug (no leading slash, ASCII where possible). */
  slug: Record<"ro" | "ru" | "en", string>;
  /** Key into `lib/images.ts` for the card illustration. */
  image: string;
  /** Alt text key — resolved from messages to keep it translatable. */
  altKey: string;
}

export const services: Service[] = [
  {
    key: "ventilatie-pasiva",
    icon: "airflow",
    slug: {
      ro: "ventilatie-pasiva",
      ru: "passivnaya-ventilyaciya",
      en: "passive-ventilation",
    },
    image: "service-ventilatie-pasiva",
    altKey: "alt",
  },
  {
    key: "ventilatie-fortata",
    icon: "fan",
    slug: {
      ro: "ventilatie-fortata",
      ru: "prinuditelnaya-ventilyaciya",
      en: "forced-ventilation",
    },
    image: "service-ventilatie-fortata",
    altKey: "alt",
  },
  {
    key: "tratare-mucegai",
    icon: "mold",
    slug: {
      ro: "tratare-mucegai",
      ru: "obrabotka-ot-pleseni",
      en: "mold-treatment",
    },
    image: "service-tratare-mucegai",
    altKey: "alt",
  },
  {
    key: "foraj-diamantat",
    icon: "drill",
    slug: {
      ro: "foraj-diamantat",
      ru: "almaznoe-sverlenie",
      en: "diamond-drilling",
    },
    image: "service-foraj-diamantat",
    altKey: "alt",
  },
  {
    key: "ozonizare-incaperi",
    icon: "ozonizare",
    slug: {
      ro: "ozonizare-incaperi",
      ru: "ozonirovanie-pomescheniy",
      en: "room-ozonation",
    },
    image: "service-ozonizare-incaperi",
    altKey: "alt",
  },
];

export const serviceByKey = Object.fromEntries(
  services.map((service) => [service.key, service]),
) as Record<ServiceKey, Service>;

/**
 * Localized pathnames map consumed by `i18n/routing.ts`.
 *
 * This is written out literally on purpose: `next-intl` derives the allowed
 * `href` types for `<Link>` from this object, so it must keep its literal key
 * types. Building it with `Object.fromEntries` would widen every key to
 * `string` and silently break type-safe navigation.
 *
 * The key is the internal pathname (the route on disk, also used by `ro`);
 * each value is the external pathname for that locale.
 */
export const servicePathnames = {
  "/ventilatie-pasiva": {
    ru: "/passivnaya-ventilyaciya",
    en: "/passive-ventilation",
  },
  "/ventilatie-fortata": {
    ru: "/prinuditelnaya-ventilyaciya",
    en: "/forced-ventilation",
  },
  "/tratare-mucegai": {
    ru: "/obrabotka-ot-pleseni",
    en: "/mold-treatment",
  },
  "/foraj-diamantat": {
    ru: "/almaznoe-sverlenie",
    en: "/diamond-drilling",
  },
  "/ozonizare-incaperi": {
    ru: "/ozonirovanie-pomescheniy",
    en: "/room-ozonation",
  },
} as const;

/** Internal path for a service — what `<Link href>` expects. */
export function servicePath(key: ServiceKey): `/${ServiceKey}` {
  return `/${key}` as `/${ServiceKey}`;
}

/** All services except `current` — used by the "other services" block. */
export function otherServices(current: ServiceKey): Service[] {
  return services.filter((service) => service.key !== current);
}

/**
 * The retired slugs from the six-service revision live in `lib/retired-routes.ts`,
 * which is consumed by the 301 redirects in `next.config.ts`. It is a separate,
 * import-free module because `next.config.ts` cannot resolve `@/` aliases.
 */
