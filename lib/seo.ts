import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type LocalizedPath } from "@/i18n/routing";
import type { Locale } from "@/lib/blogs";

/** Absolute base URL, without a trailing slash. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ventprime.md"
).replace(/\/$/, "");

/** Pathname a visitor sees for a given internal path and locale. */
export function localizedPath(href: LocalizedPath, locale: Locale): string {
  return getPathname({ href, locale });
}

/** Absolute URL for a given internal path and locale (used by the sitemap). */
export function absoluteLocalizedPath(
  href: LocalizedPath,
  locale: Locale,
): string {
  return `${siteUrl}${localizedPath(href, locale)}`;
}

/**
 * Canonical + reciprocal hreflang tags for the *same* page in every locale.
 * `x-default` points at the default-language version of that page.
 * Relative values are resolved against `metadataBase` from the root layout.
 */
export function localizedAlternates(
  href: LocalizedPath,
  locale: Locale,
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};

  for (const candidate of routing.locales) {
    languages[candidate] = localizedPath(href, candidate);
  }
  languages["x-default"] = localizedPath(href, routing.defaultLocale);

  return {
    canonical: localizedPath(href, locale),
    languages,
  };
}
