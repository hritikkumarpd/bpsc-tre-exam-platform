import mongoose, { Document } from 'mongoose';
import { ExamCategory } from '../types';
export interface IPYQPaper extends Document {
    title: string;
    slug: string;
    exam: ExamCategory;
    year: number;
    edition?: string;
    totalQuestions: number;
    totalMarks: number;
    durationMinutes: number;
    description: string;
    isPublished: boolean;
}
export declare const PYQPaperModel: mongoose.Model<IPYQPaper, {}, {}, {}, mongoose.Document<unknown, {}, IPYQPaper, {}, {}> & IPYQPaper & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
