"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAttempt = exports.saveAnswer = exports.getAttemptState = exports.startAttempt = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const attempt_model_1 = require("../models/attempt.model");
const attempt_answer_model_1 = require("../models/attempt-answer.model");
const question_model_1 = require("../models/question.model");
const mock_test_model_1 = require("../models/mock-test.model");
const mock_test_question_model_1 = require("../models/mock-test-question.model");
const pyq_paper_model_1 = require("../models/pyq-paper.model");
const pyq_question_model_1 = require("../models/pyq-question.model");
const startAttempt = async (req, res) => {
    try {
        const { mockTestId, pyqPaperId, attemptType } = req.body;
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Authentication required.' });
        }
        // Check existing in-progress attempt to prevent duplicate active sessions
        const existingAttempt = await attempt_model_1.AttemptModel.findOne({
            userId,
            status: 'IN_PROGRESS',
        });
        if (existingAttempt) {
            return res.status(200).json({
                success: true,
                message: 'Resuming existing active test attempt.',
                data: { attempt: existingAttempt },
            });
        }
        let totalQuestions = 150;
        let durationSeconds = 150 * 60;
        if (attemptType === 'MOCK' && mockTestId) {
            const mock = await mock_test_model_1.MockTestModel.findById(mockTestId);
            if (!mock)
                return res.status(404).json({ success: false, message: 'Mock test not found.' });
            totalQuestions = mock.totalQuestions;
            durationSeconds = mock.durationMinutes * 60;
        }
        else if (attemptType === 'PYQ' && pyqPaperId) {
            const pyq = await pyq_paper_model_1.PYQPaperModel.findById(pyqPaperId);
            if (!pyq)
                return res.status(404).json({ success: false, message: 'PYQ paper not found.' });
            totalQuestions = pyq.totalQuestions;
            durationSeconds = pyq.durationMinutes * 60;
        }
        const attempt = await attempt_model_1.AttemptModel.create({
            userId,
            mockTestId: mockTestId ? new mongoose_1.default.Types.ObjectId(mockTestId) : undefined,
            pyqPaperId: pyqPaperId ? new mongoose_1.default.Types.ObjectId(pyqPaperId) : undefined,
            attemptType: attemptType || 'MOCK',
            status: 'IN_PROGRESS',
            focusViolations: 0,
            totalMarks: totalQuestions,
            durationSeconds,
            startedAt: new Date(),
        });
        return res.status(201).json({
            success: true,
            message: 'Test attempt started.',
            data: { attempt },
        });
    }
    catch (err) {
        console.error('[START ATTEMPT ERROR]:', err);
        return res.status(500).json({ success: false, message: 'Failed to start test attempt.' });
    }
};
exports.startAttempt = startAttempt;
const getAttemptState = async (req, res) => {
    try {
        const attempt = await attempt_model_1.AttemptModel.findById(req.params.id);
        if (!attempt) {
            return res.status(404).json({ success: false, message: 'Attempt not found.' });
        }
        if (attempt.userId.toString() !== req.user?.id && req.user?.role !== 'ADMIN' && req.user?.role !== 'SUPER_ADMIN') {
            return res.status(403).json({ success: false, message: 'Forbidden. Attempt does not belong to user.' });
        }
        // Fetch question list for attempt
        let questionsList = [];
        let negativeMarking = 0;
        if (attempt.mockTestId) {
            const mock = await mock_test_model_1.MockTestModel.findById(attempt.mockTestId);
            if (mock)
                negativeMarking = mock.negativeMarking;
            const mockQuestions = await mock_test_question_model_1.MockTestQuestionModel.find({ mockTestId: attempt.mockTestId })
                .sort({ questionNumber: 1 })
                .populate('questionId');
            questionsList = mockQuestions.map((mq) => ({
                questionNumber: mq.questionNumber,
                question: mq.questionId,
            }));
        }
        else if (attempt.pyqPaperId) {
            const pyqQuestions = await pyq_question_model_1.PYQQuestionModel.find({ pyqPaperId: attempt.pyqPaperId })
                .sort({ questionNumber: 1 })
                .populate('questionId');
            questionsList = pyqQuestions.map((pq) => ({
                questionNumber: pq.questionNumber,
                question: pq.questionId,
            }));
        }
        const savedAnswers = await attempt_answer_model_1.AttemptAnswerModel.find({ attemptId: attempt._id });
        return res.status(200).json({
            success: true,
            data: {
                attempt,
                negativeMarking,
                questions: questionsList,
                savedAnswers,
            },
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Error fetching attempt state.' });
    }
};
exports.getAttemptState = getAttemptState;
const saveAnswer = async (req, res) => {
    try {
        const { questionId, questionNumber, selectedOption, timeSpentSeconds, markedForReview } = req.body;
        const attempt = await attempt_model_1.AttemptModel.findById(req.params.id);
        if (!attempt) {
            return res.status(404).json({ success: false, message: 'Attempt not found.' });
        }
        if (attempt.userId.toString() !== req.user?.id) {
            return res.status(403).json({ success: false, message: 'Unauthorized attempt mutation.' });
        }
        if (attempt.status !== 'IN_PROGRESS') {
            return res.status(400).json({ success: false, message: `Attempt is already ${attempt.status.toLowerCase()}.` });
        }
        await attempt_answer_model_1.AttemptAnswerModel.findOneAndUpdate({ attemptId: attempt._id, questionNumber }, {
            questionId,
            selectedOption,
            markedForReview: !!markedForReview,
            timeSpentSeconds: timeSpentSeconds || 0,
        }, { upsert: true, new: true });
        return res.status(200).json({ success: true, message: 'Answer saved.' });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to auto-save answer.' });
    }
};
exports.saveAnswer = saveAnswer;
const submitAttempt = async (req, res) => {
    try {
        const attempt = await attempt_model_1.AttemptModel.findById(req.params.id);
        if (!attempt) {
            return res.status(404).json({ success: false, message: 'Attempt not found.' });
        }
        if (attempt.userId.toString() !== req.user?.id) {
            return res.status(403).json({ success: false, message: 'Unauthorized attempt submission.' });
        }
        if (attempt.status === 'CANCELLED') {
            return res.status(400).json({
                success: false,
                message: 'Attempt was cancelled due to focus violation limit.',
            });
        }
        if (attempt.status === 'COMPLETED') {
            return res.status(400).json({
                success: false,
                message: 'Attempt has already been submitted.',
            });
        }
        // Determine negative marking rule
        let negativeMarking = 0;
        if (attempt.mockTestId) {
            const mock = await mock_test_model_1.MockTestModel.findById(attempt.mockTestId);
            if (mock)
                negativeMarking = mock.negativeMarking || 0;
        }
        // Fetch user answers
        const userAnswers = await attempt_answer_model_1.AttemptAnswerModel.find({ attemptId: attempt._id });
        // Fetch question list
        let questionIds = [];
        if (attempt.mockTestId) {
            const mq = await mock_test_question_model_1.MockTestQuestionModel.find({ mockTestId: attempt.mockTestId }).sort({ questionNumber: 1 });
            questionIds = mq.map((q) => q.questionId);
        }
        else if (attempt.pyqPaperId) {
            const pq = await pyq_question_model_1.PYQQuestionModel.find({ pyqPaperId: attempt.pyqPaperId }).sort({ questionNumber: 1 });
            questionIds = pq.map((q) => q.questionId);
        }
        const questions = await question_model_1.QuestionModel.find({ _id: { $in: questionIds } });
        const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));
        let correctCount = 0;
        let wrongCount = 0;
        let skippedCount = 0;
        userAnswers.forEach((ans) => {
            if (!ans.selectedOption) {
                skippedCount++;
                return;
            }
            const q = questionMap.get(ans.questionId.toString());
            if (q) {
                const isCorrect = ans.selectedOption === q.correctAnswer;
                ans.isCorrect = isCorrect;
                ans.markAwarded = isCorrect ? 1 : negativeMarking > 0 ? -negativeMarking : 0;
                ans.save();
                if (isCorrect)
                    correctCount++;
                else
                    wrongCount++;
            }
        });
        const totalQuestions = attempt.totalMarks || 150;
        skippedCount = totalQuestions - (correctCount + wrongCount);
        const rawScore = correctCount * 1 - wrongCount * negativeMarking;
        const finalScore = Math.max(0, Math.round(rawScore * 100) / 100);
        const attemptedCount = correctCount + wrongCount;
        const accuracyPercentage = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 1000) / 10 : 0;
        attempt.status = 'COMPLETED';
        attempt.score = finalScore;
        attempt.correctCount = correctCount;
        attempt.wrongCount = wrongCount;
        attempt.skippedCount = skippedCount;
        attempt.accuracyPercentage = accuracyPercentage;
        attempt.submittedAt = new Date();
        await attempt.save();
        return res.status(200).json({
            success: true,
            message: 'Test submitted and score calculated authoritatively.',
            data: {
                score: finalScore,
                totalMarks: attempt.totalMarks,
                correctCount,
                wrongCount,
                skippedCount,
                accuracyPercentage,
                submittedAt: attempt.submittedAt,
            },
        });
    }
    catch (err) {
        console.error('[SUBMIT ATTEMPT ERROR]:', err);
        return res.status(500).json({ success: false, message: 'Failed to calculate authoritative test score.' });
    }
};
exports.submitAttempt = submitAttempt;
