import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, DollarSign, FileCheck, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getMyApplication, updateCaregiverApplication } from "@/api/caregiverApplicationApi";
import { CaregiverApplication } from "@/types/caregiverApplication";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function ApplicationStep3() {
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
                title: "Training Accepted!",
                description: "Your sponsored training has been confirmed. You'll receive enrollment details within 48 hours.",
            });

            setTimeout(() => {
                navigate('/application/step-4');
            }, 2000);
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to accept training agreement.",
                variant: "destructive",
            });
        },
    });


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleAcceptTraining = () => {
        mutation.mutate({ trainingAgreementAccepted: true });
    };

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 py-12 mt-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                            <h1 className="text-3xl font-bold">Sponsored Training</h1>
                        </div>
                        <p className="text-muted-foreground">
                            Ellis sponsors your online training at a Canadian career college ($5,000 value) with 2-year work commitment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5" />
                                    Training Program Details
                                </CardTitle>
                                <CardDescription>
                                    Comprehensive Personal Support Worker certification
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <DollarSign className="h-5 w-5 text-green-600 mt-1" />
                                        <div>
                                            <h4 className="font-medium">$5,000 Value - Fully Sponsored</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Ellis covers all tuition costs for your PSW certification
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                                        <div>
                                            <h4 className="font-medium">6-8 Month Program</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Online learning with practical components
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <FileCheck className="h-5 w-5 text-purple-600 mt-1" />
                                        <div>
                                            <h4 className="font-medium">Canadian Accreditation</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Recognized Personal Support Worker certificate
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <h4 className="font-medium mb-3">Curriculum Includes:</h4>
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                        <li>• Anatomy and Physiology</li>
                                        <li>• Personal Care Techniques</li>
                                        <li>• Communication Skills</li>
                                        <li>• Safety and Infection Control</li>
                                        <li>• Mental Health Support</li>
                                        <li>• Documentation and Reporting</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Training Agreement</CardTitle>
                                <CardDescription>
                                    Important terms and conditions
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                    <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">2-Year Work Commitment</h4>
                                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                        In exchange for sponsored training, you commit to work with Ellis for a minimum of 2 years after certification.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-medium">Key Terms:</h4>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Training certificate held by Ellis during contract period</li>
                                        <li>• Early departure requires prorated reimbursement</li>
                                        <li>• Full certificate ownership after 2-year completion</li>
                                        <li>• Application fee: $100-$150 for college screening</li>
                                    </ul>
                                </div>

                                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                                    <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Benefits Include:</h4>
                                    <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                                        <li>• Guaranteed employment opportunities</li>
                                        <li>• Competitive compensation</li>
                                        <li>• Career advancement support</li>
                                        <li>• International work opportunities</li>
                                    </ul>
                                </div>

                                {application && !application.trainingAgreementAccepted ? (
                                    <Button onClick={handleAcceptTraining} className="w-full" disabled={mutation.isPending}>
                                        Accept Training Agreement
                                    </Button>
                                ) : (
                                    <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                                        <FileCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                        <p className="font-medium text-green-900 dark:text-green-100">Agreement Accepted!</p>
                                        <p className="text-sm text-green-800 dark:text-green-200">
                                            Enrollment details will be sent within 48 hours
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Next Steps</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="text-center p-4 border rounded-lg">
                                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mx-auto mb-2">1</div>
                                    <h4 className="font-medium mb-1">College Enrollment</h4>
                                    <p className="text-sm text-muted-foreground">Receive enrollment package and payment instructions</p>
                                </div>
                                <div className="text-center p-4 border rounded-lg">
                                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mx-auto mb-2">2</div>
                                    <h4 className="font-medium mb-1">Begin Training</h4>
                                    <p className="text-sm text-muted-foreground">Start your online PSW certification program</p>
                                </div>
                                <div className="text-center p-4 border rounded-lg">
                                    <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mx-auto mb-2">3</div>
                                    <h4 className="font-medium mb-1">Proceed to Internship</h4>
                                    <p className="text-sm text-muted-foreground">Complete training and move to internship phase</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}