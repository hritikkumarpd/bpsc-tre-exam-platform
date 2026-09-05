"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueMockTest = generateUniqueMockTest;
const mongoose_1 = __importDefault(require("mongoose"));
const question_model_1 = require("../models/question.model");
const mock_test_model_1 = require("../models/mock-test.model");
const mock_test_question_model_1 = require("../models/mock-test-question.model");
async function generateUniqueMockTest(options) {
    const { title, slug, exam, description, durationMinutes = 150, negativeMarking = 0, releaseAt, createdBy } = options;
    // 1. Fetch all question IDs already used in previous Mock Tests
    const usedMockQuestions = await mock_test_question_model_1.MockTestQuestionModel.find({}).select('questionId');
    const usedQuestionIds = new Set(usedMockQuestions.map((mq) => mq.questionId.toString()));
    // 2. Query eligible candidates: matching exam, verified, NOT PYQ, NOT used in previous mocks
    const eligibleQuestions = await question_model_1.QuestionModel.find({
        exam,
        verificationStatus: 'VERIFIED',
        sourceType: { $ne: 'PYQ' }, // STRICT NO PYQ IN GENERATED MOCKS RULE
        _id: { $nin: Array.from(usedQuestionIds) },
    });
    // Filter out exact duplicate fingerprints
    const seenFingerprints = new Set();
    const uniqueEligibleQuestions = [];
    for (const q of eligibleQuestions) {
        if (!seenFingerprints.has(q.fingerprint)) {
            seenFingerprints.add(q.fingerprint);
            uniqueEligibleQuestions.push(q);
        }
    }
    // Check if we have sufficient unique questions
    if (uniqueEligibleQuestions.length < 150) {
        throw new Error(`Mock generation failed for ${exam}. Insufficient unique questions available in pool. ` +
            `Required: 150, Available Eligible Unique Questions: ${uniqueEligibleQuestions.length}. ` +
            `Add more verified non-PYQ questions to the pool before attempting generation.`);
    }
    // 3. Shuffle and pick top 150 questions
    const shuffled = [...uniqueEligibleQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 150);
    // 4. Create Mock Test record
    const mockTest = await mock_test_model_1.MockTestModel.create({
        title,
        slug,
        exam,
        description,
        totalQuestions: 150,
        totalMarks: 150,
        durationMinutes,
        negativeMarking,
        releaseAt,
        status: 'SCHEDULED',
        isPYQ: false,
        createdBy: createdBy ? new mongoose_1.default.Types.ObjectId(createdBy) : undefined,
    });
    // 5. Map 150 questions to MockTestQuestion collection preserving questionNumber 1..150
    const mockQuestionDocs = selectedQuestions.map((q, idx) => ({
        mockTestId: mockTest._id,
        questionId: q._id,
        questionNumber: idx + 1,
        sectionName: idx < 80 ? 'Computer Science Core' : idx < 120 ? 'General Studies' : 'Qualifying Language',
    }));
    await mock_test_question_model_1.MockTestQuestionModel.insertMany(mockQuestionDocs);
    return mockTest;
}
