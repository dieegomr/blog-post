import { useState } from 'react';
import { Post } from '../types/post';
import TrashIcon from './TrashIcon';
import Modal from 'react-modal';
import { Comment } from '../types/comment';
import CloseIcon from './CloseIcon';
import CommentsList from './CommentsList';
import useModal from '../hooks/useModal';

export type PostItemProps = {
  post: Post;
};

export default function PostItem({ post }: PostItemProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState('');
  const { isModalOpen, openModal, closeModal } = useModal();

  console.log('comments', comments);

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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => closeModal()}
        style={{
          content: {
            height: '70vh',
            width: '60vw',
            margin: 'auto',
            padding: 0,
            backgroundColor: '#F5F5F5',
          },
        }}
      >
        <div className="flex-col">
          <div className="sticky top-0 bg-white h-16 overflow-hidden pt-3 pl-5">
            <div className="flex justify-between pr-8">
              <h1 className="font-bold text-2xl">Comentários:</h1>
              <button onClick={() => closeModal()}>
                <CloseIcon />
              </button>
            </div>
          </div>
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
        </div>
      </Modal>
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
