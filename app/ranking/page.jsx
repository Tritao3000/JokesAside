"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const Ranking = () => {
  const [posts, setPosts] = useState([]);

  const handleProfileClick = () => {
    // ! Código Repetido
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const rankedPosts = posts.sort(
    (a, b) => b.userLiked.length - a.userLiked.length
  );

  return (
    <div className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
      {rankedPosts.map((post, index) => {
        return (
          <div
            key={index}
            className="flex flex-row gap-3 cursor-pointer"
            onClick={handleProfileClick}
          >
            <Image
              src={post.creator.image}
              alt="user_profile_image"
              width={25}
              height={25}
              className="rounded-full object-contain"
            />
            <h1 className="font-satoshi font-semibold text-slate-300">
              {post.creator.username}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default Ranking;
