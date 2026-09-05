import mongoose, { Schema, Document } from 'mongoose';
import { ExamCategory, QuestionSourceType, VerificationStatus } from '../types';

export interface IQuestionOption {
  key: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
}

export interface IQuestion extends Document {
  questionText: string;
  options: IQuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  exam: ExamCategory;
  subject: string;
  topic: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  sourceType: QuestionSourceType;
  sourceReference?: string;
  verificationStatus: VerificationStatus;
  fingerprint: string;
  createdBy?: mongoose.Types.ObjectId;
  verifiedBy?: mongoose.Types.ObjectId;
  pyqYear?: number;
  pyqPaperName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionOptionSchema = new Schema<IQuestionOption>(
  {
    key: { type: String, enum: ['A', 'B', 'C', 'D', 'E'], required: true },
    text: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const QuestionSchema = new Schema<IQuestion>(
  {
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
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    pyqYear: { type: Number },
    pyqPaperName: { type: String },
  },
  { timestamps: true }
);

QuestionSchema.index({ exam: 1, subject: 1, topic: 1 });
QuestionSchema.index({ sourceType: 1, verificationStatus: 1 });

export const QuestionModel = mongoose.model<IQuestion>('Question', QuestionSchema);
