export type ApplicationStatus =
    | 'pending'
    | 'under_review'
    | 'interview'
    | 'training'
    | 'internship'
    | 'hired'
    | 'rejected';

export interface CaregiverApplication {
    _id: string;
    userId: string;
    status: ApplicationStatus;
    applicationStep: number;
    yearsExperience?: number;
    preferredWorkLocation: string;
    availability: {
        weekends: boolean;
        nights: boolean;
    };
    specialties?: string[];
    certifications?: string[];
    cvUrl?: string;
    coverLetter?: string;
    certificationFilesUrls?: string[];
    videoInterviewUrl?: string;
    adminNotes?: string;
    createdAt: string;
    updatedAt: string;
} 