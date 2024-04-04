import { useEffect, useState } from 'react';
import { Post } from '../types/post';
import PostList from '../components/PostList';
import MessageCard from '../components/MessageCard';
import Modal from 'react-modal';
import useModal from '../hooks/useModal';
import CloseIcon from '../components/CloseIcon';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormFields = {
  title: string;
  body: string;
};

export default function Main() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();
  const { register, handleSubmit, formState, reset } = useForm<FormFields>();

  const titlesArray = posts.map((post) => post.title);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const onSubmit: SubmitHandler<FormFields> = async (newPost: FormFields) => {
    try {
      setLoadingSubmit(true);
      const response = await fetch(`${baseUrl}/posts`, {
        method: 'POST',
        body: JSON.stringify({
          title: newPost.title,
          body: newPost.body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const addedPost = await response.json();

      setPosts((prevPosts) => [addedPost, ...prevPosts]);

      setLoadingSubmit(false);

      closeModal();

      reset();
    } catch (error) {
      setError('Não foi possível adicionar a postagem.');
      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    setError('');
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${baseUrl}/posts`);
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setError('Algo inesperado aconteceu. Tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, [baseUrl]);

  if (loading) {
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
            <form
              className="flex flex-col w-full px-20 items-center pt-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              {!loadingSubmit ? (
                <>
                  <input
                    id="title"
                    className="p-3 w-full shadow-sm outline-none"
                    placeholder="Título"
                    {...register('title', {
                      required: 'Título é obrigatório',
                      validate: (value) => {
                        if (titlesArray.includes(value)) {
                          return 'Já existe uma postagem com esse título.';
                        }

                        return true;
                      },
                    })}
                  />
                  <div className="flex justify-start w-full h-8 pt-1">
                    {formState.errors.title && (
                      <span className="text-red-500 text-sm">
                        {formState.errors.title.message}
                      </span>
                    )}
                  </div>
                  <textarea
                    className="p-3 w-full h-28 shadow-sm outline-none"
                    placeholder="Conteúdo"
                    {...register('body', {
                      required: 'Conteúdo é obrigatório',
                      minLength: {
                        value: 5,
                        message: 'Conteúdo deve ter no mínimo 5 caracteres',
                      },
                    })}
                    id="body"
                  ></textarea>
                  <div className="flex justify-start w-full h-8 pt-1">
                    {formState.errors.body && (
                      <span className="text-red-500 text-sm">
                        {formState.errors.body.message}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex h-52 justify-center items-center">
                  <p>Adicionando...</p>
                </div>
              )}
              <div className="flex justify-end w-full">
                <button
                  disabled={loadingSubmit}
                  className={`bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded ${
                    loadingSubmit ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Adicionar
                </button>
              </div>
            </form>
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
        {!error && <PostList posts={posts} />}
        {error && <MessageCard message={error} />}
      </div>
    </>
  );
}
