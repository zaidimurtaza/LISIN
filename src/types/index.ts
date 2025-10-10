export interface User {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface Like {
  user: User;
  liked_at: string;
}

export interface Comment {
  id: number;
  song: number;
  commenter: Author;
  comment_text: string;
  created_at: string;
  like_count: number;
  comment_likes: Like[];
}

export interface Song {
  id: number;
  title: string;
  content: string;
  author: Author;
  image: string;
  audio?: string;
  created_at: string;
  data: {
    views: number;
    likes: number;
  };
  category: string;
  likes: Like[];
  comments?: Comment[];
  description?: string;
  cover_image?: string;
  duration?: string;
  likes_count?: number;
  views_count?: number;
}

export interface SavedSong {
  id: number;
  song: Song;
  saved_at: string;
}

export interface Profile {
  id: number;
  user: string;
  name: string;
  profile_picture: string | null;
  bio: string | null;
  audio: Song[];
  subscriber_count: number;
  subscribers: User[];
  saved_songs?: SavedSong[];
}

export interface Notification {
  id: number;
  recipient: User;
  message: string;
  created_at: string;
  is_read: boolean;
  type: 'like' | 'comment' | 'subscribe';
  reference_id?: number;
}