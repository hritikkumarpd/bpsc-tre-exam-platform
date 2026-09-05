import mongoose, { Schema, Document } from 'mongoose';
import { UserRole, ExamCategory } from '../types';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  status: 'ACTIVE' | 'SUSPENDED';
  targetExam?: ExamCategory | 'BOTH';
  avatar?: string;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['STUDENT', 'CONTENT_EDITOR', 'TEACHER_EXPERT', 'SUPPORT', 'ADMIN', 'SUPER_ADMIN'],
      default: 'STUDENT',
      required: true,
    },
    status: { type: String, enum: ['ACTIVE', 'SUSPENDED'], default: 'ACTIVE' },
    targetExam: { type: String, enum: ['STET_CSE', 'BPSC_TRE_CSE', 'BOTH'], default: 'BOTH' },
    avatar: { type: String },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
