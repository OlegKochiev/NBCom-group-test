import React from 'react';
import style from './style.module.css';

interface IProps {
  author: string;
  body: string;
}

export default function Comment({author, body}: IProps) {
  return (
    <>
      <p className={style.comment}>
        <span className={style.author}> {author}</span> {body}
      </p>
    </>
  );
}
