import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { AdSensePlaceholder } from '@/components/ui/adsense-placeholder';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'BPSC TRE Computer Science Previous Year Papers (TRE 1.0, 2.0, 3.0)',
  description: 'Practice authentic BPSC TRE 1.0, BPSC TRE 2.0, and BPSC TRE 3.0 PGT Computer Science question papers with verified answer keys.',
};

export default function BpscPyqsPage() {
  const pyqs = [
    {
      id: 'bpsc-tre-1',
      title: 'BPSC TRE 1.0 Computer Science Official Paper (2023)',
      edition: 'BPSC TRE 1.0',
      year: 2023,
      date: '26 August 2023',
      questions: 120,
      marks: 120,
      description: 'First historical recruitment paper for Bihar Computer Science PGT Class 11-12. 80 CS Core + 40 GS.',
    },
    {
      id: 'bpsc-tre-2',
      title: 'BPSC TRE 2.0 Computer Science Official Paper (2023)',
      edition: 'BPSC TRE 2.0',
      year: 2023,
      date: '15 December 2023',
      questions: 150,
      marks: 150,
      description: 'Full 150-question paper: 30 Qualifying Language + 40 General Studies + 80 CS Core.',
    },
    {
      id: 'bpsc-tre-3',
      title: 'BPSC TRE 3.0 Computer Science Official Paper (2024)',
      edition: 'BPSC TRE 3.0',
      year: 2024,
      date: 'July 2024 Re-Exam',
      questions: 150,
      marks: 150,
      description: 'Latest official recruitment paper featuring advanced C++, Python, SQL queries, and OS scheduling.',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="BPSC TRE Computer Science PYQs"
        description="Authentic BPSC TRE 1.0, BPSC TRE 2.0, and BPSC TRE 3.0 PGT Computer Science question papers."
        breadcrumbs={[{ label: 'BPSC TRE', href: '/bpsc-tre' }, { label: 'PYQs' }]}
        badge={{ text: 'Official Verified PYQs', variant: 'pyq' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Alert variant="success" title="Zero Fabrication Guarantee">
          Every question in these papers is verified against official Bihar Public Service Commission (BPSC) answer keys. No AI-generated or copyrighted dummy questions are labeled as PYQs.
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pyqs.map((paper) => (
            <Card key={paper.id} className="hover:shadow-md transition-shadow border-t-4 border-t-emerald-600 flex flex-col justify-between">
              <div>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <Badge variant="pyq">{paper.edition}</Badge>
                    <span className="text-xs font-semibold text-slate-500">{paper.date}</span>
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
                    <span>Answer Key Status</span>
                    <span className="font-semibold text-emerald-700">Official BPSC Verified</span>
                  </div>
                </CardContent>
              </div>
              <CardFooter className="pt-4 flex flex-col gap-2">
                <Link href={`/practice/${paper.id === 'bpsc-tre-3' ? '6a9c5790ea166f234076c4a8' : paper.id === 'bpsc-tre-2' ? '6a9c578eea166f234076c31f' : '6a9c578dea166f234076c194'}`} className="w-full">
                  <Button variant="bpsc" className="w-full bg-blue-600 hover:bg-blue-500 font-bold" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Interactive Dark Practice Mode
                  </Button>
                </Link>
                <Link href="/student/dashboard" className="w-full text-center text-xs font-semibold text-blue-600 hover:underline pt-1">
                  View in Student Analytics Dashboard →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <AdSensePlaceholder slotId="bpsc-pyq-bottom" format="banner" />
      </div>
    </div>
  );
}
