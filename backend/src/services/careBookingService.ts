import * as careBookingDataAccess from '../data-access/careBooking';
import { ICareBooking } from '../models/CareBooking';
import mongoose from 'mongoose';

export const getCaregiverBookings = async (caregiverId: string | mongoose.Types.ObjectId) => {
    return careBookingDataAccess.findByCaregiverId(caregiverId);
}; 