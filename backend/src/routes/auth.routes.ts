import { Router } from 'express';
import { signup, login, logout, getMe } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/signup', signup);
router.post('/register', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticate, getMe);

export default router;
