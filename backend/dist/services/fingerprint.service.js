"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFingerprintHash = generateFingerprintHash;
exports.checkDuplicateFingerprint = checkDuplicateFingerprint;
const crypto_1 = __importDefault(require("crypto"));
const question_fingerprint_model_1 = require("../models/question-fingerprint.model");
function generateFingerprintHash(text) {
    const normalized = text
        .toLowerCase()
        .replace(/[^\w\s]/gi, '') // remove punctuation
        .split(/\s+/) // tokenize words
        .filter((word) => word.length > 1) // filter single-char noise
        .sort() // sort words alphabetically for semantic normalization
        .join(' ');
    const hash = crypto_1.default.createHash('sha256').update(normalized).digest('hex');
    return { hash, normalized };
}
async function checkDuplicateFingerprint(questionText) {
    const { hash, normalized } = generateFingerprintHash(questionText);
    const existing = await question_fingerprint_model_1.QuestionFingerprintModel.findOne({ fingerprintHash: hash });
    return {
        fingerprintHash: hash,
        normalizedText: normalized,
        isExactDuplicate: !!existing,
        existingQuestionId: existing?.questionId ? existing.questionId.toString() : undefined,
    };
}
