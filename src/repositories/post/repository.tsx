import { useMemo } from 'react';

import {
  RequestCreatePostData,
  RequestDeletePostData,
  RequestPostsData,
  ResponseCreatePostData,
  ResponseDeletePostData,
  ResponsePostsData,
} from '@/generated/post/type';
import ApiClient from '@/libraries/api-client';
import { adaptPostFromData, adaptPostsFromData } from '@/repositories/post';
import { IApiClient } from '@/types';

export const usePostRepository = () => {
  const client = ApiClient;

  return useMemo(() => readPostRepository(client), [client]);
};

const readPostRepository = (client: IApiClient) => ({
  async list(query: RequestPostsData) {
    if (!query.limit) {
      return {
        posts: [],
        count: 0,
      };
    }

    const data = await client.get<ResponsePostsData>({ url: '/api/post' });

    return adaptPostsFromData(data);
  },
  async post(query: RequestCreatePostData) {
    if (!query.text) {
      return null;
    }

    const data = await client.post<ResponseCreatePostData>({ url: '/api/post', body: query });

    return adaptPostFromData(data);
  },
  async delete(query: RequestDeletePostData) {
    if (!query.id) {
      return null;
    }

    const data = await client.delete<ResponseDeletePostData>({ url: '/api/post/:id', query: { id: query.id } });

    return adaptPostFromData(data);
  },
});
