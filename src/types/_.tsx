// types
export type _Constant = {
  cacheKey: { [key: string]: string };
};

export type _IncludeType = boolean | _IncludeTypeObject;

export type _IncludeTypeObject = {
  [key: string]: _IncludeType;
};

// api
export type RequestPagination = {
  page: number;
  perPage?: number;
};

export type RequestWhere = Partial<{
  [key: string]: boolean | number | string | Date | RequestWhere;
}>;

export type RequestOrder = Partial<{
  [key: string]: boolean | 'asc' | 'desc';
}>;

export type ResponsePagination = {
  prev?: number;
  next?: number;
  count: number;
};

export type PrismaFindManyArgs = {
  where?: RequestWhere;
  take?: number;
  skip?: number;
  orderBy?: RequestOrder;
  pagination?: RequestPagination;
};

// repository
export type RequestListData = {
  where?: RequestWhere;
  limit?: number;
  offset?: number;
  order?: RequestOrder;
  page?: RequestPagination;
};

export type ResponseListData<T> = {
  data: T[];
  count: number;
  page?: ResponsePagination;
};

export type RequestReadData = {
  id: number | string;
};

export type ResponseReadData<T> = {
  data: T;
};

export type RequestCreateData = Partial<{
  [key: string]: boolean | number | string | Date;
}>;

export type ResponseCreateData<T> = {
  data: T;
};

export type RequestUpsertData = Partial<{
  id: number | string;
  [key: string]: boolean | number | string | Date;
}>;

export type ResponseUpsertData<T> = {
  data: T;
};

export type RequestUpdateData = Partial<{
  id: number | string;
  [key: string]: boolean | number | string | Date;
}>;

export type ResponseUpdateData<T> = {
  data: T;
};

export type RequestDeleteData = {
  id: number | string;
};

export type ResponseDeleteData<T> = {
  data: T;
};

// usecase
export type ListQuery = {
  where?: RequestWhere;
  limit?: number;
  offset?: number;
  order?: RequestOrder;
  page?: RequestPagination;
};

export type ListResponse<T> = {
  data: T[];
  count: number;
  page?: ResponsePagination;
};

export type ReadQuery = {
  id: number | string;
};

export type ReadResponse<T> = {
  data: T;
};

export type CreateQuery = Partial<{
  [key: string]: boolean | number | string | Date;
}>;

export type CreateResponse<T> = {
  data: T;
};

export type UpsertQuery = Partial<{
  id: number | string;
  [key: string]: boolean | number | string | Date;
}>;

export type UpsertResponse<T> = {
  data: T;
};

export type UpdateQuery = Partial<{
  id: number | string;
  [key: string]: boolean | number | string | Date;
}>;

export type UpdateResponse<T> = {
  data: T;
};

export type DeleteQuery = {
  id: number | string;
};

export type DeleteResponse<T> = {
  data: T;
};
