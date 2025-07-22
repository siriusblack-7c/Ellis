import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { IRequest } from '../middlewares/authMiddleware';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
        console.log(user, 'User registered successfully');
        res.status(201).json(user);
    } catch (error: any) {
        console.log(error.message, 'User registration error')
        res.status(400).json({ message: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const user = await authService.login(req.body);
        res.status(200).json(user);
    } catch (error: any) {
        console.log(error.message, 'User login error')
        res.status(400).json({ message: error.message });
    }
};

export const updateUserProfile = async (req: IRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const userData = { ...req.body };
        if (req.file) {
            userData.avatar = `/uploads/${req.file.filename}`;
        }

        const user = await authService.updateUserProfile(req.user._id as string, userData);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const changePassword = async (req: IRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const { oldPassword, newPassword } = req.body;
        await authService.changePassword(req.user._id as string, oldPassword, newPassword);
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const getProfile = async (req: IRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const user = await authService.getProfile(req.user._id as string);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const googleLogin = async (req: IRequest, res: Response) => {
    try {
        const user = await authService.googleLogin(req.body.token);
        res.status(200).json(user);
        console.log(user, 'Google login successful');
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export const adminLogin = async (req: Request, res: Response) => {
    try {
        const user = await authService.adminLogin(req.body);
        res.status(200).json(user);
        console.log(user, 'Admin login successful');
    } catch (error: any) {
        res.status(400).json({ message: error.message });
        console.log(error.message, 'Admin login failed');
    }
}   