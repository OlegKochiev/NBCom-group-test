import React, {FormEvent, useState} from 'react';
import Image from 'next/image';
import Comment from '../Comment';
import {IComment, IPost} from '@/types/types';

import useLocalStorage from '@/hooks/useLocalStorage';
import {DEFAULT_EMAIL} from '@/constants/constants';
import style from './style.module.css';

interface IProps {
  post: IPost;
  comments: IComment[];
}

export default function Post({post, comments}: IProps) {
  const [storedComments, setStoredComments] = useLocalStorage<IComment[]>('comments', []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newComment: IComment = {
      id: Number(new Date()),
      email: DEFAULT_EMAIL,
      body: formData.get('comment') as string,
      postId: post.id,
    };
    formData.set('comment', '');
    setStoredComments([...storedComments, newComment]);
  };

  return (
    <>
      <Image
        src={post.url}
        alt={post.title}
        width={0}
        height={0}
        sizes="100vw"
        style={{width: '100%', height: 'auto'}}
      />
      <div className={style.commentsContainer}>
        {[...comments, ...storedComments].map(({id, email, body}) => (
          <Comment key={id} author={email} body={body} />
        ))}
        <form className={style.form} onSubmit={handleSubmit}>
          <input type="text" className={style.input} name="comment"></input>
          <button type="submit" className={style.button}>
            Сохранить
          </button>
        </form>
      </div>
    </>
  );
}
