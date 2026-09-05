"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const QuestionOptionSchema = new mongoose_1.Schema({
    key: { type: String, enum: ['A', 'B', 'C', 'D', 'E'], required: true },
    text: { type: String, required: true, trim: true },
}, { _id: false });
const QuestionSchema = new mongoose_1.Schema({
    questionText: { type: String, required: true, trim: true },
    options: { type: [QuestionOptionSchema], required: true },
    correctAnswer: { type: String, enum: ['A', 'B', 'C', 'D', 'E'], required: true },
    explanation: { type: String, required: true, trim: true },
    exam: { type: String, enum: ['STET_CSE', 'BPSC_TRE_CSE'], required: true, index: true },
    subject: { type: String, required: true, index: true },
    topic: { type: String, required: true, index: true },
    difficulty: { type: String, enum: ['EASY', 'MEDIUM', 'HARD'], default: 'MEDIUM', index: true },
    sourceType: {
        type: String,
        enum: ['PYQ', 'HUMAN_CREATED', 'AI_GENERATED', 'AI_INSPIRED'],
        required: true,
        index: true,
    },
    sourceReference: { type: String },
    verificationStatus: {
        type: String,
        enum: ['DRAFT', 'PENDING_REVIEW', 'VERIFIED', 'REJECTED'],
        default: 'VERIFIED',
        index: true,
    },
    fingerprint: { type: String, required: true, index: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    verifiedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    pyqYear: { type: Number },
    pyqPaperName: { type: String },
}, { timestamps: true });
QuestionSchema.index({ exam: 1, subject: 1, topic: 1 });
QuestionSchema.index({ sourceType: 1, verificationStatus: 1 });
exports.QuestionModel = mongoose_1.default.model('Question', QuestionSchema);
