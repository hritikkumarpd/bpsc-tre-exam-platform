'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api-client';
import {
  Users,
  FileText,
  Layers,
  ShieldAlert,
  Sparkles,
  Activity,
  ArrowRight,
  UploadCloud,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

interface MetricsData {
  totalUsers: number;
  totalQuestions: number;
  totalMocks: number;
  totalPYQs: number;
  cancelledAttempts: number;
  pendingReviews: number;
}

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<MetricsData>({
    totalUsers: 0,
    totalQuestions: 0,
    totalMocks: 0,
    totalPYQs: 0,
    cancelledAttempts: 0,
    pendingReviews: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/metrics');
      if (res.data.success && res.data.data?.metrics) {
        setMetrics(res.data.data.metrics);
      }
    } catch (err) {
      console.error('Failed to load admin metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Admin Command Center"
        description="Comprehensive platform management for STET & BPSC TRE Computer Science preparation."
        breadcrumbs={[{ label: 'Admin' }]}
        badge={{ text: 'System Administration', variant: 'hard' }}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={fetchMetrics}
          disabled={loading}
          leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
        >
          Refresh Live Metrics
        </Button>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* LIVE DATABASE METRICS */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="border-slate-200 shadow-xs">
            <CardContent className="pt-5 text-center space-y-1">
              <div className="text-2xl font-extrabold text-slate-900">
                {loading ? '...' : metrics.totalUsers}
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">Registered Users</div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-xs">
            <CardContent className="pt-5 text-center space-y-1">
              <div className="text-2xl font-extrabold text-brand-600">
                {loading ? '...' : metrics.totalQuestions}
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">Total Questions</div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-xs">
            <CardContent className="pt-5 text-center space-y-1">
              <div className="text-2xl font-extrabold text-emerald-600">
                {loading ? '...' : metrics.totalMocks}
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">Mock Tests</div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-xs">
            <CardContent className="pt-5 text-center space-y-1">
              <div className="text-2xl font-extrabold text-amber-600">
                {loading ? '...' : metrics.totalPYQs}
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">Official PYQ Papers</div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-xs">
            <CardContent className="pt-5 text-center space-y-1">
              <div className="text-2xl font-extrabold text-rose-600">
                {loading ? '...' : metrics.cancelledAttempts}
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">Cancelled (Violations)</div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-xs">
            <CardContent className="pt-5 text-center space-y-1">
              <div className="text-2xl font-extrabold text-purple-600">
                {loading ? '...' : metrics.pendingReviews}
              </div>
              <div className="text-[11px] font-bold text-slate-500 uppercase">AI Review Queue</div>
            </CardContent>
          </Card>
        </div>

        {/* PRIMARY ACTION CARD: PDF UPLOAD WORKFLOW */}
        <div className="bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-brand-800">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-400/30">
              <Sparkles className="w-3.5 h-3.5" /> High-Efficiency Question Pipeline
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">Direct PDF Question Paper Uploader</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Upload official BPSC TRE / STET question paper PDFs. The pipeline parses bilingual papers, isolates pristine English text, generates detailed step-by-step solutions, and publishes them with strict SHA-256 fingerprint deduplication.
            </p>
          </div>
          <Link href="/admin/pyqs/upload">
            <Button
              variant="bpsc"
              size="lg"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-lg hover:shadow-xl transition-all"
              leftIcon={<UploadCloud className="w-5 h-5 text-slate-950" />}
            >
              Upload PDF Paper
            </Button>
          </Link>
        </div>

        {/* ADMIN MANAGEMENT TILES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/users">
            <Card className="hover:border-slate-400 hover:shadow-md transition-all p-5 h-full">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base pt-2">User & Role Management</h3>
                  <p className="text-xs text-slate-500">Manage user roles (STUDENT, CONTENT_EDITOR, SUPER_ADMIN) & permissions.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </Card>
          </Link>

          <Link href="/admin/questions">
            <Card className="hover:border-brand-400 hover:shadow-md transition-all p-5 h-full">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base pt-2">Question Bank Management</h3>
                  <p className="text-xs text-slate-500">Live search, filter, inspect, edit, verify, and fingerprint all questions.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </Card>
          </Link>

          <Link href="/admin/mock-tests">
            <Card className="hover:border-emerald-400 hover:shadow-md transition-all p-5 h-full">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base pt-2">Mock Test Generator & Schedule</h3>
                  <p className="text-xs text-slate-500">Generate 150-Q unique mocks and schedule release dates.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </Card>
          </Link>

          <Link href="/admin/pyqs/upload">
            <Card className="hover:border-amber-400 hover:shadow-md transition-all p-5 bg-gradient-to-br from-amber-50/40 to-white border-amber-200 h-full">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <UploadCloud className="w-5 h-5 text-amber-700" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base pt-2">Upload PYQ Paper (PDF)</h3>
                  <p className="text-xs text-slate-500">Upload official PDF question papers, parse questions & options A-E, and publish.</p>
                </div>
                <Badge variant="bpsc">PDF Parser</Badge>
              </div>
            </Card>
          </Link>

          <Link href="/admin/review">
            <Card className="hover:border-purple-400 hover:shadow-md transition-all p-5 h-full">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base pt-2">AI Question Review Queue</h3>
                  <p className="text-xs text-slate-500">Review, approve, or reject AI-generated question drafts before publication.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </Card>
          </Link>

          <Link href="/admin/violations">
            <Card className="hover:border-rose-400 hover:shadow-md transition-all p-5 h-full">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base pt-2">Anti-Cheat Violations Monitor</h3>
                  <p className="text-xs text-slate-500">Audit focus loss violations, tab switches, and cancelled attempts.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
