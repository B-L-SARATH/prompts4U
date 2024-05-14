"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { toast } from "react-toastify";
const page = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/user/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };
    session?.user.id && fetchPosts();
  }, [session?.user.id]);

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
      name="my"
      desc="welcome to your profile"
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      posts={posts}
    />
  );
};

export default page;
