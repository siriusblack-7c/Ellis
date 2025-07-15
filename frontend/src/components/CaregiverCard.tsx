import { Link } from "react-router-dom";
import { Star, MapPin, Briefcase, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface CaregiverProps {
  id: string;
  name: string;
  bio: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
  specialties: string[];
  languages: string[];
  experience: number;
  availability: string;
}

export default function CaregiverCard({ caregiver }: { caregiver: CaregiverProps }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      <Link to={`/caregivers/${caregiver.id}`}>
        <img src={caregiver.image} alt={caregiver.name} className="w-full h-56 object-cover" />
      </Link>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">{caregiver.name}</h3>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 mr-1" />
            <span className="font-bold">{caregiver.rating}</span>
            <span className="text-sm text-gray-500 ml-1">({caregiver.reviewCount})</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          {caregiver.location}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 h-20 overflow-hidden">{caregiver.bio}</p>
        <div className="mb-4">
          <h4 className="font-semibold text-sm mb-2">Specialties</h4>
          <div className="flex flex-wrap gap-2">
            {caregiver.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary">{specialty}</Badge>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold text-primary">${caregiver.hourlyRate}/hr</div>
          <Button asChild>
            <Link to={`/caregivers/${caregiver.id}`}>View Profile</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}