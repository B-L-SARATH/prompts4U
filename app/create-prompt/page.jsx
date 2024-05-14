"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { toast } from "react-toastify";
const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const { data: session } = useSession();
  const router = useRouter();
  const createPost = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await fetch("/api/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user.id,
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (res.status === 201) {
        toast.success("Post created successfully");
        console.log("Post created successfully");
        router.push("/");
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
      type="create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handlesubmit={createPost}
    />
  );
};

export default CreatePrompt;
