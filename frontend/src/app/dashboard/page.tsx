import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, CheckCircle2, Bookmark, AlertTriangle, ArrowRight, Play, History, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Student Dashboard | STET & BPSC TRE Prep',
  description: 'Track your test attempts, average accuracy %, weak topics diagnostic, bookmarked questions, and mistake notebook.',
};

export default function StudentDashboardPage() {
  const stats = {
    testsAttempted: 8,
    questionsSolved: 1200,
    averageAccuracy: '86.4%',
    bestScore: '134 / 150',
    weakTopics: ['CPU Scheduling Deadlocks', 'SQL Outer Joins', 'Subnetting Calculation'],
    recentAttempts: [
      { id: 'att_1', title: 'BPSC TRE CSE Mock Test #01', score: '124/150', accuracy: '88.8%', date: '04 Sep 2026', status: 'COMPLETED' },
      { id: 'att_2', title: 'STET CSE Official PYQ 2023', score: '130/150', accuracy: '91.2%', date: '01 Sep 2026', status: 'COMPLETED' },
      { id: 'att_3', title: 'BPSC TRE 3.0 Official PYQ 2024', score: '118/150', accuracy: '84.0%', date: '28 Aug 2026', status: 'COMPLETED' },
    ],
  };

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Student Performance Dashboard"
        description="Monitor your mock test metrics, track weak-topic diagnostics, and access saved review questions."
        breadcrumbs={[{ label: 'Dashboard' }]}
        badge={{ text: 'Personal Analytics Hub', variant: 'stet' }}
      >
        <div className="flex gap-3">
          <Link href="/bpsc-tre/mock-tests">
            <Button variant="bpsc" size="sm" rightIcon={<Play className="w-4 h-4 fill-current" />}>
              Attempt Next Mock
            </Button>
          </Link>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-brand-600">
            <CardContent className="pt-6 text-center space-y-1">
              <div className="text-3xl font-extrabold text-slate-900">{stats.testsAttempted}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tests Attempted</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-600">
            <CardContent className="pt-6 text-center space-y-1">
              <div className="text-3xl font-extrabold text-emerald-600">{stats.questionsSolved}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Questions Solved</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-indigo-600">
            <CardContent className="pt-6 text-center space-y-1">
              <div className="text-3xl font-extrabold text-indigo-700">{stats.averageAccuracy}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Accuracy</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="pt-6 text-center space-y-1">
              <div className="text-3xl font-extrabold text-amber-700">{stats.bestScore}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Best Mock Score</div>
            </CardContent>
          </Card>
        </div>

        {/* QUICK NAVIGATION LINK CHIPS */}
        <div className="flex flex-wrap gap-4">
          <Link href="/dashboard/history" className="flex-1">
            <Card className="hover:border-brand-300 hover:shadow-md transition-all p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Attempt History</h4>
                  <p className="text-xs text-slate-500">View past scores and scorecards</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Card>
          </Link>

          <Link href="/dashboard/bookmarks" className="flex-1">
            <Card className="hover:border-purple-300 hover:shadow-md transition-all p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Bookmarked Questions</h4>
                  <p className="text-xs text-slate-500">Saved questions for quick revision</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Card>
          </Link>

          <Link href="/dashboard/mistakes" className="flex-1">
            <Card className="hover:border-rose-300 hover:shadow-md transition-all p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Mistake Notebook</h4>
                  <p className="text-xs text-slate-500">Review wrong answers & explanations</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Card>
          </Link>
        </div>

        {/* WEAK TOPICS DIAGNOSTIC */}
        <Card className="border-l-4 border-l-rose-500 bg-rose-50/30">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Diagnostic Weak-Topic Detection</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Based on your recent test submissions, your accuracy drops on these key Computer Science sub-topics:
            </p>
            <div className="flex flex-wrap gap-2">
              {stats.weakTopics.map((topic, idx) => (
                <Badge key={idx} variant="hard" className="text-xs py-1 px-3">
                  ⚠️ {topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* RECENT ATTEMPTS TABLE */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-lg">Recent Test Attempts</h3>
            <Link href="/dashboard/history" className="text-xs font-semibold text-brand-600 hover:underline">
              View All History →
            </Link>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold text-slate-700 border-b border-slate-200 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3.5">Exam Test Title</th>
                    <th className="px-6 py-3.5">Score (/150)</th>
                    <th className="px-6 py-3.5">Accuracy %</th>
                    <th className="px-6 py-3.5">Date</th>
                    <th className="px-6 py-3.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                  {stats.recentAttempts.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-semibold text-slate-900">{row.title}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{row.score}</td>
                      <td className="px-6 py-4 font-semibold text-emerald-600">{row.accuracy}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">{row.date}</td>
                      <td className="px-6 py-4">
                        <Link href={`/exam/${row.id}/result`}>
                          <Button variant="outline" size="sm">
                            View Result
                          </Button>
                        </Link>
                      </td>
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
