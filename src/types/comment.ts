export type NewComment = {
  title: string;
  body: string;
};

export type Comment = NewComment & {
  id: number;
  postId: number;
  name: string;
  email: string;
};
