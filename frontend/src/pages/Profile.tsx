import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone, Mail, MapPin, User, Users, AlertTriangle, UserRound } from "lucide-react";
import { format } from "date-fns";

// Mock user data - in real app this would come from API/database
const userData = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "+1234567890",
  dateOfBirth: new Date("1985-03-15"),
  gender: "Male",
  address: "123 Main St",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  country: "USA",
  emergencyContactName: "Jane Doe",
  emergencyContactPhone: "+1234567891",
  emergencyContactRelation: "Spouse",
  medicalConditions: "Hypertension, Type 2 Diabetes",
  allergies: "Penicillin, Shellfish",
  currentMedications: "Metformin 500mg twice daily, Lisinopril 10mg once daily",
  bio: "I'm a caring person looking for quality home care services for my elderly mother.",
  avatarUrl: "/placeholder.svg"
};

export default function Profile() {
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
                    <AvatarImage src={userData.avatarUrl} alt="Profile picture" />
                    <AvatarFallback className="text-lg">
                      {userData.firstName[0]}{userData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">
                      {userData.firstName} {userData.lastName}
                    </h2>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span>{userData.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span>{userData.phone}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{userData.bio}</p>
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
                    <span>{format(userData.dateOfBirth, "PPP")}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Gender</label>
                  <span className="flex items-center gap-2"><UserRound className="w-4 h-4 text-muted-foreground" /> {userData.gender}</span>
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
                      <div>{userData.address}</div>
                      <div>{userData.city}, {userData.state} {userData.zipCode}</div>
                      <div>{userData.country}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
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
                  <span className="flex items-center gap-2"><UserRound className="w-4 h-4 text-muted-foreground" /> {userData.emergencyContactName}</span>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Contact Phone</label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{userData.emergencyContactPhone}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Relationship</label>
                  <span className="flex items-center gap-2"><UserRound className="w-4 h-4 text-muted-foreground" /> {userData.emergencyContactRelation}</span>
                </div>
              </CardContent>
            </Card>

            {/* Medical Information */}
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}