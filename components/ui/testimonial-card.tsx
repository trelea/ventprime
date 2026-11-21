import { Star } from "lucide-react";

type TestimonialCardProps = {
  data: string;
  customer: string;
  location: string;
};

function TestimonialCard({ data, customer, location }: TestimonialCardProps) {
  return (
    <article className="flex min-h-[292px] w-full max-w-[420px] flex-col gap-[28px] rounded-[22px] bg-[#F4F4F4] pt-[25px] pr-[25px] pb-[41px] pl-[22px] max-[390px]:min-h-[240px] max-[390px]:gap-5 max-[390px]:rounded-[18px] max-[390px]:p-5">
      <div className="flex items-center gap-[1.67px]" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className="h-[15.893px] w-[16.668px] shrink-0 fill-[#00B5A4] text-[#00B5A4]"
            strokeWidth={1.67}
          />
        ))}
      </div>
      <p className="whitespace-pre-line font-manrope text-[16px] leading-[26px] font-normal text-black max-[390px]:text-[14px] max-[390px]:leading-6">
        {data}
      </p>
      <p className="mt-auto font-manrope text-[16px] leading-[24px] font-medium text-black max-[390px]:text-[14px]">
        {customer} / {location}
      </p>
    </article>
  );
}

export { TestimonialCard };
