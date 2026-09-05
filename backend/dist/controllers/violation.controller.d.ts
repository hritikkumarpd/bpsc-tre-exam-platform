import { Request, Response } from 'express';
export declare const recordViolation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
