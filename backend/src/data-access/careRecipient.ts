import CareRecipient, { ICareRecipient } from '../models/CareRecipient';
import mongoose from 'mongoose';

export const create = async (
    data: Partial<ICareRecipient>
): Promise<ICareRecipient> => {
    const careRecipient = new CareRecipient(data);
    return careRecipient.save();
};

export const findByClientId = async (
    clientId: string | mongoose.Types.ObjectId
): Promise<ICareRecipient[]> => {
    return CareRecipient.find({ client_id: clientId });
};

export const findById = async (
    id: string | mongoose.Types.ObjectId
): Promise<ICareRecipient | null> => {
    return CareRecipient.findById(id);
};

export const updateById = async (
    id: string | mongoose.Types.ObjectId,
    data: Partial<ICareRecipient>
): Promise<ICareRecipient | null> => {
    return CareRecipient.findByIdAndUpdate(id, data, { new: true });
};

export const deleteById = async (
    id: string | mongoose.Types.ObjectId
): Promise<ICareRecipient | null> => {
    return CareRecipient.findByIdAndDelete(id);
}; 