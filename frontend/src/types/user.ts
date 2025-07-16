export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: string;
    avatar: string; 
    addressStreet: string;
    addressCity: string;
    addressState: string;
    addressZip: string;
    addressCountry: string;
    bio: string;
    birthDate: string;
    gender: string;
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