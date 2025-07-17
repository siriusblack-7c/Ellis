import { Router } from 'express';
import {
    listApplications,
    changeApplicationStatus,
} from '../controllers/caregiverApplicationController';
import { getAllUsers, updateUserStatus, updateUserTags } from '../controllers/userController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = Router();

// All routes in this file are protected and admin-only
router.use(protect, authorize('admin'));

// User management routes
router.get('/users', getAllUsers);
router.put('/users/:id/status', updateUserStatus);
router.put('/users/:id/tags', updateUserTags);

// Application management routes
router.get('/applications', listApplications);
router.put('/applications/:id/status', changeApplicationStatus);

export default router; 