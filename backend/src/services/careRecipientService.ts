import * as careRecipientDataAccess from '../data-access/careRecipient';
import { ICareRecipient } from '../models/CareRecipient';
import mongoose from 'mongoose';

export const addRecipient = async (
    data: Partial<ICareRecipient>,
    clientId: mongoose.Types.ObjectId
) => {
    if (!data.name || !data.age || !data.careNeeds || !data.location) {
        throw new Error('Missing required fields');
    }
    data.clientId = clientId;
    return careRecipientDataAccess.create(data);
};

export const getRecipientsForClient = async (
    clientId: mongoose.Types.ObjectId
) => {
    return careRecipientDataAccess.findByClientId(clientId);
};

export const getRecipientDetails = async (
    recipientId: string,
    clientId: mongoose.Types.ObjectId
) => {
    const recipient = await careRecipientDataAccess.findById(recipientId);
    if (!recipient || !recipient.clientId.equals(clientId)) {
        throw new Error('Recipient not found or not authorized');
    }
    return recipient;
};

export const updateRecipient = async (
    recipientId: string,
    data: Partial<ICareRecipient>,
    clientId: mongoose.Types.ObjectId
) => {
    const recipient = await getRecipientDetails(recipientId, clientId);
    return careRecipientDataAccess.updateById(recipient._id as string, data);
};

export const removeRecipient = async (
    recipientId: string,
    clientId: mongoose.Types.ObjectId
) => {
    const recipient = await getRecipientDetails(recipientId, clientId);
    return careRecipientDataAccess.deleteById(recipient._id as string);
}; 