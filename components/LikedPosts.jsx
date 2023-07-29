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
      <PromptCardList data={likedPosts} />
    </div>
  );
};

export default LikedPosts;
