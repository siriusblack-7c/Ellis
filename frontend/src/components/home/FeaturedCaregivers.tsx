import CaregiverCard, { CaregiverProps } from "@/components/CaregiverCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const featuredCaregivers: CaregiverProps[] = [
    {
        id: "1",
        name: "Adunni Olatunji",
        bio: "Experienced caregiver with specialization in elderly care and chronic illness management. Trained in Canada with 8+ years of experience.",
        hourlyRate: 15,
        rating: 4.9,
        reviewCount: 127,
        location: "Lagos, Nigeria",
        image:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
        specialties: ["Elderly Care", "Chronic Illness", "Mobility Assistance"],
        languages: ["English", "Yoruba", "French"],
        experience: 8,
        availability: "Available",
    },
    {
        id: "2",
        name: "Grace Mensah",
        bio: "Certified nursing assistant with expertise in post-surgery care and rehabilitation. Compassionate and dedicated to patient wellbeing.",
        hourlyRate: 18,
        rating: 4.8,
        reviewCount: 89,
        location: "Accra, Ghana",
        image:
            "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face",
        specialties: [
            "Post-Surgery Care",
            "Rehabilitation",
            "Medication Management",
        ],
        languages: ["English", "Twi", "Ga"],
        experience: 6,
        availability: "Available",
    },
    {
        id: "3",
        name: "Fatima Mwangi",
        bio: "Professional caregiver with training in dementia care and mental health support. Brings warmth and patience to every interaction.",
        hourlyRate: 16,
        rating: 4.9,
        reviewCount: 156,
        location: "Nairobi, Kenya",
        image:
            "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
        specialties: ["Dementia Care", "Mental Health", "Companionship"],
        languages: ["English", "Swahili", "Kikuyu"],
        experience: 7,
        availability: "Available",
    },
];

export default function FeaturedCaregivers() {
    return (
        <section className="section">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
                    <span className="text-sm text-primary font-medium uppercase tracking-wider">
                        Featured Caregivers
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                        Meet Some of Our Compassionate Professionals
                    </h2>
                    <p className="text-muted-foreground">
                        Our caregivers are the heart of our service. Each one is selected
                        for their skills, compassion, and dedication.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredCaregivers.map((caregiver, index) => (
                        <div
                            key={caregiver.id}
                            className="animate-fade-in"
                            style={{ animationDelay: `${(index + 1) * 100}ms` }}
                        >
                            <CaregiverCard caregiver={caregiver} />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button asChild className="btn-primary">
                        <Link to="/caregivers">
                            View All Caregivers <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
} 