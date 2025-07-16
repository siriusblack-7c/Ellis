import CareBooking, { ICareBooking } from '../models/CareBooking';
import mongoose from 'mongoose';

export const findByCaregiverId = async (
    caregiverId: string | mongoose.Types.ObjectId
): Promise<ICareBooking[]> => {
    return CareBooking.find({ caregiverId: caregiverId });
}; 