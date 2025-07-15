import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareersHero from "@/components/careers/CareersHero";
import WhyJoin from "@/components/careers/WhyJoin";
import HiringProcess from "@/components/careers/HiringProcess";
import CareersCta from "@/components/careers/CareersCta";

export default function Careers() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <CareersHero />
        <WhyJoin />
        <HiringProcess />
        <CareersCta />
      </main>
      <Footer />
    </div>
  );
}