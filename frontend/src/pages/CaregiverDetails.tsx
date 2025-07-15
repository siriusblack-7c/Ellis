import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, MapPin, Briefcase, Languages, ShieldCheck, FileText, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CaregiverProps } from "@/components/CaregiverCard";

const allCaregivers: CaregiverProps[] = [
  {
    id: "1",
    name: "Adunni Olatunji",
    bio: "Experienced caregiver with specialization in elderly care and chronic illness management. Trained in Canada with 8+ years of experience. Adunni is known for her patience, warmth, and ability to connect with clients on a personal level. She is passionate about creating a safe and nurturing environment for those she cares for.",
    hourlyRate: 15,
    rating: 4.9,
    reviewCount: 127,
    location: "Lagos, Nigeria",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    specialties: ["Elderly Care", "Chronic Illness", "Mobility Assistance", "Palliative Care"],
    languages: ["English", "Yoruba", "French"],
    experience: 8,
    availability: "Available"
  },
  {
    id: "2",
    name: "Grace Mensah",
    bio: "Certified nursing assistant with expertise in post-surgery care and rehabilitation. Compassionate and dedicated to patient wellbeing. Grace is a highly skilled professional who is committed to helping her clients regain their independence and quality of life.",
    hourlyRate: 18,
    rating: 4.8,
    reviewCount: 89,
    location: "Accra, Ghana",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face",
    specialties: ["Post-Surgery Care", "Rehabilitation", "Medication Management", "Wound Care"],
    languages: ["English", "Twi", "Ga"],
    experience: 6,
    availability: "Available"
  },
  {
    id: "3",
    name: "Fatima Mwangi",
    bio: "Professional caregiver with training in dementia care and mental health support. Brings warmth and patience to every interaction. Fatima is dedicated to providing a supportive and stimulating environment for clients with cognitive challenges.",
    hourlyRate: 16,
    rating: 4.9,
    reviewCount: 156,
    location: "Nairobi, Kenya",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    specialties: ["Dementia Care", "Mental Health", "Companionship", "Behavioral Support"],
    languages: ["English", "Swahili", "Kikuyu"],
    experience: 7,
    availability: "Available"
  }
];

export default function CaregiverDetails() {
  const { id } = useParams<{ id: string }>();
  const [caregiver, setCaregiver] = useState<CaregiverProps | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundCaregiver = allCaregivers.find(c => c.id === id);
    setCaregiver(foundCaregiver || null);
  }, [id]);

  if (!caregiver) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-1">
                <img src={caregiver.image} alt={caregiver.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                <div className="mt-6">
                  <Button className="w-full btn-primary">Book {caregiver.name}</Button>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-4xl font-bold">{caregiver.name}</h1>
                  <div className="flex items-center">
                    <Star className="h-6 w-6 text-yellow-400 mr-1" />
                    <span className="text-2xl font-bold">{caregiver.rating}</span>
                    <span className="text-lg text-gray-500 ml-1">({caregiver.reviewCount} reviews)</span>
                  </div>
                </div>
                <div className="flex items-center text-lg text-gray-500 mb-6">
                  <MapPin className="h-5 w-5 mr-2" />
                  {caregiver.location}
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{caregiver.bio}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {caregiver.specialties.map(specialty => (
                        <Badge key={specialty} variant="secondary" className="text-lg">{specialty}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {caregiver.languages.map(language => (
                        <Badge key={language} variant="outline" className="text-lg">{language}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">Experience</h3>
                  <div className="flex items-center text-lg">
                    <Briefcase className="h-6 w-6 mr-2" />
                    {caregiver.experience} years of professional experience
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Verifications</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-lg">
                      <ShieldCheck className="h-6 w-6 text-green-500 mr-2" />
                      Background Check Verified
                    </li>
                    <li className="flex items-center text-lg">
                      <FileText className="h-6 w-6 text-green-500 mr-2" />
                      Training Certificates Verified
                    </li>
                    <li className="flex items-center text-lg">
                      <UserCheck className="h-6 w-6 text-green-500 mr-2" />
                      Guarantor Verified
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}