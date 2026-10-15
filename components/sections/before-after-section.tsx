import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projects } from "@/lib/testimonials";
import type { ImageName } from "@/lib/images";
import { servicePath } from "@/lib/services";
import { SectionHeading } from "@/components/sections/section";
import { BeforeAfterSlider } from "@/components/sections/before-after-slider";

/**
 * Before / after results (AGENTS.md §5.6 Block B).
 *
 * Split out of the FEEDBACK section so service pages can reuse it with their
 * own project list.
 */
export async function BeforeAfterSection({
  projects: list = projects,
  heading = true,
}: {
  projects?: typeof projects;
  heading?: boolean;
}) {
  const t = await getTranslations("Feedback.section");

  if (list.length === 0) return null;

  return (
    <div>
      {heading ? (
        <SectionHeading
          title={t("projectsTitle")}
          align="center"
          className="mb-10"
        />
      ) : null}

      <ul className="grid gap-8 sm:grid-cols-2">
        {list.map((project) => {
          const copy = getTranslations(`Feedback.projects.${project.id}`);

          return (
            <BeforeAfterProject
              key={project.id}
              project={project}
              // Resolved eagerly so the copy promise is awaited per item.
              copyPromise={copy}
              labels={{ before: t("before"), after: t("after") }}
              alt={t("projectImageAlt", { locality: project.locality })}
            />
          );
        })}
      </ul>
    </div>
  );
}

async function BeforeAfterProject({
  project,
  copyPromise,
  labels,
  alt,
}: {
  project: (typeof projects)[number];
  copyPromise: ReturnType<typeof getTranslations>;
  labels: { before: string; after: string };
  alt: string;
}) {
  const copy = await copyPromise;
  const tServices = await getTranslations("Services");

  return (
    <li className="flex flex-col gap-4">
      <BeforeAfterSlider
        before={project.before as ImageName}
        after={project.after as ImageName}
        alt={alt}
        labels={labels}
      />

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold">{copy("title") as string}</h3>
          <span className="text-muted-foreground text-sm">
            {project.locality}
          </span>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed">
          {copy("summary") as string}
        </p>

        {project.humidityBefore && project.humidityAfter ? (
          <p className="text-sm font-medium">
            {project.humidityBefore}% →{" "}
            <span className="text-brand-green">{project.humidityAfter}%</span>
          </p>
        ) : null}

        <Link
          href={servicePath(project.service)}
          className="text-primary inline-flex items-center gap-1 text-sm font-medium"
        >
          <ArrowRight className="size-4" />
          {tServices(`items.${project.service}.title` as never)}
        </Link>
      </div>
    </li>
  );
}