import mongoose, { Document } from 'mongoose';
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
export declare const PerformanceModel: mongoose.Model<IPerformance, {}, {}, {}, mongoose.Document<unknown, {}, IPerformance, {}, {}> & IPerformance & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
