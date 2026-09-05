import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { QuestionModel } from '../models/question.model';
import { MockTestModel } from '../models/mock-test.model';
import { PYQPaperModel } from '../models/pyq-paper.model';
import { AttemptModel } from '../models/attempt.model';
import { IGeneratedQuestion } from '../models/generated-question.model';
import { ReviewQueueModel } from '../models/review-queue.model';
import { AdminLogModel } from '../models/admin-log.model';
import { QuestionFingerprintModel } from '../models/question-fingerprint.model';
import { generateUniqueMockTest } from '../services/mock-generator.service';
import { generateAIQuestionDraft } from '../services/ai-generator.service';
import { generateFingerprintHash } from '../services/fingerprint.service';

export const getAdminDashboardMetrics = async (_req: Request, res: Response) => {
  try {
    const [
      totalUsers,
      totalQuestions,
      totalMocks,
      totalPYQs,
      cancelledAttempts,
      pendingReviews,
      recentAuditLogs,
    ] = await Promise.all([
      UserModel.countDocuments({}),
      QuestionModel.countDocuments({}),
      MockTestModel.countDocuments({}),
      PYQPaperModel.countDocuments({}),
      AttemptModel.countDocuments({ status: 'CANCELLED' }),
      ReviewQueueModel.countDocuments({ status: 'PENDING' }),
      AdminLogModel.find({}).sort({ createdAt: -1 }).limit(10).populate('adminId', 'name email'),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        metrics: {
          totalUsers,
          totalQuestions,
          totalMocks,
          totalPYQs,
          cancelledAttempts,
          pendingReviews,
        },
        recentAuditLogs,
      },
    });
  } catch (err) {
    console.error('[ADMIN METRICS ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch admin dashboard metrics.' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { role, search } = req.query;
    const filter: Record<string, unknown> = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search as string, $options: 'i' } },
        { email: { $regex: search as string, $options: 'i' } },
      ];
    }

    const users = await UserModel.find(filter).select('-passwordHash').sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: { users } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch users.' });
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    user.role = role;
    await user.save();

    await AdminLogModel.create({
      adminId: req.user?.id,
      action: 'UPDATE_USER_ROLE',
      targetEntity: 'User',
      targetId: user._id.toString(),
      details: { newRole: role },
    });

    return res.status(200).json({ success: true, message: `User role updated to ${role}.`, data: { user } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update user role.' });
  }
};

export const triggerMockGeneration = async (req: Request, res: Response) => {
  try {
    const { title, slug, exam, description, durationMinutes, negativeMarking, releaseAt } = req.body;

    const mockTest = await generateUniqueMockTest({
      title,
      slug,
      exam,
      description,
      durationMinutes,
      negativeMarking,
      releaseAt: new Date(releaseAt),
      createdBy: req.user?.id,
    });

    await AdminLogModel.create({
      adminId: req.user?.id,
      action: 'GENERATE_MOCK_TEST',
      targetEntity: 'MockTest',
      targetId: mockTest._id.toString(),
      details: { title, exam },
    });

    return res.status(201).json({
      success: true,
      message: '150-question mock test generated successfully with unique question selection.',
      data: { mockTest },
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: (err as Error).message });
  }
};

export const scheduleMockRelease = async (req: Request, res: Response) => {
  try {
    const { mockId } = req.params;
    const { releaseAt } = req.body;

    const mock = await MockTestModel.findById(mockId);
    if (!mock) return res.status(404).json({ success: false, message: 'Mock test not found.' });

    mock.releaseAt = new Date(releaseAt);
    mock.status = 'SCHEDULED';
    await mock.save();

    return res.status(200).json({ success: true, message: 'Mock test release scheduled.', data: { mock } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to schedule mock test.' });
  }
};

export const triggerAIGeneration = async (req: Request, res: Response) => {
  try {
    const { exam, subject, topic, difficulty, conceptPrompt } = req.body;
    const draft = await generateAIQuestionDraft({ exam, subject, topic, difficulty, conceptPrompt });

    return res.status(201).json({
      success: true,
      message: 'AI question draft generated and sent to review queue.',
      data: { draft },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'AI question generation failed.' });
  }
};

export const getReviewQueue = async (_req: Request, res: Response) => {
  try {
    const queue = await ReviewQueueModel.find({ status: 'PENDING' }).populate('generatedQuestionId');
    return res.status(200).json({ success: true, data: { queue } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch review queue.' });
  }
};

export const approveReviewDraft = async (req: Request, res: Response) => {
  try {
    const { reviewId, action } = req.body; // 'APPROVE' or 'REJECT'
    const item = await ReviewQueueModel.findById(reviewId).populate('generatedQuestionId');
    if (!item || !item.generatedQuestionId) {
      return res.status(404).json({ success: false, message: 'Review queue item not found.' });
    }

    const draft = item.generatedQuestionId as unknown as IGeneratedQuestion;

    if (action === 'APPROVE') {
      const { hash, normalized } = generateFingerprintHash(draft.parsedQuestionText);
      const question = await QuestionModel.create({
        questionText: draft.parsedQuestionText,
        options: draft.parsedOptions,
        correctAnswer: draft.parsedCorrectAnswer,
        explanation: draft.parsedExplanation,
        exam: draft.exam,
        subject: draft.subject,
        topic: draft.topic,
        difficulty: draft.difficulty || 'MEDIUM',
        sourceType: 'AI_INSPIRED', // STRICT NO PYQ LABEL RULE
        verificationStatus: 'VERIFIED',
        fingerprint: hash,
        createdBy: req.user?.id,
        verifiedBy: req.user?.id,
      });

      await QuestionFingerprintModel.create({
        fingerprintHash: hash,
        normalizedText: normalized,
        questionId: question._id,
      });

      item.status = 'APPROVED';
      draft.status = 'VERIFIED';
      draft.createdQuestionId = question._id;
      await Promise.all([item.save(), draft.save()]);

      return res.status(200).json({ success: true, message: 'Draft approved and question published to bank.' });
    } else {
      item.status = 'REJECTED';
      draft.status = 'REJECTED';
      await Promise.all([item.save(), draft.save()]);
      return res.status(200).json({ success: true, message: 'Draft rejected.' });
    }
  } catch (err) {
    console.error('[APPROVE DRAFT ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Failed to process draft review.' });
  }
};

export const getAntiCheatViolations = async (_req: Request, res: Response) => {
  try {
    const cancelledAttempts = await AttemptModel.find({ status: 'CANCELLED' })
      .populate('userId', 'name email')
      .sort({ updatedAt: -1 });

    return res.status(200).json({ success: true, data: { violations: cancelledAttempts } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch anti-cheat violations.' });
  }
};

export const getAuditLogs = async (_req: Request, res: Response) => {
  try {
    const logs = await AdminLogModel.find({}).sort({ createdAt: -1 }).limit(50).populate('adminId', 'name email');
    return res.status(200).json({ success: true, data: { logs } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch audit logs.' });
  }
};
