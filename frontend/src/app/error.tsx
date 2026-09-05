'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h2>
      <p className="text-slate-600 max-w-md text-sm mb-6 leading-relaxed">
        An unexpected error occurred while loading this section. Please try again or return home.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => (window.location.href = '/')}>
          Back to Home
        </Button>
        <Button variant="primary" onClick={() => reset()} leftIcon={<RefreshCw className="w-4 h-4" />}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
