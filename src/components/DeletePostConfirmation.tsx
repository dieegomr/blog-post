import usePosts from '../hooks/usePosts';

type DeletePostConfirmationProps = {
  handleCancelDelete: () => void;
};

export default function DeletePostConfirmation({
  handleCancelDelete,
}: DeletePostConfirmationProps) {
  const { isDeleting, currentPostId, handleDeletePost } = usePosts();

  async function onConfirmDelete(postId: number) {
    await handleDeletePost(postId);
  }

  return (
    <div className="flex flex-col p-10 items-center h-72">
      <div className="flex items-center h-52">
        {isDeleting ? (
          <p>Excluindo...</p>
        ) : (
          <p className="text-red-600 ">
            Atenção! Ao excluir esta postagem os comentários também serão
            excluídos
          </p>
        )}
      </div>
      <div>
        <button
          disabled={isDeleting}
          onClick={handleCancelDelete}
          className={`text-cyan-600 border border-cyan-600 px-4 py-2 rounded ml-5 min-w-28 ${
            isDeleting ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Cancelar
        </button>
        <button
          disabled={isDeleting}
          onClick={() => {
            onConfirmDelete(currentPostId as number);
          }}
          className={`bg-cyan-600 text-white px-4 py-2 rounded ml-5 min-w-28 ${
            isDeleting ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
