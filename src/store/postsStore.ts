import create from 'zustand';
import { Post } from '../types/post';

type PostStore = {
  posts: Post[];
  currentPostId: number | null;
  setCurrentPostId: (postId: number | null) => void;
  addPost: (post: Post) => void;
  deletePost: (postId: number) => void;
  setPosts: (posts: Post[]) => void;
};

export const usePostsStore = create<PostStore>((set) => ({
  posts: [],
  currentPostId: null,
  setCurrentPostId: (postId: number | null) => set({ currentPostId: postId }),
  setPosts: (posts: Post[]) => set({ posts }),
  addPost: (post: Post) => set((state) => ({ posts: [...state.posts, post] })),
  deletePost: (postId: number) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    })),
}));
