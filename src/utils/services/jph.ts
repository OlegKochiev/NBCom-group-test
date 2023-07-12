import {IComment, IPost} from '@/types/types';
import {POSTS_LIMIT, URL} from '@/constants/constants';

export const loadMorePosts = async (page: number) => {
  try {
    const response = await fetch(`${URL.JPH.POSTS}?_page=${page}&_limit=${POSTS_LIMIT}`);
    const posts = await response.json();
    if (posts.length === 0) return null;
    return posts as IPost[];
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (id: number) => {
  try {
    const data = await fetch(`${URL.JPH.POSTS}?id=${id}`);
    const posts = await data.json();
    if (posts.length === 0) return null;
    return posts[0] as IPost;
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async (id: number) => {
  try {
    const data = await fetch(`${URL.JPH.COMMENTS}?postId=${id}`);
    const comments = await data.json();
    if (comments.length === 0) return null;
    return comments as IComment[];
  } catch (error) {
    console.log(error);
  }
};
