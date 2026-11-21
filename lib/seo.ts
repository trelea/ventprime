import type { Metadata } from "next";
import en from "../messages/en.json";
import ro from "../messages/ro.json";
import ru from "../messages/ru.json";
import { getPathname } from "@/i18n/navigation";
import { routing, type LocalizedPath } from "@/i18n/routing";
import type { BlogPost, Locale } from "@/lib/blogs";

const messages = { en, ro, ru };

/** Absolute base URL, without a trailing slash. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ventprime.md"
).replace(/\/$/, "");

/** Brand constants shared by metadata and structured data. */
export const site = {
  name: "VentPrime",
  phone: "+37379717214",
  email: "contact@ventprime.md",
  street: "34 Zelinskogo St.",
  city: "Chisinau",
  country: "MD",
} as const;

/** Topical keywords reused by Open Graph tags and BlogPosting schema. */
export const topicTags: Record<Locale, string[]> = {
  en: [
    "natural ventilation",
    "humidity",
    "mould",
    "condensation",
    "Chisinau",
    "Moldova",
  ],
  ro: [
    "ventilatie naturala",
    "umiditate",
    "mucegai",
    "condens",
    "Chisinau",
    "Moldova",
  ],
  ru: [
    "естественная вентиляция",
    "влажность",
    "плесень",
    "конденсат",
    "Кишинёв",
    "Молдова",
  ],
};

/** Open Graph expects a territory-aware locale, not just a language code. */
const ogLocales: Record<Locale, string> = {
  en: "en_US",
  ro: "ro_RO",
  ru: "ru_RU",
};

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

/** Verification tags are opt-in via env vars so no tokens live in the repo. */
function verificationTags(): NonNullable<Metadata["verification"]> {
  const tags: NonNullable<Metadata["verification"]> = {};
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const yandex = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION;
  const bing = process.env.NEXT_PUBLIC_BING_VERIFICATION;

  if (google) tags.google = google;
  if (yandex) tags.yandex = yandex;
  if (bing) tags.other = { "msvalidate.01": bing };

  return tags;
}

type PageMetadataOptions = {
  locale: Locale;
  path: LocalizedPath;
  title: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
  section?: string;
  tags?: string[];
};

/**
 * One source of truth for title, description, canonical, hreflang, social
 * cards and verification. Open Graph / Twitter images are supplied by the
 * `opengraph-image` / `twitter-image` file conventions in each route segment.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  publishedTime,
  section,
  tags,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      ...localizedAlternates(path, locale),
      types: { "application/rss+xml": "/rss.xml" },
    },
    openGraph: {
      type,
      siteName: site.name,
      locale: ogLocales[locale],
      url: localizedPath(path, locale),
      title,
      description,
      ...(type === "article"
        ? {
            ...(publishedTime ? { publishedTime } : {}),
            ...(section ? { section } : {}),
            ...(tags?.length ? { tags } : {}),
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
    verification: verificationTags(),
  };
}

/** Parse the display date used in blog data ("14.11.2026") into ISO 8601. */
export function isoDate(displayDate: string): string {
  const [day, month, year] = displayDate.split(".");
  return `${year}-${month}-${day}`;
}

/** Metadata for one localized blog article. */
export function postMetadata(locale: Locale, post: BlogPost): Metadata {
  const content = post.translations[locale];

  return pageMetadata({
    locale,
    path: post.path,
    title: content.metaTitle,
    description: content.metaDescription,
    type: "article",
    publishedTime: isoDate(post.date),
    section: messages[locale].Nav.blog,
    tags: topicTags[locale],
  });
}
