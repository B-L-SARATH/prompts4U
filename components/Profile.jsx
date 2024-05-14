"use client";

import Promptcard from "./Promptcard";
const Profile = ({ posts, name, desc, handleEdit, handleDelete }) => {
  return (
    <div>
      <h1 className="blue_gradient text-center text-5xl font-extrabold m-2">
        {name} Profile
      </h1>
      <p className="font-light text-center m-2">{desc}</p>
      <div className="m-3 p-3 flex gap-5 flex-wrap justify-center items-center">
        {posts.map((post) => (
          <Promptcard
            key={post._id}
            post={post}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
