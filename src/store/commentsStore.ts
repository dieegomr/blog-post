import create from 'zustand';
import { Comment } from '../types/comment';

type CommentsStore = {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
};

export const useCommentsStore = create<CommentsStore>((set) => ({
  comments: [],
  setComments: (comments: Comment[]) => set({ comments }),
  addComment: (comment: Comment) =>
    set((state) => ({ comments: [comment, ...state.comments] })),
}));
