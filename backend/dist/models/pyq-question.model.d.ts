import mongoose, { Document } from 'mongoose';
export interface IPYQQuestion extends Document {
    pyqPaperId: mongoose.Types.ObjectId;
    questionId: mongoose.Types.ObjectId;
    questionNumber: number;
}
export declare const PYQQuestionModel: mongoose.Model<IPYQQuestion, {}, {}, {}, mongoose.Document<unknown, {}, IPYQQuestion, {}, {}> & IPYQQuestion & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
