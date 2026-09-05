import { Request, Response } from 'express';
export declare const getMessages: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const postMessage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
