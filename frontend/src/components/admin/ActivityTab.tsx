import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TabsContent } from "@/components/ui/tabs";
import { User } from '@/types/user';
import { CaregiverApplication } from "@/types/caregiverApplication";
import { useQuery } from "@tanstack/react-query";
import { getAdminUsers, getAdminApplications } from "@/api/adminApi";

type Activity = {
    id: string;
    userId: string;
    action: string;
    timestamp: Date;
};

export function ActivityTab() {
    const { data: users = [], isLoading: isLoadingUsers } = useQuery<User[]>({
        queryKey: ['adminUsers'],
        queryFn: getAdminUsers,
    });

    const { data: applications = [], isLoading: isLoadingApplications } = useQuery<CaregiverApplication[]>({
        queryKey: ['adminApplications'],
        queryFn: getAdminApplications,
    });

    const activities: Activity[] = [
        ...users.map(user => ({
            id: `user-${user._id}`,
            userId: user._id,
            action: `registered as a new ${user.role}.`,
            timestamp: new Date(user.createdAt),
        })),
        ...applications.map(app => ({
            id: `app-create-${app._id}`,
            userId: app.userId,
            action: `submitted a caregiver application.`,
            timestamp: new Date(app.createdAt),
        })),
        ...applications
            .filter(app => new Date(app.updatedAt).getTime() - new Date(app.createdAt).getTime() > 1000) // Filter out initial creation
            .map(app => ({
                id: `app-update-${app._id}`,
                userId: app.userId,
                action: `application status changed to ${app.status}.`,
                timestamp: new Date(app.updatedAt),
            })),
    ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    const getActivityUser = (userId: string) => {
        return users.find((u) => u._id === userId);
    };

    if (isLoadingUsers || isLoadingApplications) {
        return (
            <TabsContent value="activity">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>Loading activities...</div>
                    </CardContent>
                </Card>
            </TabsContent>
        );
    }

    return (
        <TabsContent value="activity">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {activities.map((activity) => {
                            const user = getActivityUser(activity.userId);
                            return (
                                <div key={activity.id} className="flex items-start gap-4">
                                    <Avatar>
                                        <AvatarImage src={user?.avatar} />
                                        <AvatarFallback>
                                            {user?.firstName.charAt(0)}
                                            {user?.lastName.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm">
                                            <span className="font-semibold">
                                                {user?.firstName} {user?.lastName}
                                            </span>{" "}
                                            {activity.action}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(activity.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
} 