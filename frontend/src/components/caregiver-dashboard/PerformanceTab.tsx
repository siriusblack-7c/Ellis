import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

interface CaregiverStats {
    rating: number;
}

interface PerformanceTabProps {
    stats: CaregiverStats;
}

export default function PerformanceTab({ stats }: PerformanceTabProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Rating Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span>Overall Rating</span>
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{stats.rating}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span>Professionalism</span>
                            <span>4.8</span>
                        </div>
                        <Progress value={96} className="h-2" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span>Reliability</span>
                            <span>4.9</span>
                        </div>
                        <Progress value={98} className="h-2" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span>Care Quality</span>
                            <span>4.7</span>
                        </div>
                        <Progress value={94} className="h-2" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="border rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">2 days ago</span>
                            </div>
                            <p className="text-sm">"Excellent care for my mother. Very professional and kind."</p>
                        </div>
                        <div className="border rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                    {[1, 2, 3, 4].map((star) => (
                                        <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    ))}
                                    <Star className="w-3 h-3 text-gray-300" />
                                </div>
                                <span className="text-sm text-muted-foreground">1 week ago</span>
                            </div>
                            <p className="text-sm">"Good caregiver, always on time."</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 