"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { cn } from "cn";

/**
 * Count-up number for the STATS band (AGENTS.md §5.3).
 *
 * The spec requires the **final** number to be server-rendered so it is correct
 * without JS and readable by crawlers, with animation as pure enhancement.
 * So unlike a stock ticker — which renders `0` and mutates `textContent` — this
 * renders the correctly formatted value in HTML and only starts counting when
 * it scrolls into view. If JS is off, the real number stays on screen.
 *
 * Number formatting is passed in already formatted for the active locale
 * (Moldovan/Romanian uses "." for thousands, Russian uses a space).
 */
export function StatCounter({
  value,
  formatted,
  locale,
  className,
  delay = 0,
}: {
  value: number;
  /** Locale-correct rendering of `value`, produced on the server. */
  formatted: string;
  locale: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 90 });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isInView) {
      timer = setTimeout(() => motionValue.set(value), delay * 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isInView, motionValue, value, delay]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (!ref.current) return;
        // Only animate non-zero magnitudes; "0 lei" is a headline figure on
        // its own and looks wrong counting up from zero.
        if (value === 0) return;
        ref.current.textContent = new Intl.NumberFormat(locale).format(
          Math.round(latest),
        );
      }),
    [springValue, locale, value],
  );

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {formatted}
    </span>
  );
}