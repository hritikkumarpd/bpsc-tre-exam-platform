import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AccordionItem } from '@/components/ui/accordion';
import { AdSensePlaceholder } from '@/components/ui/adsense-placeholder';
import { Trophy, CheckCircle2, XCircle, MinusCircle, BarChart3, ArrowLeft, Bookmark } from 'lucide-react';

export const metadata = {
  title: 'Exam Performance Result & Diagnostic Analysis',
  description: 'Authoritative test result breakdown: score, accuracy %, topic performance, weak-topic detection, and step-by-step verified explanations.',
};

export default function ExamResultPage({ params }: { params: { attemptId: string } }) {
  // Demo Result Benchmark metrics (authoritative server response simulation)
  const result = {
    attemptId: params.attemptId,
    examTitle: 'BPSC TRE CSE Full Mock Test #01',
    score: 124,
    totalMarks: 150,
    correctCount: 128,
    wrongCount: 16,
    skippedCount: 6,
    accuracyPercentage: 88.8,
    attemptedPercentage: 96.0,
    timeTaken: '128 Mins',
    rank: 4,
    percentile: '98.5%',
    weakTopics: ['CPU Scheduling Deadlocks', 'SQL Outer Joins', 'Subnetting Calculation'],
    topicBreakdown: [
      { topic: 'Data Structures & Algorithms', attempted: 35, correct: 32, accuracy: '91.4%' },
      { topic: 'Operating Systems', attempted: 30, correct: 24, accuracy: '80.0%' },
      { topic: 'Database Management Systems', attempted: 25, correct: 20, accuracy: '80.0%' },
      { topic: 'Computer Networks', attempted: 25, correct: 23, accuracy: '92.0%' },
      { topic: 'General Aptitude & Reasoning', attempted: 29, correct: 29, accuracy: '100.0%' },
    ],
  };

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Authoritative Performance Analytics"
        description={`Result report for ${result.examTitle}`}
        breadcrumbs={[{ label: 'Test Result' }]}
        badge={{ text: 'Verified Score Card', variant: 'success' }}
      >
        <Link href="/bpsc-tre/mock-tests">
          <Button variant="outline" className="bg-slate-800 text-white border-slate-700" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Mocks
          </Button>
        </Link>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* SCORE CARD METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-t-4 border-t-brand-600 bg-brand-50/20">
            <CardContent className="pt-6 text-center space-y-1">
              <div className="text-3xl font-extrabold text-brand-950">
                {result.score} <span className="text-sm font-normal text-slate-500">/ {result.totalMarks}</span>
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-brand-700">Authoritative Score</div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-emerald-600 bg-emerald-50/20">
            <CardContent className="pt-6 text-center space-y-1">
              <div className="text-3xl font-extrabold text-emerald-700">{result.accuracyPercentage}%</div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">Overall Accuracy</div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-amber-500 bg-amber-50/20">
            <CardContent className="pt-6 text-center space-y-1">
              <div className="text-3xl font-extrabold text-amber-700">#{result.rank}</div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800">State Percentile: {result.percentile}</div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-indigo-600 bg-indigo-50/20">
            <CardContent className="pt-6 text-center space-y-1">
              <div className="text-3xl font-extrabold text-indigo-950">{result.timeTaken}</div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-700">Time Consumed</div>
            </CardContent>
          </Card>
        </div>

        {/* DETAILED STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">{result.correctCount} Questions</div>
                <div className="text-xs text-slate-500">Correct Answers</div>
              </div>
            </div>
            <span className="text-sm font-semibold text-emerald-700">+128.0 Marks</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-3">
              <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">{result.wrongCount} Questions</div>
                <div className="text-xs text-slate-500">Wrong Answers</div>
              </div>
            </div>
            <span className="text-sm font-semibold text-rose-600">-4.0 Marks (-0.25)</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-3">
              <MinusCircle className="w-6 h-6 text-slate-400 shrink-0" />
              <div>
                <div className="font-bold text-slate-900">{result.skippedCount} Questions</div>
                <div className="text-xs text-slate-500">Skipped / Unattempted</div>
              </div>
            </div>
            <span className="text-sm font-semibold text-slate-500">0.0 Marks</span>
          </div>
        </div>

        {/* WEAK TOPIC DETECTION BANNER */}
        <Card className="border-l-4 border-l-rose-500 bg-rose-50/40">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-base">
              <BarChart3 className="w-5 h-5 text-rose-600" />
              <span>Automated Weak-Topic Diagnostic Detection</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Based on your incorrect and skipped responses, focus your next review session on these specific sub-topics:
            </p>
            <div className="flex flex-wrap gap-2">
              {result.weakTopics.map((topic, i) => (
                <Badge key={i} variant="hard" className="text-xs py-1 px-3">
                  ⚠️ {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ADSENSE PLACEHOLDER */}
        <AdSensePlaceholder slotId="result-middle" format="banner" />

        {/* TOPIC BREAKDOWN TABLE */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Subject & Unit Accuracy Breakdown</h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold text-slate-700 border-b border-slate-200 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3.5">Subject Unit</th>
                    <th className="px-6 py-3.5">Attempted Qs</th>
                    <th className="px-6 py-3.5">Correct Qs</th>
                    <th className="px-6 py-3.5">Unit Accuracy %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                  {result.topicBreakdown.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-semibold text-slate-900">{row.topic}</td>
                      <td className="px-6 py-4">{row.attempted}</td>
                      <td className="px-6 py-4 font-semibold text-emerald-600">{row.correct}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{row.accuracy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
