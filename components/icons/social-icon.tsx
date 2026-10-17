import type { SVGProps } from "react";

/**
 * Brand glyphs for the footer's social row.
 *
 * Hand-inlined rather than pulled from `lucide-react`: v1 removed every brand
 * icon (`Facebook`, `Instagram`, …), and dragging in a second icon package for
 * two marks is not worth the dependency. Both are drawn in the site's line-icon
 * language — 24px viewBox, 2px stroke, round caps/joins, `currentColor` — so
 * they sit beside the lucide icons used everywhere else (AGENTS.md §8).
 */

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/** Keyed by the `site.socials` label, so a profile's `label` picks its glyph. */
export const SOCIAL_ICONS: Record<string, (props: SVGProps<SVGSVGElement>) => React.ReactElement> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
};
