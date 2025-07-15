import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function WelcomeSection() {
  return (
    <section id="welcome" className="section bg-muted dark:bg-black/10">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in [animation-delay:100ms]">
            <span className="text-sm text-primary font-medium uppercase tracking-wider">
              Welcome to Ellis
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
              Send trusted caregivers to your parents from anywhere in the world.
            </h2>
            <p className="text-muted-foreground mb-6">
              We connect families worldwide with professionally trained personal
              support workers and caregivers. Book in-home care for your loved
              ones anywhere in the world, with full remote monitoring
              capabilities.
            </p>
            <p className="text-muted-foreground mb-8">
              Our caregivers are trained to Canadian standards, thoroughly
              vetted, and provide personalized care in the comfort of your
              family member's own home.
            </p>
            <Button asChild className="btn-primary">
              <Link to="/about">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="relative animate-fade-in [animation-delay:300ms]">
            <div style={{ boxShadow: "-1px 1px 10px 2px rgba(216, 216, 216, 0.66)" }} className="aspect-[4/3] rounded-2xl w-2/3 overflow-hidden left-24 -top-60 absolute">
              <img
                src="/images/home/welcome-section-1.png"
                alt="Professional caregiver with elderly person"
                className="w-full h-full object-cover"
              />
            </div>
            <div style={{ boxShadow: "-3px 1px 10px 2px rgba(105, 105, 105, 0.5)" }} className="absolute top-12 -left-6 w-2/3 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/home/welcome-section-2.png"
                alt="Caregiver providing care"
                className="w-full h-full object-cover"
              />
            </div>
            <div style={{ boxShadow: "-3px -3px 10px 2px rgba(143, 143, 143, 0.55)" }} className="absolute -top-6 -right-6 w-1/2 rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/home/welcome-section-3.png"
                alt="Family care moment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 