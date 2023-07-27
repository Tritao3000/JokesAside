import PromptCard from "./PromptCard";

const Profile = ({ name, dsc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="title_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{dsc}</p>
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
    </section>
  );
};

export default Profile;
