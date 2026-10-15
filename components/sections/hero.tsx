import Image from "next/image";
import { LayoutGrid, Wind } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getImage } from "@/lib/images";
import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuroraText } from "@/components/ui/aurora-text";
import { UspGlyph } from "@/components/icons/service-icon";
import { container } from "@/components/sections/section";
import { HeroContactCards } from "@/components/sections/hero-contact-cards";
import { GridPattern } from "@/components/ui/grid-pattern";

/**
 * Aurora Text gradient for the headline: brand blue, brand green, white.
 *
 * The blue is a lightened brand blue rather than `--brand-blue` itself. At
 * #1E6FB8 the blue stop sits at ~2.7:1 against the `brand-blue-dark` overlay —
 * below the 3:1 large text requires — while #5AA9E6 clears 5:1 on the same
 * backdrop and still reads as the brand blue. Green (#2FB36D) and white both
 * pass on that backdrop unchanged.
 */
const AURORA_COLORS = ["#5AA9E6", "#2FB36D", "#FFFFFF"];

/** First letter upper-cased, the rest left alone. */
const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

/**
 * HERO (`#acasa`) — AGENTS.md §5.1.
 *
 * Edge-to-edge and exactly one viewport tall on every device, phones included.
 * That works because the header is `fixed` (out of the flow) rather than
 * `sticky`, so this section starts at y=0 and owns the full screen.
 *
 * Width is `w-full`, deliberately not `100vw`: the whole `vw`/`svw`/`dvw`
 * family is measured as if no scrollbar existed, so on desktop it would
 * overflow horizontally by the scrollbar width and raise a horizontal
 * scrollbar. As a block-level element in `main`, `100%` is already the full
 * viewport width.
 *
 * Desktop: full-bleed photo with a blue→transparent gradient over the left
 * half; text block on the left, image subject visible on the right.
 * Mobile: same single screen, tighter type scale and full-width CTAs.
 *
 * The copy block is exactly four things — headline, description, the three USP
 * badges, two buttons. It used to also carry an eyebrow, a tagline, a phone +
 * messenger row, a callback microcopy and a Google/experience trust strip; all
 * five were removed, so the headline leads. The three badges are what keeps the
 * "no electricity / no maintenance / warranty" promise on screen.
 *
 * The headline is deliberately short ("Ventilation without electricity") and the
 * description carries the long copy: the local keywords AGENTS.md §5.9 wants on
 * the H1 (mold, damp, basements, attics, "all over Moldova") moved there, and
 * the description is set a step larger than body copy to hold that weight. That
 * makes the copy column taller than the old one-line subtitle did — on short
 * laptop viewports the hero now grows past one screen instead of fitting it,
 * which is fine under `min-h-screen-safe` but is why the vertical gaps here are
 * tighter than they look.
 */
export async function Hero() {
  const t = await getTranslations("Hero");
  const tNav = await getTranslations("Nav");
  const hero = getImage("hero-house-exterior");

  // The headline breaks before its last word, so three words read as two lines.
  // The last word is capitalised as the visual climax of the headline.
  const headlineWords = t("title").split(" ");
  const headlineLastWord = capitalize(headlineWords.at(-1) ?? "");
  const headlineFirstLine = headlineWords.slice(0, -1).join(" ");

  const usps = [
    { id: "no-electricity", icon: "zap-off" as const, label: t("usp.noElectricity") },
    { id: "no-maintenance", icon: "wrench" as const, label: t("usp.noMaintenance") },
    {
      id: "warranty",
      icon: "shield-check" as const,
      label: t("usp.warranty", { years: site.warrantyYears }),
    },
  ];

  return (
    <section
      id="acasa"
      className="relative isolate flex min-h-screen-safe w-full flex-col overflow-hidden"
    >
      <Image
        src={hero.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />

      {/* Blue → transparent so the left-hand text stays legible (AGENTS.md §8). */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-brand-blue-dark/95 via-brand-blue-dark/70 to-brand-blue-dark/10"
      />

      {/*
        Grid texture under the copy (Magic UI `grid-pattern`, AGENTS.md §5.1).
        Zero JS — it is an inline SVG in the server HTML, so it adds nothing to
        the LCP element's budget, and it does not animate.

        Full-bleed on purpose, and *not* on the `container` guide: the mesh runs
        from the extreme left edge of the viewport to roughly the middle. The
        mask below is what gives it that extent — a single horizontal fade that
        is gone by 52% — so moving that stop moves the end of the mesh. An
        earlier revision nested this in `container` so the grid's left edge
        landed on the H1's edge; that is deliberately not the case here.

        Two mask layers, composited: the right fade ends the mesh at the middle,
        the top/bottom fade keeps the lines off the hero's top edge and off the
        seam with the SERVICES section — without it the mesh would be hard-cut
        at both.

        It paints over the blue gradient (which is earlier in the DOM at the same
        `-z-10`) and under the copy, and 10-20% white is the whole effect: the
        texture reads clearly over the photo while the copy's contrast stays
        untouched.
      */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <GridPattern
          id="hero-grid-pattern"
          width={48}
          height={48}
          className="fill-white/10 stroke-white/20 [mask-image:linear-gradient(to_right,white,transparent_52%),linear-gradient(to_bottom,transparent,white_8%,white_92%,transparent)] [mask-composite:intersect]"
        />
      </div>

      {/*
        `flex-1` lets this column absorb the full viewport height so the content
        centres within it. `pt-28` clears the fixed header (80px) plus
        breathing room; on portrait phones the section grows past 100svh rather
        than clipping, because the utility sets `min-height`.

        The column is a *wrapping row*, not a column: the copy block is its
        first item and the contact cards are the second, on one line at `lg`+.
        `content-center` keeps that line centred vertically exactly as the old
        `flex-col justify-center` centred the copy, and `items-end` puts both
        items on the line's bottom edge — which is what makes the cards sit on
        the buttons' level, since the buttons are the copy block's last row. A
        plain `flex-row items-end` could not do this: it would pin the copy to
        the bottom of the hero instead of centring it.

        The copy carries `lg:grow lg:basis-0` for a load-bearing reason: wrap
        decisions are made from items' base sizes before any shrinking, so with
        the copy's `max-w-2xl` as its basis the line overflows and the cards
        wrap onto a second row under the copy — which is what happened at 1024px
        (960px of content minus a 672px copy, a 40px gap and a 265px card equals
        overflow). A zero basis means the copy takes whatever is left and the
        cards always stay on the line. `max-w-2xl` still caps it, so from 1344px
        up the copy is 672px wide exactly as before.

        `pb-24` is now only bottom breathing room. It used to keep the CTAs clear
        of the floating messenger cluster pinned to the bottom-right — that
        cluster and the mobile action bar were deleted
        (`components/layout/floating-actions`, `mobile-sticky-bar`) — so what is
        left is the gap under the buttons on short viewports, where the hero
        grows past `min-h-screen-safe`. Desktop tightens it (`lg:pb-12`) since
        the copy is vertically centred there.

        The width comes from the shared `container` rule, and the gutter stays
        on this column rather than on the `<section>`: the section owns the
        `fill` photo and the `inset-0` overlay, and an absolutely positioned
        child resolves against its ancestor's padding box — padding the section
        would shrink the photo away from the viewport edges.
      */}
      <div
        className={`${container} flex flex-1 flex-wrap content-center items-end justify-between gap-10 pt-28 pb-24 lg:pt-32 lg:pb-12`}
      >
        <div className="max-w-2xl min-w-0 lg:grow lg:basis-0">
          {/*
            The headline, on two lines in Magic UI's `AuroraText`.

            Two lines, not three: the copy is exactly three words in every
            locale ("Ventilation without electricity", "Ventilație fără
            electricitate", "Вентиляция без электричества"), and the break is
            placed before the last word — first line all but the last word,
            second line the last. A `<br />` rather than block spans on purpose:
            the gradient has to wrap one continuous inline box across both
            lines, and nested block elements inside the component's inline
            gradient span would fragment its background per line.

            `font-display` is Onest, which is the only face here with a 900 axis
            — Manrope tops out at 800. See the font comment in
            `app/[locale]/layout.tsx`.

            Colours are brand blue, brand green and white. The blue is a
            lightened brand blue, not `--brand-blue` itself: at #1E6FB8 the blue
            stop lands at ~2.7:1 against the blue-dark overlay, under the 3:1
            large text needs, while this one clears 5:1 on the same backdrop.
          */}
          <h1 className="font-display text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            <AuroraText colors={AURORA_COLORS}>
              {headlineFirstLine}{" "}
              <br />
              {headlineLastWord}
            </AuroraText>
          </h1>

          <p className="mt-6 text-xl leading-relaxed font-medium text-pretty text-white/85 sm:text-2xl">
            {t("subtitle")}
          </p>

          {/*
            `grid-cols-1 md:grid-cols-3` rather than flex-wrap so the three
            badges are the same width as each other: every cell is an equal
            third of the copy column. Columns only exist from `md` up — below
            that the badges stack at full width, which is the same width as each
            other too, and matches the full-width buttons underneath. The
            `whitespace-nowrap` the Badge ships is why the column has to clear
            the longest label ("Fără electricitate") with room to spare; at
            `md`+ each cell is ~218px inside the 672px column.
          */}
          <ul className="mt-7 grid grid-cols-1 gap-2 md:grid-cols-3">
            {usps.map((usp) => (
              <li key={usp.id}>
                <Badge
                  variant="secondary"
                  className="w-full gap-2 border-white/15 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur [&_svg]:size-5"
                >
                  <UspGlyph icon={usp.icon} className="text-brand-green" />
                  {usp.label}
                </Badge>
              </li>
            ))}
          </ul>

          {/*
            Two CTAs, equal width, carrying the brand trio: green on the
            primary, white on the secondary's surface with brand blue for its
            label, and white type on both.

            A grid rather than `flex sm:flex-row` with `w-auto` buttons, for the
            same reason the badges above use one: the two labels differ in
            length ("Serviciile noastre" vs "Tehnologie"), so auto-width buttons
            never match. Each column is half the copy column minus the gap;
            below `sm` they stack at full width, which is identical for both as
            well.

            The secondary is a filled white button rather than the old
            transparent outline: on a dark blue photo backdrop white separates
            best, and `text-brand-blue` on white is 5.2:1 — the same ratio white
            type on brand green gets. `font-bold` is a real 700 on IBM Plex
            Sans, which is served as a variable font with a 100-700 axis (see
            the font comment in the layout), so it is not a synthesised bold.
          */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ButtonLink
              render={<Link href={{ pathname: "/", hash: "#servicii" }} />}
              size="lg"
              className="bg-brand-green hover:bg-brand-green/90 h-14 w-full gap-2.5 text-lg font-bold text-white"
            >
              <LayoutGrid className="size-6" />
              {t("cta.services")}
            </ButtonLink>
            <ButtonLink
              render={<Link href={{ pathname: "/", hash: "#tehnologie" }} />}
              size="lg"
              className="text-brand-blue h-14 w-full gap-2.5 bg-white text-lg font-bold hover:bg-white/90"
            >
              <Wind className="size-6" />
              {t("cta.technology")}
            </ButtonLink>
          </div>
        </div>

        {/*
          Contact cards, on the buttons' level: phone over email.

          They are the row's second item, so `items-end` on the column lands them
          on the copy block's bottom edge — the same edge the buttons sit on. No
          absolute positioning, no magic offsets.

          The cards themselves are a small client island
          (`components/sections/hero-contact-cards.tsx`) because clicking one
          collapses it to its icon. This wrapper keeps the layout concerns:
          `items-end`-style right alignment inside the island, and the negative
          margin below, which cancels exactly the two things that keep the cards
          off the right edge — the container's `lg:px-8` gutter, and its centring
          once the viewport is wider than the 92rem cap. That is the same
          geometry the `container` rule is built from, so the two move together
          if either changes. `100vw` rather than the layout width means a
          scrollbar makes this overshoot by its width; harmless, because the
          section clips it and the card is square and borderless on that side.

          Hidden below `lg`: there the copy is full width and the cards would
          land on the headline, so phone and email stay in the contacts section
          for those screens.
        */}
        <HeroContactCards
          phone={site.contact.phone}
          phoneDisplay={site.contact.phoneDisplay}
          email={site.contact.email}
        />
      </div>

      <span className="sr-only">{tNav("home")}</span>
    </section>
  );
}