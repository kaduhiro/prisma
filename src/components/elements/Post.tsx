import { useEffect, useRef, useState } from 'react';

import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PostModel } from '@/models/post';
import { PostCreateQuery, useCreatePost, useDeletePost, usePostCacheMutator } from '@/usecases/post';

type Props = {
  post?: PostModel;
};

export const Post = ({ post }: Props) => {
  const { mutateList } = usePostCacheMutator();

  const postRef = useRef<HTMLTextAreaElement>(null);

  const [createQuery, setCreateQuery] = useState<PostCreateQuery>({ text: '' });
  const createResponse = useCreatePost(createQuery);
  useEffect(() => {
    if (createResponse.data) {
      mutateList();
    }
  }, [createResponse.data]);

  const [editId, setEditId] = useState<number>();
  useEffect(() => {
    if (editId !== undefined && postRef.current) {
      postRef.current.value = '';
      postRef.current.focus();
    }
  }, [editId]);

  const onEdit = (id: number) => {
    setEditId(id);
  };

  const onSave = () => {
    if (postRef.current?.value) {
      setCreateQuery({ text: postRef.current.value });
    }
    setEditId(undefined);
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

  if (!post) {
    return (
      <div className={`flex items-center justify-center ${postClass}`} onClick={() => onEdit(0)}>
        {editId !== 0 && (
          <p className='flex w-full items-center justify-center gap-2 py-20 font-semibold capitalize duration-300 hover:opacity-60'>
            <FontAwesomeIcon icon={faPenToSquare} className='w-4' />
            new
          </p>
        )}
        {editId === 0 && (
          <textarea rows={6} className='w-full rounded bg-transparent p-4 outline-none' ref={postRef} onBlur={onSave} />
        )}
      </div>
    );
  }

  if (!post.id) {
    return (
      <div className={`group mb-4 break-inside-avoid px-10 py-20 ${postClass}`}>
        <div className='h-4 w-full bg-gray-600'></div>
      </div>
    );
  }

  return (
    <div className={`group mb-4 break-inside-avoid px-10 py-20 ${postClass}`}>
      <p className='break-all text-left font-semibold text-gray-200'>{post.text}</p>
      <FontAwesomeIcon
        icon={faTrash}
        className='absolute right-4 bottom-4 hidden w-4 transition duration-200 hover:cursor-pointer hover:opacity-50 group-hover:block'
        onClick={() => onDelete(post.id)}
      />
    </div>
  );
};
