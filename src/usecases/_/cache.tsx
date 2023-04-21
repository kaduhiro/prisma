import { useMemo } from 'react';

import { _RequestType } from '@/constants';
import { useMutate } from '@/hooks';
import { ListQuery, ReadQuery, CreateQuery, UpdateQuery, DeleteQuery, UpsertQuery } from '@/types';

export const useCacheKeyGenerator = (key: string) => {
  const cache = createCacheKeyGenerator(key);

  return useMemo(() => cache, [cache]);
};

const createCacheKeyGenerator = (key: string) => ({
  generateReadKey(query?: ListQuery | ReadQuery) {
    return [key, _RequestType.read, query];
  },
  generateCreateKey: (query?: CreateQuery) => {
    return [key, _RequestType.create, query];
  },
  generateUpsertKey: (query?: UpsertQuery) => {
    return [key, _RequestType.upsert, query];
  },
  generateUpdateKey: (query?: UpdateQuery) => {
    return [key, _RequestType.update, query];
  },
  generateDeleteKey: (query?: DeleteQuery) => {
    return [key, _RequestType.delete, query];
  },
});

export const useCacheMutator = (key: string) => {
  const { mutate } = useMutate();
  const cache = createCacheKeyGenerator(key);

  return useMemo(
    () => ({
      mutateList: () => mutate(cache.generateReadKey({})),
    }),
    [mutate]
  );
};
