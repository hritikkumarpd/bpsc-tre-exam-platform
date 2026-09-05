import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdSensePlaceholder } from '@/components/ui/adsense-placeholder';
import { Lock, Clock, Play, ShieldAlert } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: 'BPSC TRE Computer Science 15 Scheduled Mock Test Series',
  description: '15 scheduled full-length mock tests for BPSC TRE CSE. 150 questions, configurable negative marking, anti-cheat focus loss monitoring & topic analytics.',
};

export default function BpscMockTestsPage() {
  // 15 Scheduled BPSC Mocks
  const mocks = Array.from({ length: 15 }).map((_, i) => {
    const num = i + 1;
    const releaseDate = new Date(2026, 8, 2 + i * 4); // September 2026 dates
    const released = releaseDate.getTime() <= new Date().getTime() || i < 2;

    return {
      id: `bpsc-mock-${num}`,
      title: `BPSC TRE CSE Full Mock Test #${num.toString().padStart(2, '0')}`,
      slug: `bpsc-tre-cse-mock-${num}`,
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 0.25,
      releaseAt: releaseDate.toISOString(),
      isReleased: released,
      description: `150 Questions: 80 Computer Science Core + 40 General Studies + 30 Language. Configurable negative marking (0.25 mark per wrong answer).`,
    };
  });

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="BPSC TRE CSE 15 Mock Test Series"
        description="15 scheduled recruitment mocks tailored to the exact level of BPSC TRE 3.0."
        breadcrumbs={[{ label: 'BPSC TRE', href: '/bpsc-tre' }, { label: 'Mock Tests' }]}
        badge={{ text: '15 Full-Length Mocks', variant: 'bpsc' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-emerald-900 text-white rounded-xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Strict Exam Integrity Protocol</h3>
            <p className="text-xs text-emerald-200">
              Browser Visibility & Focus Loss Violation Tracking | Max 5 Warnings allowed
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs bg-emerald-800 text-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-700 font-mono">
              Pattern: 150 Qs | 150 Marks | -0.25 Negative Marking
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mocks.map((mock) => (
            <Card key={mock.id} className={`hover:shadow-md transition-shadow flex flex-col justify-between ${mock.isReleased ? 'border-l-4 border-l-emerald-600' : 'border-l-4 border-l-slate-300 opacity-90'}`}>
              <div>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <Badge variant={mock.isReleased ? 'published' : 'scheduled'}>
                      {mock.isReleased ? 'Active / Published' : 'Scheduled'}
                    </Badge>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Release: {formatDate(mock.releaseAt)}
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-2 text-slate-900 leading-snug">{mock.title}</CardTitle>
                  <CardDescription>{mock.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Questions & Marks</span>
                    <span className="font-semibold text-slate-900">{mock.totalQuestions} Qs / {mock.totalMarks} Marks</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Duration</span>
                    <span className="font-semibold text-slate-900">{mock.durationMinutes} Minutes</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Negative Marking</span>
                    <span className="font-semibold text-amber-700">-0.25 Mark / Wrong</span>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="pt-4">
                {mock.isReleased ? (
                  <Button variant="bpsc" className="w-full" size="sm" leftIcon={<Play className="w-4 h-4 fill-current" />}>
                    Attempt Mock Test
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full text-slate-500 cursor-not-allowed" size="sm" disabled leftIcon={<Lock className="w-4 h-4 text-amber-500" />}>
                    Locked (Unlocks {formatDate(mock.releaseAt)})
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <AdSensePlaceholder slotId="bpsc-mock-bottom" format="banner" />
      </div>
    </div>
  );
}
