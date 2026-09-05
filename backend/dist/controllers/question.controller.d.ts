import { Request, Response } from 'express';
export declare const getQuestions: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getQuestionById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createQuestion: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateQuestion: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifyQuestion: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteQuestion: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const bulkImportQuestions: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
