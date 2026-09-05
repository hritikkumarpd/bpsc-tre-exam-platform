"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
exports.env = {
    PORT: parseInt(process.env.PORT || '5000', 10),
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/bpsc_stet_examprep',
    JWT_SECRET: process.env.JWT_SECRET || 'fallback_jwt_secret_dev_only',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
    COOKIE_SECRET: process.env.COOKIE_SECRET || 'fallback_cookie_secret',
};
