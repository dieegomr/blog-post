import { useState } from 'react';
import { useCommentsStore } from '../store/commentsStore';
import { NewComment } from '../types/comment';

const useComments = () => {
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    comments,
    setComments,
    addComment: addCommentStore,
  } = useCommentsStore();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  async function addComment(newComment: NewComment, postId: number) {
    try {
      setIsSubmitting(true);
      const response = await fetch(`${baseUrl}/comments`, {
        method: 'POST',
        body: JSON.stringify({
          name: newComment.title,
          email: 'diego@gmail.com',
          body: newComment.body,
          postId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const addedComment = await response.json();

      addCommentStore(addedComment);

      setIsSubmitting(false);
    } catch (error) {
      setCommentsError('Não foi possível adicionar o comentário.');
      setIsSubmitting(false);
    }
  }

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
    isLoadingComments,
    isSubmitting,
    commentsError,
    addComment,
    getPostComments,
  };
};

export default useComments;
