"use client";

import React, { useCallback, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * MagicCard (`@magicui/magic-card`) adapted to VENTPRIME brand colors.
 * Highlights borders and casts a soft spotlight following the pointer.
 */
export interface MagicCardProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * The card's own surface, painted inside the 1px gradient ring. Defaults to
   * the page background, which is what an ordinary card wants; a caller can pass
   * a translucent colour plus `backdrop-blur-xl` to make the surface frosted
   * glass over whatever is painted behind the card.
   */
  panelClassName?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export function MagicCard({
  children,
  className,
  panelClassName = "bg-background",
  gradientSize = 240,
  gradientColor = "rgba(30, 111, 184, 0.08)",
  gradientOpacity = 0.85,
  gradientFrom = "#1E6FB8",
  gradientTo = "#10b981",
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const reset = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [gradientSize, mouseX, mouseY]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    reset();
  }, [reset]);

  const ringBackground = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientFrom},
      ${gradientTo},
      var(--color-border) 100%
    )
  `;

  const spotlightBackground = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor},
      transparent 100%
    )
  `;

  return (
    <motion.div
      className={cn(
        "group relative isolate overflow-hidden rounded-[inherit]",
        className,
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {/*
        The 1px gradient ring.

        It used to be the card's own layered background — `linear-gradient(fill)
        padding-box, radial-gradient(…) border-box` — which cannot survive a
        translucent surface: with nothing opaque left in the padding box, the
        border-box gradient washes the whole card. As a masked, one-pixel-padded
        overlay it paints only the ring, and the surface becomes a layer of its
        own (`panelClassName`): opaque by default, frosted glass where a caller
        asks for it.

        The mask keeps the difference between the element's border box and its
        content box; `p-px` makes that difference exactly the border width. The
        shorthands come before the composite longhands on purpose — React
        assigns inline styles in key order, and `mask` would reset
        `mask-composite`.

        The resting colour is `var(--color-border)`, which resolves against the
        `--border` in scope, so a caller that scopes that token gets the ring in
        the same hairline colour as the rest of its surface.
      */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] p-px"
        style={{
          background: ringBackground,
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
        }}
      />

      <div
        className={cn(
          "absolute inset-px z-20 rounded-[inherit]",
          panelClassName,
        )}
      />

      <motion.div
        suppressHydrationWarning
        className="pointer-events-none absolute inset-px z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: spotlightBackground,
          opacity: gradientOpacity,
        }}
      />

      <div className="relative z-40">{children}</div>
    </motion.div>
  );
}
