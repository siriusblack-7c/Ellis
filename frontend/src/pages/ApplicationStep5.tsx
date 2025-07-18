import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Briefcase, Clock, MapPin, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getMyApplication, updateCaregiverApplication } from "@/api/caregiverApplicationApi";
import { CaregiverApplication } from "@/types/caregiverApplication";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function ApplicationStep5() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { user } = useAuth();

    const { data: application, isLoading } = useQuery<CaregiverApplication>({
        queryKey: ['myApplication'],
        queryFn: getMyApplication,
        enabled: !!user,
    });

    const mutation = useMutation({
        mutationFn: (data: Partial<CaregiverApplication>) => updateCaregiverApplication(application!._id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myApplication'] });
            toast({
                title: "Career Path Confirmed!",
                description: "Congratulations! Your Ellis Care Global career journey begins now.",
            });

            setTimeout(() => {
                navigate('/');
            }, 3000);
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to select career path.",
                variant: "destructive",
            });
        },
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSelectCareer = (pathId: string) => {
        mutation.mutate({ careerPathSelection: pathId });
    };

    const careerOptions = [
        {
            id: "full-time",
            title: "Full-Time Ellis Caregiver",
            type: "Permanent Position",
            eligibility: "Top 30% of interns",
            salary: "$22-26/hour",
            benefits: ["Full health benefits", "Paid vacation", "Career advancement", "Global assignments"],
            description: "Join Ellis as a full-time caregiver with guaranteed employment and growth opportunities.",
            icon: Trophy,
            color: "bg-green-600",
            recommended: true
        },
        {
            id: "part-time",
            title: "Part-Time Ellis Caregiver",
            type: "Flexible Schedule",
            eligibility: "Top 50% of interns",
            salary: "$20-24/hour",
            benefits: ["Flexible hours", "Professional development", "Potential for full-time", "Team support"],
            description: "Work part-time with Ellis while building your experience and client base.",
            icon: Clock,
            color: "bg-blue-600",
            recommended: false
        },
        {
            id: "contract",
            title: "Contract & As-Needed",
            type: "Freelance Opportunities",
            eligibility: "All graduates",
            salary: "$18-22/hour",
            benefits: ["Maximum flexibility", "Multiple client exposure", "Skill building", "Future opportunities"],
            description: "Take on contract work and as-needed assignments to gain experience.",
            icon: Briefcase,
            color: "bg-purple-600",
            recommended: false
        }
    ];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const isSubmitted = application?.currentStage !== 'hired' || application?.stageStatus === 'pending_review';

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 py-12 mt-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">5</div>
                            <h1 className="text-3xl font-bold">Career Launch</h1>
                        </div>
                        <p className="text-muted-foreground">
                            Top performers join Ellis full-time. Others may receive temporary or as-needed opportunities based on performance.
                        </p>
                    </div>

                    <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 rounded-lg border">
                        <div className="flex items-center gap-3 mb-4">
                            <Trophy className="h-8 w-8 text-green-600" />
                            <div>
                                <h2 className="text-2xl font-bold">Congratulations!</h2>
                                <p className="text-muted-foreground">You've successfully completed the Ellis training and internship program.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">100%</div>
                                <div className="text-sm text-muted-foreground">Training Complete</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">2 Months</div>
                                <div className="text-sm text-muted-foreground">Internship Finished</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">Ready</div>
                                <div className="text-sm text-muted-foreground">For Career Launch</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {careerOptions.map((option) => {
                            const IconComponent = option.icon;
                            return (
                                <Card key={option.id} className={`relative ${application?.careerPathSelection === option.id ? 'ring-2 ring-primary' : ''}`}>
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`${option.color} text-white rounded-full w-10 h-10 flex items-center justify-center`}>
                                                    <IconComponent className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg">{option.title}</CardTitle>
                                                    <CardDescription>{option.type}</CardDescription>
                                                </div>
                                            </div>
                                            {option.recommended && (
                                                <Badge variant="default" className="bg-green-600">
                                                    <Star className="h-3 w-3 mr-1" />
                                                    Best Option
                                                </Badge>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">{option.eligibility}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium text-green-600">{option.salary}</span>
                                            </div>
                                        </div>

                                        <p className="text-sm text-muted-foreground">
                                            {option.description}
                                        </p>

                                        <div>
                                            <h4 className="font-medium text-sm mb-2">Benefits & Opportunities:</h4>
                                            <ul className="text-xs text-muted-foreground space-y-1">
                                                {option.benefits.map((benefit, index) => (
                                                    <li key={index}>• {benefit}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        {isSubmitted && application?.careerPathSelection === option.id && (
                                            <div className="text-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                                                <Trophy className="h-6 w-6 text-green-600 mx-auto mb-1" />
                                                <p className="font-medium text-green-900 dark:text-green-100 text-sm">Career Path Selected!</p>
                                            </div>
                                        )}
                                        {!isSubmitted && (
                                            <Button
                                                onClick={() => handleSelectCareer(option.id)}
                                                className="w-full"
                                                variant={option.recommended ? "default" : "outline"}
                                                disabled={mutation.isPending}
                                            >
                                                {mutation.isPending ? 'Selecting...' : 'Choose This Path'}
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Your Ellis Career Journey Continues</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium mb-3">What Happens Next:</h4>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Receive your official job offer within 48 hours</li>
                                        <li>• Complete final onboarding and documentation</li>
                                        <li>• Meet your assigned team and supervisor</li>
                                        <li>• Begin your first client assignments</li>
                                        <li>• Access ongoing training and development</li>
                                        <li>• Join the Ellis global caregiver community</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3">Career Growth Opportunities:</h4>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Advanced certifications and specializations</li>
                                        <li>• Team leader and supervisor roles</li>
                                        <li>• International assignment opportunities</li>
                                        <li>• Training and mentorship positions</li>
                                        <li>• Management and administrative roles</li>
                                        <li>• Entrepreneurship support and partnerships</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Welcome to Ellis Care Global!</h4>
                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                    You're now part of a global network of compassionate caregivers making a difference in families' lives worldwide.
                                    Your journey in professional caregiving starts here, with endless opportunities for growth and impact.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}