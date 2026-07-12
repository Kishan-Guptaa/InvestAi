import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the root of backend
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  googleApiKey: process.env.GOOGLE_API_KEY || '',
  nodeEnv: process.env.NODE_ENV || 'development',
};

// Log warning if API key is missing
if (!config.googleApiKey) {
  console.warn('⚠️  [WARNING] GOOGLE_API_KEY is not defined in your environment/dotenv files. AI reports will fail until this key is provided.');
}
