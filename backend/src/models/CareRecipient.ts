import mongoose, { Schema, Document } from 'mongoose';

export type CareNeed =
    | 'personal_care'
    | 'companionship'
    | 'meal_preparation'
    | 'medication_management'
    | 'mobility_assistance'
    | 'dementia_care'
    | 'post_surgery_care'
    | 'chronic_condition_care';

export interface ICareRecipient extends Document {
    client_id: mongoose.Types.ObjectId;
    name: string;
    age: number;
    care_needs: CareNeed[];
    location: string;
    special_requirements?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
}

const CareRecipientSchema: Schema = new Schema(
    {
        client_id: {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        care_needs: {
            type: [String],
            enum: [
                'personal_care', 'companionship', 'meal_preparation',
                'medication_management', 'mobility_assistance', 'dementia_care',
                'post_surgery_care', 'chronic_condition_care'
            ],
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        special_requirements: {
            type: String,
        },
        emergency_contact_name: {
            type: String,
        },
        emergency_contact_phone: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const CareRecipient = mongoose.model<ICareRecipient>('CareRecipient', CareRecipientSchema);

export default CareRecipient; 