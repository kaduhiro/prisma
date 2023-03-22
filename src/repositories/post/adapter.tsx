import { Post } from '@prisma/client';

import { ResponseCreatePostData, ResponseDeletePostData, ResponsePostsData } from '@/generated/post/type';
import { PostModel } from '@/models/post';
import { PostCreateResponse, PostDeleteResponse, PostReadResponse } from '@/usecases/post';

export const adaptPostsFromData = (data: ResponsePostsData): PostReadResponse => {
  const posts: PostModel[] = [];

  data.posts.forEach((post: Post) => {
    posts.push({
      id: post.id,
      text: post.body,
      createdAt: post.createdAt ?? new Date(0),
      updatedAt: post.updatedAt ?? new Date(0),
    });
  });

  return {
    posts,
    count: data.count,
  };
};

export const adaptPostFromData = (
  data: ResponseCreatePostData | ResponseDeletePostData
): PostCreateResponse | PostDeleteResponse => {
  const post: PostModel = {
    id: data.post.id,
    text: data.post.body,
    createdAt: data.post.createdAt ?? new Date(0),
    updatedAt: data.post.updatedAt ?? new Date(0),
  };

  return { post };
};
