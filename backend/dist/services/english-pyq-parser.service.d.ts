export interface CleanEnglishQuestion {
    questionNumber: number;
    questionText: string;
    options: {
        key: 'A' | 'B' | 'C' | 'D' | 'E';
        text: string;
    }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
    explanation: string;
    subject: string;
    topic: string;
    fingerprintHash: string;
}
export declare const isEnglishText: (text: string) => boolean;
export declare const generateSolutionForQuestion: (questionText: string, options: {
    key: string;
    text: string;
}[], correctAnswer: string) => {
    explanation: string;
    subject: string;
    topic: string;
};
export declare const parseCleanEnglishQuestions: (rawText: string) => CleanEnglishQuestion[];
