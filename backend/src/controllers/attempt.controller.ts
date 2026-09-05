import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { AttemptModel } from '../models/attempt.model';
import { AttemptAnswerModel } from '../models/attempt-answer.model';
import { QuestionModel } from '../models/question.model';
import { MockTestModel } from '../models/mock-test.model';
import { MockTestQuestionModel } from '../models/mock-test-question.model';
import { PYQPaperModel } from '../models/pyq-paper.model';
import { PYQQuestionModel } from '../models/pyq-question.model';

export const startAttempt = async (req: Request, res: Response) => {
  try {
    const { mockTestId, pyqPaperId, attemptType } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    // Check existing in-progress attempt to prevent duplicate active sessions
    const existingAttempt = await AttemptModel.findOne({
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
      const mock = await MockTestModel.findById(mockTestId);
      if (!mock) return res.status(404).json({ success: false, message: 'Mock test not found.' });
      totalQuestions = mock.totalQuestions;
      durationSeconds = mock.durationMinutes * 60;
    } else if (attemptType === 'PYQ' && pyqPaperId) {
      const pyq = await PYQPaperModel.findById(pyqPaperId);
      if (!pyq) return res.status(404).json({ success: false, message: 'PYQ paper not found.' });
      totalQuestions = pyq.totalQuestions;
      durationSeconds = pyq.durationMinutes * 60;
    }

    const attempt = await AttemptModel.create({
      userId,
      mockTestId: mockTestId ? new mongoose.Types.ObjectId(mockTestId) : undefined,
      pyqPaperId: pyqPaperId ? new mongoose.Types.ObjectId(pyqPaperId) : undefined,
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
  } catch (err) {
    console.error('[START ATTEMPT ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Failed to start test attempt.' });
  }
};

export const getAttemptState = async (req: Request, res: Response) => {
  try {
    const attempt = await AttemptModel.findById(req.params.id);
    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Attempt not found.' });
    }

    if (attempt.userId.toString() !== req.user?.id && req.user?.role !== 'ADMIN' && req.user?.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ success: false, message: 'Forbidden. Attempt does not belong to user.' });
    }

    // Fetch question list for attempt
    let questionsList: Array<{ questionNumber: number; question: unknown }> = [];
    let negativeMarking = 0;

    if (attempt.mockTestId) {
      const mock = await MockTestModel.findById(attempt.mockTestId);
      if (mock) negativeMarking = mock.negativeMarking;

      const mockQuestions = await MockTestQuestionModel.find({ mockTestId: attempt.mockTestId })
        .sort({ questionNumber: 1 })
        .populate('questionId');
      
      questionsList = mockQuestions.map((mq) => ({
        questionNumber: mq.questionNumber,
        question: mq.questionId,
      }));
    } else if (attempt.pyqPaperId) {
      const pyqQuestions = await PYQQuestionModel.find({ pyqPaperId: attempt.pyqPaperId })
        .sort({ questionNumber: 1 })
        .populate('questionId');

      questionsList = pyqQuestions.map((pq) => ({
        questionNumber: pq.questionNumber,
        question: pq.questionId,
      }));
    }

    const savedAnswers = await AttemptAnswerModel.find({ attemptId: attempt._id });

    return res.status(200).json({
      success: true,
      data: {
        attempt,
        negativeMarking,
        questions: questionsList,
        savedAnswers,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error fetching attempt state.' });
  }
};

export const saveAnswer = async (req: Request, res: Response) => {
  try {
    const { questionId, questionNumber, selectedOption, timeSpentSeconds, markedForReview } = req.body;
    const attempt = await AttemptModel.findById(req.params.id);

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Attempt not found.' });
    }

    if (attempt.userId.toString() !== req.user?.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized attempt mutation.' });
    }

    if (attempt.status !== 'IN_PROGRESS') {
      return res.status(400).json({ success: false, message: `Attempt is already ${attempt.status.toLowerCase()}.` });
    }

    await AttemptAnswerModel.findOneAndUpdate(
      { attemptId: attempt._id, questionNumber },
      {
        questionId,
        selectedOption,
        markedForReview: !!markedForReview,
        timeSpentSeconds: timeSpentSeconds || 0,
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ success: true, message: 'Answer saved.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to auto-save answer.' });
  }
};

export const submitAttempt = async (req: Request, res: Response) => {
  try {
    const attempt = await AttemptModel.findById(req.params.id);
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
      const mock = await MockTestModel.findById(attempt.mockTestId);
      if (mock) negativeMarking = mock.negativeMarking || 0;
    }

    // Fetch user answers
    const userAnswers = await AttemptAnswerModel.find({ attemptId: attempt._id });

    // Fetch question list
    let questionIds: mongoose.Types.ObjectId[] = [];
    if (attempt.mockTestId) {
      const mq = await MockTestQuestionModel.find({ mockTestId: attempt.mockTestId }).sort({ questionNumber: 1 });
      questionIds = mq.map((q) => q.questionId);
    } else if (attempt.pyqPaperId) {
      const pq = await PYQQuestionModel.find({ pyqPaperId: attempt.pyqPaperId }).sort({ questionNumber: 1 });
      questionIds = pq.map((q) => q.questionId);
    }

    const questions = await QuestionModel.find({ _id: { $in: questionIds } });
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

        if (isCorrect) correctCount++;
        else wrongCount++;
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
  } catch (err) {
    console.error('[SUBMIT ATTEMPT ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Failed to calculate authoritative test score.' });
  }
};
