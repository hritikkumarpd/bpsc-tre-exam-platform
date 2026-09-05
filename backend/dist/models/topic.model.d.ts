import mongoose, { Document } from 'mongoose';
export interface ITopic extends Document {
    name: string;
    code: string;
    subjectId: mongoose.Types.ObjectId;
    description?: string;
}
export declare const TopicModel: mongoose.Model<ITopic, {}, {}, {}, mongoose.Document<unknown, {}, ITopic, {}, {}> & ITopic & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
