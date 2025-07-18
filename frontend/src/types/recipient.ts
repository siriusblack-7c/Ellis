import { User } from './user';

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

export interface CareRecipient {
    _id: string;
    clientId: User;
    name: string;
    age: number;
    careNeeds: CareNeed[];
    location: string;
    specialRequirements?: string;
    medicalConditions?: string[];
    mobilityLevel?: string;
    preferredLanguage?: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}