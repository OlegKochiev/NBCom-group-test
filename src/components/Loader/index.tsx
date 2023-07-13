import React from 'react';
import style from './style.module.css';
export default function Loader() {
  return (
    <div className={style.container}>
      <div className={style.spinner}></div>
    </div>
  );
}
