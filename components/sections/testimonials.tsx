import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";

type TestimonialItem = {
  data: string;
  customer: string;
  location: string;
};

function Testimonials() {
  const t = useTranslations("Testimonials");
  const items = t.raw("items") as TestimonialItem[];

  return (
    <Container id="reviews" bgColor="white" height="auto">
      <div className="flex flex-col gap-[30px] py-[50px] sm:py-[40px] md:py-[44px] lg:py-[80px]">
        <span className="font-inter text-[14px] font-bold tracking-[0.02em] text-primary">
          {t("label")}
        </span>
        <div className="sm:hidden">
          <TestimonialsCarousel items={items} />
        </div>
        <div className="hidden grid-cols-1 justify-items-center gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <TestimonialCard key={`${item.customer}-${item.location}`} {...item} />
          ))}
        </div>
      </div>
    </Container>
  );
}

export { Testimonials };
