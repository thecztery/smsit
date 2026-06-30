export interface Post {

  id: number;

  text: string;

  image: string | null;

  createdAt: string;

  nickname: string;

  userPhoto: string | null;

  likesCount: number;

  commentsCount: number;

}