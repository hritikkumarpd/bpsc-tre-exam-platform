# ExamPrep CS — Production STET & BPSC TRE Computer Science Examination Engine

A production-grade, highly specialized web platform built for **Bihar STET Computer Science Paper II** and **BPSC TRE Computer Science (1.0, 2.0 & 3.0)** aspirants.

[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://bpsc-tre-mu.vercel.app/)

---

## Overview

**ExamPrep CS** is a purpose-built, full-stack examination portal engineered specifically for candidates preparing for Bihar STET Computer Science Paper II and BPSC School Teacher Recruitment Exams (TRE 1.0, 2.0, 3.0). Standard mock test platforms lack authentic domain questions, realistic anti-cheat mechanisms, and granular syllabus coverage tailored to state computer science teacher requirements.

This platform bridges that gap by providing verified previous year questions (PYQs), scheduled 150-question mock tests under authentic timed examination conditions, strict browser focus-loss anti-cheat detection, instant category-by-category performance analytics, and Google AdSense revenue architecture.

---

## Features

- **Genuine Previous Year Question (PYQ) Bank**: Real official papers from Bihar STET and BPSC TRE 1.0, 2.0, and 3.0 with complete answer explanations.
- **Timed 150-Question Mock Tests**: Scheduled mock tests mirroring the exact examination blueprint with countdown timers.
- **Strict Anti-Cheat Focus Loss Enforcement**: Listens to browser visibility and window focus changes. Issues escalating warnings (up to 5) and auto-terminates the exam attempt on the 6th violation.
- **Granular Subject Breakdown**: Questions categorized across Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, Digital Logic, OOP in C++, and Web Development.
- **Instant Result & Performance Telemetry**: Post-exam scoring matrix displaying accuracy percentage, time spent per question, negative marking penalties, and percentile ranking.
- **Live Leaderboard**: Real-time rank calculation comparing candidates across active test series.
- **Monetization Architecture**: Integrated Google AdSense layout units engineered for high CTR while preserving distraction-free test-taking environments.

---

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router) & React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Lucide Icons
- **HTTP Client**: Axios with interceptors
- **Excel/Data Parsing**: XLSX

### Backend
- **Framework**: Node.js & Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT & HTTP-only secure cookies with RBAC
- **Security**: Helmet, CORS, and Zod runtime schema validation
- **PDF Processing**: PDF-Parse for exam syllabus extraction

### Infrastructure & Deployment
- **Client**: Deployed on Vercel
- **Backend API**: Node.js microservice deployed on Render / cloud VPS
- **Database**: MongoDB Atlas Cluster

---

## Architecture

```text
┌─────────────────────────────────┐
│     Next.js 14 App Router       │
│  (Landing, STET Hub, TRE Hub)   │
└─────────────────────────────────┘
                 │
                 ├── Timed Test Engine & Anti-Cheat Focus Monitor
                 ▼
┌─────────────────────────────────┐
│    Express + TypeScript API     │
│   (Auth, Test Runner, Scoring)  │
└─────────────────────────────────┘
                 │
                 ├── Zod Validation & RBAC Middleware
                 ▼
┌─────────────────────────────────┐
│       MongoDB / Mongoose        │
│ (Questions, Attempts, Users)    │
└─────────────────────────────────┘
```

---

## Demo

- **Live Production URL**: [https://bpsc-tre-mu.vercel.app/](https://bpsc-tre-mu.vercel.app/)

---

## Installation

### Prerequisites
- Node.js 18+
- MongoDB instance (local or MongoDB Atlas connection URI)

### 1. Clone the repository
```bash
git clone https://github.com/hritikkumarpd/bpsc-tre-exam-platform.git
cd bpsc-tre-exam-platform
```

### 2. Install Monorepo Dependencies
```bash
npm run install:all
```

### 3. Setup Environment Variables
Configure `.env.local` in `frontend` and `.env` in `backend` (see sample below).

### 4. Run Development Servers
```bash
# Terminal 1: Run Next.js Frontend
npm run dev:frontend

# Terminal 2: Run Express API Server
npm run dev:backend
```

---

## Environment Variables

### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ADSENSE_PUB_ID=ca-pub-your_publisher_id
```

### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bpsc_stet_examprep
JWT_SECRET=your_secure_jwt_secret_key_minimum_32_characters
CLIENT_URL=http://localhost:3000
COOKIE_SECRET=your_cookie_signing_secret
```

---

## License

This project is licensed under the [MIT License](LICENSE) — see the LICENSE file for details.
