import { fetchPostData } from "./api/hello";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
};

type HomeProps = {
  posts: Post[];
};

const Home: React.FC<HomeProps> = ({ posts }) => {
  return (
    <div>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link href={`/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const posts = await fetchPostData();

  return {
    props: {
      posts,
    },
  };
};

