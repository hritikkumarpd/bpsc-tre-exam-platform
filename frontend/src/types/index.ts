export type ExamCategory = 'STET_CSE' | 'BPSC_TRE_CSE';

export type QuestionSourceType = 'PYQ' | 'HUMAN_CREATED' | 'AI_GENERATED' | 'AI_INSPIRED';

export type VerificationStatus = 'DRAFT' | 'PENDING_REVIEW' | 'VERIFIED' | 'REJECTED';

export type MockStatus = 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';

export interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
}

export interface Question {
  id: string;
  questionText: string;
  options: QuestionOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  exam: ExamCategory;
  subject: string;
  topic: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  sourceType: QuestionSourceType;
  verificationStatus: VerificationStatus;
  pyqYear?: number;
  pyqPaperName?: string;
}

export interface MockTest {
  id: string;
  title: string;
  slug: string;
  exam: ExamCategory;
  description: string;
  totalQuestions: number;
  totalMarks: number;
  durationMinutes: number;
  negativeMarking: number;
  releaseAt: string;
  status: MockStatus;
  publishedAt?: string;
  isPYQ: boolean;
  pyqDetails?: {
    year: number;
    edition: string;
  };
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  testTitle: string;
  exam: ExamCategory;
  score: number;
  totalMarks: number;
  accuracyPercentage: number;
  timeTakenMinutes: number;
  attemptedAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'GENERAL' | 'STET_CSE' | 'BPSC_TRE' | 'ANTI_CHEAT' | 'MOCK_TESTS';
}
