import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../types';
import { Permission } from '../auth/permissions';
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
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const requirePermission: (...requiredPermissions: Permission[]) => (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const requireRole: (...allowedRoles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const optionalAuthenticate: (req: Request, _res: Response, next: NextFunction) => void;
