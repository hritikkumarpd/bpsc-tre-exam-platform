import mongoose, { Document } from 'mongoose';
export interface IReviewQueue extends Document {
    questionId?: mongoose.Types.ObjectId;
    generatedQuestionId?: mongoose.Types.ObjectId;
    reviewerId?: mongoose.Types.ObjectId;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    reviewNotes?: string;
}
export declare const ReviewQueueModel: mongoose.Model<IReviewQueue, {}, {}, {}, mongoose.Document<unknown, {}, IReviewQueue, {}, {}> & IReviewQueue & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
