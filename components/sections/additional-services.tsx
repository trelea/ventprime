import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";

function AdditionalServices() {
  const t = useTranslations("AdditionalServices");

  return (
    <Container bgColor="white" height="auto">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-4xl font-semibold tracking-tight lg:text-6xl">
          {t("title")}
        </h1>
      </div>
    </Container>
  );
}

export { AdditionalServices };
