import React from 'react';
import Posts from '@/components/Posts';
import {IPost} from '@/types/types';
import {getPosts} from '@/utils/services/jph';

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
    <div>
      <Posts posts={posts} />
    </div>
  );
}
