'use client';

import React from 'react';
import Link from 'next/link';
import { X, BookOpen, ChevronRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  pathname: string;
}

export function MobileNav({ isOpen, onClose, items, pathname }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl flex flex-col justify-between p-6 overflow-y-auto transform transition-transform">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900">ExamPrep CS</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <div className="py-6 space-y-1.5">
            {items.map((item) => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-brand-50 text-brand-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-slate-100 text-slate-600">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="pt-6 border-t border-slate-100 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Official Syllabus & Verified Answer Keys</span>
          </div>
          <Link href="/bpsc-tre/mock-tests" onClick={onClose} className="block w-full">
            <Button variant="bpsc" className="w-full">
              BPSC Mock Series (15 Mocks)
            </Button>
          </Link>
          <Link href="/stet-cse/mock-tests" onClick={onClose} className="block w-full">
            <Button variant="stet" className="w-full">
              STET CSE Series (15 Mocks)
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
