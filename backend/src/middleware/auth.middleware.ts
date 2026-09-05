import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { UserRole } from '../types';
import { Permission, hasPermission } from '../auth/permissions';

export interface AuthUserPayload {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies?.auth_token;

  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in.',
    });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthUserPayload;
    req.user = decoded;
    return next();
  } catch (_err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session token.',
    });
  }
};

export const requirePermission = (...requiredPermissions: Permission[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const userRole = req.user.role;
    const hasAll = requiredPermissions.every((perm) => hasPermission(userRole, perm));

    if (!hasAll) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. Insufficient permissions for this action.',
      });
    }

    return next();
  };
};

export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    if (!allowedRoles.includes(req.user.role) && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. Your role is not authorized to access this resource.',
      });
    }

    return next();
  };
};

export const optionalAuthenticate = (req: Request, _res: Response, next: NextFunction) => {
  let token = req.cookies?.auth_token;
  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as AuthUserPayload;
      req.user = decoded;
    } catch (_err) {
      // Ignore token decode error for optional auth
    }
  }
  return next();
};
