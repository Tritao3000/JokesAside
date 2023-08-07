import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PromptCardList } from "./Feed";
import { useParams } from "next/navigation";

const LikedPosts = () => {
  const { data: session } = useSession();
  const params = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const userId = Object.keys(params).length !== 0 ? params.id : session.user.id;

  const likedPosts = posts.filter((post) => post.userLiked.includes(userId));

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
