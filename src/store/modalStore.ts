import create from 'zustand';

type ModalStore = {
  isOpenNewPostModal: boolean;
  isOpenNewCommentModal: boolean;
  openNewPostModal: () => void;
  closeNewPostModal: () => void;
  openNewCommentModal: () => void;
  closeNewCommentModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpenNewPostModal: false,
  isOpenNewCommentModal: false,
  openNewPostModal: () => set({ isOpenNewPostModal: true }),
  closeNewPostModal: () => set({ isOpenNewPostModal: false }),
  openNewCommentModal: () => set({ isOpenNewCommentModal: true }),
  closeNewCommentModal: () => set({ isOpenNewCommentModal: false }),
}));
