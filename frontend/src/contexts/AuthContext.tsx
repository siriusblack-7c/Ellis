import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminLoginApi } from '../api/adminApi';
import authApi from '../api/authApi';
import { RegisterRequest, User } from '../types/user';

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterRequest) => Promise<void>;
    googleLogin: (token: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
    updateUser: (formData: FormData) => Promise<void>;
    getProfile: () => Promise<User>;
    adminLogin: (email: string, password: string) => Promise<void>;
    adminLogout: () => void;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user_auth');

            if (storedToken && storedUser) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            }
        } catch (error) {
            console.error("Failed to parse auth data from localStorage", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const response = await authApi.login(email, password);
        localStorage.setItem('user_auth', JSON.stringify(response));
        localStorage.setItem('token', response.token);
        setUser(response);
        setToken(response.token);
    };

    const register = async (userData: RegisterRequest) => {
        const response = await authApi.register(userData);
        localStorage.setItem('user_auth', JSON.stringify(response));
        localStorage.setItem('token', response.token);
        setUser(response);
        setToken(response.token);
    };

    const googleLogin = async (token: string) => {
        const response = await authApi.googleLogin(token);
        localStorage.setItem('user_auth', JSON.stringify(response));
        localStorage.setItem('token', response.token);
        setUser(response);
        setToken(response.token);
    };

    const logout = () => {
        localStorage.removeItem('user_auth');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };

    const updateUser = async (formData: FormData) => {
        const response = await authApi.updateProfile(formData);
        localStorage.setItem('user_auth', JSON.stringify(response));
        setUser(response);
    };

    const getProfile = async () => {
        const response = await authApi.getProfile();
        setUser(response);
        return response;
    };

    const adminLogin = async (email: string, password: string) => {
        const response = await adminLoginApi(email, password);
        localStorage.setItem('user_auth', JSON.stringify(response));
        localStorage.setItem('token', response.token);
        setUser(response);
        setToken(response.token);
        return response;
    };

    const adminLogout = () => {
        localStorage.removeItem('user_auth');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, user, token, login, register, googleLogin, logout, loading, updateUser, getProfile, adminLogin, adminLogout }}>
            {children}
        </AuthContext.Provider>
    );
}; 