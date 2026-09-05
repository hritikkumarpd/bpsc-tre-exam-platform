import mongoose, { Schema, Document } from 'mongoose';

export interface IAttemptAnswer extends Document {
  attemptId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  questionNumber: number;
  selectedOption?: 'A' | 'B' | 'C' | 'D' | 'E';
  isCorrect?: boolean;
  markAwarded: number;
  timeSpentSeconds: number;
  markedForReview: boolean;
}

const AttemptAnswerSchema = new Schema<IAttemptAnswer>(
  {
    attemptId: { type: Schema.Types.ObjectId, ref: 'Attempt', required: true, index: true },
    questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true, index: true },
    questionNumber: { type: Number, required: true },
    selectedOption: { type: String, enum: ['A', 'B', 'C', 'D', 'E'] },
    isCorrect: { type: Boolean },
    markAwarded: { type: Number, default: 0 },
    timeSpentSeconds: { type: Number, default: 0 },
    markedForReview: { type: Boolean, default: false },
  },
  { timestamps: true }
);

AttemptAnswerSchema.index({ attemptId: 1, questionNumber: 1 }, { unique: true });

export const AttemptAnswerModel = mongoose.model<IAttemptAnswer>(
  'AttemptAnswer',
  AttemptAnswerSchema
);
