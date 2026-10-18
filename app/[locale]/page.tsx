import { getLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TechSection } from "@/components/sections/tech-section";
import { AboutSection } from "@/components/sections/about-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection, getFaqItems } from "@/components/sections/faq-section";
import { CostCalculatorSection } from "@/components/sections/cost-calculator-section";
import { JsonLd } from "@/components/seo/json-ld";
import {
  faqSchema,
  organizationSchema,
  aggregateRatingSchema,
} from "@/lib/seo";
import { serviceKeys, type ServiceKey } from "@/lib/services";
import type { Locale } from "@/i18n/routing";

/**
 * Home page — HERO · SERVICES · STATS · TECH · ABOUT · FEEDBACK · FAQ · COST CALCULATOR
 */
export default async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const tServices = await getTranslations("Services.items");
  const faqItems = await getFaqItems(locale);

  const serviceNames = Object.fromEntries(
    serviceKeys.map((key) => [key, tServices(`${key}.title` as never)]),
  ) as Record<ServiceKey, string>;

  return (
    <>
      <JsonLd data={organizationSchema(locale, serviceNames)} />
      <JsonLd data={aggregateRatingSchema()} />
      <JsonLd data={faqSchema(faqItems)} />

      <Hero />
      <ServicesSection />
      <StatsSection locale={locale} />
      <TechSection />
      <AboutSection />
      <TestimonialsSection />
      <FaqSection />
      <CostCalculatorSection />
    </>
  );
}
