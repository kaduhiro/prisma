import { ApiErrorResponse, ApiQueryArgs, ApiResponse, IApiClient } from '@/types';

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

  const res = await fetch(apiUrl, { headers, method: method, body: JSON.stringify(body), ...options });
  if (!res.ok) {
    const error: ApiErrorResponse = await res.json();

    return Promise.reject({ status: res.status, error: error.message });
  }

  return {
    status: res.status,
    data: await res.json(),
  };
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

const ApiClient: IApiClient = {
  get: requestGet,
  post: requestPost,
  put: requestPut,
  patch: requestPatch,
  delete: requestDelete,
};

export default ApiClient;
