import en from "../../messages/en.json";
import ro from "../../messages/ro.json";
import ru from "../../messages/ru.json";
import { routing } from "@/i18n/routing";
import { articleText } from "@/lib/blog-text";
import { blogPosts } from "@/lib/blogs";
import { absoluteLocalizedPath, site, siteUrl } from "@/lib/seo";

const messages = { en, ro, ru };

function plain(text: string): string {
  return text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

/** Everything a search engine or AI answer engine might need, in plain text. */
export function GET() {
  const lines: string[] = [
    `# ${site.name} — full site content`,
    "",
    `Canonical URL: ${siteUrl}`,
    `Phone: ${messages.en.Nav.call}`,
    `Email: ${site.email}`,
    `Address: ${site.street}, ${site.city}, Moldova`,
    `Service area: Moldova`,
    "",
  ];

  for (const locale of routing.locales) {
    const m = messages[locale];

    lines.push(`# ${locale.toUpperCase()}`, "");

    lines.push(`## ${m.Seo.homeTitle}`);
    lines.push(plain(m.Hero.description), "");
    lines.push(plain(m.AboutUs.title));
    for (const key of ["p1", "p2", "p3"] as const) {
      lines.push(plain(m.AboutUs[key]));
    }
    lines.push("");

    lines.push(`## ${m.Technology.title}`);
    lines.push(plain(m.Technology.intro));
    for (const key of ["intake", "exhaust", "alwaysOpen"] as const) {
      lines.push(`- ${plain(m.Technology.points[key])}`);
    }
    lines.push("");

    lines.push(`## ${m.MainServices.title}`);
    lines.push(plain(m.MainServices.paragraph));
    lines.push(`${m.MainServices.steps.title}`);
    for (const key of [
      "consultation",
      "design",
      "drilling",
      "installation",
    ] as const) {
      lines.push(`- ${m.MainServices.steps[key].title}: ${m.MainServices.steps[key].desc}`);
    }
    lines.push("");

    lines.push(m.AdditionalServices.title);
    for (const key of [
      "ozone",
      "condensation",
      "humidity",
      "bathroom",
      "kitchen",
    ] as const) {
      const card = m.AdditionalServices.cards[key];
      lines.push(`- ${card.title}: ${card.desc}`);
    }
    lines.push("");

    lines.push(`## ${m.Contacts.pricing.title}`);
    lines.push(
      `- ${m.Contacts.pricing.valve}: ${m.Contacts.pricing.valvePrice} ${m.Contacts.pricing.valveUnit}`,
    );
    lines.push(
      `- ${m.Contacts.pricing.treatment}: ${m.Contacts.pricing.treatmentPrice} ${m.Contacts.pricing.treatmentUnit}`,
    );
    lines.push(plain(m.Contacts.notes.calculation));
    lines.push(
      `${m.Contacts.notes.discount} — ${plain(m.Contacts.notes.discountText)}`,
    );
    lines.push("");

    lines.push("## FAQ");
    for (const item of m.FAQ.items) {
      lines.push(`Q: ${plain(item.question)}`);
      lines.push(`A: ${plain(item.answer)}`, "");
    }

    lines.push("## Articles", "");
    for (const post of blogPosts) {
      const content = post.translations[locale];
      lines.push(`### ${content.title}`);
      lines.push(`URL: ${absoluteLocalizedPath(post.path, locale)}`);
      lines.push(
        `Published: ${post.date} | Reading time: ${post.readMinutes} min`,
        "",
      );
      lines.push(articleText(content), "");
    }
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
