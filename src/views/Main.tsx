import PostList from '../components/PostList';
import MessageCard from '../components/MessageCard';
import useModal from '../hooks/useModal';
import usePosts from '../hooks/usePosts';
import PostsForm from '../components/PostsForm';
import CustomModal from '../components/CustomModal';

export default function Main() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { posts, isFetching, fetchError } = usePosts();

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <>
      <CustomModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        title="Criar nova postagem:"
      >
        <div className="flex flex-col justify-center items-center">
          <PostsForm posts={posts} />
        </div>
      </CustomModal>
      <div className="flex-col justify-center px-40 py-10">
        <button
          onClick={() => openModal()}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded mb-10"
        >
          + Nova Postagem
        </button>
        {!fetchError && <PostList posts={posts} />}
        {fetchError && <MessageCard message={fetchError} />}
      </div>
    </>
  );
}
