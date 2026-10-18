import Image from "next/image";
import { Building2, Calendar } from "lucide-react";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";
import { getImage } from "@/lib/images";
import { statValue } from "@/lib/stats";
import { GlareHover } from "@/components/ui/glare-hover";
import { StatCounter } from "@/components/sections/stat-counter";
import { Section } from "@/components/sections/section";

/** ABOUT US (`#despre`) — AGENTS.md §5.4. */
export async function AboutSection() {
  const locale = await getLocale();
  const format = await getFormatter();
  const t = await getTranslations("About");

  const paragraphs = t.raw("paragraphs") as unknown as string[];

  const indicators = [
    {
      id: "years",
      value: statValue("years"),
      label: t("indicators.years"),
      icon: Calendar,
    },
    {
      id: "projects",
      value: statValue("objects"),
      label: t("indicators.projects"),
      icon: Building2,
    },
  ];

  return (
    <Section
      id="despre"
      className="flex min-h-screen-safe flex-col justify-center"
    >
      <div className="grid items-start gap-12 lg:grid-cols-2">
        {/* Left — original overlapping photos */}
        <div>
          <div className="relative">
            <div className="relative aspect-4/5 w-4/5 overflow-hidden rounded-2xl">
              <Image
                src={getImage("about-installation").src}
                alt={t("section.imageAlt")}
                fill
                sizes="(max-width: 1024px) 80vw, 35vw"
                className="object-cover"
              />
            </div>
            <div className="absolute right-0 bottom-0 aspect-4/5 w-2/5 overflow-hidden rounded-2xl border-4 border-background shadow-lg">
              <Image
                src={getImage("about-attic").src}
                alt=""
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right — title, description paragraphs, and the 2 indicator cards (+5 and +500) */}
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl lg:text-4xl">
            {t("section.title")}
          </h2>

          <div className="text-muted-foreground mt-5 flex max-w-xl flex-col gap-4 text-lg leading-relaxed font-medium text-pretty sm:text-xl">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-10 grid auto-rows-fr items-stretch gap-4 sm:grid-cols-2">
            {indicators.map((item, index) => {
              const Icon = item.icon;
              const formatted = format.number(item.value, {
                maximumFractionDigits: 0,
              });

              return (
                <div key={item.id} className="h-full min-w-0">
                  <GlareHover
                    width="100%"
                    background="#1e6fb8"
                    color="#ffffff"
                    opacity={0.25}
                    className="h-full w-full place-items-stretch rounded-md border border-white/15 text-left shadow-lg shadow-black/20 transition-shadow duration-300 hover:shadow-xl"
                  >
                    <div className="flex h-full w-full flex-col p-5">
                      <span className="bg-emerald-500 flex size-11 shrink-0 items-center justify-center rounded-md text-white">
                        <Icon className="size-5" strokeWidth={2} />
                      </span>
                      <dd className="mt-4 flex items-baseline text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span>+</span>
                        <StatCounter
                          value={item.value}
                          formatted={formatted}
                          locale={locale}
                          delay={index * 0.1}
                        />
                      </dd>
                      <dt className="mt-1.5 text-base leading-relaxed font-semibold text-white/90">
                        {item.label}
                      </dt>
                    </div>
                  </GlareHover>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </Section>
  );
}
