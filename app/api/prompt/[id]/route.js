import { connectDB } from "@utils/db";
import Prompt from "@models/Prompt";

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const post = await Prompt.findById(params.id).populate("user");
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(err, { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectDB();
    const post = await Prompt.findByIdAndUpdate(params.id, { prompt, tag });
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(err, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    const post = await Prompt.findByIdAndDelete(params.id);
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(err, { status: 500 });
  }
};
