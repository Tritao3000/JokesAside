import PromptCard from "./PromptCard";
import LikedPosts from "./LikedPosts";
import { useState } from "react";

const Profile = ({ name, dsc, data, handleEdit, handleDelete }) => {
  const [myOrLiked, setMyOrLiked] = useState(true);
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="title_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{dsc}</p>
      <div className="mt-10 w-full flex justify-evenly items-center flex-row  ">
        <div
          className="flex justify-center items-center basis-5/12 border-b hover:border-b-2 cursor-pointer "
          onClick={() => {
            setMyOrLiked(true);
          }}
        >
          <p className="my-1 text-base text-slate-300  max-w-2xl">
            {name} Posts
          </p>
        </div>
        <div
          className="flex justify-center items-center basis-5/12 border-b hover:border-b-2 cursor-pointer  "
          onClick={() => {
            setMyOrLiked(false);
          }}
        >
          <p className="my-1 text-base text-slate-300 max-w-2xl">
            {name} Liked Posts
          </p>
        </div>
      </div>
      {myOrLiked === true ? (
        <div className="mt-10 prompt_layout">
          {data.map((post) => {
            return (
              <PromptCard
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
              />
            );
          })}
        </div>
      ) : (
        <div>
          <LikedPosts />
        </div>
      )}
    </section>
  );
};

export default Profile;
