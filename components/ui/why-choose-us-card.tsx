import Image from "next/image";

type WhyChooseUsCardProps = {
  title: string;
  description: string;
  icon: string;
};

function WhyChooseUsCard({ title, description, icon }: WhyChooseUsCardProps) {
  return (
    <div className="flex min-h-[177px] w-full flex-col items-start gap-[20px] rounded-[22px] bg-[#F4F4F4] p-[22px] sm:p-[26px] md:gap-[24px] md:p-[35px] lg:flex-row lg:gap-[50px] lg:px-[50px] lg:py-[35px] max-[390px]:min-h-[150px] max-[390px]:gap-3 max-[390px]:rounded-[18px] max-[390px]:p-4">
      <Image
        src={icon}
        alt=""
        aria-hidden="true"
        width={66}
        height={66}
        className="size-[52px] shrink-0 object-contain sm:size-[56px] md:size-[58px] lg:size-[66px] max-[390px]:size-11"
      />
      <div className="flex w-full min-w-0 flex-col gap-[12px] sm:gap-[14px] md:gap-[16px] lg:gap-[20px] max-[390px]:gap-2">
        <h3 className="font-inter text-[16px] leading-[1.4] font-bold tracking-normal text-black sm:text-[17px] lg:text-[18px] max-[390px]:text-[14px]">
          {title}
        </h3>
        <p className="font-inter text-[14px] leading-[1.4] tracking-normal text-black sm:text-[15px] lg:text-[16px] max-[390px]:text-[13px]">
          {description}
        </p>
      </div>
    </div>
  );
}

export { WhyChooseUsCard };
