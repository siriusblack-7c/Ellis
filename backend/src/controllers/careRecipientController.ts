import { Response } from 'express';
import * as careRecipientService from '../services/careRecipientService';
import { IRequest } from '../middlewares/authMiddleware';

export const createCareRecipient = async (req: IRequest, res: Response) => {
    try {
        const recipient = await careRecipientService.addRecipient(
            req.body,
            req.user!._id
        );
        res.status(201).json(recipient);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getCareRecipients = async (req: IRequest, res: Response) => {
    try {
        const recipients = await careRecipientService.getRecipientsForClient(
            req.user!._id
        );
        res.status(200).json(recipients);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getCareRecipientById = async (req: IRequest, res: Response) => {
    try {
        const recipient = await careRecipientService.getRecipientDetails(
            req.params.id,
            req.user!._id
        );
        res.status(200).json(recipient);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const updateCareRecipient = async (req: IRequest, res: Response) => {
    try {
        const recipient = await careRecipientService.updateRecipient(
            req.params.id,
            req.body,
            req.user!._id
        );
        res.status(200).json(recipient);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteCareRecipient = async (req: IRequest, res: Response) => {
    try {
        await careRecipientService.removeRecipient(req.params.id, req.user!._id);
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}; 