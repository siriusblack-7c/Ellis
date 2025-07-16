import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/useAuth';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, register, isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState<"client" | "caregiver">("client");

  const mode = searchParams.get("mode") || "signin";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.response?.data?.message || error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        role,
      });
      toast({
        title: "Account created!",
        description: "Welcome to Ellis Global Care! You can now access your dashboard.",
      });
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.response?.data?.message || error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Use role from user object for navigation
      if (user?.role === "admin") {
        navigate("/admin-dashboard");
      } else if (user?.role === "caregiver") {
        navigate("/caregiver-dashboard");
      } else {
        navigate("/client-dashboard");
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Tabs defaultValue={mode === "signup" ? "signup" : "signin"} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
                  <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
                  <form onSubmit={handleSignIn} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email-signin">Email Address</Label>
                      <Input
                        id="email-signin"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-signin">Password</Label>
                      <Input
                        id="password-signin"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="signup">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
                  <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
                  <form onSubmit={handleSignUp} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="userType">I am a</Label>
                      <Select value={role} onValueChange={(value: "client" | "caregiver") => setRole(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="client">Client (Looking for care)</SelectItem>
                          <SelectItem value="caregiver">Caregiver (Providing care)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-signup">Email Address</Label>
                      <Input
                        id="email-signup"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-signup">Password</Label>
                      <Input
                        id="password-signup"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={6}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}