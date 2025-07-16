import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone, Mail, MapPin, User, Users, AlertTriangle, UserRound } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

// Mock user data - in real app this would come from API/database
// const userData = {
//   firstName: "John",
//   lastName: "Doe",
//   email: "john@example.com",
//   phoneNumber: "+1234567890",
//   birthDate: new Date("1985-03-15"),
//   gender: "Male",
//   address: "123 Main St",
//   city: "New York",
//   state: "NY",
//   zipCode: "10001",
//   country: "USA",
//   medicalConditions: "Hypertension, Type 2 Diabetes",
//   allergies: "Penicillin, Shellfish",
//   currentMedications: "Metformin 500mg twice daily, Lisinopril 10mg once daily",
//   bio: "I'm a caring person looking for quality home care services for my elderly mother.",
//   avatarUrl: "http://localhost:5000/uploads/profile_images/1726412400000-profile.jpg"
// };

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-10 w-1/3 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <div className="space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-6">
                    <Skeleton className="w-24 h-24 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-8 w-48" />
                      <Skeleton className="h-5 w-72" />
                      <Skeleton className="h-5 w-64" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-5 w-60" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-12 w-full" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-5 w-60" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-12 w-full" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-5 w-60" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-12 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-2xl font-bold">User not found</h1>
            <p className="text-muted-foreground">Please log in to view your profile.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const fullAddress = [user.addressStreet, user.addressCity, user.addressState, user.addressZip, user.addressCountry].filter(Boolean).join(', ');


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Profile</h1>
            <p className="text-lg text-muted-foreground">
              View your personal information and details
            </p>
          </div>

          <div className="space-y-8">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={`http://localhost:5001${user.avatar}`} alt="Profile picture" />
                    <AvatarFallback className="text-lg">
                      {user.firstName[0]}{user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">
                      {user.firstName} {user.lastName}
                    </h2>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span>{user.phoneNumber}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{user.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Your basic personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{user.birthDate ? format(new Date(user.birthDate), "PPP") : 'N/A'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Gender</label>
                  <span className="flex items-center gap-2"><UserRound className="w-4 h-4 text-muted-foreground" /> {user.gender}</span>
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Address Information
                </CardTitle>
                <CardDescription>
                  Your current residential address
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Full Address</label>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                    <div>
                      <div>{user.addressStreet}</div>
                      <div>{user.addressCity}, {user.addressState} {user.addressZip}</div>
                      <div>{user.addressCountry}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Emergency Contact
                </CardTitle>
                <CardDescription>
                  Person to contact in case of emergency
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Contact Name</label>
                  <span className="flex items-center gap-2"><UserRound className="w-4 h-4 text-muted-foreground" /> {user.emergencyContactName}</span>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Contact Phone</label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{user.emergencyContactPhone}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Relationship</label>
                  <span className="flex items-center gap-2"><UserRound className="w-4 h-4 text-muted-foreground" /> {user.emergencyContactRelationship || "N/A"}</span>
                </div>
              </CardContent>
            </Card> */}

            {/* Medical Information */}
            {/*
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Medical Information
                </CardTitle>
                <CardDescription>
                  Important medical information for caregivers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Medical Conditions</label>
                  <div className="flex flex-wrap gap-2">
                    {userData.medicalConditions.split(', ').map((condition, index) => (
                      <Badge key={index} variant="secondary">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Allergies</label>
                  <div className="flex flex-wrap gap-2">
                    {userData.allergies.split(', ').map((allergy, index) => (
                      <Badge key={index} variant="destructive">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Current Medications</label>
                  <p className="text-sm">{userData.currentMedications}</p>
                </div>
              </CardContent>
            </Card>
            */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}