import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/bpsc_stet_examprep',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_jwt_secret_dev_only',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'fallback_cookie_secret',
};
