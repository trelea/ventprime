import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { FaqAccordion, type FaqItem } from "@/components/ui/faq-accordion";

function FAQ() {
  const t = useTranslations("FAQ");
  const items = t.raw("items") as FaqItem[];

  return (
    <Container id="faq" bgColor="white" height="screen">
      <div className="flex min-h-screen-safe flex-col justify-center gap-[30px] py-[50px] sm:py-[40px] md:py-[44px] lg:py-[80px] max-[390px]:gap-5 max-[390px]:py-8">
        <h2 className="font-gilroy text-[24px] leading-[1.1] font-bold tracking-normal text-black text-pretty sm:text-[28px] sm:leading-[1.1] md:text-[30px] lg:text-[32px] lg:leading-[1.2] lg:tracking-[0.02em] max-[390px]:text-[22px]">
          {t("title")}
        </h2>
        <FaqAccordion items={items} />
      </div>
    </Container>
  );
}

export { FAQ };
