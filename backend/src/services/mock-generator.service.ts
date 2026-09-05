import mongoose from 'mongoose';
import { QuestionModel, IQuestion } from '../models/question.model';
import { MockTestModel, IMockTest } from '../models/mock-test.model';
import { MockTestQuestionModel } from '../models/mock-test-question.model';
import { ExamCategory } from '../types';

export interface MockGeneratorOptions {
  title: string;
  slug: string;
  exam: ExamCategory;
  description: string;
  durationMinutes?: number;
  negativeMarking?: number;
  releaseAt: Date;
  createdBy?: string;
}

export async function generateUniqueMockTest(options: MockGeneratorOptions): Promise<IMockTest> {
  const { title, slug, exam, description, durationMinutes = 150, negativeMarking = 0, releaseAt, createdBy } = options;

  // 1. Fetch all question IDs already used in previous Mock Tests
  const usedMockQuestions = await MockTestQuestionModel.find({}).select('questionId');
  const usedQuestionIds = new Set(usedMockQuestions.map((mq) => mq.questionId.toString()));

  // 2. Query eligible candidates: matching exam, verified, NOT PYQ, NOT used in previous mocks
  const eligibleQuestions = await QuestionModel.find({
    exam,
    verificationStatus: 'VERIFIED',
    sourceType: { $ne: 'PYQ' }, // STRICT NO PYQ IN GENERATED MOCKS RULE
    _id: { $nin: Array.from(usedQuestionIds) },
  });

  // Filter out exact duplicate fingerprints
  const seenFingerprints = new Set<string>();
  const uniqueEligibleQuestions: IQuestion[] = [];

  for (const q of eligibleQuestions) {
    if (!seenFingerprints.has(q.fingerprint)) {
      seenFingerprints.add(q.fingerprint);
      uniqueEligibleQuestions.push(q);
    }
  }

  // Check if we have sufficient unique questions
  if (uniqueEligibleQuestions.length < 150) {
    throw new Error(
      `Mock generation failed for ${exam}. Insufficient unique questions available in pool. ` +
        `Required: 150, Available Eligible Unique Questions: ${uniqueEligibleQuestions.length}. ` +
        `Add more verified non-PYQ questions to the pool before attempting generation.`
    );
  }

  // 3. Shuffle and pick top 150 questions
  const shuffled = [...uniqueEligibleQuestions].sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffled.slice(0, 150);

  // 4. Create Mock Test record
  const mockTest = await MockTestModel.create({
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
    createdBy: createdBy ? new mongoose.Types.ObjectId(createdBy) : undefined,
  });

  // 5. Map 150 questions to MockTestQuestion collection preserving questionNumber 1..150
  const mockQuestionDocs = selectedQuestions.map((q, idx) => ({
    mockTestId: mockTest._id,
    questionId: q._id,
    questionNumber: idx + 1,
    sectionName: idx < 80 ? 'Computer Science Core' : idx < 120 ? 'General Studies' : 'Qualifying Language',
  }));

  await MockTestQuestionModel.insertMany(mockQuestionDocs);

  return mockTest;
}
