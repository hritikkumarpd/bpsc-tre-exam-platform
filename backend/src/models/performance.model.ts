import mongoose, { Schema, Document } from 'mongoose';

export interface ITopicPerformance {
  topic: string;
  totalQuestionsAttempted: number;
  correctCount: number;
  accuracyPercentage: number;
}

export interface IPerformance extends Document {
  userId: mongoose.Types.ObjectId;
  testsAttempted: number;
  questionsSolved: number;
  averageAccuracy: number;
  bestScore: number;
  topicBreakdown: ITopicPerformance[];
  weakTopics: string[];
}

const PerformanceSchema = new Schema<IPerformance>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    testsAttempted: { type: Number, default: 0 },
    questionsSolved: { type: Number, default: 0 },
    averageAccuracy: { type: Number, default: 0 },
    bestScore: { type: Number, default: 0 },
    topicBreakdown: [
      {
        topic: { type: String, required: true },
        totalQuestionsAttempted: { type: Number, default: 0 },
        correctCount: { type: Number, default: 0 },
        accuracyPercentage: { type: Number, default: 0 },
      },
    ],
    weakTopics: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const PerformanceModel = mongoose.model<IPerformance>('Performance', PerformanceSchema);
