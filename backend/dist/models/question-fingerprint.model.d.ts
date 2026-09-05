import mongoose, { Document } from 'mongoose';
export interface IQuestionFingerprint extends Document {
    fingerprintHash: string;
    normalizedText: string;
    questionId: mongoose.Types.ObjectId;
}
export declare const QuestionFingerprintModel: mongoose.Model<IQuestionFingerprint, {}, {}, {}, mongoose.Document<unknown, {}, IQuestionFingerprint, {}, {}> & IQuestionFingerprint & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
