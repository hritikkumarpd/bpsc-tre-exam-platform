import { Request, Response } from 'express';
export declare const startAttempt: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAttemptState: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const saveAnswer: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const submitAttempt: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
