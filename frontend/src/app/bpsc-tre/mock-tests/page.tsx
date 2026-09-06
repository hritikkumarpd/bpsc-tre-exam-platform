'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdSensePlaceholder } from '@/components/ui/adsense-placeholder';
import { Lock, Clock, Play, Award, FileText, CheckCircle2, Filter } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function BpscMockTestsPage() {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'MOCK' | 'PYQ'>('ALL');

  // Unified 15 Tests (11 Mocks + 4 Official PYQs)
  const allTests = [
    {
      testNumber: 1,
      id: 'bpsc-mock-1',
      title: 'BPSC TRE CSE Full Mock Test #01',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: '-0.25 Mark / Wrong',
      releaseAt: '2026-09-01T00:00:00.000Z',
      isReleased: true,
      description: 'Pattern: 80 CS Core + 40 GS + 30 Qualifying Language. Strict negative marking simulation.',
      attemptUrl: '/practice/6a9c5790ea166f234076c4a8',
    },
    {
      testNumber: 2,
      id: 'bpsc-mock-2',
      title: 'BPSC TRE CSE Full Mock Test #02',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: '-0.25 Mark / Wrong',
      releaseAt: '2026-09-03T00:00:00.000Z',
      isReleased: true,
      description: 'Comprehensive test covering Advanced OOPs in C++, DBMS Normalization, SQL & Networking.',
      attemptUrl: '/practice/6a9c578eea166f234076c31f',
    },
    {
      testNumber: 3,
      id: 'bpsc-mock-3',
      title: 'BPSC TRE CSE Full Mock Test #03',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: '-0.25 Mark / Wrong',
      releaseAt: '2026-09-05T00:00:00.000Z',
      isReleased: true,
      description: 'High-difficulty mock focusing on Data Structures (Trees, Graphs), Algorithms & Python scripting.',
      attemptUrl: '/practice/6a9c578dea166f234076c194',
    },
    {
      testNumber: 4,
      id: 'bpsc-mock-4',
      title: 'BPSC TRE CSE Full Mock Test #04',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: '-0.25 Mark / Wrong',
      releaseAt: '2026-09-07T00:00:00.000Z',
      isReleased: true,
      description: 'OS Process Synchronization, Memory Management, CPU Scheduling & Digital Electronics.',
      attemptUrl: '/practice/6a9c5790ea166f234076c4a8',
    },
    {
      testNumber: 5,
      id: 'bpsc-mock-5',
      title: 'BPSC TRE CSE Full Mock Test #05',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: '-0.25 Mark / Wrong',
      releaseAt: '2026-09-09T00:00:00.000Z',
      isReleased: true,
      description: 'Computer Networks, TCP/IP, Cryptography, Web Technologies (HTML/CSS/JS) & General Studies.',
      attemptUrl: '/practice/6a9c578eea166f234076c31f',
    },
    {
      testNumber: 6,
      id: 'bpsc-mock-6',
      title: 'BPSC TRE CSE Full Mock Test #06',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: '-0.25 Mark / Wrong',
      releaseAt: '2026-09-11T00:00:00.000Z',
      isReleased: false,
      description: 'Special emphasis on Bihar General Studies, Modern History & Science + 80 CS questions.',
      attemptUrl: '#',
    },
    {
      testNumber: 7,
      id: 'bpsc-mock-7',
      title: 'BPSC TRE CSE Full Mock Test #07',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: '-0.25 Mark / Wrong',
      releaseAt: '2026-09-13T00:00:00.000Z',
      isReleased: false,
      description: 'Full syllabus simulation covering complete Class 11-12 NCERT/SCERT CS curriculum.',
      attemptUrl: '#',
    },
    {
      testNumber: 8,
      id: 'bpsc-mock-8',
      title: 'BPSC TRE CSE Full Mock Test #08',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: '-0.25 Mark / Wrong',
      releaseAt: '2026-09-15T00:00:00.000Z',
      isReleased: false,
      description: 'Speed & Accuracy special test: 150 questions in 150 minutes with real timer constraint.',
      attemptUrl: '#',
    },
    {
      testNumber: 9,
      id: 'bpsc-mock-9',
      title: 'BPSC TRE CSE Full Mock Test #09',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: '-0.25 Mark / Wrong',
      releaseAt: '2026-09-17T00:00:00.000Z',
      isReleased: false,
      description: 'Advanced Level Test: Software Engineering models, Boolean Algebra & Combinational Circuits.',
      attemptUrl: '#',
    },
    {
      testNumber: 10,
      id: 'bpsc-mock-10',
      title: 'BPSC TRE CSE Full Mock Test #10',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: '-0.25 Mark / Wrong',
      releaseAt: '2026-09-19T00:00:00.000Z',
      isReleased: false,
      description: 'Full Length Mock 10: Curated questions based on TRE 3.0 trend analysis.',
      attemptUrl: '#',
    },
    {
      testNumber: 11,
      id: 'bpsc-mock-11',
      title: 'BPSC TRE CSE Full Mock Test #11',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: '-0.25 Mark / Wrong',
      releaseAt: '2026-09-21T00:00:00.000Z',
      isReleased: false,
      description: 'Grand Mock 11: Final full-syllabus rehearsal before attempting previous year papers.',
      attemptUrl: '#',
    },
    {
      testNumber: 12,
      id: 'bpsc-pyq-1',
      title: 'Official PYQ 2023 — BPSC TRE 1.0 CSE Paper',
      type: 'PYQ' as const,
      tag: 'Official PYQ 2023',
      totalQuestions: 120,
      totalMarks: 120,
      durationMinutes: 120,
      negativeMarking: 'Zero (As per TRE 1.0 Key)',
      releaseAt: '2023-08-26T00:00:00.000Z',
      isReleased: true,
      description: 'Original BPSC TRE 1.0 exam paper (August 2023). 80 CS Core + 40 General Studies. Official answer key verified.',
      attemptUrl: '/practice/6a9c578dea166f234076c194',
    },
    {
      testNumber: 13,
      id: 'bpsc-pyq-2',
      title: 'Official PYQ 2023 — BPSC TRE 2.0 CSE Paper',
      type: 'PYQ' as const,
      tag: 'Official PYQ 2023',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'Zero (Official Key Verified)',
      releaseAt: '2023-12-15T00:00:00.000Z',
      isReleased: true,
      description: 'Original BPSC TRE 2.0 exam paper (December 2023). 30 Language + 40 GS + 80 CS Core.',
      attemptUrl: '/practice/6a9c578eea166f234076c31f',
    },
    {
      testNumber: 14,
      id: 'bpsc-pyq-3',
      title: 'Official PYQ 2024 — BPSC TRE 3.0 CSE Paper',
      type: 'PYQ' as const,
      tag: 'Official PYQ 2024',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'Zero (Official Key Verified)',
      releaseAt: '2024-07-20T00:00:00.000Z',
      isReleased: true,
      description: 'Official BPSC TRE 3.0 Re-exam paper (July 2024). Highest standard competitive questions with verified solutions.',
      attemptUrl: '/practice/6a9c5790ea166f234076c4a8',
    },
    {
      testNumber: 15,
      id: 'bpsc-pyq-4',
      title: 'Official PYQ 2022 — BPSC Lecturer / PGT CS Paper',
      type: 'PYQ' as const,
      tag: 'Official PYQ 2022',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'Zero (Official Key Verified)',
      releaseAt: '2022-10-10T00:00:00.000Z',
      isReleased: true,
      description: 'Previous recruitment paper for Bihar Computer Science Teaching cadre (2022). Comprehensive topic foundation.',
      attemptUrl: '/practice/6a9c5790ea166f234076c4a8',
    },
  ];

  const filteredTests = allTests.filter((test) => {
    if (activeFilter === 'ALL') return true;
    return test.type === activeFilter;
  });

  const mockCount = allTests.filter((t) => t.type === 'MOCK').length;
  const pyqCount = allTests.filter((t) => t.type === 'PYQ').length;

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="BPSC TRE Computer Science — 15 Tests Series"
        description="Unified 15-Test Series consisting of 11 Full Mocks and 4 Official Previous Year Papers (TRE 1.0, 2.0, 3.0 & 2022) with verified solutions."
        breadcrumbs={[{ label: 'BPSC TRE', href: '/bpsc-tre' }, { label: '15 Tests Series' }]}
        badge={{ text: 'Total 15 Tests (Mocks + PYQs)', variant: 'bpsc' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner summary */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <Award className="w-3.5 h-3.5" />
              Complete 15-Test Assessment Program
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              BPSC TRE CSE Full Series (Tests #01 – #15)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              All 15 tests are integrated into one unified sequence. Practice Mock Tests to build speed and stamina, then test yourself on authentic official previous year papers with verified answer keys.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 px-4 py-3 rounded-xl border border-slate-700 text-center">
              <div className="text-2xl font-extrabold text-emerald-400">11</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Mock Tests</div>
            </div>
            <div className="text-slate-600 font-bold text-lg">+</div>
            <div className="bg-slate-800/80 px-4 py-3 rounded-xl border border-slate-700 text-center">
              <div className="text-2xl font-extrabold text-amber-400">4</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Official PYQs</div>
            </div>
            <div className="text-slate-600 font-bold text-lg">=</div>
            <div className="bg-emerald-600/30 px-4 py-3 rounded-xl border border-emerald-500/40 text-center">
              <div className="text-2xl font-extrabold text-white">15</div>
              <div className="text-[11px] text-emerald-300 uppercase font-semibold">Total Tests</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Filter Series:</span>
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'ALL'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All 15 Tests ({allTests.length})
            </button>
            <button
              onClick={() => setActiveFilter('MOCK')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'MOCK'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Mock Tests ({mockCount})
            </button>
            <button
              onClick={() => setActiveFilter('PYQ')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFilter === 'PYQ'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Official PYQs ({pyqCount})
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">{filteredTests.length}</span> of 15 Tests
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <Card
              key={test.id}
              className={`hover:shadow-lg transition-all flex flex-col justify-between ${
                test.type === 'PYQ'
                  ? 'border-l-4 border-l-amber-500 bg-amber-50/10'
                  : test.isReleased
                  ? 'border-l-4 border-l-emerald-600 bg-white'
                  : 'border-l-4 border-l-slate-300 opacity-90 bg-slate-50/50'
              }`}
            >
              <div>
                <CardHeader>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        #{test.testNumber.toString().padStart(2, '0')}
                      </span>
                      <Badge variant={test.type === 'PYQ' ? 'warning' : test.isReleased ? 'published' : 'scheduled'}>
                        {test.tag}
                      </Badge>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {test.type === 'PYQ' ? 'Official Paper' : `Release: ${formatDate(test.releaseAt)}`}
                    </span>
                  </div>
                  <CardTitle className="text-base sm:text-lg mt-2 text-slate-900 leading-snug font-bold">
                    {test.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {test.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Pattern</span>
                    <span className="font-semibold text-slate-900">
                      {test.totalQuestions} Questions • {test.totalMarks} Marks
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Duration</span>
                    <span className="font-semibold text-slate-900">{test.durationMinutes} Minutes</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Negative Marking</span>
                    <span
                      className={`font-semibold ${
                        test.type === 'PYQ' ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      {test.negativeMarking}
                    </span>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="pt-4">
                {test.isReleased ? (
                  <Link href={test.attemptUrl} className="w-full">
                    <Button
                      variant={test.type === 'PYQ' ? 'primary' : 'bpsc'}
                      className={`w-full font-bold text-xs ${
                        test.type === 'PYQ'
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                      size="sm"
                      leftIcon={<Play className="w-4 h-4 fill-current" />}
                    >
                      Attempt Test #{test.testNumber.toString().padStart(2, '0')}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full text-slate-500 cursor-not-allowed bg-slate-100/70"
                    size="sm"
                    disabled
                    leftIcon={<Lock className="w-4 h-4 text-amber-500" />}
                  >
                    Locked (Unlocks {formatDate(test.releaseAt)})
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <AdSensePlaceholder slotId="bpsc-15-tests-bottom" format="banner" />
      </div>
    </div>
  );
}
