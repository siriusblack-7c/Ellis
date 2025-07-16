import express from 'express';
import {
    createRecipient,
    getRecipients,
    getRecipientById,
    updateRecipient,
    deleteRecipient,
} from '../controllers/recipientController';
import { protect } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const router = express.Router();

router
    .route('/')
    .get(protect, getRecipients)
    .post(protect, upload.single('avatar'), createRecipient);

router
    .route('/:id')
    .get(protect, getRecipientById)
    .put(protect, upload.single('avatar'), updateRecipient)
    .delete(protect, deleteRecipient);

export default router; 