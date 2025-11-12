import type { FieldErrors } from "react-hook-form";
import { type ErrorResponse } from "react-router";
import { isRouteErrorResponse } from "react-router";
import type { z } from "zod";

export const constructErrorResponse = (error: Error | ErrorResponse) => {
  if (isRouteErrorResponse(error)) {
    return new Error(error.statusText);
  } else if (error instanceof Error) {
    return error;
  }
  return new Error("Unknown error");
};

export const constructErrorResponseFromZod = <T>(error: z.SafeParseError<T>) =>
  error.error.issues.map((x) =>
    JSON.stringify({
      [x.path.join(".")]: x.message,
    }),
  );

export const constructErrorFromRHF = (errors: FieldErrors) => {
  const extractErrors = (
    obj: any,
    path: string[] = [],
  ): Array<{ path: string; message: string }> => {
    const results: Array<{ path: string; message: string }> = [];

    for (const [key, value] of Object.entries(obj)) {
      const currentPath = [...path, key];

      if (value && typeof value === "object") {
        if ("message" in value && value.message) {
          results.push({
            path: currentPath.join("."),
            message: value.message as string,
          });
        } else {
          results.push(...extractErrors(value, currentPath));
        }
      }
    }

    return results;
  };

  return extractErrors(errors).map((error) =>
    JSON.stringify({
      [error.path]: error.message,
    }),
  );
};
