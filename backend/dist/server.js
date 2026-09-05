"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const env_1 = require("./config/env");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const question_routes_1 = __importDefault(require("./routes/question.routes"));
const pyq_routes_1 = __importDefault(require("./routes/pyq.routes"));
const attempt_routes_1 = __importDefault(require("./routes/attempt.routes"));
const violation_routes_1 = __importDefault(require("./routes/violation.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const app = (0, express_1.default)();
// Security and middleware
app.use((0, helmet_1.default)());
const allowedOrigins = [
    env_1.env.CLIENT_URL,
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or server-to-server)
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(null, true); // Allow origin in dev mode for flexibility
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use((0, cookie_parser_1.default)(env_1.env.COOKIE_SECRET));
// Health check endpoint
app.get('/api/v1/health', (_req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: env_1.env.NODE_ENV,
        version: '1.0.0',
        platform: 'STET CSE & BPSC TRE CSE Exam Platform',
    });
});
// Mount domain routes
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/questions', question_routes_1.default);
app.use('/api/v1/pyqs', pyq_routes_1.default);
app.use('/api/v1/attempts', attempt_routes_1.default);
app.use('/api/v1/violations', violation_routes_1.default);
app.use('/api/v1/analytics', analytics_routes_1.default);
app.use('/api/v1/admin', admin_routes_1.default);
app.use('/api/v1/chat', chat_routes_1.default);
// Root API welcome
app.get('/api/v1', (_req, res) => {
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
app.use((err, _req, res, _next) => {
    console.error('[SERVER ERROR]:', err.stack || err.message);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: env_1.env.NODE_ENV === 'development' ? { message: err.message, stack: err.stack } : undefined,
    });
});
const database_1 = require("./config/database");
// Start listening if not imported into tests
if (require.main === module) {
    (0, database_1.connectDatabase)().then(() => {
        app.listen(env_1.env.PORT, () => {
            console.log(`🚀 ExamPrep Server running on port ${env_1.env.PORT} in ${env_1.env.NODE_ENV} mode`);
        });
    });
}
exports.default = app;
