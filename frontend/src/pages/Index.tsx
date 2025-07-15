import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/home/FaqSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import CommitmentSection from "@/components/home/CommitmentSection";
import CtaSection from "@/components/home/CtaSection";
import { useLanguage } from "@/contexts/LanguageContext";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import HeroFeatures from "@/components/home/HeroFeatures";
import ServicesSection from "@/components/home/ServicesSection";

export default function Index() {
  const { t } = useLanguage();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Hero Features */}
        <HeroFeatures />

        {/* Welcome Section */}
        <WelcomeSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Why Choose Us Section */}
        <WhyChooseUsSection />

        {/* Featured Caregivers */}
        {/* <FeaturedCaregivers /> */}

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQs Section */}
        <FaqSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Commitment Section */}
        <CommitmentSection />

        {/* CTA Section */}
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
