import React from 'react';
import { cn } from '@/lib/utils';

export interface AdSensePlaceholderProps {
  slotId?: string;
  format?: 'banner' | 'rectangle' | 'in-feed';
  className?: string;
}

export function AdSensePlaceholder({
  slotId = '0000000000',
  format = 'banner',
  className,
}: AdSensePlaceholderProps) {
  const heightClasses = {
    banner: 'h-24 md:h-28',
    rectangle: 'h-64',
    'in-feed': 'h-32 md:h-40',
  };

  return (
    <div
      className={cn(
        'w-full bg-slate-100/70 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-3 my-6 text-center transition-all',
        heightClasses[format],
        className
      )}
      data-ad-slot={slotId}
    >
      <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono uppercase tracking-wider">
        <span>Sponsored Ad Placement</span>
      </div>
      <p className="text-[11px] text-slate-400 mt-1 max-w-sm">
        Non-intrusive AdSense integration placeholder. Active during test breaks and public content pages.
      </p>
    </div>
  );
}
