import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestionFingerprint extends Document {
  fingerprintHash: string;
  normalizedText: string;
  questionId: mongoose.Types.ObjectId;
}

const QuestionFingerprintSchema = new Schema<IQuestionFingerprint>(
  {
    fingerprintHash: { type: String, required: true, unique: true, index: true },
    normalizedText: { type: String, required: true },
    questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true, index: true },
  },
  { timestamps: true }
);

export const QuestionFingerprintModel = mongoose.model<IQuestionFingerprint>(
  'QuestionFingerprint',
  QuestionFingerprintSchema
);
