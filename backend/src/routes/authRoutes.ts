import { Router } from 'express';
import { registerUser, loginUser, updateUserProfile, changePassword, getProfile, googleLogin, adminLogin } from '../controllers/authController';
import { protect, IRequest } from '../middlewares/authMiddleware';
import { Response } from 'express';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLogin);
router.post('/admin-login', adminLogin);

router.get('/me', protect, (req: IRequest, res: Response) => {
    res.status(200).json(req.user);
});

router.get('/profile', protect, getProfile);

router.put('/profile', protect, upload.single('avatar'), updateUserProfile);

router.put('/password', protect, changePassword);

export default router; 