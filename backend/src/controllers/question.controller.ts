import { Request, Response } from 'express';
import { z } from 'zod';
import { QuestionModel } from '../models/question.model';
import { QuestionFingerprintModel } from '../models/question-fingerprint.model';
import { checkDuplicateFingerprint, generateFingerprintHash } from '../services/fingerprint.service';

const questionSchema = z.object({
  questionText: z.string().min(10, 'Question text must be at least 10 characters'),
  options: z
    .array(
      z.object({
        key: z.enum(['A', 'B', 'C', 'D', 'E']),
        text: z.string().min(1, 'Option text cannot be empty'),
      })
    )
    .min(4, 'At least 4 options required'),
  correctAnswer: z.enum(['A', 'B', 'C', 'D', 'E']),
  explanation: z.string().min(5, 'Explanation required'),
  exam: z.enum(['STET_CSE', 'BPSC_TRE_CSE']),
  subject: z.string().min(2),
  topic: z.string().min(2),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('MEDIUM'),
  sourceType: z.enum(['PYQ', 'HUMAN_CREATED', 'AI_GENERATED', 'AI_INSPIRED']),
  sourceReference: z.string().optional(),
  verificationStatus: z.enum(['DRAFT', 'PENDING_REVIEW', 'VERIFIED', 'REJECTED']).optional(),
});

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const { exam, subject, topic, difficulty, sourceType, verificationStatus, page = '1', limit = '20' } = req.query;
    const filter: Record<string, unknown> = {};

    if (exam) filter.exam = exam;
    if (subject) filter.subject = subject;
    if (topic) filter.topic = topic;
    if (difficulty) filter.difficulty = difficulty;
    if (sourceType) filter.sourceType = sourceType;
    if (verificationStatus) filter.verificationStatus = verificationStatus;

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const [questions, total] = await Promise.all([
      QuestionModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      QuestionModel.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        questions,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (err) {
    console.error('[GET QUESTIONS ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch questions.' });
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found.' });
    }
    return res.status(200).json({ success: true, data: { question } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error retrieving question.' });
  }
};

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const parseResult = questionSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid question data',
        error: { code: 'INVALID_INPUT', details: parseResult.error.flatten() },
      });
    }

    const data = parseResult.data;

    // Check duplicate fingerprint
    const dupCheck = await checkDuplicateFingerprint(data.questionText);
    if (dupCheck.isExactDuplicate) {
      return res.status(409).json({
        success: false,
        message: 'Duplicate question detected. A question with identical content already exists.',
        error: { code: 'DUPLICATE_QUESTION', existingQuestionId: dupCheck.existingQuestionId },
      });
    }

    const question = await QuestionModel.create({
      ...data,
      fingerprint: dupCheck.fingerprintHash,
      createdBy: req.user?.id,
    });

    // Store fingerprint model
    await QuestionFingerprintModel.create({
      fingerprintHash: dupCheck.fingerprintHash,
      normalizedText: dupCheck.normalizedText,
      questionId: question._id,
    });

    return res.status(201).json({
      success: true,
      message: 'Question created successfully.',
      data: { question },
    });
  } catch (err) {
    console.error('[CREATE QUESTION ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Failed to save question.' });
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found.' });
    }

    if (req.body.questionText && req.body.questionText !== question.questionText) {
      const { hash, normalized } = generateFingerprintHash(req.body.questionText);
      question.fingerprint = hash;
      await QuestionFingerprintModel.updateOne(
        { questionId: question._id },
        { fingerprintHash: hash, normalizedText: normalized },
        { upsert: true }
      );
    }

    Object.assign(question, req.body);
    await question.save();

    return res.status(200).json({
      success: true,
      message: 'Question updated successfully.',
      data: { question },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update question.' });
  }
};

export const verifyQuestion = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    if (!['VERIFIED', 'REJECTED', 'DRAFT'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid verification status.' });
    }

    const question = await QuestionModel.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found.' });
    }

    question.verificationStatus = status;
    if (req.user?.id) {
      question.verifiedBy = req.user.id as unknown as import('mongoose').Types.ObjectId;
    }
    await question.save();

    return res.status(200).json({
      success: true,
      message: `Question status updated to ${status}.`,
      data: { question },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to verify question.' });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const question = await QuestionModel.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found.' });
    }
    await QuestionFingerprintModel.deleteOne({ questionId: question._id });
    return res.status(200).json({ success: true, message: 'Question deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete question.' });
  }
};

export const bulkImportQuestions = async (req: Request, res: Response) => {
  try {
    const { questions, exam, sourceType } = req.body;
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ success: false, message: 'A non-empty questions array is required.' });
    }

    const targetExam = exam || 'BPSC_TRE_CSE';
    const source = sourceType || 'HUMAN_CREATED';
    let imported = 0;
    let skippedDuplicates = 0;

    for (const q of questions) {
      if (!q.questionText || !q.options || q.options.length < 2) continue;

      const { hash, normalized } = generateFingerprintHash(q.questionText);
      const existing = await QuestionModel.findOne({ fingerprint: hash });

      if (existing) {
        skippedDuplicates++;
        continue;
      }

      const newQ = await QuestionModel.create({
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer || 'A',
        explanation: q.explanation || 'Verified reference answer.',
        exam: targetExam,
        subject: q.subject || 'Computer Science Core',
        topic: q.topic || 'General Computer Science',
        difficulty: q.difficulty || 'MEDIUM',
        sourceType: source,
        verificationStatus: 'VERIFIED',
        fingerprint: hash,
        createdBy: req.user?.id,
        verifiedBy: req.user?.id,
      });

      await QuestionFingerprintModel.create({
        fingerprintHash: hash,
        normalizedText: normalized,
        questionId: newQ._id,
      });

      imported++;
    }

    return res.status(201).json({
      success: true,
      message: `Successfully imported ${imported} questions into the Question Bank. (${skippedDuplicates} duplicates skipped).`,
      data: { imported, skippedDuplicates },
    });
  } catch (err) {
    console.error('[BULK IMPORT ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Failed to bulk import questions.' });
  }
};
