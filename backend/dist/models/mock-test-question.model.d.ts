import mongoose, { Document } from 'mongoose';
export interface IMockTestQuestion extends Document {
    mockTestId: mongoose.Types.ObjectId;
    questionId: mongoose.Types.ObjectId;
    questionNumber: number;
    sectionName?: string;
}
export declare const MockTestQuestionModel: mongoose.Model<IMockTestQuestion, {}, {}, {}, mongoose.Document<unknown, {}, IMockTestQuestion, {}, {}> & IMockTestQuestion & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
