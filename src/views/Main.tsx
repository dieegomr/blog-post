import { useEffect, useState } from 'react';
import { Post } from '../types/post';
import PostList from '../components/PostList';
import MessageCard from '../components/MessageCard';

export default function Main() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    setError('');
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${baseUrl}/posts`);
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        setError('Algo inesperado aconteceu. Tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="flex-col justify-center px-40 py-10">
      <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded mb-10">
        + Nova Postagem
      </button>
      {!error && <PostList posts={posts} />}
      {error && <MessageCard message={error} />}
    </div>
  );
}
