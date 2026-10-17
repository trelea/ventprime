import { type SVGProps } from "react";
import { cn } from "cn";

/*
 * Static `DotPattern` — the Magic UI registry component, ported to a Server
 * Component.
 *
 * The registry version measures its container with `useEffect` + `useState`
 * (and a window `resize` listener) to work out how many dots to emit, which
 * forces `"use client"` and ships that stateful code on every page that uses
 * it. It isn't needed: an SVG `<pattern>` tiles itself, so a single `<rect>`
 * filled with `url(#id)` covers any container size, at any breakpoint, with no
 * measurement and no JavaScript. This is the same approach `grid-pattern.tsx`
 * uses to stay server-rendered.
 *
 * Consequence, meant on purpose: the pattern is identical on server and client
 * and is present in the initial HTML — instead of starting empty and popping in
 * on hydration — and costs zero bytes of client JS. It is also far fewer DOM
 * nodes (one `<rect>` + one `<pattern>` versus a `<circle>` per grid cell).
 *
 * `id` is required and comes from the caller because `useId()` is client-only.
 * It must be unique per document: two instances sharing an id means the second
 * renders the first one's pattern.
 *
 * Dots paint in `currentColor`, so a `text-*` utility on `className` brands
 * them, exactly as before.
 */

interface DotPatternProps extends SVGProps<SVGSVGElement> {
  /** Unique per document — used as the `<pattern>` id. */
  id: string;
  /** Horizontal spacing between dots. */
  width?: number;
  /** Vertical spacing between dots. */
  height?: number;
  /** Offset of the entire pattern. */
  x?: number;
  y?: number;
  /** Offset of each dot within its cell. */
  cx?: number;
  cy?: number;
  /** Radius of each dot. */
  cr?: number;
  className?: string;
}

export function DotPattern({
  id,
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
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80",
        className,
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
          <circle cx={cx} cy={cy} r={cr} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
