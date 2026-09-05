import mongoose, { Schema, Document } from 'mongoose';

export interface IReviewQueue extends Document {
  questionId?: mongoose.Types.ObjectId;
  generatedQuestionId?: mongoose.Types.ObjectId;
  reviewerId?: mongoose.Types.ObjectId;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  reviewNotes?: string;
}

const ReviewQueueSchema = new Schema<IReviewQueue>(
  {
    questionId: { type: Schema.Types.ObjectId, ref: 'Question', index: true },
    generatedQuestionId: { type: Schema.Types.ObjectId, ref: 'GeneratedQuestion', index: true },
    reviewerId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
      index: true,
    },
    reviewNotes: { type: String },
  },
  { timestamps: true }
);

export const ReviewQueueModel = mongoose.model<IReviewQueue>('ReviewQueue', ReviewQueueSchema);
