import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import FeaturedItems from "@/components/sections/FeaturedItems";
import FooterSection from "@/components/sections/FooterSection";
import HeroSection from "@/components/sections/HeroSection";
import MenuCategories from "@/components/sections/MenuCategories";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
     <div className="pt-16">
      <HeroSection />
      <AboutSection />
      <MenuCategories />
      <FeaturedItems />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
