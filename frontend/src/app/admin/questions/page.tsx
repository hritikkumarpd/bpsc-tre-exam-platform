'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api-client';
import {
  ArrowLeft,
  Search,
  RefreshCw,
  PlusCircle,
  Database,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

interface QuestionItem {
  _id: string;
  questionText?: string;
  text?: string;
  exam: string;
  subject: string;
  sourceType: string;
  verificationStatus: string;
  difficulty?: string;
  correctAnswer?: string;
}

export default function QuestionsAdminPage() {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [examFilter, setExamFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = { limit: '100' };
      if (search) params.search = search;
      if (examFilter) params.exam = examFilter;
      if (sourceFilter) params.sourceType = sourceFilter;

      const res = await apiClient.get('/questions', { params });
      if (res.data.success && res.data.data?.questions) {
        setQuestions(res.data.data.questions);
      }
    } catch (err) {
      console.error('Failed to load questions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [examFilter, sourceFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchQuestions();
  };

  return (
    <div className="space-y-10 pb-16">
      <PageHeader
        title="Live Question Bank Management"
        description="Search, filter, inspect, and verify all questions stored in the central database."
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Questions' }]}
        badge={{ text: `${questions.length} Questions Loaded`, variant: 'stet' }}
      >
        <div className="flex items-center gap-3">
          <Link href="/admin/pyqs/upload">
            <Button variant="bpsc" size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
              Import Questions from PDF
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="outline" className="bg-slate-800 text-white border-slate-700" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Admin
            </Button>
          </Link>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* FILTERS AND SEARCH BAR */}
        <Card className="p-4 bg-white border-slate-200 shadow-xs">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <input
                type="text"
                placeholder="Search question text, keyword, or topic..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-brand-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>

            <div>
              <select
                value={examFilter}
                onChange={(e) => setExamFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-brand-500"
              >
                <option value="">All Target Exams</option>
                <option value="BPSC_TRE_CSE">BPSC TRE Computer Science</option>
                <option value="STET_CSE">STET Computer Science</option>
              </select>
            </div>

            <div className="flex gap-2">
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-brand-500"
              >
                <option value="">All Sources</option>
                <option value="PYQ">Official PYQ</option>
                <option value="HUMAN_CREATED">Human Created</option>
                <option value="AI_INSPIRED">AI Inspired</option>
              </select>

              <Button type="submit" variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
                Filter
              </Button>
            </div>
          </form>
        </Card>

        {/* QUESTIONS TABLE */}
        <Card className="overflow-hidden border-slate-200 shadow-xs">
          {loading ? (
            <div className="p-12 text-center text-slate-500">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-600" />
              Loading questions from database...
            </div>
          ) : questions.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Database className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-slate-600 font-medium">No questions matched the criteria.</p>
              <Link href="/admin/pyqs/upload">
                <Button variant="bpsc" size="sm">
                  Upload PDF Question Paper
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">#</th>
                    <th className="px-6 py-4">Question Content</th>
                    <th className="px-6 py-4">Exam</th>
                    <th className="px-6 py-4">Subject Unit</th>
                    <th className="px-6 py-4">Source</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                  {questions.map((q, idx) => (
                    <tr key={q._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-slate-400 font-bold">{idx + 1}</td>
                      <td className="px-6 py-4 max-w-md">
                        <p className="font-semibold text-slate-900 line-clamp-2 leading-snug">
                          {q.questionText || q.text}
                        </p>
                        {q.correctAnswer && (
                          <span className="text-[11px] font-bold text-emerald-700">Ans: Option {q.correctAnswer}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={q.exam?.includes('STET') ? 'stet' : 'bpsc'}>
                          {q.exam === 'BPSC_TRE_CSE' ? 'BPSC TRE' : q.exam}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-600 font-medium">{q.subject || 'Core CS'}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            q.sourceType === 'PYQ'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {q.sourceType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {q.verificationStatus || 'VERIFIED'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
