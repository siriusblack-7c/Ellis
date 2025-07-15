import * as careRecipientDataAccess from '../data-access/careRecipient';
import { ICareRecipient } from '../models/CareRecipient';
import mongoose from 'mongoose';

export const addRecipient = async (
    data: Partial<ICareRecipient>,
    clientId: mongoose.Types.ObjectId
) => {
    if (!data.name || !data.age || !data.care_needs || !data.location) {
        throw new Error('Missing required fields');
    }
    data.client_id = clientId;
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
    if (!recipient || !recipient.client_id.equals(clientId)) {
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
    return careRecipientDataAccess.updateById(recipient._id, data);
};

export const removeRecipient = async (
    recipientId: string,
    clientId: mongoose.Types.ObjectId
) => {
    const recipient = await getRecipientDetails(recipientId, clientId);
    return careRecipientDataAccess.deleteById(recipient._id);
}; 