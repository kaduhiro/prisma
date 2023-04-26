import { useMemo } from 'react';

import pluralize from 'pluralize';

import { _ } from '@/constants';
import ApiClient from '@/libraries/api-client';
import { adapt, adapts } from '@/repositories/_';
import {
  ApiClientInterface,
  RequestListData,
  RequestReadData,
  RequestCreateData,
  RequestUpdateData,
  RequestDeleteData,
  ResponseListData,
  ResponseReadData,
  ResponseCreateData,
  ResponseUpdateData,
  ResponseDeleteData,
  RequestUpsertData,
  ResponseUpsertData,
} from '@/types';

export const useRepository = <T,>(key: string) => {
  const client = ApiClient;

  return useMemo(() => createRepository<T>(client, key), [client, key]);
};

const createRepository = <T,>(client: ApiClientInterface, key: string) => ({
  async list(req: RequestListData) {
    const { order, page, ...query } = req;

    if (!query.limit && !page) {
      return {
        data: [],
        count: 0,
      };
    }
    const { data, error } = await client.get<ResponseListData<T>>({
      url: `${_.API_ENDPOINT}/${pluralize(key)}`,
      query: {
        order: order !== undefined ? JSON.stringify(order) : undefined,
        ...page,
        ...query,
      },
    });
    if (!data) {
      throw new Error(error);
    }

    return adapts<T>(data);
  },
  async get(req: RequestReadData) {
    if (!req.id) {
      return null;
    }

    const { data, error } = await client.get<ResponseReadData<T>>({
      url: `${_.API_ENDPOINT}/${pluralize(key)}/:id`,
      query: { id: req.id },
    });
    if (!data) {
      throw new Error(error);
    }

    return adapt<T>(data);
  },
  async post(req: RequestCreateData) {
    if (!Object.keys(req).length) {
      return null;
    }

    const { data, error } = await client.post<ResponseCreateData<T>>({
      url: `${_.API_ENDPOINT}/${pluralize(key)}`,
      body: JSON.parse(JSON.stringify(req)),
    });
    if (!data) {
      throw new Error(error);
    }

    return adapt<T>(data);
  },
  async put(req: RequestUpsertData) {
    if (!req.id) {
      return null;
    }

    const { data, error } = await client.put<ResponseUpsertData<T>>({
      url: `${_.API_ENDPOINT}/${pluralize(key)}/:id`,
      query: { id: req.id },
      body: JSON.parse(JSON.stringify(req)),
    });
    if (!data) {
      throw new Error(error);
    }

    return adapt<T>(data);
  },
  async patch(req: RequestUpdateData) {
    if (!req.id) {
      return null;
    }

    const { data, error } = await client.patch<ResponseUpdateData<T>>({
      url: `${_.API_ENDPOINT}/${pluralize(key)}/:id`,
      query: { id: req.id },
      body: JSON.parse(JSON.stringify(req)),
    });
    if (!data) {
      throw new Error(error);
    }

    return adapt<T>(data);
  },
  async delete(req: RequestDeleteData) {
    if (!req.id) {
      return null;
    }

    const { data, error } = await client.delete<ResponseDeleteData<T>>({
      url: `${_.API_ENDPOINT}/${pluralize(key)}/:id`,
      query: { id: req.id },
    });
    if (!data) {
      throw new Error(error);
    }

    return adapt<T>(data);
  },
});
