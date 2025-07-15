import { Router } from 'express';
import {
    createCareRecipient,
    getCareRecipients,
    getCareRecipientById,
    updateCareRecipient,
    deleteCareRecipient,
} from '../controllers/careRecipientController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// All routes in this file are protected
router.use(protect);

router.route('/')
    .post(createCareRecipient)
    .get(getCareRecipients);

router.route('/:id')
    .get(getCareRecipientById)
    .put(updateCareRecipient)
    .delete(deleteCareRecipient);

export default router; 