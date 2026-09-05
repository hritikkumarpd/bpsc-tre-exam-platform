import { Router } from 'express';
import {
  getAdminDashboardMetrics,
  getUsers,
  updateUserRole,
  triggerMockGeneration,
  scheduleMockRelease,
  triggerAIGeneration,
  getReviewQueue,
  approveReviewDraft,
  getAntiCheatViolations,
  getAuditLogs,
} from '../controllers/admin.controller';
import { authenticate, requirePermission } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/metrics', requirePermission('ANALYTICS_VIEW_ALL'), getAdminDashboardMetrics);
router.get('/users', requirePermission('USER_MANAGE'), getUsers);
router.patch('/users/role', requirePermission('USER_MANAGE'), updateUserRole);

router.post('/mocks/generate', requirePermission('MOCK_MANAGE'), triggerMockGeneration);
router.patch('/mocks/:mockId/schedule', requirePermission('MOCK_MANAGE'), scheduleMockRelease);

router.post('/ai/generate', requirePermission('QUESTION_CREATE'), triggerAIGeneration);
router.get('/review-queue', requirePermission('QUESTION_VERIFY'), getReviewQueue);
router.post('/review-queue/action', requirePermission('QUESTION_VERIFY'), approveReviewDraft);

router.get('/violations', requirePermission('VIOLATIONS_MONITOR'), getAntiCheatViolations);
router.get('/audit-logs', requirePermission('USER_MANAGE'), getAuditLogs);

export default router;
