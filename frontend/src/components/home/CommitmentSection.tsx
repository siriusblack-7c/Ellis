import { Heart, Shield, Users, Clock, MapPin, Award } from "lucide-react";

const features = [
    {
        icon: <Heart className="h-8 w-8 text-primary" />,
        title: "Compassionate Care",
        description:
            "Trained caregivers who provide loving, professional care with genuine compassion for your family members.",
    },
    {
        icon: <Shield className="h-8 w-8 text-primary" />,
        title: "Verified & Trusted",
        description:
            "All caregivers undergo thorough background checks, verification, and Canadian-standard training certification.",
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: "Family-Centered",
        description:
            "We understand the importance of family. Our services bridge the gap between you and your loved ones back home.",
    },
    {
        icon: <Clock className="h-8 w-8 text-primary" />,
        title: "24/7 Availability",
        description:
            "Round-the-clock care options with flexible scheduling to meet your family's specific needs and preferences.",
    },
    {
        icon: <Award className="h-8 w-8 text-primary" />,
        title: "Professional Training",
        description:
            "Caregivers trained to Canadian standards with ongoing education in healthcare, nutrition, and elderly care.",
    },
    {
        icon: <MapPin className="h-8 w-8 text-primary" />,
        title: "Global Reach",
        description:
            "Book care for your loved ones anywhere in the world. Currently expanding to serve families globally.",
    },
];

export default function CommitmentSection() {
    return (
        <section className="section bg-card">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
                    <span className="text-sm text-primary font-medium uppercase tracking-wider">
                        Our Commitment to You
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                        Peace of Mind, Delivered with Care
                    </h2>
                    <p className="text-muted-foreground">
                        We provide trusted and certified caregivers working across 21
                        countries and counting, you can book caregivers for your parents and
                        loved ones in your home country and monitor our service delivery
                        from anywhere in the world.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="glass-card p-6 rounded-xl animate-fade-in flex flex-col items-center text-center"
                            style={{ animationDelay: `${(index + 1) * 100}ms` }}
                        >
                            <div className="mb-4 p-3 rounded-full bg-primary/10">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 