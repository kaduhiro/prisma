import { _IncludeTypeObject } from '@/types';

type _ = {
  KEY: Partial<{ [key: string]: string }>;
  API_ENDPOINT: string;
  INCLUDE: _IncludeTypeObject;
  PER_PAGE: number;
};

export const _: _ = {
  KEY: {
    post: 'post',
  },
  API_ENDPOINT: '/api/v1/_',
  INCLUDE: {
    post: {},
  },
  PER_PAGE: 10,
} as const;
