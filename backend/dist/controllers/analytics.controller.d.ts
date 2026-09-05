import { Request, Response } from 'express';
export declare const getDashboardAnalytics: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getBookmarks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addBookmark: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMistakes: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
