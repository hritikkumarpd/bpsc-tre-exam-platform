import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { AdSensePlaceholder } from '@/components/ui/adsense-placeholder';
import { ArrowRight, CheckCircle2, FileText } from 'lucide-react';

export const metadata = {
  title: 'BPSC TRE 1.0 Computer Science Official PYQ Paper (August 2023)',
  description: 'Practice official BPSC TRE 1.0 PGT Computer Science question paper (26 August 2023). 120 questions, verified answer keys, and step-by-step solutions.',
};

export default function BpscTre1PyqPage() {
  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="BPSC TRE 1.0 Computer Science Official PYQ"
        description="The historical first Bihar PGT Computer Science teacher recruitment examination held in August 2023."
        breadcrumbs={[{ label: 'BPSC TRE', href: '/bpsc-tre' }, { label: 'PYQs', href: '/bpsc-tre/pyqs' }, { label: 'TRE 1.0' }]}
        badge={{ text: 'August 2023 Genuine Paper', variant: 'pyq' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Alert variant="success" title="Verified Official Answer Keys">
          This paper includes all 120 original questions transcribed directly from BPSC TRE 1.0 official question booklets.
        </Alert>

        <Card className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center border-b border-slate-100 pb-6">
            <div>
              <div className="text-2xl font-extrabold text-slate-900">120 Qs</div>
              <div className="text-xs font-semibold text-slate-500">Total Questions</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900">120 Marks</div>
              <div className="text-xs font-semibold text-slate-500">Total Marks</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900">120 Mins</div>
              <div className="text-xs font-semibold text-slate-500">Duration</div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <h3 className="font-bold text-slate-900 text-base">Paper Subject Breakdown</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Part I — Computer Science Core (80 Qs):</strong> OS, C++, Data Structures, DBMS, Networking</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Part II — General Studies (40 Qs):</strong> Mathematics, Reasoning, General Science, Indian National Movement</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Link href="/bpsc-tre/mock-tests">
              <Button variant="bpsc" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Attempt Paper Now
              </Button>
            </Link>
          </div>
        </Card>

        <AdSensePlaceholder slotId="tre1-bottom" format="banner" />
      </div>
    </div>
  );
}
