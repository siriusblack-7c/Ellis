
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Caregivers from "./pages/Caregivers";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import CareRecipients from "./pages/CareRecipients";
import MyBookings from "./pages/MyBookings";
import PaymentThankYou from './pages/PaymentThankYou';
import BookCare from "./pages/BookCare";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ClientDashboard from "./pages/ClientDashboard";
import CaregiverDetails from "./pages/CaregiverDetails";
import ApplicationStep1 from "./pages/ApplicationStep1";
import ApplicationStep2 from "./pages/ApplicationStep2";
import ApplicationStep3 from "./pages/ApplicationStep3";
import ApplicationStep4 from "./pages/ApplicationStep4";
import ApplicationStep5 from "./pages/ApplicationStep5";
import Settings from "./pages/Settings";
import CaregiverDashboard from "./pages/CaregiverDashboard";
import { LanguageProvider } from "./contexts/LanguageContext";
import AdminPrivateRoute from "./components/AdminPrivateRoute";

// Create a react-query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/caregivers" element={<Caregivers />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/care-recipients" element={<CareRecipients />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/payment-thank-you" element={<PaymentThankYou />} />
          <Route path="/book-care" element={<BookCare />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/caregiver-dashboard" element={<CaregiverDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPrivateRoute />}>
            <Route path="" element={<AdminDashboard />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/caregivers/:id" element={<CaregiverDetails />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/caregivers/:id" element={<CaregiverDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/application/step-1" element={<ApplicationStep1 />} />
          <Route path="/application/step-2" element={<ApplicationStep2 />} />
          <Route path="/application/step-3" element={<ApplicationStep3 />} />
          <Route path="/application/step-4" element={<ApplicationStep4 />} />
          <Route path="/application/step-5" element={<ApplicationStep5 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
