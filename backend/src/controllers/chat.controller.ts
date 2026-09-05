import { Request, Response } from 'express';
import { ChatMessageModel } from '../models/chat-message.model';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { channel = 'GENERAL', limit = '50' } = req.query;
    const limitNum = parseInt(limit as string, 10) || 50;

    const messages = await ChatMessageModel.find({ channel })
      .sort({ createdAt: -1 })
      .limit(limitNum);

    // Return in chronological order
    return res.status(200).json({
      success: true,
      data: { messages: messages.reverse() },
    });
  } catch (err) {
    console.error('[GET CHAT ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve chat messages.' });
  }
};

export const postMessage = async (req: Request, res: Response) => {
  try {
    const { message, channel = 'GENERAL', questionRef } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Message content cannot be empty.' });
    }

    const senderName = req.user?.name || req.body.senderName || 'Anonymous Aspirant';
    const senderRole = req.user?.role || 'STUDENT';
    const senderId = req.user?.id;

    const newMsg = await ChatMessageModel.create({
      senderId,
      senderName,
      senderRole,
      message: message.trim(),
      channel,
      questionRef: questionRef ? String(questionRef).trim() : undefined,
    });

    return res.status(201).json({
      success: true,
      message: 'Message posted successfully.',
      data: { message: newMsg },
    });
  } catch (err) {
    console.error('[POST CHAT ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Failed to post message.' });
  }
};
