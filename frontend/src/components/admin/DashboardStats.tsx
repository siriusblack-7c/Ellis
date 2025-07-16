import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Clock, Shield } from "lucide-react";
import { User } from "@/types/user";
import { CaregiverApplication } from "@/types/caregiverApplication";

type DashboardStatsProps = {
    users: User[];
    applications: CaregiverApplication[];
};

export function DashboardStats({ users, applications }: DashboardStatsProps) {
    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.status === 'active').length;
    const pendingApplications = applications.filter(app => app.status === 'pending').length;
    const verifiedCaregivers = applications.filter(app => app.status === 'hired').length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalUsers}</div>
                    <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{activeUsers}</div>
                    <p className="text-xs text-muted-foreground">Currently online</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Pending Applications
                    </CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{pendingApplications}</div>
                    <p className="text-xs text-muted-foreground">Awaiting review</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Verified Caregivers
                    </CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{verifiedCaregivers}</div>
                    <p className="text-xs text-muted-foreground">Background checked</p>
                </CardContent>
            </Card>
        </div>
    );
} 