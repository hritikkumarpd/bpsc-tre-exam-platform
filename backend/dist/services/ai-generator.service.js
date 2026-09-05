"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAIQuestionDraft = generateAIQuestionDraft;
const generated_question_model_1 = require("../models/generated-question.model");
const review_queue_model_1 = require("../models/review-queue.model");
const fingerprint_service_1 = require("./fingerprint.service");
async function generateAIQuestionDraft(input) {
    const { exam, subject, topic, difficulty, conceptPrompt } = input;
    // Simulated AI response output schema (valid JSON)
    const rawAiOutput = JSON.stringify({
        questionText: `Which algorithm is best suited for finding the shortest path in a weighted graph with non-negative edge weights regarding ${topic}?`,
        options: [
            { key: 'A', text: "Dijkstra's Algorithm" },
            { key: 'B', text: 'Bellman-Ford Algorithm' },
            { key: 'C', text: 'Floyd-Warshall Algorithm' },
            { key: 'D', text: 'Depth-First Search' },
            { key: 'E', text: 'None of the above' },
        ],
        correctAnswer: 'A',
        explanation: "Dijkstra's algorithm efficiently computes single-source shortest paths in O((V + E) log V) time for graphs with non-negative weights.",
    });
    const parsed = JSON.parse(rawAiOutput);
    // Run duplicate fingerprint check
    const dupCheck = await (0, fingerprint_service_1.checkDuplicateFingerprint)(parsed.questionText);
    const status = dupCheck.isExactDuplicate ? 'REJECTED' : 'PENDING_REVIEW';
    const reviewNotes = dupCheck.isExactDuplicate
        ? 'Automated AI Draft Rejection: Duplicate fingerprint detected.'
        : 'Awaiting human expert review.';
    const draft = await generated_question_model_1.GeneratedQuestionModel.create({
        prompt: conceptPrompt,
        rawOutput: rawAiOutput,
        parsedQuestionText: parsed.questionText,
        parsedOptions: parsed.options,
        parsedCorrectAnswer: parsed.correctAnswer,
        parsedExplanation: parsed.explanation,
        exam,
        subject,
        topic,
        difficulty,
        status,
        reviewNotes,
    });
    if (status === 'PENDING_REVIEW') {
        await review_queue_model_1.ReviewQueueModel.create({
            generatedQuestionId: draft._id,
            status: 'PENDING',
            reviewNotes: 'Queued for content editor review.',
        });
    }
    return draft;
}
