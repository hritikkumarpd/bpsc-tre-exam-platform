"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuditLogs = exports.getAntiCheatViolations = exports.approveReviewDraft = exports.getReviewQueue = exports.triggerAIGeneration = exports.scheduleMockRelease = exports.triggerMockGeneration = exports.updateUserRole = exports.getUsers = exports.getAdminDashboardMetrics = void 0;
const user_model_1 = require("../models/user.model");
const question_model_1 = require("../models/question.model");
const mock_test_model_1 = require("../models/mock-test.model");
const pyq_paper_model_1 = require("../models/pyq-paper.model");
const attempt_model_1 = require("../models/attempt.model");
const review_queue_model_1 = require("../models/review-queue.model");
const admin_log_model_1 = require("../models/admin-log.model");
const question_fingerprint_model_1 = require("../models/question-fingerprint.model");
const mock_generator_service_1 = require("../services/mock-generator.service");
const ai_generator_service_1 = require("../services/ai-generator.service");
const fingerprint_service_1 = require("../services/fingerprint.service");
const getAdminDashboardMetrics = async (_req, res) => {
    try {
        const [totalUsers, totalQuestions, totalMocks, totalPYQs, cancelledAttempts, pendingReviews, recentAuditLogs,] = await Promise.all([
            user_model_1.UserModel.countDocuments({}),
            question_model_1.QuestionModel.countDocuments({}),
            mock_test_model_1.MockTestModel.countDocuments({}),
            pyq_paper_model_1.PYQPaperModel.countDocuments({}),
            attempt_model_1.AttemptModel.countDocuments({ status: 'CANCELLED' }),
            review_queue_model_1.ReviewQueueModel.countDocuments({ status: 'PENDING' }),
            admin_log_model_1.AdminLogModel.find({}).sort({ createdAt: -1 }).limit(10).populate('adminId', 'name email'),
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
    }
    catch (err) {
        console.error('[ADMIN METRICS ERROR]:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch admin dashboard metrics.' });
    }
};
exports.getAdminDashboardMetrics = getAdminDashboardMetrics;
const getUsers = async (req, res) => {
    try {
        const { role, search } = req.query;
        const filter = {};
        if (role)
            filter.role = role;
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }
        const users = await user_model_1.UserModel.find(filter).select('-passwordHash').sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: { users } });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to fetch users.' });
    }
};
exports.getUsers = getUsers;
const updateUserRole = async (req, res) => {
    try {
        const { userId, role } = req.body;
        const user = await user_model_1.UserModel.findById(userId);
        if (!user)
            return res.status(404).json({ success: false, message: 'User not found.' });
        user.role = role;
        await user.save();
        await admin_log_model_1.AdminLogModel.create({
            adminId: req.user?.id,
            action: 'UPDATE_USER_ROLE',
            targetEntity: 'User',
            targetId: user._id.toString(),
            details: { newRole: role },
        });
        return res.status(200).json({ success: true, message: `User role updated to ${role}.`, data: { user } });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to update user role.' });
    }
};
exports.updateUserRole = updateUserRole;
const triggerMockGeneration = async (req, res) => {
    try {
        const { title, slug, exam, description, durationMinutes, negativeMarking, releaseAt } = req.body;
        const mockTest = await (0, mock_generator_service_1.generateUniqueMockTest)({
            title,
            slug,
            exam,
            description,
            durationMinutes,
            negativeMarking,
            releaseAt: new Date(releaseAt),
            createdBy: req.user?.id,
        });
        await admin_log_model_1.AdminLogModel.create({
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
    }
    catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
};
exports.triggerMockGeneration = triggerMockGeneration;
const scheduleMockRelease = async (req, res) => {
    try {
        const { mockId } = req.params;
        const { releaseAt } = req.body;
        const mock = await mock_test_model_1.MockTestModel.findById(mockId);
        if (!mock)
            return res.status(404).json({ success: false, message: 'Mock test not found.' });
        mock.releaseAt = new Date(releaseAt);
        mock.status = 'SCHEDULED';
        await mock.save();
        return res.status(200).json({ success: true, message: 'Mock test release scheduled.', data: { mock } });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to schedule mock test.' });
    }
};
exports.scheduleMockRelease = scheduleMockRelease;
const triggerAIGeneration = async (req, res) => {
    try {
        const { exam, subject, topic, difficulty, conceptPrompt } = req.body;
        const draft = await (0, ai_generator_service_1.generateAIQuestionDraft)({ exam, subject, topic, difficulty, conceptPrompt });
        return res.status(201).json({
            success: true,
            message: 'AI question draft generated and sent to review queue.',
            data: { draft },
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'AI question generation failed.' });
    }
};
exports.triggerAIGeneration = triggerAIGeneration;
const getReviewQueue = async (_req, res) => {
    try {
        const queue = await review_queue_model_1.ReviewQueueModel.find({ status: 'PENDING' }).populate('generatedQuestionId');
        return res.status(200).json({ success: true, data: { queue } });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to fetch review queue.' });
    }
};
exports.getReviewQueue = getReviewQueue;
const approveReviewDraft = async (req, res) => {
    try {
        const { reviewId, action } = req.body; // 'APPROVE' or 'REJECT'
        const item = await review_queue_model_1.ReviewQueueModel.findById(reviewId).populate('generatedQuestionId');
        if (!item || !item.generatedQuestionId) {
            return res.status(404).json({ success: false, message: 'Review queue item not found.' });
        }
        const draft = item.generatedQuestionId;
        if (action === 'APPROVE') {
            const { hash, normalized } = (0, fingerprint_service_1.generateFingerprintHash)(draft.parsedQuestionText);
            const question = await question_model_1.QuestionModel.create({
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
            await question_fingerprint_model_1.QuestionFingerprintModel.create({
                fingerprintHash: hash,
                normalizedText: normalized,
                questionId: question._id,
            });
            item.status = 'APPROVED';
            draft.status = 'VERIFIED';
            draft.createdQuestionId = question._id;
            await Promise.all([item.save(), draft.save()]);
            return res.status(200).json({ success: true, message: 'Draft approved and question published to bank.' });
        }
        else {
            item.status = 'REJECTED';
            draft.status = 'REJECTED';
            await Promise.all([item.save(), draft.save()]);
            return res.status(200).json({ success: true, message: 'Draft rejected.' });
        }
    }
    catch (err) {
        console.error('[APPROVE DRAFT ERROR]:', err);
        return res.status(500).json({ success: false, message: 'Failed to process draft review.' });
    }
};
exports.approveReviewDraft = approveReviewDraft;
const getAntiCheatViolations = async (_req, res) => {
    try {
        const cancelledAttempts = await attempt_model_1.AttemptModel.find({ status: 'CANCELLED' })
            .populate('userId', 'name email')
            .sort({ updatedAt: -1 });
        return res.status(200).json({ success: true, data: { violations: cancelledAttempts } });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to fetch anti-cheat violations.' });
    }
};
exports.getAntiCheatViolations = getAntiCheatViolations;
const getAuditLogs = async (_req, res) => {
    try {
        const logs = await admin_log_model_1.AdminLogModel.find({}).sort({ createdAt: -1 }).limit(50).populate('adminId', 'name email');
        return res.status(200).json({ success: true, data: { logs } });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to fetch audit logs.' });
    }
};
exports.getAuditLogs = getAuditLogs;
