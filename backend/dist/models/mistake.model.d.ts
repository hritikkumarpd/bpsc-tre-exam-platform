import mongoose, { Document } from 'mongoose';
export interface IMistake extends Document {
    userId: mongoose.Types.ObjectId;
    questionId: mongoose.Types.ObjectId;
    attemptId: mongoose.Types.ObjectId;
    wrongSelectedOption: 'A' | 'B' | 'C' | 'D' | 'E';
    notes?: string;
}
export declare const MistakeModel: mongoose.Model<IMistake, {}, {}, {}, mongoose.Document<unknown, {}, IMistake, {}, {}> & IMistake & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
