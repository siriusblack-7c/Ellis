import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Shield, Users } from "lucide-react";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="relative py-20 bg-blue-50 dark:bg-blue-950/20 mt-20">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                About Ellis Care Global Limited
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                Connecting families worldwide with professional, compassionate in-home care services for their loved ones.
              </p>
            </div>
          </div>
        </section>
        

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong>Ellis Care Global Limited</strong> was founded in Canada by immigrants who understood the unique challenge of ensuring quality care for loved ones from anywhere in the world. We recognized the need for a reliable, global platform that connects families with professionally trained caregivers.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Based in North York, Ontario, Ellis provides in-home care services worldwide. Our platform enables clients to book personal support workers and caregivers for their family members, regardless of location, with full remote monitoring capabilities.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  We are committed to making quality care accessible globally, one family at a time. Our mission is to bridge distances and provide peace of mind through professional, compassionate in-home care services.
                </p>
              </div>
              <div>
                <img
                  src="https://img.freepik.com/premium-photo/multiethnic-people-having-fun-home-kitchen-multi-generational-friendship-concept_442523-975.jpg"
                  alt="Our team"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 dark:bg-gray-800/20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Heart className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Compassion</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We believe in treating every individual with kindness, empathy, and respect.
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Trust</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We are committed to building long-lasting relationships based on trust, transparency, and reliability.
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Excellence</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We strive for excellence in everything we do, from caregiver training to customer service.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Service section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Whether you're looking for care for a loved one or want to join our team of caregivers, we'd love to hear from you.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild className="btn-primary">
                <Link to="/auth?mode=signup">
                  Book a Caregiver <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/careers">
                  Work With Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}