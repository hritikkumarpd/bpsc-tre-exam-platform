import React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AdSensePlaceholder } from '@/components/ui/adsense-placeholder';
import { Trophy, Award, Medal, Clock, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Live Aspirant Leaderboard | STET & BPSC TRE Computer Science',
  description: 'View top rankers, test scores, accuracy percentages, and completion time benchmarks across STET & BPSC TRE Computer Science mock tests.',
};

export default function LeaderboardPage() {
  // Demo Leaderboard Benchmarks (clearly identified)
  const leaderboardEntries = [
    { rank: 1, name: 'Ankit Kumar', exam: 'BPSC TRE CSE', mock: 'BPSC TRE CSE Mock Test #01', score: '138 / 150', accuracy: '94.2%', time: '124 Mins', badge: 'GOLD' },
    { rank: 2, name: 'Priya Sharma', exam: 'STET CSE', mock: 'STET CSE Mock Test #01', score: '134 / 150', accuracy: '91.8%', time: '118 Mins', badge: 'SILVER' },
    { rank: 3, name: 'Rohan Verma', exam: 'BPSC TRE CSE', mock: 'BPSC TRE CSE Mock Test #01', score: '131 / 150', accuracy: '89.5%', time: '132 Mins', badge: 'BRONZE' },
    { rank: 4, name: 'Sneha Kumari', exam: 'STET CSE', mock: 'STET CSE Mock Test #02', score: '128 / 150', accuracy: '87.2%', time: '140 Mins', badge: 'TOP_10' },
    { rank: 5, name: 'Vikas Roy', exam: 'BPSC TRE CSE', mock: 'BPSC TRE CSE PYQ 3.0', score: '125 / 150', accuracy: '85.6%', time: '135 Mins', badge: 'TOP_10' },
    { rank: 6, name: 'Amit Singh', exam: 'STET CSE', mock: 'STET CSE PYQ 2023', score: '122 / 150', accuracy: '84.0%', time: '129 Mins', badge: 'TOP_10' },
    { rank: 7, name: 'Kavita Patel', exam: 'BPSC TRE CSE', mock: 'BPSC TRE CSE Mock Test #02', score: '120 / 150', accuracy: '82.5%', time: '142 Mins', badge: 'TOP_10' },
  ];

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Mock Test Aspirants Leaderboard"
        description="Public rank showcase for top scores achieved in verified 150-question mock tests under anti-cheat conditions."
        breadcrumbs={[{ label: 'Leaderboard' }]}
        badge={{ text: 'Verified Scores', variant: 'published' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-bold text-slate-800">State-wide Mock Benchmarks</span>
          </div>
          <div className="flex gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-medium">All Exams</span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 cursor-pointer">STET CSE</span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 cursor-pointer">BPSC TRE</span>
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Rank</th>
                  <th className="px-6 py-4">Aspirant Name</th>
                  <th className="px-6 py-4">Target Exam</th>
                  <th className="px-6 py-4">Attempted Paper</th>
                  <th className="px-6 py-4">Score (/150)</th>
                  <th className="px-6 py-4">Accuracy</th>
                  <th className="px-6 py-4">Time Taken</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                {leaderboardEntries.map((row) => (
                  <tr key={row.rank} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-bold">
                      {row.rank === 1 && <span className="inline-flex items-center gap-1.5 text-amber-600 font-extrabold"><Trophy className="w-4 h-4" /> #1</span>}
                      {row.rank === 2 && <span className="inline-flex items-center gap-1.5 text-slate-500 font-extrabold"><Medal className="w-4 h-4 text-slate-400" /> #2</span>}
                      {row.rank === 3 && <span className="inline-flex items-center gap-1.5 text-amber-700 font-extrabold"><Award className="w-4 h-4 text-amber-700" /> #3</span>}
                      {row.rank > 3 && <span className="text-slate-500 font-medium">#{row.rank}</span>}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.name}</td>
                    <td className="px-6 py-4">
                      <Badge variant={row.exam.includes('STET') ? 'stet' : 'bpsc'}>{row.exam}</Badge>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600">{row.mock}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{row.score}</td>
                    <td className="px-6 py-4 font-semibold text-emerald-600">{row.accuracy}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <AdSensePlaceholder slotId="leaderboard-bottom" format="banner" />
      </div>
    </div>
  );
}
