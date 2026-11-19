"use client";

import {
  BadgePercent,
  Droplets,
  Flame,
  Home,
  Phone,
  Sparkles,
  Wind,
  Wrench,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const icons = [
  Home,
  Sparkles,
  Wind,
  Flame,
  Droplets,
  Wrench,
  Phone,
  BadgePercent,
] as const;

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion className="w-full">
      {items.map((item, index) => {
        const Icon = icons[index] ?? Sparkles;

        return (
          <AccordionItem
            key={item.question}
            value={`item-${index}`}
            className="border-b border-border"
          >
            <AccordionTrigger className="py-[20px] font-inter text-[14px] leading-[140%] font-normal tracking-normal text-black no-underline hover:no-underline sm:text-[20px] sm:leading-[28px]">
              <span className="flex items-start gap-4">
                <Icon
                  aria-hidden="true"
                  className="mt-[2px] size-6 shrink-0 text-primary"
                />
                <span>{item.question}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pl-10 pb-[20px] font-inter text-[14px] leading-[140%] font-normal tracking-normal text-muted-foreground sm:text-[20px] sm:leading-[28px]">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

export { FaqAccordion };
export type { FaqItem };
