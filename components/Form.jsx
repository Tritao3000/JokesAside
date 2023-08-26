import Link from "next/link";
import React from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="title_gradient acme">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type == "Create"
          ? "Share amazing jokes with the world, and let those laughs be your one-way ticket to the top of the leaderboard."
          : "Sprinkle some more fairy dust of awesomeness on it!"}
      </p>

      <form
        onSubmit={handleSubmit}
        className="my-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-slate-300">
            Your Best Joke
          </span>
          <textarea
            value={post.prompt}
            onChange={(event) => {
              setPost({ ...post, prompt: event.target.value });
            }}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-slate-300">
            Tag <span className="font-normal">(product, mood, idea)</span>
          </span>
          <input
            value={post.tag}
            onChange={(event) => {
              setPost({ ...post, tag: event.target.value });
            }}
            placeholder="tag"
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href={"/"} className="outline_btn text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm outline_btn"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
