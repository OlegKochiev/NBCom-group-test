import React from 'react';
import Posts from '@/components/Posts';
import {IPost} from '@/types/types';
import {getPosts} from '@/utils/services/jph';
import style from '@/styles/posts.module.css';

export async function getServerSideProps() {
  const initialPage = 1;
  const posts = await getPosts(initialPage);
  return {
    props: {
      posts,
    },
  };
}

interface IProps {
  posts: IPost[];
}
export default function PostsPage({posts}: IProps) {
  return (
    <main className={style.mobileContainer}>
      <Posts posts={posts} />
    </main>
  );
}
