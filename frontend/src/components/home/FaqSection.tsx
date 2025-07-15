import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { TryNowButton } from "./TryNowButton";

const faqs = [
    {
        question: "Do I have to be in the same country where I am requesting service?",
        answer: "No. With Ellis Care you can book services in the any of the countries we operate from anywhere in the world. You do not have to be in the countries we operate or the country where you are requesting service."
    },
    {
        question: "How do you ensure that clients are receiving best quality service?",
        answer: "We start by recruiting the best through our competitive hiring process, we sponsor our caregivers through a 6months Personal Support Worker training with a Canadian institution, to ensure world-class practice standards. Our caregivers have 24/7 live access to seasoned caregivers practicing in Canada who serve as mentors and guide them through challenging situations. We provide a rating system with incentives to track and ensure our caregivers continue deliver to standard. We provide you with a dashboard where you will receive daily reports and updates. We also give you direct contact details of your caregiver so you can check-in at will."
    },
    {
        question: "Can I cancel, reschedule or make changes to my booking?",
        answer: "Yes. You can make all kind of changes to your plan at no cost up to 72hrs in advance. Late cancellation attracts a fee to compensate the caregiver as the assigned caregiver would have been already scheduled for your job and may not get a replacement client for the same day."
    },
    {
        question: "What if I want a different caregiver than the one assigned?",
        answer: "We recommend caregivers based on your requirement and show you their profile for approval before engagement, at this point, you can request a change and the platform will recommend other caregivers meeting your requirement, so you can approve the caregiver of your choice. For caregivers already working for you, you can request a change at anytime, the platform will give new recommendations for you to approve and the new caregiver will resume within 72hrs."
    },
    {
        question: "What services do your caregivers provide?",
        answer: (
            <div className="space-y-4">
                <div className="text-foreground">
                    Our caregivers provide the following services:
                </div>
                <div>
                    <h4 className="font-semibold text-foreground mb-2">Personal Care</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li><strong>Hygiene:</strong> Assisting with bathing, dressing, grooming, and oral care.</li>
                        <li><strong>Mobility:</strong> Helping with walking, transferring, and using mobility aids.</li>
                        <li><strong>Toileting:</strong> Providing assistance with using the toilet and managing incontinence.</li>
                        <li><strong>Eating and Meal Prep:</strong> Assisting with meal preparation, feeding, and ensuring proper nutrition.</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground mb-2">Household Management</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li><strong>Light Housekeeping:</strong> Tidying up, laundry, and other light cleaning tasks.</li>
                        <li><strong>Meal Preparation:</strong> Assisting with planning, preparing, and delivering meals, considering dietary needs.</li>
                        <li><strong>Shopping and Errands:</strong> Assisting with grocery shopping and other errands.</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground mb-2">Health-Related Services</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li><strong>Medication Management:</strong> Reminding clients to take medications, organizing medications, and ensuring proper dosage.</li>
                        <li><strong>Monitoring Health:</strong> Observing changes in health and reporting them to healthcare professionals.</li>
                        <li><strong>Transportation:</strong> Assisting with transportation to appointments, social events, and other outings.</li>
                        <li><strong>Communication with Healthcare Professionals:</strong> Acting as a liaison between the client and their healthcare team when needed.</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-foreground mb-2">Emotional Support</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li><strong>Companionship:</strong> Providing social interaction, conversation, and emotional support.</li>
                        <li><strong>Encouraging Engagement:</strong> Helping clients stay active and engaged in social activities.</li>
                        <li><strong>Reducing Loneliness:</strong> Providing a sense of connection and belonging.</li>
                    </ul>
                </div>
            </div>
        )
    }
];

export default function FaqSection() {
    return (
        <section id="faq" className="section bg-muted dark:bg-black/10">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
                    <span className="text-sm text-primary font-medium uppercase tracking-wider">
                        FAQs
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-muted-foreground">
                        Have questions? We have answers. If you can't find what you're
                        looking for, feel free to contact us.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto animate-fade-in [animation-delay:200ms]">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-left">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
                <TryNowButton />

            </div>
        </section>
    );
} 