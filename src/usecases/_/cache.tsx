import { useMemo } from 'react';

import { CACHE_REQUEST_TYPE } from '@/constants';
import { useMutate } from '@/hooks';
import { ListQuery, ReadQuery, CreateQuery, UpdateQuery, DeleteQuery, UpsertQuery } from '@/types';

export const useCacheKeyGenerator = (key: string) => {
  const cache = createCacheKeyGenerator(key);

  return useMemo(() => cache, [cache]);
};

const createCacheKeyGenerator = (key: string) => ({
  generateReadKey(query?: ListQuery | ReadQuery) {
    return [key, CACHE_REQUEST_TYPE.read, query];
  },
  generateCreateKey: (query?: CreateQuery) => {
    return [key, CACHE_REQUEST_TYPE.create, query];
  },
  generateUpsertKey: (query?: UpsertQuery) => {
    return [key, CACHE_REQUEST_TYPE.upsert, query];
  },
  generateUpdateKey: (query?: UpdateQuery) => {
    return [key, CACHE_REQUEST_TYPE.update, query];
  },
  generateDeleteKey: (query?: DeleteQuery) => {
    return [key, CACHE_REQUEST_TYPE.delete, query];
  },
});

export const useCacheMutator = (key: string) => {
  const { mutate } = useMutate();
  const cache = createCacheKeyGenerator(key);

  return useMemo(
    () => ({
      mutateList: () => mutate(cache.generateReadKey()),
    }),
    [mutate]
  );
};
