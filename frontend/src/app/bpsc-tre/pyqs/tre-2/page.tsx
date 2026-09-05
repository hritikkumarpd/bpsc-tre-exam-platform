import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { AdSensePlaceholder } from '@/components/ui/adsense-placeholder';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'BPSC TRE 2.0 Computer Science Official PYQ Paper (December 2023)',
  description: 'Practice official BPSC TRE 2.0 PGT Computer Science question paper (15 December 2023). 150 questions, 30 language, 40 GS, 80 CS core.',
};

export default function BpscTre2PyqPage() {
  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="BPSC TRE 2.0 Computer Science Official PYQ"
        description="Official BPSC TRE 2.0 PGT Computer Science paper held in December 2023 featuring the revised 150-question 3-part layout."
        breadcrumbs={[{ label: 'BPSC TRE', href: '/bpsc-tre' }, { label: 'PYQs', href: '/bpsc-tre/pyqs' }, { label: 'TRE 2.0' }]}
        badge={{ text: 'December 2023 Genuine Paper', variant: 'pyq' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Alert variant="success" title="Verified Official Keys">
          All 150 questions transcribed directly from BPSC TRE 2.0 official question booklets.
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

        <AdSensePlaceholder slotId="tre2-bottom" format="banner" />
      </div>
    </div>
  );
}
