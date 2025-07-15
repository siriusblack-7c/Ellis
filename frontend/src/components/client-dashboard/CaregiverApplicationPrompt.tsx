import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function aregiverApplicationPrompt() {
    const navigate = useNavigate();
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Complete Your Application</CardTitle>
                    <CardDescription>
                        Finish your caregiver application process
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => navigate("/application/step-1")}>
                        Continue Application
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Application Status</CardTitle>
                    <CardDescription>
                        Check your current application status
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => navigate("/application-status")} variant="outline">
                        Check Status
                    </Button>
                </CardContent>
            </Card>
        </>
    );
} 