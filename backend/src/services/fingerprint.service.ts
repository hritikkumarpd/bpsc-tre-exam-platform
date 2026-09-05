import crypto from 'crypto';
import { QuestionFingerprintModel } from '../models/question-fingerprint.model';

export interface FingerprintResult {
  fingerprintHash: string;
  normalizedText: string;
  isExactDuplicate: boolean;
  existingQuestionId?: string;
}

export function generateFingerprintHash(text: string): { hash: string; normalized: string } {
  const normalized = text
    .toLowerCase()
    .replace(/[^\w\s]/gi, '') // remove punctuation
    .split(/\s+/) // tokenize words
    .filter((word) => word.length > 1) // filter single-char noise
    .sort() // sort words alphabetically for semantic normalization
    .join(' ');

  const hash = crypto.createHash('sha256').update(normalized).digest('hex');
  return { hash, normalized };
}

export async function checkDuplicateFingerprint(questionText: string): Promise<FingerprintResult> {
  const { hash, normalized } = generateFingerprintHash(questionText);
  const existing = await QuestionFingerprintModel.findOne({ fingerprintHash: hash });

  return {
    fingerprintHash: hash,
    normalizedText: normalized,
    isExactDuplicate: !!existing,
    existingQuestionId: existing?.questionId ? existing.questionId.toString() : undefined,
  };
}
