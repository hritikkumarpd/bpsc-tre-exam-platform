'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Trophy,
  BookOpen,
  Award,
  Flame,
  CheckCircle2,
  PlayCircle,
  BarChart3,
  TrendingUp,
  Clock,
  Bookmark,
  ChevronRight,
  Sparkles,
  Layers,
  Search,
  Zap,
  Star,
  Users,
  MessageSquare,
  Compass,
  GraduationCap,
  Activity,
  FileQuestion,
  HelpCircle,
  Video,
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';

interface CourseScore {
  id: string;
  title: string;
  category: string;
  enrolledDate: string;
  totalModules: number;
  completedModules: number;
  testScorePercent: number;
  badge: string;
  color: string;
  link: string;
}

export default function KnowledgeGateCloneDashboard() {
  const [activeTab, setActiveTab] = useState<'STATS' | 'COMMUNITY' | 'LEADERBOARD'>('STATS');
  const [userName, setUserName] = useState('Aspirant Student');
  const [userEmail, setUserEmail] = useState('student@examprep.in');
  const [pyqCount, setPyqCount] = useState(3);
  const [questionCount, setQuestionCount] = useState(289);

  useEffect(() => {
    // Check if user is logged in
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        if (u.name) setUserName(u.name);
        if (u.email) setUserEmail(u.email);
      } catch (e) {}
    }

    // Load live platform numbers
    apiClient.get('/pyqs').then((res) => {
      if (res.data?.data?.papers) {
        setPyqCount(res.data.data.papers.length);
      }
    }).catch(() => {});
  }, []);

  const enrolledTracks: CourseScore[] = [
    {
      id: 'bpsc-tre-cse',
      title: 'BPSC TRE Computer Science (Class 11-12)',
      category: 'Official BPSC Curriculum',
      enrolledDate: 'August 2026',
      totalModules: 15,
      completedModules: 11,
      testScorePercent: 88,
      badge: '15 Tests Track',
      color: 'from-blue-600 to-indigo-700',
      link: '/bpsc-tre/mock-tests',
    },
    {
      id: 'stet-cse-paper2',
      title: 'Bihar STET Paper-II Computer Science',
      category: 'BSEB High-School PGT',
      enrolledDate: 'July 2026',
      totalModules: 15,
      completedModules: 12,
      testScorePercent: 92,
      badge: '15 Tests Track',
      color: 'from-emerald-600 to-teal-700',
      link: '/stet-cse/mock-tests',
    },
    {
      id: 'cs-core-dsa-dbms',
      title: 'CS Core: DSA, DBMS, OS & Networking',
      category: 'Foundation Masterclass',
      enrolledDate: 'June 2026',
      totalModules: 15,
      completedModules: 14,
      testScorePercent: 95,
      badge: 'Mastery Achieved',
      color: 'from-purple-600 to-violet-800',
      link: '/bpsc-tre/mock-tests',
    },
  ];

  const quickPyqPapers = [
    {
      id: '6a9c5790ea166f234076c4a8',
      title: 'BPSC TRE 3.0 Computer Science Official Paper 2024',
      sub: '95 Verified English Questions • Step-by-Step Solutions',
      tag: 'TRE 3.0',
      tagColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    },
    {
      id: '6a9c578eea166f234076c31f',
      title: 'BPSC TRE 2.0 Computer Science Official Paper 2023',
      sub: '97 Verified English Questions • Step-by-Step Solutions',
      tag: 'TRE 2.0',
      tagColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      id: '6a9c578dea166f234076c194',
      title: 'BPSC TRE 1.0 Computer Science Official Paper 2023',
      sub: '97 Verified English Questions • Step-by-Step Solutions',
      tag: 'TRE 1.0',
      tagColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    },
  ];

  const leaderboardTop = [
    { rank: 1, name: 'Vikramaditya S.', score: '144 / 150', time: '112 min', badge: '🥇 1st Rank' },
    { rank: 2, name: 'Ananya Sharma', score: '141 / 150', time: '118 min', badge: '🥈 2nd Rank' },
    { rank: 3, name: 'Rahul Mishra', score: '138 / 150', time: '124 min', badge: '🥉 3rd Rank' },
    { rank: 4, name: 'Pooja Verma', score: '136 / 150', time: '126 min', badge: 'Top 1%' },
    { rank: 5, name: 'Amitabh Sen', score: '135 / 150', time: '130 min', badge: 'Top 2%' },
  ];

  return (
    <div className="min-h-screen bg-[#070f1e] text-slate-100 font-sans selection:bg-blue-600 selection:text-white pb-20">
      {/* 1. TOP HEADER BANNER (KnowledgeGate Student Profile Bar) */}
      <div className="bg-[#0b162b] border-b border-slate-800/90 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* User Profile Card */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 border border-blue-400/40">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#0b162b] flex items-center justify-center" title="Online Active">
                <CheckCircle2 className="w-3 h-3 text-slate-950 font-bold" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{userName}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-950/80 text-blue-400 border border-blue-800">
                  Aspirant Pro
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">{userEmail}</p>
              <div className="flex items-center gap-3 pt-1 text-xs text-slate-300">
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Flame className="w-3.5 h-3.5 fill-current text-amber-500" /> 14 Day Streak
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-semibold">Target: BPSC TRE 4.0 / STET CSE</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Pill Carousel */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            <div className="bg-[#0e1c37] border border-slate-800/80 p-3 rounded-xl text-center min-w-[95px]">
              <div className="text-lg font-black text-white">88.4%</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Avg Accuracy</div>
            </div>

            <div className="bg-[#0e1c37] border border-slate-800/80 p-3 rounded-xl text-center min-w-[95px]">
              <div className="text-lg font-black text-blue-400">{questionCount}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">PYQs Mastered</div>
            </div>

            <div className="bg-[#0e1c37] border border-slate-800/80 p-3 rounded-xl text-center min-w-[95px]">
              <div className="text-lg font-black text-emerald-400">134/150</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Highest Score</div>
            </div>

            <div className="bg-[#0e1c37] border border-slate-800/80 p-3 rounded-xl text-center min-w-[95px]">
              <div className="text-lg font-black text-amber-400">Top 3%</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">State Percentile</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN DASHBOARD CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT 2 COLUMNS: TABS (MY STATS / COMMUNITY / LEADERBOARD) & COURSES */}
          <div className="lg:col-span-2 space-y-8">
            {/* Navigation Tabs (KnowledgeGate Style) */}
            <div className="flex items-center gap-6 border-b border-slate-800 text-sm font-semibold pb-1">
              <button
                onClick={() => setActiveTab('STATS')}
                className={`pb-3 transition-all flex items-center gap-2 text-sm font-bold ${
                  activeTab === 'STATS'
                    ? 'text-blue-400 border-b-2 border-blue-500'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                My Stats & Preparation
              </button>

              <button
                onClick={() => setActiveTab('LEADERBOARD')}
                className={`pb-3 transition-all flex items-center gap-2 text-sm font-bold ${
                  activeTab === 'LEADERBOARD'
                    ? 'text-blue-400 border-b-2 border-blue-500'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Trophy className="w-4 h-4" />
                State Leaderboard
              </button>

              <button
                onClick={() => setActiveTab('COMMUNITY')}
                className={`pb-3 transition-all flex items-center gap-2 text-sm font-bold ${
                  activeTab === 'COMMUNITY'
                    ? 'text-blue-400 border-b-2 border-blue-500'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-4 h-4" />
                Discussion Community
              </button>
            </div>

            {/* TAB CONTENT: STATS */}
            {activeTab === 'STATS' && (
              <div className="space-y-8 animate-in fade-in-50 duration-200">
                {/* SECTION 1: COURSE & TRACK SCORES */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black tracking-wider text-slate-400 uppercase flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-blue-400" />
                      Course Scores & Subject Diagnostics
                    </p>
                    <Link href="/bpsc-tre/mock-tests" className="text-xs font-bold text-blue-400 hover:underline">
                      View All 15 Tests →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {enrolledTracks.map((track) => (
                      <div
                        key={track.id}
                        className="bg-[#0b162b] border border-slate-800/90 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all group"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/60">
                              {track.badge}
                            </span>
                            <span className="text-xs font-black text-emerald-400">{track.testScorePercent}% Score</span>
                          </div>

                          <h3 className="font-bold text-white text-sm leading-snug group-hover:text-blue-300 transition-colors">
                            {track.title}
                          </h3>

                          {/* Progress Meter */}
                          <div className="space-y-1.5 pt-1">
                            <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                              <span>Syllabus Coverage</span>
                              <span>
                                {track.completedModules}/{track.totalModules} Units
                              </span>
                            </div>
                            <div className="w-full bg-[#0e1c37] h-2 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                                style={{
                                  width: `${Math.round((track.completedModules / track.totalModules) * 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <Link href={track.link}>
                          <button className="w-full py-2 bg-[#0e1c37] hover:bg-blue-600 group-hover:bg-blue-600 text-slate-200 group-hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm">
                            <PlayCircle className="w-3.5 h-3.5" />
                            Practice Tests
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 2: 15-TEST SERIES INTERACTIVE SIMULATOR */}
                <div className="bg-gradient-to-br from-[#0c1830] to-[#0a1324] border border-blue-900/40 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-2">
                        <Zap className="w-3.5 h-3.5" /> 15-Test Series Engine
                      </span>
                      <h2 className="text-xl font-black text-white">Full-Length 15 Tests (Mocks + Official PYQs)</h2>
                      <p className="text-xs text-slate-400 mt-1">
                        Attempt curated full syllabus mock tests alongside authentic official previous year papers in an interactive testing interface.
                      </p>
                    </div>

                    <Link href="/bpsc-tre/mock-tests">
                      <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 shrink-0">
                        View All 15 Tests
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>

                  {/* Paper List */}
                  <div className="grid grid-cols-1 gap-3">
                    {quickPyqPapers.map((p) => (
                      <Link key={p.id} href={`/practice/${p.id}`}>
                        <div className="bg-[#0b162b] hover:bg-[#0f1d38] border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-4 sm:p-5 transition-all flex items-center justify-between gap-4 group">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border ${p.tagColor}`}>
                                {p.tag}
                              </span>
                              <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                                {p.title}
                              </h4>
                            </div>
                            <p className="text-xs text-slate-400">{p.sub}</p>
                          </div>

                          <div className="flex items-center gap-3">
                            <button className="px-4 py-2 bg-blue-600 group-hover:bg-blue-500 text-white rounded-xl text-xs font-black shadow transition-all flex items-center gap-1.5">
                              Attempt Test
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* SECTION 3: WEAK-TOPIC RADAR & ERROR NOTEBOOK */}
                <div className="bg-[#0b162b] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-rose-400" />
                      AI Error Notebook & Weak Area Diagnostics
                    </h3>
                    <span className="text-xs text-slate-400">Based on past test attempts</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/40 space-y-1">
                      <div className="text-xs font-bold text-rose-300">Binary Tree Traversal (Postorder)</div>
                      <p className="text-[11px] text-slate-400">Accuracy: 58% • 6 missed questions</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-900/40 space-y-1">
                      <div className="text-xs font-bold text-amber-300">CPU Scheduling (Round Robin)</div>
                      <p className="text-[11px] text-slate-400">Accuracy: 64% • 5 missed questions</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-900/40 space-y-1">
                      <div className="text-xs font-bold text-indigo-300">Subnetting & CIDR Notation</div>
                      <p className="text-[11px] text-slate-400">Accuracy: 71% • 4 missed questions</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: LEADERBOARD */}
            {activeTab === 'LEADERBOARD' && (
              <div className="bg-[#0b162b] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 animate-in fade-in-50 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-400" />
                      Bihar State STET & BPSC TRE Computer Science Leaderboard
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Top rankers from recent 150-question mock exams</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {leaderboardTop.map((user) => (
                    <div
                      key={user.rank}
                      className="p-4 rounded-xl bg-[#0e1c37] border border-slate-800 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <span className="w-8 h-8 rounded-lg bg-blue-950 text-blue-400 font-black text-sm flex items-center justify-center border border-blue-800">
                          #{user.rank}
                        </span>
                        <div>
                          <div className="text-sm font-bold text-white">{user.name}</div>
                          <div className="text-xs text-slate-400">Time taken: {user.time}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-black text-emerald-400">{user.score}</div>
                        <span className="text-[10px] font-bold text-amber-400">{user.badge}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: COMMUNITY */}
            {activeTab === 'COMMUNITY' && (
              <div className="bg-[#0b162b] border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 animate-in fade-in-50 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-400" />
                      Aspirant Doubt & Solution Community
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Connect with fellow BPSC TRE Computer Science aspirants</p>
                  </div>
                </div>

                <div className="p-8 rounded-2xl bg-[#0e1c37] border border-slate-800 text-center space-y-3">
                  <Compass className="w-10 h-10 mx-auto text-blue-400" />
                  <h4 className="text-sm font-bold text-white">Join 4,500+ Bihar CS Aspirants</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Discuss previous year questions, clarify doubts with verified answer keys, and share notes for upcoming exams.
                  </p>
                  <a
                    href="https://t.me/bpsc_tre_cs_prep"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold text-white shadow-lg transition-all"
                  >
                    Open Telegram Study Group
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: KNOWLEDGEGATE SIDEBAR (PLEASE WATCH & MY PAPERS) */}
          <div className="space-y-6">
            {/* KnowledgeGate "Please Watch" Video Widget */}
            <div className="bg-[#0b162b] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
              <p className="text-xs font-black uppercase text-blue-400 tracking-wider flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" />
                Featured Strategy Masterclass
              </p>

              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-video flex flex-col items-center justify-center text-center p-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-6 h-6 fill-current text-white" />
                </div>
                <p className="text-xs font-bold text-white mt-3">BPSC TRE 3.0 Analysis & Strategy</p>
                <p className="text-[10px] text-slate-400">Complete 80-Question CS Breakdown</p>
              </div>
            </div>

            {/* Direct PDF Uploader Banner */}
            <div className="bg-gradient-to-br from-indigo-950 to-blue-950 border border-blue-800/50 rounded-3xl p-5 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-black">
                <Sparkles className="w-4 h-4" />
                Teacher / Admin Tool
              </div>
              <h4 className="text-sm font-bold text-white">Upload New PDF Questions</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Import official BPSC question paper PDFs directly with automated clean English extraction and technical solutions.
              </p>
              <Link href="/admin/pyqs/upload">
                <button className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black shadow transition-all">
                  Open PDF Uploader
                </button>
              </Link>
            </div>

            {/* Quick Access Papers */}
            <div className="bg-[#0b162b] border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                My Enrolled Question Sets
              </h4>

              <div className="space-y-2.5 text-xs">
                {quickPyqPapers.map((p) => (
                  <Link key={p.id} href={`/practice/${p.id}`}>
                    <div className="p-3 rounded-xl bg-[#0e1c37] border border-slate-800 hover:border-blue-500/50 transition-all flex items-center justify-between group">
                      <div className="space-y-0.5">
                        <div className="font-bold text-white group-hover:text-blue-300 truncate max-w-[190px]">
                          {p.title}
                        </div>
                        <div className="text-[11px] text-slate-400">Authentic BPSC Key</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
