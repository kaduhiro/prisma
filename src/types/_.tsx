// repository
export type RequestListData = {
  limit: number;
};

export type ResponseListData<T> = {
  data: T[];
  count: number;
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

export type RequestUpdateData = Partial<{
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
  limit?: number;
};

export type ListResponse<T> = {
  data: T[];
  count: number;
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

export type UpdateQuery = Partial<{
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
