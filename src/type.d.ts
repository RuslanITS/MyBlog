export type Post = {
  id: string;
  author: string;
  text: string;
}

export type FPosts = {
  [id: string]: {
    author: string;
    text: string;
  };
}