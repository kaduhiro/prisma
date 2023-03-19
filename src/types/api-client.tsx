type ApiQueryMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type ApiQueryParams = Partial<{
  [key: string]: number | string | string[];
}>;

export type ApiQueryData = Partial<{
  [key: string]: number | string | string[];
}>;

export type ApiQueryOptions = Partial<{
  [key: string]: number | string | string[];
}>;

export type ApiQueryArgs = {
  method?: ApiQueryMethod;
  url: string;
  query?: ApiQueryParams;
  body?: ApiQueryData;
  options?: ApiQueryOptions;
};

export interface IApiClient {
  get: <T>(args: ApiQueryArgs) => Promise<T>;
  post: <T>(args: ApiQueryArgs) => Promise<T>;
  put: <T>(args: ApiQueryArgs) => Promise<T>;
  delete: <T>(args: ApiQueryArgs) => Promise<T>;
}
