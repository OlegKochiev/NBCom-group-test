export interface IPost {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface IComment {
  postId: number;
  id: number;
  email: string;
  body: string;
}
