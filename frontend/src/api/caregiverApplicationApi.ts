import axios from "@/lib/axios";
import { CaregiverApplication } from "@/types/caregiverApplication";

export const createCaregiverApplication = async (applicationData: FormData): Promise<CaregiverApplication> => {
    const response = await axios.post('/applications', applicationData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateCaregiverApplication = async (id: string, data: Partial<CaregiverApplication>) => {
    const response = await axios.put(`/applications/${id}`, data);
    return response.data;
};

export const getMyApplication = async (): Promise<CaregiverApplication | null> => {
    try {
        const response = await axios.get('/applications/my-application');
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        throw error;
    }
}; 