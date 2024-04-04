import { Post } from '../types/post';
import TrashIcon from './TrashIcon';

export type PostItemProps = {
  post: Post;
};

export default function PostItem({ post }: PostItemProps) {
  return (
    <div className="flex bg-white rounded-lg p-6 mb-5 space-x-7 items-center">
      <div className="min-w-8">#{post.id}</div>
      <div className="flex-col flex-grow">
        <div className="font-bold mb-3">{post.title}</div>
        <div>{post.body}</div>
      </div>
      <div>
        <button className="text-white px-4 py-2 rounded">
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}
