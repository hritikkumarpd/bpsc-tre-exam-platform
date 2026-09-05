import { Router } from 'express';
import { recordViolation } from '../controllers/violation.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);
router.post('/:attemptId', recordViolation);

export default router;
