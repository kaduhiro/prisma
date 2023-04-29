import { StatusCodes } from 'http-status-codes';

type ApiQueryMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiQueryParams = Partial<{
  [key: string]: boolean | number | string | string[] | undefined;
}>;

export type ApiQueryData = Partial<{
  [key: string]: boolean | number | string | string[];
}>;

export type ApiQueryOptions = Partial<{
  [key: string]: boolean | number | string | string[];
}>;

export type ApiQueryArgs = {
  method?: ApiQueryMethod;
  url: string;
  query?: ApiQueryParams;
  body?: ApiQueryData;
  options?: ApiQueryOptions;
};

export type ApiResponse<T> = {
  status: StatusCodes;
  data?: T;
  error?: ApiError | string;
};

export type ApiError = {
  message: string;
};

export interface ApiClientInterface {
  get: <T>(args: ApiQueryArgs) => Promise<ApiResponse<T>>;
  post: <T>(args: ApiQueryArgs) => Promise<ApiResponse<T>>;
  put: <T>(args: ApiQueryArgs) => Promise<ApiResponse<T>>;
  patch: <T>(args: ApiQueryArgs) => Promise<ApiResponse<T>>;
  delete: <T>(args: ApiQueryArgs) => Promise<ApiResponse<T>>;
}
