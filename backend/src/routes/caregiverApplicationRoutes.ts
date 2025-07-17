import { Router } from 'express';
import {
    createApplication,
    getMyApplication,
    getApplicationById,
    updateApplication,
} from '../controllers/caregiverApplicationController';
import { protect, authorize } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

// All routes are protected
router.use(protect);

// Routes for a specific user's application
router.route('/')
    .post(authorize('caregiver'), upload.single('resume'), createApplication);

router.route('/my-application')
    .get(authorize('caregiver'), getMyApplication);

router.route('/:id')
    .get(authorize('admin', 'caregiver'), getApplicationById) // Admins or the user themselves
    .put(authorize('caregiver', 'admin'), updateApplication);

export default router; 