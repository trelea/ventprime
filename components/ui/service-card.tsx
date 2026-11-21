import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type ServiceCardType = "grey" | "green";

type ServiceCardProps = {
  type: ServiceCardType;
  title: string;
  description: string;
  ctaLabel: string;
};

function ServiceCard({ type, title, description, ctaLabel }: ServiceCardProps) {
  const isGreen = type === "green";

  return (
    <div
      className={`flex h-full min-h-[284px] flex-col gap-[14px] rounded-[22px] p-[30px] max-[390px]:min-h-[240px] max-[390px]:gap-3 max-[390px]:rounded-[18px] max-[390px]:p-5 ${
        isGreen ? "bg-[#00B5A4] text-white" : "bg-[#F4F4F4] text-black"
      }`}
    >
      <h3 className="font-inter text-[18px] leading-[1.4] font-bold tracking-[0.02em] max-[390px]:text-[16px]">
        {title}
      </h3>
      <p className="font-inter text-[16px] leading-[1.4] tracking-[0.02em] max-[390px]:text-[14px]">
        {description}
      </p>
      <div className="mt-auto flex justify-end">
        <Button
          render={
            <a
              href={isGreen ? "tel:+37379717214" : "#"}
              aria-label={ctaLabel}
            />
          }
          nativeButton={false}
          className={`flex w-full items-center justify-center gap-2 px-4 font-ui text-[16px] font-normal leading-[28.93px] tracking-normal sm:w-auto max-[390px]:gap-1.5 max-[390px]:text-[14px] max-[390px]:leading-6 ${
            isGreen
              ? "h-[55px] min-w-[214px] rounded-[14px] bg-[#14C4B3] text-white hover:bg-[#12b0a0] max-[390px]:h-11 max-[390px]:min-w-0"
              : "h-[54px] min-w-[162px] rounded-[14.4px] bg-[#E1E1E1] text-black hover:bg-[#d4d4d4] max-[390px]:h-11 max-[390px]:min-w-0"
          }`}
        >
          {isGreen ? (
            <>
              <Send aria-hidden="true" className="size-4" />
              {ctaLabel}
            </>
          ) : (
            <>
              {ctaLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export { ServiceCard };
