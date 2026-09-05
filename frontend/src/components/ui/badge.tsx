import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'stet' | 'bpsc' | 'pyq' | 'scheduled' | 'published' | 'success' | 'warning' | 'neutral' | 'hard';
}

export function Badge({ className, variant = 'neutral', ...props }: BadgeProps) {
  const variants = {
    stet: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    bpsc: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    pyq: 'bg-amber-50 text-amber-800 border-amber-300 font-semibold',
    scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
    published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    hard: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border shadow-2xs transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
