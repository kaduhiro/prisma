import {
  ResponseCreateData,
  ResponseDeleteData,
  ResponseListData,
  ResponseReadData,
  ResponseUpdateData,
  CreateResponse,
  DeleteResponse,
  ListResponse,
  ReadResponse,
  UpdateResponse,
} from '@/types/_';

export const adapts = <T,>(res: ResponseListData<T>): ListResponse<T> => {
  const result: T[] = [];

  res.data.forEach((d) => {
    result.push({ ...d });
  });

  return {
    data: result,
    count: res.count,
  };
};

export const adapt = <T,>(
  res: ResponseCreateData<T> | ResponseDeleteData<T> | ResponseReadData<T> | ResponseUpdateData<T>
): CreateResponse<T> | DeleteResponse<T> | ReadResponse<T> | UpdateResponse<T> => {
  const data: T = { ...res.data };

  return { data };
};
