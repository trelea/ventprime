"use client"

/*
 * Static `DotPattern` — the Magic UI registry component, trimmed for this
 * codebase.
 *
 * The upstream template also shipped an animated `glow` flag: per-dot
 * `Math.random()` delays/durations driven by `motion/react`. That tripped the
 * `react-hooks/purity` lint (an impure call made every render), started an
 * animation loop the global `prefers-reduced-motion` override cannot cancel,
 * and nothing here wanted shimmering dots — which are also a GPU cost on
 * phones. What remains draws the same SVG grid, static: one circle per grid
 * cell, sized to the measured container, painted in `currentColor`, so a
 * `text-*` utility on `className` is still how you brand them.
 *
 * `use client` because the container is measured on mount (zero dots until
 * then) and on window resize; the template behaved the same way minus motion.
 */

import React, { useEffect, useRef, useState } from "react"
import { cn } from "cn"

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  /** Horizontal spacing between dots. */
  width?: number
  /** Vertical spacing between dots. */
  height?: number
  /** Offset of the entire pattern. */
  x?: number
  y?: number
  /** Offset of individual dots. */
  cx?: number
  cy?: number
  /** Radius of each dot. */
  cr?: number
  className?: string
  [key: string]: unknown
}

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}: DotPatternProps) {
  const containerRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  /*
   * `cols`/`rows` are 0 until the first measurement lands, so the pattern
   * starts empty and fills in on the client — as decorative background, that
   * pop-in is imperceptible.
   */
  const cols = Math.ceil(dimensions.width / width)
  const rows = Math.ceil(dimensions.height / height)
  const dots = Array.from({ length: cols * rows }, (_, i) => ({
    x: (i % cols) * width + cx + x,
    y: Math.floor(i / cols) * height + cy + y,
  }))

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80",
        className
      )}
      {...props}
    >
      {dots.map((dot) => (
        <circle
          key={`${dot.x}-${dot.y}`}
          cx={dot.x}
          cy={dot.y}
          r={cr}
          fill="currentColor"
        />
      ))}
    </svg>
  )
}
