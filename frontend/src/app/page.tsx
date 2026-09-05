import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AccordionItem } from '@/components/ui/accordion';
import { AdSensePlaceholder } from '@/components/ui/adsense-placeholder';
import {
  BookOpen,
  Award,
  ShieldAlert,
  BarChart3,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Users,
  Target,
  Zap,
} from 'lucide-react';

export const metadata = {
  title: 'STET & BPSC TRE Computer Science Preparation Platform | ExamPrep CS',
  description: 'Practice verified PYQs (BPSC TRE 1.0, 2.0, 3.0 & STET CSE) and attempt 15 scheduled full-length mock tests with real anti-cheat monitoring.',
};

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative bg-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="stet" className="bg-indigo-900/80 text-indigo-200 border-indigo-700">
                Bihar STET CS
              </Badge>
              <Badge variant="bpsc" className="bg-emerald-900/80 text-emerald-200 border-emerald-700">
                BPSC TRE 1.0, 2.0 & 3.0
              </Badge>
              <span className="text-xs text-amber-300 font-semibold flex items-center gap-1 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-800">
                <Sparkles className="w-3.5 h-3.5" /> Scheduled 150-Q Mock Series
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-indigo-200 to-emerald-300">STET & BPSC TRE</span> Computer Science With Authentic PYQs & Full-Length Mocks
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Engineered specifically for Bihar Computer Science Teacher Aspirants. Practice verified genuine PYQs, attempt timed 150-question mock tests under strict anti-cheat conditions, and track topic-wise accuracy.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/bpsc-tre/mock-tests">
                <Button variant="bpsc" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Attempt BPSC TRE Mocks
                </Button>
              </Link>
              <Link href="/stet-cse/pyqs">
                <Button variant="outline" size="lg" className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700">
                  Free Genuine PYQs
                </Button>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-slate-800 grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-extrabold text-white">30 Mocks</div>
                <div className="text-xs text-slate-400">15 STET + 15 BPSC TRE</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-emerald-400">4,500 Qs</div>
                <div className="text-xs text-slate-400">150 Questions / Mock</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-amber-400">100% Verified</div>
                <div className="text-xs text-slate-400">No Hallucinated PYQs</div>
              </div>
            </div>
          </div>

          {/* Featured Live Upcoming Teaser Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 bg-amber-950/80 border border-amber-800/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Upcoming Release
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-400" /> Releases Weekly
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">BPSC TRE CSE Mock Test #01</h3>
                <p className="text-xs text-slate-400 mt-1">Full 150-Question Pattern (150 Marks, Configurable Duration & Negative Marking)</p>
              </div>

              <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Computer Fundamentals & OS</span>
                  <span className="font-semibold text-emerald-400">30 Qs</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>DBMS & SQL Queries</span>
                  <span className="font-semibold text-emerald-400">25 Qs</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Data Structures, C++ & OOPs</span>
                  <span className="font-semibold text-emerald-400">35 Qs</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Networking, Web Tech & Python</span>
                  <span className="font-semibold text-emerald-400">30 Qs</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>General Aptitude & Reasoning</span>
                  <span className="font-semibold text-emerald-400">30 Qs</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Locked until release timer</span>
                </div>
                <Link href="/bpsc-tre/mock-tests">
                  <Button variant="bpsc" size="sm">
                    View Schedule
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* EXAM HUBS SECTION */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Select Your Target Exam Hub
            </h2>
            <p className="text-sm text-slate-600">
              Dedicated syllabus alignment, genuine previous year question papers, and scheduled mock tests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* STET CSE Card */}
            <Card className="hover:border-indigo-300 hover:shadow-md transition-all border-l-4 border-l-indigo-600">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="stet">STET CSE</Badge>
                  <span className="text-xs font-semibold text-slate-500">Eligibility Test</span>
                </div>
                <CardTitle className="text-xl mt-2 text-indigo-950">
                  Bihar STET Computer Science Hub
                </CardTitle>
                <CardDescription>
                  Full coverage for State Teacher Eligibility Test CS Paper II (Class 11-12).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-600">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span><strong>3 Initial PYQ Papers</strong> with detailed answer keys</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span><strong>15 Scheduled Mocks</strong> (150 Questions each)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Topic breakdown: OS, DBMS, DS, Networking, OOPs, Web Tech</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-3">
                <Link href="/stet-cse/pyqs">
                  <Button variant="outline" size="sm">
                    Attempt STET PYQs
                  </Button>
                </Link>
                <Link href="/stet-cse/mock-tests">
                  <Button variant="stet" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    STET Mock Series
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* BPSC TRE CSE Card */}
            <Card className="hover:border-emerald-300 hover:shadow-md transition-all border-l-4 border-l-emerald-600">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="bpsc">BPSC TRE CSE</Badge>
                  <span className="text-xs font-semibold text-slate-500">Recruitment Test</span>
                </div>
                <CardTitle className="text-xl mt-2 text-emerald-950">
                  BPSC TRE Computer Science Hub
                </CardTitle>
                <CardDescription>
                  Complete prep for Bihar Teacher Recruitment Exam 1.0, 2.0, 3.0 & upcoming TRE 4.0.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-600">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>BPSC TRE 1.0, 2.0 & 3.0 PYQ Papers</strong> with authentic keys</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>15 Full Length Mocks</strong> (150 Marks, 150 Qs)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Configurable negative marking simulation</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-3">
                <Link href="/bpsc-tre/pyqs">
                  <Button variant="outline" size="sm">
                    View TRE PYQs
                  </Button>
                </Link>
                <Link href="/bpsc-tre/mock-tests">
                  <Button variant="bpsc" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    BPSC Mock Series
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* ADSENSE PLACEHOLDER */}
        <AdSensePlaceholder slotId="home-banner-top" format="banner" />

        {/* CORE PLATFORM FEATURES */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="neutral">Built Like Real Exam</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Serious Aspirants Choose ExamPrep CS
            </h2>
            <p className="text-sm text-slate-600">
              Features engineered to mirror real test center environments and accelerate topic mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">5-Violation Anti-Cheat System</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Active browser visibility tracking. 5 focus loss warnings allowed before auto-cancelling test attempt to preserve authentic percentile ranks.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Weak-Topic Detection</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Post-test diagnostic breakdown identifies low-accuracy subjects (e.g. SQL JOINs or Tree Traversals) so you focus review where it counts.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Strict Content Integrity</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  100% verified authentic PYQs clearly labeled. Zero hallucinated or duplicate question bank guarantees accurate preparation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ ACCORDION */}
        <section className="space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-600">Everything you need to know about STET & BPSC TRE mock tests.</p>
          </div>

          <div>
            <AccordionItem id="faq-1" title="Are the Previous Year Papers (PYQs) 100% genuine?" defaultOpen={true}>
              Yes. Every PYQ paper for BPSC TRE 1.0, 2.0, 3.0 and STET CSE is transcribed directly from official exam question papers and verified against official answer keys released by BPSC & BSEB.
            </AccordionItem>
            <AccordionItem id="faq-2" title="How does the anti-cheating focus loss warning work?">
              During an active test, if you switch browser tabs or minimize the window, the system registers a focus loss violation. You get up to 5 warnings. On the 6th violation, the attempt is automatically cancelled by backend authority.
            </AccordionItem>
            <AccordionItem id="faq-3" title="Are future mock tests released all at once or on a schedule?">
              Mock tests are released on a fixed release schedule (`releaseAt`). Unreleased mocks display a countdown timer and locked state to maintain fair live test conditions for all aspirants.
            </AccordionItem>
          </div>
        </section>

        {/* FINAL CTA BANNER */}
        <div className="bg-gradient-to-r from-brand-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-8 md:p-12 text-center space-y-6 shadow-xl border border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Clear STET & BPSC TRE Computer Science?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Join thousands of aspirants preparing with 150-question full length mocks, real-time rank leaderboards, and instant weak-topic analytics.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/bpsc-tre/mock-tests">
              <Button variant="bpsc" size="lg">
                Explore BPSC TRE Series
              </Button>
            </Link>
            <Link href="/stet-cse/mock-tests">
              <Button variant="stet" size="lg">
                Explore STET CSE Series
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
