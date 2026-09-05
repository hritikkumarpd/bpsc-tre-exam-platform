"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMistakes = exports.addBookmark = exports.getBookmarks = exports.getDashboardAnalytics = void 0;
const attempt_model_1 = require("../models/attempt.model");
const bookmark_model_1 = require("../models/bookmark.model");
const mistake_model_1 = require("../models/mistake.model");
const getDashboardAnalytics = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ success: false, message: 'Authentication required.' });
        const attempts = await attempt_model_1.AttemptModel.find({ userId }).sort({ createdAt: -1 });
        const completedAttempts = attempts.filter((a) => a.status === 'COMPLETED');
        const testsAttempted = completedAttempts.length;
        const questionsSolved = completedAttempts.reduce((acc, a) => acc + a.correctCount + a.wrongCount, 0);
        const avgAccuracy = completedAttempts.length > 0
            ? Math.round((completedAttempts.reduce((acc, a) => acc + a.accuracyPercentage, 0) / completedAttempts.length) * 10) / 10
            : 0;
        const bestScore = completedAttempts.length > 0 ? Math.max(...completedAttempts.map((a) => a.score)) : 0;
        const bookmarksCount = await bookmark_model_1.BookmarkModel.countDocuments({ userId });
        const mistakesCount = await mistake_model_1.MistakeModel.countDocuments({ userId });
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
    }
    catch (err) {
        console.error('[DASHBOARD ANALYTICS ERROR]:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch student dashboard analytics.' });
    }
};
exports.getDashboardAnalytics = getDashboardAnalytics;
const getBookmarks = async (req, res) => {
    try {
        const userId = req.user?.id;
        const bookmarks = await bookmark_model_1.BookmarkModel.find({ userId }).populate('questionId');
        return res.status(200).json({ success: true, data: { bookmarks } });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to fetch bookmarked questions.' });
    }
};
exports.getBookmarks = getBookmarks;
const addBookmark = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { questionId, note } = req.body;
        const bookmark = await bookmark_model_1.BookmarkModel.create({ userId, questionId, note });
        return res.status(201).json({ success: true, message: 'Question bookmarked.', data: { bookmark } });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to bookmark question.' });
    }
};
exports.addBookmark = addBookmark;
const getMistakes = async (req, res) => {
    try {
        const userId = req.user?.id;
        const mistakes = await mistake_model_1.MistakeModel.find({ userId }).populate('questionId');
        return res.status(200).json({ success: true, data: { mistakes } });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to fetch mistake notebook.' });
    }
};
exports.getMistakes = getMistakes;
