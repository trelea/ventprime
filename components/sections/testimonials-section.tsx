import Image from "next/image";
import { Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { testimonials } from "@/lib/testimonials";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading, Section } from "@/components/sections/section";

/** Five filled stars — every sample review runs at 5/5. */
function Stars() {
  return (
    <div className="flex items-center gap-1" aria-label="5 / 5">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className="size-5 fill-amber-400 text-amber-400" />
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
    <figure className="bg-card flex w-80 shrink-0 flex-col gap-4 rounded-xl border border-border p-6 sm:w-96">
      <Stars />
      <blockquote className="line-clamp-5 text-base leading-relaxed">
        “{t("quote") as unknown as string}”
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-1">
        <Image
          src={index.avatar.src}
          alt={index.avatar.alt}
          width={56}
          height={56}
          loading="lazy"
          className="size-14 shrink-0 rounded-full object-cover"
        />
        <span className="text-base font-medium">{index.author}</span>
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

      <div className="mt-12 flex flex-col gap-4">
        <Marquee pauseOnHover className="[--duration:55s]">
          {await Promise.all(
            rowA.map(async (item) => <TestimonialCard key={item.id} index={item} />),
          )}
        </Marquee>

        {rowB.length > 0 ? (
          <Marquee reverse pauseOnHover className="hidden [--duration:65s] lg:flex">
            {await Promise.all(
              rowB.map(async (item) => (
                <TestimonialCard key={item.id} index={item} />
              )),
            )}
          </Marquee>
        ) : null}
      </div>

    </Section>
  );
}
