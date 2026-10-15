import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { site } from "@/lib/site";
import { ContactForm } from "@/components/forms/contact-form";
import { SectionHeading, Section } from "@/components/sections/section";

/** CONTACTS (`#contacte`) — AGENTS.md §5.7. */
export async function ContactsSection() {
  const t = await getTranslations("Contacts");
  const tDetails = await getTranslations("Contacts.details");
  const tNav = await getTranslations("Nav");

  const { address, phone, phoneDisplay, email, openingHours, geo } = site.contact;

  const mapQuery = `${address.city}, ${address.country}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${geo.latitude},${geo.longitude}`,
  )}&z=15&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    mapQuery,
  )}`;

  const details = [
    {
      icon: Phone,
      label: tDetails("phone"),
      value: phoneDisplay,
      href: `tel:${phone}`,
    },
    { icon: Mail, label: tDetails("email"), value: email, href: `mailto:${email}` },
    {
      icon: MapPin,
      label: tDetails("address"),
      value: `${address.street}, ${address.city}, ${address.postalCode}`,
    },
    {
      icon: Clock,
      label: tDetails("hours"),
      value: `${openingHours[0].opens}–${openingHours[0].closes}`,
    },
  ];

  return (
    <Section id="contacte" className="bg-brand-blue-dark">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left — details on a dark card */}
        <div className="text-white">
          <SectionHeading
            eyebrow={t("section.eyebrow")}
            title={t("section.title")}
            description={t("section.description", {
              hours: site.responseTimeHours,
            })}
            invert
          />

          <dl className="mt-8 flex flex-col gap-5">
            {details.map((detail) => (
              <div key={detail.label} className="flex items-start gap-3">
                <detail.icon className="text-brand-green mt-0.5 size-5 shrink-0" />
                <div>
                  <dt className="text-sm text-white/60">{detail.label}</dt>
                  <dd className="font-medium">
                    {detail.href ? (
                      <a href={detail.href} className="hover:text-brand-green transition-colors">
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <p className="text-sm text-white/60">{tDetails("messengers")}</p>
            <div className="mt-2 flex gap-3">
              {[
                { label: "Viber", href: site.messengers.viber },
                { label: "WhatsApp", href: site.messengers.whatsapp },
                { label: "Telegram", href: site.messengers.telegram },
              ].map((messenger) => (
                <a
                  key={messenger.label}
                  href={messenger.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-white/10 flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm transition-colors"
                >
                  <MessageCircle className="size-4" />
                  {messenger.label}
                </a>
              ))}
            </div>
          </div>

          {/* Service area as plain text — local SEO (AGENTS.md §5.9) */}
          <div className="mt-6">
            <p className="text-sm text-white/60">{tDetails("serviceArea")}</p>
            <p className="mt-1 text-sm leading-relaxed">
              {site.serviceArea.join(", ")}
            </p>
          </div>
        </div>

        {/* Right — form */}
        <ContactForm source={tNav("contacts")} />
      </div>

      {/* Map — lazy-loaded shell so it never blocks LCP (AGENTS.md §5.7) */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
        <iframe
          title={`${tNav("contacts")} — ${mapQuery}`}
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-80 w-full grayscale-[0.3]"
        />
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="sr-only"
        >
          {mapQuery}
        </a>
      </div>
    </Section>
  );
}