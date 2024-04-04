import { Post } from '../types/post';
import MessageCard from './MessageCard';
import PostItem from './PostItem';

type PostProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostProps) {
  return (
    <div className="flex-col items-center justify-center">
      {posts.length > 0 ? (
        posts.map((post) => <PostItem post={post} />)
      ) : (
        <MessageCard message={'Você ainda não possui postagens'} />
      )}
    </div>
  );
}
