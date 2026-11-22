import type { MetadataRoute } from "next";
import { routing, type LocalizedPath } from "@/i18n/routing";
import { blogPosts } from "@/lib/blogs";
import { absoluteLocalizedPath, isoDate, siteUrl } from "@/lib/seo";

type Locale = (typeof routing.locales)[number];

function localizedEntry(
  href: LocalizedPath,
  locale: Locale,
  lastModified?: Date,
  images?: string[],
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};

  for (const candidate of routing.locales) {
    languages[candidate] = absoluteLocalizedPath(href, candidate);
  }
  // x-default follows the primary market, not next-intl's routing fallback.
  languages["x-default"] = absoluteLocalizedPath(href, "ro");

  return {
    url: absoluteLocalizedPath(href, locale),
    ...(lastModified ? { lastModified } : {}),
    ...(images ? { images } : {}),
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    // Home and blog index have no versioned content date, so no fake lastmod.
    entries.push(localizedEntry("/", locale));
    entries.push(localizedEntry("/blogs", locale));

    for (const post of blogPosts) {
      entries.push(
        localizedEntry(
          post.path,
          locale,
          new Date(isoDate(post.date)),
          [`${siteUrl}${post.image}`],
        ),
      );
    }
  }

  return entries;
}
