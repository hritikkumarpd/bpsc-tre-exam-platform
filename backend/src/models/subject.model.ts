import mongoose, { Schema, Document } from 'mongoose';
import { ExamCategory } from '../types';

export interface ISubject extends Document {
  name: string;
  code: string;
  examCategory: ExamCategory | 'BOTH';
  description?: string;
}

const SubjectSchema = new Schema<ISubject>(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, index: true, uppercase: true },
    examCategory: { type: String, enum: ['STET_CSE', 'BPSC_TRE_CSE', 'BOTH'], default: 'BOTH' },
    description: { type: String },
  },
  { timestamps: true }
);

export const SubjectModel = mongoose.model<ISubject>('Subject', SubjectSchema);
