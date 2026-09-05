import mongoose, { Schema, Document } from 'mongoose';
import { ExamCategory } from '../types';

export interface IExamPattern extends Document {
  examCode: ExamCategory;
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  defaultNegativeMarking: number;
  sections: Array<{
    name: string;
    questionCount: number;
    marksPerQuestion: number;
  }>;
}

const ExamPatternSchema = new Schema<IExamPattern>(
  {
    examCode: { type: String, required: true, unique: true, index: true },
    totalQuestions: { type: Number, default: 150 },
    totalMarks: { type: Number, default: 150 },
    durationMinutes: { type: Number, default: 150 },
    defaultNegativeMarking: { type: Number, default: 0 },
    sections: [
      {
        name: { type: String, required: true },
        questionCount: { type: Number, required: true },
        marksPerQuestion: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export const ExamPatternModel = mongoose.model<IExamPattern>('ExamPattern', ExamPatternSchema);
