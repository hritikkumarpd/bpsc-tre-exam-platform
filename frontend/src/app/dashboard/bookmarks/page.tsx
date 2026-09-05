import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Bookmarked Questions | Student Dashboard',
};

export default function BookmarksPage() {
  const bookmarks = [
    {
      id: 'bm_1',
      questionText: 'Which Normal Form guarantees that every non-trivial functional dependency X -> Y has X as a Super Key?',
      subject: 'Database Management Systems',
      topic: 'Normalization (1NF-BCNF)',
      correctAnswer: 'BCNF (Boyce-Codd Normal Form)',
      explanation: 'Boyce-Codd Normal Form (BCNF) strictly requires that for every non-trivial functional dependency X -> Y, X must be a super key.',
      note: 'Important DBMS concept for BPSC TRE 3.0',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Bookmarked Questions Notebook"
        description="Saved questions for rapid revision before exam day."
        breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Bookmarks' }]}
        badge={{ text: 'Saved Notebook', variant: 'scheduled' }}
      >
        <Link href="/dashboard">
          <Button variant="outline" className="bg-slate-800 text-white border-slate-700" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Dashboard
          </Button>
        </Link>
      </PageHeader>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {bookmarks.map((bm) => (
          <Card key={bm.id} className="border-l-4 border-l-purple-600">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Badge variant="stet">{bm.subject}</Badge>
                <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                  {bm.topic}
                </span>
              </div>
              <CardTitle className="text-base mt-2 text-slate-900 leading-snug">{bm.questionText}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-700">
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 font-medium text-emerald-900">
                Correct Answer: {bm.correctAnswer}
              </div>
              <p className="leading-relaxed text-slate-600">
                <strong>Explanation:</strong> {bm.explanation}
              </p>
              {bm.note && (
                <div className="text-slate-500 italic border-t border-slate-100 pt-2">
                  Personal Note: &quot;{bm.note}&quot;
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
