import { Comment } from '../types/comment';
import CommentItem from './CommentItem';
import MessageCard from './MessageCard';

type CommentsListProps = {
  comments: Comment[];
};

export default function CommentsList({ comments }: CommentsListProps) {
  return (
    <div className="flex-col pt-4 pr-10 pl-10 pb-10">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      ) : (
        <MessageCard message={'Essa postagem não possui comentários'} />
      )}
    </div>
  );
}
