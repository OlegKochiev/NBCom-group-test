import React from 'react';
import Header from '@/components/Header';
import Post from '@/components/Post';
import {IComment, IPost} from '@/types/types';
import {getComments, getPost} from '@/utils/services/jph';
import style from '@/styles/post.module.css';

interface IParams {
  id?: string;
}

export async function getServerSideProps({params}: {params: IParams}) {
  const id = Number(params.id);
  const post = await getPost(id);
  const comments = await getComments(id);
  return {
    props: {
      post,
      comments,
    },
  };
}

interface IProps {
  post: IPost;
  comments: IComment[];
}

export default function PostsPage({post, comments}: IProps) {
  if (!post) return <div>Пост не найден</div>;
  return (
    <div className={style.mobileContainer}>
      <Header title={post.title} />
      <Post post={post} comments={comments} />
    </div>
  );
}
