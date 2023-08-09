"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Ranking = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { data: session } = useSession();

  const handleProfileClick = (post) => {
    if (post.creator._id === session?.user.id) {
      router.push("/profile");
    } else {
      router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
    }
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
    <div className="mt-10 w-full max-w-2xl flex flex-col gap-7 border border-slate-300  p-6 rounded-xl bg-slate-300/10">
      {rankedPosts.map((post, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-3 rounded-lg bg-transparent hover:border border-slate-300 transition duration-300"
        >
          <div key={index} className="flex items-center gap-3">
            <Image
              src={post.creator.image}
              alt="user_profile_image"
              width={25}
              height={25}
              className="rounded-full object-contain cursor-pointer"
              onClick={() => handleProfileClick(post)} // Pass the post to handleProfileClick
            />
            <h1 className="font-satoshi font-semibold text-slate-300">
              {post.creator.username}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-inter inline-block text-sm text-slate-300">
              {post.userLiked.length}{" "}
              {post.userLiked.length === 1 ? "Laugh" : "Laughs"}
            </p>
            <p className="font-inter font-bold text-sm title_gradient hover:text-slate-300 cursor-pointer">
              See Post
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ranking;
