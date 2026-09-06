# ExamPrep CS — Production STET & BPSC TRE Computer Science Exam Platform

A production-grade, highly specialized web platform built for **Bihar STET Computer Science Paper II** and **BPSC TRE Computer Science (1.0, 2.0 & 3.0)** aspirants.

Features genuine previous year question papers (PYQs), scheduled 150-question mock tests, strict anti-cheat focus loss enforcement, instant performance analytics, and Google AdSense monetization architecture.

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Axios.
- **Backend**: Node.js, Express.js, TypeScript, Mongoose, MongoDB, JWT, Helmet, CORS.
- **Database**: MongoDB + Mongoose Schema Architecture.
- **Authentication**: HTTP-only Secure Cookies + Permission-based RBAC.

---

## Project Folder Architecture

```text
BPSC TRE/
├── package.json              # Monorepo root script orchestration
├── README.md                 # Complete technical documentation
├── backend/                  # Node.js + Express + TypeScript API server
│   ├── package.json
│   ├── tsconfig.json
│   ├── .eslintrc.json
│   ├── .env.example
│   └── src/
│       ├── config/           # Environment and DB configuration
│       ├── types/            # Core backend TypeScript definitions
│       └── server.ts         # Express application entry point
└── frontend/                 # Next.js 14 App Router client application
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── postcss.config.js
    ├── next.config.mjs
    ├── .env.example
    └── src/
        ├── app/              # App Router Public Pages & Layouts
        │   ├── layout.tsx    # Root layout with navbar & footer
        │   ├── page.tsx      # Home Landing Page
        │   ├── stet-cse/     # STET Hub, PYQs & Mock Series
        │   ├── bpsc-tre/     # BPSC TRE Hub, PYQs & Mock Series
        │   ├── leaderboard/  # Live Aspirant Rank Leaderboard
        │   ├── about/        # Platform & Content Rules
        │   ├── contact/      # Aspirant Support Form
        │   └── faq/          # Searchable FAQ Page
        ├── components/
        │   ├── ui/           # Reusable UI component library (Button, Card, Badge, Modal, Alert, Accordion, AdSense)
        │   └── layout/       # Navbar, Footer, MobileNav, PageHeader
        ├── lib/              # API Client & Utility functions
        └── types/            # Shared frontend TypeScript interfaces
```

---

## Development Setup

### 1. Install Dependencies
```bash
# Install both frontend and backend packages
npm run install:all
```

### 2. Environment Variables Setup
Copy `.env.example` to `.env` in both `frontend` and `backend`:

**Frontend (`frontend/.env.local`)**:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ADSENSE_PUB_ID=ca-pub-0000000000000000
```

**Backend (`backend/.env`)**:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bpsc_stet_examprep
JWT_SECRET=super_secret_jwt_key_32chars
CLIENT_URL=http://localhost:3000
COOKIE_SECRET=cookie_secret_key
```

### 3. Run Development Servers
```bash
# Terminal 1: Frontend
npm run dev:frontend

# Terminal 2: Backend API
npm run dev:backend
```

---

## Verification & Quality Assurance

```bash
# Run linting across both frontend and backend
npm run lint

# Run strict TypeScript type checking
npm run typecheck

# Build both frontend and backend for production
npm run build
```

---

## Core Business & Content Rules

1. **Genuine PYQ Transparency**: Genuine previous year papers are transcribed directly from official BSEB/BPSC question papers. They are clearly identified.
2. **Zero Fabricated PYQs**: AI-generated questions are never labeled as PYQs.
3. **Duplicate Prevention**: Automated exact, normalized, and semantic similarity detection prevents duplicate questions across mock papers.
4. **Authoritative Anti-Cheat Monitoring**: Active browser focus loss loss API monitoring detects tab switching with up to 5 warnings before auto-cancelling the attempt on the 6th violation.
5. **Scheduled Content Release**: Future mock tests remain locked with countdown timers until their explicit `releaseAt` date.
