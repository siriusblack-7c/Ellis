import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { createCaregiverApplication } from "@/api/caregiverApplicationApi";

const countries = [
  "Argentina", "Bangladesh", "Brazil", "Colombia", "Dominican Republic",
  "Ethiopia", "Ghana", "Guyana", "India", "Jamaica", "Kenya", "Nigeria",
  "Pakistan", "Philippine", "Rwanda", "Tanzania", "Turkey", "Uganda",
  "Venezuela", "Zambia", "Zimbabwe"
];

export default function ApplicationStep1() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    country: "",
    firstName: "",
    lastName: "",
    address1: "",
    city: "",
    state: "",
    email: "",
    phone: "",
    preferredLocation: "",
    weekends: "",
    nights: "",
    coverLetter: "",
    resume: null as File | null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user && user.role === 'caregiver') {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
      }));
    } else if (!user) {
      navigate('/auth');
    } else {
      navigate('/');
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: (data: FormData) => createCaregiverApplication(data),
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Your application has been received. We'll review it and contact you soon.",
      });
      navigate('/caregiver-dashboard');
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields: (keyof Omit<typeof formData, 'cv' | 'phone'>)[] = [
      "country", "firstName", "lastName", "address1", "city", "state",
      "email", "preferredLocation", "weekends", "nights", "coverLetter"
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast({
          title: "Missing Information",
          description: `Please fill in the ${field.replace(/([A-Z])/g, ' $1')} field.`,
          variant: "destructive",
        });
        return;
      }
    }

    if (!formData.resume) {
      toast({
        title: "Missing Resume",
        description: "Please upload your resume.",
        variant: "destructive",
      });
      return;
    }

    const applicationData = new FormData();
    applicationData.append('preferredWorkLocation', formData.preferredLocation);
    applicationData.append('coverLetter', formData.coverLetter);
    applicationData.append('availability[weekends]', formData.weekends);
    applicationData.append('availability[nights]', formData.nights);
    applicationData.append('resume', formData.resume);

    // Append other user-related data if needed by the backend
    applicationData.append('country', formData.country);
    applicationData.append('firstName', formData.firstName);
    applicationData.append('lastName', formData.lastName);
    applicationData.append('address1', formData.address1);
    applicationData.append('city', formData.city);
    applicationData.append('state', formData.state);
    applicationData.append('email', formData.email);
    applicationData.append('phone', formData.phone);

    mutation.mutate(applicationData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 mt-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Apply for a Caregiver Position</CardTitle>
              <CardDescription>Please fill out the application form below.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="country">Which Country are you applying for?</Label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full p-3 border border-input rounded-md bg-background"
                    required
                  >
                    <option value="" disabled>Select a country</option>
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address1">Address Line 1</Label>
                  <Input id="address1" value={formData.address1} onChange={(e) => handleInputChange('address1', e.target.value)} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City/Town</Label>
                    <Input id="city" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" value={formData.state} onChange={(e) => handleInputChange('state', e.target.value)} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredLocation">Preferred work location (City/Town)</Label>
                  <Input id="preferredLocation" value={formData.preferredLocation} onChange={(e) => handleInputChange('preferredLocation', e.target.value)} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weekends">Are you available to work on weekends?</Label>
                    <select id="weekends" value={formData.weekends} onChange={(e) => handleInputChange('weekends', e.target.value)} className="w-full p-3 border border-input rounded-md bg-background" required>
                      <option value="" disabled>Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nights">Are you available to work night shifts?</Label>
                    <select id="nights" value={formData.nights} onChange={(e) => handleInputChange('nights', e.target.value)} className="w-full p-3 border border-input rounded-md bg-background" required>
                      <option value="" disabled>Select an option</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    value={formData.coverLetter}
                    onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                    placeholder="Tell us why you want to become a caregiver..."
                    className="min-h-32"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Upload Resume</Label>
                  <Label htmlFor="resume" className="w-full">
                    <div className="border-2 border-dashed border-input rounded-lg p-6 text-center cursor-pointer">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (max 5MB)</p>
                      <Input
                        type="file"
                        className="hidden"
                        id="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                      />
                    </div>
                  </Label>
                  {formData.resume && <p className="text-sm text-muted-foreground mt-2">Selected file: {formData.resume.name}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={mutation.isPending}>
                  {mutation.isPending ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}