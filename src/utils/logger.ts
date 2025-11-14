import type { ErrorResponse } from 'react-router';
import { constructErrorResponse } from './error';

interface Logger {
  info: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  error: (
    message: string,
    error: Error | ErrorResponse,
    ...args: any[]
  ) => void;
  debug: (message: string, ...args: any[]) => void;
}
const createBrowserLogger = (): Logger => {
  if (import.meta.env.VITE_DISABLE_DEV_LOGS === 'true') {
    return {
      info: () => {},
      warn: () => {},
      error: () => {},
      debug: () => {}
    };
  }
  const timestamp = () => new Date().toLocaleTimeString();

  return {
    info: (message: string, ...args: any) => {
      console.debug(
        `[${timestamp()}] ✅ %c${message}%c`,
        'color: green;',
        '',
        ...args
      );
    },
    warn: (message: string, ...args: any[]) => {
      console.debug(`[${timestamp()}] WARN:`, message, ...args);
    },
    error: (message: string, error: Error | ErrorResponse, ...args: any[]) => {
      const normalizedError = constructErrorResponse(error);
      console.debug(
        `[${timestamp()}] %cERROR:%c`,
        'color: red; font-weight: bold;',
        '',
        message,
        normalizedError.message,
        ...args
      );
    },
    debug: (message: string, ...args: any[]) => {
      console.debug(
        `[${timestamp()}] %cDEBUG:%c`,
        'color: orange;',
        '',
        message,
        ...args
      );
    }
  };
};

export const logger = createBrowserLogger();
