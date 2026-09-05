'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'STET_CSE',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="Contact & Aspirant Support"
        description="Have questions about STET CSE, BPSC TRE mock schedules, or answer key verifications? Get in touch with our academic team."
        breadcrumbs={[{ label: 'Contact' }]}
        badge={{ text: '24/7 Aspirant Helpdesk', variant: 'scheduled' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Info Side */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900">Get in Touch</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                We welcome suggestions for new mock tests, feedback on question explanations, or correction notices regarding official answer keys.
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-100/70 border border-slate-200">
                <Mail className="w-5 h-5 text-brand-600 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-500">Email Support</div>
                  <div className="font-medium text-slate-900">support@examprepcs.in</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-100/70 border border-slate-200">
                <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-500">Response Time</div>
                  <div className="font-medium text-slate-900">Within 24 Hours</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-7">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Send Us a Message</CardTitle>
                <CardDescription>Fill out the details below and our team will get back to you.</CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <Alert variant="success" title="Message Received!">
                    Thank you for reaching out. Our academic support team will review your inquiry and respond shortly.
                  </Alert>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Category</label>
                      <select
                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      >
                        <option value="STET_CSE">STET Computer Science Mock Inquiry</option>
                        <option value="BPSC_TRE">BPSC TRE 1.0/2.0/3.0 PYQ Feedback</option>
                        <option value="ANSWER_KEY">Answer Key Verification Request</option>
                        <option value="TECH_ISSUE">Technical Support / Test Engine Issue</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Detail your question or request..."
                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <Button type="submit" variant="primary" className="w-full" rightIcon={<Send className="w-4 h-4" />}>
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
