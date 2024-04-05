import { Comment } from '../types/comment';
import CommentItem from './CommentItem';
import MessageCard from './MessageCard';

type CommentsListProps = {
  comments: Comment[];
  isLoadingComments: boolean;
  commentsError: string;
};

export default function CommentsList({
  comments,
  commentsError,
  isLoadingComments,
}: CommentsListProps) {
  return (
    <>
      {!isLoadingComments && !commentsError && (
        <div className="flex-col pt-4 pr-10 pl-10 pb-10">
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
