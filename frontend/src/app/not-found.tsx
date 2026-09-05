import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
        <FileQuestion className="w-8 h-8" />
      </div>
      <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-full mb-3">
        404 Page Not Found
      </span>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
        Question Paper or Page Not Found
      </h1>
      <p className="text-slate-600 max-w-md text-sm mb-6 leading-relaxed">
        The requested test series, PYQ, or page does not exist or has been moved. Explore our active exam hubs below.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>
        <Link href="/stet-cse">
          <Button variant="outline">STET CSE Hub</Button>
        </Link>
        <Link href="/bpsc-tre">
          <Button variant="bpsc">BPSC TRE Hub</Button>
        </Link>
      </div>
    </div>
  );
}
