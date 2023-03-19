import { useSWRConfig } from 'swr';
import { Arguments, MutatorOptions, serialize } from 'swr/_internal';

export const useMutate = () => {
  const { cache, mutate } = useSWRConfig();

  const clearMutate = (key: Arguments, data?: any, opts?: boolean | MutatorOptions<any> | undefined) => {
    const serialized = serialize(key);
    Array.from<string>(cache.keys()).forEach((value) => {
      if (value.replace(/,$/, '').indexOf(serialized[0].replace(/,$/, '')) === 0) {
        mutate(value, data, opts);
      }
    });
  };

  return {
    mutate: clearMutate,
  };
};
