import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { env } from './config/env';
import authRoutes from './routes/auth.routes';
import questionRoutes from './routes/question.routes';
import pyqRoutes from './routes/pyq.routes';
import attemptRoutes from './routes/attempt.routes';
import violationRoutes from './routes/violation.routes';
import analyticsRoutes from './routes/analytics.routes';
import adminRoutes from './routes/admin.routes';
import chatRoutes from './routes/chat.routes';

const app = express();

// Security and middleware
app.use(helmet());
const allowedOrigins = [
  env.CLIENT_URL,
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser(env.COOKIE_SECRET));

// Health check endpoint
app.get('/api/v1/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    version: '1.0.0',
    platform: 'STET CSE & BPSC TRE CSE Exam Platform',
  });
});

// Mount domain routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/questions', questionRoutes);
app.use('/api/v1/pyqs', pyqRoutes);
app.use('/api/v1/attempts', attemptRoutes);
app.use('/api/v1/violations', violationRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/chat', chatRoutes);

// Root API welcome
app.get('/api/v1', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'STET CSE & BPSC TRE CSE Exam Prep API v1',
    endpoints: [
      '/api/v1/auth',
      '/api/v1/questions',
      '/api/v1/pyqs',
      '/api/v1/attempts',
      '/api/v1/violations',
      '/api/v1/analytics',
      '/api/v1/admin',
      '/api/v1/health',
    ],
  });
});

// Centralized error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[SERVER ERROR]:', err.stack || err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: env.NODE_ENV === 'development' ? { message: err.message, stack: err.stack } : undefined,
  });
});

import { connectDatabase } from './config/database';

// Start listening if not imported into tests
if (require.main === module) {
  connectDatabase().then(() => {
    app.listen(env.PORT, () => {
      console.log(`🚀 ExamPrep Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    });
  });
}

export default app;
