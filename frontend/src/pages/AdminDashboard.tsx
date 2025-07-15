import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  mockUsers,
  mockApplications,
  mockStats,
  MockUser,
  MockApplication,
} from "@/data/mockData";
import { useGallery } from "@/contexts/GalleryContext";
import { useToast } from "@/components/ui/use-toast";

import { DashboardStats } from "@/components/admin/DashboardStats";
import { OverviewTab } from "@/components/admin/OverviewTab";
import { UserManagementTab } from "@/components/admin/UserManagementTab";
import { ApplicationsTab } from "@/components/admin/ApplicationsTab";
import { ActivityTab } from "@/components/admin/ActivityTab";
import { GalleryTab, GalleryImage } from "@/components/admin/GalleryTab";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { images: galleryImages, addImage, editImage, deleteImage, toggleImageActive } = useGallery();
  const [users, setUsers] = useState<MockUser[]>(mockUsers);
  const [applications, setApplications] =
    useState<MockApplication[]>(mockApplications);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [userSortBy, setUserSortBy] = useState<string>("name");
  const [userFilterStatus, setUserFilterStatus] = useState<string>("all");
  const [applicationFilterStatus, setApplicationFilterStatus] =
    useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [communicationDialog, setCommunicationDialog] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    navigate("/admin-login");
  };

  const handleUserAction = (userId: string, action: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, status: action === "block" ? "blocked" : "active" }
          : user
      )
    );

    toast({
      title: `User ${action}ed`,
      description: `User has been ${action}ed successfully.`,
    });
  };

  const handleVerifyDocuments = (applicationId: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId
          ? { ...app, documents_verified: true, status: "under_review" }
          : app
      )
    );

    toast({
      title: "Documents verified",
      description: "Application documents have been verified.",
    });
  };

  const handleFlagApplication = (applicationId: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: "rejected" } : app
      )
    );

    toast({
      title: "Application flagged",
      description: "Application has been flagged for review.",
    });
  };

  const handleTagUser = (userId: string, tag: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, tags: [...(user.tags || []), tag] }
          : user
      )
    );

    toast({
      title: "Tag added",
      description: `Tag "${tag}" has been added to user.`,
    });
  };

  const exportToCSV = (data: any[], filename: string) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(data[0]).join(",") +
      "\n" +
      data
        .map((row) => Object.values(row).join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export complete",
      description: `${filename} has been exported successfully.`,
    });
  };

  const handleSendCommunication = () => {
    const recipients =
      selectedUsers.length > 0 ? selectedUsers : selectedApplications;

    toast({
      title: "Message sent",
      description: `Message sent to ${recipients.length} recipient(s).`,
    });

    setCommunicationDialog(false);
    setMessageText("");
    setSelectedUsers([]);
    setSelectedApplications([]);
  };

  const handleSelectUser = (userId: string, isSelected: boolean) => {
    setSelectedUsers((prev) =>
      isSelected ? [...prev, userId] : prev.filter((id) => id !== userId)
    );
  };

  const handleSelectAllUsers = (isSelected: boolean) => {
    setSelectedUsers(isSelected ? filteredUsers.map((u) => u.id) : []);
  };

  const handleSelectApplication = (
    applicationId: string,
    isSelected: boolean
  ) => {
    setSelectedApplications((prev) =>
      isSelected
        ? [...prev, applicationId]
        : prev.filter((id) => id !== applicationId)
    );
  };

  const handleSelectAllApplications = (isSelected: boolean) => {
    setSelectedApplications(
      isSelected ? filteredApplications.map((a) => a.id) : []
    );
  };


  const filteredUsers = users
    .filter(
      (user) => userFilterStatus === "all" || user.status === userFilterStatus
    )
    .filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (userSortBy === "name")
        return `${a.first_name} ${a.last_name}`.localeCompare(
          `${b.first_name} ${b.last_name}`
        );
      if (userSortBy === "date")
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      if (userSortBy === "type") return a.user_type.localeCompare(b.user_type);
      return 0;
    });

  const filteredApplications = applications
    .filter(
      (app) =>
        applicationFilterStatus === "all" ||
        app.status === applicationFilterStatus
    )
    .sort((a, b) => {
      if (userSortBy === "name") {
        const userA = users.find((u) => u.id === a.user_id);
        const userB = users.find((u) => u.id === b.user_id);
        return `${userA?.first_name} ${userA?.last_name}`.localeCompare(
          `${userB?.first_name} ${userB?.last_name}`
        );
      }
      if (userSortBy === "experience")
        return b.years_experience - a.years_experience;
      return 0;
    });

  const userTypeData = [
    {
      name: "Clients",
      value: users.filter((u) => u.user_type === "client").length,
      color: "#0EA5E9",
    },
    {
      name: "Caregivers",
      value: users.filter((u) => u.user_type === "caregiver").length,
      color: "#10B981",
    },
  ];

  const statusData = [
    {
      name: "Active",
      value: users.filter((u) => u.status === "active").length,
      color: "#10B981",
    },
    {
      name: "Pending",
      value: users.filter((u) => u.status === "pending").length,
      color: "#F59E0B",
    },
    {
      name: "Blocked",
      value: users.filter((u) => u.status === "blocked").length,
      color: "#EF4444",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <DashboardStats
          totalUsers={mockStats.totalUsers}
          activeUsers={mockStats.activeUsers}
          pendingApplications={mockStats.pendingApplications}
          verifiedCaregivers={mockStats.verifiedCaregivers}
        />

        <Tabs
          defaultValue="overview"
          className="space-y-4"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab
              monthlyGrowth={mockStats.monthlyGrowth}
              userTypeData={userTypeData}
              statusData={statusData}
            />
          </TabsContent>

          <TabsContent value="users">
            <UserManagementTab
              users={filteredUsers}
              selectedUsers={selectedUsers}
              onSelectUser={handleSelectUser}
              onSelectAllUsers={handleSelectAllUsers}
              onUserAction={handleUserAction}
              onTagUser={handleTagUser}
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
              filterStatus={userFilterStatus}
              onFilterStatusChange={setUserFilterStatus}
              sortBy={userSortBy}
              onSortByChange={setUserSortBy}
              onExport={() => exportToCSV(filteredUsers, "users")}
              onContact={() => setCommunicationDialog(true)}
            />
          </TabsContent>

          <TabsContent value="applications">
            <ApplicationsTab
              applications={filteredApplications}
              users={users}
              selectedApplications={selectedApplications}
              onSelectApplication={handleSelectApplication}
              onSelectAllApplications={handleSelectAllApplications}
              onVerifyDocuments={handleVerifyDocuments}
              onFlagApplication={handleFlagApplication}
              filterStatus={applicationFilterStatus}
              onFilterStatusChange={setApplicationFilterStatus}
              onExport={() => exportToCSV(filteredApplications, "applications")}
              onContact={() => setCommunicationDialog(true)}
            />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryTab
              images={galleryImages}
              onAddImage={addImage}
              onEditImage={editImage}
              onDeleteImage={deleteImage}
              onToggleActive={toggleImageActive}
            />
          </TabsContent>

          <TabsContent value="activity">
            <ActivityTab users={users} />
          </TabsContent>
        </Tabs>

        <Dialog
          open={communicationDialog}
          onOpenChange={setCommunicationDialog}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Communication</DialogTitle>
            </DialogHeader>
            <Textarea
              placeholder="Type your message here..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              rows={6}
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setCommunicationDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSendCommunication}>Send</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}