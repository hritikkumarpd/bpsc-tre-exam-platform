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
exports.AttemptModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ViolationEventSchema = new mongoose_1.Schema({
    timestamp: { type: Date, default: Date.now },
    event: { type: String, required: true },
    count: { type: Number, required: true },
}, { _id: false });
const AttemptSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    mockTestId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'MockTest', index: true },
    pyqPaperId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'PYQPaper', index: true },
    attemptType: { type: String, enum: ['MOCK', 'PYQ'], required: true },
    status: {
        type: String,
        enum: ['IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'EXPIRED'],
        default: 'IN_PROGRESS',
        index: true,
    },
    focusViolations: { type: Number, default: 0 },
    violationHistory: { type: [ViolationEventSchema], default: [] },
    cancellationReason: { type: String },
    score: { type: Number, default: 0 },
    totalMarks: { type: Number, default: 150 },
    correctCount: { type: Number, default: 0 },
    wrongCount: { type: Number, default: 0 },
    skippedCount: { type: Number, default: 0 },
    accuracyPercentage: { type: Number, default: 0 },
    durationSeconds: { type: Number, default: 0 },
    startedAt: { type: Date, default: Date.now },
    submittedAt: { type: Date },
}, { timestamps: true });
exports.AttemptModel = mongoose_1.default.model('Attempt', AttemptSchema);
