import { Router } from 'express';
import { getMessages, postMessage } from '../controllers/chat.controller';
import { optionalAuthenticate } from '../middleware/auth.middleware';

const router = Router();

// Retrieve recent messages for a channel
router.get('/messages', getMessages);

// Post a message (authenticated if cookie/token present, or optional student name)
router.post('/messages', optionalAuthenticate, postMessage);

export default router;
