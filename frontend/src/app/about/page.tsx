import React from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ShieldCheck, Target, Award, Sparkles, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'About Our Platform | STET & BPSC TRE Computer Science',
  description: 'Learn about ExamPrep CS — our commitment to authentic PYQs, zero AI hallucinations, and 150-question anti-cheat mock tests for Bihar aspirants.',
};

export default function AboutPage() {
  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="About ExamPrep Computer Science"
        description="A specialized EdTech platform engineered to give Bihar STET & BPSC TRE CS aspirants a true test-center preparation experience."
        breadcrumbs={[{ label: 'About' }]}
        badge={{ text: 'Our Mission & Integrity', variant: 'published' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* MISSION STATEMENT */}
        <section className="space-y-4 text-slate-700 leading-relaxed">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Built Specifically for Computer Science Aspirants
          </h2>
          <p className="text-base text-slate-600">
            Bihar STET Paper II and BPSC Teacher Recruitment Exam (TRE) Computer Science are highly competitive examinations requiring deep domain knowledge across Operating Systems, Data Structures, Relational Databases, Computer Networks, and Object-Oriented Programming.
          </p>
          <p className="text-base text-slate-600">
            Many existing test platforms provide generic question banks with unverified answer keys or AI-fabricated questions disguised as real PYQs. ExamPrep CS was created to solve this trust deficit.
          </p>
        </section>

        {/* CONTENT RULES & INTEGRITY GUARANTEE */}
        <Card className="border-l-4 border-l-emerald-600 bg-emerald-50/30">
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-lg">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <span>Strict Content & Question Integrity Rules</span>
            </div>

            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>1. Genuine PYQ Transparency:</strong> Genuine previous-year questions are transcribed directly from official BSEB & BPSC exam papers and clearly marked.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>2. Zero Fabricated PYQs:</strong> We never label AI-generated or simulated questions as PYQs.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>3. Strict Duplicate Prevention:</strong> Mock tests undergo automated exact, normalized, and semantic duplicate detection so questions never repeat across different mock papers.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>4. Expert Verification:</strong> Every question includes detailed step-by-step explanations, topic tagging, and difficulty rating validated before publication.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* ANTI CHEAT INTEGRITY */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Authoritative Exam Anti-Cheat System</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Our active test engine monitors window focus loss and page visibility using native browser APIs. Switching tabs, minimizing windows, or taking unauthorized breaks generates a focus violation. After 5 warnings, the test attempt is automatically cancelled by backend authority to maintain authentic percentile leaderboards for all candidates.
          </p>
        </section>
      </div>
    </div>
  );
}
