import { useMemo } from 'react';

import pluralize from 'pluralize';

import { _ } from '@/constants';
import ApiClient from '@/libraries/api-client';
import { adapt, adapts } from '@/repositories/_';
import {
  IApiClient,
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
} from '@/types';

export const useRepository = <T,>(key: string) => {
  const client = ApiClient;

  return useMemo(() => createRepository<T>(client, key), [client, key]);
};

const createRepository = <T,>(client: IApiClient, key: string) => ({
  async list(query: RequestListData) {
    if (!query.limit) {
      return {
        data: [],
        count: 0,
      };
    }

    const { data, error } = await client.get<ResponseListData<T>>({ url: `${_.API_ENDPOINT}/${pluralize(key)}` });
    if (!data) {
      throw new Error(error);
    }

    return adapts<T>(data);
  },
  async get(query: RequestReadData) {
    if (!query.id) {
      return null;
    }

    const { data, error } = await client.get<ResponseReadData<T>>({
      url: `${_.API_ENDPOINT}/${pluralize(key)}/:id`,
      query: { id: query.id },
    });
    if (!data) {
      throw new Error(error);
    }

    return adapt<T>(data);
  },
  async post(query: RequestCreateData) {
    if (!Object.keys(query).length) {
      return null;
    }

    const { data, error } = await client.post<ResponseCreateData<T>>({
      url: `${_.API_ENDPOINT}/${pluralize(key)}`,
      body: JSON.parse(JSON.stringify(query)),
    });
    if (!data) {
      throw new Error(error);
    }

    return adapt<T>(data);
  },
  async put(query: RequestUpdateData) {
    if (!query.id) {
      return null;
    }

    const { data, error } = await client.put<ResponseUpdateData<T>>({
      url: `${_.API_ENDPOINT}/${pluralize(key)}/:id`,
      query: { id: query.id as string },
      body: JSON.parse(JSON.stringify(query)),
    });
    if (!data) {
      throw new Error(error);
    }

    return adapt<T>(data);
  },
  async delete(query: RequestDeleteData) {
    if (!query.id) {
      return null;
    }

    const { data, error } = await client.delete<ResponseDeleteData<T>>({
      url: `${_.API_ENDPOINT}/${pluralize(key)}/:id`,
      query: { id: query.id },
    });
    if (!data) {
      throw new Error(error);
    }

    return adapt<T>(data);
  },
});
