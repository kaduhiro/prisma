import {
  ResponseCreatePostData,
  ResponseDeletePostData,
  ResponseReadPostsData,
  ResponseReadPostData,
  ResponseUpdatePostData,
} from '@/generated/post';
import { PostModel } from '@/models/post';
import {
  PostCreateResponse,
  PostDeleteResponse,
  PostsReadResponse,
  PostReadResponse,
  PostUpdateResponse,
} from '@/usecases/post';

export const adaptPostsFromData = (data: ResponseReadPostsData): PostsReadResponse => {
  const posts: PostModel[] = [];

  data.posts.forEach((post) => {
    posts.push({ ...post });
  });

  return {
    posts,
    count: data.count,
  };
};

export const adaptPostFromData = (
  data: ResponseCreatePostData | ResponseDeletePostData | ResponseReadPostData | ResponseUpdatePostData
): PostCreateResponse | PostDeleteResponse | PostReadResponse | PostUpdateResponse => {
  const post: PostModel = { ...data.post };

  return { post };
};
