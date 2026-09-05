import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Test Attempt History | Student Dashboard',
};

export default function HistoryPage() {
  const history = [
    { id: 'att_1', title: 'BPSC TRE CSE Mock Test #01', type: 'MOCK', score: '124 / 150', accuracy: '88.8%', duration: '128 Mins', date: '04 Sep 2026', status: 'COMPLETED' },
    { id: 'att_2', title: 'STET CSE Official PYQ 2023', type: 'PYQ', score: '130 / 150', accuracy: '91.2%', duration: '118 Mins', date: '01 Sep 2026', status: 'COMPLETED' },
    { id: 'att_3', title: 'BPSC TRE 3.0 Official PYQ 2024', type: 'PYQ', score: '118 / 150', accuracy: '84.0%', duration: '135 Mins', date: '28 Aug 2026', status: 'COMPLETED' },
  ];

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Full Test Attempt History"
        description="Comprehensive log of all completed and attempted mock tests and PYQs."
        breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'History' }]}
        badge={{ text: 'Attempt Records', variant: 'neutral' }}
      >
        <Link href="/dashboard">
          <Button variant="outline" className="bg-slate-800 text-white border-slate-700" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Dashboard
          </Button>
        </Link>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Test Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Score (/150)</th>
                  <th className="px-6 py-4">Accuracy</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4">Attempt Date</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                {history.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.title}</td>
                    <td className="px-6 py-4">
                      <Badge variant={row.type === 'PYQ' ? 'pyq' : 'stet'}>{row.type}</Badge>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">{row.score}</td>
                    <td className="px-6 py-4 font-semibold text-emerald-600">{row.accuracy}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">{row.duration}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">{row.date}</td>
                    <td className="px-6 py-4">
                      <Link href={`/exam/${row.id}/result`}>
                        <Button variant="outline" size="sm">
                          View Scorecard
                        </Button>
                      </Link>
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
