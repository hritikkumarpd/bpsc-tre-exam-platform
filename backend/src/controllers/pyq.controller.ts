import { Request, Response } from 'express';
import { PYQPaperModel } from '../models/pyq-paper.model';
import { PYQQuestionModel } from '../models/pyq-question.model';
import { QuestionModel } from '../models/question.model';
import { QuestionFingerprintModel } from '../models/question-fingerprint.model';
import { SubjectModel } from '../models/subject.model';
import { parseQuestionPaperText } from '../services/pdf-parser.service';
import { generateFingerprintHash } from '../services/fingerprint.service';

export const getPYQPapers = async (req: Request, res: Response) => {
  try {
    const { exam, year } = req.query;
    const filter: Record<string, unknown> = { isPublished: true };
    if (exam) filter.exam = exam;
    if (year) filter.year = parseInt(year as string, 10);

    const papers = await PYQPaperModel.find(filter).sort({ year: -1 });
    return res.status(200).json({ success: true, data: { papers } });
  } catch (err) {
    console.error('[GET PYQS ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch PYQ papers.' });
  }
};

export const getPYQPaperById = async (req: Request, res: Response) => {
  try {
    const paper = await PYQPaperModel.findById(req.params.id);
    if (!paper) {
      return res.status(404).json({ success: false, message: 'PYQ Paper not found.' });
    }

    // Fetch questions maintaining original paper ordering
    const pyqQuestions = await PYQQuestionModel.find({ pyqPaperId: paper._id })
      .sort({ questionNumber: 1 })
      .populate('questionId');

    return res.status(200).json({
      success: true,
      data: {
        paper,
        questions: pyqQuestions.map((pq) => ({
          questionNumber: pq.questionNumber,
          question: pq.questionId,
        })),
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error retrieving PYQ paper details.' });
  }
};

export const createPYQPaper = async (req: Request, res: Response) => {
  try {
    const { title, slug, exam, year, edition, description, totalQuestions, durationMinutes } = req.body;
    const paper = await PYQPaperModel.create({
      title,
      slug,
      exam,
      year,
      edition,
      description,
      totalQuestions: totalQuestions || 150,
      totalMarks: totalQuestions || 150,
      durationMinutes: durationMinutes || 150,
      isPublished: true,
    });

    return res.status(201).json({ success: true, message: 'PYQ paper created.', data: { paper } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create PYQ paper.' });
  }
};

export const addQuestionToPYQ = async (req: Request, res: Response) => {
  try {
    const { pyqPaperId, questionId, questionNumber } = req.body;
    const pyqQuestion = await PYQQuestionModel.create({
      pyqPaperId,
      questionId,
      questionNumber,
    });

    return res.status(201).json({ success: true, message: 'Question linked to PYQ paper.', data: { pyqQuestion } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to link question to PYQ.' });
  }
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pdfPkg = require('pdf-parse');
import { parseCleanEnglishQuestions } from '../services/english-pyq-parser.service';

export const parsePDFQuestionPaper = async (req: Request, res: Response) => {
  try {
    const { paperText } = req.body;
    if (!paperText || typeof paperText !== 'string') {
      return res.status(400).json({ success: false, message: 'Question paper text is required.' });
    }

    const parsedQuestions = parseCleanEnglishQuestions(paperText);
    return res.status(200).json({
      success: true,
      message: `Successfully parsed ${parsedQuestions.length} English questions with step-by-step solutions.`,
      data: {
        totalParsed: parsedQuestions.length,
        questions: parsedQuestions,
      },
    });
  } catch (err) {
    console.error('[PARSE PDF ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Failed to parse question paper text.' });
  }
};

export const uploadAndParsePDFFile = async (req: Request, res: Response) => {
  try {
    const { pdfBase64, fileName } = req.body;
    if (!pdfBase64 || typeof pdfBase64 !== 'string') {
      return res.status(400).json({ success: false, message: 'PDF file base64 data is required.' });
    }

    // Strip optional data:application/pdf;base64, header prefix
    const cleanBase64 = pdfBase64.replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');
    const uint8Array = new Uint8Array(buffer);

    const parser = new pdfPkg.PDFParse(uint8Array);
    const result = await parser.getText();
    const fullText = result.pages ? result.pages.map((p: any) => p.text).join('\n') : '';

    if (!fullText.trim()) {
      return res.status(400).json({ success: false, message: 'Could not extract readable text from the uploaded PDF.' });
    }

    const parsedQuestions = parseCleanEnglishQuestions(fullText);

    return res.status(200).json({
      success: true,
      message: `Extracted ${parsedQuestions.length} English questions with step-by-step solutions from ${fileName || 'PDF file'}.`,
      data: {
        fileName: fileName || 'Uploaded Paper',
        totalParsed: parsedQuestions.length,
        questions: parsedQuestions,
      },
    });
  } catch (err) {
    console.error('[UPLOAD PDF ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Failed to process and parse PDF file.' });
  }
};

export const importPYQPaper = async (req: Request, res: Response) => {
  try {
    const { title, slug, exam, year, edition, description, questions } = req.body;
    if (!title || !exam || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ success: false, message: 'Title, exam, and non-empty questions array are required.' });
    }

    // Get a default subject for questions if not specified
    const defaultSubject = await SubjectModel.findOne({});
    const subjectName = defaultSubject ? defaultSubject.name : 'Computer Science General';

    // 1. Create PYQ Paper
    const paper = await PYQPaperModel.create({
      title,
      slug: slug || `${exam.toLowerCase().replace(/_/g, '-')}-${year}-${edition || 1}`,
      exam,
      year: year || new Date().getFullYear(),
      edition: edition || 'Official Exam',
      description: description || `Official ${exam} ${year} Question Paper`,
      totalQuestions: questions.length,
      totalMarks: questions.length,
      durationMinutes: 150,
      isPublished: true,
    });

    const createdQuestions = [];

    // 2. Insert Questions & link to PYQ Paper
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const qNum = q.questionNumber || i + 1;
      const { hash, normalized } = generateFingerprintHash(q.questionText);

      // Check if question already exists in DB
      let question = await QuestionModel.findOne({ fingerprint: hash });

      if (!question) {
        question = await QuestionModel.create({
          questionText: q.questionText,
          options: q.options,
          correctAnswer: q.correctAnswer || 'A',
          explanation: q.explanation || 'Official PYQ Reference Answer',
          exam,
          subject: q.subject || subjectName,
          topic: q.topic || 'General Computer Science',
          difficulty: 'MEDIUM',
          verificationStatus: 'VERIFIED',
          sourceType: 'PYQ',
          sourceReference: `${paper.title} (Q${qNum})`,
          fingerprint: hash,
          createdBy: req.user?.id,
          verifiedBy: req.user?.id,
        });

        await QuestionFingerprintModel.create({
          fingerprintHash: hash,
          normalizedText: normalized,
          questionId: question._id,
        });
      }

      await PYQQuestionModel.create({
        pyqPaperId: paper._id,
        questionId: question._id,
        questionNumber: qNum,
      });

      createdQuestions.push(question);
    }

    return res.status(201).json({
      success: true,
      message: `PYQ Paper "${paper.title}" with ${createdQuestions.length} questions imported successfully!`,
      data: { paper, questionCount: createdQuestions.length },
    });
  } catch (err) {
    console.error('[IMPORT PYQ ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Failed to import PYQ paper.' });
  }
};

