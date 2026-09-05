"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const connectDatabase = async () => {
    try {
        mongoose_1.default.set('strictQuery', true);
        const conn = await mongoose_1.default.connect(env_1.env.MONGODB_URI, {
            autoIndex: true,
        });
        console.log(`🍃 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
        return conn;
    }
    catch (error) {
        console.error(`❌ Mongoose connection error: ${error.message}`);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
const closeDatabase = async () => {
    await mongoose_1.default.connection.close();
    console.log('🍃 Mongoose connection closed');
};
exports.closeDatabase = closeDatabase;
