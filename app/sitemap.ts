import type { MetadataRoute } from "next";
import { articlePaths, routing, type LocalizedPath } from "@/i18n/routing";
import { absoluteLocalizedPath } from "@/lib/seo";

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

function localizedEntry(
  href: LocalizedPath,
  locale: (typeof routing.locales)[number],
  changeFrequency: ChangeFrequency,
  priority: number,
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};

  for (const candidate of routing.locales) {
    languages[candidate] = absoluteLocalizedPath(href, candidate);
  }
  languages["x-default"] = absoluteLocalizedPath(href, routing.defaultLocale);

  return {
    url: absoluteLocalizedPath(href, locale),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push(localizedEntry("/", locale, "monthly", 1));
    entries.push(localizedEntry("/blogs", locale, "weekly", 0.8));

    for (const path of articlePaths) {
      entries.push(localizedEntry(path, locale, "monthly", 0.6));
    }
  }

  return entries;
}
