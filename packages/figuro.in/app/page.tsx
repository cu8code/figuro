import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Midsection } from "@/components/midSection";
import Testimonials from "@/components/testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <Testimonials />
      <Midsection />
      <Footer />
    </>
  );
}
