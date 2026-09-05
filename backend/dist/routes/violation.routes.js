"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const violation_controller_1 = require("../controllers/violation.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.post('/:attemptId', violation_controller_1.recordViolation);
exports.default = router;
