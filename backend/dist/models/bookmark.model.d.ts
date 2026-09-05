import mongoose, { Document } from 'mongoose';
export interface IBookmark extends Document {
    userId: mongoose.Types.ObjectId;
    questionId: mongoose.Types.ObjectId;
    note?: string;
}
export declare const BookmarkModel: mongoose.Model<IBookmark, {}, {}, {}, mongoose.Document<unknown, {}, IBookmark, {}, {}> & IBookmark & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
