import { Router } from 'express';
import { getMyBookings } from '../controllers/careBookingController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = Router();

router.use(protect);

router.get('/my-jobs', authorize('caregiver'), getMyBookings);

export default router; 