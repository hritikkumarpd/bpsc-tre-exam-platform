import { Router } from 'express';
import {
  getDashboardAnalytics,
  getBookmarks,
  addBookmark,
  getMistakes,
} from '../controllers/analytics.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/dashboard', getDashboardAnalytics);
router.get('/bookmarks', getBookmarks);
router.post('/bookmarks', addBookmark);
router.get('/mistakes', getMistakes);

export default router;
