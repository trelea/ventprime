import type { MetadataRoute } from "next";
import { routing, type LocalizedPath } from "@/i18n/routing";
import { blogPosts } from "@/lib/blogs";
import { absoluteLocalizedPath, isoDate, siteUrl } from "@/lib/seo";

/** Fixed date keeps the sitemap statically cacheable; articles use their own. */
const siteUpdatedAt = new Date("2026-11-14T00:00:00.000Z");

type Locale = (typeof routing.locales)[number];
type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

function localizedEntry(
  href: LocalizedPath,
  locale: Locale,
  changeFrequency: ChangeFrequency,
  priority: number,
  lastModified: Date = siteUpdatedAt,
  images?: string[],
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};

  for (const candidate of routing.locales) {
    languages[candidate] = absoluteLocalizedPath(href, candidate);
  }
  languages["x-default"] = absoluteLocalizedPath(href, routing.defaultLocale);

  return {
    url: absoluteLocalizedPath(href, locale),
    lastModified,
    changeFrequency,
    priority,
    images,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push(localizedEntry("/", locale, "monthly", 1));
    entries.push(localizedEntry("/blogs", locale, "weekly", 0.8));

    for (const post of blogPosts) {
      entries.push(
        localizedEntry(
          post.path,
          locale,
          "monthly",
          0.6,
          new Date(isoDate(post.date)),
          [`${siteUrl}${post.image}`],
        ),
      );
    }
  }

  return entries;
}
