import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

/**
 * Global Express Error Handling Middleware.
 * Standardizes API error responses and maps Gemini/LangChain errors to clear user-facing messages.
 */
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('[Error Handler Log]:', err);

  const status = err.status || 500;
  let code = err.code || 'INTERNAL_SERVER_ERROR';
  let message = err.message || 'An unexpected error occurred during company analysis.';

  // Map Gemini specific errors (like Invalid API Key, safety blocks, or network issues)
  const errString = String(err.stack || err.message || '');
  
  if (errString.includes('API key not valid') || errString.includes('key is invalid') || errString.includes('API_KEY_INVALID')) {
    code = 'INVALID_API_KEY';
    message = 'The provided Google Gemini API Key is invalid. Please verify your credentials and try again.';
  } else if (errString.includes('RESOURCE_EXHAUSTED') || errString.includes('rate limit')) {
    code = 'RATE_LIMIT_EXCEEDED';
    message = 'Gemini API rate limit has been exceeded. Please check your quotas or wait a minute before retrying.';
  } else if (errString.includes('Safety') || errString.includes('blocked by safety')) {
    code = 'SAFETY_POLICY_VIOLATION';
    message = 'The query was blocked by Gemini safety filters. Please try another company name.';
  } else if (errString.includes('ENOTFOUND') || errString.includes('ECONNREFUSED') || errString.includes('fetch failed')) {
    code = 'NETWORK_FAILURE';
    message = 'Failed to establish a network connection to Google Gemini API servers. Please check your network and try again.';
  }

  res.status(status === 200 ? 500 : status).json({
    status: 'error',
    code,
    message,
    ...(config.nodeEnv === 'development' && { details: err.stack || err })
  });
}
