"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSignals } from "@/lib/signals/events";
import { Button } from "@/components/ui/button";

type PhoneCtaProps = {
  /** Identifies the surface that produced the call intent. */
  source?: string;
};

function PhoneCta({ source = "navbar-phone" }: PhoneCtaProps) {
  const t = useTranslations("Nav");
  const { contact } = useSignals();

  return (
    <Button
      render={<a href="tel:+37379717214" aria-label={t("call")} />}
      nativeButton={false}
      onClick={() => contact(source, "phone")}
      className="h-[42px] gap-[13px] rounded-[11.2px] bg-primary px-3 font-ui text-[15px] text-on-dark hover:bg-primary/90 lg:px-[20px]"
    >
      <Image src="/icons/phone.svg" alt="" width={16} height={16} />
      {t("call")}
    </Button>
  );
}

export { PhoneCta };
