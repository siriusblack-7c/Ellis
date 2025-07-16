import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.tsx';
import authApi from '@/api/authApi.ts';
import { User } from '@/types/user.ts';

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    } 
    const { login, register, logout, isAuthenticated, loading, user, getProfile } = context;
    
    const updateUser = async (userData: Partial<User>) => {
        const response = await authApi.updateProfile(userData as FormData);
        return response;
    };

    return { login, register, logout, isAuthenticated, loading, user, updateUser, getProfile };
}; 