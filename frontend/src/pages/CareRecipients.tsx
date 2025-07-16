import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Phone, MapPin, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRecipients } from "@/hooks/useRecipients";
import { CareRecipient } from "@/types/recipient";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const initialFormData = {
  name: "",
  age: 0,
  location: "",
  careNeeds: [],
  emergencyContactName: "",
  emergencyContactPhone: "",
  specialRequirements: "",
  medicalConditions: [],
  mobilityLevel: "",
  preferredLanguage: "",
  avatar: "",
  avatarFile: null as File | null,
};

export default function CareRecipients() {
  const navigate = useNavigate();
  const {
    recipients,
    loading,
    fetchRecipients,
    addRecipient,
    updateRecipient,
    removeRecipient,
  } = useRecipients();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [selectedRecipient, setSelectedRecipient] = useState<CareRecipient | null>(null);
  const [formData, setFormData] = useState<any>(initialFormData);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    fetchRecipients();
  }, []);

  const handleAddClick = () => {
    setDialogMode("add");
    setSelectedRecipient(null);
    setFormData(initialFormData);
    setAvatarPreview(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (recipient: CareRecipient) => {
    setDialogMode("edit");
    setSelectedRecipient(recipient);
    setFormData({
      name: recipient.name,
      age: recipient.age,
      location: recipient.location,
      careNeeds: recipient.careNeeds,
      specialRequirements: recipient.specialRequirements || "",
      medicalConditions: recipient.medicalConditions || [],
      mobilityLevel: recipient.mobilityLevel || "",
      preferredLanguage: recipient.preferredLanguage || "",
      avatar: recipient.avatar || "",
      avatarFile: null,
    });
    setAvatarPreview(recipient.avatar ? `${import.meta.env.VITE_API_BASE_URL}/${recipient.avatar}` : null);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    const dataToSave: any = {
      name: formData.name,
      age: formData.age,
      location: formData.location,
      careNeeds: formData.careNeeds,
      emergencyContactName: formData.emergencyContactName,
      emergencyContactPhone: formData.emergencyContactPhone,
      specialRequirements: formData.specialRequirements,
      medicalConditions: Array.isArray(formData.medicalConditions)
        ? formData.medicalConditions
        : formData.medicalConditions.split(',').map((s: string) => s.trim()).filter(Boolean),
      mobilityLevel: formData.mobilityLevel,
      preferredLanguage: formData.preferredLanguage,
    };

    if (formData.avatarFile) {
      dataToSave.avatar = formData.avatarFile;
    }

    if (dialogMode === "add") {
      await addRecipient(dataToSave);
    } else if (selectedRecipient) {
      await updateRecipient(selectedRecipient._id, dataToSave);
    }
    setIsDialogOpen(false);
    setAvatarPreview(null);
    fetchRecipients();
  };

  const handleDelete = async (id: string) => {
    await removeRecipient(id);
    fetchRecipients();
  };

  const handleBookCare = (recipient: CareRecipient) => {
    navigate("/book-care", { state: { selectedRecipient: recipient } });
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
            <Button onClick={handleAddClick}>
              <Plus className="w-4 h-4 mr-2" />
              Add Care Recipient
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[100px]" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[200px]" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : recipients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipients.map((recipient) => (
                <Card key={recipient._id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16 border-2 border-primary">
                        {recipient.avatar && <AvatarImage src={`${import.meta.env.VITE_API_BASE_URL}/${recipient.avatar}`} alt={recipient.name} />}
                        <AvatarFallback className="text-2xl bg-muted">
                          {recipient.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{recipient.name}</CardTitle>
                        <CardDescription>{recipient.age} years old</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <div className="flex items-start space-x-2 text-muted-foreground">
                      <MapPin className="w-5 h-5 mt-1" />
                      <span>{recipient.location}</span>
                    </div>
                    <div className="flex items-start space-x-2 text-muted-foreground">
                      <Heart className="w-5 h-5 mt-1" />
                      <div>
                        <p className="font-semibold text-foreground">Care Needs:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {recipient.careNeeds.map((need) => (
                            <Badge key={need} variant="secondary" className="capitalize">
                              {need.replace(/([A-Z])/g, ' $1').trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <div className="p-6 pt-0 flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleBookCare(recipient)}
                      className="flex-1"
                    >
                      Book Care
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(recipient)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the care recipient's profile.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(recipient._id)}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h2 className="text-2xl font-semibold">No Care Recipients Found</h2>
              <p className="text-muted-foreground mt-2">
                Get started by adding a new care recipient.
              </p>
              <Button className="mt-6" onClick={handleAddClick}>
                <Plus className="w-4 h-4 mr-2" />
                Add Care Recipient
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{dialogMode === 'add' ? 'Add Care Recipient' : 'Edit Care Recipient'}</DialogTitle>
            <DialogDescription>
              {dialogMode === 'add' ? "Fill in the details of the new care recipient." : "Update the details of the care recipient."}
            </DialogDescription>
          </DialogHeader>
          <RecipientForm formData={formData} setFormData={setFormData} avatarPreview={avatarPreview} setAvatarPreview={setAvatarPreview} />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const CARE_NEEDS = [
  'personalCare', 'companionship', 'mealPreparation', 'medicationManagement', 'mobilityAssistance',
  'dementiaCare', 'postSurgeryCare', 'chronicConditionCare', 'lightHousekeeping', 'transportation', 'medicalAppointments'
];

function RecipientForm({ formData, setFormData, avatarPreview, setAvatarPreview }: {
  formData: any;
  setFormData: (data: any) => void;
  avatarPreview: string | null;
  setAvatarPreview: (preview: string | null) => void;
}) {
  const toggleCareNeed = (need: string) => {
    const currentNeeds = formData.careNeeds || [];
    const newNeeds = currentNeeds.includes(need)
      ? currentNeeds.filter((n: string) => n !== need)
      : [...currentNeeds, need];
    setFormData({ ...formData, careNeeds: newNeeds });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, age: parseInt(e.target.value, 10) || 0 });
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, avatarFile: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="avatar" className="text-right">Avatar</Label>
        <div className="col-span-3 flex items-center gap-4">
          <Avatar className="w-16 h-16">
            {avatarPreview && <AvatarImage src={avatarPreview} />}
            <AvatarFallback>{formData.name?.charAt(0) || '?'}</AvatarFallback>
          </Avatar>
          <Input id="avatar" type="file" className="col-span-2" onChange={handleAvatarChange} />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">Name</Label>
        <Input id="name" value={formData.name} onChange={handleInputChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="age" className="text-right">Age</Label>
        <Input id="age" type="number" value={formData.age} onChange={handleAgeChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="location" className="text-right">Location</Label>
        <Input id="location" value={formData.location} onChange={handleInputChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right">Care Needs</Label>
        <div className="col-span-3">
          <div className="grid grid-cols-2 gap-2">
            {CARE_NEEDS.map(need => (
              <div key={need} className="flex items-center space-x-2">
                <Checkbox
                  id={`need-${need}`}
                  checked={formData.careNeeds.includes(need)}
                  onCheckedChange={() => toggleCareNeed(need)}
                />
                <label htmlFor={`need-${need}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize">
                  {need.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="medicalConditions" className="text-right">Medical Conditions</Label>
        <Textarea id="medicalConditions" value={Array.isArray(formData.medicalConditions) ? formData.medicalConditions.join(', ') : formData.medicalConditions} onChange={handleInputChange} className="col-span-3" placeholder="Comma-separated conditions" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="emergencyContactName" className="text-right">Emergency Contact</Label>
        <Input id="emergencyContactName" value={formData.emergencyContactName} onChange={handleInputChange} className="col-span-3" placeholder="Name" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="emergencyContactPhone" className="text-right"></Label>
        <Input id="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleInputChange} className="col-span-3" placeholder="Phone" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="mobilityLevel" className="text-right">Mobility Level</Label>
        <Input id="mobilityLevel" value={formData.mobilityLevel} onChange={handleInputChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="preferredLanguage" className="text-right">Preferred Language</Label>
        <Input id="preferredLanguage" value={formData.preferredLanguage} onChange={handleInputChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="specialRequirements" className="text-right">Special Requirements</Label>
        <Textarea id="specialRequirements" value={formData.specialRequirements} onChange={handleInputChange} className="col-span-3" />
      </div>
    </div>
  );
}