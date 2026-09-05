'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/auth-context';
import { apiClient } from '@/lib/api-client';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Users,
  ShieldCheck,
  GraduationCap,
  Minimize2,
  Maximize2,
} from 'lucide-react';

interface ChatMessage {
  _id: string;
  senderName: string;
  senderRole: string;
  message: string;
  channel: string;
  questionRef?: string;
  createdAt: string;
}

export function LiveChatWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [channel, setChannel] = useState<'GENERAL' | 'BPSC_TRE' | 'STET_CSE'>('BPSC_TRE');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-fetch messages when open or channel changes
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const fetchChat = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/chat/messages?channel=${channel}&limit=40`);
        if (isMounted && res.data?.success && res.data.data?.messages) {
          setMessages(res.data.data.messages);
          scrollToBottom();
        }
      } catch (err) {
        console.error('Chat fetch error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchChat();
    // Poll for new doubt discussions every 5 seconds while open
    const interval = setInterval(fetchChat, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isOpen, channel]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || sending) return;

    const textToSend = inputText.trim();
    setInputText('');
    setSending(true);

    try {
      const res = await apiClient.post('/chat/messages', {
        message: textToSend,
        channel,
        senderName: user?.name || 'Aspirant Student',
      });

      if (res.data?.success && res.data.data?.message) {
        setMessages((prev) => [...prev, res.data.data.message]);
        scrollToBottom();
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* 1. FLOATING CHAT BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white p-4 rounded-full shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 group border-2 border-blue-400/40"
          title="Open Aspirant Doubt & Faculty Discussion Chat"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-[#070f1e] animate-pulse" />
          </div>
          <span className="font-extrabold text-xs tracking-wide hidden sm:inline pr-1">
            Live Doubt Chat
          </span>
        </button>
      )}

      {/* 2. INTERACTIVE CHAT POPUP WINDOW */}
      {isOpen && (
        <div className="w-[360px] sm:w-[410px] h-[520px] bg-[#0b162b] border border-blue-900/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0d1c3a] to-[#0a152d] border-b border-slate-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-xs leading-none flex items-center gap-1.5">
                  Aspirant Doubt Community
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h3>
                <span className="text-[10px] text-slate-400">Live peer & mentor discussion</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Channel Selector Pills */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#091326] border-b border-slate-800 text-[11px] font-bold">
            <button
              onClick={() => setChannel('BPSC_TRE')}
              className={`px-3 py-1 rounded-lg transition-all ${
                channel === 'BPSC_TRE'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              BPSC TRE CSE
            </button>
            <button
              onClick={() => setChannel('STET_CSE')}
              className={`px-3 py-1 rounded-lg transition-all ${
                channel === 'STET_CSE'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              STET CSE
            </button>
            <button
              onClick={() => setChannel('GENERAL')}
              className={`px-3 py-1 rounded-lg transition-all ${
                channel === 'GENERAL'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              General CS
            </button>
          </div>

          {/* Message Stream */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {loading && messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-[11px]">Loading live discussion...</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center px-6 space-y-2">
                <GraduationCap className="w-8 h-8 text-blue-400/60" />
                <p className="text-xs text-slate-300 font-bold">No messages in this channel yet.</p>
                <p className="text-[11px] text-slate-500">
                  Ask a question, discuss PYQ answer keys, or post a doubt!
                </p>
              </div>
            ) : (
              messages.map((m) => {
                const isMentorOrAdmin =
                  m.senderRole === 'SUPER_ADMIN' ||
                  m.senderRole === 'ADMIN' ||
                  m.senderRole === 'TEACHER_EXPERT' ||
                  m.senderRole === 'CONTENT_EDITOR';

                return (
                  <div
                    key={m._id}
                    className={`p-3 rounded-2xl border space-y-1 ${
                      isMentorOrAdmin
                        ? 'bg-amber-950/25 border-amber-800/40 text-amber-100'
                        : 'bg-[#0e1c37] border-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className={isMentorOrAdmin ? 'text-amber-400' : 'text-blue-400'}>
                          {m.senderName}
                        </span>
                        {isMentorOrAdmin && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[9px] font-black uppercase">
                            Mentor
                          </span>
                        )}
                      </div>
                      <span className="text-slate-500 text-[9px]">
                        {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <p className="text-xs text-white leading-relaxed whitespace-pre-wrap">{m.message}</p>
                  </div>
                );
              })
            )}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-[#091326] border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Ask doubt in ${channel.replace('_', ' ')}...`}
              className="flex-1 bg-[#0e1c37] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || sending}
              className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl transition-all shadow-md shadow-blue-600/30"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
