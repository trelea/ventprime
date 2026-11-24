"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "cn";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { TrackedLink } from "@/components/signals/tracked-link";
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
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Hysteresis keeps the state stable when scrolling slowly past the boundary.
    const update = () => {
      const y = window.scrollY;
      setScrolled((current) => (current ? y > 4 : y > 8));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Keep the anchor-scroll offset in sync with the navbar's animated height.
    const update = () => {
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${header.offsetHeight}px`,
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      data-slot="navbar"
      data-scrolled={scrolled}
      className="group pointer-events-auto fixed inset-x-0 top-0 z-50"
    >
      <div className="relative isolate">
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 bg-white shadow-sm transition-opacity duration-300 ease-out motion-reduce:transition-none",
            scrolled && "opacity-0 group-hover:opacity-100",
          )}
        />
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 bg-linear-to-b from-white/95 via-white/70 to-white/0 opacity-0 backdrop-blur-md transition-opacity duration-300 ease-out motion-reduce:transition-none",
            scrolled && "opacity-100 group-hover:opacity-0",
          )}
        />

        <Container bgColor="transparent" className="relative z-10">
          <div
            className={cn(
              "grid grid-cols-[1fr_auto] items-center transition-[padding] duration-300 ease-out motion-reduce:transition-none lg:grid-cols-[1fr_auto_1fr]",
              scrolled
                ? "py-[18px] lg:py-[14px] group-hover:py-[18px] group-hover:lg:py-[30px]"
                : "py-[18px] lg:py-[30px]",
            )}
          >
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
                    <TrackedLink
                      href={item.href}
                      eventName="NavClick"
                      eventParams={{ nav_location: "header", item: item.key }}
                      scroll={typeof item.href === "object" ? false : undefined}
                      className="relative whitespace-nowrap transition-colors duration-300 ease-out hover:text-primary motion-reduce:transition-none after:absolute after:-bottom-[3px] after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:content-[''] after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 motion-reduce:after:transition-none"
                    >
                      {t(item.key)}
                    </TrackedLink>
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
      </div>
    </header>
  );
}

export { Navbar };
