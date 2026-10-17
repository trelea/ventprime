import {
  BadgePercent,
  Droplets,
  Flame,
  Home,
  PhoneCall,
  Sparkles,
  Wind,
  Wrench,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { formatMDLCurrency } from "@/lib/currency";
import { site } from "@/lib/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AuroraText } from "@/components/ui/aurora-text";
import { Section } from "@/components/sections/section";

const AURORA_COLORS_LIGHT = ["#1E6FB8", "#10b981", "#0F2E4D"];

const FAQ_ICONS = [
  Home,
  Sparkles,
  Wind,
  Flame,
  Droplets,
  Wrench,
  PhoneCall,
  BadgePercent,
] as const;

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Resolves the curated FAQ items for the given locale, interpolating MDL
 * prices via `formatMDLCurrency`. Shared between `FaqSection` and the Home
 * page `FAQPage` JSON-LD schema.
 */
export async function getFaqItems(locale: string): Promise<FaqItem[]> {
  const t = await getTranslations("Faq");
  const rawItems = t.raw("items") as FaqItem[];

  const roomPrice = formatMDLCurrency(site.valveInstallationPrice * 2, locale);
  const moldPromoPrice = formatMDLCurrency(400, locale);
  const moldRegularPrice = formatMDLCurrency(800, locale);

  return rawItems.map((item) => ({
    question: item.question,
    answer: item.answer
      .replaceAll("{roomPrice}", roomPrice)
      .replaceAll("{moldPromoPrice}", moldPromoPrice)
      .replaceAll("{moldRegularPrice}", moldRegularPrice),
  }));
}

/**
 * FAQ (`#intrebari`) — single-column shadcn Accordion with simple icon + question.
 */
export async function FaqSection() {
  const locale = await getLocale();
  const t = await getTranslations("Faq");
  const items = await getFaqItems(locale);

  return (
    <Section
      id="intrebari"
      tone="surface"
      className="min-h-screen-safe flex flex-col justify-center rounded-[1.75rem] shadow-lg shadow-black/10 sm:rounded-[3rem] lg:rounded-[72px]"
    >
      <h2 className="font-display text-center text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
        <AuroraText colors={AURORA_COLORS_LIGHT}>{t("title")}</AuroraText>
      </h2>

      <Accordion keepMounted className="mt-12 w-full">
        {items.map((item, index) => {
          const Icon = FAQ_ICONS[index] ?? Wind;

          return (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger className="py-5 text-lg font-semibold sm:text-xl">
                <span className="flex items-center gap-4">
                  <Icon className="text-brand-blue size-6 shrink-0 sm:size-7" />
                  <span>{item.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-lg sm:text-xl">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Section>
  );
}
