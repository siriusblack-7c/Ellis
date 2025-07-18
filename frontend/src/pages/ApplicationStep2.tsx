import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, CheckCircle, Clock, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getMyApplication, updateCaregiverApplication } from "@/api/caregiverApplicationApi";
import { CaregiverApplication } from "@/types/caregiverApplication";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function ApplicationStep2() {
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
                title: "Video Submitted!",
                description: "Your video interview has been submitted for review. We'll contact you within 5-7 business days.",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to submit video interview.",
                variant: "destructive",
            });
        },
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmitVideo = () => {
        mutation.mutate({ videoInterviewUrl: "some-url" });
    };

    const questions = [
        "Why do you want to become a caregiver?",
        "What experience do you have in healthcare or caring for others?",
        "How would you handle a difficult situation with a client?",
        "What motivates you to work with Ellis Care Global?",
        "Describe a time when you showed compassion and empathy."
    ];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const isSubmitted = application?.videoInterviewUrl || application?.currentStage !== 'interview';

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 py-12 mt-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                            <h1 className="text-3xl font-bold">Video Interview</h1>
                        </div>
                        <p className="text-muted-foreground">
                            Selected applicants complete a recorded video interview to showcase their communication and caregiving passion.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Video className="h-5 w-5" />
                                    Video Interview
                                </CardTitle>
                                <CardDescription>
                                    Record your responses to our interview questions
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center min-h-64 flex flex-col items-center justify-center">
                                    {!isSubmitted && (
                                        <>
                                            <Video className="h-16 w-16 text-muted-foreground mb-4" />
                                            <p className="text-muted-foreground mb-4">Click the button below to start recording</p>
                                            <Button onClick={handleSubmitVideo} disabled={mutation.isPending}>
                                                {mutation.isPending ? 'Submitting...' : 'Submit Video Interview'}
                                            </Button>
                                        </>
                                    )}
                                    {isSubmitted && (
                                        <>
                                            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                            <p className="text-green-600 font-medium mb-4">Video submitted successfully!</p>
                                            <p className="text-sm text-muted-foreground">We'll review it and get back to you soon.</p>
                                        </>
                                    )}
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <div className="flex items-start gap-2">
                                        <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                                        <div>
                                            <h4 className="font-medium text-blue-900 dark:text-blue-100">Interview Guidelines</h4>
                                            <ul className="text-sm text-blue-800 dark:text-blue-200 mt-1 space-y-1">
                                                <li>• Maximum 10 minutes total</li>
                                                <li>• Answer all 5 questions clearly</li>
                                                <li>• Speak directly to the camera</li>
                                                <li>• Find a quiet, well-lit space</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Interview Questions</CardTitle>
                                <CardDescription>
                                    Prepare your answers to these questions before recording
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {questions.map((question, index) => (
                                        <div key={index} className="p-4 border rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                                                    {index + 1}
                                                </div>
                                                <p className="text-sm font-medium">{question}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                    <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Tips for Success</h4>
                                    <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                                        <li>• Be authentic and speak from the heart</li>
                                        <li>• Share specific examples from your experience</li>
                                        <li>• Show your passion for caregiving</li>
                                        <li>• Maintain good eye contact with the camera</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}