import mongoose, { Schema, Document } from 'mongoose';

export type CareNeed =
    | 'personalCare'
    | 'companionship'
    | 'mealPreparation'
    | 'medicationManagement'
    | 'mobilityAssistance'
    | 'dementiaCare'
    | 'postSurgeryCare'
    | 'chronicConditionCare'
    | 'lightHousekeeping'
    | 'transportation'
    | 'medicalAppointments';

export interface ICareRecipient extends Document {
    clientId: mongoose.Types.ObjectId;
    name: string;
    age: number;
    location: string;
    careNeeds: CareNeed[];
    medicalConditions: string[];
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    specialRequirements?: string;
    avatar?: string;
    mobilityLevel?: string;
    preferredLanguage?: string;
    allergies: string[];
    carePlan: string;
}

const CareRecipientSchema: Schema = new Schema(
    {
        clientId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
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
        location: {
            type: String,
            required: true,
        },
        careNeeds: {
            type: [String],
            enum: [
                'personalCare', 'companionship', 'mealPreparation',
                'medicationManagement', 'mobilityAssistance', 'dementiaCare',
                'postSurgeryCare', 'chronicConditionCare', 'lightHousekeeping',
                'transportation', 'medicalAppointments'
            ],
        },
        medicalConditions: {
            type: [String],
        },
        emergencyContactName: {
            type: String,
        },
        emergencyContactPhone: {
            type: String,
        },
        specialRequirements: {
            type: String,
        },
        avatar: {
            type: String,
        },
        mobilityLevel: {
            type: String,
        },
        preferredLanguage: {
            type: String,
        },
        allergies: {
            type: [String],
        },
        carePlan: {
            type: String
        },
    },
    {
        timestamps: true,
    }
);

const CareRecipient = mongoose.model<ICareRecipient>('CareRecipient', CareRecipientSchema);

export default CareRecipient; 