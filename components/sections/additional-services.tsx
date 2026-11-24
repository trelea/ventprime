import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { ServiceCard } from "@/components/ui/service-card";

const cards = [
  { type: "grey", key: "ozone" },
  { type: "grey", key: "condensation" },
  { type: "grey", key: "humidity" },
  { type: "grey", key: "bathroom" },
  { type: "green", key: "kitchen" },
] as const;

const serviceArticles = {
  ozone: "/blogs/ozone-treatment-when-it-helps",
  condensation: "/blogs/why-windows-fog-up-in-winter",
  humidity: "/blogs/natural-ventilation-or-recuperator",
  bathroom: "/blogs/fresh-air-with-closed-windows",
  kitchen: "/blogs/fresh-air-with-closed-windows",
} as const;

function AdditionalServices() {
  const t = useTranslations("AdditionalServices");

  return (
    <Container id="additional-services" bgColor="white" height="auto">
      <div className="flex flex-col gap-[30px] pt-[30px] pb-[50px] sm:pt-[36px] sm:pb-[60px] md:pt-[42px] md:pb-[80px] lg:pt-[48px] lg:pb-[100px] xl:pt-[54px] xl:pb-[125px] 2xl:pt-[60px] 2xl:pb-[150px] max-[390px]:gap-5 max-[390px]:pt-6 max-[390px]:pb-8">
        <h2 className="font-gilroy text-[24px] leading-[1.1] font-bold tracking-normal text-black text-pretty sm:text-[28px] sm:leading-[1.1] md:text-[30px] lg:text-[32px] lg:leading-[1.2] lg:tracking-[0.02em] max-[390px]:text-[22px]">
          {t("title")}
        </h2>
        <div className="flex flex-col gap-5 max-[390px]:gap-3">
          <div className="grid grid-cols-1 gap-5 max-[390px]:gap-3 sm:grid-cols-2">
            {cards.slice(0, 2).map(({ type, key }) => (
              <ServiceCard
                key={key}
                type={type}
                source={key}
                title={t(`cards.${key}.title`)}
                description={t(`cards.${key}.desc`)}
                ctaLabel={
                  type === "green" ? t("cta.contact") : t("cta.details")
                }
                href={serviceArticles[key]}
              />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-5 max-[390px]:gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cards.slice(2).map(({ type, key }, i, arr) => (
              <div
                key={key}
                className={
                  i === arr.length - 1
                    ? "sm:col-span-2 lg:col-span-1"
                    : undefined
                }
              >
                <ServiceCard
                  type={type}
                  source={key}
                  title={t(`cards.${key}.title`)}
                  description={t(`cards.${key}.desc`)}
                  ctaLabel={
                    type === "green" ? t("cta.contact") : t("cta.details")
                  }
                  href={serviceArticles[key]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export { AdditionalServices };
