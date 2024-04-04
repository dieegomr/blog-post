import { Comment } from '../types/comment';

type CommentItemProps = {
  comment: Comment;
};

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex-col p-5 bg-white mb-5 rounded-lg shadow-sm">
      <p className="font-bold mb-2">{comment.name}</p>
      <p className="mb-4">{comment.body}</p>
      <p className="flex text-sm justify-end text-cyan-600">
        {comment.email.toLocaleLowerCase()}
      </p>
    </div>
  );
}
