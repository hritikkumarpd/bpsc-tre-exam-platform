import mongoose, { Schema, Document } from 'mongoose';
import { TestAttemptStatus } from '../types';

export interface IViolationEvent {
  timestamp: Date;
  event: string;
  count: number;
}

export interface IAttempt extends Document {
  userId: mongoose.Types.ObjectId;
  mockTestId?: mongoose.Types.ObjectId;
  pyqPaperId?: mongoose.Types.ObjectId;
  attemptType: 'MOCK' | 'PYQ';
  status: TestAttemptStatus;
  focusViolations: number;
  violationHistory: IViolationEvent[];
  cancellationReason?: string;
  score: number;
  totalMarks: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  accuracyPercentage: number;
  durationSeconds: number;
  startedAt: Date;
  submittedAt?: Date;
}

const ViolationEventSchema = new Schema<IViolationEvent>(
  {
    timestamp: { type: Date, default: Date.now },
    event: { type: String, required: true },
    count: { type: Number, required: true },
  },
  { _id: false }
);

const AttemptSchema = new Schema<IAttempt>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    mockTestId: { type: Schema.Types.ObjectId, ref: 'MockTest', index: true },
    pyqPaperId: { type: Schema.Types.ObjectId, ref: 'PYQPaper', index: true },
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
  },
  { timestamps: true }
);

export const AttemptModel = mongoose.model<IAttempt>('Attempt', AttemptSchema);
