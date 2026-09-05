import mongoose, { Document } from 'mongoose';
import { ExamCategory, MockStatus } from '../types';
export interface IMockTest extends Document {
    title: string;
    slug: string;
    exam: ExamCategory;
    description: string;
    totalQuestions: number;
    totalMarks: number;
    durationMinutes: number;
    negativeMarking: number;
    releaseAt: Date;
    status: MockStatus;
    publishedAt?: Date;
    isPYQ: boolean;
    createdBy?: mongoose.Types.ObjectId;
}
export declare const MockTestModel: mongoose.Model<IMockTest, {}, {}, {}, mongoose.Document<unknown, {}, IMockTest, {}, {}> & IMockTest & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
