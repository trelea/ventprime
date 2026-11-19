import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { WhyChooseUsCard } from "@/components/ui/why-choose-us-card";

const cards = [
  { key: "experience", icon: "/icons/why-choose-us/Group%201597883226.svg" },
  { key: "turnkey", icon: "/icons/why-choose-us/Group%201597883224.svg" },
  { key: "effective", icon: "/icons/why-choose-us/Group%201597883225.svg" },
  { key: "installation", icon: "/icons/why-choose-us/Group%201597883223.svg" },
] as const;

function WhyChooseUs() {
  const t = useTranslations("WhyChooseUs");

  return (
    <Container id="why-choose-us" bgColor="white" height="auto">
      <div className="flex flex-col gap-[30px] py-[50px] sm:py-[40px] md:py-[44px] lg:py-[80px] xl:py-[80px] 2xl:py-[80px]">
        <h2 className="font-gilroy text-[24px] leading-[1.1] font-bold tracking-normal text-black text-pretty sm:text-[28px] sm:leading-[1.1] md:text-[30px] lg:text-[32px] lg:leading-[1.2] lg:tracking-[0.02em]">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 auto-rows-fr gap-[22px] sm:grid-cols-2">
          {cards.map(({ key, icon }) => (
            <WhyChooseUsCard
              key={key}
              title={t(`cards.${key}.title`)}
              description={t(`cards.${key}.desc`)}
              icon={icon}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

export { WhyChooseUs };
