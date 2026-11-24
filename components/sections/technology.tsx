import Image from "next/image";
import { Phone, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { ContactLink } from "@/components/signals/contact-link";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { Link } from "@/i18n/navigation";

function Technology() {
  const t = useTranslations("Technology");
  const images = [{ src: "/technology.png", alt: t("imageAlt") }];
  const thumbnails = images.map((image) => (
    <Image
      key={image.src}
      src={image.src}
      alt={image.alt}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="object-contain"
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
    <Container id="technology" bgColor="grey" height="screen">
      <div className="flex min-h-screen-safe flex-col justify-center py-[50px] sm:py-[40px] md:py-[44px] lg:py-[48px] xl:py-[56px] 2xl:py-[64px] max-[390px]:py-8">
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

            {/* 2. small_desc */}
            <p className="order-2 font-inter text-[14px] leading-[1.4] tracking-normal text-black lg:mt-[75px] lg:text-[16px] lg:tracking-[0.02em]">
              {t("intro")}
            </p>

            {/* 5. main_desc */}
            <div className="order-5 flex flex-col gap-5 lg:mt-[40px] lg:gap-[40px]">
              <p className="font-inter text-[14px] leading-[1.4] tracking-normal text-black lg:text-[16px] lg:tracking-[0.02em]">
                {t("points.intake")}
              </p>
              <p className="font-inter text-[14px] leading-[1.4] tracking-normal text-black lg:text-[16px] lg:tracking-[0.02em]">
                {t("points.exhaust")}
              </p>
              <p className="font-inter text-[14px] leading-[1.4] tracking-normal text-black lg:text-[16px] lg:tracking-[0.02em]">
                {t.rich("points.alwaysOpen", {
                  link: (chunks) => (
                    <Link
                      href="/blogs/natural-ventilation-or-recuperator"
                      className="font-semibold text-primary underline underline-offset-2"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </div>

            {/* 6. buttons */}
            <div className="order-6 mt-5 grid w-full grid-cols-1 gap-2 sm:mt-[60px] sm:grid-cols-[3fr_2fr] sm:gap-[12px] lg:mt-[90px] max-[390px]:mt-6 max-[390px]:gap-2">
              <Button
                render={
                  <ContactLink
                    href="tel:+37379717214"
                    aria-label={t("cta.consultation")}
                    source="technology-phone"
                  />
                }
                nativeButton={false}
                className="h-auto gap-2 rounded-[14.4px] bg-[#00B5A4] p-3 font-gilroy text-[14px] font-semibold leading-[28px] tracking-normal text-white text-center hover:bg-[#009f92] lg:text-[19.29px] lg:font-bold lg:leading-[28.93px] max-[390px]:gap-1.5 max-[390px]:p-2.5 max-[390px]:text-[13px] max-[390px]:leading-6 max-[390px]:whitespace-normal"
              >
                <Phone aria-hidden="true" className="size-5" />
                {t("cta.consultation")}
              </Button>
              <Button
                render={
                  <Link
                    href="/blogs/natural-ventilation-or-recuperator"
                    aria-label={t("cta.details")}
                  />
                }
                nativeButton={false}
                className="h-auto gap-2 rounded-[14.4px] bg-surface-neutral p-3 font-gilroy text-[14px] font-semibold leading-[28px] tracking-normal text-black text-center hover:bg-[#d4d4d4] lg:text-[19.29px] lg:font-bold lg:leading-[28.93px] max-[390px]:gap-1.5 max-[390px]:p-2.5 max-[390px]:text-[13px] max-[390px]:leading-6 max-[390px]:whitespace-normal"
              >
                {t("cta.details")}
                <ChevronRight aria-hidden="true" className="size-5" />
              </Button>
            </div>
          </div>

          {/* Right side (desktop) / interleaved (mobile) */}
          <div className="contents lg:flex lg:w-1/2 lg:flex-col lg:mt-[38px]">
            {/* 3. image container */}
            <div className="order-3">
              <ImageLightbox
                thumbnails={thumbnails}
                previews={previews}
                alts={images.map((image) => image.alt)}
                className="relative aspect-[700/449] w-full overflow-hidden rounded-[22px] border border-black p-5 lg:p-[7.5%] max-[390px]:p-3"
              />
            </div>

            {/* 4. features */}
            <div className="order-4 flex gap-5 lg:mt-[40px] lg:gap-3 max-[390px]:gap-3">
              {[
                { badge: "A", key: "features.a" },
                { badge: "B", key: "features.b" },
              ].map(({ badge, key }) => (
                <div key={key} className="flex flex-1 items-start gap-5 lg:gap-3 max-[390px]:gap-2">
                  <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-primary text-[16px] font-bold text-white lg:size-10 max-[390px]:size-7 max-[390px]:text-[14px]">
                    {badge}
                  </span>
                  <p className="font-inter text-[12px] leading-[1.4] tracking-normal text-black lg:text-[16px] lg:tracking-[0.02em] max-[390px]:text-[11px]">
                    {t(key)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export { Technology };
