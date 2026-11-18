import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";

function AboutUs() {
  const t = useTranslations("AboutUs");

  return (
    <Container bgColor="grey" height="auto">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-4xl font-semibold tracking-tight lg:text-6xl">
          {t("title")}
        </h1>
      </div>
    </Container>
  );
}

export { AboutUs };
