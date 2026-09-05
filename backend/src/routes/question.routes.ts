import { Router } from 'express';
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  verifyQuestion,
  deleteQuestion,
  bulkImportQuestions,
} from '../controllers/question.controller';
import { authenticate, requirePermission } from '../middleware/auth.middleware';

const router = Router();

// Public / Authenticated read routes
router.get('/', getQuestions);
router.get('/:id', getQuestionById);

// Protected Admin / Content Editor routes
router.post('/', authenticate, requirePermission('QUESTION_CREATE'), createQuestion);
router.post('/bulk-import', authenticate, requirePermission('QUESTION_CREATE'), bulkImportQuestions);
router.put('/:id', authenticate, requirePermission('QUESTION_EDIT'), updateQuestion);
router.patch('/:id/verify', authenticate, requirePermission('QUESTION_VERIFY'), verifyQuestion);
router.delete('/:id', authenticate, requirePermission('QUESTION_DELETE'), deleteQuestion);

export default router;
