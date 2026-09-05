"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthenticate = exports.requireRole = exports.requirePermission = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const permissions_1 = require("../auth/permissions");
const authenticate = (req, res, next) => {
    let token = req.cookies?.auth_token;
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required. Please log in.',
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        req.user = decoded;
        return next();
    }
    catch (_err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired session token.',
        });
    }
};
exports.authenticate = authenticate;
const requirePermission = (...requiredPermissions) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Authentication required.' });
        }
        const userRole = req.user.role;
        const hasAll = requiredPermissions.every((perm) => (0, permissions_1.hasPermission)(userRole, perm));
        if (!hasAll) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden. Insufficient permissions for this action.',
            });
        }
        return next();
    };
};
exports.requirePermission = requirePermission;
const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Authentication required.' });
        }
        if (!allowedRoles.includes(req.user.role) && req.user.role !== 'SUPER_ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'Forbidden. Your role is not authorized to access this resource.',
            });
        }
        return next();
    };
};
exports.requireRole = requireRole;
const optionalAuthenticate = (req, _res, next) => {
    let token = req.cookies?.auth_token;
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
            req.user = decoded;
        }
        catch (_err) {
            // Ignore token decode error for optional auth
        }
    }
    return next();
};
exports.optionalAuthenticate = optionalAuthenticate;
