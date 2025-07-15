import {
    UserPlus,
    ClipboardList,
    HeartPulse,
    MonitorSmartphone,
} from "lucide-react";
import { TryNowButton } from "@/components/home/TryNowButton";

const steps = [
    {
        icon: <UserPlus className="h-8 w-8 text-blue-600" />,
        title: "1. Signup",
        description: "Create your account and register the care recipient's profile.",
        bgColor: "bg-blue-100",
    },
    {
        icon: <ClipboardList className="h-8 w-8 text-orange-600" />,
        title: "2. Build care plan",
        description:
            "Choose your preferred service schedule, add specific requirements and other additional features.",
        bgColor: "bg-orange-100",
    },
    {
        icon: <HeartPulse className="h-8 w-8 text-teal-600" />,
        title: "3. Receive Service",
        description:
            "We provide a caregiver that meets your requirements, you approve (or request a change), and your chosen caregiver reports for duty to the location as scheduled.",
        bgColor: "bg-teal-100",
    },
    {
        icon: <MonitorSmartphone className="h-8 w-8 text-indigo-600" />,
        title: "4. Monitor Progress",
        description:
            "Monitor progress anytime through direct communication with our caregivers and through daily reports, clock-ins and other updates on your dashboard.",
        bgColor: "bg-indigo-100",
    },
];

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="section">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
                    <p className="text-muted-foreground mt-2">
                        Simple steps to provide professional care for your parents
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-card p-6 rounded-lg shadow-md text-center flex flex-col items-center"
                        >
                            <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center ${step.bgColor} mb-4`}
                            >
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground flex-grow">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <TryNowButton />

        </section>
    );
} 