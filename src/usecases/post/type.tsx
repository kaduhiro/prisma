import { PostModel } from '@/models/post';

// read
export type PostReadQuery = {
  limit?: number;
};

export type PostReadResponse = {
  posts: PostModel[];
  count: number;
};

// create
export type PostCreateQuery = {
  body: string;
};

export type PostCreateResponse = {
  post: PostModel;
};

// delete
export type PostDeleteQuery = {
  id: number;
};

export type PostDeleteResponse = {
  post: PostModel;
};
