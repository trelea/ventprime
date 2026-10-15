import Image from "next/image";
import { Check, Minus, X } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getImage } from "@/lib/images";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading, Section } from "@/components/sections/section";
import { TechDiagram, TechDiagramStyles } from "@/components/sections/tech-diagram";
import { TechFaq } from "@/components/sections/faq";

/** TECH (`#tehnologie`) — AGENTS.md §5.5. The main SEO text block. */
export async function TechSection() {
  const t = await getTranslations("Tech");
  const tCommon = await getTranslations("Common");

  const stepIds = ["out", "in", "circulation", "result"] as const;

  const columns = t.raw("comparison.columns") as unknown as string[];

  const rows = Array.from({ length: 6 }, (_, index) => ({
    label: t(`comparison.rows.${index}.label` as never) as unknown as string,
    values: t.raw(
      `comparison.rows.${index}.values` as never,
    ) as unknown as string[],
  }));

  const components = [
    { image: "tech-ductwork" as const, caption: 0 },
    { image: "tech-facade" as const, caption: 1 },
  ];

  return (
    <Section id="tehnologie" tone="surface">
      <TechDiagramStyles />

      <SectionHeading
        eyebrow={t("section.eyebrow")}
        title={t("section.title")}
        description={t("section.description")}
        align="center"
      />

      {/* Block A — diagram + steps */}
      <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
        <div className="bg-background rounded-2xl border border-border p-6">
          <TechDiagram alt={t("diagram.alt")} />
        </div>

        <ol className="flex flex-col gap-6">
          {stepIds.map((id, index) => (
            <li key={id} className="flex gap-4">
              <span className="bg-brand-green-soft text-primary flex size-9 shrink-0 items-center justify-center rounded-full font-bold">
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold">
                  {t(`diagram.steps.${id}.title` as never)}
                </h3>
                <p className="text-muted-foreground mt-1 leading-relaxed">
                  {t(`diagram.steps.${id}.description` as never)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Block B — what gets installed */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold">{t("components.title")}</h3>
        <p className="text-muted-foreground mt-2">{t("components.description")}</p>

        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {components.map((component) => (
            <li key={component.image} className="overflow-hidden rounded-2xl border border-border">
              <div className="relative aspect-16/10">
                <Image
                  src={getImage(component.image).src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="text-muted-foreground bg-background p-4 text-sm">
                {t(`diagram.steps.${stepIds[component.caption]}.title` as never)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Block C — comparison table */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold">{t("comparison.title")}</h3>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-3xl border-collapse text-sm">
            <thead>
              <tr className="bg-surface-section">
                <th scope="col" className="sticky left-0 bg-surface-section px-4 py-3 text-left font-semibold" />
                {columns.slice(1).map((column, index) => (
                  <th
                    key={column}
                    scope="col"
                    className={`px-4 py-3 text-center font-semibold ${
                      index === 0 ? "bg-brand-green-soft text-brand-green" : ""
                    }`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-border">
                  <th scope="row" className="bg-background sticky left-0 px-4 py-3 text-left font-medium">
                    {row.label}
                  </th>
                  {row.values.map((value, index) => {
                    const highlight = index === 0;
                    const positive = value === "Da" || value === "Nu" || value === "0 lei" || value === "0 lei, pierderi de căldură";

                    return (
                      <td
                        key={index}
                        className={`px-4 py-3 text-center ${
                          highlight ? "bg-brand-green-soft" : ""
                        }`}
                      >
                        <span
                          className={`inline-flex items-center gap-1.5 ${
                            highlight
                              ? "font-semibold text-brand-green"
                              : "text-muted-foreground"
                          }`}
                        >
                          {highlight ? (
                            <Check className="size-4 shrink-0" />
                          ) : value === "—" ? (
                            <Minus className="size-4 shrink-0" />
                          ) : positive && index === 0 ? (
                            <X className="size-4 shrink-0 text-destructive" />
                          ) : null}
                          {value}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Block D — FAQ */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold">{t("faq.title")}</h3>
        <div className="mt-6">
          <TechFaq />
        </div>
      </div>

      {/* Closing CTA */}
      <div className="mt-12 flex flex-col items-center gap-4 text-center">
        <p className="text-lg font-medium">{t("cta")}</p>
        <ButtonLink
          render={<Link href={{ pathname: "/", hash: "#contacte" }} />}
          size="lg"
          className="bg-brand-green hover:bg-brand-green/90 text-white"
        >
          {tCommon("freeInspection")}
        </ButtonLink>
      </div>
    </Section>
  );
}