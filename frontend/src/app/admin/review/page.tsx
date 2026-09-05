import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Sparkles, Check, X } from 'lucide-react';

export const metadata = {
  title: 'AI Question Review Queue | Admin Panel',
};

export default function ReviewQueueAdminPage() {
  const pendingItems = [
    {
      id: 'rev_1',
      questionText: 'Which algorithm is best suited for finding the shortest path in a weighted graph with non-negative edge weights?',
      subject: 'Data Structures & Algorithms',
      topic: 'Graphs & Shortest Path',
      difficulty: 'MEDIUM',
      correctAnswer: 'Option A (Dijkstra Algorithm)',
      explanation: "Dijkstra's algorithm efficiently computes single-source shortest paths in logarithmic time for non-negative graphs.",
      status: 'PENDING',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="AI Question Draft Review Queue"
        description="Inspect AI-generated question schemas, verify answer keys, and approve for publication into the main question bank."
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Review Queue' }]}
        badge={{ text: 'Human Expert Gatekeeping', variant: 'stet' }}
      >
        <Link href="/admin">
          <Button variant="outline" className="bg-slate-800 text-white border-slate-700" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Admin
          </Button>
        </Link>
      </PageHeader>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {pendingItems.map((item) => (
          <Card key={item.id} className="border-l-4 border-l-purple-600">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Badge variant="stet">AI Generated Draft</Badge>
                <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                  {item.subject}
                </span>
              </div>
              <CardTitle className="text-base mt-2 text-slate-900 leading-snug">{item.questionText}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-700">
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 font-medium text-emerald-900">
                Correct Answer: {item.correctAnswer}
              </div>
              <p className="leading-relaxed text-slate-600">
                <strong>Explanation:</strong> {item.explanation}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="danger" size="sm" leftIcon={<X className="w-4 h-4" />}>
                Reject Draft
              </Button>
              <Button variant="bpsc" size="sm" leftIcon={<Check className="w-4 h-4" />}>
                Approve & Publish
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
