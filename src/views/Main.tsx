import PostList from '../components/PostList';
import MessageCard from '../components/MessageCard';
import PostsForm from '../components/PostsForm';
import CustomModal from '../components/CustomModal';
import { useEffect, useState } from 'react';
import { usePostsStore } from '../store/postsStore';
import { useModalStore } from '../store/modalStore';

export default function Main() {
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const {
    isOpenNewPostModal,
    closeNewPostModal: closeModal,
    openNewPostModal: openModal,
  } = useModalStore();
  const { setPosts } = usePostsStore();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    setFetchError('');
    setIsFetching(true);
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${baseUrl}/posts`);
        const data = await response.json();
        setPosts(data);
        setIsFetching(false);
      } catch (error) {
        setFetchError('Algo inesperado aconteceu. Tente novamente mais tarde.');
        setIsFetching(false);
      }
    };

    fetchPosts();
  }, [baseUrl, setPosts]);

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
        isModalOpen={isOpenNewPostModal}
        title="Criar nova postagem:"
      >
        <div className="flex flex-col justify-center items-center">
          <PostsForm />
        </div>
      </CustomModal>
      <div className="flex-col justify-center px-40 py-10">
        <button
          onClick={() => openModal()}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded mb-10"
        >
          + Nova Postagem
        </button>
        {!fetchError && <PostList />}
        {fetchError && <MessageCard message={fetchError} />}
      </div>
    </>
  );
}
