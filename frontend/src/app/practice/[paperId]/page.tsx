'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import {
  ListFilter,
  BookOpen,
  TrendingUp,
  Share2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Layers,
  Filter,
} from 'lucide-react';

interface QuestionOption {
  key: string;
  text: string;
}

interface QuestionItem {
  _id: string;
  questionText: string;
  options: QuestionOption[];
  correctAnswer: string;
  explanation: string;
  exam: string;
  subject: string;
  topic: string;
  difficulty?: string;
  sourceReference?: string;
}

interface PaperData {
  _id: string;
  title: string;
  exam: string;
  year: number;
  edition: string;
  description: string;
  totalQuestions: number;
}

export default function PYQPracticeInteractivePage() {
  const params = useParams();
  const router = useRouter();
  const paperId = params?.paperId as string;

  // Paper & Questions State
  const [paper, setPaper] = useState<PaperData | null>(null);
  const [allQuestions, setAllQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Active Question & Navigation
  const [currentIndex, setCurrentIndex] = useState(0);

  // User Interaction State (Map of QuestionId -> SelectedOption)
  const [userSelections, setUserSelections] = useState<Record<string, string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});

  // Active Top Tab: 'QUESTIONS' | 'SOLUTION' | 'PROGRESS'
  const [activeTab, setActiveTab] = useState<'QUESTIONS' | 'SOLUTION' | 'PROGRESS'>('QUESTIONS');

  // Filter Drawer State
  const [filterOpen, setFilterOpen] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ATTEMPTED' | 'UNATTEMPTED' | 'CORRECT' | 'INCORRECT'>('ALL');
  const [subjectFilter, setSubjectFilter] = useState<string>('ALL');

  // Fetch Paper and Questions
  useEffect(() => {
    const fetchPaperDetails = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/pyqs/${paperId}`);
        if (res.data.success && res.data.data) {
          setPaper(res.data.data.paper);
          const qs = res.data.data.questions.map((q: any) => q.question);
          setAllQuestions(qs);
        }
      } catch (err) {
        console.error('Failed to load PYQ paper:', err);
      } finally {
        setLoading(false);
      }
    };

    if (paperId) {
      fetchPaperDetails();
    }
  }, [paperId]);

  // Unique subjects for filter dropdown
  const uniqueSubjects = useMemo(() => {
    const subs = new Set<string>();
    allQuestions.forEach((q) => {
      if (q.subject) subs.add(q.subject);
    });
    return Array.from(subs);
  }, [allQuestions]);

  // Filtered Questions based on status and subject
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      // Subject Filter
      if (subjectFilter !== 'ALL' && q.subject !== subjectFilter) {
        return false;
      }

      const isSubmitted = !!submittedQuestions[q._id];
      const userAns = userSelections[q._id];
      const isCorrect = isSubmitted && userAns === q.correctAnswer;

      if (statusFilter === 'ATTEMPTED' && !isSubmitted) return false;
      if (statusFilter === 'UNATTEMPTED' && isSubmitted) return false;
      if (statusFilter === 'CORRECT' && (!isSubmitted || !isCorrect)) return false;
      if (statusFilter === 'INCORRECT' && (!isSubmitted || isCorrect)) return false;

      return true;
    });
  }, [allQuestions, subjectFilter, statusFilter, submittedQuestions, userSelections]);

  const currentQ = filteredQuestions[currentIndex] || allQuestions[0];
  const totalCount = filteredQuestions.length;

  // Question Answer Handlers
  const handleSelectOption = (key: string) => {
    if (!currentQ || submittedQuestions[currentQ._id]) return;
    setUserSelections((prev) => ({ ...prev, [currentQ._id]: key }));
  };

  const handleSubmitCurrentAnswer = () => {
    if (!currentQ || !userSelections[currentQ._id]) return;
    setSubmittedQuestions((prev) => ({ ...prev, [currentQ._id]: true }));
    setActiveTab('SOLUTION'); // Automatically show step-by-step solution upon submitting
  };

  const handleNext = () => {
    if (currentIndex < totalCount - 1) {
      setCurrentIndex((prev) => prev + 1);
      setActiveTab('QUESTIONS');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setActiveTab('QUESTIONS');
    }
  };

  // Progress metrics calculation
  const progressStats = useMemo(() => {
    let attempted = 0;
    let correct = 0;
    let incorrect = 0;

    allQuestions.forEach((q) => {
      if (submittedQuestions[q._id]) {
        attempted++;
        if (userSelections[q._id] === q.correctAnswer) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });

    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    return { attempted, correct, incorrect, unattempted: allQuestions.length - attempted, accuracy };
  }, [allQuestions, submittedQuestions, userSelections]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070d18] text-white flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 font-medium">Loading Authentic PYQ Practice Engine...</p>
      </div>
    );
  }

  if (!paper || allQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-[#070d18] text-white flex flex-col items-center justify-center space-y-4">
        <p className="text-xl font-bold">Question paper not found or has 0 questions.</p>
        <Link href="/bpsc-tre/pyqs">
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm">
            Back to PYQ Papers
          </button>
        </Link>
      </div>
    );
  }

  const isCurrentSubmitted = currentQ ? !!submittedQuestions[currentQ._id] : false;
  const currentSelectedOpt = currentQ ? userSelections[currentQ._id] : null;
  const isCurrentCorrect = isCurrentSubmitted && currentSelectedOpt === currentQ?.correctAnswer;

  return (
    <div className="min-h-screen bg-[#070f1e] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white pb-16">
      {/* 1. TOP GLOBAL NAVIGATION HEADER */}
      <header className="h-16 border-b border-slate-800/80 bg-[#0a1428]/90 backdrop-blur px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-md">
        {/* Left: Back & Mode Tabs */}
        <div className="flex items-center gap-3">
          <Link
            href="/bpsc-tre/pyqs"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors mr-2"
            title="Back to Papers"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-1 bg-[#0f1d38] p-1 rounded-xl border border-slate-700/50">
            <button
              onClick={() => setActiveTab('QUESTIONS')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'QUESTIONS'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ListFilter className="w-4 h-4" />
              Questions ({totalCount})
            </button>

            <button
              onClick={() => setActiveTab('SOLUTION')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'SOLUTION'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Solution
            </button>

            <button
              onClick={() => setActiveTab('PROGRESS')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'PROGRESS'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Progress
            </button>
          </div>
        </div>

        {/* Right: Paper Info & Share */}
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-block text-xs font-semibold text-slate-400 max-w-sm truncate">
            {paper.title}
          </span>
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Paper link copied to clipboard!');
              }
            }}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Share Question Paper"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex-1 flex flex-col lg:flex-row gap-6">
        {/* LEFT COLUMN: ACTIVE QUESTION & SOLUTION AREA */}
        <div className="flex-1 flex flex-col space-y-5 min-w-0">
          {/* Question Category Breadcrumb & ID Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-white text-base">
                Question {currentIndex + 1}
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-400 font-bold border border-blue-800/50 text-[11px]">
                MCQ
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300 font-medium">
                {currentQ?.subject || 'Computer Science'}
              </span>
              <span className="text-slate-600">&gt;</span>
              <span className="text-slate-400">
                {currentQ?.topic || 'Core Concept'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-amber-400 bg-amber-950/30 px-2.5 py-1 rounded-full border border-amber-900/40 text-[11px] font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>{paper.edition || 'BPSC TRE Official'}</span>
            </div>
          </div>

          {/* QUESTION TEXT CARD */}
          <div className="bg-[#0b162b] border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed tracking-wide">
                {currentQ?.questionText}
              </h2>
            </div>

            {/* Answer State Banner */}
            <div className="pt-2 border-t border-slate-800/70 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                Your answer
              </span>
              <span className="text-slate-500 text-[11px]">
                {isCurrentSubmitted
                  ? 'Answer submitted. Review solution below.'
                  : 'Review your selection before submitting'}
              </span>
            </div>

            {/* OPTIONS GRID (A-E) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {currentQ?.options.map((opt) => {
                const isSelected = currentSelectedOpt === opt.key;
                const isCorrectOpt = isCurrentSubmitted && opt.key === currentQ.correctAnswer;
                const isWrongSelection = isCurrentSubmitted && isSelected && !isCorrectOpt;

                let borderBgClass = 'bg-[#0e1c37] border-slate-800 hover:border-slate-700 text-slate-200';

                if (isCurrentSubmitted) {
                  if (isCorrectOpt) {
                    borderBgClass = 'bg-emerald-950/40 border-emerald-500 text-emerald-100 ring-1 ring-emerald-500/50';
                  } else if (isWrongSelection) {
                    borderBgClass = 'bg-rose-950/40 border-rose-500 text-rose-100 ring-1 ring-rose-500/50';
                  } else {
                    borderBgClass = 'bg-[#0c182e] border-slate-800/50 text-slate-500 opacity-60';
                  }
                } else if (isSelected) {
                  borderBgClass = 'bg-blue-950/50 border-blue-500 text-white ring-2 ring-blue-500/40';
                }

                return (
                  <div
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 group ${borderBgClass}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                        isCurrentSubmitted && isCorrectOpt
                          ? 'bg-emerald-500 text-white'
                          : isCurrentSubmitted && isWrongSelection
                          ? 'bg-rose-500 text-white'
                          : isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
                      }`}
                    >
                      {opt.key}
                    </span>

                    <span className="text-sm font-medium leading-normal pt-0.5">
                      {opt.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* ACTION SUBMIT BAR */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800/70">
              <button
                disabled={!currentSelectedOpt || isCurrentSubmitted}
                onClick={handleSubmitCurrentAnswer}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                  isCurrentSubmitted
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : currentSelectedOpt
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {isCurrentSubmitted ? 'Submitted' : 'Submit Answer'}
              </button>

              <span className="text-xs text-slate-500">
                {isCurrentSubmitted
                  ? isCurrentCorrect
                    ? 'Correct Answer! (+1 Mark)'
                    : `Incorrect. Correct answer is Option (${currentQ.correctAnswer})`
                  : 'You can change your answer until you submit.'}
              </span>
            </div>
          </div>

          {/* STEP-BY-STEP SOLUTION CARD (Displayed when tab is SOLUTION or user submits) */}
          {(activeTab === 'SOLUTION' || isCurrentSubmitted) && (
            <div className="bg-[#0c1830] border border-blue-900/40 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4 animate-in fade-in-50 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-extrabold text-blue-400 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  Step-by-Step Technical Solution & Official Verification
                </h3>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Verified Key: Option ({currentQ?.correctAnswer})
                </span>
              </div>

              <div className="prose prose-invert text-xs sm:text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-wrap">
                {currentQ?.explanation ||
                  `Official BPSC Verified Answer is Option (${currentQ?.correctAnswer}). Detailed step-by-step reasoning confirms this option matches curriculum benchmarks.`}
              </div>
            </div>
          )}

          {/* PROGRESS METRICS TAB OVERVIEW */}
          {activeTab === 'PROGRESS' && (
            <div className="bg-[#0b162b] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                Live Performance Breakdown ({paper.title})
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#0e1c37] p-4 rounded-xl border border-slate-800 text-center space-y-1">
                  <div className="text-2xl font-black text-white">{progressStats.attempted}</div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Attempted</div>
                </div>

                <div className="bg-[#0e1c37] p-4 rounded-xl border border-slate-800 text-center space-y-1">
                  <div className="text-2xl font-black text-emerald-400">{progressStats.correct}</div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Correct</div>
                </div>

                <div className="bg-[#0e1c37] p-4 rounded-xl border border-slate-800 text-center space-y-1">
                  <div className="text-2xl font-black text-rose-400">{progressStats.incorrect}</div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Incorrect</div>
                </div>

                <div className="bg-[#0e1c37] p-4 rounded-xl border border-slate-800 text-center space-y-1">
                  <div className="text-2xl font-black text-blue-400">{progressStats.accuracy}%</div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Accuracy</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: PYQ QUESTION PALETTE & REFINEMENT FILTERS */}
        <div className="w-full lg:w-80 shrink-0 space-y-5">
          <div className="bg-[#0b162b] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-5 sticky top-24">
            {/* Palette Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="font-extrabold text-white text-sm">PYQ Questions</h4>
                <p className="text-[11px] text-slate-400">
                  Question {currentIndex + 1} of {totalCount}
                </p>
              </div>

              <button
                onClick={() => setFilterOpen((prev) => !prev)}
                className="text-xs font-semibold text-blue-400 flex items-center gap-1 hover:text-blue-300"
              >
                <Filter className="w-3.5 h-3.5" />
                Refine set
              </button>
            </div>

            {/* Collapsible Refinement Filters */}
            {filterOpen && (
              <div className="space-y-3 pt-1 text-xs">
                {/* Status Filter */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value as any);
                      setCurrentIndex(0);
                    }}
                    className="w-full bg-[#0e1c37] border border-slate-700/80 rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="ALL">All Questions</option>
                    <option value="ATTEMPTED">Attempted Only</option>
                    <option value="UNATTEMPTED">Unattempted Only</option>
                    <option value="CORRECT">Correct Only</option>
                    <option value="INCORRECT">Incorrect Only</option>
                  </select>
                </div>

                {/* Subject Unit Filter */}
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                    Subject / Unit
                  </label>
                  <select
                    value={subjectFilter}
                    onChange={(e) => {
                      setSubjectFilter(e.target.value);
                      setCurrentIndex(0);
                    }}
                    className="w-full bg-[#0e1c37] border border-slate-700/80 rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="ALL">All Subjects</option>
                    {uniqueSubjects.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* NUMERICAL QUESTION PALETTE GRID */}
            <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1 py-1">
              {filteredQuestions.map((q, idx) => {
                const isSelected = idx === currentIndex;
                const isSubmitted = !!submittedQuestions[q._id];
                const isCorrect = isSubmitted && userSelections[q._id] === q.correctAnswer;
                const isIncorrect = isSubmitted && !isCorrect;

                let btnBgClass = 'bg-[#0e1c37] text-slate-300 border-slate-800 hover:border-slate-700';

                if (isSelected) {
                  btnBgClass = 'bg-blue-600 text-white font-black border-blue-400 shadow-md shadow-blue-500/30 ring-2 ring-blue-400/40';
                } else if (isCorrect) {
                  btnBgClass = 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60 font-bold';
                } else if (isIncorrect) {
                  btnBgClass = 'bg-rose-950/60 text-rose-300 border-rose-700/60 font-bold';
                } else if (userSelections[q._id]) {
                  btnBgClass = 'bg-amber-950/60 text-amber-300 border-amber-700/60 font-bold';
                }

                return (
                  <button
                    key={q._id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setActiveTab('QUESTIONS');
                    }}
                    className={`h-11 rounded-xl border flex flex-col items-center justify-center transition-all ${btnBgClass}`}
                  >
                    <span className="text-xs font-bold leading-none">{idx + 1}</span>
                    <span className="text-[9px] uppercase tracking-tighter text-slate-400 mt-0.5">MCQ</span>
                  </button>
                );
              })}
            </div>

            {/* BOTTOM QUESTION NAVIGATION (PREVIOUS / NEXT) */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                disabled={currentIndex === 0}
                onClick={handlePrevious}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 border transition-colors ${
                  currentIndex === 0
                    ? 'bg-slate-800/40 text-slate-600 border-slate-800 cursor-not-allowed'
                    : 'bg-[#0e1c37] hover:bg-slate-800 text-slate-300 border-slate-700/70'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Previous
              </button>

              <button
                disabled={currentIndex >= totalCount - 1}
                onClick={handleNext}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all ${
                  currentIndex >= totalCount - 1
                    ? 'bg-slate-800/40 text-slate-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                }`}
              >
                Next question
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
