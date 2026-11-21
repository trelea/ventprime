import en from "../../messages/en.json";
import ro from "../../messages/ro.json";
import ru from "../../messages/ru.json";
import { routing } from "@/i18n/routing";
import { blogPosts } from "@/lib/blogs";
import { absoluteLocalizedPath, isoDate, site } from "@/lib/seo";

const messages = { en, ro, ru };

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS 2.0 feed of every localized article, for feed readers and crawlers. */
export function GET() {
  const items = routing.locales.flatMap((locale) =>
    blogPosts.map((post) => {
      const content = post.translations[locale];
      const url = absoluteLocalizedPath(post.path, locale);

      return `    <item>
      <title>${escapeXml(content.metaTitle)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(content.metaDescription)}</description>
      <pubDate>${new Date(isoDate(post.date)).toUTCString()}</pubDate>
      <category>${locale}</category>
    </item>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.name)} blog</title>
    <link>${escapeXml(absoluteLocalizedPath("/blogs", routing.defaultLocale))}</link>
    <description>${escapeXml(messages.en.Seo.blogDescription)}</description>
    <language>en</language>
    <managingEditor>${escapeXml(site.email)}</managingEditor>
${items.join("\n")}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
