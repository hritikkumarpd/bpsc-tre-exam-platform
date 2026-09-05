import mongoose, { Schema, Document } from 'mongoose';

export interface IAdminLog extends Document {
  adminId: mongoose.Types.ObjectId;
  action: string;
  targetEntity: string;
  targetId?: string;
  ipAddress?: string;
  details?: Record<string, unknown>;
}

const AdminLogSchema = new Schema<IAdminLog>(
  {
    adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    action: { type: String, required: true },
    targetEntity: { type: String, required: true },
    targetId: { type: String },
    ipAddress: { type: String },
    details: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const AdminLogModel = mongoose.model<IAdminLog>('AdminLog', AdminLogSchema);
