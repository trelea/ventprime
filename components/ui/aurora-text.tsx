import { type ReactNode } from "react"

/**
 * Magic UI `aurora-text` (`npx shadcn@latest add @magicui/aurora-text`).
 *
 * Source: https://magicui.design/r/aurora-text.json — adapted in three ways:
 *
 * 1. `"use client"` and `memo` are dropped. The registry marks it a client
 *    component, but it holds no state and calls no hook; it is a span with an
 *    inline style. Keeping it server-rendered means the hero headline costs no
 *    JavaScript, which matters because that headline is the LCP element.
 * 2. The `animate-aurora` keyframes live in `app/globals.css` without the
 *    registry's `transform: rotate()/scale()` — see the note there.
 * 3. The props are typed without the `React` namespace, matching how the other
 *    registry ports here are typed (`marquee.tsx`).
 *
 * Both registry traits worth knowing about are kept:
 *
 * - The gradient sweeps because `background-size` is 200% (`bg-size-[200%_auto]`)
 *   and the keyframes move `background-position`.
 * - The text is duplicated: a `sr-only` copy for assistive tech, and an
 *   `aria-hidden` one that carries the gradient. So the heading is announced
 *   once, and it stays real text — selectable, and present in the HTML.
 */

interface AuroraTextProps {
  children: ReactNode
  className?: string
  colors?: string[]
  /** Multiplier on the 10s sweep: `2` is twice as fast. */
  speed?: number
}

export function AuroraText({
  children,
  className = "",
  colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
  speed = 1,
}: AuroraTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="sr-only">{children}</span>
      <span
        aria-hidden="true"
        className="animate-aurora relative bg-size-[200%_auto] bg-clip-text text-transparent"
        style={{
          // Closed with the first colour so the sweep loops without a seam.
          backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${
            colors[0]
          })`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animationDuration: `${10 / speed}s`,
        }}
      >
        {children}
      </span>
    </span>
  )
}
