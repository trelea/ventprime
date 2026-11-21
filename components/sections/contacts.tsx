import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { ContactsForm } from "@/components/sections/contacts-form";

function Contacts() {
  const t = useTranslations("Contacts");

  return (
    <Container id="contacts" bgColor="white" height="auto">
      <div className="flex flex-col gap-[30px] pt-[50px] pb-[50px] sm:pt-[40px] sm:pb-[60px] md:pt-[44px] md:pb-[75px] lg:pt-[80px] lg:pb-[90px] xl:pb-[110px] 2xl:pb-[130px] max-[390px]:gap-5 max-[390px]:pt-8 max-[390px]:pb-8">
        <div className="flex flex-col gap-[20px] max-[390px]:gap-3">
          <span className="font-inter text-[14px] font-bold tracking-[0.02em] text-primary">
            {t("label")}
          </span>
          <h2 className="font-gilroy text-[24px] leading-[1.1] font-bold tracking-normal text-black text-pretty sm:text-[28px] sm:leading-[1.1] md:text-[30px] lg:text-[32px] lg:leading-[1.2] lg:tracking-[0.02em] max-[390px]:text-[22px]">
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h2>
        </div>

        <ContactsForm />
      </div>
    </Container>
  );
}

export { Contacts };
