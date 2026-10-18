import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  DoorClosed,
  Droplets,
  Flame,
  ShieldCheck,
  SlidersHorizontal,
  Thermometer,
  Wind,
  ZapOff,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getImage } from "@/lib/images";
import { AuroraText } from "@/components/ui/aurora-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { container, sectionSpacing } from "@/components/sections/section";
import {
  TechDiagram,
  TechDiagramStyles,
} from "@/components/sections/tech-diagram";

const AURORA_COLORS_LIGHT = ["#1E6FB8", "#10b981", "#0F2E4D"];

const STEP_ICONS = [Thermometer, Flame, ArrowUpRight, Wind] as const;

const ADVANTAGE_ITEMS = [
  { key: "closedWindows", icon: DoorClosed },
  { key: "stuffyAir", icon: Wind },
  { key: "excessHumidity", icon: Droplets },
  { key: "condensationRisk", icon: ShieldCheck },
  { key: "noElectricity", icon: ZapOff },
  { key: "manualControl", icon: SlidersHorizontal },
] as const;

/**
 * TECH (`#tehnologie`) — split into two full-viewport (100svh) blocks:
 *   1. How electricity-free ventilation works (2×2 equal-size minimalist step cards + schema)
 *   2. Advantages + Why windows fog up card
 */
export async function TechSection() {
  const t = await getTranslations("Tech");

  const paragraphs = t.raw("paragraphs") as unknown as string[];
  const condensationParagraphs = t.raw(
    "condensation.paragraphs",
  ) as unknown as string[];
  const condensationImage = getImage("tech-condensation");

  const diagramPoints = [
    {
      number: 1,
      text: t("diagram.points.intake"),
    },
    {
      number: 2,
      text: t("diagram.points.exhaust"),
    },
  ];

  return (
    <section>
      <TechDiagramStyles />

      {/* Screen 1 — How electricity-free ventilation works + Schema */}
      <div
        className={`${container} min-h-screen-safe flex flex-col justify-center ${sectionSpacing}`}
      >
        {/* The anchor sits on the heading, not the <section>: the first block
            centres its content in a full-height box, so targeting the section
            box would land a whole empty band above the title. */}
        <h2
          id="tehnologie"
          className="font-display text-center text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
        >
          <AuroraText colors={AURORA_COLORS_LIGHT}>
            {t("section.title")}
          </AuroraText>
        </h2>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-12">
          {/* 4 equal-size (H × W) blue cards in a 2×2 grid */}
          <ul className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
            {paragraphs.map((paragraph, index) => {
              const StepIcon = STEP_ICONS[index] ?? Wind;

              return (
                <li
                  key={index}
                  className="bg-brand-blue flex h-full w-full flex-col gap-4 rounded-lg border border-white/15 p-6 text-white shadow-lg shadow-black/20 transition-shadow duration-300 hover:shadow-xl"
                >
                  <span className="bg-emerald-500 flex size-12 shrink-0 items-center justify-center rounded-md text-white shadow-sm">
                    <StepIcon className="size-6" strokeWidth={2.25} />
                  </span>
                  <p className="text-base leading-relaxed font-semibold text-white">
                    {paragraph}
                  </p>
                </li>
              );
            })}
          </ul>

          {/* Schema card — green mode with equal padding and gaps */}
          <div className="bg-emerald-500 flex flex-col gap-4 rounded-lg border border-white/15 p-4 text-white shadow-lg shadow-black/20 transition-shadow duration-300 hover:shadow-xl lg:col-span-6">
            <div className="flex flex-1 items-center justify-center rounded-lg border border-white/20 bg-white p-4 shadow-sm">
              <TechDiagram alt={t("diagram.alt")} />
            </div>

            <ol className="grid auto-rows-fr gap-4 sm:grid-cols-2">
              {diagramPoints.map((point) => (
                <li
                  key={point.number}
                  className="bg-brand-blue flex h-full items-center gap-3.5 rounded-lg border border-white/15 p-5 text-white shadow-lg shadow-black/20 transition-shadow duration-300 hover:shadow-xl"
                >
                  <span className="bg-emerald-500 flex size-10 shrink-0 items-center justify-center rounded-md text-base font-bold text-white shadow-sm">
                    {point.number}
                  </span>
                  <span className="text-base leading-relaxed font-semibold text-white">
                    {point.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Screen 2 — Advantages + Why do windows fog up? */}
      <div
        className={`${container} min-h-screen-safe flex flex-col justify-center ${sectionSpacing}`}
      >
        <h2 className="font-display text-center text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          <AuroraText colors={AURORA_COLORS_LIGHT}>
            {t("advantages.title")}
          </AuroraText>
        </h2>

        <ul className="mt-10 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGE_ITEMS.map(({ key, icon: Icon }) => (
            <li
              key={key}
              className="bg-brand-blue flex h-full w-full flex-col gap-4 rounded-lg border border-white/15 p-6 text-white shadow-lg shadow-black/20 transition-shadow duration-300 hover:shadow-xl"
            >
              <span className="bg-emerald-500 flex size-12 shrink-0 items-center justify-center rounded-md text-white shadow-sm">
                <Icon className="size-6" strokeWidth={2.25} />
              </span>
              <p className="text-base leading-relaxed font-semibold text-white">
                {t(`advantages.items.${key}`)}
              </p>
            </li>
          ))}
        </ul>

        <div className="bg-brand-blue-dark border-border relative isolate mt-8 grid min-h-68 items-stretch overflow-hidden rounded-md border shadow-sm transition-shadow duration-300 hover:shadow-lg sm:min-h-88 lg:grid-cols-2">
          <DotPattern
            id="tech-dot-pattern"
            className="text-white/20 [mask-image:linear-gradient(to_right,transparent,black_65%)]"
          />

          <div
            aria-hidden
            className="bg-emerald-500/20 pointer-events-none absolute top-1/2 left-1/4 hidden h-72 w-96 -translate-y-1/2 rounded-full blur-3xl sm:block"
          />

          {/* Left 50% — copy styled like "Nu știți de ce serviciu aveți nevoie?" */}
          <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8">
            <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {t("condensation.title")}
            </h3>

            <p className="mt-2 text-base leading-relaxed font-medium text-white/90 sm:text-lg">
              {condensationParagraphs[0]}
            </p>

            <ul className="mt-3 flex flex-col gap-2">
              {condensationParagraphs.slice(1).map((point, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <Check className="text-emerald-500 mt-1.5 size-4 shrink-0" />
                  <span className="text-base leading-relaxed font-medium text-white/90 sm:text-lg">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right 50% — photo */}
          <div className="relative min-h-64 lg:min-h-full">
            <Image
              src={condensationImage.src}
              alt={t("condensation.imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
