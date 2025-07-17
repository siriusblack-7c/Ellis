import { Response } from 'express';
import * as userService from '../services/userService';
import { IRequest } from '../middlewares/authMiddleware';

export const getAllUsers = async (req: IRequest, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUserStatus = async (req: IRequest, res: Response) => {
    try {
        const { status } = req.body;
        const user = await userService.updateUserStatus(req.params.id, status);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateUserTags = async (req: IRequest, res: Response) => {
    try {
        const { tag } = req.body;
        const user = await userService.addTagToUser(req.params.id, tag);
        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}; 