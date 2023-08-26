"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RankingCard from "@components/RankingCard";
import RankingCarousel from "@components/RankingCarousel";

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
  console.log(posts);

  const rankedPosts = posts.sort(
    (a, b) => b.userLiked.length - a.userLiked.length
  );
  return (
    <section className="w-fit">
      <h1 className="head_text text-left">
        <span className="title_gradient acme">Ranking</span>
      </h1>
      <p className="desc text-left">
        Check out the best jokes, obviously hand-crafted by those who never felt
        the female touch.
      </p>
      <div className="mt-0 prompt_layout_rank">
        {rankedPosts.map((post, index) => {
          return <RankingCard index={index} post={post} />;
        })}
      </div>
    </section>
  );
};

export default Ranking;
