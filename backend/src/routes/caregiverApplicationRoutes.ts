import { Router } from 'express';
import {
    createApplication,
    getMyApplication,
    listApplications,
    getApplicationById,
    changeApplicationStatus,
} from '../controllers/caregiverApplicationController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = Router();

// All routes are protected
router.use(protect);

// Routes for a specific user's application
router.route('/')
    .post(authorize('caregiver'), createApplication)
    .get(authorize('caregiver'), getMyApplication);

// Admin-only routes
router.route('/all')
    .get(authorize('admin'), listApplications);

router.route('/:id')
    .get(authorize('admin', 'caregiver'), getApplicationById) // Admins or the user themselves
    .put(authorize('admin'), changeApplicationStatus);

export default router; 