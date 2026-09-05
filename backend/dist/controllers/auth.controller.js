"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.logout = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const user_model_1 = require("../models/user.model");
const env_1 = require("../config/env");
const permissions_1 = require("../auth/permissions");
const signupSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
    targetExam: zod_1.z.enum(['STET_CSE', 'BPSC_TRE_CSE', 'BOTH']).optional(),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: env_1.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
};
const signup = async (req, res) => {
    try {
        const parseResult = signupSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                error: { code: 'INVALID_INPUT', details: parseResult.error.flatten() },
            });
        }
        const { name, email, password, targetExam } = parseResult.data;
        const existingUser = await user_model_1.UserModel.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'An account with this email address already exists.',
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        const user = await user_model_1.UserModel.create({
            name,
            email: email.toLowerCase(),
            passwordHash,
            role: 'STUDENT',
            targetExam: targetExam || 'BOTH',
        });
        const tokenPayload = {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            permissions: permissions_1.ROLE_PERMISSIONS[user.role],
        };
        const token = jsonwebtoken_1.default.sign(tokenPayload, env_1.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('auth_token', token, COOKIE_OPTIONS);
        return res.status(201).json({
            success: true,
            message: 'Account created successfully.',
            data: {
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    targetExam: user.targetExam,
                    permissions: permissions_1.ROLE_PERMISSIONS[user.role],
                },
            },
        });
    }
    catch (err) {
        console.error('[SIGNUP ERROR]:', err);
        return res.status(500).json({ success: false, message: 'Failed to complete registration.' });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const parseResult = loginSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials provided.',
            });
        }
        const { email, password } = parseResult.data;
        const user = await user_model_1.UserModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }
        if (user.status === 'SUSPENDED') {
            return res.status(403).json({ success: false, message: 'Your account has been suspended.' });
        }
        user.lastLoginAt = new Date();
        await user.save();
        const tokenPayload = {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            permissions: permissions_1.ROLE_PERMISSIONS[user.role],
        };
        const token = jsonwebtoken_1.default.sign(tokenPayload, env_1.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('auth_token', token, COOKIE_OPTIONS);
        return res.status(200).json({
            success: true,
            message: 'Logged in successfully.',
            data: {
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    targetExam: user.targetExam,
                    permissions: permissions_1.ROLE_PERMISSIONS[user.role],
                },
            },
        });
    }
    catch (err) {
        console.error('[LOGIN ERROR]:', err);
        return res.status(500).json({ success: false, message: 'Failed to process login.' });
    }
};
exports.login = login;
const logout = (_req, res) => {
    res.clearCookie('auth_token', { path: '/' });
    return res.status(200).json({ success: true, message: 'Logged out successfully.' });
};
exports.logout = logout;
const getMe = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authenticated.' });
    }
    const user = await user_model_1.UserModel.findById(req.user.id).select('-passwordHash');
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }
    return res.status(200).json({
        success: true,
        data: {
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                targetExam: user.targetExam,
                permissions: permissions_1.ROLE_PERMISSIONS[user.role],
                createdAt: user.createdAt,
            },
        },
    });
};
exports.getMe = getMe;
