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
import { useAdmin } from "@/hooks/useAdmin";
import { useGallery } from "@/contexts/GalleryContext";
import { useToast } from "@/components/ui/use-toast";

import { DashboardStats } from "@/components/admin/DashboardStats";
import { OverviewTab } from "@/components/admin/OverviewTab";
import { UserManagementTab } from "@/components/admin/UserManagementTab";
import { ApplicationsTab } from "@/components/admin/ApplicationsTab";
import { ActivityTab } from "@/components/admin/ActivityTab";
import { GalleryTab } from "@/components/admin/GalleryTab";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    users,
    isLoadingUsers,
    applications,
    isLoadingApplications,
    updateApplicationStatus,
    updateUserStatus,
  } = useAdmin();

  const { images: galleryImages, addImage, editImage, deleteImage, toggleImageActive } = useGallery();
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
    updateUserStatus({ id: userId, status: action });
  };

  const handleVerifyDocuments = (applicationId: string) => {
    updateApplicationStatus({ id: applicationId, status: "under_review" });
  };

  const handleFlagApplication = (applicationId: string) => {
    updateApplicationStatus({ id: applicationId, status: "rejected" });
  };

  const handleApproveApplication = (applicationId: string) => {
    updateApplicationStatus({ id: applicationId, status: "hired" });
  };

  const handleTagUser = (userId: string, tag: string) => {
    // This function will need to be updated to use a mutation for tags
    toast({
      title: "Tag added",
      description: `Tag "${tag}" has been added to user (placeholder).`,
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
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (userSortBy === "name")
        return `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`
        );
      if (userSortBy === "date")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (userSortBy === "type") return a.role.localeCompare(b.role);
      return 0;
    });

  const filteredApplications = applications
    .filter(
      (app) =>
        applicationFilterStatus === "all" ||
        app.status === applicationFilterStatus
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="destructive">Logout</Button>
        </div>
      </header>
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DashboardStats applications={applications} users={users} />
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

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
                isLoading={isLoadingUsers}
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
                onApproveApplication={handleApproveApplication}
                filterStatus={applicationFilterStatus}
                onFilterStatusChange={setApplicationFilterStatus}
                onExport={() => exportToCSV(filteredApplications, "applications")}
                onContact={() => setCommunicationDialog(true)}
                isLoading={isLoadingApplications}
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
        </div>
      </main>
    </div>
  );
}