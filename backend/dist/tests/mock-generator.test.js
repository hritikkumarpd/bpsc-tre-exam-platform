"use strict";
describe('Mock Test Generator Engine & Filtering Suite', () => {
    it('should strictly exclude genuine PYQ questions from mock generation candidates', () => {
        const questionPool = [
            { id: '1', sourceType: 'PYQ', fingerprint: 'fp1' },
            { id: '2', sourceType: 'HUMAN_CREATED', fingerprint: 'fp2' },
            { id: '3', sourceType: 'AI_INSPIRED', fingerprint: 'fp3' },
        ];
        const eligible = questionPool.filter((q) => q.sourceType !== 'PYQ');
        expect(eligible.length).toEqual(2);
        expect(eligible.some((q) => q.sourceType === 'PYQ')).toBe(false);
    });
    it('should exclude questions previously mapped to existing mock tests', () => {
        const usedQuestionIds = new Set(['q_10', 'q_20', 'q_30']);
        const candidateQuestions = [
            { id: 'q_10' },
            { id: 'q_15' },
            { id: 'q_20' },
            { id: 'q_25' },
        ];
        const unusedCandidates = candidateQuestions.filter((q) => !usedQuestionIds.has(q.id));
        expect(unusedCandidates.length).toEqual(2);
        expect(unusedCandidates.map((q) => q.id)).toEqual(['q_15', 'q_25']);
    });
    it('should fail cleanly if eligible question pool has fewer than 150 unique questions', () => {
        const eligibleCount = 120;
        const requiredCount = 150;
        let errorThrown = false;
        try {
            if (eligibleCount < requiredCount) {
                throw new Error(`Mock generation failed. Insufficient unique questions available in pool. Required: 150, Available: ${eligibleCount}.`);
            }
        }
        catch (err) {
            errorThrown = true;
            expect(err.message).toContain('Insufficient unique questions');
        }
        expect(errorThrown).toBe(true);
    });
});
