import { CheckCircle } from "lucide-react";

export default function WhyJoin() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Why join our team?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-4xl mx-auto">
                    <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                        <p className="text-gray-600 dark:text-gray-300">Competitive pay</p>
                    </div>
                    <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                        <p className="text-gray-600 dark:text-gray-300">Sponsored Personal Support Worker training and certification with a Canadian institution.</p>
                    </div>
                    <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                        <p className="text-gray-600 dark:text-gray-300">Work in your preferred location</p>
                    </div>
                    <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                        <p className="text-gray-600 dark:text-gray-300">Choose your own schedule and work hours</p>
                    </div>
                    <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                        <p className="text-gray-600 dark:text-gray-300">24/7 live Mentorship support</p>
                    </div>
                    <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                        <p className="text-gray-600 dark:text-gray-300">Make an impact in your community by increasing the quality of life of your clients.</p>
                    </div>
                </div>
            </div>
        </section>
    );
} 