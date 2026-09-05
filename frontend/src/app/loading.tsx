import React from 'react';
import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <Spinner size="lg" className="mb-4" />
      <p className="text-sm font-medium text-slate-600">Loading exam prep content...</p>
    </div>
  );
}
