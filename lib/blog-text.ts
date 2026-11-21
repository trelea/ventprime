import type { BlogTableData, BlogTextBlockData, BlogTranslation } from "@/lib/blogs";

/** Strip the small amount of inline markup used in translated copy. */
function plain(text: string): string {
  return text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function blockToText(block: BlogTextBlockData): string {
  const body = Array.isArray(block.description)
    ? block.description.map(plain).join("\n")
    : plain(block.description);
  const bullets = block.bullets?.length
    ? `\n${block.bullets.map((item) => `- ${plain(item)}`).join("\n")}`
    : "";

  return `${plain(block.title)}\n${body}${bullets}`.trim();
}

function tableToText(table: BlogTableData): string {
  const lines: string[] = [];

  if (table.title) lines.push(plain(table.title));
  if (table.description) lines.push(plain(table.description));
  lines.push(table.columns.map(plain).join(" | "));
  for (const row of table.rows) {
    lines.push(row.map(plain).join(" | "));
  }
  if (table.caption) lines.push(plain(table.caption));

  return lines.join("\n");
}

/** Full article as readable plain text, used by JSON-LD and llms-full.txt. */
export function articleText(content: BlogTranslation): string {
  const parts: string[] = [plain(content.excerpt)];

  if (content.table) parts.push(tableToText(content.table));
  for (const block of content.additional ?? []) {
    parts.push(blockToText(block));
  }
  if (content.extraTable) parts.push(tableToText(content.extraTable));

  return parts.filter(Boolean).join("\n\n");
}
