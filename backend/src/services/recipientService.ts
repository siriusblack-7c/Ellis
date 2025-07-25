import * as recipientDataAccess from '../data-access/recipient';
import { ICareRecipient } from '../models/CareRecipient';
import CareRecipient from '../models/CareRecipient';    

export const getClientApplications = async () => {
    const recipients = await CareRecipient.find().populate('clientId');
    if (!recipients) {
        throw new Error('No client applications found');
    }
    return recipients;
};

export const createRecipient = async (recipientData: Partial<ICareRecipient>) => {
    return await recipientDataAccess.createRecipient(recipientData);
};

export const getRecipientsByClientId = async (clientId: string) => {
    return await recipientDataAccess.getRecipientsByClientId(clientId);
};

export const getRecipientById = async (id: string) => {
    return await recipientDataAccess.getRecipientById(id);
};

export const updateRecipient = async (id: string, recipientData: Partial<ICareRecipient>) => {
    return await recipientDataAccess.updateRecipient(id, recipientData);
};

export const deleteRecipient = async (id: string) => {
    return await recipientDataAccess.deleteRecipient(id);
}; 