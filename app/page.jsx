import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Laugh & Share
        <br className="max-md:hidden" />
        <span className="title_gradient text-center">Homemade Wisecracks</span>
      </h1>
      <p className="desc text-center">
        Jokes Aside is an open-source joke sharing hub where everyone can share
        their uncle's last christmas jokes and more, of course.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
