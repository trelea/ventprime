import Image from "next/image";
import { NotebookPen } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const features = [
  {
    key: "features.design",
    icon: "/icons/hero/Group%201597883235.svg",
    iconSize: 43,
  },
  {
    key: "features.installation",
    icon: "/icons/hero/Group%201597883223.svg",
    iconSize: 43,
  },
  {
    key: "features.turnkey",
    icon: "/icons/hero/Group%201597883224.svg",
    iconSize: 43,
  },
  {
    key: "features.naturalVentilation",
    icon: "/icons/hero/Frame%201597884953.svg",
    iconSize: 44,
  },
] as const;

function Hero() {
  const t = useTranslations("Hero");

  return (
    <Container
      id="home"
      bgColor="white"
      height="screen"
      className="relative isolate"
      style={{ overflowX: "clip" }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-1/2 w-full lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[58%]"
      >
        <Image
          src="/hero.png"
          alt={t("imageAlt")}
          fill
          preload
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover object-[64%_center]"
        />
        <Image
          src="/hero_layer.svg"
          alt=""
          aria-hidden="true"
          width={1360}
          height={676}
          className="absolute right-0 lg:right-[26px] bottom-[50px] lg:bottom-[-100px] h-auto w-[60%] lg:w-[120%]"
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/4 z-10 h-1/4 bg-linear-to-b from-transparent to-white lg:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[42%] z-10 hidden w-1/3 bg-linear-to-r from-white to-transparent lg:block"
      />

      <div className="relative z-20 flex min-h-screen-safe items-end pt-28 pb-10 sm:pb-14 lg:items-start lg:pt-[180px] lg:pb-20">
        <div className="w-full lg:w-1/2">
          <h1 className="font-gilroy text-[28px] leading-[1.1] font-bold tracking-normal text-black text-pretty sm:text-[38px] sm:leading-[1.2] sm:tracking-[0.02em] lg:text-[46px]">
            {t("title")}
          </h1>

          <p className="mt-[22px] font-inter text-[14px] leading-[1.4] tracking-normal text-black sm:mt-[30px] sm:text-[18px] sm:tracking-[0.02em] lg:text-[20.18px]">
            {t("description")}
          </p>

          <ul className="mt-[22px] grid grid-cols-2 gap-6 sm:mt-[60px] sm:gap-[50px] lg:grid-cols-1 2xl:grid-cols-2">
            {features.map(({ key, icon, iconSize }) => (
              <li key={key} className="flex min-w-0 items-center gap-3">
                <Image
                  src={icon}
                  alt=""
                  aria-hidden="true"
                  width={iconSize}
                  height={iconSize}
                  className="size-9 shrink-0 sm:size-auto"
                />
                <span className="min-w-0 flex-1 font-inter text-[12px] leading-[1.4] tracking-normal text-black sm:text-[16px] sm:tracking-[0.02em]">
                  {t(key)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:mt-[70px] sm:grid-cols-[2fr_3fr] sm:gap-3">
            <Button
              render={
                <a href="tel:+37379717214" aria-label={t("cta.call")} />
              }
              nativeButton={false}
              className="h-14 w-full gap-3 rounded-[14px] bg-[#00B5A4] px-[50px] py-[10px] font-gilroy text-[14px] leading-[28.93px] font-semibold text-white text-center hover:bg-[#009f92] sm:h-auto sm:rounded-[14.4px] sm:px-5 sm:py-3 sm:font-ui sm:text-[19.29px] sm:font-bold"
            >
              <Image
                src="/icons/phone.svg"
                alt=""
                aria-hidden="true"
                width={16}
                height={16}
                className="size-4"
              />
              {t("cta.call")}
            </Button>

            <Button
              render={<Link href={{ pathname: "/", hash: "#contacts" }} />}
              nativeButton={false}
              className="h-14 w-full gap-3 rounded-[14px] bg-[#191919] px-[50px] py-[10px] font-gilroy text-[14px] leading-[28.93px] font-semibold text-white text-center hover:bg-[#303030] sm:h-auto sm:px-5 sm:py-3 sm:font-ui sm:text-[18px] sm:leading-7 sm:font-bold"
            >
              <NotebookPen aria-hidden="true" className="size-5" />
              {t("cta.consultation")}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export { Hero };
