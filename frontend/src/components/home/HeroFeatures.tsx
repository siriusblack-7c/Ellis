import { Users, Shield, Star, DollarSign } from "lucide-react";

const heroFeatures = [
    {
        icon: <Users className="h-7 w-7 text-indigo-500" />,
        title: "Canadian trained caregivers",
        description: "working across 21 countries",
    },
    {
        icon: <Shield className="h-7 w-7 text-green-500" />,
        title: "Verified",
        description: "with extensive background check",
    },
    {
        icon: <Star className="h-7 w-7 text-orange-500" />,
        title: "4.8★ avg caregiver rating",
        description: "From verified families",
    },
    {
        icon: <DollarSign className="h-7 w-7 text-indigo-500" />,
        title: "Affordable plans",
        description: "starting from as low as $200/month",
    },
];

export default function HeroFeatures() {
    return (
        <section id="features" className="section">
            <div className="rounded-lg p-4 mx-auto shadow-lg bg-muted dark:bg-black/10 backdrop-blur-sm w-full max-w-4xl px-4 animate-fade-in [animation-delay:400ms]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-black/90 dark:text-white">
                    {heroFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{feature.title}</h3>
                                <p className="text-sm text-black dark:text-white">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 