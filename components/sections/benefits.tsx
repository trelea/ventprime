import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";

const listItems = [
  "list.freshAirHeat",
  "list.noCondensation",
  "list.manualControl",
  "list.noStuffiness",
  "list.silent",
] as const;

const cards = [
  {
    titleKey: "cards.freshAir.title",
    descKey: "cards.freshAir.desc",
    icon: "/icons/benefits/Frame%201597884955.svg",
  },
  {
    titleKey: "cards.noMoisture.title",
    descKey: "cards.noMoisture.desc",
    icon: "/icons/benefits/Frame%201597884954.svg",
  },
  {
    titleKey: "cards.noElectricity.title",
    descKey: "cards.noElectricity.desc",
    icon: "/icons/benefits/Frame%201597884957.svg",
  },
  {
    titleKey: "cards.noDrafts.title",
    descKey: "cards.noDrafts.desc",
    icon: "/icons/benefits/Frame%201597884962.svg",
  },
] as const;

function Benefits() {
  const t = useTranslations("Benefits");

  return (
    <Container bgColor="green" height="screen">
      <div className="flex min-h-screen-safe flex-col justify-center py-[32px] sm:py-[40px] md:py-[44px] lg:py-[48px] xl:py-[56px] 2xl:py-[64px]">
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
          <div className="contents lg:flex lg:w-1/2 lg:flex-col lg:justify-between lg:gap-8">
            <div className="order-1 pr-0 lg:pr-28">
              <h2 className="font-gilroy text-[24px] leading-[1.2] font-bold tracking-[0.02em] text-pretty sm:text-[28px] md:text-[30px] lg:text-[32px] xl:text-[34px] 2xl:text-[36px]">
                {t("title")}
              </h2>
              <p className="mt-[20px] font-inter text-[14px] leading-[1.4] tracking-normal sm:text-[16px] md:text-[17px] lg:text-[18px]">
                {t("description")}
              </p>
            </div>

            <ul className="order-3 w-full lg:w-fit lg:max-w-full">
              {listItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b border-white pt-[17px] pr-[18px] pb-[17px] pl-0"
                >
                  <BadgeCheck
                    aria-hidden="true"
                    className="size-5 shrink-0 text-white"
                  />
                  <span className="font-inter text-[16px] leading-[1.4] tracking-[0.02em]">
                    {t(item)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-2 lg:w-1/2">
            <div className="grid grid-cols-2 grid-rows-2 gap-[10px]">
              {cards.map(({ titleKey, descKey, icon }) => (
                <div
                  key={titleKey}
                  className="flex h-full min-h-[17rem] min-w-0 flex-col justify-between overflow-hidden rounded-[11px] border border-transparent p-[11.33px] [background:linear-gradient(#06C1AF,#06C1AF)_padding-box,linear-gradient(143.58deg,#00E3CD_2.08%,#06C1AF_82.22%)_border-box] sm:min-h-[15rem] sm:rounded-[14px] sm:p-4 md:min-h-[15rem] md:rounded-[16px] md:p-5 lg:h-auto lg:min-h-0 lg:aspect-square lg:rounded-[22px] lg:p-6 xl:rounded-[24px] xl:p-7 2xl:rounded-[26px] 2xl:p-8"
                >
                  <Image
                    src={icon}
                    alt=""
                    aria-hidden="true"
                    width={44}
                    height={44}
                    className="size-11 sm:size-12 md:size-13 lg:size-14 xl:size-15 2xl:size-16"
                  />
                  <div>
                    <h3 className="font-inter text-[16px] leading-[1.4] font-bold tracking-normal sm:text-[17px] md:text-[17px] lg:text-[18px]">
                      {t(titleKey)}
                    </h3>
                    <p className="mt-[6.67px] line-clamp-4 font-inter text-[14px] leading-[1.4] tracking-normal sm:mt-[8px] sm:text-[15px] md:mt-[9px] md:text-[15px] lg:mt-[10px] lg:text-[16px]">
                      {t(descKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export { Benefits };
