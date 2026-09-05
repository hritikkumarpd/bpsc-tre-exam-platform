import mongoose, { Schema, Document } from 'mongoose';

export interface ITopic extends Document {
  name: string;
  code: string;
  subjectId: mongoose.Types.ObjectId;
  description?: string;
}

const TopicSchema = new Schema<ITopic>(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, index: true, uppercase: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true, index: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const TopicModel = mongoose.model<ITopic>('Topic', TopicSchema);
