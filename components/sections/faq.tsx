import { getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * FAQ accordion (AGENTS.md §5.5 Block D).
 *
 * `keepMounted` is essential: the answers stay in the DOM so they are present
 * in the served HTML for crawlers and for users without JS — the accordion only
 * hides them visually.
 */
export async function FaqList({
  items,
  idPrefix = "faq",
}: {
  items: { question: string; answer: string }[];
  idPrefix?: string;
}) {
  return (
    <Accordion keepMounted className="w-full">
      {items.map((item, index) => (
        <AccordionItem key={item.question} value={`${idPrefix}-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionPanel>{item.answer}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/** Reads the FAQ entries out of a message namespace. */
export async function TechFaq() {
  const t = await getTranslations("Tech.faq.items");
  const count = 5;

  const items = Array.from({ length: count }, (_, index) => ({
    question: t(`${index}.question` as never) as unknown as string,
    answer: t(`${index}.answer` as never) as unknown as string,
  }));

  return <FaqList items={items} idPrefix="tech-faq" />;
}