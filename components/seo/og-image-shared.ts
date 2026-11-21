import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "VentPrime";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export function resolveLocale(locale: string) {
  return hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
}

const fontDir = join(
  process.cwd(),
  "public/assets/Gilroy_font/Gilroy_font",
);

/** Gilroy carries Latin, Romanian and Cyrillic glyphs used by the site. */
export const fonts = Promise.all([
  readFile(join(fontDir, "Gilroy-Semibold_0.ttf")),
  readFile(join(fontDir, "Gilroy-Regular_0.ttf")),
]).then(([semibold, regular]) => [
  {
    name: "Gilroy",
    data: semibold,
    weight: 600 as const,
    style: "normal" as const,
  },
  {
    name: "Gilroy",
    data: regular,
    weight: 400 as const,
    style: "normal" as const,
  },
]);
