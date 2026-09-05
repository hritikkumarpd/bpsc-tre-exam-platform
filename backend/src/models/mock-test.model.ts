import mongoose, { Schema, Document } from 'mongoose';
import { ExamCategory, MockStatus } from '../types';

export interface IMockTest extends Document {
  title: string;
  slug: string;
  exam: ExamCategory;
  description: string;
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  negativeMarking: number;
  releaseAt: Date;
  status: MockStatus;
  publishedAt?: Date;
  isPYQ: boolean;
  createdBy?: mongoose.Types.ObjectId;
}

const MockTestSchema = new Schema<IMockTest>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    exam: { type: String, enum: ['STET_CSE', 'BPSC_TRE_CSE'], required: true, index: true },
    description: { type: String, required: true },
    totalQuestions: { type: Number, default: 150 },
    totalMarks: { type: Number, default: 150 },
    durationMinutes: { type: Number, default: 150 },
    negativeMarking: { type: Number, default: 0 },
    releaseAt: { type: Date, required: true, index: true },
    status: {
      type: String,
      enum: ['DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED'],
      default: 'SCHEDULED',
      index: true,
    },
    publishedAt: { type: Date },
    isPYQ: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const MockTestModel = mongoose.model<IMockTest>('MockTest', MockTestSchema);
