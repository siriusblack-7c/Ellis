import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, Key } from "lucide-react";
import { ProfileSettingsTab } from "@/components/settings/ProfileSettingsTab";
import { AccountSettingsTab } from "@/components/settings/AccountSettingsTab";
import { PaymentSettingsTab } from "@/components/settings/PaymentSettingsTab";
import { useAuth } from "@/hooks/useAuth";

export default function Settings() {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["profile", "account", "payment"].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p className="text-lg text-muted-foreground">
              Manage your account preferences and security settings
            </p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            {
              user?.role === 'client' ?
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User className="w-8 h-4" />
                    Profile Settings
                  </TabsTrigger>
                  <TabsTrigger value="account" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Account & Security
                  </TabsTrigger>
                  <TabsTrigger value="payment" className="flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    Payment Settings
                  </TabsTrigger>
                </TabsList> :
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="profile" className="flex items-center gap-2">
                    <User className="w-8 h-4" />
                    Profile Settings
                  </TabsTrigger>
                  <TabsTrigger value="account" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Account & Security
                  </TabsTrigger>
                </TabsList>

            }

            <TabsContent value="profile">
              <ProfileSettingsTab />
            </TabsContent>

            <TabsContent value="account">
              <AccountSettingsTab />
            </TabsContent>

            <TabsContent value="payment">
              <PaymentSettingsTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}