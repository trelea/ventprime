"use client";

import { useState } from "react";
import Image from "next/image";
import { Slider } from "@base-ui/react/slider";
import { useTranslations } from "next-intl";
import { getImage, type ImageName } from "@/lib/images";
import { cn } from "cn";

/**
 * Before / after comparison slider (AGENTS.md §5.6 Block B).
 *
 * The "after" image is clipped with `clip-path` driven by the slider value, so
 * both images are painted on every frame and the transition is pure GPU work —
 * no image swapping, no layout shift.
 */
export function BeforeAfterSlider({
  before,
  after,
  alt,
  labels,
}: {
  before: ImageName;
  after: ImageName;
  alt: string;
  labels: { before: string; after: string };
}) {
  const [position, setPosition] = useState(50);
  const t = useTranslations("Feedback.section");

  const beforeImage = getImage(before);
  const afterImage = getImage(after);

  return (
    <div className="space-y-3">
      <div className="bg-surface-section relative aspect-4/3 w-full overflow-hidden rounded-2xl select-none">
        <Image
          src={beforeImage.src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
        />

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={afterImage.src}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        </div>

        <span className="absolute top-3 left-3 rounded-full bg-brand-blue-dark/80 px-3 py-1 text-xs font-medium text-white">
          {labels.before}
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-brand-green px-3 py-1 text-xs font-medium text-white">
          {labels.after}
        </span>

        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-md"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-blue-dark shadow-md">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </span>
        </div>

        <Slider.Root
          value={position}
          onValueChange={(value: number | number[]) =>
            setPosition(Array.isArray(value) ? (value[0] ?? 50) : value)
          }
          min={0}
          max={100}
          aria-label={t("projectsTitle")}
          className="absolute inset-0 size-full opacity-0"
        >
          <Slider.Control className="size-full" />
          <Slider.Track className="size-full">
            <Slider.Indicator className="size-full" />
          </Slider.Track>
          <Slider.Thumb
            className={cn(
              "size-9 rounded-full bg-white shadow-md",
              "focus-visible:ring-brand-green focus-visible:ring-3",
            )}
          />
        </Slider.Root>
      </div>
    </div>
  );
}