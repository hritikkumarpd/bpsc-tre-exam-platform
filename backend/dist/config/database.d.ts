import mongoose from 'mongoose';
export declare const connectDatabase: () => Promise<typeof mongoose>;
export declare const closeDatabase: () => Promise<void>;
