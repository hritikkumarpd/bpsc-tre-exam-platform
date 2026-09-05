"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importPYQPaper = exports.uploadAndParsePDFFile = exports.parsePDFQuestionPaper = exports.addQuestionToPYQ = exports.createPYQPaper = exports.getPYQPaperById = exports.getPYQPapers = void 0;
const pyq_paper_model_1 = require("../models/pyq-paper.model");
const pyq_question_model_1 = require("../models/pyq-question.model");
const question_model_1 = require("../models/question.model");
const question_fingerprint_model_1 = require("../models/question-fingerprint.model");
const subject_model_1 = require("../models/subject.model");
const fingerprint_service_1 = require("../services/fingerprint.service");
const getPYQPapers = async (req, res) => {
    try {
        const { exam, year } = req.query;
        const filter = { isPublished: true };
        if (exam)
            filter.exam = exam;
        if (year)
            filter.year = parseInt(year, 10);
        const papers = await pyq_paper_model_1.PYQPaperModel.find(filter).sort({ year: -1 });
        return res.status(200).json({ success: true, data: { papers } });
    }
    catch (err) {
        console.error('[GET PYQS ERROR]:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch PYQ papers.' });
    }
};
exports.getPYQPapers = getPYQPapers;
const getPYQPaperById = async (req, res) => {
    try {
        const paper = await pyq_paper_model_1.PYQPaperModel.findById(req.params.id);
        if (!paper) {
            return res.status(404).json({ success: false, message: 'PYQ Paper not found.' });
        }
        // Fetch questions maintaining original paper ordering
        const pyqQuestions = await pyq_question_model_1.PYQQuestionModel.find({ pyqPaperId: paper._id })
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
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Error retrieving PYQ paper details.' });
    }
};
exports.getPYQPaperById = getPYQPaperById;
const createPYQPaper = async (req, res) => {
    try {
        const { title, slug, exam, year, edition, description, totalQuestions, durationMinutes } = req.body;
        const paper = await pyq_paper_model_1.PYQPaperModel.create({
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
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to create PYQ paper.' });
    }
};
exports.createPYQPaper = createPYQPaper;
const addQuestionToPYQ = async (req, res) => {
    try {
        const { pyqPaperId, questionId, questionNumber } = req.body;
        const pyqQuestion = await pyq_question_model_1.PYQQuestionModel.create({
            pyqPaperId,
            questionId,
            questionNumber,
        });
        return res.status(201).json({ success: true, message: 'Question linked to PYQ paper.', data: { pyqQuestion } });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to link question to PYQ.' });
    }
};
exports.addQuestionToPYQ = addQuestionToPYQ;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pdfPkg = require('pdf-parse');
const english_pyq_parser_service_1 = require("../services/english-pyq-parser.service");
const parsePDFQuestionPaper = async (req, res) => {
    try {
        const { paperText } = req.body;
        if (!paperText || typeof paperText !== 'string') {
            return res.status(400).json({ success: false, message: 'Question paper text is required.' });
        }
        const parsedQuestions = (0, english_pyq_parser_service_1.parseCleanEnglishQuestions)(paperText);
        return res.status(200).json({
            success: true,
            message: `Successfully parsed ${parsedQuestions.length} English questions with step-by-step solutions.`,
            data: {
                totalParsed: parsedQuestions.length,
                questions: parsedQuestions,
            },
        });
    }
    catch (err) {
        console.error('[PARSE PDF ERROR]:', err);
        return res.status(500).json({ success: false, message: 'Failed to parse question paper text.' });
    }
};
exports.parsePDFQuestionPaper = parsePDFQuestionPaper;
const uploadAndParsePDFFile = async (req, res) => {
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
        const fullText = result.pages ? result.pages.map((p) => p.text).join('\n') : '';
        if (!fullText.trim()) {
            return res.status(400).json({ success: false, message: 'Could not extract readable text from the uploaded PDF.' });
        }
        const parsedQuestions = (0, english_pyq_parser_service_1.parseCleanEnglishQuestions)(fullText);
        return res.status(200).json({
            success: true,
            message: `Extracted ${parsedQuestions.length} English questions with step-by-step solutions from ${fileName || 'PDF file'}.`,
            data: {
                fileName: fileName || 'Uploaded Paper',
                totalParsed: parsedQuestions.length,
                questions: parsedQuestions,
            },
        });
    }
    catch (err) {
        console.error('[UPLOAD PDF ERROR]:', err);
        return res.status(500).json({ success: false, message: 'Failed to process and parse PDF file.' });
    }
};
exports.uploadAndParsePDFFile = uploadAndParsePDFFile;
const importPYQPaper = async (req, res) => {
    try {
        const { title, slug, exam, year, edition, description, questions } = req.body;
        if (!title || !exam || !questions || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ success: false, message: 'Title, exam, and non-empty questions array are required.' });
        }
        // Get a default subject for questions if not specified
        const defaultSubject = await subject_model_1.SubjectModel.findOne({});
        const subjectName = defaultSubject ? defaultSubject.name : 'Computer Science General';
        // 1. Create PYQ Paper
        const paper = await pyq_paper_model_1.PYQPaperModel.create({
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
            const { hash, normalized } = (0, fingerprint_service_1.generateFingerprintHash)(q.questionText);
            // Check if question already exists in DB
            let question = await question_model_1.QuestionModel.findOne({ fingerprint: hash });
            if (!question) {
                question = await question_model_1.QuestionModel.create({
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
                await question_fingerprint_model_1.QuestionFingerprintModel.create({
                    fingerprintHash: hash,
                    normalizedText: normalized,
                    questionId: question._id,
                });
            }
            await pyq_question_model_1.PYQQuestionModel.create({
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
    }
    catch (err) {
        console.error('[IMPORT PYQ ERROR]:', err);
        return res.status(500).json({ success: false, message: 'Failed to import PYQ paper.' });
    }
};
exports.importPYQPaper = importPYQPaper;
