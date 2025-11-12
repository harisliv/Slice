import type { ErrorResponse } from "react-router";
import { constructErrorResponse } from "./error";

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
  if (import.meta.env.VITE_DISABLE_DEV_LOGS === "true") {
    return {
      info: () => {},
      warn: () => {},
      error: () => {},
      debug: () => {},
    };
  }
  const timestamp = () => new Date().toLocaleTimeString();

  return {
    info: (message: string, ...args: any) => {
      console.debug(
        `[${timestamp()}] ✅ %c${message}%c`,
        "color: green;",
        "",
        ...args,
      );
    },
    warn: (message: string, ...args: any[]) => {
      console.debug(`[${timestamp()}] WARN:`, message, ...args);
    },
    error: (message: string, error: Error | ErrorResponse, ...args: any[]) => {
      const normalizedError = constructErrorResponse(error);
      console.debug(
        `[${timestamp()}] %cERROR:%c`,
        "color: red; font-weight: bold;",
        "",
        message,
        normalizedError.message,
        ...args,
      );
    },
    debug: (message: string, ...args: any[]) => {
      console.debug(
        `[${timestamp()}] %cDEBUG:%c`,
        "color: orange;",
        "",
        message,
        ...args,
      );
    },
  };
};

export const logger = createBrowserLogger();

export const printEnvVars = () => {
  logger.info(
    import.meta.env.VITE_MSAL_SCOPES_MIS,
    "import.meta.env.VITE_MSAL_SCOPES_MIS",
  );
  logger.info(
    import.meta.env.VITE_DISABLE_DEV_LOGS,
    "import.meta.env.VITE_ENABLE_DEV_LOGS",
  );
  logger.info(
    import.meta.env.VITE_MSAL_AUTHORITY,
    "import.meta.env.VITE_MSAL_AUTHORITY",
  );
  logger.info(
    import.meta.env.VITE_MSAL_CLIENT_ID,
    "import.meta.env.VITE_MSAL_CLIENT_ID",
  );
  logger.info(
    import.meta.env.VITE_MSAL_REDIRECT_URI,
    "import.meta.env.VITE_MSAL_REDIRECT_URI",
  );
  logger.info(
    import.meta.env.VITE_MSAL_KNOWN_AUTHORITIES,
    "import.meta.env.VITE_MSAL_KNOWN_AUTHORITIES",
  );
  logger.info(import.meta.env.VITE_API_URL, "import.meta.env.VITE_API_URL");
  logger.info(
    import.meta.env.VITE_MSAL_SCOPES_MIS,
    "import.meta.env.VITE_MSAL_SCOPES_MIS",
  );
  logger.info(
    import.meta.env.VITE_REMOVE_CONSOLE_LOGS,
    "import.meta.env.VITE_REMOVE_CONSOLE_LOGS",
  );
  logger.info(import.meta.env.VITE_USE_MOCKS, "import.meta.env.VITE_USE_MOCKS");
};
