"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const LikedPosts = () => {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((item) => item._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const userId = Object.keys(params).length !== 0 ? params.id : session.user.id;

  const likedPosts = posts.filter((post) => post.userLiked.includes(userId));

  return (
    <>
      <div className="mt-4">
        {likedPosts.length !== 0 ? (
          <PromptCardList
            data={likedPosts}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ) : (
          <h1 className="desc">No liked posts</h1>
        )}
      </div>
    </>
  );
};

export default LikedPosts;
