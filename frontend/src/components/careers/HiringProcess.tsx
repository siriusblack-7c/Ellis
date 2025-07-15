import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Video, FileSignature, GraduationCap, Briefcase } from "lucide-react";

export default function HiringProcess() {
    const navigate = useNavigate();

    const handleApplyClick = () => {
        navigate('/application/step-1');
    };

    const steps = [
        {
            icon: FileText,
            title: "Initial Application",
            description: "Click \"Apply Now\" below, fill the application form, attach your resume and submit."
        },
        {
            icon: Video,
            title: "Video Interview",
            description: "Shortlisted applicants will receive a link to complete a video interview."
        },
        {
            icon: FileSignature,
            title: "Training Contract",
            description: "Successful applicants will receive a contract of training sponsorship which has to be signed before training can commence. Ellis spends about $4,000 in training for each associate. This training is provided in agreement that the associate will continue to work with us for atleast 18months after the training, or refund a prorated amount. Training is provided by a third-party independent Canadian Career College. Please note that Canadian Career Colleges typically have an application fee around CA$100 - CA$150. This program application fee cost is to be borne by applicants as Ellis will only sponsor applicants who are successful with the College's application/pre-screening process. The minimum admission requirement is high school education. Ellis will refund program application fee for successful applicants when they begin working with us."
        },
        {
            icon: GraduationCap,
            title: "Training",
            description: "Training consists of two parts; online training and internship. Total online training duration is 3 months. Training format is self-paced with weekly milestones and deadlines. Applicants should prepare to commit at least 20hrs per week or commit more time to complete the program earlier. Internship duration is 1 month. Ellis will provide internship opportunities. Candidates may also complete their internships at their local hospitals or care-homes in line with the program requirement."
        },
        {
            icon: Briefcase,
            title: "Hiring & Onboarding",
            description: "After training completion, candidates will receive a conditional offer from Ellis contingent on successful background check, health assessment, and other verification."
        }
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-800/20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Your Path to Success: 5-Step Process</h2>
                <div className="max-w-4xl mx-auto space-y-8">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
                                <div className="flex items-start gap-6">
                                    <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center font-bold text-xl">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 dark:text-white text-xl flex items-center gap-3 mb-3">
                                            <Icon className="h-6 w-6" />
                                            {step.title}
                                        </h3>
                                        <div className="text-gray-600 dark:text-gray-300 text-sm space-y-3">
                                            {step.description.split('\n').map((paragraph, pIndex) => (
                                                <p key={pIndex}>{paragraph}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="text-center pt-8">
                        <Button size="lg" onClick={handleApplyClick}>Apply Now</Button>
                    </div>
                </div>
            </div>
        </section>
    );
} 