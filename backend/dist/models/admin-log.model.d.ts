import mongoose, { Document } from 'mongoose';
export interface IAdminLog extends Document {
    adminId: mongoose.Types.ObjectId;
    action: string;
    targetEntity: string;
    targetId?: string;
    ipAddress?: string;
    details?: Record<string, unknown>;
}
export declare const AdminLogModel: mongoose.Model<IAdminLog, {}, {}, {}, mongoose.Document<unknown, {}, IAdminLog, {}, {}> & IAdminLog & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
