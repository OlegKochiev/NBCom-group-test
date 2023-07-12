import React from 'react';
import Posts from '@/components/Posts';
import {IPost} from '@/types/types';
import {URL} from '@/constants/constants';

export async function getServerSideProps() {
  const response = await fetch(`${URL.JPH.POSTS}?_page=1&_limit=27`);
  const posts = await response.json();
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
    <div>
      <Posts posts={posts} />
    </div>
  );
}
