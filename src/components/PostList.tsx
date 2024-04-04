import { Post } from '../types/post';
import { sortPostsByTitle } from '../utils/sortPostsByTitle';
import MessageCard from './MessageCard';
import PostItem from './PostItem';

type PostProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostProps) {
  const sortedPosts = sortPostsByTitle(posts);

  return (
    <div className="flex-col items-center justify-center">
      {sortedPosts.length > 0 ? (
        sortedPosts.map((post) => <PostItem post={post} />)
      ) : (
        <MessageCard message={'Você ainda não possui postagens'} />
      )}
    </div>
  );
}
