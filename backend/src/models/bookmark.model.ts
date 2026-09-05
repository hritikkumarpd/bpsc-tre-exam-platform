import mongoose, { Schema, Document } from 'mongoose';

export interface IBookmark extends Document {
  userId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  note?: string;
}

const BookmarkSchema = new Schema<IBookmark>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true, index: true },
    note: { type: String, trim: true },
  },
  { timestamps: true }
);

BookmarkSchema.index({ userId: 1, questionId: 1 }, { unique: true });

export const BookmarkModel = mongoose.model<IBookmark>('Bookmark', BookmarkSchema);
