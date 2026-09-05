import { Router } from 'express';
import {
  getPYQPapers,
  getPYQPaperById,
  createPYQPaper,
  addQuestionToPYQ,
  parsePDFQuestionPaper,
  uploadAndParsePDFFile,
  importPYQPaper,
} from '../controllers/pyq.controller';
import { authenticate, requirePermission } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getPYQPapers);
router.get('/:id', getPYQPaperById);
router.post('/', authenticate, requirePermission('PYQ_MANAGE'), createPYQPaper);
router.post('/questions', authenticate, requirePermission('PYQ_MANAGE'), addQuestionToPYQ);
router.post('/parse-pdf', authenticate, requirePermission('PYQ_MANAGE'), parsePDFQuestionPaper);
router.post('/upload-pdf-file', authenticate, requirePermission('PYQ_MANAGE'), uploadAndParsePDFFile);
router.post('/import-paper', authenticate, requirePermission('PYQ_MANAGE'), importPYQPaper);

export default router;

