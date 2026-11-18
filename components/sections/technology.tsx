import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";

function Technology() {
  const t = useTranslations("Technology");

  return (
    <Container id="technology" bgColor="grey" height="screen">
      <div className="flex min-h-screen-safe flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-semibold tracking-tight lg:text-6xl">
          {t("title")}
        </h1>
      </div>
    </Container>
  );
}

export { Technology };
