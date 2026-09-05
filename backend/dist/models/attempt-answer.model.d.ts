import mongoose, { Document } from 'mongoose';
export interface IAttemptAnswer extends Document {
    attemptId: mongoose.Types.ObjectId;
    questionId: mongoose.Types.ObjectId;
    questionNumber: number;
    selectedOption?: 'A' | 'B' | 'C' | 'D' | 'E';
    isCorrect?: boolean;
    markAwarded: number;
    timeSpentSeconds: number;
    markedForReview: boolean;
}
export declare const AttemptAnswerModel: mongoose.Model<IAttemptAnswer, {}, {}, {}, mongoose.Document<unknown, {}, IAttemptAnswer, {}, {}> & IAttemptAnswer & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
