import { IMockTest } from '../models/mock-test.model';
import { ExamCategory } from '../types';
export interface MockGeneratorOptions {
    title: string;
    slug: string;
    exam: ExamCategory;
    description: string;
    durationMinutes?: number;
    negativeMarking?: number;
    releaseAt: Date;
    createdBy?: string;
}
export declare function generateUniqueMockTest(options: MockGeneratorOptions): Promise<IMockTest>;
