import { useState } from 'react';
import { Post } from '../types/post';
import TrashIcon from './TrashIcon';
import CommentsList from './CommentsList';
import useModal from '../hooks/useModal';
import CustomModal from './CustomModal';
import usePosts from '../hooks/usePosts';
import useComments from '../hooks/useComments';
import CommentsForm from './CommentsForm';
import DeletePostConfirmation from './DeletePostConfirmation';

export type PostItemProps = {
  post: Post;
};

export default function PostItem({ post }: PostItemProps) {
  const [showComments, setShowComments] = useState(false);

  const { isModalOpen, openModal, closeModal } = useModal();
  const { getPostComments } = useComments();
  const { setCurrentPostId } = usePosts();

  async function handleShowComments() {
    setShowComments(true);
    await getPostComments(post.id);
    openModal();
  }

  async function onDelete(postId: number) {
    setShowComments(false);
    setCurrentPostId(postId);
    openModal();
  }

  return (
    <>
      <CustomModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        title={showComments ? 'Comentários:' : 'Excluir postagem?'}
        customHeight={showComments ? '35rem' : '25rem'}
        footer={showComments && <CommentsForm />}
      >
        <>
          {showComments ? (
            <CommentsList />
          ) : (
            <DeletePostConfirmation handleCancelDelete={closeModal} />
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
