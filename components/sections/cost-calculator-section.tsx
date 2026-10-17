import { getLocale, getTranslations } from "next-intl/server";
import { AuroraText } from "@/components/ui/aurora-text";
import { ContactForm } from "@/components/forms/contact-form";
import { Section } from "@/components/sections/section";

const AURORA_COLORS_LIGHT = ["#1E6FB8", "#10b981", "#0F2E4D"];

/**
 * COST CALCULATOR & REQUEST FORM (`#contacte`) — Customer Requirements §11–§15.
 * Placed immediately after the FAQ section on the Home page.
 *
 * The form runs in `variant="calculator"`: its card takes the FAQ section's
 * surface tone with one-step-bigger labels, and the preview panel flips to the
 * green variant in the TECH schema card's colours — vivid green, white
 * semibold copy, same rounded/shadow silhouette. Service pages keep the
 * default white card and dark navy panel.
 */
export async function CostCalculatorSection() {
  const locale = await getLocale();
  const t = await getTranslations("Form.full");

  return (
    <Section id="contacte" className="min-h-screen-safe flex flex-col justify-center">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
          <AuroraText colors={AURORA_COLORS_LIGHT}>{t("title")}</AuroraText>
        </h2>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed text-pretty sm:text-xl">
          {t("description")}
        </p>
      </div>

      <div className="mt-12">
        <ContactForm source={locale} showHeader={false} variant="calculator" />
      </div>
    </Section>
  );
}
