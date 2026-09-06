import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { AdSensePlaceholder } from '@/components/ui/adsense-placeholder';
import { CheckCircle2, BookOpen, Clock, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'STET Computer Science Exam Prep Hub | PYQs & 15 Mock Tests',
  description: 'Complete Bihar STET CSE Paper II preparation: 3 genuine PYQs, 15 full-length 150-question mock tests, and subject syllabus breakdown.',
};

export default function StetCsePage() {
  const syllabusTopics = [
    { subject: 'Data Structures & Algorithms', count: '25 Qs', topics: 'Arrays, Linked Lists, Stacks, Queues, Trees, Binary Search Trees, Sorting algorithms, Complexity' },
    { subject: 'Operating Systems', count: '20 Qs', topics: 'Process Management, Scheduling, CPU Scheduling, Deadlocks, Memory Management, Paging, Virtual Memory' },
    { subject: 'Database Management Systems', count: '20 Qs', topics: 'ER Diagrams, Relational Algebra, SQL Queries, Normalization (1NF to 3NF/BCNF), Transactions & ACID' },
    { subject: 'Computer Networks', count: '20 Qs', topics: 'OSI & TCP/IP models, IP Addressing, Subnetting, Routing Protocols, HTTP/HTTPS, Security Basics' },
    { subject: 'Object Oriented Programming (C++/Python)', count: '20 Qs', topics: 'Classes, Objects, Inheritance, Polymorphism, Encapsulation, Function Overloading, Constructors' },
    { subject: 'Web Technologies & Digital Logic', count: '20 Qs', topics: 'HTML5, CSS, JavaScript, Logic Gates, Boolean Algebra, Combinational Circuits, Number Systems' },
    { subject: 'General Pedagogy & Reasoning', count: '25 Qs', topics: 'Teaching Aptitude, Logical Reasoning, General Awareness' },
  ];

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Bihar STET Computer Science Hub"
        description="State Teacher Eligibility Test (STET) CS Paper II (Higher Secondary Class 11-12) complete exam suite."
        breadcrumbs={[{ label: 'STET CSE' }]}
        badge={{ text: '15 Tests Series', variant: 'stet' }}
      >
        <div className="flex gap-3">
          <Link href="/stet-cse/mock-tests">
            <Button variant="stet" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open 15-Test Series (Mocks + PYQs)
            </Button>
          </Link>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* EXAM PATTERN OVERVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-t-4 border-t-indigo-600">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="text-3xl font-extrabold text-indigo-950">15 Total Tests</div>
              <div className="text-sm font-semibold text-slate-700">Complete Test Series</div>
              <p className="text-xs text-slate-500">11 Full Mocks + 4 Official BSEB PYQs</p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-indigo-600">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="text-3xl font-extrabold text-indigo-950">150 Questions</div>
              <div className="text-sm font-semibold text-slate-700">Total Paper Length</div>
              <p className="text-xs text-slate-500">100 Subject CS + 50 Pedagogy & Aptitude</p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-indigo-600">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="text-3xl font-extrabold text-indigo-950">150 Minutes</div>
              <div className="text-sm font-semibold text-slate-700">Duration (2.5 Hours)</div>
              <p className="text-xs text-slate-500">Zero Negative Marking CBT Simulation</p>
            </CardContent>
          </Card>
        </div>

        {/* NOTICE ALERT */}
        <Alert variant="info" title="Unified STET CSE 15-Test Series">
          Both mock test practice papers and authentic BSEB STET previous year question papers (2020, 2023 Shift 1, 2023 Shift 2, and 2024) are brought together under one unified sequence of 15 tests.
        </Alert>

        {/* UNIFIED 15-TEST SERIES HIGHLIGHT */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-8 sm:p-10 border border-indigo-800/50 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <Badge variant="stet" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                Unified Test Series
              </Badge>
              <h2 className="text-3xl font-black text-white tracking-tight">
                15 Full Tests: Mocks & Official PYQs Combined
              </h2>
              <p className="text-sm text-slate-300">
                Prepare without switching between separate pages. Experience all 11 curated full syllabus mocks and 4 authentic BSEB previous year question papers in a single assessment program.
              </p>
            </div>

            <Link href="/stet-cse/mock-tests">
              <Button variant="stet" size="lg" className="bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold px-8 py-6 text-base" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Go To 15-Test Series
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-indigo-400 font-extrabold text-lg">Tests #01 – #11</div>
              <div className="font-semibold text-white text-sm">Full-Length Mocks</div>
              <p className="text-xs text-slate-400 mt-1">100 CS questions + 50 Art of Teaching & Reasoning.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-amber-400 font-extrabold text-lg">Test #12</div>
              <div className="font-semibold text-white text-sm">STET CSE (2020)</div>
              <p className="text-xs text-slate-400 mt-1">Original BSEB paper with verified explanations.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-amber-400 font-extrabold text-lg">Tests #13 & #14</div>
              <div className="font-semibold text-white text-sm">STET 2023 (S1 & S2)</div>
              <p className="text-xs text-slate-400 mt-1">Official September 2023 shift papers.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-amber-400 font-extrabold text-lg">Test #15</div>
              <div className="font-semibold text-white text-sm">STET CSE (2024)</div>
              <p className="text-xs text-slate-400 mt-1">Latest 2024 official recruitment examination.</p>
            </div>
          </div>
        </div>

        {/* ADSENSE PLACEHOLDER */}
        <AdSensePlaceholder slotId="stet-hub-middle" format="banner" />

        {/* SYLLABUS WEIGHTAGE TABLE */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">STET CSE Subject Syllabus & Weightage</h2>
            <p className="text-xs text-slate-500">Official Computer Science Higher Secondary breakdown.</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3.5">Subject Unit</th>
                    <th className="px-6 py-3.5">Approx Weightage</th>
                    <th className="px-6 py-3.5">Core Syllabus Topics</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {syllabusTopics.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-semibold text-slate-900">{item.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-indigo-700">{item.count}</td>
                      <td className="px-6 py-4 text-xs text-slate-600 leading-relaxed">{item.topics}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
