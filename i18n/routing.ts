import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["ro", "ru", "en"],

  // Fallback when the browser language can't be matched: Romanian (primary market).
  defaultLocale: "ro",

  // Resolve the locale from an explicit URL prefix first (so links and the
  // locale switcher always win), then from the cookie, then from the browser's
  // Accept-Language header. Anything unsupported falls back to `defaultLocale`.
  // Applied by the next-intl middleware in proxy.ts.
  localeDetection: true,

  // Static paths of the site that have a localized slug per language.
  // The key is the internal pathname used by the file system (default locale),
  // the values are the URLs visitors and search engines see.
  pathnames: {
    "/": "/",
    "/blogs": {
      ro: "/bloguri",
      ru: "/blogi",
      en: "/blogs",
    },
    "/blogs/natural-ventilation-or-recuperator": {
      ro: "/bloguri/ventilatie-naturala-sau-recuperator",
      ru: "/blogi/estestvennaya-ventilyatsiya-ili-rekuperator",
      en: "/blogs/natural-ventilation-or-recuperator",
    },
    "/blogs/why-windows-fog-up-in-winter": {
      ro: "/bloguri/de-ce-se-aburesc-ferestrele-iarna",
      ru: "/blogi/pochemu-okna-zapotevayut-zimoy",
      en: "/blogs/why-windows-fog-up-in-winter",
    },
    "/blogs/ozone-treatment-when-it-helps": {
      ro: "/bloguri/ozonizarea-incaperilor-cand-ajuta",
      ru: "/blogi/ozonirovanie-pomeshcheniy-kogda-pomogaet",
      en: "/blogs/ozone-treatment-when-it-helps",
    },
    "/blogs/fresh-air-with-closed-windows": {
      ro: "/bloguri/aer-proaspat-cu-ferestrele-inchise",
      ru: "/blogi/svezhiy-vozdukh-pri-zakrytykh-oknakh",
      en: "/blogs/fresh-air-with-closed-windows",
    },
  },
});

/** Internal pathnames that have a localized variant. */
export type LocalizedPath = keyof typeof routing.pathnames;

/** The 4 static articles, in display order. */
export const articlePaths = [
  "/blogs/natural-ventilation-or-recuperator",
  "/blogs/why-windows-fog-up-in-winter",
  "/blogs/ozone-treatment-when-it-helps",
  "/blogs/fresh-air-with-closed-windows",
] as const satisfies ReadonlyArray<LocalizedPath>;
