import useComments from '../hooks/useComments';
import CommentItem from './CommentItem';

export default function CommentsList() {
  const { comments, isLoadingComments, commentsError } = useComments();

  return (
    <>
      {!isLoadingComments && !commentsError && (
        <div className="flex-col pt-4 m-auto p-4 max-w-lg">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          ) : (
            <div className="flex h-96 justify-center items-center rounded-lg">
              <p>Essa postagem não possui comentários</p>
            </div>
          )}
        </div>
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
    </>
  );
}
