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
    user_id: mongoose.Types.ObjectId;
    status: ApplicationStatus;
    years_experience: number;
    preferred_work_location: string;
    specialties?: string[];
    certifications?: string[];
    cv_url?: string;
    cover_letter_url?: string;
    certification_files_urls?: string[];
    video_interview_url?: string;
    admin_notes?: string;
}

const CaregiverApplicationSchema: Schema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
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
        years_experience: {
            type: Number,
            required: true,
        },
        preferred_work_location: {
            type: String,
            required: true,
        },
        specialties: {
            type: [String],
        },
        certifications: {
            type: [String],
        },
        cv_url: {
            type: String,
        },
        cover_letter_url: {
            type: String,
        },
        certification_files_urls: {
            type: [String],
        },
        video_interview_url: {
            type: String,
        },
        admin_notes: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const CaregiverApplication = mongoose.model<ICaregiverApplication>('CaregiverApplication', CaregiverApplicationSchema);

export default CaregiverApplication; 