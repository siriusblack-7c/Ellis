import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockActivity, MockUser } from "@/data/mockData";
import { TabsContent } from "@/components/ui/tabs";

type ActivityTabProps = {
    users: MockUser[];
};

export function ActivityTab({ users }: ActivityTabProps) {
    const getActivityUser = (userId: string) => {
        return users.find((u) => u.id === userId);
    };

    return (
        <TabsContent value="activity">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {mockActivity.map((activity) => {
                            const user = getActivityUser(activity.user_id);
                            return (
                                <div key={activity.id} className="flex items-start gap-4">
                                    <Avatar>
                                        <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.email}`} />
                                        <AvatarFallback>
                                            {user?.first_name.charAt(0)}
                                            {user?.last_name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm">
                                            <span className="font-semibold">
                                                {user?.first_name} {user?.last_name}
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