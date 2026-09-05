import mongoose, { Schema, Document } from 'mongoose';

export interface IMockTestQuestion extends Document {
  mockTestId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  questionNumber: number;
  sectionName?: string;
}

const MockTestQuestionSchema = new Schema<IMockTestQuestion>(
  {
    mockTestId: { type: Schema.Types.ObjectId, ref: 'MockTest', required: true, index: true },
    questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true, index: true },
    questionNumber: { type: Number, required: true },
    sectionName: { type: String, default: 'Computer Science Core' },
  },
  { timestamps: true }
);

MockTestQuestionSchema.index({ mockTestId: 1, questionNumber: 1 }, { unique: true });

export const MockTestQuestionModel = mongoose.model<IMockTestQuestion>(
  'MockTestQuestion',
  MockTestQuestionSchema
);
