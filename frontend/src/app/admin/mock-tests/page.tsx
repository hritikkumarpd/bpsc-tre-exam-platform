import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Sparkles, Calendar, Layers } from 'lucide-react';

export const metadata = {
  title: 'Mock Generator & Release Scheduler | Admin Panel',
};

export default function MockTestsAdminPage() {
  const mocks = Array.from({ length: 15 }).map((_, i) => ({
    id: `m_${i + 1}`,
    title: `BPSC TRE CSE Full Mock Test #${(i + 1).toString().padStart(2, '0')}`,
    exam: 'BPSC_TRE_CSE',
    questions: 150,
    releaseAt: `2026-09-${(i * 2 + 1).toString().padStart(2, '0')}`,
    status: i < 2 ? 'PUBLISHED' : 'SCHEDULED',
  }));

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Mock Test Generator & Release Scheduler"
        description="Trigger 150-question mock generation respecting PYQ & duplicate exclusion, and set scheduled releaseAt timestamps."
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Mock Series' }]}
        badge={{ text: 'Generator & Scheduler', variant: 'bpsc' }}
      >
        <div className="flex gap-3">
          <Link href="/admin">
            <Button variant="outline" className="bg-slate-800 text-white border-slate-700" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Admin
            </Button>
          </Link>
          <Button variant="bpsc" leftIcon={<Sparkles className="w-4 h-4" />}>
            Generate New Mock
          </Button>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Mock Test Title</th>
                  <th className="px-6 py-4">Exam Target</th>
                  <th className="px-6 py-4">Questions</th>
                  <th className="px-6 py-4">Release Date (`releaseAt`)</th>
                  <th className="px-6 py-4">Release Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                {mocks.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{m.title}</td>
                    <td className="px-6 py-4">
                      <Badge variant="bpsc">{m.exam}</Badge>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{m.questions} Qs</td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-600">{m.releaseAt}</td>
                    <td className="px-6 py-4">
                      <Badge variant={m.status === 'PUBLISHED' ? 'published' : 'scheduled'}>
                        {m.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
