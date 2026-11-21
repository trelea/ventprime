import Image from "next/image";
import { Container } from "@/components/layout/container";

type BlogArticleProps = {
  img: string;
  title: string;
  description: string;
  imagePosition?: "top" | "center" | "bottom";
  alt?: string;
};

const objectPositionClasses = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
} as const;

/** Article body: image -> title -> full description (no chips, no read-more button). */
function BlogArticle({
  img,
  title,
  description,
  imagePosition = "center",
  alt,
}: BlogArticleProps) {
  return (
    <Container
      bgColor="white"
      height="auto"
      className="pb-[48px] sm:pb-[56px] md:pb-[64px] lg:pb-[72px] 2xl:pb-[80px] max-[390px]:pb-8"
    >
      <article className="flex flex-col gap-[24px] text-black sm:gap-[28px] md:gap-[32px] lg:gap-[36px] xl:gap-[40px] max-[390px]:gap-5">
        <div className="relative h-[240px] w-full overflow-hidden rounded-[10px] sm:h-[300px] md:h-[360px] lg:h-[400px] xl:h-[430px] 2xl:h-[450px] max-[390px]:h-[180px]">
          <Image
            src={img}
            alt={alt ?? title}
            fill
            preload
            sizes="(max-width: 1300px) 100vw, 1300px"
            className={`object-cover ${objectPositionClasses[imagePosition]}`}
          />
        </div>

        <div className="flex w-full flex-col">
          <h1 className="mt-[28px] w-full font-gilroy text-[28px] leading-[120%] font-bold tracking-[0.01em] text-black sm:mt-[32px] sm:w-5/6 sm:text-[32px] md:mt-[38px] md:text-[36px] md:tracking-[0.015em] lg:mt-[44px] lg:text-[40px] lg:tracking-[0.02em] xl:mt-[48px] xl:text-[44px] 2xl:mt-[50px] 2xl:text-[48px] max-[390px]:mt-5 max-[390px]:text-[22px]">
            {title}
          </h1>

          <div className="mt-[20px] flex w-full sm:mt-[24px] md:mt-[26px] lg:mt-[28px] xl:mt-[30px] max-[390px]:mt-4">
            <p className="w-full font-inter text-[14px] leading-[140%] font-normal tracking-normal text-black sm:text-[15px] md:w-3/5 md:text-[16px] lg:w-1/2 max-[390px]:text-[13px]">
              {description}
            </p>
          </div>
        </div>
      </article>
    </Container>
  );
}

export { BlogArticle };
