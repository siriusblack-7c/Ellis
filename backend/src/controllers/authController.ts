import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
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