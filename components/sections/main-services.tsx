import Image from "next/image";
import { NotebookPen } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { ContactLink } from "@/components/signals/contact-link";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { Link } from "@/i18n/navigation";

const steps = ["consultation", "design", "drilling", "installation"] as const;

const stepImages = ["/services/1.png", "/services/2.png", "/services/3.png"] as const;

function MainServices() {
  const t = useTranslations("MainServices");
  const images = stepImages.map((src, i) => ({
    src,
    alt: t(`imageAlts.${["one", "two", "three"][i]}`),
  }));
  const alts = images.map((image) => image.alt);
  const thumbnails = images.map((image) => (
    <Image
      key={image.src}
      src={image.src}
      alt={image.alt}
      fill
      sizes="(min-width: 1024px) 25vw, 50vw"
      className="object-cover object-center"
    />
  ));
  const previews = images.map((image) => (
    <Image
      key={image.src}
      src={image.src}
      alt={image.alt}
      fill
      sizes="100vw"
      quality={90}
      className="object-contain"
    />
  ));

  return (
    <Container id="services" bgColor="white" height="auto">
      <div className="flex flex-col justify-center pt-[50px] pb-[30px] sm:pt-[60px] sm:pb-[36px] md:pt-[80px] md:pb-[42px] lg:pt-[100px] lg:pb-[48px] xl:pt-[125px] xl:pb-[54px] 2xl:pt-[150px] 2xl:pb-[60px] max-[390px]:pt-8 max-[390px]:pb-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-12 xl:gap-16">
          {/* Left side (desktop) / interleaved (mobile) */}
          <div className="contents lg:flex lg:w-1/2 lg:flex-col">
            {/* 1. label + title */}
            <div className="order-1">
              <span className="font-inter text-[14px] font-bold tracking-[0.02em] text-primary">
                {t("label")}
              </span>
              <h2 className="mt-5 font-gilroy text-[24px] leading-[1.1] font-bold tracking-normal text-black text-pretty sm:text-[28px] sm:leading-[1.1] md:text-[30px] lg:mt-[18px] lg:text-[32px] lg:leading-[1.2] lg:tracking-[0.02em] max-[390px]:text-[22px]">
                {t("title")}
              </h2>
            </div>

            {/* 2. paragraph */}
            <p className="order-2 font-inter text-[14px] leading-[1.4] tracking-normal text-black lg:mt-[16px] lg:text-[16px] lg:tracking-[0.02em]">
              {t("paragraph")}
            </p>

            {/* 5. list container */}
            <div className="order-5 lg:mt-[42px]">
              <h3 className="font-gilroy text-[20px] font-bold tracking-[0.02em] text-black lg:text-[24px]">
                {t("steps.title")}
              </h3>
              <ul className="mt-5 flex flex-col gap-5 lg:mt-[20px] lg:gap-[16px] max-[390px]:mt-4 max-[390px]:gap-3">
                {steps.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="shrink-0 font-inter text-[14px] font-bold leading-[1.4] tracking-normal text-black lg:text-[16px]">
                      {i + 1}.
                    </span>
                    <p className="font-inter text-[14px] leading-[1.4] tracking-normal text-black lg:text-[16px]">
                      <span className="font-bold">{t(`steps.${step}.title`)}</span>{" "}
                      {t(`steps.${step}.desc`)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* 6. buttons */}
            <div className="order-6 mt-5 grid w-full grid-cols-1 gap-2 sm:mt-[60px] sm:grid-cols-[2fr_3fr] sm:gap-[12px] lg:mt-[110px]">
              <Button
                render={
                  <ContactLink
                    href="tel:+37379717214"
                    aria-label={t("cta.call")}
                    source="main-services-phone"
                  />
                }
                nativeButton={false}
                className="h-14 w-full gap-3 rounded-[14px] bg-[#00B5A4] px-[50px] py-[10px] font-gilroy text-[14px] leading-[28.93px] font-semibold text-white text-center hover:bg-[#009f92] sm:h-auto sm:rounded-[14.4px] sm:px-5 sm:py-3 sm:text-[19.29px] sm:font-bold max-[390px]:h-12 max-[390px]:gap-2 max-[390px]:rounded-[12px] max-[390px]:px-4 max-[390px]:py-2 max-[390px]:text-[13px] max-[390px]:leading-7 max-[390px]:whitespace-normal"
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
                render={
                  <Link
                    href={{ pathname: "/", hash: "#contacts" }}
                    scroll={false}
                    aria-label={t("cta.consultation")}
                  />
                }
                nativeButton={false}
                className="h-14 w-full gap-3 rounded-[14px] bg-[#191919] px-[50px] py-[10px] font-gilroy text-[14px] leading-[28.93px] font-semibold text-white text-center hover:bg-[#303030] sm:h-auto sm:px-5 sm:py-3 sm:text-[18px] sm:leading-7 sm:font-bold max-[390px]:h-12 max-[390px]:gap-2 max-[390px]:px-4 max-[390px]:py-2 max-[390px]:text-[13px] max-[390px]:leading-6 max-[390px]:whitespace-normal"
              >
                <NotebookPen aria-hidden="true" className="size-5" />
                {t("cta.consultation")}
              </Button>
            </div>
          </div>

          {/* Right side (desktop) / interleaved (mobile) */}
          <div className="contents lg:flex lg:w-1/2 lg:flex-col lg:mt-[38px]">
            {/* 3. card grid */}
            <div className="order-3">
              <div className="grid grid-cols-2 grid-rows-2 gap-[10px] max-[390px]:gap-2">
                {images.map((image, i) => (
                  <ImageLightbox
                    key={image.src}
                    thumbnails={thumbnails}
                    previews={previews}
                    alts={alts}
                    index={i}
                    className="relative min-h-[15rem] overflow-hidden rounded-[22px] max-[390px]:min-h-[11rem] max-[390px]:rounded-[16px] border border-transparent lg:h-auto lg:aspect-square"
                  />
                ))}
                {/* 4th card — no electricity (same style as benefits cards) */}
                <div className="flex h-full min-h-[17rem] min-w-0 flex-col justify-between overflow-hidden rounded-[11px] border border-transparent p-[11.33px] [background:linear-gradient(#00B5A4,#00B5A4)_padding-box,linear-gradient(143.58deg,#00E3CD_2.08%,#06C1AF_82.22%)_border-box] sm:min-h-[15rem] sm:rounded-[14px] sm:p-4 md:min-h-[15rem] md:rounded-[16px] md:p-5 lg:h-auto lg:min-h-0 lg:aspect-square lg:rounded-[22px] lg:p-6 xl:rounded-[24px] xl:p-7 2xl:rounded-[26px] 2xl:p-8 max-[390px]:min-h-[13rem] max-[390px]:rounded-[14px] max-[390px]:p-3">
                  <Image
                    src="/icons/main-services/no-electricity.svg"
                    alt=""
                    aria-hidden="true"
                    width={66}
                    height={66}
                    className="size-11 sm:size-12 md:size-13 lg:size-14 xl:size-15 2xl:size-16 max-[390px]:size-9"
                  />
                  <div>
                    <h3 className="font-inter text-[16px] leading-[1.4] font-bold tracking-normal text-white sm:text-[17px] md:text-[17px] lg:text-[18px] max-[390px]:text-[14px]">
                      {t("card.title")}
                    </h3>
                    <p className="mt-[6.67px] line-clamp-4 font-inter text-[14px] leading-[1.4] tracking-normal text-white sm:mt-[8px] sm:text-[15px] md:mt-[9px] md:text-[15px] lg:mt-[10px] lg:text-[16px] max-[390px]:mt-1 max-[390px]:text-[13px]">
                      {t("card.desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export { MainServices };
