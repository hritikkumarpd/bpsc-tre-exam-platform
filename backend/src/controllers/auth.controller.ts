import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { UserModel } from '../models/user.model';
import { env } from '../config/env';
import { ROLE_PERMISSIONS } from '../auth/permissions';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  targetExam: z.enum(['STET_CSE', 'BPSC_TRE_CSE', 'BOTH']).optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
};

export const signup = async (req: Request, res: Response) => {
  try {
    const parseResult = signupSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: { code: 'INVALID_INPUT', details: parseResult.error.flatten() },
      });
    }

    const { name, email, password, targetExam } = parseResult.data;
    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists.',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: 'STUDENT',
      targetExam: targetExam || 'BOTH',
    });

    const tokenPayload = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: ROLE_PERMISSIONS[user.role],
    };

    const token = jwt.sign(tokenPayload, env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('auth_token', token, COOKIE_OPTIONS);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          targetExam: user.targetExam,
          permissions: ROLE_PERMISSIONS[user.role],
        },
      },
    });
  } catch (err) {
    console.error('[SIGNUP ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Failed to complete registration.' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials provided.',
      });
    }

    const { email, password } = parseResult.data;
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (user.status === 'SUSPENDED') {
      return res.status(403).json({ success: false, message: 'Your account has been suspended.' });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const tokenPayload = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: ROLE_PERMISSIONS[user.role],
    };

    const token = jwt.sign(tokenPayload, env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('auth_token', token, COOKIE_OPTIONS);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      data: {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          targetExam: user.targetExam,
          permissions: ROLE_PERMISSIONS[user.role],
        },
      },
    });
  } catch (err) {
    console.error('[LOGIN ERROR]:', err);
    return res.status(500).json({ success: false, message: 'Failed to process login.' });
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie('auth_token', { path: '/' });
  return res.status(200).json({ success: true, message: 'Logged out successfully.' });
};

export const getMe = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  }

  const user = await UserModel.findById(req.user.id).select('-passwordHash');
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  return res.status(200).json({
    success: true,
    data: {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        targetExam: user.targetExam,
        permissions: ROLE_PERMISSIONS[user.role],
        createdAt: user.createdAt,
      },
    },
  });
};
