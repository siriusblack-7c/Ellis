import { Response } from 'express';
import * as careBookingService from '../services/careBookingService';
import { IRequest } from '../middlewares/authMiddleware';

export const getMyBookings = async (req: IRequest, res: Response) => {
    try {
        const bookings = await careBookingService.getCaregiverBookings(req.user!._id);
        res.status(200).json(bookings);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}; 