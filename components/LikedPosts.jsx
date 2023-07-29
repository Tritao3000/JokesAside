import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PromptCardList } from "./Feed";

const LikedPosts = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, [posts]);

  const likedPosts = posts.filter((post) => post.userLiked.includes(user.id));

  return (
    <div>
      {likedPosts.length !== 0 ? (
        <PromptCardList data={likedPosts} />
      ) : (
        <h1>No liked posts</h1>
      )}
    </div>
  );
};

export default LikedPosts;
