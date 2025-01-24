import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Midsection } from "@/components/midSection";
import { ServicesSection } from "@/components/ServicesSection";
import Testimonials from "@/components/testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <Testimonials />
      <Midsection />
      <ServicesSection />
      <Footer />
    </>
  );
}
