import { useMemo } from 'react';

import { _Post, _RequestType } from '@/constants';
import { useMutate } from '@/hooks';
import { PostCreateQuery, PostDeleteQuery, PostReadQuery } from '@/usecases/post';

export const postCacheKeyGenerator = {
  generateReadKey: (query?: PostReadQuery) => {
    return [_Post.cacheKey.post, _RequestType.read, query];
  },
  generateCreateKey: (query?: PostCreateQuery) => {
    return [_Post.cacheKey.post, _RequestType.create, query];
  },
  generateDeleteKey: (query?: PostDeleteQuery) => {
    return [_Post.cacheKey.post, _RequestType.delete, query];
  },
};

export const usePostCacheMutator = () => {
  const { mutate } = useMutate();

  return useMemo(
    () => ({
      mutateList: () => mutate(postCacheKeyGenerator.generateReadKey({})),
    }),
    [mutate]
  );
};
