# Taste
- Describes UI changes by pointing at an existing section (by id/name, e.g. the "#cifre section" / FAQ section) and expects that same visual treatment applied consistently across sections, rather than specifying raw CSS values. Confidence: 0.6
- Prefers larger, more legible UI text and icons (e.g. bumping `text-sm`/`size-4` to `text-base`/`size-5`, scaling up whole lockups, growing a form title `text-base`→`text-xl`, raising a footer line `text-xs`→`text-sm`) over small, compact sizing. Confidence: 0.65
- Expects parallel sections/columns (e.g. footer columns) to share one identical text style — same size, color, spacing, and hover treatment — instead of each block carrying its own bespoke styling. Confidence: 0.6
- Expects side-by-side columns (e.g. footer nav vs. contact block) to be vertically aligned so their content starts at the same level, rather than each column starting flush at its own top. Confidence: 0.55
- Wants icons paired with text items (e.g. nav/list links in a column), not text-only lists. Confidence: 0.5
- Prefers light, minimal, "modern" form styling: white/light cards instead of dark ones, and unboxed fields showing only a bottom border with a label plus a simple placeholder — no fills, no full outlines. Confidence: 0.6
- Multi-locale copy should be localized per language (EN/RO/RU natives like "Contact Us"/"Contactează-ne"/"Свяжитесь с нами") rather than dropping one literal string into every locale file. Confidence: 0.5
 — overrides the primitive's bold (`font-bold`) with `font-normal` so labels read thin. Confidence: 0.5
- Prefers generous, uniform breathing room around cards/forms — e.g. bumping `p-6` to `p-8` (and `lg:p-10`), padded on all four sides. Confidence: 0.5
- Prefers subtle, faded shadows for elevation — soft low-opacity shadows (e.g. Tailwind `shadow-lg shadow-black/10` with slight y-offset and blur) to gently lift rounded/full-bleed bands, not heavy or hard-edged shadows. Confidence: 0.5
- Prefers minimal footer/legal bars: one plain single line over multi-column layouts with extra legal metadata (registration IDs, separate "all rights reserved" notices). Confidence: 0.5
- Prioritizes SEO and performance: wants pages/components rendered server-side wherever possible (Next.js App Router Server Components), keeping `"use client"` boundaries to the minimum genuinely-interactive leaves. Confidence: 0.75
