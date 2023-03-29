import { useState } from 'react';

import { Post } from '@/components/elements';
import { PostModel } from '@/models/post';
import { PostsReadQuery, useReadPosts } from '@/usecases/post';

export const List = () => {
  const [query, setQuery] = useState<PostsReadQuery>({ limit: 10 });
  const { data } = useReadPosts(query);

  const Posts = () => {
    if (!data) {
      const placeholder: PostModel = {
        id: 0,
        body: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return (
        <>
          {[...Array(12)].map((_, i) => {
            return <Post key={i} post={placeholder} />;
          })}
        </>
      );
    }

    return (
      <>
        {data.posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
        <Post />
      </>
    );
  };

  return (
    <div className='relative mx-auto px-4 pb-8 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8'>
      <div className='sm:columns-1 md:columns-2 lg:columns-3 xl:columns-4'>
        <Posts />
      </div>
    </div>
  );
};
