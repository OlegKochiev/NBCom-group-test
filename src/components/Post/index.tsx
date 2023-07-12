import React from 'react';
import Image from 'next/image';
import {IComment, IPost} from '@/types/types';

import style from './style.module.css';
import Comment from '../Comment';

interface IProps {
  post: IPost;
  comments: IComment[];
}

export default function Post({post, comments}: IProps) {
  console.log(comments);

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
        {comments.map(({id, email, body}) => (
          <Comment key={id} author={email} body={body} />
        ))}
      </div>
    </>
  );
}
