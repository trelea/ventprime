/*
 * `Meteors` — the Magic UI registry component, adjusted for this codebase.
 *
 * - Streak positions/delays/durations come from a deterministic pseudo-random
 *   sequence (a pure function of the index) instead of the registry's
 *   `Math.random()` + `useState` pile: render stays pure (the React compiler
 *   lint rejects both impure calls and `setState` inside effects), the SSR
 *   output matches hydration, and the component ships no client JS at all —
 *   the flight is one CSS keyframe loop (`--animate-meteor` in globals.css),
 *   which the global reduced-motion override already neutralises.
 * - Offsets are % of the mounting box rather than `window.innerWidth`:
 *   these streaks fly across the stats band, not the viewport, and a server
 *   render has no `window` to read.
 * - Head and tail paint in `currentColor`, so the caller brands the streaks
 *   with a `text-*` utility — the same trick the dot pattern uses.
 */

import React from "react"
import { cn } from "cn"

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
}

/*
 * Cheap deterministic pseudo-random in [0, 1): the sine hash returns the same
 * fraction for the same integer input on every render, server or client.
 */
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10_000
  return x - Math.floor(x)
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) => {
  const meteors = Array.from({ length: number }, (_, index) => {
    const left = pseudoRandom(index * 7 + 1)
    const delay = minDelay + pseudoRandom(index * 13 + 2) * (maxDelay - minDelay)
    const duration =
      minDuration + pseudoRandom(index * 29 + 3) * (maxDuration - minDuration)

    return {
      "--angle": `${-angle}deg`,
      top: "-5%",
      left: `${Math.round(left * 1000) / 10}%`,
      animationDelay: `${delay.toFixed(2)}s`,
      animationDuration: `${duration.toFixed(2)}s`,
    } as React.CSSProperties
  })

  return (
    <>
      {meteors.map((style, idx) => (
        // Meteor head, with its tail stretched out behind it.
        <span
          key={idx}
          aria-hidden
          style={style}
          className={cn(
            "animate-meteor pointer-events-none absolute size-0.5 rotate-(--angle) rounded-full bg-current",
            className
          )}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-12.5 -translate-y-1/2 bg-linear-to-r from-current to-transparent" />
        </span>
      ))}
    </>
  )
}
