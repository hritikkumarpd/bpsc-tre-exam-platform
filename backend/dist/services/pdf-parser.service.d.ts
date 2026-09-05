export interface ParsedOption {
    key: string;
    text: string;
}
export interface ParsedQuestion {
    questionNumber: number;
    questionText: string;
    options: ParsedOption[];
    correctAnswer: string;
    explanation?: string;
    fingerprintHash: string;
}
export declare const parseQuestionPaperText: (rawText: string) => ParsedQuestion[];
