import mongoose, { Document } from 'mongoose';
export interface IChatMessage extends Document {
    senderId?: mongoose.Types.ObjectId;
    senderName: string;
    senderRole: string;
    message: string;
    channel: 'GENERAL' | 'BPSC_TRE' | 'STET_CSE';
    questionRef?: string;
    createdAt: Date;
}
export declare const ChatMessageModel: mongoose.Model<IChatMessage, {}, {}, {}, mongoose.Document<unknown, {}, IChatMessage, {}, {}> & IChatMessage & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
