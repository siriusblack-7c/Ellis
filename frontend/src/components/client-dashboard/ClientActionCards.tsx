import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientActionCards() {
    const navigate = useNavigate();
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Book Care Services</CardTitle>
                    <CardDescription>
                        Schedule care services for your recipients
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => navigate("/book-care")}>
                        Start Booking Process
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>My Care Recipients</CardTitle>
                    <CardDescription>
                        Manage profiles for people receiving care
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => navigate("/care-recipients")} variant="outline">
                        View Recipients
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>My Bookings</CardTitle>
                    <CardDescription>
                        View and manage your care bookings
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={() => navigate("/my-bookings")} variant="outline">
                        View Bookings
                    </Button>
                </CardContent>
            </Card>
        </>
    );
} 