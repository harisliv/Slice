import { isRouteErrorResponse, useRouteError } from 'react-router';
import type { TErrorResponse } from '@app/lib/types';
import axios from 'axios';

export default function useCustomRouteError() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return error;
  } else if (axios.isAxiosError(error)) {
    const errorResponse: TErrorResponse = {
      status: error.response?.status ?? 666,
      statusText: 'Server error',
      data: error
    };
    return errorResponse;
  } else if (error instanceof Error) {
    const errorResponse: TErrorResponse = {
      status: 404,
      statusText: 'Unknown error',
      data: error
    };
    return errorResponse;
  }
  return {
    status: 666,
    statusText: 'Unknown error',
    data: error
  };
}
