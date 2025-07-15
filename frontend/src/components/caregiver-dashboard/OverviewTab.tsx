import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    Clock,
    Star,
    DollarSign,
    CheckCircle,
    XCircle,
} from "lucide-react";

interface CaregiverStats {
    activeJobs: number;
    hoursThisWeek: number;
    rating: number;
    totalReviews: number;
    earningsThisMonth: number;
}

interface OverviewTabProps {
    stats: CaregiverStats;
    clockedIn: boolean;
    currentJobId: string | null;
}

export default function OverviewTab({ stats, clockedIn, currentJobId }: OverviewTabProps) {
    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeJobs}</div>
                        <p className="text-xs text-muted-foreground">Currently assigned</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Hours This Week</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.hoursThisWeek}</div>
                        <p className="text-xs text-muted-foreground">Out of 40 max</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rating</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold flex items-center gap-1">
                            {stats.rating}
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                        <p className="text-xs text-muted-foreground">From {stats.totalReviews} reviews</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Earnings</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${stats.earningsThisMonth}</div>
                        <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Current Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Current Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {clockedIn ? (
                                <Badge variant="default" className="bg-green-500">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Clocked In
                                </Badge>
                            ) : (
                                <Badge variant="secondary">
                                    <XCircle className="w-3 h-3 mr-1" />
                                    Clocked Out
                                </Badge>
                            )}
                            {clockedIn && currentJobId && (
                                <span className="text-sm text-muted-foreground">
                                    Working on Job #{currentJobId}
                                </span>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 