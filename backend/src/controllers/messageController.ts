import { Response } from 'express';
import { messageService } from '../services/messageService';
import { IRequest } from '../middlewares/authMiddleware';

export const messageController = {
    async sendMessage(req: IRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const { recipientIds, message } = req.body;

            if (!recipientIds || !message) {
                throw new Error('Recipient IDs and message are required');
            }

            const result = await messageService.sendMessage(recipientIds, message);
            res.status(200).json(result);
        } catch (error) {
            console.error(error, 'Error sending message');
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async getMessages(req: IRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const userId = req.user._id;
            const messages = await messageService.getMessages(userId);
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    async markMessagesAsSeen(req: IRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const userId = req.user._id;
            const result = await messageService.markMessagesAsSeen(userId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}; 