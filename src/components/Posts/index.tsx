import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {getPosts} from '@/utils/services/jph';
import {IPost} from '@/types/types';
import useInfinityScroll from '@/hooks/useInfinityScroll';
import style from './style.module.css';

interface IProps {
  posts: IPost[];
}

export default function Posts({posts}: IProps) {
  const [allPosts, setAllPosts] = useState(posts);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [firstElement, setFirstElement] = useState<HTMLLIElement | null>(null);
  const [lastElement, setLastElement] = useState<HTMLLIElement | null>(null);

  let cuttedPosts = allPosts.length > 100 ? allPosts.slice(-100, allPosts.length) : allPosts;

  useInfinityScroll({
    element: lastElement,
    callback: () => setPage((prev) => prev + 1),
  });

  useInfinityScroll({
    element: firstElement,
    callback: () => console.log('first element is crossed'),
  });

  const addPosts = async () => {
    setIsLoading(true);
    const posts = await getPosts(page);
    if (posts) setAllPosts([...allPosts, ...posts]);
    setIsLoading(false);
  };

  useEffect(() => {
    addPosts();
  }, [page]);

  const setRef = (index: number) => {
    if (index === 0 && !isLoading) return setFirstElement;
    if (index === cuttedPosts.length - 1 && !isLoading) return setLastElement;
    return null;
  };

  return (
    <>
      <ul className={style.list}>
        {cuttedPosts.length > 0 &&
          cuttedPosts.map((post, index) => {
            return (
              <li key={post.id} ref={setRef(index)} className={style.item}>
                <Link href={`/posts/${post.id}`}>
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    alt={post.title}
                    src={post.thumbnailUrl}
                  />
                </Link>
              </li>
            );
          })}
        {cuttedPosts.length === 0 && <div>Публикации не найдены</div>}
      </ul>
      {isLoading && <p className={style.loading}>Идет загрузка постов...</p>}
    </>
  );
}
