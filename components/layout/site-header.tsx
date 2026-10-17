"use client";

import { useEffect, useState } from "react";
import { Menu, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { servicePath, services } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ServiceGlyph } from "@/components/icons/service-icon";
import { Logo } from "@/components/layout/logo";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { cn } from "cn";

/** Anchor sections shown in the navbar, in document order. */
const SECTIONS = [
  { hash: "#servicii", key: "services" },
  { hash: "#tehnologie", key: "tech" },
  { hash: "#despre", key: "about" },
  { hash: "#intrebari", key: "faq" },
  { hash: "#contacte", key: "contacts" },
] as const;

/** Sections shown as top-level links (Servicii is rendered separately). */
const NAV_SECTIONS = SECTIONS.filter(
  (section) => section.hash !== "#servicii",
);

/** All home anchors observed by scroll-spy (includes Hero to clear active state at top). */
const OBSERVED_HASHES = ["#acasa", ...SECTIONS.map((section) => section.hash)];

/**
 * Alternating brand accents for the four service chips, in `services` order:
 * passive and mold read blue, forced and drilling read green.
 *
 * A function of the index rather than a field on `Service`, so the dropdown and
 * the mobile sheet cannot drift apart — neither should need a copy change to
 * re-colour an icon. Index 0 is blue, so the odd indices are the green ones.
 */
const serviceAccent = (index: number) =>
  index % 2 === 0 ? "bg-brand-blue" : "bg-emerald-500";

/**
 * Floating glass header: logo left, nav centred, locale switcher + a single
 * "Get in touch" CTA on the right.
 *
 * `fixed`, not `sticky` — a sticky header still reserves its 80px in normal
 * flow, which pushed the hero down and left a white band above it. Fixed takes
 * it out of the flow so the hero can start at y=0 and fill the viewport, with
 * the header floating over the top of it.
 *
 * `pointer-events-none` on the wrapper with `pointer-events-auto` on the pill
 * is what lets clicks pass through the transparent gutters onto the hero.
 *
 * The nav is centred by taking it out of the grid and pinning it to the pill's
 * own centre (`left-1/2 -translate-x-1/2`), not by giving it a middle grid
 * column. A middle column cannot centre it: the logo and the CTA differ in
 * width, so whatever is left over is not itself centred, and the shadcn
 * component's `max-w-max` would pin the nav flush against the logo anyway.
 * `grid-cols-2` then just balances the two side clusters.
 */
export function SiteHeader() {
  const t = useTranslations("Nav");
  // Short, nav-specific copy (`Services.nav.*`). The full card titles run to
  // 72 characters in RO, which wraps to three lines in a 2x2 cell and leaves
  // the four cells ragged — these are written to fit one line.
  const tServicesNav = useTranslations("Services.nav");

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#acasa");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy for the anchor links (AGENTS.md §4).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    for (const hash of OBSERVED_HASHES) {
      const element = document.querySelector(hash);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const contactLink = { pathname: "/" as const, hash: "#contacte" };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-safe sm:px-6 lg:px-8">
      {/*
        Glossy frost that fills the header and blurs whatever scrolls under it.

        `inset-y-0` stretches it across the header's full padding box (the pill
        plus its `pt-safe`), so the blur covers the whole bar from the very top
        instead of hanging below it. The negative gutters cancel the header's own
        `px-*` so the frost still spans the full viewport: stopping it at the
        padding box (x=32 at `lg`) left a faint vertical step where the haze
        began, since content scrolls under the whole bar width.

        No white tint — a pure `backdrop-blur` frosts the underlay only. The pill
        stays opaque white, so this only shows through the gutters beside the
        pill and the safe-area strip above it, where content scrolls past the
        bar's edges.

        A `backdrop-filter` has a single strength, not a gradient, so the fade is
        done by masking the layer instead of by grading the blur: fully opaque at
        the top of the bar, gone by its bottom edge. `-z-10` keeps it inside the
        header's own stacking context — behind the pill but still over the page.
        It rides the same `scrolled` flag as the pill's border and shadow, so the
        header changes state in one step, and stays `pointer-events-none` like
        the gutters it spans (see the wrapper note above).
      */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 -inset-x-4 -z-10 sm:-inset-x-6 lg:-inset-x-8",
          "backdrop-blur-md transition-opacity duration-300",
          "[mask-image:linear-gradient(to_bottom,black_0%,black_30%,transparent_100%)]",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        className={cn(
          // This pill's box — `min(88rem, 100vw - 2 x gutter)` — is the width
          // rule of the whole site: `container` in `components/sections/section`
          // resolves to the same box, so every section's content edges land on
          // this bar's edges at every viewport width. Change one, check the
          // other.
          "pointer-events-auto relative mx-auto grid h-16 max-w-[88rem] grid-cols-2 items-center gap-4 rounded-lg border border-transparent px-4 transition-all duration-300",
          // Fully opaque so the nav reads as a solid bar over the full-bleed
          // hero. The frost behind it is for the gutters beside the pill and the
          // safe-area strip above it, not for reading through the bar itself.
          "bg-background",
          scrolled && "border-border shadow-lg shadow-black/5",
        )}
      >
        {/* Left — logo */}
        <Link
          href="/"
          className="justify-self-start"
          aria-label={t("home")}
        >
          <Logo priority className="h-9 w-auto" />
        </Link>

        {/*
          Centre — navigation.

          shadcn `NavigationMenu` on Base UI (`components/ui/navigation-menu`).
          This replaces a hand-rolled `onMouseEnter`/`useState` dropdown: the
          primitive now owns keyboard handling, ARIA wiring and viewport-aware
          positioning, so the panel can't overflow near the right edge.
        */}
        <NavigationMenu className="absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
          <NavigationMenuList>
            {/* Services — dropdown with a 2x2 grid of the four services. */}
            <NavigationMenuItem>
              <NavigationMenuTrigger data-active={active === "#servicii" || undefined}>
                {t("services")}
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                {/*
                  Fixed width plus `auto-rows-fr`: the four cards must read as
                  one 2x2 block, so both grid rows resolve to the same height
                  and every card fills its cell (`h-full` on the link). Without
                  this the card's painted box was only as tall as its own text —
                  RU titles wrap to two lines and one-line descriptions left the
                  hover highlight a different size on every card.
                */}
                <ul className="grid w-[min(36rem,calc(100vw-3rem))] gap-1.5 sm:auto-rows-fr sm:grid-cols-2">
                  {services.map((service, index) => (
                    <li key={service.key} className="flex">
                      <NavigationMenuLink
                        // `render` keeps next-intl in the chain so the link
                        // resolves the locale-specific slug instead of a
                        // plain <a> pointing at the RO-only internal path.
                        render={<Link href={servicePath(service.key)} />}
                        className="h-full w-full flex-row items-start gap-3 rounded-md p-3 hover:bg-surface focus:bg-surface"
                      >
                        <span
                          className={cn(
                            "flex size-11 shrink-0 items-center justify-center rounded-lg text-white",
                            serviceAccent(index),
                          )}
                        >
                          <ServiceGlyph icon={service.icon} className="size-5" />
                        </span>

                        <span className="flex min-w-0 flex-col gap-0.5">
                          <span className="text-foreground text-[15px] leading-tight font-medium">
                            {tServicesNav(`items.${service.key}.title`)}
                          </span>
                          <span className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                            {tServicesNav(`items.${service.key}.description`)}
                          </span>
                        </span>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/*
              Plain anchors — no panel, styled with the shared trigger style
              so they keep the same optical weight as the dropdown trigger
              (the shadcn "Documentation" pattern).
            */}
            {NAV_SECTIONS.map((section) => (
              <NavigationMenuItem key={section.hash}>
                <NavigationMenuLink
                  render={
                    <Link href={{ pathname: "/", hash: section.hash }} />
                  }
                  // `NavigationMenuLink` ships `hover:bg-muted focus:bg-muted`
                  // for the popup's service cards. Top-level items are plain
                  // text links, so those are cancelled here and the underline
                  // defined in `app/globals.css` is the only hover affordance.
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "hover:bg-transparent focus:bg-transparent",
                  )}
                  active={active === section.hash}
                >
                  {t(section.key)}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right — language switcher, single CTA, mobile menu */}
        <div className="flex items-center justify-end gap-2">
          <LocaleSwitcher className="hidden lg:flex" />

          <ButtonLink
            render={<Link href={contactLink} />}
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-500/90 h-11 gap-2.5 rounded-md px-4 text-[15px] text-white shadow-sm sm:px-5"
          >
            <Phone className="size-4" />
            {t("getInTouch")}
          </ButtonLink>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t("openMenu")}
                  className="rounded-md lg:hidden"
                >
                  <Menu className="size-5" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-full max-w-sm p-0">
              <SheetTitle className="sr-only">{t("home")}</SheetTitle>

              <div className="flex h-16 shrink-0 items-center border-b border-border px-6">
                <Logo className="h-9 w-auto" alt="VENTPRIME" />
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-4">
                <ul className="flex flex-col gap-1">
                  {SECTIONS.map((section) => (
                    <li key={section.hash}>
                      <SheetClose
                        render={
                          <Link
                            href={{ pathname: "/", hash: section.hash }}
                            className="hover:bg-surface block rounded-md px-3 py-2.5 text-base font-medium"
                          />
                        }
                      >
                        {t(section.key)}
                      </SheetClose>
                    </li>
                  ))}
                </ul>

                {/*
                  Services preview on mobile.

                  Deliberately a plain vertical dropdown of all four services,
                  not the desktop 2x2 grid — at sheet width the cells would be
                  ~160px, too narrow for a title plus a two-line description.
                  Shows icon + short title + one-line description instead.
                */}
                <p className="text-muted-foreground mt-6 mb-2 px-3 font-mono text-[11px] font-medium tracking-[0.08em] uppercase">
                  {t("services")}
                </p>
                <ul className="flex flex-col gap-1">
                  {services.map((service, index) => (
                    <li key={service.key}>
                      <SheetClose
                        render={
                          <Link
                            href={servicePath(service.key)}
                            className="hover:bg-surface flex items-center gap-3 rounded-md px-3 py-2.5"
                          />
                        }
                      >
                        <span
                          className={cn(
                            "flex size-11 shrink-0 items-center justify-center rounded-lg text-white",
                            serviceAccent(index),
                          )}
                        >
                          <ServiceGlyph icon={service.icon} className="size-5" />
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="text-[15px] leading-tight font-medium">
                            {tServicesNav(`items.${service.key}.title`)}
                          </span>
                          <span className="text-muted-foreground truncate text-sm">
                            {tServicesNav(`items.${service.key}.description`)}
                          </span>
                        </span>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex flex-col gap-3 border-t border-border p-4">
                <LocaleSwitcher className="flex justify-center" />
                <ButtonLink
                  render={<Link href={contactLink} />}
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-500/90 h-11 w-full gap-2.5 rounded-md text-[15px] text-white"
                >
                  <Phone className="size-4" />
                  {t("getInTouch")}
                </ButtonLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}