'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/page-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api-client';
import { ShieldAlert, ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';

interface ViolationItem {
  _id: string;
  userId?: { name: string; email: string };
  testId?: { title: string };
  violationsCount?: number;
  cancellationReason?: string;
  ipAddress?: string;
  updatedAt: string;
}

export default function ViolationsAdminPage() {
  const [violations, setViolations] = useState<ViolationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchViolations = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/admin/violations');
      if (res.data.success && res.data.data?.violations) {
        setViolations(res.data.data.violations);
      }
    } catch (err) {
      console.error('Failed to load violations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchViolations();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Live Anti-Cheat Violation Monitoring Log"
        description="Audit cancelled test attempts, focus loss violation history, and IP address tracking."
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Violations' }]}
        badge={{ text: `${violations.length} Incidents`, variant: 'hard' }}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchViolations}
            disabled={loading}
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
          >
            Refresh
          </Button>
          <Link href="/admin">
            <Button variant="outline" className="bg-slate-800 text-white border-slate-700" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Admin
            </Button>
          </Link>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-slate-200 shadow-xs">
          {loading ? (
            <div className="p-12 text-center text-slate-500">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-600" />
              Loading security audit logs...
            </div>
          ) : violations.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <ShieldAlert className="w-10 h-10 mx-auto text-emerald-500" />
              <p className="text-slate-800 font-bold">No Anti-Cheat Violations Detected</p>
              <p className="text-xs text-slate-500">All test sessions have adhered to exam integrity standards.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Aspirant User</th>
                    <th className="px-6 py-4">Target Paper</th>
                    <th className="px-6 py-4">Violations</th>
                    <th className="px-6 py-4">Cancellation Reason</th>
                    <th className="px-6 py-4">IP Address</th>
                    <th className="px-6 py-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                  {violations.map((v) => (
                    <tr key={v._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {v.userId ? `${v.userId.name} (${v.userId.email})` : 'Anonymous Aspirant'}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-600">
                        {v.testId?.title || 'BPSC / STET Mock Test'}
                      </td>
                      <td className="px-6 py-4 font-bold text-rose-600">
                        {v.violationsCount || 5} Focus Loss
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-600 max-w-xs">
                        {v.cancellationReason || 'Exceeded focus loss limit during active proctored examination.'}
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-slate-500">{v.ipAddress || '127.0.0.1'}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {new Date(v.updatedAt).toLocaleString()}
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
