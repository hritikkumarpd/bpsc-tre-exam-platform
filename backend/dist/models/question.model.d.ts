import mongoose, { Document } from 'mongoose';
import { ExamCategory, QuestionSourceType, VerificationStatus } from '../types';
export interface IQuestionOption {
    key: 'A' | 'B' | 'C' | 'D' | 'E';
    text: string;
}
export interface IQuestion extends Document {
    questionText: string;
    options: IQuestionOption[];
    correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
    explanation: string;
    exam: ExamCategory;
    subject: string;
    topic: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    sourceType: QuestionSourceType;
    sourceReference?: string;
    verificationStatus: VerificationStatus;
    fingerprint: string;
    createdBy?: mongoose.Types.ObjectId;
    verifiedBy?: mongoose.Types.ObjectId;
    pyqYear?: number;
    pyqPaperName?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const QuestionModel: mongoose.Model<IQuestion, {}, {}, {}, mongoose.Document<unknown, {}, IQuestion, {}, {}> & IQuestion & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
