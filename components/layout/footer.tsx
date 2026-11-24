import { DevalonBacklink } from "@devalon.dev/credits/next";
import Image from "next/image";
import { cn } from "cn";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/lib/blogs";
import { devalonCredit } from "@/lib/devalon";
import { ContactLink } from "@/components/signals/contact-link";
import { TrackedLink } from "@/components/signals/tracked-link";
import { Container } from "./container";
import { ContactForm } from "./contact-form";

const navItems = [
  { key: "technology", href: { pathname: "/", hash: "#technology" } },
  { key: "services", href: { pathname: "/", hash: "#services" } },
  { key: "about", href: { pathname: "/", hash: "#about" } },
  { key: "reviews", href: { pathname: "/", hash: "#reviews" } },
  { key: "blog", href: "/blogs" },
  { key: "contacts", href: { pathname: "/", hash: "#contacts" } },
] as const;

const GOOGLE_BUSINESS_URL = "https://share.google/AF6c7f51gI1Ey0OyM";
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/xzNa6fSxmFZTaM9TA";

const socials = [
  { key: "facebook", x: "0", width: "24px" },
  { key: "instagram", x: "37px", width: "26px" },
  { key: "youtube", x: "75px", width: "30px" },
] as const;

function Contacts({ className }: { className?: string }) {
  const t = useTranslations("Footer");
  const email = t("email");
  const phone = t("phone");

  return (
    <div data-slot="footer-contacts" className={className}>
      <ul className="flex flex-col gap-[10px] font-ui text-[16px] font-normal leading-[22px] tracking-[-0.15px] text-white lg:gap-[12px] lg:text-[16px] lg:leading-[22.5px]">
        <li className="flex items-start gap-[14px]">
          <Image
            src="/icons/footer/location.svg"
            alt=""
            width={19}
            height={19}
            className="mt-[2px]"
          />
          <address className="not-italic align-middle">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {t("city")}
              <br />
              {t("street")}
            </a>
          </address>
        </li>
        <li className="flex items-center gap-[16px]">
          <Image src="/icons/footer/mail.svg" alt="" width={17} height={17} />
          <ContactLink
            href={`mailto:${email}`}
            target="_blank"
            rel="noreferrer"
            className="align-middle hover:underline"
            source="footer-email"
          >
            {email}
          </ContactLink>
        </li>
        <li className="flex items-center gap-[17px]">
          <span className="relative flex size-4 shrink-0 items-center justify-center">
            <Image
              src="/icons/footer/phone.svg"
              alt=""
              width={16}
              height={6}
              className="rotate-[-135deg]"
            />
          </span>
          <ContactLink
            href={`tel:${phone.replace(/[^+\d]/g, "")}`}
            className="align-middle hover:underline"
            source="footer-phone"
          >
            {phone}
          </ContactLink>
        </li>
      </ul>
      <Socials className="mt-[50px] hidden lg:flex" />
    </div>
  );
}

function Socials({ className }: { className?: string }) {
  return (
    <ul
      data-slot="footer-socials"
      className={cn("flex items-center gap-[14px]", className)}
    >
      <li className="relative h-6 w-[104.384px]">
        <Image
          src="/icons/footer/socials.svg"
          alt=""
          width={104.384}
          height={23.9095}
        />
        {socials.map((social) => (
          <a
            key={social.key}
            href={GOOGLE_BUSINESS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="VentPrime on Google"
            className="absolute inset-y-0"
            style={{ left: social.x, width: social.width }}
          />
        ))}
      </li>
      <li>
        <a
          href={GOOGLE_BUSINESS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="VentPrime on Google"
          className="block"
        >
          <Image
            src="/icons/footer/tiktok.svg"
            alt=""
            width={20.856}
            height={24}
          />
        </a>
      </li>
    </ul>
  );
}

function FooterNav({ className }: { className?: string }) {
  const t = useTranslations("Nav");

  return (
    <nav data-slot="footer-nav" aria-label="Footer navigation" className={className}>
      <ul className="flex flex-col items-start gap-[10px] font-ui text-[16px] font-normal leading-[22px] tracking-[-0.15px] text-white lg:gap-[12px] lg:text-[16px] lg:leading-[22.5px]">
        {navItems.map((item) => (
          <li key={item.key}>
            <TrackedLink
              href={item.href}
              eventName="NavClick"
              eventParams={{ nav_location: "footer", item: item.key }}
              scroll={typeof item.href === "object" ? false : undefined}
              className="align-middle hover:text-primary"
            >
              {t(item.key)}
            </TrackedLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations("Footer");

  return (
    <footer data-slot="footer">
      <Container
        bgColor="dark"
        className="pt-[75px] pb-[32px] lg:py-[90px]"
      >
        <div className="flex flex-col gap-0 lg:grid lg:grid-cols-2 lg:gap-[60px]">
          <div className="contents lg:flex lg:flex-col">
            <Link
              href="/"
              aria-label="VentPrime"
              className="order-2 mt-[75px] inline-block lg:order-none lg:mt-0"
            >
              <Image
                src="/logo-light.svg"
                alt="VentPrime"
                width={225.66}
                height={44}
                className="h-auto w-[156px] lg:h-11 lg:w-auto"
              />
            </Link>

            <div className="order-3 flex flex-col gap-0 md:flex-row md:items-end md:gap-[75px] lg:order-none lg:mt-[60px] lg:gap-[101px]">
              <Contacts className="mt-[24px] md:mt-0" />
              <FooterNav className="mt-[24px] md:mt-0" />
            </div>

            <Socials className="order-4 mt-[75px] lg:hidden" />

            <p className="order-5 mt-[20px] font-gilroy text-[15px] font-normal leading-[160%] tracking-[0.02em] text-white/80 lg:order-none lg:mt-auto lg:text-[18px] lg:leading-[175%]">
              {t("copyright")}
            </p>

            <DevalonBacklink
              locale={locale}
              site_url={devalonCredit.site_url}
              utm
              className="order-6 mt-[10px] block font-gilroy text-[13px] leading-[160%] text-white/70 [&_a]:text-white [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary lg:order-none lg:mt-[6px] lg:text-[14px]"
            />
          </div>

          <div className="order-1 hidden lg:order-none lg:block">
            <ContactForm />
          </div>
        </div>
      </Container>
    </footer>
  );
}

export { Footer };
