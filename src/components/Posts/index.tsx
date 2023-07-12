import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {IPost} from '@/types/types';
import {URL} from '@/constants/constants';

import style from './style.module.css';
import Link from 'next/link';

interface IProps {
  posts: IPost[];
}

const loadMorePosts = async (page: Number) => {
  const response = await fetch(`${URL.JPH.POSTS}?_page=${page}&_limit=27`);
  const posts = await response.json();
  return posts as IPost[];
};

export default function Posts({posts}: IProps) {
  const [allPosts, setAllPosts] = useState(posts);
  const [page, setPage] = useState(1);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setPage(page + 1);
    loadMorePosts(page + 1).then((posts) => {
      setAllPosts([...allPosts, ...posts]);
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ul className={style.list}>
      {allPosts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <Image width={128} height={128} alt={post.title} src={post.thumbnailUrl} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
