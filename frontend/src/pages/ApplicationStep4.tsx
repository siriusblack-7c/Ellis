import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Star, Clock, MapPin, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ApplicationStep4() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [selectedInternship, setSelectedInternship] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSelectInternship = (internshipId: string) => {
        setSelectedInternship(internshipId);
        toast({
            title: "Internship Selected!",
            description: "Your internship placement has been confirmed. You'll receive details within 24 hours.",
        });

        setTimeout(() => {
            navigate('/application/step-5');
        }, 2000);
    };

    const internships = [
        {
            id: "ellis-1",
            title: "Ellis Personal Care Services",
            type: "Paid Internship",
            location: "Toronto, ON",
            duration: "2 months",
            compensation: "$18/hour",
            description: "Work directly with Ellis care teams providing in-home support to clients.",
            benefits: ["Guaranteed job offer for top performers", "Direct mentorship", "Real client experience"],
            isPaid: true,
            isEllis: true
        },
        {
            id: "hospital-1",
            title: "Sunnybrook Health Sciences Centre",
            type: "Clinical Placement",
            location: "Toronto, ON",
            duration: "2 months",
            compensation: "Unpaid",
            description: "Gain experience in a hospital setting working with diverse patient populations.",
            benefits: ["Hospital experience", "Networking opportunities", "Possible job referrals"],
            isPaid: false,
            isEllis: false
        },
        {
            id: "ltc-1",
            title: "Baycrest Long-Term Care",
            type: "Care Home Placement",
            location: "North York, ON",
            duration: "2 months",
            compensation: "Unpaid",
            description: "Support elderly residents in a long-term care facility environment.",
            benefits: ["Specialized elderly care experience", "Team-based learning", "Certification pathway"],
            isPaid: false,
            isEllis: false
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 py-12 mt-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                            <h1 className="text-3xl font-bold">Internship Program</h1>
                        </div>
                        <p className="text-muted-foreground">
                            Complete a 2-month internship. Top performers receive paid positions with Ellis or local healthcare facilities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {internships.map((internship) => (
                            <Card key={internship.id} className={`relative ${selectedInternship === internship.id ? 'ring-2 ring-primary' : ''}`}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-lg">{internship.title}</CardTitle>
                                            <CardDescription className="flex items-center gap-2 mt-1">
                                                <MapPin className="h-4 w-4" />
                                                {internship.location}
                                            </CardDescription>
                                        </div>
                                        {internship.isEllis && (
                                            <Badge variant="default" className="bg-green-600">
                                                <Star className="h-3 w-3 mr-1" />
                                                Recommended
                                            </Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">{internship.type}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{internship.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            <span className={`text-sm font-medium ${internship.isPaid ? 'text-green-600' : 'text-gray-600'}`}>
                                                {internship.compensation}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground">
                                        {internship.description}
                                    </p>

                                    <div>
                                        <h4 className="font-medium text-sm mb-2">Benefits:</h4>
                                        <ul className="text-xs text-muted-foreground space-y-1">
                                            {internship.benefits.map((benefit, index) => (
                                                <li key={index}>• {benefit}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {selectedInternship === internship.id ? (
                                        <div className="text-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                                            <Star className="h-6 w-6 text-green-600 mx-auto mb-1" />
                                            <p className="font-medium text-green-900 dark:text-green-100 text-sm">Selected!</p>
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={() => handleSelectInternship(internship.id)}
                                            className="w-full"
                                            variant={internship.isEllis ? "default" : "outline"}
                                        >
                                            Select This Internship
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Internship Requirements & Expectations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium mb-3">Performance Evaluation Criteria:</h4>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Professionalism and punctuality</li>
                                        <li>• Client interaction and communication</li>
                                        <li>• Technical skill application</li>
                                        <li>• Teamwork and collaboration</li>
                                        <li>• Initiative and problem-solving</li>
                                        <li>• Documentation accuracy</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3">What to Expect:</h4>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Weekly supervision meetings</li>
                                        <li>• Hands-on client care experience</li>
                                        <li>• Regular performance feedback</li>
                                        <li>• Professional development opportunities</li>
                                        <li>• Potential job offer for top performers</li>
                                        <li>• Reference letters upon completion</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Success Tips:</h4>
                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                    Show enthusiasm, ask questions, be reliable, and demonstrate your commitment to providing excellent care.
                                    Top performers from Ellis internships receive guaranteed job offers!
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