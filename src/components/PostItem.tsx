import { useState } from 'react';
import { Post } from '../types/post';
import TrashIcon from './TrashIcon';
import { Comment } from '../types/comment';
import CommentsList from './CommentsList';
import useModal from '../hooks/useModal';
import CustomModal from './CustomModal';

export type PostItemProps = {
  post: Post;
};

export default function PostItem({ post }: PostItemProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState('');
  const { isModalOpen, openModal, closeModal } = useModal();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  async function getPostComments(id: number) {
    try {
      setIsLoadingComments(true);
      const response = await fetch(`${baseUrl}/comments?postId=${id}`);
      setIsLoadingComments(false);
      return await response.json();
    } catch (error) {
      setCommentsError(
        'Algo inesperado aconteceu. Tente novamente mais tarde.'
      );
    }
  }

  async function handleOnClick() {
    openModal();
    console.log('Postagem clicada:', post.id);
    const comments = await getPostComments(post.id);
    setComments(comments);
  }

  return (
    <>
      <CustomModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        title="Comentários:"
        customWidth="60vw"
      >
        <>
          {!isLoadingComments && !commentsError && (
            <CommentsList comments={comments} />
          )}
          {isLoadingComments && (
            <div className="flex h-96 w-full items-center justify-center">
              <p>Carregando comentários...</p>
            </div>
          )}
          {commentsError && (
            <div className="flex h-96 w-full items-center justify-center">
              <p>{commentsError}</p>
            </div>
          )}
        </>
      </CustomModal>
      <button
        onClick={handleOnClick}
        className="flex bg-white hover:bg-slate-50 shadow-md rounded-lg p-6 mb-5 space-x-7 items-center text-left"
      >
        <div className="min-w-8">#{post.id}</div>
        <div className="flex-col flex-grow">
          <div className="font-bold mb-3">{post.title}</div>
          <div>{post.body}</div>
        </div>
        <div>
          <button className="text-white px-4 py-2 rounded">
            <TrashIcon />
          </button>
        </div>
      </button>
    </>
  );
}
