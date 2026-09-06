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

export default function StetMockTestsPage() {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'MOCK' | 'PYQ'>('ALL');

  // Unified 15 Tests (11 Mocks + 4 Official PYQs)
  const allTests = [
    {
      testNumber: 1,
      id: 'stet-mock-1',
      title: 'STET CSE Full Mock Test #01',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'None (0 Marks)',
      releaseAt: '2026-09-01T00:00:00.000Z',
      isReleased: true,
      description: 'Full 150-question STET pattern: 100 CS Core (DS, OS, DBMS, Networks) + 50 Teaching Art & Reasoning.',
      attemptUrl: '/practice/6a9c578eea166f234076c31f',
    },
    {
      testNumber: 2,
      id: 'stet-mock-2',
      title: 'STET CSE Full Mock Test #02',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'None (0 Marks)',
      releaseAt: '2026-09-03T00:00:00.000Z',
      isReleased: true,
      description: 'Focus on C++, Object-Oriented Programming, SQL Joins, Aggregations & Child Pedagogy.',
      attemptUrl: '/practice/6a9c5790ea166f234076c4a8',
    },
    {
      testNumber: 3,
      id: 'stet-mock-3',
      title: 'STET CSE Full Mock Test #03',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'None (0 Marks)',
      releaseAt: '2026-09-05T00:00:00.000Z',
      isReleased: true,
      description: 'Web Technology, HTML5/CSS, Networking fundamentals, Teaching Art, General Knowledge & Aptitude.',
      attemptUrl: '/practice/6a9c578dea166f234076c194',
    },
    {
      testNumber: 4,
      id: 'stet-mock-4',
      title: 'STET CSE Full Mock Test #04',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'None (0 Marks)',
      releaseAt: '2026-09-07T00:00:00.000Z',
      isReleased: true,
      description: 'Operating Systems (Process Scheduling, Deadlocks, Memory Paging) + 50 General Pedagogy Questions.',
      attemptUrl: '/practice/6a9c578eea166f234076c31f',
    },
    {
      testNumber: 5,
      id: 'stet-mock-5',
      title: 'STET CSE Full Mock Test #05',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'None (0 Marks)',
      releaseAt: '2026-09-09T00:00:00.000Z',
      isReleased: true,
      description: 'Data Structures, Binary Trees, Graph Traversals, Sorting Algorithms & Teaching Methodology.',
      attemptUrl: '/practice/6a9c5790ea166f234076c4a8',
    },
    {
      testNumber: 6,
      id: 'stet-mock-6',
      title: 'STET CSE Full Mock Test #06',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'None (0 Marks)',
      releaseAt: '2026-09-11T00:00:00.000Z',
      isReleased: false,
      description: 'Digital Logic, Number Systems, Microprocessors & Art of Teaching standard questions.',
      attemptUrl: '#',
    },
    {
      testNumber: 7,
      id: 'stet-mock-7',
      title: 'STET CSE Full Mock Test #07',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'None (0 Marks)',
      releaseAt: '2026-09-13T00:00:00.000Z',
      isReleased: false,
      description: 'Full syllabus simulation covering BSEB STET Paper II official syllabus guidelines.',
      attemptUrl: '#',
    },
    {
      testNumber: 8,
      id: 'stet-mock-8',
      title: 'STET CSE Full Mock Test #08',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'None (0 Marks)',
      releaseAt: '2026-09-15T00:00:00.000Z',
      isReleased: false,
      description: 'Time Management Practice: 150 questions in 150 minutes with live anti-cheat focus tracker.',
      attemptUrl: '#',
    },
    {
      testNumber: 9,
      id: 'stet-mock-9',
      title: 'STET CSE Full Mock Test #09',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'None (0 Marks)',
      releaseAt: '2026-09-17T00:00:00.000Z',
      isReleased: false,
      description: 'Software Engineering models, System Design, Cybersecurity fundamentals & Reasoning.',
      attemptUrl: '#',
    },
    {
      testNumber: 10,
      id: 'stet-mock-10',
      title: 'STET CSE Full Mock Test #10',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'None (0 Marks)',
      releaseAt: '2026-09-19T00:00:00.000Z',
      isReleased: false,
      description: 'Penultimate Full Mock: High probability exam-standard questions for scoring above 120+.',
      attemptUrl: '#',
    },
    {
      testNumber: 11,
      id: 'stet-mock-11',
      title: 'STET CSE Full Mock Test #11',
      type: 'MOCK' as const,
      tag: 'Mock Test',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'None (0 Marks)',
      releaseAt: '2026-09-21T00:00:00.000Z',
      isReleased: false,
      description: 'Grand Mock 11: Comprehensive pre-exam dress rehearsal covering all 12 CS subjects.',
      attemptUrl: '#',
    },
    {
      testNumber: 12,
      id: 'stet-pyq-1',
      title: 'Official PYQ 2020 — STET Computer Science Paper',
      type: 'PYQ' as const,
      tag: 'Official PYQ 2020',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'None (0 Marks)',
      releaseAt: '2020-09-15T00:00:00.000Z',
      isReleased: true,
      description: 'Original BSEB Bihar STET Paper II exam held in 2019-2020. 100 CS questions + 50 Teaching Art.',
      attemptUrl: '/practice/6a9c578dea166f234076c194',
    },
    {
      testNumber: 13,
      id: 'stet-pyq-2',
      title: 'Official PYQ 2023 (Shift 1) — STET CSE Paper',
      type: 'PYQ' as const,
      tag: 'Official PYQ 2023',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'None (0 Marks)',
      releaseAt: '2023-09-04T00:00:00.000Z',
      isReleased: true,
      description: 'Official BSEB STET Paper II examination held on 4 September 2023 (Shift 1). Verified answer keys.',
      attemptUrl: '/practice/6a9c578eea166f234076c31f',
    },
    {
      testNumber: 14,
      id: 'stet-pyq-3',
      title: 'Official PYQ 2023 (Shift 2) — STET CSE Paper',
      type: 'PYQ' as const,
      tag: 'Official PYQ 2023',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'None (0 Marks)',
      releaseAt: '2023-09-04T00:00:00.000Z',
      isReleased: true,
      description: 'Official BSEB STET Paper II examination held on 4 September 2023 (Shift 2). Comprehensive coverage.',
      attemptUrl: '/practice/6a9c578eea166f234076c31f',
    },
    {
      testNumber: 15,
      id: 'stet-pyq-4',
      title: 'Official PYQ 2024 — STET CSE Paper',
      type: 'PYQ' as const,
      tag: 'Official PYQ 2024',
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 'None (0 Marks)',
      releaseAt: '2024-06-11T00:00:00.000Z',
      isReleased: true,
      description: 'Latest official BSEB STET Computer Science Paper II held in June 2024 with verified keys.',
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
        title="STET CSE — 15 Tests Series"
        description="Complete 15-Test Series consisting of 11 Full Mocks and 4 Official Previous Year Papers (2020, 2023 Shift 1, 2023 Shift 2 & 2024) with verified keys."
        breadcrumbs={[{ label: 'STET CSE', href: '/stet-cse' }, { label: '15 Tests Series' }]}
        badge={{ text: 'Total 15 Tests (Mocks + PYQs)', variant: 'stet' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Banner summary */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-indigo-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Award className="w-3.5 h-3.5" />
              BSEB STET Paper II Complete Assessment
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              STET CSE Full Series (Tests #01 – #15)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Unified 15 tests: 11 full-length mocks designed to build speed and stamina alongside 4 authentic BSEB official previous year papers with verified answer keys.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-800/80 px-4 py-3 rounded-xl border border-slate-700 text-center">
              <div className="text-2xl font-extrabold text-indigo-400">11</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Mock Tests</div>
            </div>
            <div className="text-slate-600 font-bold text-lg">+</div>
            <div className="bg-slate-800/80 px-4 py-3 rounded-xl border border-slate-700 text-center">
              <div className="text-2xl font-extrabold text-amber-400">4</div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold">Official PYQs</div>
            </div>
            <div className="text-slate-600 font-bold text-lg">=</div>
            <div className="bg-indigo-600/30 px-4 py-3 rounded-xl border border-indigo-500/40 text-center">
              <div className="text-2xl font-extrabold text-white">15</div>
              <div className="text-[11px] text-indigo-300 uppercase font-semibold">Total Tests</div>
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
                  ? 'bg-indigo-600 text-white shadow-xs'
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
                  ? 'border-l-4 border-l-indigo-600 bg-white'
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
                    <span className="font-semibold text-emerald-700">
                      {test.negativeMarking}
                    </span>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="pt-4">
                {test.isReleased ? (
                  <Link href={test.attemptUrl} className="w-full">
                    <Button
                      variant={test.type === 'PYQ' ? 'primary' : 'stet'}
                      className={`w-full font-bold text-xs ${
                        test.type === 'PYQ'
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
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

        <AdSensePlaceholder slotId="stet-15-tests-bottom" format="banner" />
      </div>
    </div>
  );
}
