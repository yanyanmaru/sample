import { fetchPostData } from "./../api/hello";
import React from "react";

type Post = {
  id: number;
  title: string;
  body: string;
};

type PostProps = {
  post: Post;
};

type Params = {
  id: string;
};

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </>
  );
};

export default Post;

export const getStaticPaths = async () => {
  const posts: Post[] = await fetchPostData();

  const paths = posts.map((post) => ({
    params: {
      id: post.id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: { params: Params }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
};

