import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Clock, Shield } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAdminUsers, getAdminApplications } from "@/api/adminApi";
import { User } from "@/types/user";
import { CaregiverApplication } from "@/types/caregiverApplication";

export function DashboardStats() {
    const { data: users = [], isLoading: isLoadingUsers } = useQuery<User[]>({
        queryKey: ['adminUsers'],
        queryFn: getAdminUsers,
    });

    const { data: applications = [], isLoading: isLoadingApplications } = useQuery<CaregiverApplication[]>({
        queryKey: ['adminApplications'],
        queryFn: getAdminApplications,
    });

    if (isLoadingUsers || isLoadingApplications) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.status === 'active').length;
    const pendingApplications = applications.filter(app => app.stageStatus === 'pending_review').length;
    const verifiedCaregivers = applications.filter(app => app.stageStatus === 'approved').length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalUsers}</div>
                    <p className="text-xs text-muted-foreground">Registered in the system</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{activeUsers}</div>
                    <p className="text-xs text-muted-foreground">Currently active</p>
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
                    <p className="text-xs text-muted-foreground">Successfully hired</p>
                </CardContent>
            </Card>
        </div>
    );
} 