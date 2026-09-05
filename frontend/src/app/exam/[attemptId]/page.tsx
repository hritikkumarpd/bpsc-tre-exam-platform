'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { formatTimeMinutes } from '@/lib/utils';
import {
  Clock,
  ShieldAlert,
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Send,
  AlertTriangle,
  Menu,
  X,
} from 'lucide-react';

interface QuestionOption {
  key: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
}

interface Question {
  _id: string;
  questionText: string;
  options: QuestionOption[];
  subject: string;
  topic: string;
  difficulty: string;
}

interface SavedAnswer {
  questionNumber: number;
  selectedOption?: 'A' | 'B' | 'C' | 'D' | 'E';
  markedForReview?: boolean;
}

export default function InteractiveExamEngine() {
  const params = useParams();
  const router = useRouter();
  const attemptId = params?.attemptId as string;

  // Test Engine State
  const [currentQIndex, setCurrentQIndex] = useState(0); // 0-indexed (0 to 149)
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Map<number, SavedAnswer>>(new Map());
  const [visitedSet, setVisitedSet] = useState<Set<number>>(new Set([1]));
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(150 * 60); // 150 Mins
  const [focusViolations, setFocusViolations] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paletteMobileOpen, setPaletteMobileOpen] = useState(false);

  // Demo Fallback Questions Generator if offline/demo
  useEffect(() => {
    // Generate 150 structured questions for demo/development execution
    const mockQuestionsList: Question[] = Array.from({ length: 150 }).map((_, i) => ({
      _id: `q_${i + 1}`,
      questionText: `[Question #${i + 1}] Which of the following statements is TRUE regarding Computer Science concept #${(i % 15) + 1}?`,
      options: [
        { key: 'A', text: `Option A statement for question #${i + 1}` },
        { key: 'B', text: `Option B statement for question #${i + 1}` },
        { key: 'C', text: `Option C statement for question #${i + 1}` },
        { key: 'D', text: `Option D statement for question #${i + 1}` },
        { key: 'E', text: `None of the above` },
      ],
      subject: i < 80 ? 'Computer Science Core' : i < 120 ? 'General Studies' : 'Qualifying Language',
      topic: `Unit ${(i % 10) + 1}`,
      difficulty: i % 3 === 0 ? 'EASY' : i % 3 === 1 ? 'MEDIUM' : 'HARD',
    }));

    setQuestions(mockQuestionsList);
  }, [attemptId]);

  // Focus Violation Detector (Page Visibility & Window Blur)
  const handleFocusLoss = useCallback(() => {
    setFocusViolations((prev) => {
      const nextCount = prev + 1;
      if (nextCount >= 6) {
        // 6th Violation -> Automatic Cancellation
        router.push(`/exam/${attemptId}/cancelled`);
      } else {
        setShowWarningModal(true);
      }
      return nextCount;
    });
  }, [attemptId, router]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        handleFocusLoss();
      }
    };
    const onWindowBlur = () => {
      handleFocusLoss();
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('blur', onWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('blur', onWindowBlur);
    };
  }, [handleFocusLoss]);

  const handleSubmitTest = useCallback(async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push(`/exam/${attemptId}/result`);
    }, 1000);
  }, [attemptId, router]);

  // Countdown Timer
  useEffect(() => {
    if (timeLeftSeconds <= 0) {
      handleSubmitTest();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeftSeconds, handleSubmitTest]);

  // Navigation Handlers
  const currentQNum = currentQIndex + 1;
  const currentQ = questions[currentQIndex];
  const currentAns = userAnswers.get(currentQNum);

  const handleSelectOption = (optKey: 'A' | 'B' | 'C' | 'D' | 'E') => {
    const existing = userAnswers.get(currentQNum) || { questionNumber: currentQNum };
    const updated = { ...existing, selectedOption: optKey };
    const newMap = new Map(userAnswers);
    newMap.set(currentQNum, updated);
    setUserAnswers(newMap);
  };

  const handleClearResponse = () => {
    const existing = userAnswers.get(currentQNum);
    if (existing) {
      const updated = { ...existing, selectedOption: undefined };
      const newMap = new Map(userAnswers);
      newMap.set(currentQNum, updated);
      setUserAnswers(newMap);
    }
  };

  const handleToggleMarkForReview = () => {
    const existing = userAnswers.get(currentQNum) || { questionNumber: currentQNum };
    const updated = { ...existing, markedForReview: !existing.markedForReview };
    const newMap = new Map(userAnswers);
    newMap.set(currentQNum, updated);
    setUserAnswers(newMap);
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQIndex(index);
    setVisitedSet((prev) => new Set(prev).add(index + 1));
    setPaletteMobileOpen(false);
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      handleJumpToQuestion(currentQIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      handleJumpToQuestion(currentQIndex - 1);
    }
  };

  // Metrics summary for submit modal
  const answeredCount = Array.from(userAnswers.values()).filter((a) => a.selectedOption).length;
  const reviewCount = Array.from(userAnswers.values()).filter((a) => a.markedForReview).length;
  const unattemptedCount = 150 - answeredCount;

  // Helper function to calculate question badge color
  const getBadgeStyle = (qNum: number) => {
    const ans = userAnswers.get(qNum);
    const isVisited = visitedSet.has(qNum);

    if (ans?.markedForReview && ans?.selectedOption) {
      return 'bg-purple-600 text-white font-bold ring-2 ring-emerald-400'; // Answered & Marked
    }
    if (ans?.markedForReview) {
      return 'bg-purple-600 text-white font-bold'; // Marked for Review
    }
    if (ans?.selectedOption) {
      return 'bg-emerald-600 text-white font-bold'; // Answered
    }
    if (isVisited) {
      return 'bg-rose-500 text-white font-bold'; // Visited but Not Answered
    }
    return 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'; // Unvisited
  };

  if (!currentQ) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* HEADER */}
      <header className="bg-slate-900 text-white px-4 py-3 border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-base sm:text-lg text-white">
              STET / BPSC TRE Full Mock
            </span>
            <Badge variant="stet" className="hidden sm:inline-flex bg-indigo-900 text-indigo-200">
              150 Questions
            </Badge>
          </div>

          {/* Center: Timer & Anti-Cheat Badge */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800 px-3.5 py-1.5 rounded-lg border border-slate-700 text-amber-400 font-mono font-bold text-sm sm:text-base">
              <Clock className="w-4 h-4 animate-pulse text-amber-400" />
              <span>{formatTimeMinutes(timeLeftSeconds)}</span>
            </div>

            {/* Focus Violation Badge */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                focusViolations > 0
                  ? 'bg-rose-950 text-rose-300 border-rose-800 animate-bounce'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Focus Loss: {focusViolations}/5</span>
            </div>
          </div>

          {/* Right: Submit Button & Mobile Drawer Trigger */}
          <div className="flex items-center gap-2">
            <Button
              variant="bpsc"
              size="sm"
              onClick={() => setShowSubmitModal(true)}
              rightIcon={<Send className="w-4 h-4" />}
            >
              Submit Exam
            </Button>
            <button
              onClick={() => setPaletteMobileOpen(!paletteMobileOpen)}
              className="lg:hidden p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN TEST CONTAINER */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* QUESTION PANEL (Left - 8 cols) */}
        <main className="lg:col-span-8 flex flex-col justify-between bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="space-y-6">
            {/* Question Header Meta */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                  Question {currentQNum} of 150
                </span>
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-100">
                  {currentQ.subject}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded">
                +1.0 Mark | Single Choice
              </span>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {currentQ.questionText}
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = currentAns?.selectedOption === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'bg-brand-50 border-brand-500 text-brand-950 ring-2 ring-brand-500/20 font-semibold'
                        : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {opt.key}
                    </div>
                    <span className="leading-snug">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Control Actions */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearResponse}
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Clear
              </Button>
              <Button
                variant={currentAns?.markedForReview ? 'secondary' : 'outline'}
                size="sm"
                onClick={handleToggleMarkForReview}
                leftIcon={<Bookmark className="w-3.5 h-3.5" />}
              >
                {currentAns?.markedForReview ? 'Marked' : 'Mark for Review'}
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentQIndex === 0}
                onClick={handlePrev}
                leftIcon={<ChevronLeft className="w-4 h-4" />}
              >
                Previous
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={currentQIndex === questions.length - 1}
                onClick={handleNext}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Save & Next
              </Button>
            </div>
          </div>
        </main>

        {/* QUESTION PALETTE PANEL (Right - 4 cols) */}
        <aside
          className={`lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5 flex flex-col justify-between ${
            paletteMobileOpen ? 'fixed inset-0 z-40 p-6 overflow-y-auto' : 'hidden lg:flex'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">150 Question Palette</h3>
              {paletteMobileOpen && (
                <button onClick={() => setPaletteMobileOpen(false)}>
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              )}
            </div>

            {/* Legend Indicators */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 py-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" /> Answered
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> Not Answered
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-600 inline-block" /> Marked Review
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-200 inline-block" /> Not Visited
              </div>
            </div>

            {/* 150 Question Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2 max-h-[50vh] overflow-y-auto py-4 pr-1">
              {Array.from({ length: 150 }).map((_, idx) => {
                const qNum = idx + 1;
                const isCurrent = currentQIndex === idx;
                return (
                  <button
                    key={qNum}
                    onClick={() => handleJumpToQuestion(idx)}
                    className={`h-9 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${getBadgeStyle(
                      qNum
                    )} ${isCurrent ? 'ring-2 ring-brand-600 scale-105 shadow-sm' : ''}`}
                  >
                    {qNum}
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            variant="bpsc"
            className="w-full"
            onClick={() => setShowSubmitModal(true)}
          >
            Submit Final Paper
          </Button>
        </aside>
      </div>

      {/* FOCUS VIOLATION WARNING MODAL (1 to 5 Warnings) */}
      <Modal
        isOpen={showWarningModal}
        onClose={() => setShowWarningModal(false)}
        title="⚠️ Focus Loss Warning Detected"
        maxWidth="md"
      >
        <div className="space-y-4">
          <Alert variant="danger" title={`Warning ${focusViolations} of 5`}>
            Browser tab switching or focus loss was detected. Please remain on the exam interface.
          </Alert>
          <p className="text-xs text-slate-600 leading-relaxed">
            Exam rules permit up to 5 warnings. On the 6th focus violation, your test attempt will be <strong>automatically cancelled by backend authority</strong> and results withheld.
          </p>
          <Button variant="danger" className="w-full" onClick={() => setShowWarningModal(false)}>
            I Understand — Return to Exam
          </Button>
        </div>
      </Modal>

      {/* SUBMIT CONFIRMATION MODAL */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Confirm Test Submission"
        maxWidth="md"
      >
        <div className="space-y-5 text-sm">
          <p className="text-slate-600 text-xs leading-relaxed">
            Are you sure you want to submit your test? Review your response summary below before finalizing.
          </p>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
              <div className="text-xl font-extrabold text-emerald-700">{answeredCount}</div>
              <div className="text-[11px] text-emerald-800 font-medium">Answered</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-xl border border-purple-200">
              <div className="text-xl font-extrabold text-purple-700">{reviewCount}</div>
              <div className="text-[11px] text-purple-800 font-medium">Marked Review</div>
            </div>
            <div className="bg-slate-100 p-3 rounded-xl border border-slate-200">
              <div className="text-xl font-extrabold text-slate-700">{unattemptedCount}</div>
              <div className="text-[11px] text-slate-600 font-medium">Unattempted</div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="w-1/2"
              onClick={() => setShowSubmitModal(false)}
            >
              Resume Test
            </Button>
            <Button
              variant="bpsc"
              className="w-1/2"
              isLoading={isSubmitting}
              onClick={handleSubmitTest}
            >
              Final Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
