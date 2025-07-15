import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCaregiverJobs, mockCaregiverComplaints, mockCaregiverStats } from "@/data/mockData";
import OverviewTab from "@/components/caregiver-dashboard/OverviewTab";
import JobsTab from "@/components/caregiver-dashboard/JobsTab";
import AvailabilityTab from "@/components/caregiver-dashboard/AvailabilityTab";
import PerformanceTab from "@/components/caregiver-dashboard/PerformanceTab";
import ComplaintsTab from "@/components/caregiver-dashboard/ComplaintsTab";

export default function CaregiverDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [clockedIn, setClockedIn] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [reportText, setReportText] = useState("");

  const handleClockAction = (jobId: string) => {
    if (clockedIn && currentJobId === jobId) {
      setClockedIn(false);
      setCurrentJobId(null);
    } else {
      setClockedIn(true);
      setCurrentJobId(jobId);
    }
  };

  const handleSubmitReport = () => {
    console.log("Daily report submitted:", reportText);
    setReportText("");
  };

  const handleComplaintResponse = (complaintId: string, response: string) => {
    console.log("Response to complaint:", complaintId, response);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Caregiver Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Manage your caregiving schedule and performance
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="jobs">Active Jobs</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="complaints">Complaints</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <OverviewTab
                stats={mockCaregiverStats}
                clockedIn={clockedIn}
                currentJobId={currentJobId}
              />
            </TabsContent>

            <TabsContent value="jobs">
              <JobsTab
                jobs={mockCaregiverJobs}
                clockedIn={clockedIn}
                currentJobId={currentJobId}
                reportText={reportText}
                handleClockAction={handleClockAction}
                setReportText={setReportText}
                handleSubmitReport={handleSubmitReport}
              />
            </TabsContent>

            <TabsContent value="availability">
              <AvailabilityTab />
            </TabsContent>

            <TabsContent value="performance">
              <PerformanceTab stats={mockCaregiverStats} />
            </TabsContent>

            <TabsContent value="complaints">
              <ComplaintsTab
                complaints={mockCaregiverComplaints}
                handleComplaintResponse={handleComplaintResponse}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}