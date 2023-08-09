"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Copy from "@public/assets/assets/images/copy1.svg";
import Tick from "@public/assets/assets/images/tick.svg";
import Heart from "@public/assets/assets/images/heart.svg";
import HeartFull from "@public/assets/assets/images/heartFull.svg";

const RankingCard = ({
  post,
  handleProfileClick,
  handleLike,
  handleCopy,
  handleTagClick,
}) => {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <div className="rank_card flex-col ">
      <div className="w-full h-full bg-slate-300 rounded-t-xl p-3">
        <div className=" bg-red-300  p-3">
          Aqui será o post.Aqui será o post.Aqui será o post.Aqui será o
          post.Aqui será o post.Aqui será o post.
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start px-6 bg-gray-900">
        <div className="my-5">
          <p className="font-satoshi font-semibold text-slate-300">#1</p>
        </div>
        <div className="mb-5">
          <p className="font-inter text-slate-300">author:</p>
          <div>
            <p className="font-satoshi font-semibold text-slate-300">
              Tiago Pereira
            </p>
          </div>
        </div>
        <div className="mb-5">
          <p className="font-inter text-slate-300">tag:</p>
          <p className="font-inter font-semibold inline-block text-sm tag_gradient cursor-pointer">
            #test
          </p>
        </div>
        <div className="flex flex-row space-x-3">
          <p className="font-inter font-semibold text-slate-300">Copy</p>
          <p className="font-inter font-semibold text-slate-300">Like</p>
        </div>
      </div>
    </div>
  );
};

export default RankingCard;
