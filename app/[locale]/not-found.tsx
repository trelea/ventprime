import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFoundPage");

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 pt-28 text-center sm:pt-32">
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="max-w-md text-zinc-600 dark:text-zinc-400">
        {t("description")}
      </p>
    </div>
  );
}