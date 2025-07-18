import axios from '../lib/axios';

export const sendMessage = async (recipientIds: string[], message: string) => {
    const { data } = await axios.post('/messages/send', {
        recipientIds,
        message,
    });
    return data;
};

export const getMessages = async () => {
    const { data } = await axios.get('/messages');
    return data;
};

export const markMessagesAsSeen = async () => {
    const { data } = await axios.put('/messages/seen');
    return data;
}; 