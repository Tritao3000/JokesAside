"use client";

import { useEffect, useState } from "react";

const Ranking = () => {
  const [posts, setPosts] = useState([]);

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
    <div>
      {rankedPosts.map((post, index) => {
        return (
          <div key={index}>
            <h1>{post.creator.username}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Ranking;
