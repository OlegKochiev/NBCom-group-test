import React from 'react';
import GoBackButton from '../GoBackButton';
import style from './style.module.css';

interface IProps {
  title: string;
}

export default function Header({title}: IProps) {
  return (
    <header className={style.header}>
      <GoBackButton />
      <p className={style.title}>{title}</p>
      <span />
    </header>
  );
}
