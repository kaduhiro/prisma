import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { ApiQueryArgs, ApiResponse, ApiClientInterface, ApiError } from '@/types';

const headers = {
  Accept: 'application/json, */*',
};

const request = async <T,>(args: ApiQueryArgs): Promise<ApiResponse<T>> => {
  const { method = 'GET', url, query, body, options } = args;

  let apiUrl: URL;

  try {
    if (!url) {
      throw new Error('Empty URL.');
    }

    try {
      apiUrl = new URL(url);
    } catch (error) {
      let baseUrl: string;

      if (typeof window === 'undefined') {
        baseUrl = process.env.API_ENDPOINT ? process.env.API_ENDPOINT : 'http://127.0.0.1';
      } else {
        baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT ? process.env.NEXT_PUBLIC_API_ENDPOINT : location.origin;
      }

      apiUrl = new URL(url, baseUrl);
    }
  } catch (error) {
    throw error;
  }

  Object.keys({ ...query }).map((key) => {
    let values = { ...query }[key];
    if (values === undefined) {
      return;
    }

    if (!Array.isArray(values)) {
      values = [String(values)];
    }

    values?.forEach((value) => apiUrl.searchParams.append(key, value));
  });

  const paths = apiUrl.pathname.split('/').map((path) => {
    if (!path) {
      return '';
    }

    const match = path.match(/^:(.*?)$/);
    if (match) {
      if (!query) {
        return null;
      }

      if (match[1] in query) {
        const value = query[match[1]];
        if (typeof value === 'string' && !value) {
          return null;
        }

        apiUrl.searchParams.delete(match[1]);

        return value;
      }

      return null;
    }

    return path;
  });

  if (
    paths.length !==
    paths.filter((v) => {
      return v !== null;
    }).length
  ) {
    throw new Error('Not match query.');
  }

  apiUrl.pathname = paths.join('/');

  try {
    const res = await fetch(apiUrl, { headers, method: method, body: JSON.stringify(body), ...options });
    if (!res.ok) {
      return { status: res.status, error: await res.json() };
    }

    return {
      status: res.status,
      data: await res.json(),
    };
  } catch (error) {
    let message: string = ReasonPhrases.INTERNAL_SERVER_ERROR;

    if (error instanceof TypeError) {
      message = String(error.cause);
    } else if (error instanceof Error) {
      message = error.message;
    }

    return Promise.reject({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: { message },
    });
  }
};

const requestGet = <T,>(args: ApiQueryArgs): Promise<ApiResponse<T>> => {
  return request<T>({ ...args, method: 'GET' });
};

const requestPost = <T,>(args: ApiQueryArgs): Promise<ApiResponse<T>> => {
  return request<T>({ ...args, method: 'POST' });
};

const requestPut = <T,>(args: ApiQueryArgs): Promise<ApiResponse<T>> => {
  return request<T>({ ...args, method: 'PUT' });
};

const requestPatch = <T,>(args: ApiQueryArgs): Promise<ApiResponse<T>> => {
  return request<T>({ ...args, method: 'PATCH' });
};

const requestDelete = <T,>(args: ApiQueryArgs): Promise<ApiResponse<T>> => {
  return request<T>({ ...args, method: 'DELETE' });
};

export const createError = (error?: string | ApiError) => {
  let message = 'error';

  if (typeof error === 'undefined') {
    message = 'undefined error';
  } else if (typeof error === 'string') {
    message = error;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return new Error(message);
};

const ApiClient: ApiClientInterface = {
  get: requestGet,
  post: requestPost,
  put: requestPut,
  patch: requestPatch,
  delete: requestDelete,
};

export default ApiClient;
