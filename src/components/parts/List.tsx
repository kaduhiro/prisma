import { useState } from 'react';

import { Post } from '@/components/elements';
import { _ } from '@/constants';
import { PostModel } from '@/models/post';
import { ListQuery } from '@/types';
import { useList } from '@/usecases/_';

export const List = () => {
  const [current, setCurrent] = useState<number>(1);
  const [query, setQuery] = useState<ListQuery>({ page: { page: 1, perPage: 5 } });
  const { data } = useList<PostModel>(_.KEY.post, query);

  const onPage = (page: number) => {
    if (page !== current) {
      setCurrent(page);
      setQuery({ ...query, page: { ...query.page, page } });
    }
  };
  const Posts = () => {
    if (!data?.data) {
      const placeholder: PostModel = {
        id: 0,
        body: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return (
        <>
          {[...Array(query.page?.perPage)].map((_, i) => {
            return <Post key={i} post={placeholder} />;
          })}
        </>
      );
    }

    return (
      <>
        {data.data.map((post) => {
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
      <div className='mt-10 flex justify-center gap-2'>
        {[...Array(data?.page?.count)].map((_, index) => {
          const page = index + 1;

          return (
            <button
              className='rounded-full px-4 hover:bg-white/50 disabled:bg-white/50'
              key={index}
              onClick={() => onPage(page)}
              disabled={page === current}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
};
