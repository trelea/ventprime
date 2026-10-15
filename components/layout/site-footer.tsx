import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { services, servicePath } from "@/lib/services";
import { site } from "@/lib/site";
import { getCopyrightYear } from "@/lib/date";
import { Logo } from "@/components/layout/logo";
import { container } from "@/components/sections/section";

const SECTIONS = [
  { hash: "#despre", key: "about" },
  { hash: "#tehnologie", key: "tech" },
  { hash: "#recenzii", key: "reviews" },
  { hash: "#contacte", key: "contacts" },
] as const;

export async function SiteFooter() {
  const t = await getTranslations("Nav");
  const tFooter = await getTranslations("Footer");
  const tContacts = await getTranslations("Contacts.details");
  const tServices = await getTranslations("Services");
  const year = await getCopyrightYear();

  const { address, phone, phoneDisplay, email } = site.contact;

  return (
    <footer className="bg-brand-blue-dark text-white">
      <div className={`${container} grid gap-10 py-14 lg:grid-cols-12`}>
        <div className="lg:col-span-4">
          <Logo onDark variant="full" className="h-12 w-auto" alt="VENTPRIME" />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            {tFooter("tagline")}
          </p>

          <address className="mt-6 flex flex-col gap-3 text-sm not-italic text-white/70">
            <a
              href={`tel:${phone}`}
              className="hover:text-white flex items-center gap-2 transition-colors"
            >
              <Phone className="size-4 shrink-0" />
              {phoneDisplay}
            </a>
            <a
              href={`mailto:${email}`}
              className="hover:text-white flex items-center gap-2 transition-colors"
            >
              <Mail className="size-4 shrink-0" />
              {email}
            </a>
            <span className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>
                {address.street}, {address.city}, {address.postalCode},{" "}
                {address.country}
              </span>
            </span>
            <span className="flex items-center gap-2">
              <Clock className="size-4 shrink-0" />
              {tContacts("hours")}: {site.contact.openingHours[0].opens}–
              {site.contact.openingHours[0].closes}
            </span>
          </address>
        </div>

        <nav className="lg:col-span-4" aria-label={tFooter("services")}>
          <h2 className="text-sm font-semibold tracking-wide uppercase">
            {tFooter("services")}
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
            {services.map((service) => (
              <li key={service.key}>
                <Link
                  href={servicePath(service.key)}
                  className="hover:text-white transition-colors"
                >
                  {tServices(`items.${service.key}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lg:col-span-4" aria-label={tFooter("company")}>
          <h2 className="text-sm font-semibold tracking-wide uppercase">
            {tFooter("company")}
          </h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
            {SECTIONS.map((section) => (
              <li key={section.hash}>
                <Link
                  href={{ pathname: "/", hash: section.hash }}
                  className="hover:text-white transition-colors"
                >
                  {t(section.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div
          className={`${container} text-white/60 flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between`}
        >
          <p>
            © {year} {site.legalName} · IDNO {site.idno}
          </p>
          <p>{tFooter("rights")}</p>
        </div>
      </div>
    </footer>
  );
}