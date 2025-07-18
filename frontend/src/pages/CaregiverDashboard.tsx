import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCaregiverJobs, mockCaregiverComplaints, mockCaregiverStats } from "@/data/mockData";
import OverviewTab from "@/components/caregiver-dashboard/OverviewTab";
import JobsTab from "@/components/caregiver-dashboard/JobsTab";
import AvailabilityTab from "@/components/caregiver-dashboard/AvailabilityTab";
import PerformanceTab from "@/components/caregiver-dashboard/PerformanceTab";
import ComplaintsTab from "@/components/caregiver-dashboard/ComplaintsTab";
import { getMyApplication } from "@/api/caregiverApplicationApi";
import { CaregiverApplication, ApplicationStage } from "@/types/caregiverApplication";
import { useAuth } from "@/hooks/useAuth";
import CaregiverApplicationPrompt from "@/components/client-dashboard/CaregiverApplicationPrompt";

const stageToStepMap: { [key in ApplicationStage]?: number } = {
  interview: 2,
  training: 3,
  internship: 4,
  hired: 5,
};

export default function CaregiverDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [application, setApplication] = useState<CaregiverApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [clockedIn, setClockedIn] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [reportText, setReportText] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await getMyApplication();
        setApplication(response);
        console.log(response, 'response');
        if (response) {
          const step = stageToStepMap[response.currentStage];
          if (step) {
            navigate(`/application/step-${step}`);
          }
        } else {
          navigate('/application/step-1');
        }
      } catch (error: any) {
        if (error.response?.status === 404 && user?.role === 'caregiver') {
          navigate('/application/step-1');
        } else {
          console.error("Failed to fetch application", error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchApplication();
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!application && user?.role === 'client') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <CaregiverApplicationPrompt />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!application && user?.role === 'caregiver') {
    return null;
  }

  if (application && application.currentStage === 'approved') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-20">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h1 className="text-4xl font-bold mb-2 text-green-600">Congratulations!</h1>
            <p className="text-lg text-muted-foreground">
              Your application has been approved. Welcome to the team!
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (application && application.currentStage !== 'hired' && application.stageStatus !== 'approved') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-4xl font-bold mb-2">Application In Progress</h1>
            <p className="text-lg text-muted-foreground">
              Your application is currently at the {application.currentStage} stage.
              Status: <span className="font-semibold">{application.stageStatus.replace('_', ' ')}</span>
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Caregiver Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Manage your caregiving schedule and performance
            </p>
          </div>

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
              jobs={mockCaregiverJobs.map(job => ({ ...job, id: job._id }))}
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
      </main>
      <Footer />
    </div>
  );
}