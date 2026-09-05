import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: {
    text: string;
    variant?: 'stet' | 'bpsc' | 'pyq' | 'scheduled' | 'published' | 'success' | 'warning' | 'neutral' | 'hard';
  };
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  breadcrumbs = [],
  badge,
  children,
}: PageHeaderProps) {
  return (
    <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-200 font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Title and Badge */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-3xl space-y-2">
            {badge && <Badge variant={badge.variant || 'neutral'}>{badge.text}</Badge>}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {description}
            </p>
          </div>
          {children && <div className="shrink-0">{children}</div>}
        </div>
      </div>
    </div>
  );
}
