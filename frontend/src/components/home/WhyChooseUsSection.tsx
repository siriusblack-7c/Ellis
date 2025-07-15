import { Users, Handshake, MonitorSmartphoneIcon } from "lucide-react";
import { TryNowButton } from "@/components/home/TryNowButton";

export default function WhyChooseUsSection() {
    return (
        <section id="why-us" className="py-20 lg:py-24 bg-muted dark:bg-black/10">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Why Choose Ellis Care?
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        We bridge the gap between immigrants in various countries and their aging parents back home, delivering world-class compassionate care in culturally familiar environments.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    <div className="text-center p-6 rounded-xl transition-all">
                        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/10 rounded-full">
                            <Handshake className="w-8 h-8 text-red-500 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Culturally-Aligned Care</h3>
                        <p className="text-muted-foreground">
                            Our caregivers are recruited from local communities across the countries we operate in. We understand that each location is unique, so we match clients with caregivers from their community who speaks the same language and culture.
                        </p>
                    </div>
                    <div className="text-center p-6 rounded-xl transition-all">
                        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/10 rounded-full">
                            <Users className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">World-class trained & vetted professionals</h3>
                        <p className="text-muted-foreground">
                            All our caregivers undergo a 6 months online Personal Support Worker training with a Canadian institution. We know that letting someone into your home is a delicate decision, so we conduct thorough background checks and verification of all caregivers, including the provision of guarantors, so that you can have peace of mind.
                        </p>
                    </div>
                    <div className="text-center p-6 rounded-xl transition-all">
                        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/10 rounded-full">
                            <MonitorSmartphoneIcon className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Control & Monitor From Anywhere</h3>
                        <p className="text-muted-foreground">
                            Book, schedule, monitor, and adjust care plans from anywhere in the world — all from your dashboard. Caregivers clock in/out and submit daily reports. You see every update and also receive direct contact details of the caregiver so you can check-in as needed.
                        </p>
                    </div>
                </div>
            </div>
            <TryNowButton />
        </section>
    );
} 