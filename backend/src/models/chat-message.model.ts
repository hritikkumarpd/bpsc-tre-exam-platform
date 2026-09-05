import mongoose, { Schema, Document } from 'mongoose';

export interface IChatMessage extends Document {
  senderId?: mongoose.Types.ObjectId;
  senderName: string;
  senderRole: string;
  message: string;
  channel: 'GENERAL' | 'BPSC_TRE' | 'STET_CSE';
  questionRef?: string;
  createdAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: 'User' },
    senderName: { type: String, required: true, trim: true },
    senderRole: { type: String, default: 'STUDENT' },
    message: { type: String, required: true, trim: true, maxlength: 1000 },
    channel: {
      type: String,
      enum: ['GENERAL', 'BPSC_TRE', 'STET_CSE'],
      default: 'GENERAL',
      index: true,
    },
    questionRef: { type: String, trim: true },
  },
  { timestamps: true }
);

export const ChatMessageModel = mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);
