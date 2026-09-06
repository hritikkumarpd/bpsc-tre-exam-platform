'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MobileNav } from './mobile-nav';
import { BookOpen, Menu, UserCheck, LogOut, LayoutDashboard, Shield, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout, loading } = useAuth();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Student Dashboard', href: '/student/dashboard', badge: 'KG Style' },
    { label: 'STET CSE', href: '/stet-cse/mock-tests', badge: '15 Tests' },
    { label: 'BPSC TRE', href: '/bpsc-tre/mock-tests', badge: '15 Tests' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">
                ExamPrep
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200 uppercase tracking-wide">
                CS
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium block">
              STET & BPSC TRE Computer Science
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  active
                    ? 'bg-brand-50 text-brand-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      item.href.includes('stet')
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Actions & Auth Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {!loading && user ? (
            <div className="flex items-center gap-2">
              {(user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') && (
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100" leftIcon={<Shield className="w-3.5 h-3.5" />}>
                    Admin Panel
                  </Button>
                </Link>
              )}
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="border-brand-300 bg-brand-50 text-brand-700 hover:bg-brand-100" leftIcon={<LayoutDashboard className="w-3.5 h-3.5" />}>
                  Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover border border-brand-200 shadow-2xs"
                  />
                ) : null}
                <div className="text-xs">
                  <div className="font-semibold text-slate-900 leading-none">{user.name}</div>
                  <div className="text-[10px] text-slate-500 capitalize">{user.role.toLowerCase().replace('_', ' ')}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => logout()}
                  title="Logout"
                  className="text-slate-500 hover:text-rose-600 px-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline" size="sm" leftIcon={<LogIn className="w-3.5 h-3.5" />}>
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="bpsc" size="sm" leftIcon={<UserPlus className="w-3.5 h-3.5" />}>
                  Register Free
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        items={navItems}
        pathname={pathname}
      />
    </header>
  );
}
