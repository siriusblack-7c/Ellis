import User from '../models/User';
import { IUser } from '../models/User';

export const messageService = {
    async sendMessage(recipientIds: string[], message: string) {
        if (!recipientIds || !message) {
            throw new Error('Missing required fields');
        }

        const newMessage = {
            message,
            createdAt: new Date(),
        };

        const result = await User.updateMany(
            { _id: { $in: recipientIds } },
            { $push: { messages: newMessage as any } } // Using 'as any' to bypass schema validation temporarily
        );

        if (result.modifiedCount === 0) {
            throw new Error('No users found to send message to');
        }

        return { message: 'Message sent successfully' };
    },

    async getMessages(userId: string) {
        const user = await User.findById(userId).select('messages').sort({ 'messages.createdAt': -1 });
        if (!user) {
            throw new Error('User not found');
        }
        return user.messages;
    },

    async markMessagesAsSeen(userId: string) {
        await User.updateMany(
            { _id: userId },
            { $set: { 'messages.$[].seen': true } }
        );
        return { message: 'Messages marked as seen' };
    }
}; 