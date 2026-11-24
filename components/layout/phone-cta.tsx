"use client";

import Image from "next/image";
import { signal } from "@devalon.dev/credits/signals";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

function PhoneCta() {
  const t = useTranslations("Nav");

  return (
    <Button
      render={<a href="tel:+37379717214" aria-label={t("call")} />}
      nativeButton={false}
      onClick={() => signal("PhoneClick", { source: "navbar" })}
      className="h-[42px] gap-[13px] rounded-[11.2px] bg-primary px-3 font-ui text-[15px] text-on-dark hover:bg-primary/90 lg:px-[20px]"
    >
      <Image src="/icons/phone.svg" alt="" width={16} height={16} />
      {t("call")}
    </Button>
  );
}

export { PhoneCta };
