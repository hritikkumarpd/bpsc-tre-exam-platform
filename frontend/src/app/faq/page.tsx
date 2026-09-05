'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { AccordionItem } from '@/components/ui/accordion';
import { AdSensePlaceholder } from '@/components/ui/adsense-placeholder';
import { HelpCircle, Search } from 'lucide-react';
import { FAQItem } from '@/types';

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'STET_CSE',
      question: 'What is the pattern and marks distribution for Bihar STET Computer Science Paper II?',
      answer: 'STET Computer Science Paper II consists of 150 objective multiple-choice questions for 150 total marks (1 mark per question). The paper includes 100 questions covering Computer Science subject core (DS, OS, DBMS, Networks, OOPs, Web Tech) and 50 questions covering Teaching Art & General Aptitude. Duration is 150 minutes (2.5 hours) without negative marking.',
    },
    {
      id: 'faq-2',
      category: 'BPSC_TRE',
      question: 'How are BPSC TRE 1.0, 2.0, and 3.0 Computer Science question papers structured?',
      answer: 'BPSC TRE PGT Computer Science (Class 11-12) consists of 150 questions (150 Marks). Part 1 is Qualifying Language (30 Qs), Part 2 is General Studies (40 Qs), and Part 3 is CS Subject Core (80 Qs). Test duration is 2.5 hours.',
    },
    {
      id: 'faq-3',
      category: 'ANTI_CHEAT',
      question: 'What triggers a focus violation during a mock test attempt?',
      answer: 'A focus violation is triggered whenever browser visibility is lost during an active test (e.g. switching tabs, opening another browser window, or minimizing the page). The system grants up to 5 warnings. On the 6th violation, the test is automatically cancelled by backend authority.',
    },
    {
      id: 'faq-4',
      category: 'MOCK_TESTS',
      question: 'When do scheduled mock tests become unlocked for aspirants?',
      answer: 'Each mock test has a release timestamp (`releaseAt`). Prior to the release date, the mock displays a locked status and countdown timer. Upon reaching the release timestamp, the mock test automatically unlocks for all registered users.',
    },
    {
      id: 'faq-5',
      category: 'GENERAL',
      question: 'Are answer explanations provided after submitting a test?',
      answer: 'Yes. Upon submitting your test, you receive instant score metrics (Correct, Wrong, Skipped, Accuracy %, Time Taken) alongside step-by-step verified explanations for every single question.',
    },
    {
      id: 'faq-6',
      category: 'GENERAL',
      question: 'Does ExamPrep CS use AI to generate PYQs?',
      answer: 'No. We follow a strict NO fabricated PYQ policy. All Previous Year Question papers listed on our platform are genuine papers transcribed from official BSEB and BPSC examinations.',
    },
  ];

  const filteredFaqs = faqs.filter((item) => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Frequently Asked Questions"
        description="Comprehensive answers about exam patterns, PYQ authenticity, mock test schedules, and test environment rules."
        breadcrumbs={[{ label: 'FAQ' }]}
        badge={{ text: 'Aspirant Guidance', variant: 'neutral' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search & Filter bar */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search questions or keywords (e.g. anti-cheat, negative marking, STET)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-2xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { id: 'ALL', label: 'All FAQs' },
              { id: 'STET_CSE', label: 'STET CS' },
              { id: 'BPSC_TRE', label: 'BPSC TRE' },
              { id: 'ANTI_CHEAT', label: 'Anti-Cheat Rules' },
              { id: 'MOCK_TESTS', label: 'Mock Series' },
              { id: 'GENERAL', label: 'General' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-brand-600 text-white font-semibold shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        {filteredFaqs.length > 0 ? (
          <div>
            {filteredFaqs.map((faq) => (
              <AccordionItem key={faq.id} id={faq.id} title={faq.question}>
                {faq.answer}
              </AccordionItem>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 text-sm bg-white rounded-xl border border-slate-200">
            No questions matched your search query. Try searching for different keywords or resetting filters.
          </div>
        )}

        <AdSensePlaceholder slotId="faq-bottom" format="banner" />
      </div>
    </div>
  );
}
