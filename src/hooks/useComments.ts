import { useState } from 'react';
import { Comment } from '../types/comment';

const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState('');

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  async function getPostComments(id: number) {
    try {
      setIsLoadingComments(true);
      const response = await fetch(`${baseUrl}/comments?postId=${id}`);
      setIsLoadingComments(false);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      setCommentsError(
        'Algo inesperado aconteceu. Tente novamente mais tarde.'
      );
    }
  }

  return {
    comments,
    getPostComments,
    isLoadingComments,
    commentsError,
  };
};

export default useComments;
