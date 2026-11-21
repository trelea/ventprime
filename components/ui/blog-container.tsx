import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { LocalizedPath } from "@/i18n/routing";

type BlogContainerProps = {
  img: string;
  date: string;
  read: number;
  title: string;
  description: string;
  href: LocalizedPath;
  imagePosition?: "top" | "center" | "bottom";
};

const objectPositionClasses = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
} as const;

function BlogContainer({
  img,
  date,
  read,
  title,
  description,
  href,
  imagePosition = "center",
}: BlogContainerProps) {
  const t = useTranslations("Blogs");
  const readMoreLabel = t("readMore");
  const chipClassName =
    "inline-flex w-auto items-center justify-center whitespace-nowrap rounded-[10px] bg-[#EAE9E9] px-[16px] py-[7px] text-center align-middle font-ui text-[13px] leading-[19.21px] font-medium tracking-normal text-black sm:w-[136px] sm:px-[20px] md:w-[144px] md:px-[22px] md:py-[8px] md:text-[14px] lg:w-[150px] lg:px-[24px] max-[390px]:px-3 max-[390px]:text-[12px]";

  return (
    <Container bgColor="white" height="auto">
      <article className="flex flex-col gap-[24px] text-black sm:gap-[28px] md:gap-[32px] lg:gap-[36px] xl:gap-[40px] max-[390px]:gap-5">
        <div className="relative h-[240px] w-full overflow-hidden rounded-[10px] sm:h-[300px] md:h-[360px] lg:h-[400px] xl:h-[430px] 2xl:h-[450px] max-[390px]:h-[180px]">
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 1300px) 100vw, 1300px"
            className={`object-cover ${objectPositionClasses[imagePosition]}`}
          />
        </div>

        <div className="flex w-full flex-col">
          <div className="flex flex-wrap items-center gap-[8px] sm:gap-[10px] md:gap-[12px] max-[390px]:gap-1.5">
            <span className={chipClassName}>{date}</span>
            <span className={chipClassName}>
              {t("readTime", { minutes: read })}
            </span>
          </div>

          <h2 className="mt-[28px] w-full font-gilroy text-[28px] leading-[120%] font-bold tracking-[0.01em] text-black sm:mt-[32px] sm:w-5/6 sm:text-[32px] md:mt-[38px] md:text-[36px] md:tracking-[0.015em] lg:mt-[44px] lg:text-[40px] lg:tracking-[0.02em] xl:mt-[48px] xl:text-[44px] 2xl:mt-[50px] 2xl:text-[48px] max-[390px]:mt-5 max-[390px]:text-[22px]">
            {title}
          </h2>

          <div className="mt-[20px] flex w-full flex-col items-start gap-[20px] sm:mt-[24px] md:mt-[26px] md:flex-row md:items-end md:justify-between md:gap-[40px] lg:mt-[28px] xl:mt-[30px] max-[390px]:mt-4 max-[390px]:gap-4">
            <p className="w-full font-inter text-[14px] leading-[140%] font-normal tracking-normal text-black sm:text-[15px] md:w-3/5 md:text-[16px] lg:w-1/2 max-[390px]:text-[13px]">
              {description}
            </p>

            <Button
              render={
                <Link href={href} aria-label={`${readMoreLabel}: ${title}`} />
              }
              nativeButton={false}
              className="h-auto w-full shrink-0 rounded-[15px] bg-[#00B5A4] px-[20px] py-[10px] font-ui text-[15px] leading-[24px] font-medium tracking-normal text-center text-white sm:px-[28px] sm:py-[11px] sm:text-[16px] md:w-auto md:px-[36px] md:py-[12px] md:text-[17px] md:leading-[28.93px] lg:px-[46px] lg:text-[18px] xl:text-[19.29px] max-[390px]:py-2.5 max-[390px]:text-[14px] max-[390px]:whitespace-normal"
            >
              {readMoreLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </div>
      </article>
    </Container>
  );
}

export { BlogContainer };
