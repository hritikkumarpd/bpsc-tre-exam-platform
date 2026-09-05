import mongoose, { Document } from 'mongoose';
import { ExamCategory } from '../types';
export interface IExam extends Document {
    code: ExamCategory;
    title: string;
    description: string;
    totalMocks: number;
    totalPYQs: number;
    isActive: boolean;
}
export declare const ExamModel: mongoose.Model<IExam, {}, {}, {}, mongoose.Document<unknown, {}, IExam, {}, {}> & IExam & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
