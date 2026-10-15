import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ButtonLink } from "@/components/ui/button";

/**
 * Reusable CTA strip (AGENTS.md §9).
 *
 * Used at the bottom of every service page; the home page uses the inline strip
 * inside `ServicesSection` instead.
 */
export async function CtaStrip({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  const tCommon = await getTranslations("Common");

  return (
    <div
      className={`bg-brand-gradient rounded-2xl p-8 text-center sm:p-10 ${className ?? ""}`}
    >
      <h2 className="text-2xl font-bold tracking-tight text-balance text-white sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-3 max-w-2xl text-white/85">{description}</p>
      ) : null}
      <ButtonLink
        render={<Link href={{ pathname: "/", hash: "#contacte" }} />}
        size="lg"
        className="mt-6 bg-white text-brand-blue-dark hover:bg-white/90"
      >
        {tCommon("freeInspection")}
        <ArrowRight />
      </ButtonLink>
    </div>
  );
}