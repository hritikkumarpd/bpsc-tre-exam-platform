import mongoose, { Document } from 'mongoose';
import { ExamCategory } from '../types';
export interface ISubject extends Document {
    name: string;
    code: string;
    examCategory: ExamCategory | 'BOTH';
    description?: string;
}
export declare const SubjectModel: mongoose.Model<ISubject, {}, {}, {}, mongoose.Document<unknown, {}, ISubject, {}, {}> & ISubject & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
