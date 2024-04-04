import { Post } from '../types/post';

export function sortPostsByTitle(posts: Post[]) {
  return [...posts].sort((a, b) => a.title.localeCompare(b.title));
}
