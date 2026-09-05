export interface FingerprintResult {
    fingerprintHash: string;
    normalizedText: string;
    isExactDuplicate: boolean;
    existingQuestionId?: string;
}
export declare function generateFingerprintHash(text: string): {
    hash: string;
    normalized: string;
};
export declare function checkDuplicateFingerprint(questionText: string): Promise<FingerprintResult>;
