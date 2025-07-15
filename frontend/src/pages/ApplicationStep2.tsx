import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, CheckCircle, Clock, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ApplicationStep2() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isRecording, setIsRecording] = useState(false);
    const [hasRecorded, setHasRecorded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleStartRecording = () => {
        setIsRecording(true);
        // Simulate recording process
        setTimeout(() => {
            setIsRecording(false);
            setHasRecorded(true);
            toast({
                title: "Recording Complete!",
                description: "Your video interview has been recorded successfully.",
            });
        }, 3000);
    };

    const handleSubmitVideo = () => {
        toast({
            title: "Video Submitted!",
            description: "Your video interview has been submitted for review. We'll contact you within 5-7 business days.",
        });

        setTimeout(() => {
            navigate('/application/step-3');
        }, 2000);
    };

    const questions = [
        "Why do you want to become a caregiver?",
        "What experience do you have in healthcare or caring for others?",
        "How would you handle a difficult situation with a client?",
        "What motivates you to work with Ellis Care Global?",
        "Describe a time when you showed compassion and empathy."
    ];

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
                                    {!isRecording && !hasRecorded && (
                                        <>
                                            <Video className="h-16 w-16 text-muted-foreground mb-4" />
                                            <p className="text-muted-foreground mb-4">Click the button below to start recording</p>
                                            <Button onClick={handleStartRecording}>Start Recording</Button>
                                        </>
                                    )}

                                    {isRecording && (
                                        <>
                                            <div className="animate-pulse">
                                                <div className="bg-red-500 rounded-full w-4 h-4 mb-4"></div>
                                            </div>
                                            <p className="text-red-600 font-medium">Recording in progress...</p>
                                            <p className="text-sm text-muted-foreground mt-2">Please answer the questions clearly</p>
                                        </>
                                    )}

                                    {hasRecorded && (
                                        <>
                                            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                            <p className="text-green-600 font-medium mb-4">Video recorded successfully!</p>
                                            <div className="space-y-2">
                                                <Button onClick={handleSubmitVideo} className="w-full">
                                                    Submit Video Interview
                                                </Button>
                                                <Button variant="outline" onClick={() => setHasRecorded(false)} className="w-full">
                                                    Record Again
                                                </Button>
                                            </div>
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