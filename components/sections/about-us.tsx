import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";

function AboutUs() {
  const t = useTranslations("AboutUs");

  return (
    <Container id="about" bgColor="grey" height="auto">
      <div className="flex flex-col justify-center py-[50px] sm:py-[40px] md:py-[44px] lg:py-[80px] xl:py-[80px] 2xl:py-[80px] max-[390px]:py-8">
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-[112px] xl:gap-[112px]">
          {/* Left side (desktop) / interleaved (mobile) */}
          <div className="contents lg:flex lg:flex-1 lg:flex-col">
            {/* 1. label */}
            <div className="order-1">
              <span className="font-inter text-[14px] font-bold tracking-[0.02em] text-primary">
                {t("label")}
              </span>
            </div>

            {/* 4. image grid */}
            <div className="order-4 mt-[12px] sm:mt-[20px] md:mt-[24px] lg:mt-[40px] xl:mt-[40px] 2xl:mt-[40px]">
              <div className="grid aspect-square w-full grid-cols-5 grid-rows-5 gap-[12px] max-[390px]:gap-2">
                <div className="relative col-span-5 row-span-3 overflow-hidden rounded-[22px]">
                  <Image
                    src="/about/1.png"
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative col-span-3 row-span-2 overflow-hidden rounded-[22px]">
                  <Image
                    src="/about/2.png"
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(min-width: 1024px) 30vw, 60vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative col-span-2 row-span-2 overflow-hidden rounded-[22px]">
                  <Image
                    src="/about/3.png"
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(min-width: 1024px) 20vw, 40vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right side (desktop) / interleaved (mobile) */}
          <div className="contents lg:flex lg:w-1/2 lg:flex-col lg:mt-[38px]">
            {/* 2. title */}
            <div className="order-2">
              <h2 className="mt-[12px] whitespace-pre-line font-gilroy text-[24px] leading-[1.1] font-bold tracking-normal text-black text-pretty sm:mt-[20px] sm:text-[28px] sm:leading-[1.1] md:mt-[24px] md:text-[30px] lg:mt-[28px] lg:text-[32px] lg:leading-[1.2] lg:tracking-[0.02em] xl:mt-[34px] 2xl:mt-[40px] max-[390px]:mt-3 max-[390px]:text-[22px]">
                {t("title")}
              </h2>
            </div>

            {/* 3. first paragraph */}
            <p className="order-3 mt-[12px] font-inter text-[14px] leading-[1.4] tracking-normal text-black sm:mt-[20px] md:mt-[24px] lg:mt-[28px] lg:text-[16px] lg:tracking-[0.02em] xl:mt-[34px] 2xl:mt-[40px] max-[390px]:mt-3 max-[390px]:text-[13px]">
              {t.rich("p1", {
                brand: (chunks) => (
                  <strong className="font-bold">{chunks}</strong>
                ),
              })}
            </p>

            {/* 5. second paragraph */}
            <p className="order-5 mt-[12px] font-inter text-[14px] leading-[1.4] tracking-normal text-black sm:mt-[20px] md:mt-[24px] lg:mt-[28px] lg:text-[16px] lg:tracking-[0.02em] xl:mt-[34px] 2xl:mt-[40px] max-[390px]:mt-3 max-[390px]:text-[13px]">
              {t("p2")}
            </p>

            {/* 6. third paragraph */}
            <p className="order-6 mt-[12px] font-inter text-[14px] leading-[1.4] tracking-normal text-black sm:mt-[20px] md:mt-[24px] lg:mt-[28px] lg:text-[16px] lg:tracking-[0.02em] xl:mt-[34px] 2xl:mt-[40px] max-[390px]:mt-3 max-[390px]:text-[13px]">
              {t("p3")}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

export { AboutUs };