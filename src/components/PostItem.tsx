import { useState } from 'react';
import { Post } from '../types/post';
import TrashIcon from './TrashIcon';
import { Comment } from '../types/comment';
import CommentsList from './CommentsList';
import useModal from '../hooks/useModal';
import CustomModal from './CustomModal';
import usePosts from '../hooks/usePosts';

export type PostItemProps = {
  post: Post;
};

export default function PostItem({ post }: PostItemProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState('');
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);
  const [showComments, setShowComments] = useState(false);

  const { isModalOpen, openModal, closeModal } = useModal();
  const { handleDeletePost, isDeleting } = usePosts();

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

  async function handleShowComments() {
    setShowComments(true);
    const comments = await getPostComments(post.id);
    setComments(comments);
    openModal();
  }

  async function onDelete(postId: number) {
    setShowComments(false);
    setCurrentPostId(postId);
    openModal();
  }

  async function onConfirm(postId: number) {
    await handleDeletePost(postId);
    closeModal();
  }

  return (
    <>
      <CustomModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        title={showComments ? 'Comentários:' : 'Excluir postagem?'}
        customWidth={showComments ? '60vw' : '45vw'}
      >
        <>
          {showComments ? (
            <CommentsList
              comments={comments}
              isLoadingComments={isLoadingComments}
              commentsError={commentsError}
            />
          ) : (
            <div className="flex flex-col p-10 items-center h-72">
              <div className="flex items-center h-52">
                <p className="text-red-600 ">
                  Atenção! Ao excluir esta postagem os comentários também serão
                  excluídos
                </p>
              </div>
              <div>
                <button
                  disabled={isDeleting}
                  onClick={closeModal}
                  className={`text-cyan-600 border border-cyan-600 px-4 py-2 rounded ml-5 min-w-28 ${
                    isDeleting ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                >
                  Cancelar
                </button>
                <button
                  disabled={isDeleting}
                  onClick={() => {
                    onConfirm(currentPostId as number);
                  }}
                  className={`bg-red-600 text-white px-4 py-2 rounded ml-5 min-w-28 ${
                    isDeleting ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                >
                  Excluir
                </button>
              </div>
            </div>
          )}
        </>
      </CustomModal>
      <div className="flex bg-white hover:bg-slate-50 shadow-md rounded-lg p-6 mb-5 items-center">
        <button
          className="flex items-center text-left"
          onClick={() => handleShowComments()}
        >
          <div className="min-w-16">#{post.id}</div>
          <div className="flex flex-col flex-grow">
            <div className="font-bold mb-3">{post.title}</div>
            <div>{post.body}</div>
          </div>
        </button>
        <div className="flex flex-grow justify-end">
          <button
            onClick={() => onDelete(post.id)}
            className="text-white px-4 py-2 rounded  hover:bg-slate-200"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </>
  );
}
