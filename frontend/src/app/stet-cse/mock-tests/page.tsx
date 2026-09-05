import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdSensePlaceholder } from '@/components/ui/adsense-placeholder';
import { Lock, Clock, CheckCircle2, Play, AlertTriangle } from 'lucide-react';
import { formatDate, isReleased } from '@/lib/utils';

export const metadata = {
  title: 'STET Computer Science 15 Scheduled Mock Test Series',
  description: '15 scheduled full-length mock tests for Bihar STET CSE. 150 questions, 150 marks, 150 minutes, anti-cheat monitoring & instant topic analytics.',
};

export default function StetMockTestsPage() {
  // 15 Scheduled STET Mocks
  const mocks = Array.from({ length: 15 }).map((_, i) => {
    const num = i + 1;
    // Mock 1 & 2 released in past, remaining scheduled into future
    const releaseDate = new Date(2026, 8, 1 + i * 4); // September 2026 dates
    const released = releaseDate.getTime() <= new Date().getTime() || i < 2;

    return {
      id: `stet-mock-${num}`,
      title: `STET CSE Full Mock Test #${num.toString().padStart(2, '0')}`,
      slug: `stet-cse-mock-${num}`,
      totalQuestions: 150,
      totalMarks: 150,
      durationMinutes: 150,
      negativeMarking: 0,
      releaseAt: releaseDate.toISOString(),
      isReleased: released,
      description: `Complete 150-question STET CSE exam pattern: 100 CS Core (DS, OS, DBMS, Networks, OOPs, Web Tech) + 50 General Pedagogy.`,
    };
  });

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="STET CSE 15 Mock Test Series"
        description="Full-length 150-question mock tests scheduled systematically to build real exam stamina."
        breadcrumbs={[{ label: 'STET CSE', href: '/stet-cse' }, { label: 'Mock Tests' }]}
        badge={{ text: '15 Full-Length Mocks', variant: 'stet' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-indigo-900 text-white rounded-xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Anti-Cheat Enabled Test Engine</h3>
            <p className="text-xs text-indigo-200">
              5 Focus Loss Warnings | Instant Topic Breakdown | Real-Time Live Rank
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs bg-indigo-800 text-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-700 font-mono">
              Pattern: 150 Qs | 150 Marks | 0 Negative
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
                    <span>Time Allowed</span>
                    <span className="font-semibold text-slate-900">{mock.durationMinutes} Minutes</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Negative Marking</span>
                    <span className="font-semibold text-emerald-700">None (0 Marks)</span>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="pt-4">
                {mock.isReleased ? (
                  <Button variant="stet" className="w-full" size="sm" leftIcon={<Play className="w-4 h-4 fill-current" />}>
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

        <AdSensePlaceholder slotId="stet-mock-bottom" format="banner" />
      </div>
    </div>
  );
}
