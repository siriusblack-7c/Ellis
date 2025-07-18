import { Request, Response } from 'express';
import * as recipientService from '../services/recipientService';
import { IRequest } from '../middlewares/authMiddleware';

export const getClientApplications = async (req: Request, res: Response) => {
    try {
        const recipients = await recipientService.getClientApplications();
        res.status(200).json(recipients);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createRecipient = async (req: IRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const recipientData = req.body;
        recipientData.clientId = (req.user as any)._id;

        if (req.file) {
            recipientData.avatar = req.file.path;
        }

        const recipient = await recipientService.createRecipient(recipientData);
        res.status(201).json(recipient);
    } catch (error: any) {
        console.log(error.message, 'Error creating recipient');
        res.status(400).json({ message: error.message });
    }
};

export const getRecipients = async (req: IRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const recipients = await recipientService.getRecipientsByClientId((req.user as any)._id as string);
        res.status(200).json(recipients);
    } catch (error: any) {
        console.log(error.message, 'Error getting recipients');
        res.status(500).json({ message: error.message });
    }
};

export const getRecipientById = async (req: IRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const recipient = await recipientService.getRecipientById(req.params.id);
        if (!recipient || (recipient.clientId as any).toString() !== ((req.user as any)._id as any).toString()) {
            return res.status(404).json({ message: 'Recipient not found' });
        }
        res.status(200).json(recipient);
    } catch (error: any) {
        console.log(error.message, 'Error getting recipient by id');
        res.status(500).json({ message: error.message });
    }
};

export const updateRecipient = async (req: IRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const recipientToUpdate = await recipientService.getRecipientById(req.params.id);
        if (!recipientToUpdate || (recipientToUpdate.clientId as any).toString() !== ((req.user as any)._id as any).toString()) {
            return res.status(404).json({ message: 'Recipient not found' });
        }

        const updateData = { ...req.body };
        if (req.file) {
            updateData.avatar = req.file.path;
        }

        const updatedRecipient = await recipientService.updateRecipient(req.params.id, updateData);
        res.status(200).json(updatedRecipient);
    } catch (error: any) {
        console.log(error.message, 'Error updating recipient');
        res.status(400).json({ message: error.message });
    }
};

export const deleteRecipient = async (req: IRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const recipientToDelete = await recipientService.getRecipientById(req.params.id);
        if (!recipientToDelete || (recipientToDelete.clientId as any).toString() !== ((req.user as any)._id as any).toString()) {
            return res.status(404).json({ message: 'Recipient not found' });
        }

        await recipientService.deleteRecipient(req.params.id);
        res.status(204).send();
    } catch (error: any) {
        console.log(error.message, 'Error deleting recipient');
        res.status(500).json({ message: error.message });
    }
}; 