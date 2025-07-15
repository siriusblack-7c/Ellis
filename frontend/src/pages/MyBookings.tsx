import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Phone, Star, MessageCircle, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Booking {
  id: string;
  care_recipient_name: string;
  caregiver_name: string;
  caregiver_image: string;
  caregiver_rating: number;
  start_date: string;
  end_date: string;
  schedule_details: {
    shift_type: string;
    hours_per_day: number;
    days_of_week: string[];
  };
  status: "upcoming" | "active" | "completed" | "cancelled";
  total_cost: number;
  special_instructions: string;
  care_services: string[];
  caregiver_phone: string;
}

const mockBookings: Booking[] = [
  {
    id: "1",
    care_recipient_name: "Eleanor Doe",
    caregiver_name: "Sarah Johnson",
    caregiver_image: "/placeholder.svg",
    caregiver_rating: 4.9,
    start_date: "2024-07-20",
    end_date: "2024-08-20",
    schedule_details: {
      shift_type: "Day Shift",
      hours_per_day: 8,
      days_of_week: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    },
    status: "upcoming",
    total_cost: 4800,
    special_instructions: "Please assist with medication at 2 PM daily",
    care_services: ["Personal Care", "Medication Management", "Companionship"],
    caregiver_phone: "+1234567890"
  },
  {
    id: "2",
    care_recipient_name: "Robert Johnson", 
    caregiver_name: "Maria Garcia",
    caregiver_image: "/placeholder.svg",
    caregiver_rating: 4.8,
    start_date: "2024-06-15",
    end_date: "2024-07-15",
    schedule_details: {
      shift_type: "Night Shift",
      hours_per_day: 12,
      days_of_week: ["Saturday", "Sunday"]
    },
    status: "active",
    total_cost: 3600,
    special_instructions: "Low-sodium meal preparation required",
    care_services: ["Meal Preparation", "Light Housekeeping", "Companionship"],
    caregiver_phone: "+1234567891"
  },
  {
    id: "3",
    care_recipient_name: "Eleanor Doe",
    caregiver_name: "James Wilson",
    caregiver_image: "/placeholder.svg", 
    caregiver_rating: 4.7,
    start_date: "2024-05-01",
    end_date: "2024-05-31",
    schedule_details: {
      shift_type: "Day Shift",
      hours_per_day: 6,
      days_of_week: ["Monday", "Wednesday", "Friday"]
    },
    status: "completed",
    total_cost: 2160,
    special_instructions: "Physical therapy assistance needed",
    care_services: ["Mobility Assistance", "Personal Care"],
    caregiver_phone: "+1234567892"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming": return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
    case "active": return "bg-green-500/10 text-green-700 dark:text-green-400";
    case "completed": return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    case "cancelled": return "bg-red-500/10 text-red-700 dark:text-red-400";
    default: return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
  }
};

export default function MyBookings() {
  const [bookings] = useState<Booking[]>(mockBookings);

  const upcomingBookings = bookings.filter(b => b.status === "upcoming");
  const activeBookings = bookings.filter(b => b.status === "active");
  const pastBookings = bookings.filter(b => b.status === "completed" || b.status === "cancelled");

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={booking.caregiver_image} alt={booking.caregiver_name} />
              <AvatarFallback>
                {booking.caregiver_name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{booking.caregiver_name}</CardTitle>
              <CardDescription>
                Caring for {booking.care_recipient_name}
              </CardDescription>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{booking.caregiver_rating}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(booking.status)}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Caregiver
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Caregiver
                </DropdownMenuItem>
                {booking.status === "upcoming" && (
                  <DropdownMenuItem className="text-red-600">
                    Cancel Booking
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Schedule Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                {booking.schedule_details.shift_type} ({booking.schedule_details.hours_per_day} hours/day)
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                {booking.schedule_details.days_of_week.join(", ")}
              </div>
            </div>

            <h4 className="font-semibold mt-4 mb-2">Care Services</h4>
            <div className="flex flex-wrap gap-2">
              {booking.care_services.map((service) => (
                <Badge key={service} variant="secondary">
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Special Instructions</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {booking.special_instructions}
            </p>

            <h4 className="font-semibold mb-2">Contact Information</h4>
            <div className="flex items-center text-sm">
              <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
              {booking.caregiver_phone}
            </div>

            <div className="mt-4 p-3 bg-muted rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Cost</span>
                <span className="text-lg font-bold">${booking.total_cost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </Button>
          </div>
          {booking.status === "completed" && (
            <Button size="sm">
              <Star className="w-4 h-4 mr-2" />
              Rate & Review
            </Button>
          )}
          {booking.status === "upcoming" && (
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              Modify Booking
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
            <p className="text-lg text-muted-foreground">
              View and manage your care service bookings
            </p>
          </div>

          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">
                Upcoming ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="active">
                Active ({activeBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Past ({pastBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6">
              {upcomingBookings.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Upcoming Bookings</h3>
                    <p className="text-muted-foreground mb-4">
                      You don't have any upcoming care bookings scheduled
                    </p>
                    <Button>Book Care Services</Button>
                  </CardContent>
                </Card>
              ) : (
                upcomingBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              )}
            </TabsContent>

            <TabsContent value="active" className="space-y-6">
              {activeBookings.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Clock className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Active Bookings</h3>
                    <p className="text-muted-foreground">
                      You don't have any currently active care bookings
                    </p>
                  </CardContent>
                </Card>
              ) : (
                activeBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              {pastBookings.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Star className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Past Bookings</h3>
                    <p className="text-muted-foreground">
                      Your completed bookings will appear here
                    </p>
                  </CardContent>
                </Card>
              ) : (
                pastBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}