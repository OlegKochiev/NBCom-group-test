import React, {FormEvent} from 'react';
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
    const text = formData.get('commentInput') as string;
    if (!text.trim()) return;
    const newComment = {
      id: Number(new Date()),
      email: DEFAULT_EMAIL,
      body: text,
      postId: post.id,
    };
    formData.set('comment', '');
    setStoredComments([...storedComments, newComment]);
    e.currentTarget.reset();
  };

  const commentsFilterdByPostID = [...comments, ...storedComments.filter((comment) => comment.postId === post.id)];

  return (
    <main className={style.mobileContainer}>
      <Image
        src={post.url}
        alt={post.title}
        width={0}
        height={0}
        style={{width: '100%', height: '100vw', maxHeight: '425px'}}
      />
      <div className={style.commentsContainer}>
        <ul className={style.list}>
          {commentsFilterdByPostID.map(({id, email, body}) => (
            <li key={id} className={style.item}>
              <Comment author={email} body={body} />
            </li>
          ))}
        </ul>
        <form className={style.form} onSubmit={handleSubmit}>
          <label className={style.label}>
            <input placeholder="Комментарий.." type="text" className={style.input} name="commentInput" />
          </label>
          <button type="submit" className={style.button}>
            Сохранить
          </button>
        </form>
      </div>
    </main>
  );
}
