"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_PERMISSIONS = void 0;
exports.hasPermission = hasPermission;
exports.ROLE_PERMISSIONS = {
    STUDENT: [
        'TEST_ATTEMPT',
        'TEST_VIEW_OWN_RESULTS',
        'PROFILE_MANAGE',
        'BOOKMARK_MANAGE',
    ],
    CONTENT_EDITOR: [
        'TEST_ATTEMPT',
        'TEST_VIEW_OWN_RESULTS',
        'PROFILE_MANAGE',
        'QUESTION_CREATE',
        'QUESTION_EDIT',
        'QUESTION_VIEW_ALL',
        'PYQ_MANAGE',
    ],
    TEACHER_EXPERT: [
        'TEST_ATTEMPT',
        'TEST_VIEW_OWN_RESULTS',
        'PROFILE_MANAGE',
        'QUESTION_CREATE',
        'QUESTION_EDIT',
        'QUESTION_VERIFY',
        'QUESTION_VIEW_ALL',
        'MOCK_MANAGE',
        'PYQ_MANAGE',
    ],
    SUPPORT: [
        'TEST_ATTEMPT',
        'TEST_VIEW_OWN_RESULTS',
        'PROFILE_MANAGE',
        'SUPPORT_ACCESS',
        'VIOLATIONS_MONITOR',
    ],
    ADMIN: [
        'TEST_ATTEMPT',
        'TEST_VIEW_OWN_RESULTS',
        'PROFILE_MANAGE',
        'BOOKMARK_MANAGE',
        'QUESTION_CREATE',
        'QUESTION_EDIT',
        'QUESTION_DELETE',
        'QUESTION_VERIFY',
        'QUESTION_VIEW_ALL',
        'MOCK_MANAGE',
        'PYQ_MANAGE',
        'USER_MANAGE',
        'SUPPORT_ACCESS',
        'ANALYTICS_VIEW_ALL',
        'VIOLATIONS_MONITOR',
    ],
    SUPER_ADMIN: [
        'TEST_ATTEMPT',
        'TEST_VIEW_OWN_RESULTS',
        'PROFILE_MANAGE',
        'BOOKMARK_MANAGE',
        'QUESTION_CREATE',
        'QUESTION_EDIT',
        'QUESTION_DELETE',
        'QUESTION_VERIFY',
        'QUESTION_VIEW_ALL',
        'MOCK_MANAGE',
        'PYQ_MANAGE',
        'USER_MANAGE',
        'SUPPORT_ACCESS',
        'ANALYTICS_VIEW_ALL',
        'VIOLATIONS_MONITOR',
        'SYSTEM_ADMIN_FULL',
    ],
};
function hasPermission(userRole, permission) {
    const permissions = exports.ROLE_PERMISSIONS[userRole] || [];
    return permissions.includes(permission) || permissions.includes('SYSTEM_ADMIN_FULL');
}
