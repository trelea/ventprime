"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Locale = (typeof routing.locales)[number];

type LocaleSwitcherProps = {
  onSelect?: () => void;
};

function LocaleSwitcher({ onSelect }: LocaleSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Select
      value={locale}
      onValueChange={(value) => {
        router.replace(pathname, { locale: value as Locale });
        onSelect?.();
      }}
    >
      <SelectTrigger
        aria-label="Language"
        className="h-8 w-[62px] justify-center gap-0 rounded-full border-transparent p-0 font-ui text-[14px] font-semibold uppercase tracking-[0.35px] text-navy [&>svg]:hidden"
      >
        <SelectValue className="flex-none" />
        <Image src="/icons/chevron.svg" alt="" width={16} height={16} />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((item) => (
          <SelectItem key={item} value={item}>
            {item.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { LocaleSwitcher };
