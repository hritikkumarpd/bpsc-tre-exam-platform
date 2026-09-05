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
        badge={{ text: 'Recruitment Prep Hub', variant: 'bpsc' }}
      >
        <div className="flex gap-3">
          <Link href="/bpsc-tre/pyqs">
            <Button variant="outline" className="bg-slate-800 text-white border-slate-700">
              TRE 1.0, 2.0 & 3.0 PYQs
            </Button>
          </Link>
          <Link href="/bpsc-tre/mock-tests">
            <Button variant="bpsc" rightIcon={<ArrowRight className="w-4 h-4" />}>
              15 BPSC Mocks Series
            </Button>
          </Link>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* EXAM RECRUITMENT METRICS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-t-4 border-t-emerald-600">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="text-3xl font-extrabold text-emerald-950">150 Questions</div>
              <div className="text-sm font-semibold text-slate-700">Pattern Weightage</div>
              <p className="text-xs text-slate-500">80 CS Core + 40 GS + 30 Qualifying Language</p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-emerald-600">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="text-3xl font-extrabold text-emerald-950">150 Marks</div>
              <div className="text-sm font-semibold text-slate-700">Maximum Marks</div>
              <p className="text-xs text-slate-500">Configurable Negative Marking Simulation</p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-emerald-600">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="text-3xl font-extrabold text-emerald-950">150 Minutes</div>
              <div className="text-sm font-semibold text-slate-700">Exam Duration</div>
              <p className="text-xs text-slate-500">2.5 Hours Full Test Engine</p>
            </CardContent>
          </Card>
        </div>

        <Alert variant="success" title="Official BPSC TRE Genuine Papers Transcribed">
          BPSC TRE 1.0, BPSC TRE 2.0, and BPSC TRE 3.0 question papers on our platform are verified against official BPSC keys. No duplicate or fabricated questions.
        </Alert>

        {/* GENUINE TRE PYQ EDITIONS BREAKDOWN */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Official BPSC TRE Previous Year Papers</h2>
            <p className="text-xs text-slate-500">Attempt past BPSC Computer Science recruitment papers online.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {treEditions.map((edition, idx) => (
              <Card key={idx} className="hover:border-emerald-300 hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <Badge variant="pyq">Genuine PYQ</Badge>
                    <span className="text-xs font-semibold text-slate-500">{edition.date}</span>
                  </div>
                  <CardTitle className="text-lg mt-2 text-slate-900">{edition.title}</CardTitle>
                  <CardDescription>{edition.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-slate-600 space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Total Questions</span>
                    <span className="font-semibold text-slate-900">{edition.questions} Qs</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Max Marks</span>
                    <span className="font-semibold text-slate-900">{edition.marks} Marks</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/bpsc-tre/pyqs" className="w-full">
                    <Button variant="outline" className="w-full" size="sm">
                      Attempt Paper
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* ADSENSE PLACEHOLDER */}
        <AdSensePlaceholder slotId="bpsc-hub-middle" format="banner" />

        {/* MOCK SERIES HIGHLIGHT */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 space-y-6">
          <div className="max-w-2xl space-y-2">
            <Badge variant="bpsc" className="bg-emerald-900/80 text-emerald-200 border-emerald-700">
              15 Scheduled Mock Series
            </Badge>
            <h2 className="text-2xl font-extrabold text-white">Full-Length BPSC TRE CSE Mock Test Series</h2>
            <p className="text-sm text-slate-300">
              15 full 150-question mock tests created by subject experts following BPSC TRE 3.0 difficulty level. Scheduled releases with anti-cheat monitoring.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/bpsc-tre/mock-tests">
              <Button variant="bpsc" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                View Mock Release Schedule
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
