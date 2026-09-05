import { generateFingerprintHash } from './fingerprint.service';

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

export const parseQuestionPaperText = (rawText: string): ParsedQuestion[] => {
  if (!rawText || !rawText.trim()) return [];

  // Normalize line endings
  const cleanText = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Split text by Question Numbers like "Q1.", "Q.1", "1.", "Question 1:"
  const questionBlocks = cleanText.split(/(?=\n(?:Q\.?\s*\d+|\d+[.)])\s+)/i);

  const parsedQuestions: ParsedQuestion[] = [];
  let currentNum = 1;

  for (const block of questionBlocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    // Regex to match options A), B), C), D), E) or (A), (B), etc.
    const optionMatches = [...trimmed.matchAll(/(?:\n|\b)([A-E])[.)]\s+([^\n]+)/gi)];

    if (optionMatches.length < 2) {
      // Not a valid multiple choice question block
      continue;
    }

    // Extract Question Text (everything before the first option)
    const firstOptionIndex = optionMatches[0].index || 0;
    let questionText = trimmed.substring(0, firstOptionIndex).trim();

    // Remove leading Q number (e.g., "Q1.", "1.")
    questionText = questionText.replace(/^(?:Q\.?\s*\d+|\d+[.)])\s+/i, '').trim();

    if (!questionText) continue;

    // Parse options
    const options: ParsedOption[] = optionMatches.map((m) => ({
      key: m[1].toUpperCase(),
      text: m[2].trim(),
    }));

    // Auto-detect Answer Key if present (e.g. "Answer: B" or "Ans: C")
    let correctAnswer = 'A'; // default fallback
    const ansMatch = trimmed.match(/(?:Answer|Ans|Correct Option)\s*:\s*([A-E])/i);
    if (ansMatch) {
      correctAnswer = ansMatch[1].toUpperCase();
    }

    // Auto-detect Explanation if present
    let explanation = '';
    const expMatch = trimmed.match(/(?:Explanation|Exp)\s*:\s*([^\n]+)/i);
    if (expMatch) {
      explanation = expMatch[1].trim();
    }

    const { hash } = generateFingerprintHash(questionText);

    parsedQuestions.push({
      questionNumber: currentNum++,
      questionText,
      options,
      correctAnswer,
      explanation,
      fingerprintHash: hash,
    });
  }

  return parsedQuestions;
};
