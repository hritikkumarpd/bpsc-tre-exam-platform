"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const database_1 = require("../config/database");
const pyq_paper_model_1 = require("../models/pyq-paper.model");
const pyq_question_model_1 = require("../models/pyq-question.model");
const question_model_1 = require("../models/question.model");
const question_fingerprint_model_1 = require("../models/question-fingerprint.model");
const user_model_1 = require("../models/user.model");
const english_pyq_parser_service_1 = require("../services/english-pyq-parser.service");
const fingerprint_service_1 = require("../services/fingerprint.service");
const scratchDir = 'C:\\Users\\hriti\\.gemini\\antigravity\\brain\\49c2b08b-180b-4ac4-a48d-521566957d81\\scratch';
const pyqPapersConfig = [
    {
        fileName: 'BPSC TRE 1.0 CSE.txt',
        title: 'BPSC TRE 1.0 Computer Science Official Question Paper',
        slug: 'bpsc-tre-1-0-computer-science-2023',
        year: 2023,
        edition: 'TRE 1.0 Official Paper',
        description: 'Official Bihar BPSC TRE 1.0 (2023) Computer Science (Paper 4) Previous Year Question Paper in English with Detailed Solutions.',
    },
    {
        fileName: 'BPSC TRE 2.0 CSE.txt',
        title: 'BPSC TRE 2.0 Computer Science Official Question Paper',
        slug: 'bpsc-tre-2-0-computer-science-2023',
        year: 2023,
        edition: 'TRE 2.0 Official Paper',
        description: 'Official Bihar BPSC TRE 2.0 (2023) Computer Science Previous Year Question Paper with 5 Options in English with Step-by-Step Solutions.',
    },
    {
        fileName: 'BPSC TRE 3.0 CSE.txt',
        title: 'BPSC TRE 3.0 Computer Science Official Question Paper',
        slug: 'bpsc-tre-3-0-computer-science-2024',
        year: 2024,
        edition: 'TRE 3.0 Official Paper',
        description: 'Official Bihar BPSC TRE 3.0 (2024) Computer Science Previous Year Question Paper in English with Detailed Solutions.',
    },
];
async function importAllTREPYQs() {
    console.log('🚀 Starting BPSC TRE English Question Papers Bulk Import with Detailed Solutions...');
    await (0, database_1.connectDatabase)();
    const superAdmin = await user_model_1.UserModel.findOne({ role: 'SUPER_ADMIN' });
    const adminId = superAdmin ? superAdmin._id : undefined;
    for (const config of pyqPapersConfig) {
        const textPath = path_1.default.join(scratchDir, config.fileName);
        if (!fs_1.default.existsSync(textPath)) {
            console.warn(`⚠️ Warning: ${config.fileName} not found at ${textPath}. Skipping.`);
            continue;
        }
        const rawText = fs_1.default.readFileSync(textPath, 'utf8');
        const parsedQuestions = (0, english_pyq_parser_service_1.parseCleanEnglishQuestions)(rawText);
        console.log(`📄 Processing ${config.title}: ${parsedQuestions.length} clean English questions parsed.`);
        if (parsedQuestions.length === 0) {
            console.warn(`⚠️ Warning: No valid English questions extracted from ${config.fileName}`);
            continue;
        }
        // Delete existing paper with same slug if re-importing
        const existingPaper = await pyq_paper_model_1.PYQPaperModel.findOne({ slug: config.slug });
        if (existingPaper) {
            await pyq_question_model_1.PYQQuestionModel.deleteMany({ pyqPaperId: existingPaper._id });
            await pyq_paper_model_1.PYQPaperModel.deleteOne({ _id: existingPaper._id });
            console.log(`🧹 Replaced existing PYQ paper ${config.slug}`);
        }
        // Create PYQ Paper Entry
        const paper = await pyq_paper_model_1.PYQPaperModel.create({
            title: config.title,
            slug: config.slug,
            exam: 'BPSC_TRE_CSE',
            year: config.year,
            edition: config.edition,
            description: config.description,
            totalQuestions: parsedQuestions.length,
            totalMarks: parsedQuestions.length,
            durationMinutes: 150,
            isPublished: true,
        });
        let importedCount = 0;
        for (let i = 0; i < parsedQuestions.length; i++) {
            const q = parsedQuestions[i];
            const qNum = i + 1;
            const { hash, normalized } = (0, fingerprint_service_1.generateFingerprintHash)(q.questionText);
            let question = await question_model_1.QuestionModel.findOne({ fingerprint: hash });
            if (!question) {
                question = await question_model_1.QuestionModel.create({
                    questionText: q.questionText,
                    options: q.options,
                    correctAnswer: q.correctAnswer,
                    explanation: q.explanation,
                    exam: 'BPSC_TRE_CSE',
                    subject: q.subject,
                    topic: q.topic,
                    difficulty: 'MEDIUM',
                    verificationStatus: 'VERIFIED',
                    sourceType: 'PYQ',
                    sourceReference: `${config.title} (Q${qNum})`,
                    pyqYear: config.year,
                    pyqPaperName: config.title,
                    fingerprint: hash,
                    createdBy: adminId,
                    verifiedBy: adminId,
                });
                await question_fingerprint_model_1.QuestionFingerprintModel.create({
                    fingerprintHash: hash,
                    normalizedText: normalized,
                    questionId: question._id,
                });
            }
            else {
                // Update explanation & subject with step-by-step solutions
                question.explanation = q.explanation;
                question.subject = q.subject;
                question.topic = q.topic;
                question.options = q.options;
                await question.save();
            }
            await pyq_question_model_1.PYQQuestionModel.create({
                pyqPaperId: paper._id,
                questionId: question._id,
                questionNumber: qNum,
            });
            importedCount++;
        }
        console.log(`✅ Imported ${config.title} with ${importedCount} questions cleanly!`);
    }
    console.log('🎉 All BPSC TRE PYQ Papers Imported Successfully!');
    await (0, database_1.closeDatabase)();
}
if (require.main === module) {
    importAllTREPYQs().catch((err) => {
        console.error('❌ Import failed:', err);
        process.exit(1);
    });
}
