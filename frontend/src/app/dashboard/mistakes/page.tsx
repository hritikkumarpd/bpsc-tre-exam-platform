import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ArrowLeft, XCircle, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Mistake Notebook | Student Dashboard',
};

export default function MistakesPage() {
  const mistakes = [
    {
      id: 'msk_1',
      questionText: 'In Operating Systems, which condition is NOT required for a deadlock to occur according to Coffman conditions?',
      subject: 'Operating Systems',
      topic: 'Deadlocks',
      wrongOption: 'Option A (Mutual Exclusion)',
      correctAnswer: 'Option C (Preemption Allowed)',
      explanation: 'No preemption (preemption NOT allowed) is required for deadlock. If preemption is allowed, deadlock cannot occur.',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Student Mistake Notebook"
        description="Review questions where you selected an incorrect option during past test attempts."
        breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Mistakes' }]}
        badge={{ text: 'Targeted Remediation', variant: 'hard' }}
      >
        <Link href="/dashboard">
          <Button variant="outline" className="bg-slate-800 text-white border-slate-700" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Dashboard
          </Button>
        </Link>
      </PageHeader>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {mistakes.map((msk) => (
          <Card key={msk.id} className="border-l-4 border-l-rose-600">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Badge variant="hard">{msk.subject}</Badge>
                <span className="text-xs font-semibold text-slate-500">{msk.topic}</span>
              </div>
              <CardTitle className="text-base mt-2 text-slate-900 leading-snug">{msk.questionText}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-700">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-rose-50 p-3 rounded-lg border border-rose-200 text-rose-900">
                  <div className="font-semibold text-rose-700">Your Answer:</div>
                  <div>{msk.wrongOption}</div>
                </div>
                <div className="flex-1 bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-emerald-900">
                  <div className="font-semibold text-emerald-700">Correct Answer:</div>
                  <div>{msk.correctAnswer}</div>
                </div>
              </div>

              <p className="leading-relaxed text-slate-600 border-t border-slate-100 pt-3">
                <strong>Verified Solution:</strong> {msk.explanation}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
