import mongoose, { Document } from 'mongoose';
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
export declare const UserModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
