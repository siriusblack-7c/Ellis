import express from 'express';
import { messageController } from '../controllers/messageController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = express.Router();

router.post(
    '/send',
    protect,
    authorize('admin'),
    messageController.sendMessage
);

router.get(
    '/',
    protect,
    messageController.getMessages
);

router.put(
    '/seen',
    protect,
    messageController.markMessagesAsSeen
);

export default router; 