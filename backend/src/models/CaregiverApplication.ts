import mongoose, { Schema, Document } from 'mongoose';

export type ApplicationStatus =
    | 'pending'
    | 'under_review'
    | 'interview'
    | 'training'
    | 'internship'
    | 'hired'
    | 'rejected';

export interface ICaregiverApplication extends Document {
    userId: mongoose.Types.ObjectId;
    status: ApplicationStatus;
    applicationStep: number;
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
}

const CaregiverApplicationSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: [
                'pending', 'under_review', 'interview', 'training',
                'internship', 'hired', 'rejected'
            ],
            required: true,
            default: 'pending',
        },
        applicationStep: {
            type: Number,
            default: 1,
        },
        availability: {
            weekends: { type: Boolean, default: false },
            nights: { type: Boolean, default: false },
        },
        yearsExperience: {
            type: Number,
            required: false, // Changed to false, as it's not in step 1
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
    },
    {
        timestamps: true,
    }
);

const CaregiverApplication = mongoose.model<ICaregiverApplication>('CaregiverApplication', CaregiverApplicationSchema);

export default CaregiverApplication; 