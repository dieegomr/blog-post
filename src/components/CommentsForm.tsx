import { SubmitHandler, useForm } from 'react-hook-form';
import useComments from '../hooks/useComments';
import { useModalStore } from '../store/modalStore';
import usePosts from '../hooks/usePosts';

type FormFields = {
  title: string;
  body: string;
};

export default function CommentsForm() {
  const { register, handleSubmit, formState, reset } = useForm<FormFields>();
  const { addComment, isSubmitting } = useComments();
  const { currentPostId } = usePosts();
  const { closeNewCommentModal: closeModal } = useModalStore();

  const onSubmit: SubmitHandler<FormFields> = async (
    newComment: FormFields
  ) => {
    await addComment(newComment, currentPostId as number);
    closeModal();
    reset();
  };

  return (
    <form
      className="flex flex-col w-full h-screen px-16 m-auto items-center pt-6 bg-gray-200 rounded-t-lg shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      {!isSubmitting ? (
        <>
          <input
            id="title"
            className="p-2 lg:w-2/3 sm:w-full h-8 text-sm shadow-sm outline-none"
            placeholder="Título"
            {...register('title', {
              required: 'Título é obrigatório',
            })}
          />
          <div className="flex justify-start w-full h-4 my-1">
            {formState.errors.title && (
              <span className="text-red-500 text-xs">
                {formState.errors.title.message}
              </span>
            )}
          </div>
          <textarea
            className="p-2 lg:w-2/3 sm:w-full text-sm h-16 shadow-sm outline-none"
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
          <div className="flex justify-start w-full h-4 pt-1 mb-2">
            {formState.errors.body && (
              <span className="text-red-500 text-xs">
                {formState.errors.body.message}
              </span>
            )}
          </div>
        </>
      ) : (
        <div className="flex h-36 justify-center items-center">
          <p>Adicionando...</p>
        </div>
      )}
      <div className="flex justify-end lg:w-2/3">
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
