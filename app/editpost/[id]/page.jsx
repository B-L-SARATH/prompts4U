"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { toast } from "react-toastify";
const EditPrompt = ({ params }) => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchpost = async () => {
      const res = await fetch(`/api/prompt/${params.id}`);
      const data = await res.json();
      setPost(data);
    };
    fetchpost();
  }, []);
  const editPost = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      const res = await fetch(`/api/prompt/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (res.status === 200) {
        toast.success("Post edited successfully");
        router.push("/profile");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
      router.push("/");
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handlesubmit={editPost}
    />
  );
};

export default EditPrompt;
