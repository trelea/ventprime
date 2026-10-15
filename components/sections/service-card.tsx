import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getImage, type ImageName } from "@/lib/images";
import { servicePath, type Service } from "@/lib/services";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

/**
 * Service card (AGENTS.md §5.2) — a full-bleed photo with the copy laid over one
 * half of it, and a third of a card's width of fade rather than a seam where the
 * two meet.
 *
 * Widths, measured across the card from the copy's side:
 *   - solid `brand-blue-dark`: the outer 1/3 — where the text mostly lives;
 *   - fade: the middle 1/3, from transparent (nothing over the photo) to
 *     `brand-blue-dark` (nothing left to fade);
 *   - copy: the outer 1/2, so its inner edge lands in the middle of the fade;
 *   - photo: clear across the inner 1/3.
 *
 * The fade is a whole third wide on purpose. A tighter ramp reads as a band
 * against a busy photo, and since the photo *is* the card's backdrop there is
 * nothing to be gained by keeping the colour change short. Both ends of the ramp
 * sit on flat runs (alpha 0 inwards, alpha 1 outwards) with a straight line
 * between them, so no interior stop can kink the dissolve.
 *
 * The blue is its own layer above the photo rather than a background on the
 * copy, because the copy is transparent so the photo can read through it — so
 * the copy cannot also carry the blue. The layer is `hidden` while stacked: the
 * horizontal fade is a split-card device and means nothing at phone width.
 *
 * `reverse` mirrors the whole thing — photo clear from the right, blue on the
 * left, fade running the other way — which is how the 2x2 grid zigzags down the
 * page. The photo's `object-position` follows it, so the subject stays in the
 * half the copy does not cover.
 *
 * The card splits only from `@sm` (a 384px card) up. Narrower cards — phones,
 * and the tightest of the service pages' three-up — stack instead: photo on top,
 * copy below on a flat `brand-blue-dark` panel, with the blue rising out of the
 * photo's bottom edge via `.service-card-blend`. Half of a 358px card is a
 * 130px copy column, which is not a layout, it is a squeeze.
 *
 * Hover: the photo scales to 1.1 and a dark overlay crossfades to 30% over it,
 * while the card's shadow lifts. The overlay is a separate absolutely positioned
 * layer rather than a `group-hover:bg-*` on the wrapper so the two transitions
 * (transform on the image, opacity on the veil) stay independent.
 *
 * The card shows the short one-line name, not the full service title: that long
 * form is the service page's H1 and the JSON-LD `Service.name`, so it has to
 * stay long. The link's accessible name keeps the full title, which is what a
 * screen reader should hear for the destination. The description *is* the full
 * one, since the copy now owns a whole half to hold it.
 *
 * The copy is top-aligned: title first, description under it, and the button
 * anchored to the bottom edge with `mt-auto`. The copy is a stretched grid item
 * (a single implicit column), so `mt-auto` still lands the buttons on one line
 * across a row whose cards differ in height.
 *
 * The whole card is clickable through the stretched pseudo-element on the link,
 * so there is exactly one tab stop and one accessible name per card. The "View
 * service" affordance is therefore a `buttonVariants()` *span*, not an anchor.
 *
 * `sizes` is a prop because the photo's rendered width differs between the two
 * usages (the home 2x2 versus the service pages' three-up) — and because the
 * photo is now full-bleed, those widths are the *card* widths, not half of them.
 */
export async function ServiceCard({
  service,
  sizes = "(max-width: 1023px) 100vw, 50vw",
  reverse = false,
}: {
  service: Service;
  sizes?: string;
  reverse?: boolean;
}) {
  const t = await getTranslations(`Services.items.${service.key}` as never);
  const tNav = await getTranslations("Services.nav");
  const tCommon = await getTranslations("Common");

  const title = t("title") as unknown as string;
  const cardTitle = tNav(`items.${service.key}.title` as never) as unknown as string;
  const description = t("description") as unknown as string;
  const alt = t("alt") as unknown as string;

  const image = getImage(service.image as ImageName);

  /*
   * The card-wide blue, as stops keyed to the card's own width: nothing over the
   * inner third, then a straight ramp across the middle third, then flat over
   * the outer third the copy sits on. `transparent` rather than a zeroed
   * `color-mix` keeps the whole declaration inside syntax every browser has
   * always had — if the gradient failed to parse, the copy would be sitting on
   * bare photo.
   *
   * Inline rather than a utility class because it is a function of `reverse` and
   * only applies from `@sm` up, and an inline style cannot carry a
   * container-query variant. The stops are the same either way; only the axis
   * flips.
   */
  const blueLayer = `linear-gradient(${
    reverse ? "to left" : "to right"
  }, transparent 0%, transparent 33.333%, var(--brand-blue-dark) 66.667%, var(--brand-blue-dark) 100%)`;

  return (
    <div className="@container h-full">
      <article className="group bg-brand-blue-dark border-border relative isolate grid h-full min-h-68 overflow-hidden rounded-md border shadow-sm transition-shadow duration-300 hover:shadow-lg focus-within:shadow-lg @sm:min-h-88">
        {/* Photo. Its own row above the copy on phones; behind everything from
            `@sm` up, where it stretches under the copy instead. */}
        <div className="relative aspect-16/9 overflow-hidden @sm:absolute @sm:inset-0 @sm:aspect-auto">
          <Image
            src={image.src}
            alt={alt}
            fill
            sizes={sizes}
            className={cn(
              "object-cover transition-transform duration-700 group-hover:scale-110",
              // Bias the crop away from the copy, which covers one whole half.
              reverse ? "object-right" : "object-left",
            )}
          />

          {/* Stacked layout: the copy is *below* the photo, so the blue rises
              out of the photo's bottom edge instead of its side. */}
          <div
            aria-hidden
            className="service-card-blend absolute inset-x-0 bottom-0 h-3/5 [--service-card-blend-direction:to_top] @sm:hidden"
          />

          {/* Crossfades in on hover — see the note above. */}
          <div
            aria-hidden
            className="bg-brand-blue-dark absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-30"
          />
        </div>

        {/* The blue itself: fade over the middle third, flat over the outer
            third. Under the copy, over the photo. */}
        <div
          aria-hidden
          className="absolute inset-0 hidden @sm:block"
          style={{ backgroundImage: blueLayer }}
        />

        {/* Copy: a flat panel while stacked, the outer half once the card
            splits. Transparent there so the photo (and the fade over it) reads
            through; the stretched grid item is what lets `mt-auto` bottom-anchor
            the button. */}
        <div
          className={cn(
            "bg-brand-blue-dark relative z-10 flex flex-col gap-3 p-6 sm:p-8",
            "@sm:w-1/2 @sm:bg-transparent",
            reverse ? "@sm:justify-self-start" : "@sm:justify-self-end",
          )}
        >
          <h3 className="font-display text-3xl font-extrabold tracking-tight text-white">
            {cardTitle}
          </h3>

          <p className="max-w-md text-lg leading-relaxed text-white/85">
            {description}
          </p>

          <span
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "bg-brand-green hover:bg-brand-green/90 mt-auto h-12 w-fit gap-2 rounded-md px-6 text-base font-semibold text-white",
            )}
          >
            {tCommon("viewService")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>

        <Link
          href={servicePath(service.key)}
          aria-label={`${tCommon("viewService")}: ${title}`}
          className="absolute inset-0 z-10 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
        />
      </article>
    </div>
  );
}
