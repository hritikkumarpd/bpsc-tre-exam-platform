import mongoose, { Schema, Document } from 'mongoose';
import { VerificationStatus } from '../types';

export interface IGeneratedQuestion extends Document {
  prompt: string;
  rawOutput: string;
  parsedQuestionText: string;
  parsedOptions: Array<{ key: 'A' | 'B' | 'C' | 'D' | 'E'; text: string }>;
  parsedCorrectAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  parsedExplanation: string;
  exam: string;
  subject: string;
  topic: string;
  difficulty: string;
  status: VerificationStatus;
  reviewNotes?: string;
  createdQuestionId?: mongoose.Types.ObjectId;
}

const GeneratedQuestionSchema = new Schema<IGeneratedQuestion>(
  {
    prompt: { type: String, required: true },
    rawOutput: { type: String, required: true },
    parsedQuestionText: { type: String, required: true },
    parsedOptions: [
      {
        key: { type: String, enum: ['A', 'B', 'C', 'D', 'E'], required: true },
        text: { type: String, required: true },
      },
    ],
    parsedCorrectAnswer: { type: String, enum: ['A', 'B', 'C', 'D', 'E'], required: true },
    parsedExplanation: { type: String, required: true },
    exam: { type: String, required: true },
    subject: { type: String, required: true },
    topic: { type: String, required: true },
    difficulty: { type: String, default: 'MEDIUM' },
    status: {
      type: String,
      enum: ['DRAFT', 'PENDING_REVIEW', 'VERIFIED', 'REJECTED'],
      default: 'PENDING_REVIEW',
      index: true,
    },
    reviewNotes: { type: String },
    createdQuestionId: { type: Schema.Types.ObjectId, ref: 'Question' },
  },
  { timestamps: true }
);

export const GeneratedQuestionModel = mongoose.model<IGeneratedQuestion>(
  'GeneratedQuestion',
  GeneratedQuestionSchema
);
