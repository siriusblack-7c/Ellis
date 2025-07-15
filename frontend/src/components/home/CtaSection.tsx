import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
    return (
        <section className="relative py-24 bg-primary/5">
            <div className="container">
                <div className="max-w-3xl mx-auto text-center animate-fade-in">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Provide Better Care for Your Family?
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Join thousands of families who trust Ellis to provide professional,
                        compassionate in-home care for their loved ones worldwide. Start
                        your care journey today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="btn-primary">
                            <Link to="/care-recipients">Book a Caregiver Now</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link to="/careers">Become a Caregiver</Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Decorative waves */}
            <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
                <svg
                    className="absolute bottom-0 w-full h-24 fill-background"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 74"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,37.1L40,34.5C80,32,160,27,240,29.6C320,32,400,42,480,42.9C560,44,640,35,720,32.1C800,30,880,34,960,40.8C1040,47,1120,56,1200,56.6C1280,57,1360,48,1400,43.3L1440,39.1L1440,74L1400,74C1360,74,1280,74,1200,74C1120,74,1040,74,960,74C880,74,800,74,720,74C640,74,560,74,480,74C400,74,320,74,240,74C160,74,80,74,40,74L0,74Z"
                        className="animate-wave opacity-50"
                    />
                    <path
                        d="M0,37.1L40,34.5C80,32,160,27,240,29.6C320,32,400,42,480,42.9C560,44,640,35,720,32.1C800,30,880,34,960,40.8C1040,47,1120,56,1200,56.6C1280,57,1360,48,1400,43.3L1440,39.1L1440,74L1400,74C1360,74,1280,74,1200,74C1120,74,1040,74,960,74C880,74,800,74,720,74C640,74,560,74,480,74C400,74,320,74,240,74C160,74,80,74,40,74L0,74Z"
                        className="animate-wave opacity-100 [animation-delay:-4s]"
                    />
                </svg>
            </div>
        </section>
    );
} 