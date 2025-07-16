import postsData from "./posts.json";

export type Post = {
  id: string;
  date: string;
  title: string;
};

export const getPosts = async () => {
  const posts = postsData.posts;
  return posts;
};
