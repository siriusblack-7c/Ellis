export type ApplicationStage =
    | 'application'
    | 'interview'
    | 'training'
    | 'internship'
    | 'hired'
    | 'rejected'
    | 'approved';

export type StageStatus = 'not_submitted' | 'pending_review' | 'rejected' | 'approved';

export interface CaregiverApplication {
    _id: string;
    userId: string;
    currentStage: ApplicationStage;
    stageStatus: StageStatus;
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
    trainingAgreementAccepted?: boolean;
    internshipSelection?: string;
    careerPathSelection?: string;
} 