import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ShieldAlert, AlertOctagon, ArrowLeft, RotateCcw } from 'lucide-react';

export const metadata = {
  title: 'Test Attempt Cancelled — Anti-Cheat Violation',
};

export default function AttemptCancelledPage({ params }: { params: { attemptId: string } }) {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <Card className="max-w-lg w-full border-l-4 border-l-rose-600 shadow-lg">
        <CardHeader className="text-center space-y-3 pb-2">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertOctagon className="w-10 h-10 animate-bounce" />
          </div>
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Attempt Cancelled
            </span>
            <CardTitle className="text-2xl mt-3 text-slate-900">
              Exam Integrity Violation
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-600 text-center">
          <p className="leading-relaxed">
            Your exam attempt was <strong>automatically cancelled by backend authority</strong> after exceeding the maximum limit of 5 browser focus loss warnings.
          </p>
          <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 text-xs text-rose-900 text-left space-y-1.5 font-mono">
            <div><strong>Attempt ID:</strong> {params.attemptId}</div>
            <div><strong>Cancellation Reason:</strong> Exceeded 5 focus loss violations during active test monitoring.</div>
            <div><strong>Score Result:</strong> Withheld / Disqualified (Status: CANCELLED)</div>
          </div>
          <p className="text-xs text-slate-500">
            Exam rules strictly monitor window blur and tab switching to ensure fair competition.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
          <Link href="/bpsc-tre/mock-tests" className="w-full">
            <Button variant="bpsc" className="w-full">
              Explore Mock Series
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
