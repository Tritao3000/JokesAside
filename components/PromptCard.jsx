"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Copy from "@public/assets/assets/images/copy1.svg";
import Tick from "@public/assets/assets/images/tick.svg";
import Heart from "@public/assets/assets/images/heart.svg";
import HeartFull from "@public/assets/assets/images/heartFull.svg";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
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
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_profile_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="acme font-semibold text-slate-300">
              {post.creator.username}
            </h3>

            <p className="font-inter text-sm text-slate-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div>
          <div className="copy_btn mb-2" onClick={handleCopy}>
            <Image
              src={copied === post.prompt ? Tick : Copy}
              width={12}
              height={12}
              alt="copy"
            />
          </div>
          <div className="copy_btn mt-2" onClick={handleLike}>
            <Image
              src={liked === true ? HeartFull : Heart}
              width={12}
              height={12}
              alt="like"
            />
          </div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-slate-300">{post.prompt}</p>
      <div className="flex justify-between">
        <p
          className="acme font-medium inline-block text-sm tag_gradient cursor-pointer"
          onClick={() => {
            handleTagClick && handleTagClick(post.tag);
          }}
        >
          #{post.tag}
        </p>
        <p className="font-inter inline-block text-xs text-slate-300">
          {numLikes} {numLikes === 1 ? "Laugh" : "Laughs"}
        </p>
      </div>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer acme"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer acme"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
