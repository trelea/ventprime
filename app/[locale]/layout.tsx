import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Manrope, Onest } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { site } from "@/lib/site";
import "../globals.css";

/**
 * Two-family type system (AGENTS.md §8).
 *
 * `manrope` — the display face. Headlines, the hero, stat numbers and body
 * copy. Warm, slightly geometric, good at large sizes.
 *
 * `plex` — the UI face. Navigation, buttons, form controls, labels, badges
 * and the footer: the chrome layer. IBM Plex Sans is engineered and technical
 * with distinctive terminals — visibly different from Manrope, which is what
 * the previous UI faces (Onest, Geist) were not — and it stays legible at the
 * 15px UI sizes below.
 *
 * `jetbrains` — the micro-label face. Small uppercase labels only (section
 * eyebrows, the sheet's "SERVICII" heading). Monospace micro-labels are what
 * make the chrome read as technical without changing the body face.
 *
 * ⚠️  All three MUST keep `cyrillic` in `subsets`. The navbar renders Russian
 * ("Услуги", "Отзывы", "Свяжитесь с нами") and Romanian diacritics, so dropping
 * it would silently fall back to a system font for those visitors. Plenty of
 * trendy minimal fonts (Figtree, DM Sans, Space Grotesk, Instrument Sans,
 * Outfit, Plus Jakarta Sans, Sora, Satoshi) have no Cyrillic at all and cannot
 * be used here.
 */
const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const plex = IBM_Plex_Sans({
  variable: "--font-ui",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

/**
 * `onest` — the display face, used by exactly one element: the hero's headline
 * (`components/sections/hero.tsx`).
 *
 * Manrope, the body face, is a variable font whose axis stops at 800, so
 * `font-extrabold` was already its ceiling and the headline could not be made
 * any heavier. Onest is also variable but reaches 900, and the headline uses
 * `font-black` to spend that.
 *
 * Cyrillic is not optional here either: the headline is one of the strings that
 * renders in Russian ("Вентиляция без электричества"). Onest was this project's
 * UI face before the switch to IBM Plex Sans, so it is a known quantity rather
 * than a new dependency — but it is loaded only for this one weight's worth of
 * glyphs, on one element.
 */
const onest = Onest({
  variable: "--font-display",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t("home.title"),
      template: `%s | ${site.name}`,
    },
    description: t("home.description"),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((candidate) => [candidate, `/${candidate}`]),
      ),
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale,
      url: `/${locale}`,
      title: t("home.title"),
      description: t("home.description"),
      images: [{ url: "/images/og-image.webp", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("home.title"),
      description: t("home.description"),
      images: ["/images/og-image.webp"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const tNav = await getTranslations("Nav");

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${onest.variable} ${plex.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="bg-brand-green sr-only rounded-md px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
          >
            {tNav("skipToContent")}
          </a>

          <SiteHeader />

          <main id="main" className="flex-1">
            {children}
          </main>

          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}