import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { AdSensePlaceholder } from '@/components/ui/adsense-placeholder';
import { CheckCircle2, ArrowRight, ShieldCheck, Layers, Award } from 'lucide-react';

export const metadata = {
  title: 'BPSC TRE Computer Science Prep Hub | TRE 1.0, 2.0, 3.0 PYQs & 15 Mocks',
  description: 'Master BPSC Teacher Recruitment Exam (TRE) Computer Science: BPSC TRE 1.0, 2.0, 3.0 genuine PYQs and 15 scheduled mock tests with customizable negative marking.',
};

export default function BpscTrePage() {
  const treEditions = [
    {
      title: 'BPSC TRE 1.0 CSE (2023)',
      date: 'August 2023',
      description: 'First official recruitment paper for PGT CS Class 11-12.',
      questions: 120,
      marks: 120,
    },
    {
      title: 'BPSC TRE 2.0 CSE (2023)',
      date: 'December 2023',
      description: 'Revised 150-question paper layout with Language, General Studies, and CS Core.',
      questions: 150,
      marks: 150,
    },
    {
      title: 'BPSC TRE 3.0 CSE (2024)',
      date: 'March / July 2024',
      description: 'Latest high-standard competitive paper with advanced OOPs, DBMS, and Networking.',
      questions: 150,
      marks: 150,
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="BPSC TRE Computer Science Hub"
        description="Comprehensive preparation suite for Bihar Public Service Commission Teacher Recruitment Exam (TRE PGT Computer Science)."
        breadcrumbs={[{ label: 'BPSC TRE' }]}
        badge={{ text: '15 Tests Series', variant: 'bpsc' }}
      >
        <div className="flex gap-3">
          <Link href="/bpsc-tre/mock-tests">
            <Button variant="bpsc" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open 15-Test Series (Mocks + PYQs)
            </Button>
          </Link>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* EXAM RECRUITMENT METRICS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-t-4 border-t-emerald-600">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="text-3xl font-extrabold text-emerald-950">15 Total Tests</div>
              <div className="text-sm font-semibold text-slate-700">Complete Series</div>
              <p className="text-xs text-slate-500">11 Full Mocks + 4 Official Verified PYQs</p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-emerald-600">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="text-3xl font-extrabold text-emerald-950">150 Questions</div>
              <div className="text-sm font-semibold text-slate-700">Pattern Weightage</div>
              <p className="text-xs text-slate-500">80 CS Core + 40 GS + 30 Qualifying Language</p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-emerald-600">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="text-3xl font-extrabold text-emerald-950">150 Minutes</div>
              <div className="text-sm font-semibold text-slate-700">Exam Duration</div>
              <p className="text-xs text-slate-500">2.5 Hours Real Simulator with Anti-Cheat</p>
            </CardContent>
          </Card>
        </div>

        <Alert variant="success" title="Unified 15-Test Series Structure">
          All 15 assessment papers (Mock Test #01 to #11 alongside official BPSC TRE 1.0, 2.0, 3.0 & 2022 PYQs) are organized into a single, cohesive test series without fragmented sections.
        </Alert>

        {/* UNIFIED 15-TEST SERIES HIGHLIGHT */}
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-8 sm:p-10 border border-emerald-800/50 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <Badge variant="bpsc" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                Unified Test Series
              </Badge>
              <h2 className="text-3xl font-black text-white tracking-tight">
                15 Full Tests: Mocks & Official PYQs Combined
              </h2>
              <p className="text-sm text-slate-300">
                Don't waste time jumping between different tabs. Access all 11 curated full syllabus mocks and 4 authentic previous year papers directly in one test suite.
              </p>
            </div>

            <Link href="/bpsc-tre/mock-tests">
              <Button variant="bpsc" size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-6 text-base" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Go To 15-Test Series
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-emerald-400 font-extrabold text-lg">Tests #01 – #11</div>
              <div className="font-semibold text-white text-sm">Full-Length Mocks</div>
              <p className="text-xs text-slate-400 mt-1">150 Qs simulated as per latest TRE 3.0 exam level.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-amber-400 font-extrabold text-lg">Test #12</div>
              <div className="font-semibold text-white text-sm">BPSC TRE 1.0 (2023)</div>
              <p className="text-xs text-slate-400 mt-1">Official August 2023 paper with verified keys.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-amber-400 font-extrabold text-lg">Test #13</div>
              <div className="font-semibold text-white text-sm">BPSC TRE 2.0 (2023)</div>
              <p className="text-xs text-slate-400 mt-1">Official December 2023 150-question paper.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-amber-400 font-extrabold text-lg">Tests #14 & #15</div>
              <div className="font-semibold text-white text-sm">TRE 3.0 (2024) & 2022</div>
              <p className="text-xs text-slate-400 mt-1">Latest competitive questions & foundational papers.</p>
            </div>
          </div>
        </div>

        {/* ADSENSE PLACEHOLDER */}
        <AdSensePlaceholder slotId="bpsc-hub-middle" format="banner" />
      </div>
    </div>
  );
}
