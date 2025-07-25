import axios from '@/lib/axios';
import { User } from '@/types/user';
import { CaregiverApplication } from '@/types/caregiverApplication';
import { CareRecipient } from '@/types/recipient';

export const getAdminUsers = async (): Promise<User[]> => {
    const response = await axios.get('/admin/users');
    return response.data;
};

export const updateAdminUserStatus = async (userId: string, status: string): Promise<User> => {
    const response = await axios.put(`/admin/users/${userId}/status`, { status });
    return response.data;
};

export const addAdminUserTag = async (userId: string, tag: string): Promise<User> => {
    const response = await axios.put(`/admin/users/${userId}/tags`, { tag });
    return response.data;
};

export const getAdminApplications = async (): Promise<CaregiverApplication[]> => {
    const response = await axios.get('/admin/applications');
    return response.data;
};

export const getClientApplications = async (): Promise<CareRecipient[]> => {
    const response = await axios.get('/recipients/client-applications');
    return response.data;
};

export const updateAdminApplicationStatus = async (applicationId: string, action: 'approve' | 'reject'): Promise<CaregiverApplication> => {
    const response = await axios.put(`/admin/applications/${applicationId}/status`, { action });
    return response.data;
};

export const adminLoginApi = async (email: string, password: string) => {
    const response = await axios.post('/auth/admin-login', { email, password });
    return response.data;
};

