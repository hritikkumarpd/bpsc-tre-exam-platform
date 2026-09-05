'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { ShieldAlert, ArrowLeft, Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center space-y-4 text-white">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm font-medium">Verifying Administrative Privileges...</p>
      </div>
    );
  }

  // Strict RBAC Verification: Only SUPER_ADMIN, ADMIN, or CONTENT_EDITOR are allowed
  const isAuthorizedAdmin =
    user &&
    (user.role === 'SUPER_ADMIN' ||
      user.role === 'ADMIN' ||
      user.role === 'CONTENT_EDITOR');

  if (!isAuthorizedAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-rose-900/60 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-950/80 text-rose-500 border border-rose-800 flex items-center justify-center mx-auto shadow-lg shadow-rose-900/40">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-950 text-rose-400 border border-rose-800">
              403 • Access Denied
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Portal Restricted</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              This subdomain and administrative control center is strictly reserved for authenticated teachers, content editors, and platform administrators.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-left text-xs space-y-1.5 text-slate-400">
            <div className="flex justify-between">
              <span>Your Current Status:</span>
              <span className="font-bold text-white">
                {user ? `Logged In (${user.role})` : 'Unauthenticated / Guest'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Required Role:</span>
              <span className="font-bold text-amber-400">ADMIN / SUPER_ADMIN</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            {!user ? (
              <Link href="/login?redirect=/admin" className="w-full">
                <Button variant="bpsc" className="w-full font-bold bg-amber-500 hover:bg-amber-400 text-slate-950" leftIcon={<LogIn className="w-4 h-4" />}>
                  Sign in with Admin Credentials
                </Button>
              </Link>
            ) : (
              <Link href="/student/dashboard" className="w-full">
                <Button variant="bpsc" className="w-full font-bold bg-blue-600 hover:bg-blue-500" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Go to Student Dashboard
                </Button>
              </Link>
            )}

            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full text-slate-400 border-slate-800 hover:bg-slate-800">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If authorized, render children seamlessly
  return <>{children}</>;
}
