import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {getPosts} from '@/utils/services/jph';
import {IPost} from '@/types/types';
import style from './style.module.css';

interface IProps {
  posts: IPost[];
}

export default function Posts({posts}: IProps) {
  const [allPosts, setAllPosts] = useState(posts);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [lastElement, setLastElement] = useState<HTMLLIElement | null>(null);

  let observer = useRef<IntersectionObserver | null>(null);

  const addPosts = async () => {
    setIsLoading(true);
    const posts = await getPosts(page);
    if (posts) setAllPosts([...allPosts, ...posts]);
    setIsLoading(false);
  };

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });
  }, []);

  useEffect(() => {
    addPosts();
  }, [page]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;
    if (currentElement && currentObserver) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement && currentObserver) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  const cuttedPosts = allPosts.length > 150 ? allPosts.slice(-100, allPosts.length) : allPosts;
  const isScrollBottom = (index: number) => (index === cuttedPosts.length - 1 && !isLoading ? true : false);

  return (
    <>
      <ul className={style.list}>
        {cuttedPosts.length > 0 &&
          cuttedPosts.map((post, index) => {
            return (
              <li key={post.id} ref={isScrollBottom(index) ? setLastElement : null} className={style.item}>
                <Link href={`/posts/${post.id}`}>
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{width: '100%', height: 'auto'}}
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
