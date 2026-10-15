import { getLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services-section";
import { StatsSection } from "@/components/sections/stats-section";
import { AboutSection } from "@/components/sections/about-section";
import { TechSection } from "@/components/sections/tech-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { BeforeAfterSection } from "@/components/sections/before-after-section";
import { ContactsSection } from "@/components/sections/contacts-section";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema, organizationSchema, aggregateRatingSchema } from "@/lib/seo";
import { serviceKeys, type ServiceKey } from "@/lib/services";
import type { Locale } from "@/i18n/routing";

/**
 * Home page — HERO · SERVICES · STATS · ABOUT · TECH · FEEDBACK · CONTACTS
 * in the order fixed by AGENTS.md §5.
 */
export default async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const tFaq = await getTranslations("Tech.faq.items");
  const tServices = await getTranslations("Services.items");

  const faqItems = Array.from({ length: 5 }, (_, index) => ({
    question: tFaq(`${index}.question` as never) as unknown as string,
    answer: tFaq(`${index}.answer` as never) as unknown as string,
  }));

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
      <AboutSection />
      <TechSection />
      <TestimonialsSection />
      <BeforeAfterSection />
      <ContactsSection />
    </>
  );
}