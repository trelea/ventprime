import { getLocale, getTranslations } from "next-intl/server";
import {
  CircleHelp,
  LayoutGrid,
  Mail,
  MapPin,
  Phone,
  Users,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { getCopyrightYear } from "@/lib/date";
import { Logo } from "@/components/layout/logo";
import { SOCIAL_ICONS } from "@/components/icons/social-icon";
import { FooterForm } from "@/components/forms/footer-form";
import { container } from "@/components/sections/section";

/**
 * The same anchors as the navbar (site-header.tsx), flattened: everything a
 * visitor can jump to from the top of the site, in the same order.
 */
const NAV_LINKS = [
  { hash: "#servicii", key: "services" },
  { hash: "#tehnologie", key: "tech" },
  { hash: "#despre", key: "about" },
  { hash: "#intrebari", key: "faq" },
  { hash: "#contacte", key: "contacts" },
] as const;

/** One glyph per nav item, keyed by `NAV_LINKS[*].key`. */
const NAV_ICONS: Record<(typeof NAV_LINKS)[number]["key"], LucideIcon> = {
  services: LayoutGrid,
  tech: Wind,
  about: Users,
  faq: CircleHelp,
  contacts: Phone,
};

/**
 * Footer, three columns:
 *   1. Logo + how to reach us (address, e-mail, phone) + social profiles.
 *   2. The navbar's navigation, flattened into one list.
 *   3. The footer mini-form (Full name / Phone / E-mail).
 */
export async function SiteFooter() {
  const t = await getTranslations("Nav");
  const tFooter = await getTranslations("Footer");
  const locale = await getLocale();
  const year = await getCopyrightYear();

  const { address, phone, phoneDisplay, email } = site.contact;

  return (
    <footer className="bg-slate-100 text-white relative rounded-t-[1.75rem] shadow-[0_-12px_30px_-12px_rgba(15,46,77,0.18)] sm:rounded-t-[3rem] lg:rounded-t-[72px]">
      <div className={`${container} grid gap-10 py-14 lg:grid-cols-12`}>
        {/* Column 1 — logo + contacts + social */}
        <div className="lg:col-span-4">
          <Logo variant="full" className="h-24 w-auto" alt="VENTPRIME" />

          <div className="mt-6 flex flex-col gap-3.5 text-base text-brand-blue-dark">
            <span className="flex items-start gap-2.5">
              <MapPin className="mt-1 size-5 shrink-0" />
              <span>
                {address.street}, {address.city}, {address.postalCode},{" "}
                {address.country}
              </span>
            </span>
            <a
              href={`mailto:${email}`}
              className="hover:text-brand-blue-dark/70 flex items-center gap-2.5 transition-colors"
            >
              <Mail className="size-5 shrink-0" />
              {email}
            </a>
            <a
              href={`tel:${phone}`}
              className="hover:text-brand-blue-dark/70 flex items-center gap-2.5 transition-colors"
            >
              <Phone className="size-5 shrink-0" />
              {phoneDisplay}
            </a>
          </div>

          {site.socials.length > 0 ? (
            <div className="mt-8">
              <p className="text-base text-brand-blue-dark">
                {tFooter("follow")}
              </p>
              <div className="mt-3 flex items-center gap-3">
                {site.socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.label];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="text-brand-blue-dark hover:bg-brand-blue flex size-11 items-center justify-center rounded-full bg-brand-blue-dark/5 transition-colors hover:text-white"
                    >
                      {Icon ? <Icon className="size-5" /> : null}
                    </a>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        {/*
          Column 2 — the navbar's nav items, flattened.

          `lg:pt-30` drops the list to the same level as column 1's contact rows:
          those start below the `h-24` logo plus its `mt-6`, i.e. 6rem + 1.5rem =
          7.5rem from the row top. Only from `lg`, where the columns sit side by
          side — stacked, the nav keeps its natural top.
        */}
        <nav
          className="lg:col-span-3 lg:pt-30"
          aria-label={tFooter("company")}
        >
          <ul className="flex flex-col gap-3.5 text-base text-brand-blue-dark">
            {NAV_LINKS.map((link) => {
              const Icon = NAV_ICONS[link.key];
              return (
                <li key={link.hash}>
                  <Link
                    href={{ pathname: "/", hash: link.hash }}
                    className="hover:text-brand-blue-dark/70 flex items-center gap-2.5 transition-colors"
                  >
                    <Icon className="size-5 shrink-0" />
                    {t(link.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Column 3 — the footer mini-form (Full name / Phone / E-mail) */}
        <div className="border-border rounded-xl border bg-white p-8 shadow-sm lg:col-span-5 lg:p-10">
          <FooterForm source={`footer-${locale}`} />
        </div>
      </div>

      <div className="border-t border-brand-blue-dark/15">
        <div className={`${container} text-brand-blue-dark/75 py-6 text-sm`}>
          <p>
            {tFooter("copyright")} {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
