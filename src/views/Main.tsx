import PostList from '../components/PostList';
import MessageCard from '../components/MessageCard';
import Modal from 'react-modal';
import useModal from '../hooks/useModal';
import CloseIcon from '../components/CloseIcon';
import usePosts from '../hooks/usePosts';
import PostsForm from '../components/PostsForm';

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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => closeModal()}
        style={{
          content: {
            height: '50vh',
            width: '40vw',
            margin: 'auto',
            padding: 0,
            backgroundColor: '#F5F5F5',
          },
        }}
      >
        <div className="flex-col">
          <div className="sticky top-0 bg-white h-16 overflow-hidden pt-3 pl-5 ">
            <div className="flex justify-between pr-8">
              <h1 className="font-bold text-2xl">Criar nova postagem:</h1>
              <button onClick={() => closeModal()}>
                <CloseIcon />
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <PostsForm posts={posts} />
          </div>
        </div>
      </Modal>
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
