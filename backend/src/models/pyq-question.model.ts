import mongoose, { Schema, Document } from 'mongoose';

export interface IPYQQuestion extends Document {
  pyqPaperId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  questionNumber: number;
}

const PYQQuestionSchema = new Schema<IPYQQuestion>(
  {
    pyqPaperId: { type: Schema.Types.ObjectId, ref: 'PYQPaper', required: true, index: true },
    questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true, index: true },
    questionNumber: { type: Number, required: true },
  },
  { timestamps: true }
);

PYQQuestionSchema.index({ pyqPaperId: 1, questionNumber: 1 }, { unique: true });

export const PYQQuestionModel = mongoose.model<IPYQQuestion>('PYQQuestion', PYQQuestionSchema);
