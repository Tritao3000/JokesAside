"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Copy from "@public/assets/assets/images/copy1.svg";
import Tick from "@public/assets/assets/images/tick.svg";
import Heart from "@public/assets/assets/images/heart.svg";
import HeartFull from "@public/assets/assets/images/heartFull.svg";

const RankingCard = ({ post, index }) => {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [copied, setCopied] = useState("");
  const [liked, setLiked] = useState(post.userLiked.includes(session?.user.id));
  const [numLikes, setNumLikes] = useState(post.userLiked.length);

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleLike = async () => {
    try {
      let updatedUserLiked = [];

      if (!liked) {
        updatedUserLiked = [...post.userLiked];
        updatedUserLiked.push(session?.user.id);
      } else {
        updatedUserLiked = post.userLiked.filter(
          (user) => user !== session?.user.id
        );
      }

      const response = await fetch(`/api/prompt/${post._id}`, {
        method: "PUT",
        body: JSON.stringify({ userLiked: updatedUserLiked }),
      });

      if (response.ok) {
        setLiked(!liked);

        setNumLikes(updatedUserLiked.length);
      } else {
        console.error("Failed to update like status.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const handleProfileClick = () => {
    // ! código repetido
    if (post.creator._id === session?.user.id) {
      router.push("/profile");
    } else {
      router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
    }
  };
  return (
    <div className="rank_card flex-col glassmorphism ">
      <div className="w-full h-full bg-slate-300/10 rounded-t-xl p-3">
        <div className="  p-3 font-satoshi font-semibold text-sm text-slate-300">
          " {post.prompt} "
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start px-6 ">
        <div className="my-5">
          <p className="font-satoshi font-semibold tag_gradient text-5xl">
            #{index + 1}
          </p>
        </div>
        <div className="mb-5">
          <p className="font-inter text-slate-300 text-xs">author:</p>
          <div
            className="flex flex-row space-x-2 cursor-pointer mt-1"
            onClick={handleProfileClick}
          >
            <Image
              src={post.creator.image}
              alt="user_profile_image"
              width={25}
              height={25}
              className="rounded-full object-contain"
            />
            <p className="font-satoshi font-semibold text-slate-300">
              {post.creator.username}
            </p>
          </div>
        </div>
        <div className="mb-5">
          <p className="font-inter text-slate-300 text-xs">tag:</p>
          <p className="font-satoshi font-semibold inline-block text-md text-slate-300">
            #{post.tag}
          </p>
        </div>
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-row space-x-3 items-center">
            <div className="copy_btn" onClick={handleCopy}>
              <Image
                src={copied === post.prompt ? Tick : Copy}
                width={12}
                height={12}
                alt="copy"
              />
            </div>
            <div className="copy_btn" onClick={handleLike}>
              <Image
                src={liked === true ? HeartFull : Heart}
                width={12}
                height={12}
                alt="like"
              />
            </div>
          </div>
          <div>
            <p className="font-inter text-xs text-slate-300">
              {" "}
              {numLikes} {numLikes === 1 ? "Laugh" : "Laughs"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingCard;
