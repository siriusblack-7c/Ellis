import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Phone, MapPin, Heart, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface CareRecipient {
  id: string;
  name: string;
  age: number;
  location: string;
  care_needs: string[];
  medical_conditions: string[];
  emergency_contact_name: string;
  emergency_contact_phone: string;
  special_requirements?: string;
  profile_image?: string;
  mobility_level: string;
  preferred_language: string;
  created_at: string;
}

const mockCareRecipients: CareRecipient[] = [
  {
    id: "1",
    name: "Eleanor Doe",
    age: 82,
    location: "New York, NY",
    care_needs: ["Personal Care", "Medication Management", "Companionship"],
    medical_conditions: ["Diabetes", "Mild Dementia"],
    emergency_contact_name: "John Doe",
    emergency_contact_phone: "+1234567890",
    special_requirements: "Prefers female caregivers, needs help with evening medications",
    profile_image: "/placeholder.svg",
    mobility_level: "Limited - Wheelchair",
    preferred_language: "English",
    created_at: "2024-01-15"
  },
  {
    id: "2",
    name: "Robert Johnson",
    age: 75,
    location: "New York, NY",
    care_needs: ["Meal Preparation", "Light Housekeeping", "Transportation"],
    medical_conditions: ["Heart Condition", "Arthritis"],
    emergency_contact_name: "Mary Johnson",
    emergency_contact_phone: "+1234567891",
    special_requirements: "Needs low-sodium diet, enjoys crossword puzzles",
    profile_image: "/placeholder.svg",
    mobility_level: "Good - Uses Walker",
    preferred_language: "English",
    created_at: "2024-02-20"
  }
];

const careNeedsOptions = [
  "Personal Care",
  "Companionship", 
  "Meal Preparation",
  "Medication Management",
  "Mobility Assistance",
  "Dementia Care",
  "Post-Surgery Care",
  "Chronic Condition Care",
  "Light Housekeeping",
  "Transportation",
  "Medical Appointments"
];

export default function CareRecipients() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recipients, setRecipients] = useState<CareRecipient[]>(mockCareRecipients);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<CareRecipient | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    care_needs: [] as string[],
    medical_conditions: "",
    mobility_level: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    special_requirements: ""
  });

  const handleDelete = (id: string) => {
    setRecipients(recipients.filter(r => r.id !== id));
    toast({
      title: "Care recipient deleted",
      description: "The care recipient has been successfully removed.",
    });
  };

  const handleEdit = (recipient: CareRecipient) => {
    setSelectedRecipient(recipient);
    setFormData({
      name: recipient.name,
      age: recipient.age.toString(),
      location: recipient.location,
      care_needs: recipient.care_needs,
      medical_conditions: recipient.medical_conditions.join(", "),
      mobility_level: recipient.mobility_level,
      emergency_contact_name: recipient.emergency_contact_name,
      emergency_contact_phone: recipient.emergency_contact_phone,
      special_requirements: recipient.special_requirements || ""
    });
    setIsEditDialogOpen(true);
  };

  const handleBookCare = (recipient: CareRecipient) => {
    navigate("/book-care", { state: { selectedRecipient: recipient } });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      location: "",
      care_needs: [],
      medical_conditions: "",
      mobility_level: "",
      emergency_contact_name: "",
      emergency_contact_phone: "",
      special_requirements: ""
    });
  };

  const handleSaveRecipient = () => {
    if (!formData.name || !formData.age || !formData.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newRecipient: CareRecipient = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      age: parseInt(formData.age),
      location: formData.location,
      care_needs: formData.care_needs,
      medical_conditions: formData.medical_conditions.split(",").map(c => c.trim()).filter(Boolean),
      emergency_contact_name: formData.emergency_contact_name,
      emergency_contact_phone: formData.emergency_contact_phone,
      special_requirements: formData.special_requirements,
      profile_image: "/placeholder.svg",
      mobility_level: formData.mobility_level,
      preferred_language: "English",
      created_at: new Date().toISOString().split('T')[0]
    };

    setRecipients([...recipients, newRecipient]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Care recipient added",
      description: "New care recipient has been successfully added.",
    });
  };

  const handleUpdateRecipient = () => {
    if (!selectedRecipient || !formData.name || !formData.age || !formData.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const updatedRecipient: CareRecipient = {
      ...selectedRecipient,
      name: formData.name,
      age: parseInt(formData.age),
      location: formData.location,
      care_needs: formData.care_needs,
      medical_conditions: formData.medical_conditions.split(",").map(c => c.trim()).filter(Boolean),
      emergency_contact_name: formData.emergency_contact_name,
      emergency_contact_phone: formData.emergency_contact_phone,
      special_requirements: formData.special_requirements,
      mobility_level: formData.mobility_level
    };

    setRecipients(recipients.map(r => r.id === selectedRecipient.id ? updatedRecipient : r));
    setIsEditDialogOpen(false);
    setSelectedRecipient(null);
    resetForm();
    toast({
      title: "Care recipient updated",
      description: "Care recipient information has been successfully updated.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Care Recipients</h1>
              <p className="text-lg text-muted-foreground">
                Manage profiles for people receiving care
              </p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Care Recipient
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Care Recipient</DialogTitle>
                  <DialogDescription>
                    Add details for someone who will receive care services
                  </DialogDescription>
                </DialogHeader>
                <RecipientForm
                  formData={formData}
                  setFormData={setFormData}
                  careNeedsOptions={careNeedsOptions}
                />
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => {
                    setIsAddDialogOpen(false);
                    resetForm();
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveRecipient}>
                    Add Recipient
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Care Recipient</DialogTitle>
                  <DialogDescription>
                    Update details for {selectedRecipient?.name}
                  </DialogDescription>
                </DialogHeader>
                <RecipientForm
                  formData={formData}
                  setFormData={setFormData}
                  careNeedsOptions={careNeedsOptions}
                />
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => {
                    setIsEditDialogOpen(false);
                    setSelectedRecipient(null);
                    resetForm();
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateRecipient}>
                    Update Recipient
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {recipients.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Care Recipients Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Add your first care recipient to start booking care services
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Care Recipient
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {recipients.map((recipient) => (
                <Card key={recipient.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={recipient.profile_image} alt={recipient.name} />
                          <AvatarFallback className="text-lg">
                            {recipient.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-xl">{recipient.name}</CardTitle>
                          <CardDescription className="flex items-center space-x-4 mt-1">
                            <span>Age {recipient.age}</span>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {recipient.location}
                            </div>
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(recipient)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDelete(recipient.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Care Needs</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {recipient.care_needs.map((need) => (
                            <Badge key={need} variant="secondary">
                              {need}
                            </Badge>
                          ))}
                        </div>

                        <h4 className="font-semibold mb-2">Medical Conditions</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {recipient.medical_conditions.map((condition) => (
                            <Badge key={condition} variant="outline">
                              {condition}
                            </Badge>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 mr-2" />
                            Mobility: {recipient.mobility_level}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span className="w-4 h-4 mr-2 flex items-center justify-center text-xs">🗣️</span>
                            Language: {recipient.preferred_language}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Emergency Contact</h4>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <span className="font-medium">{recipient.emergency_contact_name}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Phone className="w-4 h-4 mr-2" />
                            {recipient.emergency_contact_phone}
                          </div>
                        </div>

                        {recipient.special_requirements && (
                          <>
                            <h4 className="font-semibold mb-2">Special Requirements</h4>
                            <p className="text-sm text-muted-foreground">
                              {recipient.special_requirements}
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-4 border-t">
                      <div className="text-sm text-muted-foreground">
                        Added on {new Date(recipient.created_at).toLocaleDateString()}
                      </div>
                      <Button onClick={() => handleBookCare(recipient)}>
                        Book Care for {recipient.name.split(' ')[0]}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Reusable form component for add/edit
function RecipientForm({ formData, setFormData, careNeedsOptions }: {
  formData: any;
  setFormData: (data: any) => void;
  careNeedsOptions: string[];
}) {
  const toggleCareNeed = (need: string) => {
    setFormData((prev: any) => ({
      ...prev,
      care_needs: prev.care_needs.includes(need)
        ? prev.care_needs.filter((n: string) => n !== need)
        : [...prev.care_needs, need]
    }));
  };

  return (
    <div className="grid gap-6 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input 
            id="age" 
            type="number" 
            placeholder="Enter age"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="location">Location</Label>
        <Input 
          id="location" 
          placeholder="City, State"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
        />
      </div>

      <div>
        <Label>Care Needs</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {careNeedsOptions.map((need) => (
            <div key={need} className="flex items-center space-x-2">
              <Checkbox 
                id={need}
                checked={formData.care_needs.includes(need)}
                onCheckedChange={() => toggleCareNeed(need)}
              />
              <Label htmlFor={need} className="text-sm">{need}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="medical-conditions">Medical Conditions</Label>
        <Textarea 
          id="medical-conditions" 
          placeholder="List any medical conditions..."
          value={formData.medical_conditions}
          onChange={(e) => setFormData({...formData, medical_conditions: e.target.value})}
        />
      </div>

      <div>
        <Label htmlFor="mobility">Mobility Level</Label>
        <Select 
          value={formData.mobility_level}
          onValueChange={(value) => setFormData({...formData, mobility_level: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select mobility level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Excellent - Fully Independent">Excellent - Fully Independent</SelectItem>
            <SelectItem value="Good - Uses Walker/Cane">Good - Uses Walker/Cane</SelectItem>
            <SelectItem value="Limited - Wheelchair">Limited - Wheelchair</SelectItem>
            <SelectItem value="Bed-bound">Bed-bound</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="emergency-name">Emergency Contact Name</Label>
          <Input 
            id="emergency-name" 
            placeholder="Contact name"
            value={formData.emergency_contact_name}
            onChange={(e) => setFormData({...formData, emergency_contact_name: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="emergency-phone">Emergency Contact Phone</Label>
          <Input 
            id="emergency-phone" 
            placeholder="Phone number"
            value={formData.emergency_contact_phone}
            onChange={(e) => setFormData({...formData, emergency_contact_phone: e.target.value})}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="special-requirements">Special Requirements</Label>
        <Textarea 
          id="special-requirements" 
          placeholder="Any special requirements or preferences..."
          value={formData.special_requirements}
          onChange={(e) => setFormData({...formData, special_requirements: e.target.value})}
        />
      </div>
    </div>
  );
}