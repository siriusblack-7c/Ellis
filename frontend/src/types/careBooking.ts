export interface CareBooking {
    _id: string;
    clientId: string;
    careRecipientId: string;
    caregiverId?: string;
    startDate: string;
    endDate?: string;
    scheduleDetails: any;
    hourlyRate?: number;
    totalHours?: number;
    specialInstructions?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
} 