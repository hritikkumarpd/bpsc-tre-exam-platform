import { UserRole } from '../types';
export type Permission = 'TEST_ATTEMPT' | 'TEST_VIEW_OWN_RESULTS' | 'PROFILE_MANAGE' | 'BOOKMARK_MANAGE' | 'QUESTION_CREATE' | 'QUESTION_EDIT' | 'QUESTION_DELETE' | 'QUESTION_VERIFY' | 'QUESTION_VIEW_ALL' | 'MOCK_MANAGE' | 'PYQ_MANAGE' | 'USER_MANAGE' | 'SUPPORT_ACCESS' | 'ANALYTICS_VIEW_ALL' | 'VIOLATIONS_MONITOR' | 'SYSTEM_ADMIN_FULL';
export declare const ROLE_PERMISSIONS: Record<UserRole, Permission[]>;
export declare function hasPermission(userRole: UserRole, permission: Permission): boolean;
