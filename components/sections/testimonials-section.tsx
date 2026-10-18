import Image from "next/image";
import { Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { testimonials } from "@/lib/testimonials";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading, Section } from "@/components/sections/section";

/** Five filled stars — every sample review runs at 5/5. */
function Stars() {
  return (
    <div className="flex items-center gap-0.5 sm:gap-1" aria-label="5 / 5">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className="size-4 fill-amber-400 text-amber-400 sm:size-5"
        />
      ))}
    </div>
  );
}

async function TestimonialCard({
  index,
}: {
  index: (typeof testimonials)[number];
}) {
  const t = await getTranslations(`Feedback.reviews.${index.id}` as never);

  return (
    /*
      Compact on phones (w-64, tighter padding/gaps, smaller stars/quote/avatar)
      and progressively roomier up the ladder: w-80 through the tablet range,
      w-96 from lg. Every inner tier scales with the card so the lockup keeps
      its proportions instead of a small card carrying desktop-sized contents.
    */
    <figure className="bg-card flex w-64 shrink-0 flex-col gap-3 rounded-xl border border-border p-4 sm:w-80 sm:gap-4 sm:p-6 lg:w-96">
      <Stars />
      <blockquote className="line-clamp-4 text-sm leading-relaxed sm:line-clamp-5 sm:text-base">
        “{t("quote") as unknown as string}”
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-2 pt-1 sm:gap-3">
        <Image
          src={index.avatar.src}
          alt={index.avatar.alt}
          width={56}
          height={56}
          loading="lazy"
          className="size-10 shrink-0 rounded-full object-cover sm:size-14"
        />
        <span className="text-sm font-medium sm:text-base">
          {index.author}
        </span>
      </figcaption>
    </figure>
  );
}

/** FEEDBACK (`#recenzii`) — title plus the review marquee, nothing else. */
export async function TestimonialsSection() {
  const t = await getTranslations("Feedback.section");

  const half = Math.ceil(testimonials.length / 2);
  const rowA = testimonials.slice(0, half);
  const rowB = testimonials.slice(half);

  return (
    <Section id="recenzii" className="min-h-screen-safe flex flex-col justify-center">
      <SectionHeading
        title={t("title")}
        align="center"
      />

      <h3 className="sr-only">{t("testimonialsTitle")}</h3>

      {/*
        Edge fades — only from `lg` up (big laptop / desktop / PC), where the
        rows have width to bleed off the container; phones and tablets keep a
        clean hard clip. `pointer-events-none` so the rows' hover-pause still
        works, and `to-background/0` (not `to-transparent`) so the fade does not
        grey out while interpolating through transparent-black. The fade colour
        is `background`, so it follows the page surface (white / dark).
      */}
      <div className="relative mt-8 sm:mt-12">
        <div className="flex flex-col gap-3 sm:gap-4">
          <Marquee pauseOnHover className="[--duration:55s]">
            {await Promise.all(
              rowA.map(async (item) => <TestimonialCard key={item.id} index={item} />),
            )}
          </Marquee>

          {rowB.length > 0 ? (
            <Marquee reverse pauseOnHover className="[--duration:65s]">
              {await Promise.all(
                rowB.map(async (item) => (
                  <TestimonialCard key={item.id} index={item} />
                )),
              )}
            </Marquee>
          ) : null}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-background to-background/0 lg:block xl:w-24"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-background to-background/0 lg:block xl:w-24"
        />
      </div>

    </Section>
  );
}
