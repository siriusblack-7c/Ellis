import axios from '@/lib/axios';
import { CareRecipient } from '@/types/recipient';

export const getRecipients = async (): Promise<CareRecipient[]> => {
    const response = await axios.get('/recipients');
    return response.data;
};

export const createRecipient = async (formData: FormData): Promise<CareRecipient> => {
    const response = await axios.post('/recipients', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getRecipientById = async (id: string): Promise<CareRecipient> => {
    const response = await axios.get(`/recipients/${id}`);
    return response.data;
};

export const updateRecipient = async (id: string, formData: FormData): Promise<CareRecipient> => {
    const response = await axios.put(`/recipients/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteRecipient = async (id: string): Promise<void> => {
    await axios.delete(`/recipients/${id}`);
}; 