"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";

/**
 * The hero's two contact cards, phone over email.
 *
 * Only the value is a link: clicking the number or the address fires `tel:` /
 * `mailto:`. That click stops there (`stopPropagation`), so following the link
 * never collapses the card. Clicking anywhere else on the card — the icon or
 * the padding — toggles it.
 *
 * Every click on the card *outside* the value toggles it, in both directions:
 * expanded → icon-only, and icon-only → expanded.
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
 *   the card's own horizontal padding (which steps up a little when collapsed,
 *   see `card()`) — a small square-ish chip, not the icon plus the value's pad.
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
 *
 * Below `lg` the wrapper stays content-width and is pushed right with
 * `ml-auto`; a negative right margin equal to the section gutter (`-mr-4 sm:
 * -mr-6`) lets it reach past the container padding so the cards sit flush with
 * the screen edge, bottom-right under the CTAs. At `lg` the larger
 * edge-reaching margin (which also accounts for the centred max-width) takes
 * over.
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

  // Every size (banner height, horizontal padding, text and icon) steps up with
  // the breakpoint: a compact chip on phones and the roomy 56px banner at `lg`.
  //
  // Horizontal padding depends on state: `open` uses the tight padding that
  // also spaces the value from the icon, while collapsing to the icon-only chip
  // gets a touch more so the little tab doesn't look cramped.
  const card = (open: boolean) =>
    `text-brand-blue-dark flex h-12 cursor-pointer items-center rounded-l-2xl bg-white/70 shadow-lg backdrop-blur-md lg:h-14 ${
      open ? "px-3.5 lg:px-4" : "px-4 lg:px-5"
    }`;
  const cell = (open: boolean) =>
    `grid min-w-0 transition-[grid-template-columns] duration-300 ease-out ${
      open ? "grid-cols-[1fr]" : "grid-cols-[0fr]"
    }`;
  const value = "min-w-0 overflow-hidden";

  /** The value's own padding is what spaces it from the icon and the card edge. */
  const valueText =
    "flex h-12 items-center px-4 text-base font-bold whitespace-nowrap lg:h-14 lg:px-7 lg:text-lg";

  return (
    <div className="ml-auto -mr-4 flex flex-col items-end gap-3 sm:-mr-6 lg:-mr-[calc(2rem_+_max(0px,calc((100vw_-_92rem)/2)))]">
      <div
        onClick={() => setExpanded((state) => ({ ...state, phone: !state.phone }))}
        className={card(expanded.phone)}
      >
        <Phone className="text-emerald-500 size-5 shrink-0 lg:size-6" />
        <div className={cell(expanded.phone)}>
          <a
            href={`tel:${phone}`}
            tabIndex={expanded.phone ? undefined : -1}
            aria-hidden={!expanded.phone}
            onClick={(event) => event.stopPropagation()}
            className={value}
          >
            <span className={valueText}>{phoneDisplay}</span>
          </a>
        </div>
      </div>

      <div
        onClick={() => setExpanded((state) => ({ ...state, email: !state.email }))}
        className={card(expanded.email)}
      >
        <Mail className="text-emerald-500 size-5 shrink-0 lg:size-6" />
        <div className={cell(expanded.email)}>
          <a
            href={`mailto:${email}`}
            tabIndex={expanded.email ? undefined : -1}
            aria-hidden={!expanded.email}
            onClick={(event) => event.stopPropagation()}
            className={value}
          >
            <span className={valueText}>{email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
