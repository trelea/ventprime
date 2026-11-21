import en from "../../messages/en.json";
import ro from "../../messages/ro.json";
import ru from "../../messages/ru.json";
import { routing } from "@/i18n/routing";
import { blogPosts } from "@/lib/blogs";
import { absoluteLocalizedPath, site, siteUrl } from "@/lib/seo";

const messages = { en, ro, ru };

/** Concise, AI-readable index of every page, in every locale. */
export function GET() {
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${messages.en.Seo.homeDescription}`,
    "",
    `- Website: ${siteUrl}`,
    `- Phone: ${messages.en.Nav.call}`,
    `- Email: ${site.email}`,
    `- Address: ${site.street}, ${site.city}, Moldova`,
    "- Service area: Moldova",
    "",
    "## Pages",
    "",
  ];

  for (const locale of routing.locales) {
    const m = messages[locale];

    lines.push(`### ${locale.toUpperCase()}`);
    lines.push(
      `- [Home](${absoluteLocalizedPath("/", locale)}): ${m.Seo.homeTitle}`,
    );
    lines.push(
      `- [Blog](${absoluteLocalizedPath("/blogs", locale)}): ${m.Seo.blogDescription}`,
    );

    for (const post of blogPosts) {
      const content = post.translations[locale];
      lines.push(
        `- [${content.metaTitle}](${absoluteLocalizedPath(post.path, locale)}): ${content.metaDescription}`,
      );
    }
    lines.push("");
  }

  lines.push("## Full text", "");
  lines.push(`- [llms-full.txt](${siteUrl}/llms-full.txt)`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
