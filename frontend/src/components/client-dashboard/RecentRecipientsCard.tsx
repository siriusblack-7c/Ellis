import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecentRecipientsCard() {
    const navigate = useNavigate();
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Care Recipients</CardTitle>
                <CardDescription>
                    Quick overview of your care recipients
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                            <h4 className="font-semibold">Eleanor Doe</h4>
                            <p className="text-sm text-muted-foreground">Age 82 • Personal Care, Medication Management</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                            <h4 className="font-semibold">Robert Johnson</h4>
                            <p className="text-sm text-muted-foreground">Age 75 • Meal Preparation, Transportation</p>
                        </div>
                    </div>
                </div>
                <Button
                    onClick={() => navigate("/care-recipients")}
                    variant="outline"
                    className="w-full mt-4"
                >
                    View All Recipients
                </Button>
            </CardContent>
        </Card>
    );
} 