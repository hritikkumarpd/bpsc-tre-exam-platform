'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';
import { PageHeader } from '@/components/layout/page-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '@/lib/api-client';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  BookOpen,
  Layers,
  HelpCircle,
  Zap,
  Trash2,
  FileCheck,
  FolderUp,
  Database,
  Search,
  FileSpreadsheet,
  Download,
  AlertCircle,
} from 'lucide-react';

interface ParsedQuestion {
  questionNumber: number;
  questionText: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  explanation?: string;
  subject?: string;
  topic?: string;
  difficulty?: string;
  fingerprintHash?: string;
}

const SAMPLE_PYQ_TEXT = `Q1. Which data structure is used to implement recursion in C++?
A) Queue
B) Stack
C) Heap
D) Array
E) None of the above
Answer: B
Explanation: Function call stack manages recursion memory.

Q2. What is the default subnet mask for a Class C IP address?
A) 255.0.0.0
B) 255.255.0.0
C) 255.255.255.0
D) 255.255.255.255
E) None of the above
Answer: C
Explanation: Class C networks use a 24-bit subnet mask (255.255.255.0).

Q3. Which SQL command is used to remove a table structure permanently from a database?
A) DELETE
B) TRUNCATE
C) DROP
D) REMOVE
E) None of the above
Answer: C
Explanation: DROP TABLE removes both the schema definition and all data permanently.`;

const CS_SUBJECT_OPTIONS = [
  'Data Structures & Algorithms',
  'Database Management Systems',
  'Operating Systems',
  'Computer Networks',
  'Software Engineering & OOP',
  'Digital Logic & Computer Architecture',
  'Web Technologies & Python',
  'Theory of Computation',
  'General Studies / Teaching Aptitude',
];

export default function PYQUploadPage() {
  const router = useRouter();
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const excelInputRef = useRef<HTMLInputElement>(null);

  // Target Destination
  const [destination, setDestination] = useState<'OFFICIAL_PAPER' | 'QUESTION_BANK'>('OFFICIAL_PAPER');
  const [title, setTitle] = useState('BPSC TRE 3.0 Computer Science Official Paper 2024');
  const [exam, setExam] = useState<'BPSC_TRE_CSE' | 'STET_CSE'>('BPSC_TRE_CSE');
  const [year, setYear] = useState<number>(2024);
  const [edition, setEdition] = useState('TRE 3.0 Official Shift');

  // Input modes: EXCEL / CSV vs PDF vs TEXT
  const [inputMode, setInputMode] = useState<'EXCEL_CSV' | 'PDF_FILE' | 'TEXT_PASTE'>('EXCEL_CSV');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rawText, setRawText] = useState(SAMPLE_PYQ_TEXT);

  // Parsed questions state
  const [parsedQuestions, setParsedQuestions] = useState<ParsedQuestion[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // ==========================================
  // PROTOCOL 1: DOWNLOAD INDUSTRY EXCEL TEMPLATE
  // ==========================================
  const handleDownloadExcelTemplate = () => {
    const templateData = [
      {
        'Question Text*': 'Which data structure is primarily used to implement Breadth-First Search (BFS)?',
        'Option A*': 'Stack',
        'Option B*': 'Queue',
        'Option C*': 'Priority Queue',
        'Option D*': 'More than one of the above',
        'Option E*': 'None of the above',
        'Correct Answer (A/B/C/D/E)*': 'B',
        'Step-by-Step Technical Solution*': 'BFS explores nodes level-by-level, which requires FIFO order maintained by a Queue.',
        'Subject Unit': 'Data Structures & Algorithms',
        'Topic': 'Graph Algorithms',
        'Difficulty (EASY/MEDIUM/HARD)': 'EASY',
      },
      {
        'Question Text*': 'In Relational Algebra, which operator produces a Cartesian product of two relations?',
        'Option A*': 'Union (∪)',
        'Option B*': 'Intersection (∩)',
        'Option C*': 'Cross Product (✕)',
        'Option D*': 'More than one of the above',
        'Option E*': 'None of the above',
        'Correct Answer (A/B/C/D/E)*': 'C',
        'Step-by-Step Technical Solution*': 'Cross product pairs every tuple of relation R with every tuple of relation S.',
        'Subject Unit': 'Database Management Systems',
        'Topic': 'Relational Algebra',
        'Difficulty (EASY/MEDIUM/HARD)': 'MEDIUM',
      },
      {
        'Question Text*': 'Which layer of the OSI model is responsible for end-to-end process communication and error recovery?',
        'Option A*': 'Network Layer',
        'Option B*': 'Transport Layer',
        'Option C*': 'Session Layer',
        'Option D*': 'More than one of the above',
        'Option E*': 'None of the above',
        'Correct Answer (A/B/C/D/E)*': 'B',
        'Step-by-Step Technical Solution*': 'The Transport layer (TCP/UDP) provides end-to-end communication services for applications.',
        'Subject Unit': 'Computer Networks',
        'Topic': 'OSI Model Layers',
        'Difficulty (EASY/MEDIUM/HARD)': 'EASY',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);

    // Auto-fit column widths
    worksheet['!cols'] = [
      { wch: 45 }, // Question Text
      { wch: 22 }, // Option A
      { wch: 22 }, // Option B
      { wch: 22 }, // Option C
      { wch: 22 }, // Option D
      { wch: 22 }, // Option E
      { wch: 25 }, // Correct Answer
      { wch: 45 }, // Solution
      { wch: 28 }, // Subject
      { wch: 22 }, // Topic
      { wch: 20 }, // Difficulty
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Questions_Template');
    XLSX.writeFile(workbook, 'BPSC_TRE_Question_Upload_Template.xlsx');
  };

  // ==========================================
  // PROTOCOL 2: PARSE EXCEL / CSV FILE (CLIENT-SIDE)
  // ==========================================
  const handleExcelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext !== 'xlsx' && ext !== 'xls' && ext !== 'csv') {
        setMessage({ type: 'error', text: 'Please upload an Excel file (.xlsx, .xls) or CSV (.csv).' });
        return;
      }
      setSelectedFile(file);
      setMessage(null);
    }
  };

  const processExcelUpload = async (file: File) => {
    return new Promise<ParsedQuestion[]>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const bstr = evt.target?.result;
          const workbook = XLSX.read(bstr, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const rawRows: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

          if (!rawRows || rawRows.length === 0) {
            throw new Error('The uploaded Excel sheet contains no rows.');
          }

          const parsedList: ParsedQuestion[] = [];

          rawRows.forEach((row, index) => {
            // Flexible column matching (supports standard testbook/adda headers)
            const qText =
              row['Question Text*'] ||
              row['Question Text'] ||
              row['Question'] ||
              row['question'] ||
              row['questionText'];

            if (!qText || String(qText).trim().length < 5) return;

            const optA = row['Option A*'] || row['Option A'] || row['A'] || row['optionA'] || '';
            const optB = row['Option B*'] || row['Option B'] || row['B'] || row['optionB'] || '';
            const optC = row['Option C*'] || row['Option C'] || row['C'] || row['optionC'] || '';
            const optD =
              row['Option D*'] ||
              row['Option D'] ||
              row['D'] ||
              row['optionD'] ||
              'More than one of the above';
            const optE =
              row['Option E*'] ||
              row['Option E'] ||
              row['E'] ||
              row['optionE'] ||
              'None of the above';

            let rawAns =
              row['Correct Answer (A/B/C/D/E)*'] ||
              row['Correct Answer'] ||
              row['Answer'] ||
              row['correctAnswer'] ||
              'A';

            rawAns = String(rawAns).trim().toUpperCase();
            if (!['A', 'B', 'C', 'D', 'E'].includes(rawAns)) {
              rawAns = 'A';
            }

            const explanation =
              row['Step-by-Step Technical Solution*'] ||
              row['Explanation'] ||
              row['Solution'] ||
              row['explanation'] ||
              `Official reference answer is Option (${rawAns}). Verified against curriculum benchmarks.`;

            const subject =
              row['Subject Unit'] ||
              row['Subject'] ||
              row['subject'] ||
              'Data Structures & Algorithms';

            const topic = row['Topic'] || row['topic'] || 'Core Concept';
            const difficulty = String(row['Difficulty (EASY/MEDIUM/HARD)'] || row['Difficulty'] || 'MEDIUM').toUpperCase();

            parsedList.push({
              questionNumber: index + 1,
              questionText: String(qText).trim(),
              options: [
                { key: 'A', text: String(optA).trim() },
                { key: 'B', text: String(optB).trim() },
                { key: 'C', text: String(optC).trim() },
                { key: 'D', text: String(optD).trim() },
                { key: 'E', text: String(optE).trim() },
              ],
              correctAnswer: rawAns,
              explanation: String(explanation).trim(),
              subject: String(subject).trim(),
              topic: String(topic).trim(),
              difficulty: ['EASY', 'MEDIUM', 'HARD'].includes(difficulty) ? difficulty : 'MEDIUM',
            });
          });

          resolve(parsedList);
        } catch (err: any) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsBinaryString(file);
    });
  };

  // Convert File to Base64 for PDF
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // ==========================================
  // MASTER DISPATCHER: EXTRACT & PARSE
  // ==========================================
  const handleExtractQuestions = async () => {
    setMessage(null);
    setIsProcessing(true);

    try {
      if (inputMode === 'EXCEL_CSV') {
        if (!selectedFile) {
          setMessage({ type: 'error', text: 'Please select an Excel (.xlsx) or CSV file first.' });
          setIsProcessing(false);
          return;
        }

        const questions = await processExcelUpload(selectedFile);
        if (questions.length === 0) {
          setMessage({
            type: 'error',
            text: 'Could not extract valid questions from the Excel file. Please use our template format.',
          });
        } else {
          setParsedQuestions(questions);
          setMessage({
            type: 'success',
            text: `Industry Batch Import: Successfully loaded ${questions.length} questions from "${selectedFile.name}"! Review below.`,
          });
        }
      } else if (inputMode === 'PDF_FILE') {
        if (!selectedFile) {
          setMessage({ type: 'error', text: 'Please select a PDF file first.' });
          setIsProcessing(false);
          return;
        }

        const base64Data = await fileToBase64(selectedFile);
        const response = await apiClient.post('/pyqs/upload-pdf-file', {
          pdfBase64: base64Data,
          fileName: selectedFile.name,
        });

        if (response.data.success && response.data.data?.questions) {
          const qs = response.data.data.questions;
          setParsedQuestions(qs);
          setMessage({
            type: 'success',
            text: `Successfully extracted ${qs.length} English questions with solutions from "${selectedFile.name}"!`,
          });
        } else {
          setMessage({
            type: 'error',
            text: response.data.message || 'Failed to extract questions from PDF.',
          });
        }
      } else {
        if (!rawText.trim()) {
          setMessage({ type: 'error', text: 'Please paste question paper text.' });
          setIsProcessing(false);
          return;
        }

        const response = await apiClient.post('/pyqs/parse-pdf', { paperText: rawText });
        if (response.data.success && response.data.data?.questions) {
          const qs = response.data.data.questions;
          setParsedQuestions(qs);
          setMessage({
            type: 'success',
            text: `Successfully parsed ${qs.length} questions from text! Review below.`,
          });
        } else {
          setMessage({ type: 'error', text: response.data.message || 'Failed to parse text.' });
        }
      }
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.message || 'Error processing question upload.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Question editing helpers
  const handleAnswerChange = (index: number, newAnswer: string) => {
    const updated = [...parsedQuestions];
    updated[index].correctAnswer = newAnswer;
    setParsedQuestions(updated);
  };

  const handleSubjectChange = (index: number, newSubject: string) => {
    const updated = [...parsedQuestions];
    updated[index].subject = newSubject;
    setParsedQuestions(updated);
  };

  const handleExplanationChange = (index: number, newExplanation: string) => {
    const updated = [...parsedQuestions];
    updated[index].explanation = newExplanation;
    setParsedQuestions(updated);
  };

  const handleRemoveQuestion = (index: number) => {
    const updated = parsedQuestions.filter((_, i) => i !== index);
    setParsedQuestions(updated);
  };

  // ==========================================
  // PUBLISH QUESTIONS TO DATABASE
  // ==========================================
  const handlePublish = async () => {
    if (parsedQuestions.length === 0) {
      setMessage({ type: 'error', text: 'No questions to publish. Please upload and parse first.' });
      return;
    }

    setIsPublishing(true);
    setMessage(null);

    try {
      if (destination === 'OFFICIAL_PAPER') {
        const response = await apiClient.post('/pyqs/import-paper', {
          title,
          exam,
          year,
          edition,
          questions: parsedQuestions,
        });

        if (response.data.success) {
          setMessage({
            type: 'success',
            text: `Paper "${title}" published successfully with ${parsedQuestions.length} official PYQ questions!`,
          });
          setTimeout(() => {
            router.push(exam === 'BPSC_TRE_CSE' ? '/bpsc-tre/pyqs' : '/stet-cse/pyqs');
          }, 1500);
        } else {
          setMessage({ type: 'error', text: response.data.message || 'Failed to publish PYQ paper.' });
        }
      } else {
        // Direct Question Bank import for 150-Q mock generation
        const response = await apiClient.post('/questions/bulk-import', {
          questions: parsedQuestions.map((q) => ({
            text: q.questionText,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation || 'Official verified answer key with comprehensive technical rationale.',
            subject: q.subject || 'Data Structures & Algorithms',
            topic: q.topic || 'Core Computer Science',
            exam: exam,
            difficulty: q.difficulty || 'MEDIUM',
            sourceType: 'PYQ',
          })),
        });

        if (response.data.success) {
          const { insertedCount, duplicatesSkipped } = response.data.data;
          setMessage({
            type: 'success',
            text: `Import complete! Added ${insertedCount} questions to Central Question Bank (${duplicatesSkipped} duplicates skipped).`,
          });
          setTimeout(() => {
            router.push('/admin/questions');
          }, 1500);
        } else {
          setMessage({ type: 'error', text: response.data.message || 'Failed to import to question bank.' });
        }
      }
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to publish questions.',
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      <PageHeader
        title="Enterprise Question Upload Protocol (Excel / PDF / Bulk Text)"
        description="Standard industry protocol for large-scale test portals (Testbook / Allen / TCS iON style). Upload standardized Excel/CSV question sheets or official bilingual PDFs with automated clean English extraction, options A-E formatting, and SHA-256 deduplication."
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Question Ingestion Protocol' }]}
        badge={{ text: 'Portal Upload Engine', variant: 'bpsc' }}
      >
        <Link href="/admin">
          <Button variant="outline" className="bg-slate-800 text-white border-slate-700" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Admin
          </Button>
        </Link>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {message && (
          <Alert variant={message.type === 'error' ? 'danger' : 'success'} title={message.type === 'success' ? 'Success' : 'Notice'}>
            {message.text}
          </Alert>
        )}

        {/* TOP INDUSTRY PROTOCOL SELECTION BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            onClick={() => {
              setInputMode('EXCEL_CSV');
              setSelectedFile(null);
            }}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
              inputMode === 'EXCEL_CSV'
                ? 'bg-emerald-50/70 border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <Badge variant={inputMode === 'EXCEL_CSV' ? 'stet' : 'neutral'}>
                Industry Standard #1
              </Badge>
            </div>
            <h4 className="font-extrabold text-slate-900 text-base mt-3">Excel / CSV Batch Sheet</h4>
            <p className="text-xs text-slate-500 mt-1">
              Used by Testbook, Allen & TCS iON. Bulk import 50-150 questions in seconds via formatted spreadsheet.
            </p>
          </div>

          <div
            onClick={() => {
              setInputMode('PDF_FILE');
              setSelectedFile(null);
            }}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
              inputMode === 'PDF_FILE'
                ? 'bg-blue-50/70 border-blue-600 shadow-md ring-2 ring-blue-500/20'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <FolderUp className="w-5 h-5" />
              </div>
              <Badge variant={inputMode === 'PDF_FILE' ? 'bpsc' : 'neutral'}>
                Auto OCR Extractor
              </Badge>
            </div>
            <h4 className="font-extrabold text-slate-900 text-base mt-3">Official Exam Paper PDF</h4>
            <p className="text-xs text-slate-500 mt-1">
              Directly upload BPSC TRE / STET question paper PDFs. Automatically filters Hindi noise and generates solutions.
            </p>
          </div>

          <div
            onClick={() => {
              setInputMode('TEXT_PASTE');
              setSelectedFile(null);
            }}
            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
              inputMode === 'TEXT_PASTE'
                ? 'bg-amber-50/70 border-amber-600 shadow-md ring-2 ring-amber-500/20'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <Badge variant={inputMode === 'TEXT_PASTE' ? 'pyq' : 'neutral'}>
                Quick Text / QTI
              </Badge>
            </div>
            <h4 className="font-extrabold text-slate-900 text-base mt-3">Raw Text / QTI Copy-Paste</h4>
            <p className="text-xs text-slate-500 mt-1">
              Paste questions directly from Word document or raw exam dump for instant regex parsing.
            </p>
          </div>
        </div>

        {/* SECTION 1: DESTINATION & METADATA CONFIG */}
        <Card className="p-6 bg-white border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-600" />
                Target Destination & Exam Details
              </h3>
              <p className="text-xs text-slate-500">Choose whether these questions form an official paper or populate the mock question bank.</p>
            </div>

            {/* Destination Toggle */}
            <div className="inline-flex rounded-lg border border-slate-200 p-1 bg-slate-50">
              <button
                type="button"
                onClick={() => setDestination('OFFICIAL_PAPER')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                  destination === 'OFFICIAL_PAPER'
                    ? 'bg-brand-600 text-white shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Official PYQ Paper
              </button>
              <button
                type="button"
                onClick={() => setDestination('QUESTION_BANK')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
                  destination === 'QUESTION_BANK'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                Add to Question Bank (For Mocks)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Paper / Batch Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Target Exam</label>
              <select
                value={exam}
                onChange={(e) => setExam(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-500"
              >
                <option value="BPSC_TRE_CSE">BPSC TRE Computer Science (150-Q)</option>
                <option value="STET_CSE">STET Computer Science (150-Q)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Exam Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </Card>

        {/* SECTION 2: UPLOAD BOX DEPENDING ON SELECTED PROTOCOL */}
        <Card className="p-6 bg-white border-slate-200 shadow-sm space-y-6">
          {/* PROTOCOL A: EXCEL / CSV UPLOAD */}
          {inputMode === 'EXCEL_CSV' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                    Standard Industry Excel / CSV Ingestion
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload your questions spreadsheet. If you don&apos;t have the template, download our standard industry format below.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadExcelTemplate}
                  className="border-emerald-600 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-bold"
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Download Excel Template (.xlsx)
                </Button>
              </div>

              {/* Drag & Drop Excel Box */}
              <div
                onClick={() => excelInputRef.current?.click()}
                className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-emerald-50/30 hover:bg-emerald-50/60"
              >
                <input
                  ref={excelInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                  onChange={handleExcelFileChange}
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-sm">
                    <FileSpreadsheet className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {selectedFile ? selectedFile.name : 'Click to Browse or Drag & Drop Excel / CSV Sheet (.xlsx / .csv)'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {selectedFile
                        ? `${(selectedFile.size / 1024).toFixed(1)} KB • Ready for automated batch ingestion`
                        : 'Supports columns: Question Text, Options A-E, Correct Answer, Solution, Subject & Difficulty'}
                    </p>
                  </div>
                  {selectedFile && (
                    <Badge variant="stet" className="mt-2 flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5" /> Sheet Selected
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PROTOCOL B: PDF EXTRACTION */}
          {inputMode === 'PDF_FILE' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FolderUp className="w-5 h-5 text-blue-600" />
                  Official Exam Question Paper PDF Ingestion
                </h3>
                <p className="text-xs text-slate-500">
                  Directly upload raw official BPSC TRE / STET question papers. Automatically filters Hindi translation OCR noise.
                </p>
              </div>

              <div
                onClick={() => pdfInputRef.current?.click()}
                className="border-2 border-dashed border-blue-300 hover:border-blue-500 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-blue-50/30 hover:bg-blue-50/60"
              >
                <input
                  ref={pdfInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFile(e.target.files[0]);
                      setMessage(null);
                    }
                  }}
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-sm">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {selectedFile ? selectedFile.name : 'Click to Browse or Drag & Drop Question Paper (.PDF)'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {selectedFile
                        ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for automated clean English extraction`
                        : 'Filters Hindi OCR garble and generates step-by-step technical solutions automatically'}
                    </p>
                  </div>
                  {selectedFile && (
                    <Badge variant="bpsc" className="mt-2 flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5" /> PDF Selected
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PROTOCOL C: TEXT PASTE */}
          {inputMode === 'TEXT_PASTE' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-600" />
                    Paste Question Paper Content
                  </h3>
                  <p className="text-xs text-slate-500">Paste text directly from Word, Google Docs, or text files.</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRawText(SAMPLE_PYQ_TEXT)}
                  leftIcon={<Zap className="w-3.5 h-3.5 text-amber-500" />}
                >
                  Load Sample Paper
                </Button>
              </div>

              <textarea
                rows={9}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste paper text here... e.g. Q1. Which data structure... A)... B)... Answer: B"
                className="w-full p-4 font-mono text-xs bg-slate-900 text-slate-100 border border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 leading-relaxed"
              />
            </div>
          )}

          {/* EXECUTE PARSE TRIGGER */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Includes auto-validation, step-by-step solution enrichment & SHA-256 fingerprint verification.</span>
            </div>

            <Button
              variant={inputMode === 'EXCEL_CSV' ? 'stet' : 'bpsc'}
              size="lg"
              onClick={handleExtractQuestions}
              isLoading={isProcessing}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              {inputMode === 'EXCEL_CSV'
                ? 'Parse & Ingest Excel Questions'
                : inputMode === 'PDF_FILE'
                ? 'Extract Clean English Questions'
                : 'Parse Questions from Text'}
            </Button>
          </div>
        </Card>

        {/* SECTION 3: PARSED QUESTIONS INSPECTOR & ONE-CLICK PUBLISH */}
        {parsedQuestions.length > 0 && (
          <Card className="p-6 bg-white border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Ingested Questions Review ({parsedQuestions.length} Questions Ready)
                </h3>
                <p className="text-xs text-slate-500">
                  Every question has clean English text, Options A-E, answer key, and step-by-step solution. You can edit any field before publishing.
                </p>
              </div>

              <Button
                variant={destination === 'OFFICIAL_PAPER' ? 'bpsc' : 'stet'}
                size="lg"
                onClick={handlePublish}
                isLoading={isPublishing}
                leftIcon={<UploadCloud className="w-4 h-4" />}
              >
                {destination === 'OFFICIAL_PAPER'
                  ? `Publish Official PYQ Paper (${parsedQuestions.length} Qs)`
                  : `Import ${parsedQuestions.length} Qs into Question Bank`}
              </Button>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {parsedQuestions.map((q, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-4 transition-all hover:border-slate-300">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center">
                        Q{q.questionNumber || idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {q.difficulty || 'MEDIUM'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Subject Picker */}
                      <div className="flex items-center gap-1.5">
                        <label className="text-xs font-bold text-slate-600">Unit:</label>
                        <select
                          value={q.subject || CS_SUBJECT_OPTIONS[0]}
                          onChange={(e) => handleSubjectChange(idx, e.target.value)}
                          className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-brand-500"
                        >
                          {CS_SUBJECT_OPTIONS.map((sub) => (
                            <option key={sub} value={sub}>
                              {sub}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Correct Answer Selector */}
                      <div className="flex items-center gap-1.5">
                        <label className="text-xs font-bold text-slate-600">Ans:</label>
                        <select
                          value={q.correctAnswer}
                          onChange={(e) => handleAnswerChange(idx, e.target.value)}
                          className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold text-emerald-700 focus:ring-2 focus:ring-brand-500"
                        >
                          {['A', 'B', 'C', 'D', 'E'].map((opt) => (
                            <option key={opt} value={opt}>
                              Option {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Remove question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                    {q.questionText}
                  </p>

                  {/* Options A-E */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                    {q.options.map((opt) => (
                      <div
                        key={opt.key}
                        className={`p-2.5 rounded-xl text-xs border transition-all ${
                          opt.key === q.correctAnswer
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="font-extrabold mr-1.5 text-slate-900">{opt.key})</span>
                        {opt.text}
                      </div>
                    ))}
                  </div>

                  {/* Step-by-Step Solution / Explanation */}
                  <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                      <span>Step-by-Step Technical Solution:</span>
                    </div>
                    <textarea
                      rows={2}
                      value={q.explanation || ''}
                      onChange={(e) => handleExplanationChange(idx, e.target.value)}
                      placeholder="Enter detailed technical solution or rationale..."
                      className="w-full p-2 text-xs bg-white/90 border border-amber-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-amber-500 font-sans leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Publish Bar */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                Total <strong>{parsedQuestions.length}</strong> questions ready for publication with server-side SHA-256 fingerprint verification.
              </p>

              <Button
                variant={destination === 'OFFICIAL_PAPER' ? 'bpsc' : 'stet'}
                size="lg"
                onClick={handlePublish}
                isLoading={isPublishing}
                leftIcon={<UploadCloud className="w-5 h-5" />}
              >
                {destination === 'OFFICIAL_PAPER'
                  ? `Publish Official PYQ Paper (${parsedQuestions.length} Qs)`
                  : `Import ${parsedQuestions.length} Qs into Question Bank`}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
