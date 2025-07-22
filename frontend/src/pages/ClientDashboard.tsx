import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardHeader from "@/components/client-dashboard/DashboardHeader";
import ClientActionCards from "@/components/client-dashboard/ClientActionCards";
import RecentRecipientsCard from "@/components/client-dashboard/RecentRecipientsCard";
import { useAuth } from "@/hooks/useAuth";

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <DashboardHeader name={user?.firstName} userType={user?.role as 'client' | 'caregiver'} />

            <div className="space-y-8">

              <div className="grid gap-6">
                <ClientActionCards />
                {/* <RecentRecipientsCard /> */}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}