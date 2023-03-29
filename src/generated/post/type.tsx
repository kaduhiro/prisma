import { Post } from '@prisma/client';

// read
export type RequestReadPostsData = {
  limit: number;
};

export type ResponseReadPostsData = {
  posts: Post[];
  count: number;
};

export type RequestReadPostData = {
  id: number;
};

export type ResponseReadPostData = {
  post: Post;
};

// create
export type RequestCreatePostData = {
  body: string;
};

export type ResponseCreatePostData = {
  post: Post;
};

// update
export type RequestUpdatePostData = {
  post: Post;
};

export type ResponseUpdatePostData = {
  post: Post;
};

// delete
export type RequestDeletePostData = {
  id: number;
};

export type ResponseDeletePostData = {
  post: Post;
};
