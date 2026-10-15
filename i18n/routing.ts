import { defineRouting } from "next-intl/routing";
import { servicePathnames } from "@/lib/services";

/**
 * Localized user-facing pathnames (AGENTS.md §3).
 *
 * The key is the internal pathname that exists on disk; values are the external
 * paths per locale. next-intl's proxy rewrites external → internal, so
 * `/ru/obrabotka-ot-pleseni` is served by `app/[locale]/tratare-mucegai`.
 *
 * `ro` is the default locale and matches the internal pathname, so only the
 * other locales need an explicit entry. Adding a service means adding one entry
 * to `servicePathnames` in `lib/services.ts` — nothing else.
 */
const pathnames = {
  "/": "/",
  ...servicePathnames,
};

export const routing = defineRouting({
  locales: ["ro", "ru", "en"],
  defaultLocale: "ro",
  localePrefix: "always",
  // Resolve the locale from the URL only — never from `Accept-Language`
  // or a cookie, so `/` always redirects to `/ro`.
  localeDetection: false,
  localeCookie: false,
  pathnames,
});

export type Locale = (typeof routing.locales)[number];