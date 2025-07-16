import CareRecipient, { ICareRecipient } from '../models/CareRecipient';
import mongoose from 'mongoose';

export const createRecipient = async (recipientData: Partial<ICareRecipient>): Promise<ICareRecipient> => {
    const recipient = new CareRecipient(recipientData);
    return await recipient.save();
};

export const getRecipientsByClientId = async (clientId: string): Promise<ICareRecipient[]> => {
    return await CareRecipient.find({ clientId: new mongoose.Types.ObjectId(clientId) });
};

export const getRecipientById = async (id: string): Promise<ICareRecipient | null> => {
    return await CareRecipient.findById(id);
};

export const updateRecipient = async (id: string, recipientData: Partial<ICareRecipient>): Promise<ICareRecipient | null> => {
    return await CareRecipient.findByIdAndUpdate(id, recipientData, { new: true });
};

export const deleteRecipient = async (id: string): Promise<ICareRecipient | null> => {
    return await CareRecipient.findByIdAndDelete(id);
}; 