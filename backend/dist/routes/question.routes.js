"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const question_controller_1 = require("../controllers/question.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public / Authenticated read routes
router.get('/', question_controller_1.getQuestions);
router.get('/:id', question_controller_1.getQuestionById);
// Protected Admin / Content Editor routes
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.requirePermission)('QUESTION_CREATE'), question_controller_1.createQuestion);
router.post('/bulk-import', auth_middleware_1.authenticate, (0, auth_middleware_1.requirePermission)('QUESTION_CREATE'), question_controller_1.bulkImportQuestions);
router.put('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requirePermission)('QUESTION_EDIT'), question_controller_1.updateQuestion);
router.patch('/:id/verify', auth_middleware_1.authenticate, (0, auth_middleware_1.requirePermission)('QUESTION_VERIFY'), question_controller_1.verifyQuestion);
router.delete('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.requirePermission)('QUESTION_DELETE'), question_controller_1.deleteQuestion);
exports.default = router;
