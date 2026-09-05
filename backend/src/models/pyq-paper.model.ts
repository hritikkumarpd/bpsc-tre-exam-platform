import mongoose, { Schema, Document } from 'mongoose';
import { ExamCategory } from '../types';

export interface IPYQPaper extends Document {
  title: string;
  slug: string;
  exam: ExamCategory;
  year: number;
  edition?: string;
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  description: string;
  isPublished: boolean;
}

const PYQPaperSchema = new Schema<IPYQPaper>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    exam: { type: String, enum: ['STET_CSE', 'BPSC_TRE_CSE'], required: true, index: true },
    year: { type: Number, required: true, index: true },
    edition: { type: String },
    totalQuestions: { type: Number, default: 150 },
    totalMarks: { type: Number, default: 150 },
    durationMinutes: { type: Number, default: 150 },
    description: { type: String, required: true },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const PYQPaperModel = mongoose.model<IPYQPaper>('PYQPaper', PYQPaperSchema);
