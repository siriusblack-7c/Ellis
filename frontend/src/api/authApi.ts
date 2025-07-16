import axios from "../lib/axios";
import { RegisterRequest, User } from "../types/user.ts";

const authApi = {
    login: async (email: string, password: string) => {
        const response = await axios.post(`/auth/login`, { email, password });
        return response.data;
    },
    register: async (userData: RegisterRequest) => {
        const response = await axios.post(`/auth/register`, userData);
        console.log(response.data, 'User registered successfully');
        return response.data;
    },
    googleLogin: async (token: string) => {
        const response = await axios.post(`/auth/google-login`, { token });
        return response.data;
    },
    checkAuth: async () => {
        const response = await axios.get(`/auth/me`);
        return response.data;
    },
    updateProfile: async (formData: FormData) => {
        const response = await axios.put(`/auth/profile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
    getProfile: async () => {
        const response = await axios.get(`/auth/profile`);
        return response.data;
    },

    changePassword: async (data: any) => {
        const response = await axios.put(`/auth/password`, data);
        return response.data;
    },
    logout: async () => {
        const response = await axios.post(`/auth/logout`);
        return response.data;
    },
}

export default authApi;