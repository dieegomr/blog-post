import { SubmitHandler, useForm } from 'react-hook-form';
import usePosts from '../hooks/usePosts';
import { usePostsStore } from '../store/postsStore';
import { useModalStore } from '../store/modalStore';

type FormFields = {
  title: string;
  body: string;
};

export default function PostsForm() {
  const { register, handleSubmit, formState, reset } = useForm<FormFields>();
  const { handleAddPost, isSubmitting } = usePosts();
  const { closeNewPostModal: closeModal } = useModalStore();
  const { posts } = usePostsStore();

  const titlesArray = posts.map((post) => post.title);

  const onSubmit: SubmitHandler<FormFields> = async (newPost: FormFields) => {
    await handleAddPost(newPost);
    closeModal();
    reset();
  };

  return (
    <form
      className="flex flex-col w-full px-20 items-center pt-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {!isSubmitting ? (
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
          disabled={isSubmitting}
          className={`bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Adicionar
        </button>
      </div>
    </form>
  );
}
