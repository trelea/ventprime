import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { services } from "@/lib/services";
import { absoluteUrl } from "@/lib/site";
import { getCopyrightYear } from "@/lib/date";

/**
 * Locale-aware sitemap (AGENTS.md §10).
 *
 * `alternates.languages` gives Google the full hreflang set per URL, matching
 * the `link` headers the proxy already emits.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date(await getCopyrightYear(), 0, 1);
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, absoluteUrl(`/${locale}`)]),
  );

  const home = routing.locales.map((locale) => ({
    url: absoluteUrl(`/${locale}`),
    lastModified,
    changeFrequency: "weekly" as const,
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }));

  const servicePages = routing.locales.flatMap((locale) =>
    services.map((service) => ({
      url: absoluteUrl(`/${locale}/${service.slug[locale]}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((candidate) => [
            candidate,
            absoluteUrl(`/${candidate}/${service.slug[candidate]}`),
          ]),
        ),
      },
    })),
  );

  return [...home, ...servicePages];
}