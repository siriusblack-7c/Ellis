import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import { useRecipients } from "@/hooks/useRecipients";
import { CareRecipient } from "@/types/recipient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BOOKING_STEPS = [
  { id: 1, title: "Select Recipient", description: "Choose who needs care" },
  { id: 2, title: "Care Details", description: "Specify care requirements" },
  { id: 3, title: "Schedule", description: "Set dates and schedule" },
  { id: 4, title: "Select Caregiver", description: "Choose your caregiver" },
  { id: 5, title: "Confirmation", description: "Review and confirm" }
];

export default function BookCare() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<{
    recipient: CareRecipient | null;
    careNeeds: string[];
    schedule: any;
    caregiver: any;
  }>({
    recipient: location.state?.selectedRecipient || null,
    careNeeds: [],
    schedule: null,
    caregiver: null
  });

  const progress = (currentStep / BOOKING_STEPS.length) * 100;

  const handleUpdateBookingData = (data: Partial<typeof bookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < BOOKING_STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <SelectRecipientStep onNext={handleNext} onUpdateBookingData={handleUpdateBookingData} selectedRecipientId={bookingData.recipient?._id} />;
      case 2:
        return <CareDetailsStep onNext={handleNext} onPrevious={handlePrevious} onUpdateBookingData={handleUpdateBookingData} bookingData={bookingData} />;
      case 3:
        return <ScheduleStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 4:
        return <SelectCaregiverStep onNext={handleNext} onPrevious={handlePrevious} />;
      case 5:
        return <ConfirmationStep onPrevious={handlePrevious} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Book Care Services</h1>
            <div className="space-y-4">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between items-center">
                {BOOKING_STEPS.map((step) => (
                  <div
                    key={step.id}
                    className={`text-center flex-1 ${currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                      }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-medium ${currentStep >= step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {step.id}
                    </div>
                    <div className="text-sm font-medium">{step.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          {renderStepContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Step 1: Select Recipient
function SelectRecipientStep({ onNext, onUpdateBookingData, selectedRecipientId }: {
  onNext: () => void;
  onUpdateBookingData: (data: { recipient: CareRecipient | null }) => void;
  selectedRecipientId?: string;
}) {
  const navigate = useNavigate();
  const { recipients, loading, error } = useRecipients();

  const handleSelectRecipient = (recipient: CareRecipient) => {
    onUpdateBookingData({ recipient });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="p-4 border rounded-lg flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (recipients.length === 0) {
      return (
        <div className="text-center py-8 border-2 border-dashed rounded-lg">
          <h3 className="text-lg font-semibold">No care recipients found.</h3>
          <p className="text-muted-foreground text-sm mt-1">
            You need to add a care recipient before you can book care.
          </p>
        </div>
      );
    }

    return recipients.map((recipient) => (
      <div
        key={recipient._id}
        className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedRecipientId === recipient._id
          ? "border-primary bg-primary/5"
          : "border-muted hover:border-muted-foreground"
          }`}
        onClick={() => handleSelectRecipient(recipient)}
      >
        <div className="flex items-start space-x-4">
          <Avatar className="w-12 h-12 border">
            {recipient.avatar && <AvatarImage src={`${import.meta.env.VITE_API_BASE_URL}/${recipient.avatar}`} alt={recipient.name} />}
            <AvatarFallback>{recipient.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{recipient.name}</h3>
            <p className="text-sm text-muted-foreground">
              Age {recipient.age} • {recipient.location}
            </p>
            {recipient.careNeeds && recipient.careNeeds.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {recipient.careNeeds.map((need) => (
                  <Badge key={need} variant="secondary" className="text-xs capitalize">
                    {need.replace(/([A-Z])/g, ' $1').trim()}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Care Recipient</CardTitle>
        <CardDescription>
          Choose who will be receiving care services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderContent()}

        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate("/care-recipients")}
        >
          + Add New Care Recipient
        </Button>

        <div className="flex justify-end pt-4">
          <Button onClick={onNext} disabled={!selectedRecipientId}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Step 2: Care Details
function CareDetailsStep({ onNext, onPrevious, onUpdateBookingData, bookingData }: { onNext: () => void; onPrevious: () => void; onUpdateBookingData: (data: any) => void; bookingData: any; }) {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(bookingData.careNeeds || bookingData.recipient?.careNeeds || []);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const careNeeds = [
    "Personal Care",
    "Companionship",
    "Meal Preparation",
    "Medication Management",
    "Mobility Assistance",
    "Light Housekeeping",
    "Transportation"
  ];

  const premiumAddOns = [
    { name: "Female Caregiver Preferred", price: 0 },
    { name: "Professional Chef", price: 50 },
    { name: "Massage Therapist", price: 75 },
    { name: "Bilingual (Spanish)", price: 25 },
    { name: "Certified Nursing Assistant", price: 100 },
    { name: "Dementia Care Specialist", price: 150 }
  ];

  const toggleNeed = (need: string) => {
    const newNeeds = selectedNeeds.includes(need)
      ? selectedNeeds.filter(n => n !== need)
      : [...selectedNeeds, need];
    setSelectedNeeds(newNeeds);
    onUpdateBookingData({ careNeeds: newNeeds });
  };

  const toggleAddOn = (addOn: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOn)
        ? prev.filter(a => a !== addOn)
        : [...prev, addOn]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Care Requirements</CardTitle>
        <CardDescription>
          Select the type of care services needed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Required Care Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {careNeeds.map((need) => (
              <Button
                key={need}
                variant={selectedNeeds.includes(need) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleNeed(need)}
                className="justify-start h-auto py-3 px-4"
              >
                {need}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Premium Add-ons</h3>
          <div className="space-y-3">
            {premiumAddOns.map((addOn) => (
              <div
                key={addOn.name}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedAddOns.includes(addOn.name)
                  ? "border-primary bg-primary/5"
                  : "border-muted hover:border-muted-foreground"
                  }`}
                onClick={() => toggleAddOn(addOn.name)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{addOn.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {addOn.price > 0 ? `+$${addOn.price}/day` : "No extra charge"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onPrevious}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button onClick={onNext} disabled={selectedNeeds.length === 0}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Step 3: Schedule
function ScheduleStep({ onNext, onPrevious }: { onNext: () => void; onPrevious: () => void }) {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [shiftType, setShiftType] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const shiftTypes = [
    { name: "Day Shift", hours: "8 AM - 6 PM (10 hours)", rate: 25 },
    { name: "Night Shift", hours: "8 PM - 6 AM (10 hours)", rate: 30 },
    { name: "24-Hour Care", hours: "Full day coverage", rate: 45 }
  ];

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  // Get minimum date (1 week from now)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 7);
  const minDateString = minDate.toISOString().split('T')[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule & Dates</CardTitle>
        <CardDescription>
          Set your preferred schedule and dates for care services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={minDateString}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Minimum 1 week advance notice required
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">End Date (Optional)</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || minDateString}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800"
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Shift Type</h3>
          <div className="space-y-3">
            {shiftTypes.map((shift) => (
              <div
                key={shift.name}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${shiftType === shift.name
                  ? "border-primary bg-primary/5"
                  : "border-muted hover:border-muted-foreground"
                  }`}
                onClick={() => setShiftType(shift.name)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{shift.name}</h4>
                    <p className="text-sm text-muted-foreground">{shift.hours}</p>
                  </div>
                  <span className="text-lg font-semibold">${shift.rate}/hour</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Days of the Week</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {daysOfWeek.map((day) => (
              <Button
                key={day}
                variant={selectedDays.includes(day) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleDay(day)}
                className="h-auto py-3"
              >
                {day.slice(0, 3)}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onPrevious}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={!startDate || !shiftType || selectedDays.length === 0}
          >
            Find Caregivers
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Step 4: Select Caregiver
function SelectCaregiverStep({ onNext, onPrevious }: { onNext: () => void; onPrevious: () => void }) {
  const [selectedCaregiver, setSelectedCaregiver] = useState<string | null>(null);

  const recommendedCaregivers = [
    {
      id: "1",
      name: "Sarah Johnson",
      rating: 4.9,
      reviews: 127,
      experience: "5 years",
      languages: ["English"],
      specialties: ["Elderly Care", "Dementia Care"],
      verified: true,
      available: true,
      hourly_rate: 28,
      image: "/placeholder.svg",
      bio: "Compassionate caregiver with extensive experience in elderly care and dementia support."
    },
    {
      id: "2",
      name: "Maria Garcia",
      rating: 4.8,
      reviews: 89,
      experience: "7 years",
      languages: ["English", "Spanish"],
      specialties: ["Personal Care", "Meal Preparation"],
      verified: true,
      available: true,
      hourly_rate: 26,
      image: "/placeholder.svg",
      bio: "Dedicated caregiver specializing in personal care and bilingual communication."
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Caregivers</CardTitle>
        <CardDescription>
          Based on your requirements, here are our top recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {recommendedCaregivers.map((caregiver) => (
          <div
            key={caregiver.id}
            className={`p-6 border rounded-lg cursor-pointer transition-colors ${selectedCaregiver === caregiver.id
              ? "border-primary bg-primary/5"
              : "border-muted hover:border-muted-foreground"
              }`}
            onClick={() => setSelectedCaregiver(caregiver.id)}
          >
            <div className="flex items-start space-x-4">
              <img
                src={caregiver.image}
                alt={caregiver.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{caregiver.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>⭐ {caregiver.rating} ({caregiver.reviews} reviews)</span>
                      <span>{caregiver.experience} experience</span>
                      {caregiver.verified && <Badge variant="secondary">✓ Verified</Badge>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${caregiver.hourly_rate}/hr</div>
                    {caregiver.available && (
                      <Badge className="bg-green-500/10 text-green-700">Available</Badge>
                    )}
                  </div>
                </div>

                <p className="text-sm mb-3">{caregiver.bio}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-1">Languages</h4>
                    <div className="flex flex-wrap gap-1">
                      {caregiver.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {caregiver.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full">
          View More Caregivers
        </Button>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onPrevious}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button onClick={onNext} disabled={!selectedCaregiver}>
            Review Booking
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Step 5: Confirmation
function ConfirmationStep({ onPrevious }: { onPrevious: () => void }) {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConfirm = () => {
    // Here you would submit the booking, for now, we just open the dialog
    setIsDialogOpen(true);
  };

  const handleGoToDashboard = () => {
    navigate("/client-dashboard");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Booking Confirmation</CardTitle>
          <CardDescription>
            Review your booking details before confirming
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Booking Summary</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Care Recipient:</span>
                <span className="font-medium">Eleanor Doe</span>
              </div>
              <div className="flex justify-between">
                <span>Caregiver:</span>
                <span className="font-medium">Sarah Johnson</span>
              </div>
              <div className="flex justify-between">
                <span>Schedule:</span>
                <span className="font-medium">Day Shift (Mon-Fri)</span>
              </div>
              <div className="flex justify-between">
                <span>Start Date:</span>
                <span className="font-medium">July 20, 2024</span>
              </div>
              <div className="flex justify-between">
                <span>Hourly Rate:</span>
                <span className="font-medium">$28/hour</span>
              </div>
              <div className="flex justify-between">
                <span>Weekly Hours:</span>
                <span className="font-medium">50 hours</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Weekly Total:</span>
                <span>$1,400</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <h4 className="font-semibold mb-2">What happens next?</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Your booking will be confirmed within 24 hours</li>
              <li>• The caregiver will contact you before the start date</li>
              <li>• You can modify or cancel up to 48 hours before start date</li>
              <li>• Payment will be processed after each week of service</li>
            </ul>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onPrevious}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button onClick={handleConfirm} className="bg-green-600 hover:bg-green-700">
              Confirm Booking
            </Button>
          </div>
        </CardContent>
      </Card>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Booking Submitted</AlertDialogTitle>
            <AlertDialogDescription>
              Our caregivers are currently undergoing training in Canada. We will notify you as soon as they are ready to provide service. Thank you for your understanding.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleGoToDashboard}>
              Go to Dashboard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}