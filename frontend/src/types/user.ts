export type UserRole = 'client' | 'caregiver' | 'admin';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: string;
    avatar: string; 
    address1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    bio: string;
    birthDate: string;
    gender: string;
    status: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}


export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}