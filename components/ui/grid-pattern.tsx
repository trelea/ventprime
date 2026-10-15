import { type SVGProps } from "react"

import { cn } from "@/lib/utils"

/**
 * Magic UI `grid-pattern` (`npx shadcn@latest add @magicui/grid-pattern`).
 *
 * Source: https://magicui.design/r/grid-pattern.json — the only change is the
 * `id` prop below, and the type import, so the component stays a *Server*
 * Component:
 *
 * 1. Upstream calls `useId()` to name the `<pattern>`. `useId` is client-only,
 *    and the one caller here — the hero — is an async Server Component, where
 *    calling it throws. `id` therefore comes from the caller instead. It must
 *    be unique per document: two instances sharing an id means the second one
 *    renders the first one's pattern (duplicate `url(#…)` targets).
 * 2. `React.SVGProps<SVGSVGElement>` needs `React` in scope; importing the type
 *    directly is what the other registry ports here do (`marquee.tsx`).
 *
 * Staying server-rendered is the point: the pattern is decoration on the hero,
 * which is the LCP element, and this way it costs no JavaScript at all.
 */

interface GridPatternProps extends SVGProps<SVGSVGElement> {
  /** Unique per document — used as the `<pattern>` id. */
  id: string
  width?: number
  height?: number
  x?: number
  y?: number
  squares?: Array<[x: number, y: number]>
  strokeDasharray?: string
  className?: string
  [key: string]: unknown
}

export function GridPattern({
  id,
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  squares,
  className,
  ...props
}: GridPatternProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width - 1}
              height={height - 1}
              x={x * width + 1}
              y={y * height + 1}
            />
          ))}
        </svg>
      )}
    </svg>
  )
}
