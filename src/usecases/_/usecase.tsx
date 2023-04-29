import useSWR from 'swr';

import { useRepository } from '@/repositories/_';
import {
  ListQuery,
  ReadQuery,
  CreateQuery,
  UpdateQuery,
  DeleteQuery,
  ListResponse,
  ReadResponse,
  UpdateResponse,
  CreateResponse,
  DeleteResponse,
  UpsertQuery,
  UpsertResponse,
} from '@/types';
import { useCacheKeyGenerator } from '@/usecases/_';

export const useList = <T,>(key: string, query?: ListQuery) => {
  const cache = useCacheKeyGenerator(key);
  const repository = useRepository<T>(key);

  return useSWR<ListResponse<T>>(
    cache.generateReadKey(query),
    () => repository.list({ ...query })
  );
};

export const useRead = <T,>(key: string, query?: ReadQuery) => {
  const cache = useCacheKeyGenerator(key);
  const repository = useRepository<T>(key);

  return useSWR<ReadResponse<T> | null>(cache.generateReadKey(query), () => {
    if (!query) {
      return null;
    }

    return repository.get({ id: query.id });
  });
};

export const useCreate = <T,>(key: string, query?: CreateQuery) => {
  const cache = useCacheKeyGenerator(key);
  const repository = useRepository<T>(key);

  return useSWR<CreateResponse<T> | null>(
    cache.generateCreateKey(query),
    () => {
      if (!query) {
        return null;
      }

      return repository.post(query);
    },
    {
      revalidateOnFocus: false,
    }
  );
};

export const useUpsert = <T,>(key: string, query?: UpsertQuery) => {
  const cache = useCacheKeyGenerator(key);
  const repository = useRepository<T>(key);

  return useSWR<UpsertResponse<T> | null>(
    cache.generateUpsertKey(query),
    () => {
      if (!query) {
        return null;
      }

      return repository.put(query);
    },
    {
      revalidateOnFocus: false,
    }
  );
};

export const useUpdate = <T,>(key: string, query?: UpdateQuery) => {
  const cache = useCacheKeyGenerator(key);
  const repository = useRepository<T>(key);

  return useSWR<UpdateResponse<T> | null>(
    cache.generateUpdateKey(query),
    () => {
      if (!query) {
        return null;
      }

      return repository.patch(query);
    },
    {
      revalidateOnFocus: false,
    }
  );
};

export const useDelete = <T,>(key: string, query?: DeleteQuery) => {
  const cache = useCacheKeyGenerator(key);
  const repository = useRepository<T>(key);

  return useSWR<DeleteResponse<T> | null>(
    cache.generateDeleteKey(query),
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
