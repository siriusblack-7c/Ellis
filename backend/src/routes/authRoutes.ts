import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { protect, IRequest } from '../middlewares/authMiddleware';
import { Response } from 'express';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', protect, (req: IRequest, res: Response) => {
    res.status(200).json(req.user);
});

export default router; 