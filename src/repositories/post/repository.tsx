import { useMemo } from 'react';

import {
  RequestCreatePostData,
  RequestDeletePostData,
  RequestReadPostData,
  RequestReadPostsData,
  RequestUpdatePostData,
  ResponseCreatePostData,
  ResponseDeletePostData,
  ResponseUpdatePostData,
  ResponseReadPostData,
  ResponseReadPostsData,
} from '@/generated/post';
import ApiClient from '@/libraries/api-client';
import { adaptPostFromData, adaptPostsFromData } from '@/repositories/post';
import { IApiClient } from '@/types';

export const usePostRepository = () => {
  const client = ApiClient;

  return useMemo(() => readPostRepository(client), [client]);
};

const readPostRepository = (client: IApiClient) => ({
  async list(query: RequestReadPostsData) {
    if (!query.limit) {
      return {
        posts: [],
        count: 0,
      };
    }

    const { data, error } = await client.get<ResponseReadPostsData>({ url: '/api/post' });
    if (!data) {
      throw new Error(error);
    }

    return adaptPostsFromData(data);
  },
  async get(query: RequestReadPostData) {
    if (!query.id) {
      return null;
    }

    const { data, error } = await client.get<ResponseReadPostData>({ url: '/api/post/:id', query: { id: query.id } });
    if (!data) {
      throw new Error(error);
    }

    return adaptPostFromData(data);
  },
  async post(query: RequestCreatePostData) {
    if (!Object.keys(query).length) {
      return null;
    }

    const { data, error } = await client.post<ResponseCreatePostData>({ url: '/api/post', body: { ...query } });
    if (!data) {
      throw new Error(error);
    }

    return adaptPostFromData(data);
  },
  async put(query: RequestUpdatePostData) {
    if (!query.post.id) {
      return null;
    }

    const { data, error } = await client.put<ResponseUpdatePostData>({
      url: '/api/post/:id',
      query: { id: query.post.id },
      body: JSON.parse(JSON.stringify(query.post)),
    });
    if (!data) {
      throw new Error(error);
    }

    return adaptPostFromData(data);
  },
  async delete(query: RequestDeletePostData) {
    if (!query.id) {
      return null;
    }

    const { data, error } = await client.delete<ResponseDeletePostData>({
      url: '/api/post/:id',
      query: { id: query.id },
    });
    if (!data) {
      throw new Error(error);
    }

    return adaptPostFromData(data);
  },
});
