import { useEffect, useState } from 'react';
import { NewPost, Post } from '../types/post';

const useModal = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [fetchError, setFetchError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  async function addPost(newPost: NewPost) {
    try {
      setIsSubmitting(true);
      const response = await fetch(`${baseUrl}/posts`, {
        method: 'POST',
        body: JSON.stringify({
          title: newPost.title,
          body: newPost.body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const addedPost = await response.json();

      setPosts((prevPosts) => [addedPost, ...prevPosts]);

      setIsSubmitting(false);
    } catch (error) {
      setSubmitError('Não foi possível adicionar a postagem.');
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    setFetchError('');
    setIsFetching(true);
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${baseUrl}/posts`);
        const data = await response.json();
        setPosts(data);
        setIsFetching(false);
      } catch (error) {
        setFetchError('Algo inesperado aconteceu. Tente novamente mais tarde.');
        setIsFetching(false);
      }
    };

    fetchPosts();
  }, [baseUrl]);

  return {
    posts,
    fetchError,
    submitError,
    isFetching,
    isSubmitting,
    addPost,
  };
};

export default useModal;
