import axios from "@/lib/axios";
import { CaregiverApplication } from "@/types/caregiverApplication";
import { User } from "@/types/user";

export const getAllApplications = async (): Promise<CaregiverApplication[]> => {
    const response = await axios.get("/admin/applications");
    return response.data;
};

export const getAllUsers = async (): Promise<User[]> => {
    const response = await axios.get("/admin/users");
    return response.data;
};

export const changeApplicationStatus = async (id: string, status: string): Promise<CaregiverApplication> => {
    const response = await axios.put(`/admin/applications/${id}/status`, { status });
    return response.data;
};

export const updateUserStatus = async (id: string, status: string): Promise<User> => {
    const response = await axios.put(`/admin/users/${id}/status`, { status });
    return response.data;
}; 