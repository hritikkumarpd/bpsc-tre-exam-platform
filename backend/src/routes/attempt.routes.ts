import { Router } from 'express';
import {
  startAttempt,
  getAttemptState,
  saveAnswer,
  submitAttempt,
} from '../controllers/attempt.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/start', startAttempt);
router.get('/:id', getAttemptState);
router.post('/:id/answer', saveAnswer);
router.post('/:id/submit', submitAttempt);

export default router;
