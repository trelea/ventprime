import type { Metadata } from "next";
import { Geist, IBM_Plex_Sans, Inter, Manrope } from "next/font/google";
import localFont from "next/font/local";
import { DevalonSignal } from "@devalon.dev/credits/signals";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { JsonLd } from "@/components/seo/json-ld";
import { devalonSignalMeta } from "@/lib/devalon";
import { pageMetadata, site, siteUrl } from "@/lib/seo";
import { siteJsonLd } from "@/lib/structured-data";
import "lenis/dist/lenis.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const inter = Inter({
  variable: "--inter",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--manrope",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const gilroy = localFont({
  src: [
    {
      path: "../../public/assets/Gilroy_font/Gilroy_font/Gilroy-Regular_0.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/Gilroy_font/Gilroy_font/Gilroy-Medium_0.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/Gilroy_font/Gilroy_font/Gilroy-Semibold_0.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/assets/Gilroy_font/Gilroy_font/Gilroy-Extrabold_0.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gilroy-local",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Seo" });

  return {
    metadataBase: siteUrl,
    applicationName: site.name,
    icons: {
      icon: { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
    },
    ...pageMetadata({
      locale,
      path: "/",
      title: t("homeTitle"),
      description: t("homeDescription"),
    }),
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Seo" });
  const main = await getTranslations({ locale, namespace: "MainServices" });
  const extra = await getTranslations({
    locale,
    namespace: "AdditionalServices",
  });

  const services = [
    { name: main("title"), description: main("paragraph") },
    ...(
      ["ozone", "condensation", "humidity", "bathroom", "kitchen"] as const
    ).map((key) => ({
      name: extra(`cards.${key}.title`),
      description: extra(`cards.${key}.desc`),
    })),
  ];

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${plex.variable} ${inter.variable} ${manrope.variable} ${gilroy.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DevalonSignal meta={devalonSignalMeta} />
        <JsonLd value={siteJsonLd(locale, t("homeDescription"), services)} />
        <NextIntlClientProvider>
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer locale={locale} />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
