import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { AdSensePlaceholder } from '@/components/ui/adsense-placeholder';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'BPSC TRE 3.0 Computer Science Official PYQ Paper (July 2024)',
  description: 'Practice official BPSC TRE 3.0 PGT Computer Science re-exam question paper (July 2024). 150 questions, advanced OOPs, DBMS, OS & networking.',
};

export default function BpscTre3PyqPage() {
  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="BPSC TRE 3.0 Computer Science Official PYQ"
        description="Official BPSC TRE 3.0 Computer Science PGT re-examination paper held in July 2024."
        breadcrumbs={[{ label: 'BPSC TRE', href: '/bpsc-tre' }, { label: 'PYQs', href: '/bpsc-tre/pyqs' }, { label: 'TRE 3.0' }]}
        badge={{ text: 'July 2024 Genuine Paper', variant: 'pyq' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Alert variant="success" title="Verified Official Answer Keys">
          Full 150 questions transcribed directly from BPSC TRE 3.0 official re-exam booklets.
        </Alert>

        <Card className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center border-b border-slate-100 pb-6">
            <div>
              <div className="text-2xl font-extrabold text-slate-900">150 Qs</div>
              <div className="text-xs font-semibold text-slate-500">Total Questions</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900">150 Marks</div>
              <div className="text-xs font-semibold text-slate-500">Total Marks</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900">150 Mins</div>
              <div className="text-xs font-semibold text-slate-500">Duration</div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Link href="/bpsc-tre/mock-tests">
              <Button variant="bpsc" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Attempt Paper Now
              </Button>
            </Link>
          </div>
        </Card>

        <AdSensePlaceholder slotId="tre3-bottom" format="banner" />
      </div>
    </div>
  );
}
