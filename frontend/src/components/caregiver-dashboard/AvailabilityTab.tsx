import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AvailabilityTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Manage Availability</CardTitle>
                <CardDescription>
                    Update your schedule and availability for new jobs
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium mb-4">Weekly Schedule</h3>
                        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                <Card key={day} className="p-4">
                                    <h4 className="font-medium mb-2">{day}</h4>
                                    <div className="space-y-2">
                                        <Button variant="outline" size="sm" className="w-full">
                                            Available
                                        </Button>
                                        <p className="text-xs text-muted-foreground">
                                            8:00 AM - 6:00 PM
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="text-lg font-medium mb-4">Preferences</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="p-4">
                                <h4 className="font-medium mb-2">Maximum Distance</h4>
                                <p className="text-sm text-muted-foreground">25 miles from your location</p>
                            </Card>
                            <Card className="p-4">
                                <h4 className="font-medium mb-2">Specialties</h4>
                                <div className="flex flex-wrap gap-1">
                                    <Badge variant="outline">Dementia Care</Badge>
                                    <Badge variant="outline">Physical Therapy</Badge>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 