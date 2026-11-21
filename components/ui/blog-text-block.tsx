import { cn } from "cn";
import { Container } from "@/components/layout/container";

type BlogTextBlockProps = {
  title: string;
  description: string | string[];
  bullets?: string[];
};

const textClassName =
  "font-inter text-[14px] leading-[140%] font-normal tracking-normal text-black max-[390px]:text-[12px] sm:text-[15px] md:text-[16px]";

/** Standalone heading + body copy block inside an article. */
function BlogTextBlock({ title, description, bullets }: BlogTextBlockProps) {
  const paragraphs = Array.isArray(description) ? description : [description];

  return (
    <Container bgColor="white" height="auto">
      <h2 className="font-gilroy text-[24px] leading-[120%] font-bold tracking-[0.02em] text-black max-[390px]:text-[16px] sm:text-[26px] md:text-[28px] lg:text-[32px]">
        {title}
      </h2>

      <div className="mt-[20px] max-[390px]:mt-3 sm:mt-[24px] md:mt-[30px]">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className={cn(textClassName, index > 0 && "mt-[16px] max-[390px]:mt-3")}
          >
            {paragraph}
          </p>
        ))}

        {bullets && bullets.length > 0 && (
          <ul
            className={cn(
              textClassName,
              "mt-[16px] list-disc space-y-[8px] pl-[20px] max-[390px]:mt-3",
            )}
          >
            {bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}

export { BlogTextBlock };
