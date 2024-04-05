import useComments from '../hooks/useComments';
import CommentItem from './CommentItem';
import MessageCard from './MessageCard';

export default function CommentsList() {
  const { comments, isLoadingComments, commentsError } = useComments();

  return (
    <>
      {!isLoadingComments && !commentsError && (
        <div className="flex-col pt-4 px-20">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          ) : (
            <MessageCard message={'Essa postagem não possui comentários'} />
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
