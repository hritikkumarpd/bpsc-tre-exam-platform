import mongoose, { Schema, Document } from 'mongoose';

export interface IMistake extends Document {
  userId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  attemptId: mongoose.Types.ObjectId;
  wrongSelectedOption: 'A' | 'B' | 'C' | 'D' | 'E';
  notes?: string;
}

const MistakeSchema = new Schema<IMistake>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true, index: true },
    attemptId: { type: Schema.Types.ObjectId, ref: 'Attempt', required: true },
    wrongSelectedOption: { type: String, enum: ['A', 'B', 'C', 'D', 'E'], required: true },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

MistakeSchema.index({ userId: 1, questionId: 1 });

export const MistakeModel = mongoose.model<IMistake>('Mistake', MistakeSchema);
