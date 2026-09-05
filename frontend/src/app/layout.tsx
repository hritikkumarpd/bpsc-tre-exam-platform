import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'STET & BPSC TRE Computer Science Mock Tests & PYQs | ExamPrep CS',
    template: '%s | ExamPrep CS - STET & BPSC TRE',
  },
  description:
    'Dedicated preparation platform for Bihar STET Computer Science and BPSC TRE Computer Science (1.0, 2.0, 3.0). Attempt 150-question mock tests with official anti-cheat timer and topic analytics.',
  keywords: [
    'STET CSE PYQ',
    'STET CSE Mock Test',
    'BPSC TRE Computer Science PYQ',
    'BPSC TRE 1.0 PYQ',
    'BPSC TRE 2.0 PYQ',
    'BPSC TRE 3.0 PYQ',
    'BPSC TRE CSE Mock Test',
    'Bihar Teacher Recruitment Computer Science',
  ],
  authors: [{ name: 'ExamPrep CS Engineering' }],
  creator: 'ExamPrep CS',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    title: 'STET & BPSC TRE Computer Science Preparation Platform',
    description:
      'Attempt verified previous year question papers and 15 scheduled full-length mock tests for STET CSE & BPSC TRE Computer Science.',
    siteName: 'ExamPrep CS',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { AuthProvider } from '@/context/auth-context';
import { LiveChatWidget } from '@/components/chat/live-chat-widget';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <LiveChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
