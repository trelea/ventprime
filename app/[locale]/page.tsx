import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { Benefits } from "@/components/sections/benefits";
import { Technology } from "@/components/sections/technology";
import { MainServices } from "@/components/sections/main-services";
import { AdditionalServices } from "@/components/sections/additional-services";
import { AboutUs } from "@/components/sections/about-us";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Contacts } from "@/components/sections/contacts";
import { JsonLd } from "@/components/seo/json-ld";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { faqJsonLd } from "@/lib/structured-data";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Seo" });

  return pageMetadata({
    locale,
    path: "/",
    title: t("homeTitle"),
    description: t("homeDescription"),
  });
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "FAQ" });
  const faqItems = t.raw("items") as Array<{
    question: string;
    answer: string;
  }>;

  return (
    <>
      <JsonLd value={faqJsonLd(locale, faqItems)} />
      <Hero />
      <Benefits />
      <Technology />
      <MainServices />
      <AdditionalServices />
      <AboutUs />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Contacts />
    </>
  );
}
