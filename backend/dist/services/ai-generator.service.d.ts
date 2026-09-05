import { IGeneratedQuestion } from '../models/generated-question.model';
export interface AIGenerationInput {
    exam: 'STET_CSE' | 'BPSC_TRE_CSE';
    subject: string;
    topic: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    conceptPrompt: string;
}
export declare function generateAIQuestionDraft(input: AIGenerationInput): Promise<IGeneratedQuestion>;
