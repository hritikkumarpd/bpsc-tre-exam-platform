import { Request, Response } from 'express';
import { AttemptModel } from '../models/attempt.model';
import { AdminLogModel } from '../models/admin-log.model';

export const recordViolation = async (req: Request, res: Response) => {
  try {
    const { attemptId } = req.params;
    const { event = 'FOCUS_LOSS_BLUR' } = req.body;
    const userId = req.user?.id;

    const attempt = await AttemptModel.findById(attemptId);
    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Attempt not found.' });
    }

    if (attempt.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized violation report.' });
    }

    if (attempt.status === 'CANCELLED') {
      return res.status(200).json({
        success: true,
        cancelled: true,
        count: attempt.focusViolations,
        message: 'Attempt is already cancelled.',
      });
    }

    if (attempt.status === 'COMPLETED') {
      return res.status(400).json({
        success: false,
        message: 'Cannot record violation for a completed test.',
      });
    }

    attempt.focusViolations += 1;
    const currentCount = attempt.focusViolations;

    attempt.violationHistory.push({
      timestamp: new Date(),
      event,
      count: currentCount,
    });

    if (currentCount >= 6) {
      attempt.status = 'CANCELLED';
      attempt.cancellationReason =
        'Attempt automatically cancelled by backend authority due to 6 browser focus loss violations.';
      await attempt.save();

      // Create Admin Log notification
      await AdminLogModel.create({
        adminId: attempt.userId,
        action: 'TEST_ATTEMPT_CANCELLED_ANTI_CHEAT',
        targetEntity: 'Attempt',
        targetId: attempt._id.toString(),
        ipAddress: req.ip,
        details: {
          violationCount: currentCount,
          lastEvent: event,
          cancellationReason: attempt.cancellationReason,
        },
      });

      return res.status(200).json({
        success: true,
        cancelled: true,
        count: currentCount,
        message: 'Attempt automatically cancelled due to 6 focus loss violations.',
        redirectUrl: `/exam/${attempt._id.toString()}/cancelled`,
      });
    }

    await attempt.save();

    return res.status(200).json({
      success: true,
      cancelled: false,
      count: currentCount,
      maxAllowed: 5,
      message: `Focus loss warning ${currentCount}/5 recorded. Please remain on the active exam tab.`,
    });
  } catch (err) {
    console.error('[VIOLATION RECORD ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Failed to record focus violation.' });
  }
};
