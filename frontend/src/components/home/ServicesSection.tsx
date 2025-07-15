import { CheckCircle } from "lucide-react";
import { TryNowButton } from "./TryNowButton";

const services = [
    {
        title: "Personal Care",
        description: "Our caregivers provide dignified and respectful assistance with daily activities to ensure comfort and well-being.",
        image: "/images/services/service1.png",
        points: [
            "Hygiene",
            "Mobility",
            "Toileting",
            "Eating and Meal Prep",
        ]
    },
    {
        title: "Household Management",
        description: "We help maintain a clean, safe, and comfortable living environment, and can assist with errands and meal planning.",
        image: "/images/services/service2.png",
        points: [
            "Light Housekeeping",
            "Meal Preparation",
            "Shopping and Errands",
        ]
    },
    {
        title: "Health-Related Services",
        description: "Our caregivers provide reliable health-related support, from medication reminders to transportation to appointments.",
        image: "/images/services/service3.png",
        points: [
            "Medication Management",
            "Monitoring Health",
            "Transportation",
            "Communication with Healthcare Professionals",
        ]
    },
    {
        title: "Emotional Support",
        description: "We offer friendly companionship to combat loneliness and promote mental and emotional health.",
        image: "/images/services/service4.png",
        points: [
            "Companionship",
            "Encouraging Engagement",
            "Reducing Loneliness",
        ]
    }
];

export default function ServicesSection() {
    return (
        <section id="services" className="py-20 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Services</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        We offer a comprehensive range of services designed to provide holistic support for your loved ones, ensuring their safety, health, and happiness.
                    </p>
                </div>
                <div className="space-y-16">
                    {services.map((service, index) => (
                        <div key={service.title} className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                            <div className={`animate-fade-in ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="rounded-lg shadow-lg w-full h-auto object-cover aspect-video"
                                />
                            </div>
                            <div className="animate-fade-in">
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                                <ul className="space-y-3">
                                    {service.points.map(point => (
                                        <li key={point} className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-200">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <TryNowButton />

        </section>
    );
} 