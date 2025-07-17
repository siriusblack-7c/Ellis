import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { OverviewTab } from "@/components/admin/OverviewTab";
import { UserManagementTab } from "@/components/admin/UserManagementTab";
import { ApplicationsTab } from "@/components/admin/ApplicationsTab";
import { ActivityTab } from "@/components/admin/ActivityTab";
import { GalleryTab } from "@/components/admin/GalleryTab";
import { useGallery } from "@/contexts/GalleryContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { images: galleryImages, addImage, editImage, deleteImage, toggleImageActive } = useGallery();
  const [communicationDialog, setCommunicationDialog] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const { adminLogout } = useAuth();

  const handleLogout = () => {
    adminLogout();
    navigate("/admin-login");
  };

  const handleSendCommunication = () => {
    // This function will need to be re-evaluated
    // based on how communication is handled from each tab
    console.log("Sending communication:", messageText);
    setCommunicationDialog(false);
    setMessageText("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button onClick={handleLogout} variant="destructive">Logout</Button>
          </div>
        </div>
      </header>
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DashboardStats />
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              {/* <TabsTrigger value="gallery">Gallery</TabsTrigger> */}
            </TabsList>
            <TabsContent value="overview">
              <OverviewTab />
            </TabsContent>

            <TabsContent value="users">
              <UserManagementTab />
            </TabsContent>

            <TabsContent value="applications">
              <ApplicationsTab />
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
              <ActivityTab />
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