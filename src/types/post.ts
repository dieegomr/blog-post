export type NewPost = {
  title: string;
  body: string;
};

export type Post = NewPost & {
  userId: number;
  id: number;
};
