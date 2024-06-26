import { useState } from 'react';
import { NewPost } from '../types/post';
import { usePostsStore } from '../store/postsStore';

const usePosts = () => {
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { addPost, deletePost, currentPostId, setCurrentPostId } =
    usePostsStore();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  async function handleAddPost(newPost: NewPost) {
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

      addPost(addedPost);

      setIsSubmitting(false);
    } catch (error) {
      setSubmitError('Não foi possível adicionar a postagem.');
      setIsSubmitting(false);
    }
  }

  async function handleDeletePost(postId: number) {
    try {
      setIsDeleting(true);
      await fetch(`${baseUrl}/posts/${postId}`, {
        method: 'DELETE',
      });

      deletePost(postId);

      setIsDeleting(false);
    } catch (error) {
      setSubmitError('Não foi possível excluir a postagem.');
      setIsDeleting(false);
    }
  }

  return {
    currentPostId,
    submitError,
    isSubmitting,
    isDeleting,
    setCurrentPostId,
    handleAddPost,
    handleDeletePost,
  };
};

export default usePosts;
