import { Hero } from "@/components/sections/hero";
import { Benefits } from "@/components/sections/benefits";
import { Technology } from "@/components/sections/technology";
import { MainServices } from "@/components/sections/main-services";
import { AdditionalServices } from "@/components/sections/additional-services";
import { AboutUs } from "@/components/sections/about-us";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Contacts } from "@/components/sections/contacts";

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <Technology />
      <MainServices />
      <AdditionalServices />
      <AboutUs />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <Contacts />
    </>
  );
}
