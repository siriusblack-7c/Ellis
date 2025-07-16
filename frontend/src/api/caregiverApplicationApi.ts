import axios from "@/lib/axios";
import { CaregiverApplication } from "@/types/caregiverApplication";

export const createCaregiverApplication = async (data: Partial<CaregiverApplication>) => {
    const response = await axios.post("/applications", data);
    return response.data;
};

export const updateCaregiverApplication = async (id: string, data: Partial<CaregiverApplication>) => {
    const response = await axios.put(`/applications/${id}`, data);
    return response.data;
};

export const getMyApplication = async () => {
    const response = await axios.get("/applications/my-application");
    return response.data;
}; 