"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const permissions_1 = require("../auth/permissions");
describe('Authentication & RBAC Suite', () => {
    describe('Password Hashing with bcrypt', () => {
        it('should correctly hash password and verify match', async () => {
            const password = 'SecretPassword123';
            const hash = await bcryptjs_1.default.hash(password, 10);
            expect(hash).not.toEqual(password);
            const isMatch = await bcryptjs_1.default.compare(password, hash);
            expect(isMatch).toBe(true);
            const isWrong = await bcryptjs_1.default.compare('WrongPassword', hash);
            expect(isWrong).toBe(false);
        });
    });
    describe('JWT Token Generation & Decoding', () => {
        it('should generate valid JWT token with user permissions payload', () => {
            const secret = 'test_secret_key_123';
            const payload = {
                id: 'user_123',
                email: 'student@example.com',
                role: 'STUDENT',
                permissions: permissions_1.ROLE_PERMISSIONS['STUDENT'],
            };
            const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '1h' });
            expect(token).toBeDefined();
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            expect(decoded.id).toEqual('user_123');
            expect(decoded.role).toEqual('STUDENT');
            expect(decoded.permissions).toContain('TEST_ATTEMPT');
        });
    });
    describe('Permission-Based RBAC Guards', () => {
        it('should grant student basic test attempt permissions but deny question creation', () => {
            expect((0, permissions_1.hasPermission)('STUDENT', 'TEST_ATTEMPT')).toBe(true);
            expect((0, permissions_1.hasPermission)('STUDENT', 'TEST_VIEW_OWN_RESULTS')).toBe(true);
            expect((0, permissions_1.hasPermission)('STUDENT', 'QUESTION_CREATE')).toBe(false);
            expect((0, permissions_1.hasPermission)('STUDENT', 'USER_MANAGE')).toBe(false);
        });
        it('should grant Content Editor question creation and editing but deny user management', () => {
            expect((0, permissions_1.hasPermission)('CONTENT_EDITOR', 'QUESTION_CREATE')).toBe(true);
            expect((0, permissions_1.hasPermission)('CONTENT_EDITOR', 'QUESTION_EDIT')).toBe(true);
            expect((0, permissions_1.hasPermission)('CONTENT_EDITOR', 'USER_MANAGE')).toBe(false);
        });
        it('should grant Teacher Expert question verification permissions', () => {
            expect((0, permissions_1.hasPermission)('TEACHER_EXPERT', 'QUESTION_VERIFY')).toBe(true);
            expect((0, permissions_1.hasPermission)('TEACHER_EXPERT', 'MOCK_MANAGE')).toBe(true);
        });
        it('should grant Admin and Super Admin comprehensive platform access', () => {
            expect((0, permissions_1.hasPermission)('ADMIN', 'USER_MANAGE')).toBe(true);
            expect((0, permissions_1.hasPermission)('ADMIN', 'ANALYTICS_VIEW_ALL')).toBe(true);
            expect((0, permissions_1.hasPermission)('SUPER_ADMIN', 'SYSTEM_ADMIN_FULL')).toBe(true);
        });
    });
});
