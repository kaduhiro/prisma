import { useSWRConfig } from 'swr';
import { Arguments, MutatorOptions, serialize } from 'swr/_internal';

export const useMutate = () => {
  const { cache, mutate } = useSWRConfig();

  const clearMutate = (key: Arguments, data?: any, opts?: boolean | MutatorOptions<any> | undefined) => {
    if (Array.isArray(key)) {
      key = key.filter((v) => v);
    }

    const serialized = serialize(key);

    const keys = Array.from<string>(cache.keys()).filter((key) => key.startsWith(serialized[0]));

    keys.map((key) => {
      mutate(key, undefined, true);
    });
  };

  return {
    mutate: clearMutate,
  };
};
