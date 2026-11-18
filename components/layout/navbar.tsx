import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./container";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import { PhoneCta } from "./phone-cta";

const navItems = [
  { key: "technology", href: { pathname: "/", hash: "#technology" } },
  { key: "services", href: { pathname: "/", hash: "#services" } },
  { key: "about", href: { pathname: "/", hash: "#about" } },
  { key: "reviews", href: { pathname: "/", hash: "#reviews" } },
  { key: "blog", href: "/blogs" },
  { key: "contacts", href: { pathname: "/", hash: "#contacts" } },
] as const;

function Navbar() {
  const t = useTranslations("Nav");

  return (
    <header
      data-slot="navbar"
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      <Container
        bgColor="white"
        className="shadow-sm"
        innerClassName="px-4 lg:px-[17.5px]"
      >
        <div className="grid grid-cols-[1fr_auto] items-center py-[18px] lg:grid-cols-[1fr_auto_1fr] lg:py-[30px]">
          <div data-slot="navbar-logo" className="pointer-events-auto lg:col-start-1">
            <Link href="/" aria-label="VentPrime">
              <Image
                src="/logo.svg"
                alt="VentPrime"
                width={225.66}
                height={44}
                className="h-auto w-[156px] lg:h-11 lg:w-auto"
                priority
              />
            </Link>
          </div>

          <nav
            aria-label="Main navigation"
            className="pointer-events-auto hidden lg:col-start-2 lg:block"
          >
            <ul className="flex items-center gap-10 font-ui text-[15px] leading-[22.5px] tracking-[-0.15px] text-foreground">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className="whitespace-nowrap">
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pointer-events-auto flex items-center justify-end gap-1.5 lg:col-start-3">
            <div data-slot="locale-switcher" className="hidden lg:block">
              <LocaleSwitcher />
            </div>
            <div className="hidden lg:block">
              <PhoneCta />
            </div>
            <div className="flex lg:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

export { Navbar };
