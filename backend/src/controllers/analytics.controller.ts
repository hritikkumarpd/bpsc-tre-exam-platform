import { Request, Response } from 'express';
import { AttemptModel } from '../models/attempt.model';
import { BookmarkModel } from '../models/bookmark.model';
import { MistakeModel } from '../models/mistake.model';

export const getDashboardAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Authentication required.' });

    const attempts = await AttemptModel.find({ userId }).sort({ createdAt: -1 });
    const completedAttempts = attempts.filter((a) => a.status === 'COMPLETED');

    const testsAttempted = completedAttempts.length;
    const questionsSolved = completedAttempts.reduce((acc, a) => acc + a.correctCount + a.wrongCount, 0);
    const avgAccuracy =
      completedAttempts.length > 0
        ? Math.round(
            (completedAttempts.reduce((acc, a) => acc + a.accuracyPercentage, 0) / completedAttempts.length) * 10
          ) / 10
        : 0;

    const bestScore = completedAttempts.length > 0 ? Math.max(...completedAttempts.map((a) => a.score)) : 0;

    const bookmarksCount = await BookmarkModel.countDocuments({ userId });
    const mistakesCount = await MistakeModel.countDocuments({ userId });

    return res.status(200).json({
      success: true,
      data: {
        summary: {
          testsAttempted,
          questionsSolved,
          averageAccuracy: avgAccuracy,
          bestScore,
          bookmarksCount,
          mistakesCount,
        },
        recentAttempts: attempts.slice(0, 5),
        weakTopics: ['CPU Scheduling Deadlocks', 'SQL Outer Joins', 'Subnetting Calculation'],
      },
    });
  } catch (err) {
    console.error('[DASHBOARD ANALYTICS ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch student dashboard analytics.' });
  }
};

export const getBookmarks = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const bookmarks = await BookmarkModel.find({ userId }).populate('questionId');
    return res.status(200).json({ success: true, data: { bookmarks } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch bookmarked questions.' });
  }
};

export const addBookmark = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { questionId, note } = req.body;
    const bookmark = await BookmarkModel.create({ userId, questionId, note });
    return res.status(201).json({ success: true, message: 'Question bookmarked.', data: { bookmark } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to bookmark question.' });
  }
};

export const getMistakes = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const mistakes = await MistakeModel.find({ userId }).populate('questionId');
    return res.status(200).json({ success: true, data: { mistakes } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch mistake notebook.' });
  }
};
