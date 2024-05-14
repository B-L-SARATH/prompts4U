import Feed from "@components/Feed";
import React from "react";

const page = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br />
        <span className="orange_gradient text-center">
          AI POWERED PROMPTS
        </span>{" "}
      </h1>
      <p className="desc text-center">
        Prompts for you is a website where you can discover the different useful
        AI prompts and share your own AI prompts with the world.
      </p>
      <Feed />
    </section>
  );
};

export default page;
