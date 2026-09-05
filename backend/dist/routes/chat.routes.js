"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("../controllers/chat.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Retrieve recent messages for a channel
router.get('/messages', chat_controller_1.getMessages);
// Post a message (authenticated if cookie/token present, or optional student name)
router.post('/messages', auth_middleware_1.optionalAuthenticate, chat_controller_1.postMessage);
exports.default = router;
