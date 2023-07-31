import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PromptCardList } from "./Feed";

const LikedPosts = () => {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, [posts]);

  const likedPosts = posts.filter((post) =>
    post.userLiked.includes(session?.user.id)
  );

  return (
    <div className="mt-4">
      {likedPosts.length !== 0 ? (
        <PromptCardList data={likedPosts} />
      ) : (
        <h1 className="desc">No liked posts</h1>
      )}
    </div>
  );
};

export default LikedPosts;
