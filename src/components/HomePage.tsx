"use client"
import HeroSection from "./sections/HeroSection"
import AboutSection from "./sections/AboutSection"
import MenuCategories from "./sections/MenuCategories"
import FeaturedItems from "./sections/FeaturedItems"
import ServicesSection from "./sections/ServicesSection"
import TestimonialsSection from "./sections/TestimonialsSection"
import ContactSection from "./sections/ContactSection"
import FooterSection from "./sections/FooterSection"

export default function HomePage() {
  return (
    <div className="pt-16">
      {" "}
      {/* Add padding top for fixed navbar */}
      {/* Section 1: Hero */}
      <HeroSection />
      {/* Section 2: About */}
      <AboutSection />
      {/* Section 3: Menu Categories */}
      <MenuCategories />
      {/* Section 4: Featured Items */}
      <FeaturedItems />
      {/* Section 5: Services */}
      <ServicesSection />
      {/* Section 6: Testimonials */}
      <TestimonialsSection />
      {/* Section 7: Contact */}
      <ContactSection />
      {/* Section 8: Footer */}
      <FooterSection />
    </div>
  )
}
