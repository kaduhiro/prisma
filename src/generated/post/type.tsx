import { Post } from '@prisma/client';

// read
export type RequestPostsData = {
  limit: number;
};

export type ResponsePostsData = {
  posts: Post[];
  count: number;
};

// create
export type RequestCreatePostData = {
  body: string;
};

export type ResponseCreatePostData = {
  post: Post;
};

// delete
export type RequestDeletePostData = {
  id: number;
};

export type ResponseDeletePostData = {
  post: Post;
};
