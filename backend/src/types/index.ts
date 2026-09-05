export type UserRole = 
  | 'STUDENT'
  | 'CONTENT_EDITOR'
  | 'TEACHER_EXPERT'
  | 'SUPPORT'
  | 'ADMIN'
  | 'SUPER_ADMIN';

export type ExamCategory = 'STET_CSE' | 'BPSC_TRE_CSE';

export type QuestionSourceType = 'PYQ' | 'HUMAN_CREATED' | 'AI_GENERATED' | 'AI_INSPIRED';

export type VerificationStatus = 'DRAFT' | 'PENDING_REVIEW' | 'VERIFIED' | 'REJECTED';

export type MockStatus = 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';

export type TestAttemptStatus = 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'EXPIRED';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    details?: unknown;
  };
}
