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
        badge={{ text: 'Official Exam Suite', variant: 'stet' }}
      >
        <div className="flex gap-3">
          <Link href="/stet-cse/pyqs">
            <Button variant="outline" className="bg-slate-800 text-white border-slate-700">
              3 Genuine PYQs
            </Button>
          </Link>
          <Link href="/stet-cse/mock-tests">
            <Button variant="stet" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Start 15 Mocks Series
            </Button>
          </Link>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* EXAM PATTERN OVERVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-t-4 border-t-indigo-600">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="text-3xl font-extrabold text-indigo-950">150 Questions</div>
              <div className="text-sm font-semibold text-slate-700">Total Paper Length</div>
              <p className="text-xs text-slate-500">100 Subject CS + 50 Pedagogy & Aptitude</p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-indigo-600">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="text-3xl font-extrabold text-indigo-950">150 Marks</div>
              <div className="text-sm font-semibold text-slate-700">Total Weightage</div>
              <p className="text-xs text-slate-500">1 Mark per question, No Negative Marking</p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-indigo-600">
            <CardContent className="pt-6 text-center space-y-2">
              <div className="text-3xl font-extrabold text-indigo-950">150 Minutes</div>
              <div className="text-sm font-semibold text-slate-700">Duration (2.5 Hours)</div>
              <p className="text-xs text-slate-500">CBT Mode timed environment</p>
            </CardContent>
          </Card>
        </div>

        {/* NOTICE ALERT */}
        <Alert variant="info" title="Genuine STET Previous Year Question Guarantee">
          All 3 STET CSE PYQ papers provided in our platform are indexed from actual Bihar School Examination Board (BSEB) computer science examination papers. We never use AI-generated placeholders labeled as PYQs.
        </Alert>

        {/* QUICK NAVIGATION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="hover:shadow-md transition-shadow border-l-4 border-l-amber-500">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Badge variant="pyq">Genuine PYQ Collection</Badge>
                <span className="text-xs text-slate-500">3 Verified Papers</span>
              </div>
              <CardTitle className="text-xl mt-2 text-slate-900">STET CSE Previous Year Papers</CardTitle>
              <CardDescription>
                Practice with real exam questions and official BSEB answer key explanations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span>STET CSE Official PYQ Paper I</span>
                <span className="font-medium text-slate-900">150 Questions</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span>STET CSE Official PYQ Paper II</span>
                <span className="font-medium text-slate-900">150 Questions</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>STET CSE Official PYQ Paper III</span>
                <span className="font-medium text-slate-900">150 Questions</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/stet-cse/pyqs" className="w-full">
                <Button variant="outline" className="w-full">
                  Access All STET PYQs
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-l-4 border-l-indigo-600">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Badge variant="stet">Scheduled Series</Badge>
                <span className="text-xs text-slate-500">15 Full Length Mocks</span>
              </div>
              <CardTitle className="text-xl mt-2 text-slate-900">15 STET Scheduled Mock Tests</CardTitle>
              <CardDescription>
                Full 150-question mock tests released systematically on a scheduled timeline.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p className="text-xs text-slate-600 leading-relaxed">
                Each mock test strictly adheres to the official 150-mark pattern, featuring live timer countdown, answer persistence, and focus loss monitoring.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/stet-cse/mock-tests" className="w-full">
                <Button variant="stet" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore STET Mock Schedule
                </Button>
              </Link>
            </CardFooter>
          </Card>
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
