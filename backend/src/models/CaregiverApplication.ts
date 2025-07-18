import mongoose, { Schema, Document } from 'mongoose';

export type ApplicationStage =
    | 'application'
    | 'interview'
    | 'training'
    | 'internship'
    | 'hired'
    | 'rejected'
    | 'approved';

export type StageStatus = 'not_submitted' | 'pending_review' | 'rejected' | 'approved';

export interface ICaregiverApplication extends Document {
    userId: mongoose.Types.ObjectId;
    currentStage: ApplicationStage;
    stageStatus: StageStatus;
    yearsExperience: number;
    preferredWorkLocation: string;
    availability: {
        weekends: boolean;
        nights: boolean;
    };
    specialties?: string[];
    certifications?: string[];
    resume?: string;
    coverLetter?: string;
    certificationFilesUrls?: string[];
    videoInterviewUrl?: string;
    adminNotes?: string;
    trainingAgreementAccepted?: boolean;
    internshipSelection?: string;
    careerPathSelection?: string;
}

const CaregiverApplicationSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        currentStage: {
            type: String,
            enum: [
                'application', 'interview', 'training',
                'internship', 'hired', 'rejected', 'approved'
            ],
            required: true,
            default: 'application',
        },
        stageStatus: {
            type: String,
            enum: ['not_submitted', 'pending_review', 'rejected', 'approved'],
            required: true,
            default: 'not_submitted',
        },
        availability: {
            weekends: { type: Boolean, default: false },
            nights: { type: Boolean, default: false },
        },
        yearsExperience: {
            type: Number,
            required: false,
        },
        preferredWorkLocation: {
            type: String,
            required: true,
        },
        specialties: {
            type: [String],
        },
        certifications: {
            type: [String],
        },
        resume: {
            type: String,
        },
        coverLetter: {
            type: String,
        },
        certificationFilesUrls: {
            type: [String],
        },
        videoInterviewUrl: {
            type: String,
        },
        adminNotes: {
            type: String,
        },
        trainingAgreementAccepted: {
            type: Boolean,
            default: false,
        },
        internshipSelection: {
            type: String,
        },
        careerPathSelection: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const CaregiverApplication = mongoose.model<ICaregiverApplication>('CaregiverApplication', CaregiverApplicationSchema);

export default CaregiverApplication; 