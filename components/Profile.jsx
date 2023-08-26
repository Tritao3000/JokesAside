import PromptCard from "./PromptCard";
import LikedPosts from "./LikedPosts";
import { useState } from "react";

const Profile = ({ name, dsc, data, handleEdit, handleDelete }) => {
  const [myOrLiked, setMyOrLiked] = useState(true);
  const changeStylesToMyPosts = () => {
    document.getElementById("myposts").classList.add("my-posts");
    document.getElementById("myposts").classList.remove("liked-posts");
    document.getElementById("likedposts").classList.add("liked-posts");
    document.getElementById("likedposts").classList.remove("my-posts");
  };
  const changeStylesToLiked = () => {
    document.getElementById("likedposts").classList.add("my-posts");
    document.getElementById("likedposts").classList.remove("liked-posts");
    document.getElementById("myposts").classList.add("liked-posts");
    document.getElementById("myposts").classList.remove("my-posts");
  };
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="title_gradient acme">{name} Profile</span>
      </h1>
      <p className="desc text-left">{dsc}</p>
      <div className="mt-10 w-full flex justify-between items-center flex-row  ">
        <div
          id="myposts"
          className="my-posts basis50"
          onClick={() => {
            setMyOrLiked(true);
            changeStylesToMyPosts();
          }}
        >
          <p className="my-1 text-base text-slate-300  max-w-2xl">
            {name} Posts
          </p>
        </div>
        <div
          id="likedposts"
          className="liked-posts basis50"
          onClick={() => {
            setMyOrLiked(false);
            changeStylesToLiked();
          }}
        >
          <p className="my-1 text-base text-slate-300 max-w-2xl">
            {name} Liked Posts
          </p>
        </div>
      </div>
      {myOrLiked === true ? (
        <div className="mt-4 prompt_layout">
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
