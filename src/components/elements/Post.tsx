import { useEffect, useRef, useState } from 'react';

import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PostModel } from '@/models/post';
import {
  PostCreateQuery,
  PostUpdateQuery,
  useCreatePost,
  useDeletePost,
  usePostCacheMutator,
  useUpdatePost,
} from '@/usecases/post';

type Props = {
  post?: PostModel;
};

export const Post = ({ post }: Props) => {
  const { mutateList } = usePostCacheMutator();

  const postRef = useRef<HTMLTextAreaElement>(null);

  const [createQuery, setCreateQuery] = useState<PostCreateQuery>();
  const createResponse = useCreatePost(createQuery);
  useEffect(() => {
    if (createResponse.data) {
      mutateList();
    }
  }, [createResponse.data]);

  const [updateQuery, setUpdateQuery] = useState<PostUpdateQuery>();
  const updateResponse = useUpdatePost(updateQuery);
  useEffect(() => {
    if (updateResponse.data) {
      mutateList();
    }
  }, [updateResponse.data]);

  const [edit, setEdit] = useState<PostModel | null>();
  useEffect(() => {
    if (postRef.current) {
      if (edit === null) {
        postRef.current.value = '';
      }
      if (edit) {
        postRef.current.value = edit.body;
      }
      postRef.current.focus();
    }
  }, [edit]);

  const onEdit = (post?: PostModel) => {
    setEdit(post ? post : null);
  };

  const onSave = () => {
    if (postRef.current?.value) {
      if (edit === null) {
        setCreateQuery({ body: postRef.current.value });
      }
      if (edit && edit.body != postRef.current.value) {
        edit.body = postRef.current.value;
        setUpdateQuery({ post: edit });
      }
    }

    setEdit(undefined);
  };

  const [deleteId, setDeleteId] = useState<number>(0);
  const deleteResponse = useDeletePost({ id: deleteId });
  useEffect(() => {
    if (deleteResponse.data) {
      mutateList();
    }
  }, [deleteResponse.data]);

  const onDelete = (id: number) => {
    setDeleteId(id);
  };

  const postClass =
    'rounded bg-white/10 text-center shadow-2xl transition duration-300 hover:scale-105 hover:shadow-2xl md:shadow-xl hover:scale-105 hover:cursor-pointer hover:text-white hover:shadow-2xl';

  const Textarea = () => (
    <textarea
      rows={6}
      className='w-full overflow-hidden rounded bg-transparent px-10 py-20 outline-none'
      ref={postRef}
      onBlur={onSave}
    />
  );

  if (!post) {
    return (
      <div className={`flex items-center justify-center ${postClass}`}>
        {edit !== null && (
          <p
            className='flex w-full items-center justify-center gap-2 py-20 font-semibold capitalize duration-300 hover:opacity-60'
            onClick={() => onEdit()}
          >
            <FontAwesomeIcon icon={faPenToSquare} className='w-4' />
            new
          </p>
        )}
        {edit === null && <Textarea />}
      </div>
    );
  }

  if (!post.id) {
    return (
      <div className={`group mb-4 break-inside-avoid px-10 py-20 ${postClass}`}>
        <div className='h-4 w-full animate-pulse bg-gray-500'></div>
      </div>
    );
  }

  return (
    <div className={`group mb-4 break-inside-avoid ${postClass}`}>
      {edit?.id !== post.id && (
        <>
          <p className='break-all px-10 py-20 text-left font-semibold text-gray-200' onClick={() => onEdit(post)}>
            {post.body}
          </p>
          <FontAwesomeIcon
            icon={faTrash}
            className='absolute right-4 bottom-4 hidden w-4 transition duration-200 hover:cursor-pointer hover:opacity-50 group-hover:block'
            onClick={() => onDelete(post.id)}
          />
        </>
      )}
      {edit?.id === post.id && <Textarea />}
    </div>
  );
};
