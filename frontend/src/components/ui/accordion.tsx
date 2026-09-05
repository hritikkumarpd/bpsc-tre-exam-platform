'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden transition-all shadow-2xs mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left font-semibold text-slate-800 hover:bg-slate-50/80 transition-colors gap-4"
        aria-expanded={isOpen}
      >
        <span className="text-sm md:text-base leading-snug">{title}</span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200',
            isOpen && 'transform rotate-180 text-brand-600'
          )}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-1 text-sm text-slate-600 border-t border-slate-100 bg-slate-50/30 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
