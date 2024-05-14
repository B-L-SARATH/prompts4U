"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { toast } from "react-toastify";
const getProfile = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/user/${id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    params.id && fetchPosts();
  }, [params.id]);

  const handleEdit = (post) => {
    router.push(`/editpost/${post._id}`);
  };

  //delete thepost
  const handleDelete = async (post) => {
    const confirmdelete = confirm("Are you sure you want to delete this post?");
    if (!confirmdelete) return;
    try {
      const res = await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        const newPosts = posts.filter((p) => p._id !== post._id);

        setPosts(newPosts);
        toast.success("Post deleted successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Profile
      name={session?.user.id === id ? "my" : posts[0]?.user.name}
      desc="welcome to the profile"
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      posts={posts}
    />
  );
};

export default getProfile;
