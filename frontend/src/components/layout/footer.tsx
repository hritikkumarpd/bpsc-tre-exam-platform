import React from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, CheckCircle2, Award, Mail, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                ExamPrep CS
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The authoritative, anti-cheat enabled mock test & previous year paper platform built specifically for STET Computer Science and BPSC TRE Computer Science aspirants.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>100% Genuine Verified PYQs & Zero AI Hallucination Policy</span>
            </div>
          </div>

          {/* Quick Links: STET CSE */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              STET CSE Hub
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/stet-cse" className="hover:text-white transition-colors">
                  STET Overview & Syllabus
                </Link>
              </li>
              <li>
                <Link href="/stet-cse/pyqs" className="hover:text-white transition-colors">
                  STET CSE PYQs (3 Papers)
                </Link>
              </li>
              <li>
                <Link href="/stet-cse/mock-tests" className="hover:text-white transition-colors">
                  STET 15 Mock Test Series
                </Link>
              </li>
              <li>
                <Link href="/faq#stet" className="hover:text-white transition-colors">
                  STET Exam Pattern Rules
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: BPSC TRE */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              BPSC TRE CSE Hub
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/bpsc-tre" className="hover:text-white transition-colors">
                  BPSC TRE Exam Overview
                </Link>
              </li>
              <li>
                <Link href="/bpsc-tre/pyqs" className="hover:text-white transition-colors">
                  BPSC TRE 1.0, 2.0 & 3.0 PYQs
                </Link>
              </li>
              <li>
                <Link href="/bpsc-tre/mock-tests" className="hover:text-white transition-colors">
                  BPSC TRE 15 Mock Test Series
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-white transition-colors">
                  Live Aspirants Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Platform & Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Platform
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/faq#anti-cheat" className="hover:text-white transition-colors">
                  Exam Integrity & Focus Rules
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} ExamPrep CS. Built for Bihar STET & BPSC TRE Computer Science Candidates.
          </p>
          <div className="flex items-center gap-6">
            <span>Non-affiliated with BPSC/BSEB official boards. Educational resource only.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
