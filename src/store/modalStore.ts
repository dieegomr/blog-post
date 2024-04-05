import create from 'zustand';

type ModalStore = {
  isOpenNewPostModal: boolean;
  openNewPostModal: () => void;
  closeNewPostModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpenNewPostModal: false,
  openNewPostModal: () => set({ isOpenNewPostModal: true }),
  closeNewPostModal: () => set({ isOpenNewPostModal: false }),
}));
