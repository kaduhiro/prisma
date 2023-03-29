import useSWR from 'swr';

import { usePostRepository } from '@/repositories/post';
import {
  postCacheKeyGenerator,
  PostCreateQuery,
  PostCreateResponse,
  PostDeleteQuery,
  PostDeleteResponse,
  PostReadQuery,
  PostReadResponse,
  PostUpdateQuery,
  PostUpdateResponse,
  PostsReadQuery,
  PostsReadResponse,
} from '@/usecases/post';

export const useReadPosts = (query?: PostsReadQuery) => {
  const repository = usePostRepository();

  return useSWR<PostsReadResponse>(postCacheKeyGenerator.generateReadKey(query), () =>
    repository.list({ limit: query?.limit ? query.limit : 0 })
  );
};

export const useReadPost = (query?: PostReadQuery) => {
  const repository = usePostRepository();

  return useSWR<PostReadResponse | null>(postCacheKeyGenerator.generateReadKey(query), () => {
    if (!query) {
      return null;
    }

    return repository.get({ id: query.id });
  });
};

export const useCreatePost = (query?: PostCreateQuery) => {
  const repository = usePostRepository();

  return useSWR<PostCreateResponse | null>(
    postCacheKeyGenerator.generateCreateKey(query),
    () => {
      if (!query) {
        return null;
      }

      return repository.post({ ...query });
    },
    {
      revalidateOnFocus: false,
    }
  );
};

export const useUpdatePost = (query?: PostUpdateQuery) => {
  const repository = usePostRepository();

  return useSWR<PostUpdateResponse | null>(
    postCacheKeyGenerator.generateUpdateKey(query),
    () => {
      if (!query) {
        return null;
      }

      return repository.put({ post: { ...query.post } });
    },
    {
      revalidateOnFocus: false,
    }
  );
};

export const useDeletePost = (query?: PostDeleteQuery) => {
  const repository = usePostRepository();

  return useSWR<PostDeleteResponse | null>(
    postCacheKeyGenerator.generateDeleteKey(query),
    () => {
      if (!query) {
        return null;
      }

      return repository.delete({ id: query.id });
    },
    {
      revalidateOnFocus: false,
    }
  );
};
