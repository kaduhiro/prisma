import useSWR from 'swr';

import { usePostRepository } from '@/repositories/post';
import {
  postCacheKeyGenerator,
  PostCreateQuery,
  PostCreateResponse,
  PostDeleteQuery,
  PostDeleteResponse,
  PostReadResponse,
} from '@/usecases/post';
import { PostReadQuery } from '@/usecases/post';

export const useReadPost = (query: PostReadQuery) => {
  const repository = usePostRepository();

  return useSWR<PostReadResponse>(postCacheKeyGenerator.generateReadKey(query), () =>
    repository.list(query?.limit ? { limit: query.limit } : undefined)
  );
};

export const useCreatePost = (query: PostCreateQuery) => {
  const repository = usePostRepository();

  return useSWR<PostCreateResponse | null>(
    postCacheKeyGenerator.generateCreateKey(query),
    () => repository.post({ text: query.text }),
    {
      revalidateOnFocus: false,
    }
  );
};

export const useDeletePost = (query: PostDeleteQuery) => {
  const repository = usePostRepository();

  return useSWR<PostDeleteResponse | null>(
    postCacheKeyGenerator.generateDeleteKey(query),
    () => repository.delete({ id: query.id }),
    {
      revalidateOnFocus: false,
    }
  );
};
