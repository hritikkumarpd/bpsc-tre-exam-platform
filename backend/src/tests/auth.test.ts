import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { hasPermission, ROLE_PERMISSIONS } from '../auth/permissions';
import { UserRole } from '../types';

describe('Authentication & RBAC Suite', () => {
  describe('Password Hashing with bcrypt', () => {
    it('should correctly hash password and verify match', async () => {
      const password = 'SecretPassword123';
      const hash = await bcrypt.hash(password, 10);
      
      expect(hash).not.toEqual(password);
      const isMatch = await bcrypt.compare(password, hash);
      expect(isMatch).toBe(true);

      const isWrong = await bcrypt.compare('WrongPassword', hash);
      expect(isWrong).toBe(false);
    });
  });

  describe('JWT Token Generation & Decoding', () => {
    it('should generate valid JWT token with user permissions payload', () => {
      const secret = 'test_secret_key_123';
      const payload = {
        id: 'user_123',
        email: 'student@example.com',
        role: 'STUDENT' as UserRole,
        permissions: ROLE_PERMISSIONS['STUDENT'],
      };

      const token = jwt.sign(payload, secret, { expiresIn: '1h' });
      expect(token).toBeDefined();

      const decoded = jwt.verify(token, secret) as typeof payload;
      expect(decoded.id).toEqual('user_123');
      expect(decoded.role).toEqual('STUDENT');
      expect(decoded.permissions).toContain('TEST_ATTEMPT');
    });
  });

  describe('Permission-Based RBAC Guards', () => {
    it('should grant student basic test attempt permissions but deny question creation', () => {
      expect(hasPermission('STUDENT', 'TEST_ATTEMPT')).toBe(true);
      expect(hasPermission('STUDENT', 'TEST_VIEW_OWN_RESULTS')).toBe(true);
      expect(hasPermission('STUDENT', 'QUESTION_CREATE')).toBe(false);
      expect(hasPermission('STUDENT', 'USER_MANAGE')).toBe(false);
    });

    it('should grant Content Editor question creation and editing but deny user management', () => {
      expect(hasPermission('CONTENT_EDITOR', 'QUESTION_CREATE')).toBe(true);
      expect(hasPermission('CONTENT_EDITOR', 'QUESTION_EDIT')).toBe(true);
      expect(hasPermission('CONTENT_EDITOR', 'USER_MANAGE')).toBe(false);
    });

    it('should grant Teacher Expert question verification permissions', () => {
      expect(hasPermission('TEACHER_EXPERT', 'QUESTION_VERIFY')).toBe(true);
      expect(hasPermission('TEACHER_EXPERT', 'MOCK_MANAGE')).toBe(true);
    });

    it('should grant Admin and Super Admin comprehensive platform access', () => {
      expect(hasPermission('ADMIN', 'USER_MANAGE')).toBe(true);
      expect(hasPermission('ADMIN', 'ANALYTICS_VIEW_ALL')).toBe(true);
      expect(hasPermission('SUPER_ADMIN', 'SYSTEM_ADMIN_FULL')).toBe(true);
    });
  });
});
