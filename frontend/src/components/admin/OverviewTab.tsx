import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getAdminUsers, getAdminApplications } from "@/api/adminApi";
import { User } from "@/types/user";
import { CaregiverApplication } from "@/types/caregiverApplication";
import { eachMonthOfInterval, format, startOfMonth, subMonths } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function OverviewTab() {
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
      <TabsContent value="overview">
        <div className="space-y-4">
          <div className="text-center">Loading data...</div>
        </div>
      </TabsContent>
    );
  }

  const twelveMonthsAgo = subMonths(new Date(), 11);
  const months = eachMonthOfInterval({
    start: startOfMonth(twelveMonthsAgo),
    end: new Date(),
  });

  const monthlyGrowth = months.map(month => {
    const monthStr = format(month, 'MMM');
    const clients = users.filter(u => u.role === 'client' && format(new Date(u.createdAt), 'yyyy-MM') === format(month, 'yyyy-MM')).length;
    const caregivers = users.filter(u => u.role === 'caregiver' && format(new Date(u.createdAt), 'yyyy-MM') === format(month, 'yyyy-MM')).length;
    return { month: monthStr, clients, caregivers };
  });

  const userTypeData = [
    { name: 'Clients', value: users.filter(u => u.role === 'client').length, color: '#0EA5E9' },
    { name: 'Caregivers', value: users.filter(u => u.role === 'caregiver').length, color: '#10B981' },
  ];

  const statusData = [
    { name: 'Active', value: users.filter(u => u.status === 'active').length, color: '#22C55E' },
    { name: 'Blocked', value: users.filter(u => u.status === 'blocked').length, color: '#EF4444' },
    { name: 'Pending', value: users.filter(u => u.status === 'pending').length, color: '#FBBF24' },
  ];

  const recentUsers = users.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  const recentApplications = applications.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
  const getApplicantName = (userId: string) => {
    const user = users.find((u) => u._id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "Unknown Applicant";
  };

  return (
    <TabsContent value="overview">
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="clients" fill="#0EA5E9" name="Clients" />
                  <Bar dataKey="caregivers" fill="#10B981" name="Caregivers" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Types</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      {userTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map(user => (
                  <div key={user._id} className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map(app => (
                  <div key={app._id} className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={users.find(u => u._id === app.userId)?.avatar} />
                      <AvatarFallback>{getApplicantName(app.userId).charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{getApplicantName(app.userId)}</p>
                      <p className="text-sm text-muted-foreground">Status: {app.stageStatus}</p>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">{new Date(app.createdAt).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TabsContent>
  );
} 