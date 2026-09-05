import mongoose, { Document } from 'mongoose';
import { VerificationStatus } from '../types';
export interface IGeneratedQuestion extends Document {
    prompt: string;
    rawOutput: string;
    parsedQuestionText: string;
    parsedOptions: Array<{
        key: 'A' | 'B' | 'C' | 'D' | 'E';
        text: string;
    }>;
    parsedCorrectAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
    parsedExplanation: string;
    exam: string;
    subject: string;
    topic: string;
    difficulty: string;
    status: VerificationStatus;
    reviewNotes?: string;
    createdQuestionId?: mongoose.Types.ObjectId;
}
export declare const GeneratedQuestionModel: mongoose.Model<IGeneratedQuestion, {}, {}, {}, mongoose.Document<unknown, {}, IGeneratedQuestion, {}, {}> & IGeneratedQuestion & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
