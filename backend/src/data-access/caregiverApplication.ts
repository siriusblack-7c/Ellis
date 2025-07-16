import CaregiverApplication, { ICaregiverApplication } from '../models/CaregiverApplication';
import mongoose from 'mongoose';

export const create = async (
    data: Partial<ICaregiverApplication>
): Promise<ICaregiverApplication> => {
    const application = new CaregiverApplication(data);
    return application.save();
};

export const findByUserId = async (
    userId: string | mongoose.Types.ObjectId
): Promise<ICaregiverApplication | null> => {
    return CaregiverApplication.findOne({ userId: userId });
};

export const findById = async (
    id: string | mongoose.Types.ObjectId
): Promise<ICaregiverApplication | null> => {
    return CaregiverApplication.findById(id);
};

export const findAll = async (): Promise<ICaregiverApplication[]> => {
    return CaregiverApplication.find();
};

export const updateById = async (
    id: string | mongoose.Types.ObjectId,
    data: Partial<ICaregiverApplication>
): Promise<ICaregiverApplication | null> => {
    return CaregiverApplication.findByIdAndUpdate(id, data, { new: true });
}; 