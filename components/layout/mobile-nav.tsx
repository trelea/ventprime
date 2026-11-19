"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Cpu,
  Globe,
  Mail,
  Menu,
  Newspaper,
  Phone,
  Star,
  Users,
  Wrench,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LocaleSwitcher } from "./locale-switcher";
import { PhoneCta } from "./phone-cta";

const navItems = [
  { key: "technology", href: { pathname: "/", hash: "#technology" }, icon: Cpu },
  { key: "services", href: { pathname: "/", hash: "#services" }, icon: Wrench },
  { key: "about", href: { pathname: "/", hash: "#about" }, icon: Users },
  { key: "reviews", href: { pathname: "/", hash: "#reviews" }, icon: Star },
  { key: "blog", href: "/blogs", icon: Newspaper },
  { key: "contacts", href: { pathname: "/", hash: "#contacts" }, icon: Phone },
] as const;

function MobileNav() {
  const t = useTranslations("Nav");
  const footerT = useTranslations("Footer");
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label={t("openMenu")}
            className="-my-[4.79px] size-10 rounded-full text-navy"
          />
        }
      >
        <Menu className="size-6" />
      </SheetTrigger>

      <SheetContent side="right" className="w-[85%] max-w-sm gap-0 p-0">
        <SheetHeader className="border-b border-border px-4 py-[18px]">
          <SheetTitle className="sr-only">{t("menuTitle")}</SheetTitle>
          <SheetClose
            nativeButton={false}
            render={<Link href="/" aria-label="VentPrime" />}
          >
            <Image
              src="/logo.svg"
              alt="VentPrime"
              width={225.66}
              height={44}
              className="h-auto w-[156px]"
              priority
            />
          </SheetClose>
        </SheetHeader>

        <nav
          aria-label="Mobile navigation"
          className="flex-1 overflow-y-auto px-3 py-4"
        >
          <ul className="flex flex-col font-ui text-[17px] leading-6 text-foreground">
            {navItems.map((item) => (
              <li key={item.key}>
                <SheetClose
                  nativeButton={false}
                  render={
                    <Link
                      href={item.href}
                      scroll={typeof item.href === "object" ? false : undefined}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                    />
                  }
                >
                  <item.icon className="size-5 shrink-0 text-navy" />
                  {t(item.key)}
                </SheetClose>
              </li>
            ))}
            <li className="flex items-center gap-3 rounded-lg px-3 py-3">
              <Globe className="size-5 shrink-0 text-navy" />
              <LocaleSwitcher onSelect={() => setOpen(false)} />
            </li>
          </ul>
        </nav>

        <SheetFooter className="mt-0 gap-3 border-t border-border px-5 py-5">
          <PhoneCta />
          <a
            href={`mailto:${footerT("email")}`}
            className="inline-flex items-center justify-center gap-2 font-ui text-sm text-slate hover:text-foreground"
          >
            <Mail className="size-4 shrink-0" />
            {footerT("email")}
          </a>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { MobileNav };
