import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { AdSensePlaceholder } from '@/components/ui/adsense-placeholder';
import { FileText, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'STET Computer Science Previous Year Question Papers (PYQs)',
  description: 'Practice 3 genuine STET CSE Paper II previous year question papers. Verified answer keys, topic breakdown, and full 150-mark timed test mode.',
};

export default function StetPyqsPage() {
  const pyqPapers = [
    {
      id: 'stet-pyq-2023-s1',
      title: 'STET Computer Science Official PYQ 2023 (Shift 1)',
      year: 2023,
      questions: 150,
      marks: 150,
      durationMinutes: 150,
      description: 'Official BSEB STET Paper II exam held in September 2023 (Shift 1). Includes 100 CS questions + 50 Teaching Art & Reasoning.',
      status: 'FREE_ACCESS',
      verifiedKey: true,
    },
    {
      id: 'stet-pyq-2023-s2',
      title: 'STET Computer Science Official PYQ 2023 (Shift 2)',
      year: 2023,
      questions: 150,
      marks: 150,
      durationMinutes: 150,
      description: 'Official BSEB STET Paper II exam held in September 2023 (Shift 2). Covers C++, DBMS, Data Structures, and Operating Systems.',
      status: 'FREE_ACCESS',
      verifiedKey: true,
    },
    {
      id: 'stet-pyq-2024-s1',
      title: 'STET Computer Science Official PYQ 2024',
      year: 2024,
      questions: 150,
      marks: 150,
      durationMinutes: 150,
      description: 'Latest official BSEB STET Computer Science Paper II examination paper held in 2024 with verified keys.',
      status: 'FREE_ACCESS',
      verifiedKey: true,
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="STET Computer Science PYQs"
        description="Genuine Bihar School Examination Board (BSEB) STET Computer Science Previous Year Question Papers."
        breadcrumbs={[{ label: 'STET CSE', href: '/stet-cse' }, { label: 'PYQs' }]}
        badge={{ text: 'Verified Genuine PYQs', variant: 'pyq' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Alert variant="info" title="Strict PYQ Content Integrity Policy">
          All papers listed on this page are 100% authentic previous year question papers transcribed from official STET Computer Science examinations. No AI-generated or simulated questions are labeled as PYQs.
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pyqPapers.map((paper) => (
            <Card key={paper.id} className="hover:shadow-md transition-shadow border-t-4 border-t-amber-500 flex flex-col justify-between">
              <div>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <Badge variant="pyq">{paper.year} Genuine PYQ</Badge>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Verified Key
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-2 text-slate-900 leading-snug">{paper.title}</CardTitle>
                  <CardDescription>{paper.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Total Questions</span>
                    <span className="font-semibold text-slate-900">{paper.questions} Qs</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Total Marks</span>
                    <span className="font-semibold text-slate-900">{paper.marks} Marks</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Duration</span>
                    <span className="font-semibold text-slate-900">{paper.durationMinutes} Mins</span>
                  </div>
                </CardContent>
              </div>
              <CardFooter className="pt-4">
                <Link href={`/stet-cse/mock-tests`} className="w-full">
                  <Button variant="stet" className="w-full" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Attempt Free PYQ Test
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <AdSensePlaceholder slotId="stet-pyq-bottom" format="banner" />
      </div>
    </div>
  );
}
