import Image from "next/image";
import {
  BadgeCheck,
  Calculator,
  MapPin,
  MessageSquare,
  Phone,
  ZapOff,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getImage } from "@/lib/images";
import { site } from "@/lib/site";
import { formatMDLCurency } from "@/lib/currency";
import { ButtonLink } from "@/components/ui/button";
import { AuroraText } from "@/components/ui/aurora-text";
import { container } from "@/components/sections/section";
import { HeroContactCards } from "@/components/sections/hero-contact-cards";
import { GridPattern } from "@/components/ui/grid-pattern";

/**
 * Aurora Text gradient for the headline: brand blue, brand green, white.
 *
 * The blue is a lightened brand blue rather than `--brand-blue` itself. At
 * #1E6FB8 the blue stop sits at ~2.7:1 against the `brand-blue-dark` overlay —
 * below the 3:1 large text requires — while #5AA9E6 clears 5:1 on the same
 * backdrop and still reads as the brand blue. Green (#10b981) and white both
 * pass on that backdrop unchanged.
 */
const AURORA_COLORS = ["#5AA9E6", "#10b981", "#FFFFFF"];

/**
 * HERO (`#acasa`) — AGENTS.md §5.1.
 *
 * Edge-to-edge and at least one viewport tall on every device, phones included.
 * That works because the header is `fixed` (out of the flow) rather than
 * `sticky`, so this section starts at y=0 and owns the full screen.
 *
 * Desktop: full-bleed photo with a blue→transparent gradient over the left
 * half; text block on the left, image subject visible on the right.
 * Mobile: same single screen, tighter type scale and full-width CTAs.
 */
export async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("Hero");
  const tNav = await getTranslations("Nav");
  const hero = getImage("hero-house-exterior");

  const usps = [
    { id: "natural-draft", icon: ZapOff, label: t("usp.naturalDraft") },
    {
      id: "valve-price",
      icon: BadgeCheck,
      label: t("usp.valvePrice", {
        price: formatMDLCurency(site.valveInstallationPrice, locale),
      }),
    },
    {
      id: "free-consultation",
      icon: MessageSquare,
      label: t("usp.freeConsultation"),
    },
    { id: "coverage", icon: MapPin, label: t("usp.coverage") },
  ];

  return (
    <section
      id="acasa"
      className="relative isolate flex min-h-screen-safe w-full flex-col overflow-hidden"
    >
      <Image
        src={hero.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />

      {/* Blue → transparent so the left-hand text stays legible (AGENTS.md §8). */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/95 via-brand-blue-dark/70 to-brand-blue-dark/10"
      />

      {/* Grid texture under the copy (Magic UI `grid-pattern`, AGENTS.md §5.1). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <GridPattern
          id="hero-grid-pattern"
          width={48}
          height={48}
          className="fill-white/10 stroke-white/20 [mask-image:linear-gradient(to_right,white,transparent_52%),linear-gradient(to_bottom,transparent,white_8%,white_92%,transparent)] [mask-composite:intersect]"
        />
      </div>

      <div
        className={`${container} flex flex-1 flex-wrap content-center items-end justify-between gap-10 pt-28 pb-24 lg:pt-32 lg:pb-12`}
      >
        <div className="max-w-2xl min-w-0 lg:grow lg:basis-0">
          <h1 className="font-display text-4xl font-black tracking-tight text-balance sm:text-5xl lg:text-6xl">
            <AuroraText colors={AURORA_COLORS}>{t("title")}</AuroraText>
          </h1>

          <p className="mt-6 text-lg leading-relaxed font-medium text-pretty text-white/85 sm:text-xl">
            {t("subtitle")}
          </p>

          {/* 4 main advantages in a 2×2 glass card grid */}
          <ul className="mt-7 grid auto-rows-fr grid-cols-1 gap-2.5 sm:grid-cols-2">
            {usps.map((usp) => (
              <li
                key={usp.id}
                className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm leading-snug font-medium text-white backdrop-blur"
              >
                <usp.icon
                  className="text-emerald-500 mt-0.5 size-5 shrink-0"
                  strokeWidth={2}
                />
                <span>{usp.label}</span>
              </li>
            ))}
          </ul>

          {/* Two CTAs: "Calculează costul" → #contacte, "Sună" → tel: */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ButtonLink
              render={<Link href={{ pathname: "/", hash: "#contacte" }} />}
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-500/90 h-14 w-full gap-2.5 text-lg font-bold text-white"
            >
              <Calculator className="size-6" />
              {t("cta.calculateCost")}
            </ButtonLink>
            <ButtonLink
              render={<a href={`tel:${site.contact.phone}`} />}
              size="lg"
              className="text-brand-blue h-14 w-full gap-2.5 bg-white text-lg font-bold hover:bg-white/90"
            >
              <Phone className="size-6" />
              {t("cta.call")}
            </ButtonLink>
          </div>
        </div>

        <HeroContactCards
          phone={site.contact.phone}
          phoneDisplay={site.contact.phoneDisplay}
          email={site.contact.email}
        />
      </div>

      <span className="sr-only">{tNav("home")}</span>
    </section>
  );
}
