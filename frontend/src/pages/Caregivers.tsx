import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CaregiverCard, { CaregiverProps } from "@/components/CaregiverCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

const allCaregivers: CaregiverProps[] = [
  {
    id: "1",
    name: "Adunni Olatunji",
    bio: "Experienced caregiver with specialization in elderly care and chronic illness management. Trained in Canada with 8+ years of experience.",
    hourlyRate: 15,
    rating: 4.9,
    reviewCount: 127,
    location: "Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    specialties: ["Elderly Care", "Chronic Illness", "Mobility Assistance"],
    languages: ["English", "Yoruba", "French"],
    experience: 8,
    availability: "Available"
  },
  {
    id: "2",
    name: "Grace Mensah",
    bio: "Certified nursing assistant with expertise in post-surgery care and rehabilitation. Compassionate and dedicated to patient wellbeing.",
    hourlyRate: 18,
    rating: 4.8,
    reviewCount: 89,
    location: "Accra, Ghana",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face",
    specialties: ["Post-Surgery Care", "Rehabilitation", "Medication Management"],
    languages: ["English", "Twi", "Ga"],
    experience: 6,
    availability: "Available"
  },
  {
    id: "3",
    name: "Fatima Mwangi",
    bio: "Professional caregiver with training in dementia care and mental health support. Brings warmth and patience to every interaction.",
    hourlyRate: 16,
    rating: 4.9,
    reviewCount: 156,
    location: "Nairobi, Kenya",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    specialties: ["Dementia Care", "Mental Health", "Companionship"],
    languages: ["English", "Swahili", "Kikuyu"],
    experience: 7,
    availability: "Available"
  }
];

export default function Caregivers() {
  const { t } = useLanguage();
  const [filteredCaregivers, setFilteredCaregivers] = useState<CaregiverProps[]>(allCaregivers);
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let result = allCaregivers;

    if (locationFilter !== "all") {
      result = result.filter(c => c.location.includes(locationFilter));
    }

    if (specialtyFilter !== "all") {
      result = result.filter(c => c.specialties.includes(specialtyFilter));
    }

    setFilteredCaregivers(result);
  }, [locationFilter, specialtyFilter]);

  const locations = ["all", ...new Set(allCaregivers.map(c => c.location.split(',')[1].trim()))];
  const specialties = ["all", ...new Set(allCaregivers.flatMap(c => c.specialties))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="relative py-20 bg-gradient-to-r from-primary/5 to-white dark:from-primary/10 dark:to-background overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Find the Perfect Caregiver
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                Browse our network of professional, compassionate, and verified caregivers to find the right match for your family's needs.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 border-b">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Location
                </label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.filter(l => l !== 'all').map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Specialty
                </label>
                <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {specialties.filter(s => s !== 'all').map(specialty => (
                      <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            {filteredCaregivers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCaregivers.map((caregiver, index) => (
                  <div key={caregiver.id} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                    <CaregiverCard caregiver={caregiver} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <h3 className="text-xl font-semibold mb-2">No Caregivers Found</h3>
                <p className="text-muted-foreground mb-6">
                  Please adjust your filters or check back later.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setLocationFilter("all");
                    setSpecialtyFilter("all");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
