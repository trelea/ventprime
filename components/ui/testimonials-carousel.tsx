"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TestimonialCard } from "@/components/ui/testimonial-card";

type TestimonialItem = {
  data: string;
  customer: string;
  location: string;
};

type TestimonialsCarouselProps = {
  items: TestimonialItem[];
};

function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
      className="w-full"
    >
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={`${item.customer}-${item.location}`}>
            <div className="flex justify-center">
              <TestimonialCard {...item} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export { TestimonialsCarousel };
