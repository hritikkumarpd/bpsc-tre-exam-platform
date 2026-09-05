import mongoose, { Document } from 'mongoose';
import { TestAttemptStatus } from '../types';
export interface IViolationEvent {
    timestamp: Date;
    event: string;
    count: number;
}
export interface IAttempt extends Document {
    userId: mongoose.Types.ObjectId;
    mockTestId?: mongoose.Types.ObjectId;
    pyqPaperId?: mongoose.Types.ObjectId;
    attemptType: 'MOCK' | 'PYQ';
    status: TestAttemptStatus;
    focusViolations: number;
    violationHistory: IViolationEvent[];
    cancellationReason?: string;
    score: number;
    totalMarks: number;
    correctCount: number;
    wrongCount: number;
    skippedCount: number;
    accuracyPercentage: number;
    durationSeconds: number;
    startedAt: Date;
    submittedAt?: Date;
}
export declare const AttemptModel: mongoose.Model<IAttempt, {}, {}, {}, mongoose.Document<unknown, {}, IAttempt, {}, {}> & IAttempt & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
