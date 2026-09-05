import mongoose, { Document } from 'mongoose';
import { ExamCategory } from '../types';
export interface IExamPattern extends Document {
    examCode: ExamCategory;
    totalQuestions: number;
    totalMarks: number;
    durationMinutes: number;
    defaultNegativeMarking: number;
    sections: Array<{
        name: string;
        questionCount: number;
        marksPerQuestion: number;
    }>;
}
export declare const ExamPatternModel: mongoose.Model<IExamPattern, {}, {}, {}, mongoose.Document<unknown, {}, IExamPattern, {}, {}> & IExamPattern & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
