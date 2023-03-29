import { PostModel } from '@/models/post';

// read
export type PostsReadQuery = {
  limit?: number;
};

export type PostsReadResponse = {
  posts: PostModel[];
  count: number;
};

export type PostReadQuery = {
  id: number;
};

export type PostReadResponse = {
  post: PostModel;
};

// create
export type PostCreateQuery = {
  body: string;
};

export type PostCreateResponse = {
  post: PostModel;
};

// update
export type PostUpdateQuery = {
  post: PostModel;
};

export type PostUpdateResponse = {
  post: PostModel;
};

// delete
export type PostDeleteQuery = {
  id: number;
};

export type PostDeleteResponse = {
  post: PostModel;
};
