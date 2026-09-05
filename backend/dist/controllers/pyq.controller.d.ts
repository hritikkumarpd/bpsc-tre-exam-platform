import { Request, Response } from 'express';
export declare const getPYQPapers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPYQPaperById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createPYQPaper: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addQuestionToPYQ: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const parsePDFQuestionPaper: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const uploadAndParsePDFFile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const importPYQPaper: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
