import mongoose, { Schema, Document } from 'mongoose';
import { ExamCategory } from '../types';

export interface IExam extends Document {
  code: ExamCategory;
  title: string;
  description: string;
  totalMocks: number;
  totalPYQs: number;
  isActive: boolean;
}

const ExamSchema = new Schema<IExam>(
  {
    code: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    totalMocks: { type: Number, default: 15 },
    totalPYQs: { type: Number, default: 3 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ExamModel = mongoose.model<IExam>('Exam', ExamSchema);
