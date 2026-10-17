"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";

/**
 * The hero's two contact cards, phone over email.
 *
 * Only the value is a link: clicking the number or the address fires `tel:` /
 * `mailto:`, while clicking the icon or the card's own padding does not. That
 * is why the anchor sits *inside* the wrapper instead of being the wrapper — a
 * click on the value still bubbles outward to toggle the card, so one click
 * both dials and collapses.
 *
 * Every click on a card toggles it, in both directions: expanded → icon-only,
 * and icon-only → expanded.
 *
 * ## The slide
 *
 * The collapse is animated by transitioning `grid-template-columns` on a
 * one-cell grid, from `1fr` to `0fr` (`duration-300`). That is the technique
 * for animating a width of `auto`: the value's own width is unknown, and
 * neither `width` nor `max-width` can interpolate from `auto` — a `max-width`
 * transition would need a hard-coded upper bound that silently clips the value
 * the day the client's address gets longer.
 *
 * Three details make it work:
 *
 * - The cell's child carries `min-w-0 overflow-hidden`; without them a grid
 *   item refuses to shrink below its content, and the value would overhang the
 *   card instead of being clipped.
 * - There is no flex `gap` on the card. The spacing between icon and value is
 *   the value's own left padding, so a collapsed card is exactly the icon plus
 *   the card's `px-4` — a 56px chip, not 66px.
 * - The padding sits on an inner span, not on the anchor: padding cannot be
 *   squeezed to zero, so a padded *cell* would floor the collapsed width at the
 *   padding sum.
 *
 * The value link stays mounted while collapsed (that is what makes the width
 * animate back), so it is taken out of the tab order and hidden from assistive
 * tech for the duration; it is zero-width and unclickable in that state anyway.
 * Anything that animates a link out of view has to do this, or keyboard focus
 * lands on an invisible target.
 *
 * The toggle itself is mouse- and touch-only, and that is deliberate. The card
 * cannot be a `<button>`: it contains the value's link, and interactive content
 * inside a button is invalid. It could be given `role="button"` and a key
 * handler, but that would be a lie for assistive tech — the card is not an
 * action, it is a container with a link in it — so it stays a plain element and
 * keyboard users simply keep the label on screen.
 *
 * Initial state is expanded, so the server-rendered HTML carries the full
 * banners and hydration produces identical markup — no layout shift.
 *
 * The two cards are deliberately *not* the same width: each is sized by its own
 * content, so the email one is wider than the phone one. They are right-aligned
 * (`items-end`) so their right edges stay flush with the screen edge — the
 * wrapper's negative margin reaches it, see the note in `hero.tsx`.
 */
export function HeroContactCards({
  phone,
  phoneDisplay,
  email,
}: {
  phone: string;
  phoneDisplay: string;
  email: string;
}) {
  const [expanded, setExpanded] = useState({ phone: true, email: true });

  const card =
    "text-brand-blue-dark flex h-14 cursor-pointer items-center rounded-l-2xl bg-white/70 px-4 shadow-lg backdrop-blur-md";
  const cell = (open: boolean) =>
    `grid min-w-0 transition-[grid-template-columns] duration-300 ease-out ${
      open ? "grid-cols-[1fr]" : "grid-cols-[0fr]"
    }`;
  const value = "min-w-0 overflow-hidden";

  /** The value's own padding is what spaces it from the icon and the card edge. */
  const valueText = "flex h-14 items-center px-7 text-lg font-bold whitespace-nowrap";

  return (
    <div className="hidden flex-col items-end gap-3 lg:flex lg:-mr-[calc(2rem_+_max(0px,calc((100vw_-_92rem)/2)))]">
      <div
        onClick={() => setExpanded((state) => ({ ...state, phone: !state.phone }))}
        className={card}
      >
        <Phone className="text-emerald-500 size-6 shrink-0" />
        <div className={cell(expanded.phone)}>
          <a
            href={`tel:${phone}`}
            tabIndex={expanded.phone ? undefined : -1}
            aria-hidden={!expanded.phone}
            className={value}
          >
            <span className={valueText}>{phoneDisplay}</span>
          </a>
        </div>
      </div>

      <div
        onClick={() => setExpanded((state) => ({ ...state, email: !state.email }))}
        className={card}
      >
        <Mail className="text-emerald-500 size-6 shrink-0" />
        <div className={cell(expanded.email)}>
          <a
            href={`mailto:${email}`}
            tabIndex={expanded.email ? undefined : -1}
            aria-hidden={!expanded.email}
            className={value}
          >
            <span className={valueText}>{email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
